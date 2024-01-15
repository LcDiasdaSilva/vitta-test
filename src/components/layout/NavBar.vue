import type path from 'path';
<style scoped lang="scss">
@import "../../assets/variables";
.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  &__menu-items {
    display: flex;
  }
  &__menu-item {
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.3rem 1rem;
    border-radius: 0.3rem;
    &:hover {
      background: $color-primary;
      color: #fff;
    }
  }

  &__cart-wrapper,
  &__logo-wrapper {
    width: 100px;
  }

  &__cart-wrapper {
    display: relative;
  }

  &__cart-count {
    background: #ef5350;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-weight: 600;
    color: #fff;
    border-radius: 100px;
    font-size: 0.6rem;
  }

  &__wrapper-menu-icon {
    margin-left: 2rem;
    cursor: pointer;
  }

  &__overlay {
    width: 100%;
    height: 100dvh;
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }

  &__drawer {
    width: 300px;
    height: 100dvh;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    border-left: solid 1px #ccc;
  }

  &__drawer-header {
    padding: 1rem;
  }

  &__menu-items-mobile {
    display: flex;
    flex-direction: column;
  }
  &__menu-item-mobile {
    padding: 1rem;
    font-size: 1.3rem;
    &:hover {
      background: $color-primary;
      color: #fff;
    }
  }
}
</style>
<template>
  <nav class="nav-bar">
    <div class="nav-bar__logo-wrapper">
      <img title="logo" alt="logo" src="/logo.webp" />
    </div>
    <div v-if="!mobile" class="nav-bar__menu-wrapper">
      <ul class="nav-bar__menu-items">
        <RouterLink class="nav-bar__menu-item" tag="li" :to="{ path: '/' }"
          >Início</RouterLink
        >
        <RouterLink class="nav-bar__menu-item" tag="li" :to="{ path: '/movie' }"
          >Filmes</RouterLink
        >
        <RouterLink class="nav-bar__menu-item" tag="li" :to="{ path: '/tv' }"
          >Séries</RouterLink
        >
      </ul>
    </div>
    <div class="nav-bar__cart-wrapper flex justify-end">
      <ul>
        <RouterLink class="" tag="li" :to="{ path: '/carrinho' }">
          <div v-if="cartCount" class="nav-bar__cart-count">{{ cartCountFormatted }}</div>
          <img style="width: 40px" src="/cart.webp" />
        </RouterLink>
      </ul>
      <div @click="toggle" v-if="mobile" class="nav-bar__wrapper-menu-icon">
        <img style="width: 40px" src="/menu.svg" />
      </div>
    </div>

    <div @click="toggle" v-if="mobile && drawer" class="nav-bar__overlay"></div>
    <div v-if="mobile && drawer" class="nav-bar__drawer">
      <div>
        <div @click="toggle" v-if="mobile" class="nav-bar__drawer-header">
          <img style="width: 40px" src="/close.svg" />
        </div>
        <ul class="nav-bar__menu-items-mobile">
          <RouterLink
            @click="toggle"
            class="nav-bar__menu-item-mobile"
            tag="li"
            :to="{ path: '/' }"
            >Início</RouterLink
          >
          <RouterLink
            @click="toggle"
            class="nav-bar__menu-item-mobile"
            tag="li"
            :to="{ path: '/movie' }"
            >Filmes</RouterLink
          >
          <RouterLink
            @click="toggle"
            class="nav-bar__menu-item-mobile"
            tag="li"
            :to="{ path: '/tv' }"
            >Séries</RouterLink
          >
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  mobile: boolean;
  drawer: boolean;
  cartCount: number;
}>();

const cartCountFormatted = computed(()=>{
  return props.cartCount < 10 ? props.cartCount : '9+'

})

const emit = defineEmits(["toggle"]);

function toggle() {
  emit("toggle");
}
</script>
