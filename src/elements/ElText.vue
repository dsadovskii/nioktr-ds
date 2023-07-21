<script>
import { MediaGenerator } from '../helpers/mediaGenerator'

let params = ['size', 'lh', 'variation']
let sizeProps = new MediaGenerator(params).generateProps(String)

export default {
  name: 'ElText',
  functional: true,
  props: {
    ...sizeProps,
    heading: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
      default: 2,
    },
    tag: {
      type: String,
      default: 'h3',
    },
    size: {
      type: String,
      default: '16',
    },
    lh: {
      type: String,
      default: '24',
    },
    align: {
      type: String,
      default: 'left',
    },
    title: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    textBold: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'black',
    },
    /**
     * Font-weights: regular, semi-bold, bold, black
     **/
    fontWeight: {
      type: String,
      default: 'regular',
    },
    noWrap: {
      type: Boolean,
      default: false,
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    preLine: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: 'auto',
    },
    variation: {
      type: String,
      default: null,
    },
  },
  render(h, { props, slots, data }) {
    let tag
    tag = props.heading ? `h${props.level}` : props.tag
    let classes = {
      'el-text': true,
      // [`el-text--size-${props.size}`]: props.size,
      [`el-text--size-xs-${props.size}`]: props.size,
      [`el-text--size-s-${props.sizeS}`]: props.sizeS,
      [`el-text--size-m-${props.sizeM}`]: props.sizeM,
      [`el-text--size-l-${props.sizeL}`]: props.sizeL,
      [`el-text--size-xl-${props.sizeXl}`]: props.sizeXl,
      // [`el-text--line-height-${props.lh}`]: props.lh,
      [`el-text--line-height-xs-${props.lh}`]: props.lh,
      [`el-text--line-height-s-${props.lhS}`]: props.lhS,
      [`el-text--line-height-m-${props.lhM}`]: props.lhM,
      [`el-text--line-height-l-${props.lhL}`]: props.lhL,
      [`el-text--line-height-xl-${props.lhXl}`]: props.lhXl,
      [`el-text--font-weight-${props.fontWeight}`]: props.fontWeight,
      [`el-text--align-${props.align}`]: props.align,
      [`el-text--${props.color}`]: props.color,
      'el-text--bold': props.textBold,
      'el-text--block': props.block,
      'el-text--inline': props.inline,
      'el-text--nowrap': props.noWrap,
      'el-text--ellipsis': props.ellipsis,
      'el-text--uppercase': props.uppercase,
      'el-text--pre-line': props.preLine,
      [`el-text--variation-xs-${props.variation}`]: props.variation,
      [`el-text--variation-s-${props.variationS}`]: props.variationS,
      [`el-text--variation-m-${props.variationM}`]: props.variationM,
      [`el-text--variation-l-${props.variationL}`]: props.variationL,
      [`el-text--variation-xl-${props.variationXl}`]: props.variationXl,
      [`${data.staticClass}`]: !!data.staticClass,
      ...data.class,
    }
    const htmlContent = {}
    if (data.domProps && data.domProps.innerHTML) {
      htmlContent.domProps = {
        innerHTML: data.domProps.innerHTML,
      }
    }
    const defaultText = slots()['default']?.[0]?.text
    return h(
      tag,
      {
        class: classes,
        style: {
          maxWidth: props.maxWidth,
        },
        attrs: {
          title: (props.title || defaultText || '').replace(/(<(\/?[^>]+)>)/gm, '')?.trim(),
        },
        ...htmlContent,
      },
      [
        h(
          'span',
          {
            class: 'el-text__content',
          },
          [
            slots()['icon-prepend'] && h('div', { class: 'el-text__content-slot-left' }, [slots()['icon-prepend']]),
            slots()['default'],
            slots()['icon-append'] && h('div', { class: 'el-text__content-slot-right' }, [slots()['icon-append']]),
          ],
        ),
      ],
    )
  },
}
</script>
<style lang="scss">
.el-text {
  $block-name: &;
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
  &__content {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    &-slot-right {
      margin-right: auto;
      & > * {
        display: block;
      }
    }
    &-slot-left {
      margin-left: auto;
      & > * {
        display: block;
      }
    }
  }
  margin-bottom: 0;
  &--bold {
    #{$block-name}__content {
      font-weight: bold;
    }
  }
  &--block {
    #{$block-name}__content {
      display: inline-flex;
      width: 100%;
    }
  }
  &--inline {
    #{$block-name}__content {
      display: inline;
    }
  }
  &--align-left {
    text-align: left;
    justify-content: flex-start;
  }
  &--align-center {
    text-align: center;
    justify-content: center;
  }
  &--align-right {
    text-align: right;
    justify-content: flex-end;
  }
  &--nowrap {
    #{$block-name}__content {
      white-space: nowrap;
      flex-wrap: nowrap;
    }
  }
  &--uppercase {
    #{$block-name}__content {
      text-transform: uppercase;
    }
  }
  &--ellipsis {
    #{$block-name}__content {
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      flex-wrap: nowrap;
    }
  }
  &--pre-line {
    #{$block-name}__content {
      white-space: pre-line;
    }
  }
  @each $media, $value in $medias {
    @media (min-width: $value) {
      &--variation-#{$media} {
        &-accent-1 {
          font-size: $fs-44;
          line-height: $lh-13;
          font-weight: $fw-semi-bold;
        }
        &-accent-2 {
          font-size: 34px;
          line-height: $lh-13;
          font-weight: $fw-semi-bold;
        }
        &-title-1 {
          font-size: $fs-28;
          line-height: $lh-14;
          font-weight: $fw-semi-bold;
        }
        &-headline-1 {
          font-size: $fs-18;
          line-height: $lh-13;
          font-weight: $fw-semi-bold;
        }
        &-headline-2 {
          font-size: $fs-18;
          line-height: $lh-13;
        }
        &-headline-3 {
          font-size: $fs-16;
          line-height: $lh-13;
          font-weight: $fw-semi-bold;
        }
        &-headline-4 {
          font-size: $fs-16;
          line-height: $lh-13;
        }
        &-text-1 {
          font-size: $fs-14;
          line-height: $lh-14;
          font-weight: $fw-semi-bold;
        }
        &-text-2 {
          font-size: $fs-14;
          line-height: $lh-14;
        }
        &-footnote-1 {
          font-size: $fs-12;
          line-height: $lh-15;
          font-weight: $fw-semi-bold;
        }
        &-footnote-2 {
          font-size: $fs-12;
          line-height: $lh-15;
        }
      }
    }
  }
  @each $name, $color in $colors {
    &--#{$name} {
      color: #{$color};
    }
  }
  @each $weight, $param in $font-weights {
    &--font-weight-#{$weight} {
      font-weight: $param;
    }
  }
}
</style>
