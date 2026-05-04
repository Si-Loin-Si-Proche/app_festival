/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { ApiResponse, FestivalEvent, CleanEvent } from '../types/api.types';

const FESTIVAL_ID = process.env.EXPO_PUBLIC_FESTIVAL_ID;
const TAG_ID = process.env.EXPO_PUBLIC_FESTIVAL_TAG_ID;
const STORAGE_KEY = 'festival_events_cache_v8';

const COMMON_INCLUDES =
  'main_image,spacetimes,spacetimes.place,content_field,section_tags,tags';

const mapToCleanEvent = (
  apiData: FestivalEvent,
  included: any[]
): CleanEvent => {
  const imageId = apiData.relationships.main_image?.data?.id;
  const imageObj = included.find(
    (inc) => inc.id === imageId && inc.type === 'media'
  );

  const KNOWN_PLACES = [
    'Cinéma',
    "Centre d'art",
    'Abreuvoir',
    'Halle',
    'Théâtre',
    'Studio',
    'Caravansérail',
    'Ateliers',
  ];

  let fallbackPlace = 'Lieu à définir';

  const sectionTagIds =
    apiData.relationships.section_tags?.data.map((t: any) => t.id) || [];
  for (const id of sectionTagIds) {
    const stObj = included.find(
      (inc) => inc.id === id && inc.type === 'section_tag'
    );
    let name = stObj?.attributes?.name;
    if (name) {
      name = name.replace(' ok', '');
      if (KNOWN_PLACES.includes(name)) {
        fallbackPlace = name;
        break;
      }
    }
  }

  if (fallbackPlace === 'Lieu à définir') {
    const tIds = apiData.relationships.tags?.data.map((t: any) => t.id) || [];
    for (const id of tIds) {
      const tObj = included.find((inc) => inc.id === id && inc.type === 'tag');
      const title = tObj?.attributes?.title;
      if (title && KNOWN_PLACES.includes(title)) {
        fallbackPlace = title;
        break;
      }
    }
  }

  const spacetimeIds =
    apiData.relationships.spacetimes?.data.map((d: any) => d.id) || [];
  const dates = spacetimeIds.map((id: string) => {
    const stObj = included.find(
      (inc) => inc.id === id && inc.type === 'spacetime'
    );
    const placeId = stObj?.relationships?.place?.data?.id;
    let placeName = 'Lieu à définir';

    if (placeId) {
      const placeObj = included.find(
        (inc) => inc.id === placeId && inc.type === 'place'
      );
      placeName = placeObj?.attributes?.title || 'Lieu à définir';
    }

    if (placeName === 'Lieu à définir' && fallbackPlace !== 'Lieu à définir') {
      placeName = fallbackPlace;
    }

    return {
      start: stObj?.attributes?.begin_at,
      end: stObj?.attributes?.end_at,
      placeName: placeName,
    };
  });

  const contentFieldId = apiData.relationships.content_field?.data?.id;
  const contentFieldObj = included.find(
    (inc) => inc.id === contentFieldId && inc.type === 'content_field'
  );

  const EXCLUDED_TAGS = [
    'Programme',
    'Programme accessibilité',
    'filmsallocine',
    'Contenus home',
    'Contenus home 2',
    'Vous êtes',
    'Chez vous',
    'Pour vous',
    'Avec vous',
    "Centre d'art ok",
    "Focus centre d'art",
    "Archives centre d'art",
    'Cinéma 2526',
    'cinéma',
    ...KNOWN_PLACES,
  ];

  const allTags = new Set<string>();

  const tagIds =
    apiData.relationships.tags?.data.map((t: { id: string }) => t.id) || [];
  tagIds.forEach((id: string) => {
    if (id === FESTIVAL_ID) return;
    const tObj = included.find((inc) => inc.id === id && inc.type === 'tag');
    const title = tObj?.attributes?.title;
    if (title && !EXCLUDED_TAGS.includes(title)) {
      allTags.add(title);
    }
  });

  const sTagIds =
    apiData.relationships.section_tags?.data.map((t: { id: string }) => t.id) ||
    [];
  sTagIds.forEach((id: string) => {
    const tObj = included.find(
      (inc) => inc.id === id && inc.type === 'section_tag'
    );
    const name = tObj?.attributes?.name;
    if (name && !EXCLUDED_TAGS.includes(name)) {
      allTags.add(name);
    }
  });

  const tags = Array.from(allTags);

  return {
    id: apiData.id,
    title: apiData.attributes.title,
    subtitle: apiData.attributes.subtitle || undefined,
    description: apiData.attributes.body,
    imageUrl: imageObj?.attributes?.file_url,
    dates,
    price: contentFieldObj?.attributes?.secondary_fields?.price,
    tags: tags,
  };
};

