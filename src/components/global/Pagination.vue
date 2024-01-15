<style lang="scss" scoped>
.pagination {
  &__wrapper-pages {
    display: flex;
    flex-wrap: wrap;
  }
  &__pages {
  }

  &__page {
    padding: 1rem;
    height: 25px;
    color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.1rem;
    cursor: pointer;
    &:hover {
      background: rgba($color: #000, $alpha: 0.5);
      color: #fff;
    }
  }

  &__last-page {
    padding: 1rem;
    height: 25px;
    color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.1rem;
  }

  &--active {
    background: #000;
    color: white;
  }

  &__arrows {
    color: #000;
    font-weight: 700;
    cursor: pointer;
    margin: 0.4rem;
  }
}
</style>

<template>
  <div class="pagination">
    <div class="pagination__wrapper-pages">
      <div
        @click="preview()"
        v-if="CURRENT_PAGE > 1"
        class="pagination__arrows"
      >
        &#10096;
      </div>
      <div
        class="pagination__page"
        v-for="(pagina, index) in ITENS_RENDER"
        :key="index"
        :class="{
          'pagination--active': FIRST_PAGE + index == CURRENT_PAGE,
        }"
        @click="setPage(index + FIRST_PAGE)"
      >
        <div>
          {{ index + FIRST_PAGE }}
        </div>
      </div>
      <div
        style="display: flex"
        v-if="CURRENT_PAGE < PAGES_NUMBER - 3 && PAGES_NUMBER != FIRST_PAGE + 3"
      >
        <span>... </span>
        <span class="pagination__last-page">
          {{ PAGES_NUMBER }}
        </span>
      </div>
      <div
        @click="next()"
        v-if="CURRENT_PAGE != PAGES_NUMBER && CURRENT_PAGE"
        class="pagination__arrows"
      >
        &#10097;
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";

const props = defineProps<{
  pagination: Pagination;
}>();

const emit = defineEmits(["setPage"]);

const data = reactive({
  maxLeft: 0,
  lastPage: 0,
  firstPage: 0,
  maxItens: 5,
  goPageValue: 0,
});

const CURRENT_PAGE = computed(() => {
  return props.pagination?.page || 0;
});

const TOTAL_ELEMENTS = computed(() => {
  return props.pagination?.totalItems || 0;
});

const PER_PAGE = computed(() => {
  return 20;
});

const PAGES_NUMBER = computed(() => {
  return props.pagination?.totalPages;
});

let ITENS_RENDER = computed(() => {
  if (PAGES_NUMBER.value < data.maxItens) {
    return PAGES_NUMBER.value;
  }
  return data.maxItens;
});

const FIRST_PAGE = computed(() => {
  if (CURRENT_PAGE.value <= PAGES_NUMBER.value - 3) {
    return Math.max(CURRENT_PAGE.value - 1, 1);
  }
  if (CURRENT_PAGE.value < data.maxItens) return 1;
  return PAGES_NUMBER.value - (data.maxItens - 1);
});

function setPage(page: number) {
  emit("setPage", page);
}

const next = () => {
  if (CURRENT_PAGE.value < data.lastPage - 3) {
    data.maxLeft = 3;
  } else {
    data.maxLeft = 1;
  }
  emit("setPage", CURRENT_PAGE.value + 1);
};
const preview = () => {
  emit("setPage", CURRENT_PAGE.value - 1);
};
</script>
