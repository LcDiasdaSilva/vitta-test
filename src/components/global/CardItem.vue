<style scoped lang="scss">
.item-card {
  width: 100%;
  height: calc(100% - 5px);
  display: flex;
  flex-direction: column;
  background: #fff;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 10px;
  &__wrapper-image {
    background: #fff;
  }
  &__image {
    width: 100%;
    min-height: 100% !important;
    max-width: 500px !important;
  }
  &__title {
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 0.3rem;
    flex: 1;
  }
  &__content {
    padding: 1rem;
  }
  &__price {
    font-size: 1.3rem;
    font-weight: 600;
  }
}
</style>
<template>
  <div ref="el" class="item-card">
    <div :style="style" class="tem-card__wrapper-image">
      <ProgressiveImage custom-class="item-card__image" :src="urlImage" />
    </div>

    <div class="item-card__title">
      {{ title }}
    </div>
    <div class="item-card__content">
      <div class="item-card__price text-left">
        <div>{{ price }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ProgressiveImage } from "vue-progressive-image";
import { computed, ref, watch } from "vue";
import { useElementSize } from "@vueuse/core";
const el = ref(null);
const { width, height } = useElementSize(el);

const style = computed(() => ({
  minHeight: `${width.value * 1.53}px`,
}));

watch(width, () => {});

const props = defineProps<{
  price: string;
  title: string;
  urlImage: string;
}>();
</script>