const paramsSerializer = {
  encode: (param: string) => {
    return encodeURIComponent(param).replace(/%5B/g, '[').replace(/%5D/g, ']');
  },
};

const filterCurrentYearEvents = (events: CleanEvent[]): CleanEvent[] => {
  const currentYear = new Date().getFullYear();
  const envStart = process.env.EXPO_PUBLIC_FESTIVAL_START_DATE;
  const envEnd = process.env.EXPO_PUBLIC_FESTIVAL_END_DATE;

  const festivalStart = envStart ? new Date(envStart) : null;
  const festivalEnd = envEnd ? new Date(envEnd) : null;

  const hasValidBoundaries =
    festivalStart &&
    !isNaN(festivalStart.getTime()) &&
    festivalEnd &&
    !isNaN(festivalEnd.getTime());

  const boundaryEnd = festivalEnd ? new Date(festivalEnd) : null;
  if (boundaryEnd) {
    boundaryEnd.setHours(23, 59, 59, 999);
  }

  return events
    .map((event) => {
      const filteredDates = event.dates.filter((date) => {
        const eventStart = date.start ? new Date(date.start) : null;
        let eventEnd = date.end ? new Date(date.end) : eventStart;

        if (!eventStart || isNaN(eventStart.getTime())) return false;
        if (!eventEnd || isNaN(eventEnd.getTime())) eventEnd = eventStart;

        if (hasValidBoundaries && festivalStart && boundaryEnd) {
          return eventStart <= boundaryEnd && eventEnd >= festivalStart;
        }

        return (
          eventStart.getFullYear() === currentYear ||
          eventEnd.getFullYear() === currentYear
        );
      });

      return {
        ...event,
        dates: filteredDates,
      };
    })
    .filter((event) => event.dates.length > 0);
};

// --- FONCTION PRIVÉE : APPEL RÉSEAU PUR ---
// C'est l'ancienne logique de getFestivalEvents, isolée pour être réutilisée
const fetchFromApi = async (): Promise<CleanEvent[]> => {
  const config = {
    params: {
      'filter[parent_appendix_id]': FESTIVAL_ID,
      'filter[tag_ids]': TAG_ID,
      sort: '-id',
      include: COMMON_INCLUDES,
      per_page: 300,
    },
    paramsSerializer,
  };

  if (__DEV__) {
    const debugUrl = api.getUri({ url: '/contents', ...config });
    console.log('🚀 API FETCH (Background) :', debugUrl);
  }

  const response = await api.get<ApiResponse<FestivalEvent>>(
    '/contents',
    config
  );

  const rawEvents = response.data.data;
  const included = response.data.included || [];
  const eventsArray = Array.isArray(rawEvents) ? rawEvents : [rawEvents];

  const mappedEvents = eventsArray.map((event) =>
    mapToCleanEvent(event, included)
  );
  return filterCurrentYearEvents(mappedEvents);
};

export const getFestivalEvents = async (
  onBackgroundUpdate?: (newData: CleanEvent[]) => void
): Promise<CleanEvent[]> => {
  let localData: CleanEvent[] = [];

  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      localData = JSON.parse(jsonValue);
      if (__DEV__) console.log('📦 Données chargées depuis le CACHE');
    }
  } catch (e) {
    console.warn('Erreur lecture cache local', e);
  }

  // Mise à jour réseau
  const networkPromise = (async () => {
    try {
      const freshData = await fetchFromApi();

      // Sauvegarde
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
      if (__DEV__) console.log('🌐 Données mises à jour depuis API');

      // Notification
      if (onBackgroundUpdate) {
        onBackgroundUpdate(freshData);
      }
      return freshData;
    } catch (error: any) {
      if (__DEV__) console.error('Echec Fetch Background :', error);
      if (localData.length === 0) throw error;
      return [];
    }
  })();

  if (localData.length > 0) {
    return localData;
  } else {
    return networkPromise;
  }
};

