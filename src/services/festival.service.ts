import api from './api';
import { ApiResponse, FestivalEvent, CleanEvent } from '../types/api.types';

const FESTIVAL_ID = process.env.EXPO_PUBLIC_FESTIVAL_ID;

/**
 * Transforme le JSON complexe de l'API en objet simple pour l'app
 */
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

    return {
      start: stObj?.attributes?.begin_at,
      end: stObj?.attributes?.end_at,
      placeName: placeObj?.attributes?.title || 'Lieu à définir',
    };
  });

  const contentFieldId = apiData.relationships.content_field?.data?.id;
  const contentFieldObj = included.find(
    (inc) => inc.id === contentFieldId && inc.type === 'content_field'
  );

  return {
    id: apiData.id,
    title: apiData.attributes.title,
    subtitle: apiData.attributes.subtitle || undefined,
    description: apiData.attributes.body,
    imageUrl: imageObj?.attributes?.file_url,
    dates,
    price: contentFieldObj?.attributes?.secondary_fields?.price, // HTML brut
  };
};

/**
 * Récupère tous les événements du festival
 */
export const getFestivalEvents = async (): Promise<CleanEvent[]> => {
  try {
    const config = {
      params: {
        'filter[tag_ids]': FESTIVAL_ID,
        include: 'main_image,spacetimes,spacetimes.place,content_field',
        per_page: 300,
      },
      paramsSerializer: {
        encode: (param: string) => {
          return encodeURIComponent(param)
            .replace(/%5B/g, '[')
            .replace(/%5D/g, ']');
        },
      },
    };

    // ------------- DEBUG -------------
    const debugUrl = api.getUri({ url: '/contents', ...config });
    console.log('🚀 URL APPELÉE :', debugUrl);
    // ---------------------------------

    const response = await api.get<ApiResponse<FestivalEvent>>(
      '/contents',
      config
    );

    const rawEvents = response.data.data;
    const included = response.data.included || [];

    return rawEvents.map((event) => mapToCleanEvent(event, included));
  } catch (error: any) {
    console.error("ERREUR CRITIQUE DANS L'APPEL API !");

    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('⚠️ Aucune réponse reçue');
    } else {
      console.log('Erreur message:', error.message);
    }

    return [];
  }
};
