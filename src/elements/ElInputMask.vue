<template>
  <section :class="boxClasses">
    <span v-if="title" class="el-input__title">{{ title }}</span>
    <section :class="inputWrapperClasses" @click="handlerWrapperClick">
      <output v-if="animated" class="el-input__output" tabindex="-1">{{ value }}</output>
      <the-mask
        v-model="inputValue"
        :ref="`el-input_${name}`"
        :mask="preparedMaskVariable"
        :masked="masked"
        :tokens="tokens"
        :class="inputClasses"
        :disabled="disabled"
        :placeholder="placeholder"
        :name="name"
        :id="name"
        :required="required"
      >
      </the-mask>
      <label v-if="label" :for="name" :class="labelClasses">{{ label }}</label>
      <div
        v-if="$slots['append-btn'] || ((inputValue || inputValue === 0) && clearable && !disabled)"
        class="el-input__slot-append"
      >
        <button
          v-if="(inputValue || inputValue === 0) && clearable && !disabled"
          class="el-input__clear-button"
          title="Очистить поле"
          @click="handleClearValue"
        />
        <slot v-if="$slots['append-btn']" name="append-btn" />
      </div>
    </section>
    <small v-if="error" class="el-input--error-msg" :title="errorMessage">{{ errorMessage }}</small>
    <small v-if="hint && !error" class="el-input--hint-msg" :title="hint">{{ hint }}</small>
  </section>
</template>

<script>
import { TheMask } from 'vue-the-mask'
export default {
  name: 'ElInput',
  components: {
    TheMask,
  },
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
     * "amount_format" - for formatted amount (for example 100 000 000)
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
    mask: {
      type: [String, Array],
      default: '',
    },
    /**
     * Должно ли возвращаемое значение быть в виде маски, или же просто введенный текст без форматирования
     * **/
    masked: {
      type: Boolean,
      default: false,
    },
    customTokens: {
      type: Object,
      default: () => ({}),
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    preparedMaskVariable: {
      get() {
        return this.mask?.constructor === Array ? [...this.mask] : this.mask
      },
    },
    tokens() {
      return {
        '#': { pattern: /\d/ },
        X: { pattern: /[0-9a-zA-Zа-яА-Я]/ },
        S: { pattern: /[a-zA-Zа-яА-Я]/ },
        A: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
        a: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
        '!': { escape: true },
        ...(this.customTokens || {}),
      }
    },
    errorMessage() {
      return this.error && this.error.constructor === Array ? this.error[0] : this.error
    },
    boxClasses() {
      return {
        'el-input__box': true,
        'el-input__box--required': this.required && !!this.title,
      }
    },
    inputWrapperClasses() {
      return {
        'el-input': true,
        [`el-input--variant-${this.variant}`]: true,
        [`el-input--size-${this.size}`]: true,
        'el-input--textarea': this.textarea,
        'el-input--disabled': this.disabled,
        'el-input--required': this.required,
        'el-input--error': this.error,
        'el-input--with-title': !!this.title,
        ...(this.$attrs || {}),
      }
    },
    inputClasses() {
      return {
        'el-input__input': true,
        'el-input__input-disabled': this.disabled,
      }
    },
    labelClasses() {
      return {
        'el-input__label': true,
        'el-input__label-animated': this.animated,
      }
    },
  },
  methods: {
    handlerWrapperClick() {
      this.$refs[`el-input_${this.name}`] && this.$refs[`el-input_${this.name}`].$el.focus()
    },
    handleClearValue() {
      document.getElementById(this.name).value = null
      this.inputValue = null
    },
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
    margin-top: $space-4;
    color: $color-gray;
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
