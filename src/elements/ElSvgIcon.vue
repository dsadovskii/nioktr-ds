<template>
  <component :is="type" class="el-svg-icon" :class="classes" v-html="svg" />
</template>

<script>
import { MediaGenerator } from '../helpers/mediaGenerator'

let params = ['size']
let sizeProps = new MediaGenerator(params).generateProps(String)

import svgIcons from '../plugins/load-icons'
export default {
  name: 'ElSvgIcon',
  props: {
    ...sizeProps,
    /**
     * Имя иконки
     * из assets
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Цвет иконки
     * (по токенам)
     */
    color: {
      type: String,
      default: '',
    },
    /**
     * Заливка иконки
     */
    fill: {
      type: String,
      default: 'currentColor',
    },
    /**
     * Размер
     */
    size: {
      type: String,
      default: '300',
    },
    /**
     * Тип тега
     */
    type: {
      type: String,
      default: 'span',
    },
    /**
     * Толщина линий
     * stroke-width
     */
    weight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      svg: null,
    }
  },
  computed: {
    classes() {
      return {
        // [`el-svg-icon--size-${this.size}`]: !!this.size,
        [`el-svg-icon--size-xs-${this.size}`]: this.size,
        [`el-svg-icon--size-s-${this.sizeS}`]: this.sizeS,
        [`el-svg-icon--size-m-${this.sizeM}`]: this.sizeM,
        [`el-svg-icon--size-l-${this.sizeL}`]: this.sizeL,
        [`el-svg-icon--size-xl-${this.sizeXl}`]: this.sizeXl,
        [`el-svg-icon--color-${this.color}`]: !!this.color,
      }
    },
    computedWeight() {
      if (this.weight) {
        return this.weight
      }
      switch (parseInt(this.size)) {
        case 200:
        case 250:
          return 1.2
        case 300:
        case 400:
          return 1.5
        default:
          return 2
      }
    },
  },
  watch: {
    name: {
      handler() {
        this.updateIcon()
      },
      immediate: true,
    },
    fill: {
      handler() {
        this.updateIcon()
      },
      immediate: true,
    },
    color: {
      handler() {
        this.updateIcon()
      },
      immediate: true,
    },
    size: {
      handler() {
        this.updateIcon()
      },
      immediate: true,
    },
  },
  methods: {
    updateIcon() {
      const icon = svgIcons.find(i => i.name.slice(2, -4) === this.name)
      if (icon && icon.content) {
        if (icon.content.indexOf('stroke') !== -1) {
          let filledSvg = icon.content.replace(/stroke=\S+/g, `fill="none" stroke="${this.fill}" `)
          this.svg = filledSvg.replace(/stroke-width=\S+/g, `stroke-width="${this.computedWeight}" `)
          return
        }
        this.svg = icon.content.replace(/^<svg /, `<svg style="fill: ${this.fill}"`)
      }
    },
  },
}
</script>

<style lang="scss">
.el-svg-icon {
  @include reset();
  @include reset-text-indents();
  svg {
    @include size(inherit);
  }
  @each $media, $value in $medias {
    @media (min-width: $value) {
      @each $size, $option in $sizes {
        &--size-#{$media}-#{$size} {
          @include size($option, !important);
        }
      }
    }
  }
  &--color {
    @each $color, $value in $colors {
      &-#{$color} {
        color: $value;
      }
    }
  }
}
</style>
