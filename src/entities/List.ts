
import Item from './Item'
import discoverSortByEnum from '@/enums/discoverSortByEnum';


export default class List {
  items: Item[];
  popularFilters: PopularFilters;
  discoverFilters: DiscoverFilters;
  discoverSortByList: DiscoverFiltersItemEnum[]
  discoverGenresList: DiscoverFiltersItemEnum[]
  pagination: Pagination

  constructor() {
    this.items = []
    this.pagination = {} as Pagination
    this.popularFilters = {
      include_adult: false,
      language: 'pt-BR',
      page: 1
    } as PopularFilters
    this.discoverFilters = {
      include_adult: false,
      language: 'pt-BR',
      with_genres: '',
      genres: '',
      page: 1,
      'release_date.gte': '',
      'release_date.lte': '',
      sort_by: 'popularity.desc',
    } as DiscoverFilters

    this.discoverSortByList = discoverSortByEnum as DiscoverFiltersItemEnum[]
    this.discoverGenresList = [] as DiscoverFiltersItemEnum[]
  }

  setData(searchResponse: ResponseList) {
    this.items = searchResponse.results
    this.pagination = {
      page: searchResponse.page,
      totalPages: searchResponse.total_pages,
      totalItems: searchResponse.total_results
    }
  }

  getPagination() {
    return this.pagination
  }

  setPage(page: number) {
    this.discoverFilters.page = page
  }

  getPopularFilters() {
    return this.popularFilters
  }

  getDiscoverFilters() {
    const filters = Object.fromEntries(
      Object.entries(this.discoverFilters).filter(([key]) => !['genres'].includes(key))
    );
    return filters
  }

  setDiscoverFilters(filters: DiscoverFilters) {
    let genresFormatted = ''
    if (filters.genres && Array.isArray(filters.genres)) {
      genresFormatted = filters.genres.map(genre => genre.id).toString()
    }

    filters.with_genres = genresFormatted
    filters.page = 1
    this.discoverFilters = filters
  }

  getDiscoverSortByList() {
    return this.discoverSortByList
  }

  setDiscoverGenresList(genresList: DiscoverFiltersItemEnum[]) {
    this.discoverGenresList = genresList
  }

  getDiscoverGenresList() {
    return this.discoverGenresList
  }

  getItems() {
    return this.items
  }
}