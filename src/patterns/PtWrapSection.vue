<template>
  <section class="pt-wrap-section" :class="classes">
    <div v-if="$slots.left || $slots.right || title" class="pt-wrap-section__head">
      <div v-if="$slots.left || title" class="pt-wrap-section__left">
        <slot name="left">
          <el-text tag="h3">{{ title }}</el-text>
        </slot>
      </div>
      <div v-if="$slots.right" class="pt-wrap-section__right">
        <slot name="right" />
      </div>
    </div>
    <slot />
  </section>
</template>

<script>
import ElText from '../elements/ElText.vue'

export default {
  name: 'PtWrapSection',
  components: {
    ElText,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    bordered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return {
        'pt-wrap-section__bordered': this.bordered,
      }
    },
  },
}
</script>

<style lang="scss">
.pt-wrap-section {
  $block-name: &;
  &__bordered {
    #{$block-name}__head {
      border-bottom: 1px solid $color-light-blue;
      padding: $space-20 0;
      margin-bottom: $space-24;
    }
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: max-content;
    & > * + * {
      margin-left: $space-10;
    }
  }
  &__left {
    min-width: 0;
    max-width: 100%;
    width: max-content;
    & + #{$block-name}__right {
      margin-left: $space-24;
    }
  }
}
</style>
