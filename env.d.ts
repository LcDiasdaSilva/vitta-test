/// <reference types="vite/client" />

interface SearchFilters {
  language: string
  page: number
  media_type: string
  query: string
}

interface DiscoverFilters {
  include_adult?: boolean
  language?: string
  with_genres?: string
  genres?: string
  page?: number
  'release_date.gte'?: string
  'release_date.lte'?: string
  sort_by?: string
}

interface DiscoverFiltersItemEnum {
  id?: number | string
  name?: string
};

interface PopularFilters {
  include_adult?: boolean
  language?: string
  page?: number
  region?: string
}

interface ResponseList {
  page: number,
  total_pages: number,
  total_results: number
  results: SearchItem[]
}

interface Pagination {
  page: number
  totalPages: number
  totalItems: number
}

declare module '@splidejs/vue-splide' {
  export default any;
}
declare module 'vue-progressive-image' {
  import Vue, { Component } from 'vue';

  const ProgressiveImage: Component;
  export { ProgressiveImage };
}





