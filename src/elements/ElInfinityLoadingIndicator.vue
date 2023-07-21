<template>
  <section class="el-infinity-loading__wrapper">
    <div :id="id" :style="styles" class="el-infinity-loading" :class="classes"></div>
  </section>
</template>
<script>
export default {
  name: 'ElInfinityLoading',
  props: {
    /**
     * За какое расстояние(px) инициировать $emit
     * **/
    overlap: {
      type: Number,
      default: 100,
    },
    active: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      observer: null,
      el: null,
      id: null,
    }
  },
  computed: {
    styles() {
      return {
        transform: `translate${this.horizontal ? 'X' : 'Y'}(-${this.overlap}px)`,
      }
    },
    classes() {
      return {
        horizontal: this.horizontal,
      }
    },
  },
  watch: {
    active(value) {
      if (!value) return this.observer.disconnect()
      this.setObserver()
    },
  },
  created() {
    this.id = `indicator-${Date.now()}`
  },
  mounted() {
    this.setObserver()
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    setObserver() {
      this.el = document.querySelector(`#${this.id}`)
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio !== 0) {
          this.$emit('loading')
        }
      })
      this.observer.observe(this.el)
    },
  },
}
</script>

<style lang="scss">
.el-infinity-loading {
  $block-name: &;
  position: absolute;
  height: 1px;
  width: 100%;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  background-color: transparent;
  &__wrapper {
    position: relative;
    margin: 0 !important;
  }
  &.horizontal {
    width: 1px;
    height: 100%;
  }
}
</style>