export const getEventById = async (id: string): Promise<CleanEvent | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      const allEvents: CleanEvent[] = JSON.parse(jsonValue);
      const found = allEvents.find((e) => e.id === id);
      if (found) {
        if (__DEV__) console.log('📦 Event trouvé dans le CACHE');
        return found;
      }
    }
  } catch (e) {
    // Ignore error, fallback to API
  }
  try {
    const config = {
      params: {
        'filter[id]': id,
        include: `${COMMON_INCLUDES},videos,files`,
      },
      paramsSerializer,
    };
    if (__DEV__) {
      const debugUrl = api.getUri({ url: '/contents', ...config });
      console.log('🚀 URL DETAIL (Network fallback) :', debugUrl);
    }
    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );

    const rawData = response.data.data;
    const rawEvent = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!rawEvent) return null;

    const included = response.data.included || [];
    const event = mapToCleanEvent(rawEvent, included);
    const filtered = filterCurrentYearEvents([event]);
    return filtered.length > 0 ? filtered[0] : null;
  } catch (error: any) {
    if (__DEV__) {
      console.error('ERREUR DETAIL :', error);
      if (error.response) console.log(error.response.status);
    }
    return null;
  }
};

export const searchEvents = async (query: string): Promise<CleanEvent[]> => {
  if (!query || query.length < 2) return [];

  try {
    const config = {
      params: {
        'filter[parent_appendix_id]': FESTIVAL_ID,
        'filter[search]': query,
        sort: '-id',
        include: COMMON_INCLUDES,
      },
      paramsSerializer,
    };
    if (__DEV__) {
      const debugUrl = api.getUri({ url: '/contents', ...config });
      console.log('🚀 URL RECHERCHE :', debugUrl);
    }
    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );

    const rawEvents = response.data.data;
    const included = response.data.included || [];
    const eventsArray = Array.isArray(rawEvents) ? rawEvents : [rawEvents];

    const mappedEvents = eventsArray.map((event) =>
      mapToCleanEvent(event, included)
    );
    return filterCurrentYearEvents(mappedEvents);
  } catch (error: any) {
    if (__DEV__) {
      console.error('ERREUR RECHERCHE :', error);
    }
    return [];
  }
};

export const getFestivalFilters = async () => {
  try {
    const response = await api.get('/tags', {
      params: { per_page: 100 },
    });

    return response.data.data.map((t: any) => ({
      id: t.id,
      label: t.attributes.title,
      slug: t.attributes.identifier,
    }));
  } catch (error: any) {
    if (__DEV__) {
      console.error('ERREUR FILTRES', error);
    }
    return [];
  }
};

export const getEventsByFilter = async (
  filterTagId: string
): Promise<CleanEvent[]> => {
  try {
    const config = {
      params: {
        'filter[parent_appendix_id]': FESTIVAL_ID,
        'filter[tag_ids]': filterTagId,
        include: COMMON_INCLUDES,
      },
      paramsSerializer,
    };
    if (__DEV__) {
      const debugUrl = api.getUri({ url: '/contents', ...config });
      console.log('🚀 URL FILTER :', debugUrl);
    }

    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );
    const rawEvents = response.data.data;
    const included = response.data.included || [];
    const eventsArray = Array.isArray(rawEvents) ? rawEvents : [rawEvents];

    const mappedEvents = eventsArray.map((event) =>
      mapToCleanEvent(event, included)
    );
    return filterCurrentYearEvents(mappedEvents);
  } catch (error: any) {
    if (__DEV__) {
      console.error('ERREUR FILTER :', error);
    }
    return [];
  }
};
