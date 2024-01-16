export default class Item {

  id: number
  first_air_date?: string
  name?: string
  title?: string
  popularity?: number
  poster_path?: string
  vote_average?: number
  urlImage?: string
  itemTitle?: string
  overview?: string
  tagline?: string
  genres?: { id: number, name: string }[]
  price?: number
  priceFormatted?: string

  constructor(item: any) {
    if (item.poster_path) this.urlImage = import.meta.env.VITE_URL_IMAGE_TMDB + item.poster_path
    this.id = item.id
    this.name = item.name || ''
    this.title = item.title || ''
    this.popularity = item.popularity || 0
    this.poster_path = item.poster_path || ''
    this.vote_average = item.vote_average || 0
    this.overview = item.overview
    this.itemTitle = item.title || item.name || ''
    this.tagline = item.tagline || ''
    this.genres = item.genres || []
    this.price = this.setPrice(this.id || 1000)
    this.priceFormatted = this.setPriceFormatted(this.id || 1000)


  }

  setData(item: this) {
    if (item.poster_path) this.urlImage = import.meta.env.VITE_URL_IMAGE_TMDB + item.poster_path
    this.id = item.id
    this.name = item.name || ''
    this.title = item.title || ''
    this.popularity = item.popularity || 0
    this.poster_path = item.poster_path || ''
    this.vote_average = item.vote_average || 0
    this.overview = item.overview
    this.itemTitle = item.title || item.name || ''
    this.tagline = item.tagline || ''
    this.genres = item.genres || []
    this.price = this.setPrice(this.id)
    this.priceFormatted = this.setPriceFormatted(this.id)
  }

  setPriceFormatted(reference: number): string {
    const formatPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatPrice.format(Math.ceil(reference / 3000) > 20 ? Math.ceil(reference / 3000) : 20)
  }

  setPrice(reference: number): number {
    return Math.ceil(reference / 3000) > 20 ? Math.ceil(reference / 3000) : 20
  }

  getData() {
    return this
  }



}