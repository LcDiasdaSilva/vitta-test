<style scoped lang="scss">
.listing-page {
  max-width: 1400px;
  margin: auto;

  padding: 5rem 3rem !important;
  &__title {
    font-size: 3rem;
  }
  &__pagination-wrapper {
    width: 100%;
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  &__grid-area {
    min-height: 700px;
  }
}
</style>
<template>
  <main class="listing-page">
    <h1 class="listing-page__title" v-if="route.params.type === 'movie'">
      Filmes
    </h1>
    <h1 class="listing-page__title" v-if="route.params.type === 'tv'">
      Séries
    </h1>
    <Filter class="mt-8 mb-20" @filter="filter" :itemType="route.params.type" />
    <div class="listing-page__grid-area">
      <ItemsGrid
        v-if="route.params.type === 'movie'"
        :items="discoverList.getItems()"
        :type="route.params.type"
      />
      <ItemsGrid
        v-if="route.params.type === 'tv'"
        :type="route.params.type"
        :items="discoverList.getItems()"
      />
    </div>

    <div class="listing-page__pagination-wrapper">
      <Pagination
        @setPage="setPage"
        :pagination="discoverList.getPagination()"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { provide, inject, onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Filter from "@/components/global/Filter.vue";
import ItemsGrid from "../components/global/ItemsGrid.vue";
import Pagination from "../components/global/Pagination.vue";
import type TmdbGateway from "@/gateway/tmdb/TmdbGateway";
import List from "@/entities/List";
import Item from "@/entities/Item";

const tmdbGateway = inject("tmdbGateway") as TmdbGateway;
const discoverList = reactive(new List());
const route = useRoute();
const discoverGenresList = ref([] as DiscoverFiltersItemEnum[]);

onMounted(async () => {
  if (route.params.type === "movie") {
    getGenresListMovies();
  }
  if (route.params.type === "tv") {
    getGenresListSeries();
  }

  loadingDiscover();
});

watch(
  () => route.params.type,
  () => {
    discoverList.setPage(1);
    loadingDiscover();
  }
);

function loadingDiscover() {
  if (route.params.type === "movie") {
    getGenresListMovies();
    getDiscoverMovies();
  }
  if (route.params.type === "tv") {
    getDiscoverSeries();
    getGenresListSeries();
  }
}

const discoverFilter = reactive(
  discoverList.getDiscoverFilters() as DiscoverFilters
);

function filter() {
  discoverList.setDiscoverFilters(discoverFilter);
  loadingDiscover();
}

async function getGenresListMovies() {
  const { genres } = await tmdbGateway.getGenresListMovies();
  if (genres) discoverGenresList.value = genres;
}

async function getGenresListSeries() {
  const { genres } = await tmdbGateway.getGenresListSeries();
  if (genres) discoverGenresList.value = genres;
}

async function getDiscoverMovies() {
  const response = await tmdbGateway.getDiscoverMovies(
    discoverList.getDiscoverFilters()
  );
  if (!response) return;
  response.results = response.results.map((item: Item) => {
    return new Item(item);
  });
  discoverList.setData(response);
}

async function getDiscoverSeries() {
  const response = await tmdbGateway.getDiscoverSeries(
    discoverList.getDiscoverFilters()
  );
  if (!response) return;
  response.results = response.results.map((item: Item) => {
    return new Item(item);
  });
  discoverList.setData(response);
}

function setPage(page: number) {
  discoverList.setPage(page);
  loadingDiscover();
}

provide("discoverFilter", reactive(discoverFilter));
provide("discoverSotByList", reactive(discoverList.getDiscoverSortByList()));
provide("discoverGenresList", discoverGenresList);
</script>
