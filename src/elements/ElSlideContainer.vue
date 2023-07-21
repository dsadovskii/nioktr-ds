<template>
  <section ref="scrollContainer" :class="containerClasses" class="el-slide-container" @mousedown="onMouseDown">
    <div v-bind="containerProps" class="el-slide-container__row">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: 'ElSliderContainer',
  props: {
    wrap: {
      type: Boolean,
      default: false,
    },
    gutterY: {
      type: Number,
      default: 0,
    },
    gutterX: {
      type: Number,
      default: 0,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    gutterBottom: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      dragOptions: {
        scrollPos: 0,
        startClientPos: 0,
        distance: 0,
        isDrag: false,
        mouseIsDown: false,
      },
    }
  },
  computed: {
    containerProps() {
      return {
        gutterY: this.gutterY,
        gutterX: this.gutterX,
        class: {
          [`gutter-x-${this.gutterX}`]: !!this.gutterX,
          [`gutter-y-${this.gutterY}`]: !!this.gutterY,
        },
        style: { 'pointer-events': this.dragOptions.isDrag ? 'none' : 'auto' },
      }
    },
    containerClasses() {
      return {
        'el-slide-container--scrollable': this.scrollable,
        [`el-slide-container--gutter-bottom-${this.gutterBottom}`]: !!this.gutterBottom,
      }
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  },
  methods: {
    onMouseDown(e) {
      const dragOptions = this.dragOptions
      dragOptions.startClientPos = e.clientX
      dragOptions.mouseIsDown = true
      dragOptions.scrollPos = this.$refs.scrollContainer.scrollLeft
    },
    onMouseMove(e) {
      const dragOptions = this.dragOptions
      if (!dragOptions.mouseIsDown) return
      dragOptions.distance = e.clientX - dragOptions.startClientPos
      if (Math.abs(dragOptions.distance) > 2 && !dragOptions.isDrag) {
        dragOptions.isDrag = true
      }
      if (dragOptions.isDrag) {
        this.$refs.scrollContainer.scrollTo({
          left: dragOptions.scrollPos - dragOptions.distance,
        })
      }
      if (Math.abs(this.scrollPos)) {
        dragOptions.scrollPos = 0
      }
    },
    onMouseUp() {
      if (this.dragOptions.isDrag) {
        this.dragOptions.isDrag = false
      }
      this.dragOptions.mouseIsDown = false
    },
  },
}
</script>
<style lang="scss">
.el-slide-container {
  &.el-slide-container--scrollable {
    overflow-x: auto;
    overflow-y: hidden;
    @include hide-scrollbar();
  }
  &__row {
    display: flex;
    flex-wrap: nowrap;
    @each $name, $space in $spaces {
      &.gutter-x-#{$name} {
        @include child-indent-left($space);
      }
      &.gutter-y-#{$name} {
        padding-bottom: #{$space};
        margin-bottom: #{-$space};
        padding-top: #{$space};
        margin-top: #{-$space};
      }
    }
  }
}
</style>
