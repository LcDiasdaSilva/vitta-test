<template>
  <form @submit.prevent="filter">
    <fieldset class="form-group">
      <label id="label-sort" for="select-sort">Ordenar por:</label>
      <select id="select-sort" v-model="discoverFilter.sort_by">
        <option :value="item.id" v-for="item in discoverSotByList">
          {{ item.name }}
        </option>
      </select>
    </fieldset>

    <fieldset class="mt-3 mb-3">
      <label id="label-select-genres" for="select-genres"
        >Selecione os gêneros:</label
      >
      <VueMultiselect
        id="select-genres"
        v-model="discoverFilter.genres"
        :options="discoverGenresList"
        :multiple="true"
        :close-on-select="true"
        placeholder="Selecione os gêneros desejados"
        label="name"
        track-by="id"
        deselect-label="click para remover"
      />
    </fieldset>
    <Button
      class="mt-4"
      id="button"
      label="Buscar"
      maxWidth="100%"
      :primary="true"
      size="large"
      :disabled="false"
    ></Button>
  </form>
</template>
<script setup lang="ts">
import { inject } from "vue";
import VueMultiselect from "vue-multiselect";
import Button from "./Button.vue";

const discoverSotByList = inject(
  "discoverSotByList"
) as DiscoverFiltersItemEnum[];

const discoverGenresList = inject(
  "discoverGenresList"
) as DiscoverFiltersItemEnum[];

const discoverFilter = inject("discoverFilter") as DiscoverFilters;

const emit = defineEmits(["filter"]);

function filter() {
  emit("filter");
}
</script>
