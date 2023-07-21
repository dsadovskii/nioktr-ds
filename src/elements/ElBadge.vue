<script>
import { MediaGenerator } from '../helpers/mediaGenerator'

let params = ['size']
let sizeProps = new MediaGenerator(params).generateProps(String)
export default {
  name: 'ElBadge',
  functional: true,
  props: {
    ...sizeProps,
    size: {
      type: String,
      default: '16',
    },
    variant: {
      type: String,
      default: 'blue',
    },
    color: {
      type: String,
      default: null,
    },
    countVariant: {
      type: String,
      default: null,
    },
    countColor: {
      type: String,
      default: null,
    },
    count: {
      type: [String, Number],
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  render(h, { slots, props, data, listeners }) {
    return h(
      'div',
      {
        class: {
          'el-badge': true,
          'el-badge--uppercase': props.uppercase,
          [`el-badge--${props.variant}`]: !!props.variant,
          [`el-badge--color-${props.color}`]: !!props.color,
          'el-badge__closable': props.closable,
          'el-badge__rounded': props.rounded,
          'el-badge__clickable': props.clickable,
          [`${data.staticClass}`]: !!data.staticClass,
          [data.class]: !!data.class,
          [`el-badge--size-xs-${props.size}`]: props.size,
          [`el-badge--size-s-${props.sizeS}`]: props.sizeS,
          [`el-badge--size-m-${props.sizeM}`]: props.sizeM,
          [`el-badge--size-l-${props.sizeL}`]: props.sizeL,
          [`el-badge--size-xl-${props.sizeXl}`]: props.sizeXl,
        },
        on: {
          click(e) {
            e.preventDefault()
            e.stopPropagation()
            if (!Object.keys(listeners).length || !listeners['click']) return
            listeners['click']()
          },
        },
      },
      [
        h('span', { class: 'el-badge__content' }, [
          props.text || slots()['default'],
          !props.closable ||
            h(
              'span',
              {
                class: 'el-badge__close',
                on: {
                  click(e) {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!Object.keys(listeners).length || !listeners['close']) return
                    listeners['close']()
                  },
                },
              },
              '+',
            ),
        ]),
        !props.count ||
          h(
            'span',
            {
              class: {
                'el-badge__count': true,
                [`el-badge__count--${props.countVariant}`]: !!props.countVariant,
                [`el-badge__count--color-${props.countColor}`]: !!props.countColor,
              },
            },
            props.count,
          ),
      ],
    )
  },
}
</script>

<style lang="scss">
.el-badge {
  $block-name: &;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 3px;
  @each $media, $value in $medias {
    @media (min-width: $value) {
      @each $size, $option in $spaces {
        &--size-#{$media}-#{$size} {
          justify-content: center;
          height: #{$option};
          min-width: #{$option};
          padding: calc(#{$option} / 4);
        }
      }
    }
  }
  &__content {
    font-size: $fs-14;
    line-height: $lh-14;
  }
  &--uppercase {
    #{$block-name}__content {
      text-transform: uppercase;
    }
  }
  &__rounded {
    border-radius: $space-30;
  }
  &__closable {
    padding-right: $space-28;
  }
  &__clickable {
    cursor: pointer;
  }
  &__clickable {
    cursor: pointer;
  }
  &__count {
    font-size: $fs-14;
    line-height: $lh-14;
    padding: 1px $space-14;
    margin-left: $space-16;
  }
  &__close {
    display: inline-block;
    cursor: pointer;
    transform-origin: center;
    transform: rotate(45deg) translateY(-50%);
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: 20px;
    line-height: 0;
    @media #{$desktop} {
      &:hover {
        color: $color-red;
      }
    }
    @media #{$mobile} {
      &:active {
        color: $color-red;
      }
    }
  }
  @each $name, $color in $colors {
    &--#{$name} {
      background-color: #{$color};
      color: $color-blue;
      &-outline {
        border: 1px solid #{$color};
        background-color: transparent;
        color: #{$color};
      }
    }
    &--color-#{$name} {
      color: #{$color} !important;
    }
    &__count--#{$name} {
      background-color: #{$color};
      &-outline {
        border: 1px solid #{$color};
        background-color: transparent;
        color: #{$color};
      }
    }
    &__count--color-#{$name} {
      color: #{$color};
    }
  }
}
</style>
