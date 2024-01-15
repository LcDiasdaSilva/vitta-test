<style scoped lang="scss">
@import "../assets/variables";
@import "../assets/break-points.scss";
.home-page {
  &__header {
    width: 100%;
    background: $color-primary;
    height: 300px;
    background-image: url("/banner.webp");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  &__content {
    max-width: 1000px;
    margin: auto;
    padding: 0 1rem 3rem 1rem;
  }
  &__banner-cupom {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 3rem 0;
  }

  h1 {
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: 300;
    text-align: center;
    color: $color-primary;
  }

  h2 {
    font-size: 3rem;
    margin-top: 1rem;
    font-weight: 300;
    text-align: center;
    color: $color-primary;
  }
  .slide-title {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
    text-align: center;
  }
  &__movies {
    margin-top: 5rem;
  }
}
</style>
<template>
  <main class="home-page">
    <header class="home-page__header">
      <div class="banner"></div>
    </header>
    <h1>A MAIOR LOJA DE FILMES E SÉRIES</h1>
    <div class="home-page__content">
      <section height="400" class="home-page__movies">
        <h2 class="slide-title">TOP 20 FILMES</h2>
        <SplideWrapper type="movie" :items="popularMovies.getItems()" />
      </section>
      <section class="mt-20">
        <h2 class="slide-title">TOP 20 SÉRIES</h2>
        <SplideWrapper type="tv" :items="popularSeries.getItems()" />
      </section>
    </div>
    
  </main>
</template>
<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import SplideWrapper from "../components/global/SplideWrapper.vue";
import type TmdbGateway from "@/gateway/tmdb/TmdbGateway";
import List from "../entities/List";
import { useRouter } from "vue-router";
import Item from "@/entities/Item";

const tmdbGateway = inject("tmdbGateway") as TmdbGateway;
const popularMovies = reactive(new List());
const popularSeries = reactive(new List());

const router = useRouter();

onMounted(async () => {
  getPopularMovies();
  getPopularSeries();
});

function gotoPage(path: string) {
  router.push({ path });
}

async function getPopularMovies() {
  const response = await tmdbGateway.getPopularMovies(
    popularMovies.getPopularFilters()
  );
  if (!response) return;
  response.results = response.results.map((item: Item) => {
    return new Item(item);
  });
  popularMovies.setData(response);
}

async function getPopularSeries() {
  const response = await tmdbGateway.getPopularSeries(
    popularSeries.getPopularFilters()
  );
  if (!response) return;
  response.results = response.results.map((item: Item) => {
    return new Item(item);
  });
  popularSeries.setData(response);
}
</script>
