<template>
  <span v-if="disabled" :class="computedClasses">
    <span v-if="iconPrepend" class="el-link__icon-prepend">
      <slot name="icon-prepend" />
    </span>
    <span class="el-link__content">
      <slot />
    </span>
    <span v-if="iconAppend" class="el-link__icon-append">
      <slot name="icon-append" />
    </span>
  </span>
  <a
    v-else-if="href"
    :href="href"
    :class="computedClasses"
    :target="blank ? '_blank' : '_self'"
    :download="download ? download || href : null"
  >
    <span v-if="iconPrepend" class="el-link__icon-prepend">
      <slot name="icon-prepend" />
    </span>
    <span class="el-link__content">
      <slot />
    </span>
    <span v-if="iconAppend" class="el-link__icon-append">
      <slot name="icon-append" />
    </span>
  </a>
  <component v-else :is="linkTag" :class="computedClasses" :to="to" :target="blank ? '_blank' : '_self'">
    <span v-if="iconPrepend" class="el-link__icon-prepend">
      <slot name="icon-prepend" />
    </span>
    <span class="el-link__content">
      <slot />
    </span>
    <span v-if="iconAppend" class="el-link__icon-append">
      <slot name="icon-append" />
    </span>
  </component>
</template>

<script>
import { MediaGenerator } from '../helpers/mediaGenerator'

let params = ['size', 'lh']
let sizeProps = new MediaGenerator(params).generateProps(String)
export default {
  name: 'ElLink',
  props: {
    ...sizeProps,
    to: {
      type: [String, Object],
      default: () => ({}),
    },
    href: {
      type: String,
      default: null,
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    blank: {
      type: Boolean,
      default: false,
    },
    nuxt: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'blue',
    },
    size: {
      type: String,
      default: '16',
    },
    lh: {
      type: String,
      default: '14',
    },
    /**
     * Font-weights: regular, semi-bold, bold, black
     **/
    fontWeight: {
      type: String,
      default: 'bold',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    download: {
      type: [Boolean, String],
      default: null,
    },
  },
  computed: {
    computedClasses() {
      return {
        'el-link': true,
        [`el-link--size-${this.size}`]: !!this.size,
        [`el-link--size-xs-${this.size}`]: this.size,
        [`el-link--size-s-${this.sizeS}`]: this.sizeS,
        [`el-link--size-m-${this.sizeM}`]: this.sizeM,
        [`el-link--size-l-${this.sizeL}`]: this.sizeL,
        [`el-link--size-xl-${this.sizeXl}`]: this.sizeXl,

        [`el-link--line-height-${this.lh}`]: !!this.lh,
        [`el-link--line-height-xs-${this.lh}`]: this.lh,
        [`el-link--line-height-s-${this.lhS}`]: this.lhS,
        [`el-link--line-height-m-${this.lhM}`]: this.lhM,
        [`el-link--line-height-l-${this.lhL}`]: this.lhL,

        [`el-link--font-weight-${this.fontWeight}`]: !!this.fontWeight,
        [`el-link--variant-${this.variant}`]: !!this.variant,
        'el-link--ellipsis': this.ellipsis,
        'el-link--inline': this.inline,
        'el-link--full-width': this.fullWidth,
        'el-link--disabled': this.disabled,
      }
    },
    iconPrepend() {
      return this.$slots['icon-prepend']
    },
    iconAppend() {
      return this.$slots['icon-append']
    },
    linkTag() {
      return this.nuxt ? 'nuxt-link' : 'router-link'
    },
  },
}
</script>

<style lang="scss">
.el-link {
  $block-name: &;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  text-decoration: none;
  @each $media, $value in $medias {
    @media (min-width: $value) {
      @each $size, $option in $font-sizes {
        &--size-#{$media}-#{$size} {
          font-size: $option;
        }
      }
      @each $height, $option in $line-heights {
        &--line-height-#{$media}-#{$height} {
          line-height: $option;
        }
      }
    }
  }
  @each $color, $param in $colors {
    &--variant-#{$color} {
      color: $param;
      @media #{$desktop} {
        &:hover {
          color: rgba($param, 0.5);
        }
      }
      @media #{$mobile} {
        &:active {
          color: rgba($param, 0.5);
        }
      }
    }
  }
  @each $height, $param in $line-heights {
    &--line-height-#{$height} {
      line-height: $param;
    }
  }

  @each $weight, $param in $font-weights {
    &--font-weight-#{$weight} {
      font-weight: $param;
    }
  }
  &--inline {
    display: inline;
    white-space: normal;
    word-break: break-word;
  }
  &--ellipsis {
    max-width: 100%;
    .el-link__content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &--full-width {
    width: 100%;
  }
  &--disabled {
    color: $color-gray;
    cursor: not-allowed;
    &:hover {
      color: $color-gray;
    }
  }
  &__icon-prepend {
    & + #{$block-name}__content {
      margin-left: 10px;
    }
  }
  &__content {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    & + #{$block-name}__icon-append {
      margin-left: 10px;
    }
  }
  &__icon-prepend,
  &__icon-append {
    display: inline-flex;
    align-items: center;
  }
}
</style>
