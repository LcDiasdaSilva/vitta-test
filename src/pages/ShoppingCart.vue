<style scoped lang="scss">
.cart-page {
  max-width: 1000px;
  margin: auto;
  padding: 8rem 3rem !important;
  &__title {
    font-size: 2rem;
  }
  &__total-order {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }
  &__total-order-label {
    font-size: 1.6rem;
  }
  &__total-order-value {
    font-size: 1.6rem;
    font-weight: 800;
  }
}
</style>
<template>
  <main class="cart-page">
    <h1 class="cart-page__title">Carrinho de compras</h1>
    <div v-for="itemCart in cart.getData()">
      <ItemCartVue
        @removeItem="removeItem(itemCart.item.id)"
        @addUnit="cart.addItem(itemCart.item, 1)"
        @removeUnit="removeUnit(itemCart.item.id)"
        :title="itemCart.item.itemTitle"
        :unitValue="itemCart.item.priceFormatted"
        :totalItensValue="itemCart.item.total"
        :amount="itemCart.amount"
      />
      <hr />
    </div>

    <div class="cart-page__total-order">
      <div class="cart-page__total-order-label">Total do Pedido</div>
      <div class="cart-page__total-order-value">
        {{ cart.getTotalOrderFormatted() }}
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import ItemCartVue from "@/components/global/inputs/ItemCart.vue";
import { reactive } from "vue";
import Cart from "../entities/Cart";
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();

const cart = reactive(new Cart());

function removeItem(id: number) {
  cart.removeItem(id);
  cartStore.changeStateItemNumber(cart.getItemCardNumber());
}

function removeUnit(id: number) {
  cart.removeUnit(id);
  cartStore.changeStateItemNumber(cart.getItemCardNumber());
}
</script>
