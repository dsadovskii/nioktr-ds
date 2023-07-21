<script>
import { MediaGenerator } from '../helpers/mediaGenerator'
import _has from 'lodash/has'

let params = ['size']
let sizeProps = new MediaGenerator(params).generateProps()
export default {
  name: 'ElLogo',
  functional: true,
  props: {
    ...sizeProps,
    src: {
      type: String,
      default: '/default/no-user.svg',
      required: true,
    },
    src2x: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: 'Some Image',
    },
    maxWidth: {
      type: String,
      default: '',
    },
    maxHeight: {
      type: String,
      default: '100%',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  render(h, { props, listeners, data }) {
    let srcset = props.src
    if (props.src2x) {
      srcset = `${props.src} 1x, ${props.src2x} 2x`
    }
    if (!props.src || !props.src.length) return false
    return h(
      'figure',
      {
        class: [
          `el-image ${_has(data, 'staticClass') ? data.staticClass : ''}`,
          { [`el-image--size-xs-${props.size}`]: props.size },
          { [`el-image--size-s-${props.sizeS}`]: props.sizeS },
          { [`el-image--size-m-${props.sizeM}`]: props.sizeM },
          { [`el-image--size-l-${props.sizeL}`]: props.sizeL },
          { [`el-image--size-xl-${props.sizeXl}`]: props.sizeXl },
          { [`el-image--size-xl-${props.sizeXl}`]: props.sizeXl },
          { ['el-image--bordered']: props.bordered },
          { ['el-image--rounded']: props.rounded },
          { ['el-image--shadow']: props.shadow },
        ],
        style: {
          [props.maxWidth ? 'max-width' : '']: props.maxWidth,
        },
        ref: 'el-image',
      },
      [
        h('img', {
          attrs: {
            [props.src2x ? 'srcset' : 'src']: srcset,
            alt: props.alt,
          },
          style: {
            maxHeight: props.maxHeight,
          },
          on: {
            click() {
              if (!Object.keys(listeners).length || props.disabled) return
              listeners['click'] && listeners['click']()
            },
            load() {
              if (!Object.keys(listeners).length || props.disabled) return
              listeners['load'] && listeners['load']()
            },
          },
        }),
      ],
    )
  },
}
</script>
<style lang="scss">
.el-image {
  $block-name: &;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  overflow: hidden;
  @each $media, $value in $medias {
    @media (min-width: $value) {
      @each $size, $option in $sizes {
        &--size-#{$media}-#{$size} {
          @include size($option);
        }
        &--max-width-#{$size} {
          max-width: $option;
        }
      }
    }
  }
  &--rounded {
    border-radius: $radius-round;
  }
  &--bordered {
    border: $space-2 solid $color-blue;
  }
  &--shadow {
    box-shadow: 0px 5px 15px rgba($color-black, 0.3);
  }
  img {
    width: auto;
    height: auto;
    user-select: none;
  }
}
</style>
