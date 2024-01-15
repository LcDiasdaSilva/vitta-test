<style scoped lang="scss">
@import "../../../assets/break-points.scss";
.cart-item {
  padding: 1rem;
  &__info {
    display: flex;
    justify-content: space-between;
    @include mq-value("800px") {
      flex-direction: column;
    }
  }
  &__info-value {
    font-size: 1.3rem;
    font-weight: 600;
  }

  &__btn-remove {
    background: #ef5350;
    color: #fff;
    padding: 0.3rem 2rem;
    border-radius: 3px;
    margin: 1rem 0;
  }
  &__wrapper-remove {
    display: flex;
    justify-content: flex-end;
  }
  &__counter {
    margin-top: 1rem;
    border: solid 1px #11111f;
    display: flex;
    justify-content: space-between;
    input {
      flex: 1;
      text-align: center;
    }
    button {
      background: #000;
      color: #fff;
      padding: 0 2rem;
    }
  }
}
</style>
<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <div class="cart-item__info-label">Produto:</div>
      <div class="cart-item__info-value">{{ title }}</div>
    </div>
    <div class="cart-item__info">
      <div class="cart-item__info-label">Valor unitário:</div>
      <div class="cart-item__info-value">{{ unitValue }}</div>
    </div>
    <div class="cart-item__info">
      <div class="cart-item__info-label">Valor Total:</div>
      <div class="cart-item__info-value">{{ total }}</div>
    </div>
    <div class="cart-item__action">
      <div class="cart-item__counter">
        <button @click="removeUnit">-</button>
        <input disabled :value="amount" type="text" />
        <button @click="addUnit">+</button>
      </div>
    </div>
    <div class="cart-item__wrapper-remove">
      <button @click="remove" class="cart-item__btn-remove">Remover</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  unitValue: string;
  totalItensValue: number;
  amount: number;
}>();

const formatPrice = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const total = computed(() => {
  return formatPrice.format(props.totalItensValue);
});

const emit = defineEmits(["removeItem", "addUnit", "removeUnit"]);

function remove() {
  emit("removeItem");
}

function addUnit() {
  emit("addUnit");
}

function removeUnit() {
  emit("removeUnit");
}
</script>
