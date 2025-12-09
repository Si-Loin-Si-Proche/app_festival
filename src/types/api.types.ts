// src/types/api.types.ts

export interface ApiResponse<T> {
  data: T[];
  included?: any[];
  meta: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

export interface FestivalEvent {
  id: string;
  type: 'content';
  attributes: {
    title: string;
    subtitle: string | null;
    body: string; // HTML
    summary: string | null;
    slug: string;
    sti_type: 'Agenda' | 'Article' | 'Page';
    status: 'published';
  };
  relationships: {
    main_image: {
      data: { id: string; type: 'media' } | null;
    };
    spacetimes: {
      data: { id: string; type: 'spacetime' }[];
    };
    content_field: {
      data: { id: string; type: 'content_field' } | null;
    };
  };
}

export interface CleanEvent {
  id: string;
  title: string;
  subtitle?: string;
  description: string; // HTML
  imageUrl?: string;
  dates: {
    start: string; // ISO Date
    end: string;
    placeName: string;
  }[];
  price?: string; // HTML
}
