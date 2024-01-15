<style scoped lang="scss">
@import "../../assets/break-points.scss";
.item-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  @include mq-value("600px") {
    flex-direction: column;
  }
  &__title {
    font-size: 3rem;
    font-weight: 700;
    @include mq-value("600px") {
      text-align: center;
      font-size: 2rem;
    }
  }
  &__tagline {
    font-size: 1.5rem;
    font-weight: 300;
    @include mq-value("600px") {
      text-align: center;
    }
  }
  &__genres {
    display: flex;
    margin-top: 1rem;
  }
  &__genre {
    display: flex;
    background: #000;
    color: #fff;
    padding: 0.3rem 1rem;
    margin-right: 0.3rem;
  }
}
</style>
<template>
  <main class="item-detail">
    <ProgressiveImage
      style="width: 100%"
      key="urlImage"
      v-if="urlImage"
      :src="urlImage"
    />
    <div>
      <div style="padding: 20px">
        <h1 class="item-detail__title">{{ title }}</h1>
        <h2 class="item-detail__tagline">{{ tagline }}</h2>
        <div class="item-detail__genres">
          <div v-for="genre in genres">
            <div class="item-detail__genre">
              {{ genre.name }}
            </div>
          </div>
        </div>
        <p class="mt-8">{{ overview }}</p>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ProgressiveImage } from "vue-progressive-image";

const props = defineProps<{
  title: string;
  urlImage: string;
  overview: string;
  tagline: string;
  genres: { id: number; name: string }[];
}>();
</script>
