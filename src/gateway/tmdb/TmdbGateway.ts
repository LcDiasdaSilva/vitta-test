export default interface TmdbGateway {
  getPopularMovies(filters?: PopularFilters): Promise<any>;
  getPopularSeries(filters?: PopularFilters): Promise<any>;
  searchMulti(filters?: SearchFilters): Promise<any>;
  getDiscoverMovies(filters?: DiscoverFilters): Promise<any>;
  getDiscoverSeries(filters?: DiscoverFilters): Promise<any>;
  getGenresListMovies(): Promise<any>;
  getGenresListSeries(): Promise<any>;
  getFindById(id: number): Promise<any>;
  getItem(type: string, id: string): Promise<any>;
}