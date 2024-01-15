
import _ from 'lodash';
export const debounce = {
  beforeMount(el: { addEventListener: (arg0: string, arg1: any) => void; }, binding: { value: any; }) {
    el.addEventListener('input', _.debounce(binding.value, 500)); 
  },
};
