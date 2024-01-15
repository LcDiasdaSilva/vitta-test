<style>
.galeria-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 50px;
}
</style>
<template>
  <div class="galeria-produtos">
    <div v-for="item in items" :key="item.id">
      <CardItem
        @click="goToPageItem(item)"
        :title="item.getData().itemTitle || ''"
        :urlImage="item.getData().urlImage || ''"
        :price="item.getData().priceFormatted || ''"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import CardItem from "./CardItem.vue";
import Item from "@/entities/Item";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  items: any;
  type: string;
}>();

function goToPageItem(item: Item) {
  router.push(`/item/${props.type}/${item.id}`);
}
</script>
