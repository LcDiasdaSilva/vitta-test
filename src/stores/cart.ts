// stores/counter.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('Cart', {
  state: () => ({
    itemNumber: 0,
  }),
  getters: {
    getStateItemNumber(state) {
      return state.itemNumber;
    },
  },
  actions: {
    changeStateItemNumber(value: number) {
      this.itemNumber = value;
    },
  }
})