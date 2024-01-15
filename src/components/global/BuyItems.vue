<style scoped lang="scss">
.item-purchase {
  &__item-purchase_item {
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  &__value {
    font-size: 2rem;
    font-weight: 400;
  }
  &__input-amount {
    display: flex;
    max-width: 100%;
    margin: 1rem 0;
    border: solid 1px #000;
    justify-content: space-between;
    input {
      text-align: center;
      padding: 0.5rem 1rem;
      flex: 1;
      font-size: 1.2rem;
    }
    button {
      background: #11111f;
      color: #fff;
      width: 4rem;
    }
  }
}
</style>
<template>
  <main class="item-purchase">
    <div class="item-purchase__item">
      <label for="value-unit-item" class="item-purchase__title">Preço:</label>
      <div id="value-unit-item" class="item-purchase__value">
        {{ priceFormatted }}
      </div>
    </div>
    <div class="item-purchase__item">
      <label for="value-total-item" class="item-purchase__title">Total:</label>
      <div id="value-total-item" class="item-purchase__value">
        {{ totalPrice }}
      </div>
    </div>
    <div style="width: 100%">
      <div class="item-purchase__input-amount">
        <button id="btn-remove-unit" type="button" @click="removeUnit">
          -
        </button>
        <input id="input-item-amount" disabled v-model="amount" type="text" />
        <button id="btn-add-unit" type="button" @click="addUnit">+</button>
      </div>
      <Button
        @click="purchase"
        class="mt-4"
        id="btn-buy"
        label="Comprar"
        maxWidth="100%"
        :primary="true"
        size="large"
        :disabled="false"
        type="button"
      ></Button>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./Button.vue";

const props = defineProps<{
  price: number;
  priceFormatted: string;
}>();

const totalPrice = computed(() => {
  return formatPrice.format(props.price * amount.value).toString();
});

const emit = defineEmits(["getAmount"]);
const formatPrice = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const amount = ref(1);

function addUnit() {
  amount.value++;
}

function removeUnit() {
  if (amount.value > 1) amount.value--;
}

function purchase() {
  emit("getAmount", amount.value);
}
</script>
