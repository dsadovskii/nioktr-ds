<template>
  <div class="tm-content-fixed">
    <div class="tm-content-fixed__top">
      <!-- @slot Слот шапки -->
      <slot name="top" />
    </div>
    <div class="tm-content-fixed__mid">
      <div class="tm-content-fixed__mid-inner">
        <!-- @slot Слот контента -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Нужен для вписания контента
 * в оставшееся свободное пространство страницы браузера.
 */
export default {
  name: 'TmContentFixed',
}
</script>

<style lang="scss">
.tm-content-fixed {
  $block-name: &;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  @include custom-scroll();
  &__top,
  &__mid {
    &:empty {
      display: none;
    }
  }
  &__top {
    flex-shrink: 0;
  }
  &__mid {
    position: relative;
    flex-grow: 1;
    &-inner {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
