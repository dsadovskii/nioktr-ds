<script>
export default {
  name: 'ElInput',
  functional: true,
  props: {
    value: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * All default input types
     *
     * Custom:
     * "num" only for numbers,
     * "en" only en characters,
     * "ru" only ru characters,
     * "amount_format" - for formatted amount (for example 100 000 000)
     * "score" - for formatted points
     * */
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    animated: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    rule: {
      type: String,
      default: '.*',
    },
    error: {
      type: [String, Array],
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 5,
    },
    size: {
      type: String,
      default: 's',
    },
    variant: {
      type: String,
      default: 'lightblue',
    },
    maxLength: {
      type: String,
      default: null,
    },
    mask: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  render: function(h, { data, props, parent, slots, listeners }) {
    let inputTag = props.textarea ? 'textarea' : 'input'
    let errorMessage = props.error && props.error.constructor === Array ? props.error[0] : props.error
    return h(
      'section',
      {
        class: {
          'el-input__box': true,
          'el-input__box--required': props.required && !!props.title,
        },
      },
      [
        !!props.title &&
          h(
            'span',
            {
              class: 'el-input__title',
            },
            props.title,
          ),
        h(
          'section',
          {
            class: {
              'el-input': true,
              [`el-input--variant-${props.variant}`]: true,
              [`el-input--size-${props.size}`]: true,
              'el-input--textarea': props.textarea,
              'el-input--disabled': props.disabled,
              'el-input--required': props.required,
              'el-input--error': props.error,
              'el-input--with-title': !!props.title,
              [`${data.staticClass}`]: !!data.staticClass,
              ...data.class,
            },
            on: {
              click: () => {
                parent.$refs[`el-input_${props.name}`] && parent.$refs[`el-input_${props.name}`].focus()
              },
            },
          },
          [
            !props.animated || h('output', { class: 'el-input__output', attrs: { tabIndex: -1 } }, props.value),
            h(inputTag, {
              attrs: {
                name: props.name,
                id: props.name,
                required: props.required,
                pattern: props.rule,
                type: props.mask ? 'tel' : props.type,
                placeholder: props.animated ? '' : props.placeholder,
                disabled: props.disabled,
                rows: props.rows,
              },
              class: [`el-input__${inputTag}`, { 'el-input__input-disabled': props.disabled }],
              ref: `el-input_${props.name}`,
              domProps: {
                value: (() => {
                  const isAmountFormat = props.type === 'amount_format'
                  const hasValue = props.value || props.value === 0
                  const value = (() => {
                    //amount format
                    if (hasValue && isAmountFormat) {
                      const [first] =
                        /\d*[\.]?\d*/.exec(
                          String(props.value)
                            ?.replace(/ /gm, '')
                            ?.trim(),
                        ) || []
                      const preparedValue = String(first)
                        .replace(/[^\d\.]/g, '')
                        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
                      return preparedValue
                      // score format
                    } else if (hasValue && props.type === 'score') {
                      const [first] =
                        /(\d*[\.]?\d{0,2})/.exec(
                          String(props.value)
                            ?.replace(/ /gm, '')
                            ?.trim(),
                        ) || []
                      return String(first)
                    } else return props.value || props.value === 0 ? props.value : null
                  })()
                  return value
                })(),
              },
              on: {
                input: event => {
                  if (!props.disabled) {
                    let value = event.target.value
                    switch (props.type) {
                      case 'num':
                        value = (() => {
                          const [first] = /\d*[\.]?\d*/.exec(String(event.target.value)) || []
                          return first
                        })()
                        event.target.value = value
                        break
                      case 'amount_format':
                        value = (() => {
                          const [first] =
                            /\d*[\.]?\d*/.exec(
                              String(event.target.value)
                                ?.replace(/ /gm, '')
                                ?.trim(),
                            ) || []
                          event.target.value = first
                          return first ? parseFloat(first) : null
                        })()
                        break
                      case 'en':
                        value = event.target.value.replace(/([А-Яа-я])/gm, '')
                        event.target.value = value
                        break
                      case 'ru':
                        value = event.target.value.replace(/([A-Za-z])/gm, '')
                        event.target.value = value
                        break
                      default:
                        value = event.target.value
                        break
                    }

                    if (props.maxLength || props.maxLength === 0) {
                      value = event.target.value?.slice(0, props.maxLength)
                      event.target.value = value
                    }

                    if (data.model) data.model.callback(value)
                    if (data && data.on && data.on.input) {
                      if (data.on.input[1] && data.on.input[1].constructor === Function) data.on.input[1](value)
                      if (data.on.input.constructor === Function) data.on.input(value)
                    }
                    if (data && data.nativeOn && data.nativeOn.input) {
                      if (data.nativeOn.input[1] && data.nativeOn.input[1].constructor === Function)
                        data.nativeOn.input[1](event, value)
                      if (data.nativeOn.input.constructor === Function) data.nativeOn.input(event, value)
                    }
                  }
                },
                keydown: event => {
                  if (event.keyCode === 13 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
                    event.preventDefault()
                    listeners && listeners.enter && listeners.enter()
                  }
                },
                blur: event => {
                  listeners && listeners.blur && listeners.blur(event)
                },
              },
              [!props.mask ? '' : 'directives']: [
                {
                  name: 'mask',
                  value: props.mask,
                },
              ],
            }),
            !props.label ||
              h(
                'label',
                {
                  class: ['el-input__label', { 'el-input__label-animated': props.animated }],
                  attrs: { for: props.name },
                },
                props.label,
              ),
            (slots()['append-btn'] || props.value || props.value === 0) &&
              h('div', { class: { 'el-input__slot-append': true } }, [
                (props.value || props.value === 0) &&
                  props.clearable &&
                  !props.disabled &&
                  h('button', {
                    class: 'el-input__clear-button',
                    attrs: {
                      title: 'Очистить поле',
                    },
                    on: {
                      click: () => {
                        document.getElementById(props.name).value = null
                        listeners && listeners.input && listeners.input.constructor === Function
                          ? listeners.input(null)
                          : listeners.input.constructor === Array &&
                            listeners.input.forEach(l => l && l.constructor === Function && l(null))
                      },
                    },
                  }),
                slots()['append-btn'],
              ]),
          ],
        ),
        props.error && h('small', { class: 'el-input--error-msg', attrs: { title: errorMessage } }, errorMessage),
        props.hint && h('small', { class: 'el-input--hint-msg', attrs: { title: props.hint } }, props.hint),
      ],
    )
  },
}
</script>

<style lang="scss">
.el-input {
  $block-name: &;
  width: 100%;
  position: relative;
  cursor: text;
  border-radius: 3px;
  display: inline-flex;
  &--disabled {
    cursor: not-allowed;
    background-color: $color-gray;
  }
  &__box {
    &--required {
      .el-input__title {
        &::after {
          content: '*';
          color: $color-red;
        }
      }
    }
  }
  &__clear-button {
    width: 32px;
    height: 32px;
    margin-right: 2px;
    box-shadow: none;
    background: none;
    border: none;
    padding: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    cursor: pointer;
    &::after {
      content: '+';
      font-size: 32px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      transition: all 0.3s ease;
    }
    @media #{$mobile} {
      &:active {
        &::after {
          color: $color-red;
        }
      }
    }
    @media #{$desktop} {
      &:hover {
        &::after {
          color: $color-red;
        }
      }
    }
  }
  &--with-title {
    margin-top: $space-10;
  }
  &__title {
    font-size: $fs-14;
    line-height: $lh-14;
    color: $color-dark-gray;
    max-width: 100%;
    white-space: pre-line;
    word-break: break-word;
  }
  &--size-s {
    padding: $space-8 $space-14;
    height: $size-40;
    #{$block-name}__label {
      padding-bottom: 1px;
      padding-top: 1px;
      padding-right: $space-24;
      font-size: $fs-14;
      line-height: $lh-14;
      &-animated {
        left: 0;
        top: 9px;
        padding-left: $space-16;
      }
    }
    #{$block-name}__slot-append {
      .el-dropdown {
        min-width: 90px;
        height: 40px;
      }
      & > * {
        min-height: 34px;
        height: 34px;
        max-height: 34px;
      }
      & > *[class*='-compact'] {
        min-width: 34px;
        width: 34px;
        max-width: 34px;
      }
    }
    #{$block-name}__output {
      &:not(:empty) ~ #{$block-name}__input,
      &:not(:empty) ~ #{$block-name}__textarea,
      ~ #{$block-name}__input:focus,
      ~ #{$block-name}__textarea:focus {
        ~ #{$block-name}__label {
          font-size: $fs-10;
        }
      }
    }
    #{$block-name}__input,
    #{$block-name}__input::placeholder {
      font-size: $fs-14;
    }
  }
  &--textarea {
    height: auto;
  }
  &__output {
    position: absolute;
    visibility: hidden;
    width: 0;
    height: 0;
    z-index: -9;
    &:not(:empty) ~ #{$block-name}__input,
    &:not(:empty) ~ #{$block-name}__textarea,
    ~ #{$block-name}__input:focus,
    ~ #{$block-name}__textarea:focus {
      transform: translateY($space-8);
      ~ #{$block-name}__label {
        font-size: $fs-12;
        line-height: $lh-1;
        transform: translateY(-$space-8);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }
    }
    ~ #{$block-name}__input::placeholder {
      visibility: hidden;
    }
  }
  &__input,
  &__textarea {
    width: 100%;
    font-size: $fs-16;
    line-height: $lh-14;
    border: none;
    background: none;
    box-shadow: none;
    outline: none;
    color: $color-black;
    &-disabled {
      cursor: inherit;
      resize: none;
      ~ #{$block-name}__label {
        cursor: inherit;
        user-select: none;
      }
    }
    &::placeholder {
      font-family: inherit;
      color: $color-gray;
    }
  }
  &__textarea {
    min-height: $space-28;
    max-height: $space-160;
    &::-webkit-scrollbar {
      width: $space-8;
      background-color: $color-gray;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $color-blue;
    }
  }
  &__label {
    position: absolute;
    left: 0;
    bottom: calc(100% + 5px);
    color: $color-gray;
    transition: all 0.2s ease;
    cursor: text;
    height: max-content;
    &-animated {
      display: block;
      align-items: center;
      user-select: none;
      pointer-events: none;
    }
  }
  &:hover,
  &:focus,
  &:focus-within {
    border-color: $color-blue;
  }
  &--error {
    border-color: #{$color-red} !important;
    background-color: #{$color-red}20;
    color: $color-red;
    #{$block-name} {
      &__input::placeholder,
      &__label,
      &__error-msg {
        color: $color-red;
      }
      &__label {
        background-color: transparent;
      }
    }
    &-msg {
      display: block;
      max-width: 100%;
      animation: slideDown 0.3s forwards;
      font-size: $fs-12;
      color: $color-red;
      margin-top: $space-4;
    }
    @keyframes slideDown {
      from {
        top: 100%;
        opacity: 0;
      }
      to {
        top: calc(100% + 5px);
        opacity: 1;
      }
    }
  }
  &--hint-msg {
    display: block;
    max-width: 100%;
    animation: slideDown 0.3s forwards;
    font-size: $fs-12;
    color: $color-gray;
    margin-top: $space-4;
  }
  &__slot-append {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 3px;
    margin: -8px -14px -8px 0;
    padding: 2px;
    & > * {
      height: 100%;
      min-height: auto;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
  &--variant {
    #{$block-name}__input::placeholder {
      color: $color-gray;
    }
    #{$block-name}__label {
      color: $color-gray;
      bottom: calc(100% + 20px);
    }
    &-default {
      background-color: $color-white;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    }
    &-lightblue {
      background-color: $bg-lighter-blue;
      border: 1px solid $color-gray;
    }
  }
}
</style>
