export default interface HttpClient {
  get(url:string, params:any): Promise<any>
  post(url:string, data:any): Promise<any>
  put(url:string, data:any): Promise<any>
  delete(url:string, params:any): Promise<any>
}