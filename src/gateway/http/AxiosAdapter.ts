import type HttpClient from "./HttpClient";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
export default class AxiosAdapter implements HttpClient {
  api: any
  token: string | null
  constructor() {
    this.token = import.meta.env.VITE_TOKEN_TMDB
    this.api = axios.create({
      baseURL: '',
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.api.interceptors.request.use(async (request: any) => {
      if (this.token) {
        request.headers.Authorization = `Bearer ${this.token}`
      }
      return request
    })

    this.api.interceptors.response.use(
      (response: any) => response.data,
      (error: any) => {
        if (!error) return
        notify({
          title: "Erro",
          type: "error",
          text: error.response.data.status_message
            || "Não foi possível completar a solicitação",
          duration: 10000,
        });
        Promise.reject(error)
      }
    )
  }

  get(url = '', params = {}) {
    return this.api.get(url, { params });
  }

  post(url = '', data = {}) {
    return this.api.post(url, data);
  }

  put(url = '', data = {}) {
    return this.api.put(url, data);
  }

  delete(url = '', data = null) {
    return this.api.delete(url, data);
  }

}