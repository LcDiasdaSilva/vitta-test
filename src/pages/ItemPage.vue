<style scoped lang="scss">
.item-page {
  max-width: 1000px;
  margin: auto;
  padding: 8rem 3rem !important;
}
</style>
<template>
  <main class="item-page">
    <ItemDetail
      :title="item.getData().itemTitle || ''"
      :urlImage="item.getData().urlImage || ''"
      :overview="item.getData().overview || ''"
      :tagline="item.getData().tagline || ''"
      :genres="item.getData().genres || []"
    />

    <BuyItems
      @getAmount="getAmount"
      :price="item.getData().price || 0"
      :priceFormatted="item.getData().priceFormatted || ''"
      class="mt-10"
    />
  </main>
</template>
<script setup lang="ts">
import ItemDetail from "../components/global/ItemDetail.vue";
import BuyItems from "../components/global/BuyItems.vue";
import { notify } from "@kyvg/vue3-notification";
import { inject, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import type TmdbGateway from "@/gateway/tmdb/TmdbGateway";
import Item from "@/entities/Item";
import Cart from "@/entities/Cart";
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();

const tmdbGateway = inject("tmdbGateway") as TmdbGateway;
const route = useRoute();
const router = useRouter();
let item = reactive(new Item({}));
const cart = reactive(new Cart());

onMounted(() => {
  getItem();
});

async function getItem() {
  const response = await tmdbGateway.getItem(
    route.params.type.toString(),
    route.params.id.toString()
  );
  if (response) item.setData(response);
}

function getAmount(amount: number) {
  cart.addItem(item, amount);
  cartStore.changeStateItemNumber(cart.getItemCardNumber());
  notify({
    title: "OK",
    type: "success",
    text: "Produto adicionado ao carrinho",
    duration: 10000,
  });
  router.push("/carrinho");
}
</script>
../stores/cart
