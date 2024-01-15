<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  nav {
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 999;
  }
  main {
    flex: 1;
  }
  footer {
    width: 100%;
    min-height: 100px;
    background: #11111f;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<template>
  <div ref="el" class="layout">
    <nav>
      <NavBar
        @toggle="toggleMenuDrawer"
        :cart-count="cartStore.getStateItemNumber"
        :drawer="layout.drawer"
        :mobile="layout.width < 800"
      />
    </nav>
    <main>
      <router-view></router-view>
    </main>
    {{ route.meta.hideFooter }}
    <footer>Desenvolvido por @LcDias</footer>
  </div>
</template>
<script setup lang="ts">
import NavBar from "../components/layout/NavBar.vue";
import { useRoute } from "vue-router";
import { provide, reactive, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import Cart from "../entities/Cart";
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
const cart = reactive(new Cart());
const route = useRoute();

const el = ref(null);

cartStore.changeStateItemNumber(cart.getItemCardNumber());

const layout = reactive({
  width: 0,
  height: 0,
  drawer: false,
});

provide("screen", screen);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  layout.width = width;
  layout.height = height;
});

function toggleMenuDrawer() {
  layout.drawer = !layout.drawer;
}
</script>
../stores/cart