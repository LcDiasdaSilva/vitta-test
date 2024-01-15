import type TmdbGateway from "./TmdbGateway";
import type HttpClient from "../http/HttpClient";

export default class TmdbGatewayHttp implements TmdbGateway {

  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string
  ) {
  }

  getPopularMovies(filters?: any) {
    const url = `${this.baseUrl}/movie/popular`
    return this.httpClient.get(url, filters)
  }

  getPopularSeries(filters?: any) {
    const url = `${this.baseUrl}/tv/popular`
    return this.httpClient.get(url, filters)
  }

  searchMulti(filters: SearchFilters) {
    const url = `${this.baseUrl}/search/multi`
    return this.httpClient.get(url, filters)
  }

  getDiscoverMovies(filters: DiscoverFilters) {
    const url = `${this.baseUrl}/discover/movie`
    return this.httpClient.get(url, filters)
  }

  getDiscoverSeries(filters: DiscoverFilters) {
    const url = `${this.baseUrl}/discover/tv`
    return this.httpClient.get(url, filters)
  }

  getGenresListMovies() {
    const url = `${this.baseUrl}/genre/movie/list?language=pt-BR`
    return this.httpClient.get(url, {})
  }

  getGenresListSeries() {
    const url = `${this.baseUrl}/genre/tv/list?language=pt-BR`
    return this.httpClient.get(url, {})
  }

  getFindById(id: number) {
    const url = `${this.baseUrl}/find/${id}?external_source=imdb_id`
    return this.httpClient.get(url, {})
  }

  getItem(type:string , id: string) {
    const url = `${this.baseUrl}/${type}/${id}?language=pt-BR`
    return this.httpClient.get(url, {})
  }
}

