/* eslint-disable no-console */
import api from './api';
import { ApiResponse, FestivalEvent, CleanEvent } from '../types/api.types';

const FESTIVAL_ID = process.env.EXPO_PUBLIC_FESTIVAL_ID;

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

  const spacetimeIds =
    apiData.relationships.spacetimes?.data.map((d) => d.id) || [];
  const dates = spacetimeIds.map((id) => {
    const stObj = included.find(
      (inc) => inc.id === id && inc.type === 'spacetime'
    );
    const placeId = stObj?.relationships?.place?.data?.id;
    const placeObj = included.find(
      (inc) => inc.id === placeId && inc.type === 'place'
    );

    const placeName = placeObj?.attributes?.title || 'Lieu à définir';

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

  const tagIds =
    apiData.relationships.tags?.data.map((t: { id: string }) => t.id) || [];

  const tags = tagIds
    .map((id: string) => {
      if (id === FESTIVAL_ID) return null;
      const tObj = included.find((inc) => inc.id === id && inc.type === 'tag');
      const title = tObj?.attributes?.title;
      if (title && title.toLowerCase().includes('si loin si proche')) {
        return null;
      }
      return title;
    })
    .filter((t: string): t is string => !!t);

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

export const getFestivalEvents = async (): Promise<CleanEvent[]> => {
  try {
    const config = {
      params: {
        'filter[tag_ids]': FESTIVAL_ID,
        include: COMMON_INCLUDES,
        per_page: 300,
      },
      paramsSerializer,
    };
    if (__DEV__) {
      const debugUrl = api.getUri({ url: '/contents', ...config });
      console.log('🚀 URL LISTE :', debugUrl);
    }
    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );

    const rawEvents = response.data.data;
    const included = response.data.included || [];
    const eventsArray = Array.isArray(rawEvents) ? rawEvents : [rawEvents];

    return eventsArray.map((event) => mapToCleanEvent(event, included));
  } catch (error: any) {
    if (__DEV__) {
      console.error('❌ ERREUR LISTE :', error);
      if (error.response) console.log(error.response.status);
    }
    return [];
  }
};

export const getEventById = async (id: string): Promise<CleanEvent | null> => {
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
      console.log('🚀 URL DETAIL :', debugUrl);
    }
    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );

    const rawData = response.data.data;
    const rawEvent = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!rawEvent) return null;

    const included = response.data.included || [];
    return mapToCleanEvent(rawEvent, included);
  } catch (error: any) {
    if (__DEV__) {
      console.error('❌ ERREUR DETAIL :', error);
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
        'filter[tag_ids]': FESTIVAL_ID,
        'filter[search]': query,
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

    return eventsArray.map((event) => mapToCleanEvent(event, included));
  } catch (error: any) {
    if (__DEV__) {
      console.error('❌ ERREUR RECHERCHE :', error);
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
      console.error('❌ ERREUR FILTRES', error);
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
        'filter[tag_ids]': `${FESTIVAL_ID},${filterTagId}`,
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

    return eventsArray.map((event) => mapToCleanEvent(event, included));
  } catch (error: any) {
    if (__DEV__) {
      console.error('❌ ERREUR FILTER :', error);
    }
    return [];
  }
};
