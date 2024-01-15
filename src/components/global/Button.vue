<style scoped lang="scss">
@import "../../assets/variables";
.lc-simple-button {
  border: solid 1px;
  border-color: transparent;
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ease-in-out;
  border-radius: 5px;

  &--primary {
    background-color: $color-primary;
    color: #fff;
    &:hover {
      background-color: darken($color-secondary, 10%);
    }
  }
  &--secondary {
    background-color: #fff;
    color: $color-primary;
    border-color: $color-primary;
    &:hover {
      background-color: $color-primary;
      color: #fff;
    }
  }

  &--small {
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
  }

  &--medium {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }

  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  &--rounded {
    border-radius: 4rem;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &:focus {
    border-color: $color-primary;
  }
}
</style>
<template>
  <button
    @click="onClick"
    :style="style"
    class="lc-simple-button"
    :class="classes"
    data-test="lc-simple-button"
    :disabled="disabled"
    type="button"
  >
    {{ label }}
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    maxWidth?: string;
    minWidth?: string;
    rounded?: boolean;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    onClick?: any | undefined;
  }>(),
  { primary: false }
);

const classes = computed(() => ({
  "lc-simple-button": true,
  "lc-simple-button--primary": props.primary,
  "lc-simple-button--secondary": !props.primary,
  "lc-simple-button--rounded": props.rounded,
  [`lc-simple-button--${props.size || "medium"}`]: true,
}));

const style = computed(() => ({
  maxWidth: props.maxWidth,
  minWidth: props.minWidth,
  borderColor: props.borderColor,
  backgroundColor: props.backgroundColor,
  color: props.color,
}));

const emit = defineEmits<{
  (e: "click", id: number): void;
}>();

const onClick = () => {
  emit("click", 1);
};
</script>
