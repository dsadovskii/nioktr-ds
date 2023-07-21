<template>
  <article class="el-preview">
    <slot name="left">
      <a-badge v-bind="previewNotifies">
        <a-avatar v-if="src" :size="logoSize" :src="src" shape="circle" />
      </a-badge>
    </slot>
    <section class="el-preview__content">
      <div class="el-preview__content--top">
        <slot name="top" />
      </div>
      <div v-if="$slots['bottom']" class="el-preview__content--bottom">
        <slot name="bottom" />
      </div>
    </section>
    <div class="el-preview__content--right">
      <slot name="right" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'ElPreview',
  props: {
    src: {
      type: String,
      default: null,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: null,
    },
    logoSize: {
      type: Number,
      default: 64,
    },
  },
  computed: {
    previewNotifies() {
      const props = {}
      !this.dot || (props.dot = true)
      !this.count || (props.count = this.count)
      return props
    },
  },
}
</script>

<style lang="scss">
.el-preview {
  display: flex;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: $space-24;
    max-width: 100%;
    &--top,
    &--bottom {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      max-width: 100%;
    }
    &--right {
      margin-left: auto;
    }
  }
}
</style>
