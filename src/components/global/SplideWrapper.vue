<style lang="scss">
.splide-wrapper {
  position: relative;
  &__skeleton {
    background: #fff;
    width: 100%;
    height: 600px;
  }
}
</style>
<template>
  <div class="splide-wrapper">
    <div v-if="!items.length" class="splide-wrapper__skeleton"></div>
    <Splide class="splide" :options="data.options">
      <SplideSlide v-for="item in items" :key="item.id">
      
      
        <CardItem
          :title="item.getData().itemTitle || ''"
          :urlImage="item.getData().urlImage || ''"
          :price="item.getData().priceFormatted || ''"
          @click="goToPageItem(item)"
        />
      </SplideSlide>
    </Splide>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import CardItem from "./CardItem.vue";
import Item from "../../entities/Item";
import { useRouter } from "vue-router";

const props = defineProps<{
  items: Item[];
  type: string;
}>();

const router = useRouter();

const data = reactive({
  options: {
    rewind: false,
    gap: "1rem",
    width: "100%",
    type: "slide",
    rewindSpeed: 1000,
    pagination: false,
    arrows: false,
    wheel: true,
    padding: "3px",
    perPage: 4,
    breakpoints: {
      600: {
        perPage: 1,
      },

      1250: {
        perPage: 3,
      },
    },
    classes: {
      pagination: "splide__pagination pagination-course",
      page: "splide__pagination__page page-course",
    },
  },
});

function goToPageItem(item: Item) {
  router.push(`/item/${props.type}/${item.id}`);
}
</script>
