<template>
  <div class="el-dropdown" :id="id">
    <div class="el-dropdown__title-wrapper">
      <span class="el-dropdown__title" :class="{ required: required && !!title }">{{ title }}</span>
      <slot name="title-append" />
    </div>
    <section
      class="el-dropdown__content"
      :class="{
        'el-dropdown--with-title': !!title,
        'el-dropdown--with-append-btn': $slots['append-btn'],
        'el-dropdown--error': !!error,
        ...sizeClass,
      }"
      @click.stop.prevent
    >
      <a-select
        ref="el_dropdown_a_select"
        :mode="mode"
        class="no-select-styles"
        :dropdown-match-select-width="matchWidth"
        :default-value="computedValue"
        :value="computedValue"
        :style="styles"
        :placeholder="computedPlaceholder"
        :show-search="filterable || searchable"
        :disabled="disabled || unselectable"
        :required="required"
        :filter-option="false"
        :not-found-content="computedNotFoundContent"
        :class="classes"
        :default-open="defaultOpen"
        :getPopupContainer="getPopupContainer"
        @blur="handleBlur"
        @change="handleChange"
        @search="handleSearch"
      >
        <div slot="suffixIcon" class="custom-select-arrow">
          <el-svg-icon name="chevron_down" size="14" :color="noArrowBg ? 'gray' : 'white'" />
        </div>
        <!--eslint-disable-next-line-->
        <a-select-option v-for="(item, i) in computedOptions" :key="new Date().getTime() + i" :value="getValue(item)">
          <span v-html="getTitle(item)" />
        </a-select-option>
      </a-select>
      <div v-if="mode === 'multiple' || searchable" class="searchable-icon">
        <el-svg-icon name="search" size="12" color="white" />
      </div>
      <small class="el-dropdown--error-msg">{{ errorMessage }}</small>
      <small v-if="hint && !errorMessage" class="el-dropdown--hint-msg">{{ hint }}</small>
      <div class="el-dropdown__append-btn" v-if="$slots['append-btn'] || (hasValue && mode !== 'multiple')">
        <button
          v-if="hasValue && mode !== 'multiple' && clearable && !disabled"
          class="el-dropdown__clear-button"
          title="Очистить поле"
          @click="handlerClearField"
        ></button>
        <slot name="append-btn" />
      </div>
    </section>
  </div>
</template>

<script>
import _has from 'lodash/has'
import _get from 'lodash/get'
import ElSvgIcon from './ElSvgIcon.vue'
export default {
  name: 'ElDropdown',
  components: {
    ElSvgIcon,
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      required: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    valueField: {
      type: String,
      default: 'value',
    },
    titleField: {
      type: String,
      default: 'title',
    },
    noBg: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    noArrowBg: {
      type: Boolean,
      default: false,
    },
    matchWidth: {
      type: Boolean,
      default: false,
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: String,
      default: '1px',
    },
    /**
     * multiple, default
     * */
    mode: {
      type: String,
      default: 'default',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unselectable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 's',
    },
    notFoundContent: {
      type: String,
      default: 'Ничего не найдено',
    },
    error: {
      type: [String, Array],
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filter_search: null,
      id: `el_dropdown_${Date.now()}`,
    }
  },
  computed: {
    hasValue() {
      return this.computedValue?.constructor === Array
        ? this.computedValue?.length
        : this.computedValue || this.computedValue === 0
    },
    computedOptions() {
      if (!this.filter_search) return this.options
      return [...(this.options || [])].filter(o =>
        o[this.titleField]?.toLowerCase().match(this.filter_search?.toLowerCase()),
      )
    },
    errorMessage() {
      const err = this.error
      return err && err.constructor === Array ? err[0] : err
    },
    computedNotFoundContent() {
      return this.searchable ? this.notFoundContent : null
    },
    computedValue: {
      get() {
        return this.returnObject
          ? this.mode === 'multiple'
            ? [...this.value].map(val => val[this.valueField])
            : ((this.value || this.value === 0) && this.value[this.valueField]) || ''
          : this.value || this.value === 0
          ? this.value?.constructor === Array
            ? this.value.map(v => String(v))
            : String(this.value)
          : undefined
      },
      set(value) {
        const val = value
          ? value?.constructor === Array
            ? value.map(v => this.getRightValue(v))
            : this.getRightValue(value)
          : value
        this.$emit('input', val)
      },
    },
    classes() {
      return {
        'el-dropdown--no-arrow-bg': this.noArrowBg,
        'el-dropdown--inverted-colors': this.invertedColors,
        'el-dropdown--unselectable': this.unselectable,
        [`el-dropdown--size-${this.size}`]: true,
      }
    },
    sizeClass() {
      return {
        [`size-${this.size}`]: true,
        'el-dropdown__content--no-bg': this.noBg,
      }
    },
    styles() {
      return {
        'min-width': this.minWidth,
      }
    },
    computedPlaceholder() {
      if (!this.placeholder) {
        return this.searchable ? 'Начните вводить' : 'Выберите'
      }
      return this.placeholder
    },
  },
  mounted() {
    this.autofocus &&
      this.$nextTick(() => {
        this.$refs.el_dropdown_a_select.$el.click()
      })
  },
  methods: {
    handleBlur(val) {
      /**
       * Переопределяем блюр пакета, и сохраняем текущеее выбранное значение в переменной
       * Бывают кейсы при поиске, что пакет сам выбирал первое значение их списка. Это фиксит этот баг
       * */
      if (val === this.computedValue) return

      const computedValue = this.computedValue
      this.$nextTick(() => {
        this.handleChange(computedValue)
      })
    },
    getValue(item) {
      return _has(item, this.valueField) ? this.getValueByProp(item, this.valueField) : null
    },
    getTitle(item) {
      return _has(item, this.titleField) ? this.getValueByProp(item, this.titleField) : null
    },
    getValueByProp(item, prop) {
      return String(_get(item, prop))
    },
    getPopupContainer() {
      if (this.appendToBody) return document.body
      return document.getElementById(this.id)
    },
    handleChange(value) {
      this.filter_search = null
      if (this.returnObject) {
        if (this.mode === 'multiple') {
          value = this.options.filter(o => {
            return value.includes(o[this.valueField])
          })
        } else {
          const object = this.options.find(o => o[this.valueField] === value)
          value = {
            [this.valueField]: object[this.valueField],
            [this.titleField]: object[this.titleField],
          }
        }
      }
      const val = value
        ? value?.constructor === Array
          ? value.map(v => this.getRightValue(v))
          : this.getRightValue(value)
        : value
      this.computedValue = val
      this.$emit('change', val)
    },
    handleSearch(value) {
      if (this.filterable) return (this.filter_search = value?.replace(/[\[\]\\\?\+\*\(\)]/gm, ''))
      this.$emit('search', value)
    },
    handlerClearField() {
      const value = this.mode === 'multiple' ? [] : null
      this.computedValue = value
      this.$emit('change', value)
    },
    getRightValue(v) {
      if (v === null || v === 'null') return null
      if (isNaN(+v)) return v
      return String(+v)?.length === v?.length ? +v : v
    },
  },
}
</script>

<style lang="scss">
.ant-select-dropdown-menu-item {
  color: $color-black !important;
}
.el-dropdown {
  $block-name: &;
  position: relative;
  min-width: 1px;
  width: 100%;
  &--with-title {
    margin-top: $space-10;
  }
  &__title {
    font-size: $fs-14;
    line-height: $lh-14;
    color: $color-dark-gray;
    max-width: 100%;
    white-space: pre-line;
    word-break: break-all;
    &.required {
      &::after {
        content: '*';
        color: $color-red;
      }
    }
    &-wrapper {
      display: flex;
    }
  }
  &--unselectable {
    .ant-select-arrow {
      display: none !important;
    }
  }
  &__content {
    position: relative;
    border: 1px solid $color-gray;
    border-radius: 3px;
    background-color: $bg-lighter-blue;
    &--no-bg {
      background: transparent;
      border: none;
      .ant-select-selection {
        background: none !important;
        box-shadow: none !important;
        border: none !important;
        height: auto;
        &__rendered {
          margin-right: 30px !important;
        }
        &-selected-value {
          color: $color-blue !important;
        }
      }
      min-width: auto !important;
    }
    &.size-s {
      &#{$block-name}--with-append-btn {
        padding-right: 38px;
      }
      #{$block-name}__append-btn {
        position: absolute;
        right: 2px;
        top: 2px;
        pointer-events: none;
        & > * {
          padding: 0;
          min-height: unset;
          min-width: unset;
          height: $space-36;
          width: $space-36;
          max-width: $space-36;
          pointer-events: all;
        }
      }
    }
    &.size-xs {
      &#{$block-name}--with-append-btn {
        padding-right: $space-30;
      }
      #{$block-name}__append-btn {
        position: absolute;
        right: 2px;
        top: 2px;
        & > * {
          padding: 0;
          min-height: unset;
          min-width: unset;
          max-height: $space-28;
          width: $space-28;
          max-width: $space-28;
        }
      }
    }
  }
  &__clear-button {
    @include size(32px);
    margin-right: 2px;
    box-shadow: none;
    background: none;
    border: none;
    padding: 0;
    font-size: 0;
    line-height: 0;
    position: relative;
    cursor: pointer;
    transform: translateX(-36px);
    background: $bg-gray-5;
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
  .ant-select-selection {
    border: none;
    box-shadow: none;
    background: transparent;
    &-selected-value {
      color: black;
    }
    &__choice {
      color: $color-white !important;
      border-radius: 3px !important;
      background-color: $bg-blue !important;
      &__remove {
        color: $color-white !important;
      }
    }
  }
  &--no-arrow-bg {
    .ant-select-arrow {
      background-color: transparent !important;
    }
  }
  &--inverted-colors {
    color: $color-white !important;
    ˜ .ant-select {
      &-selection {
        background-color: $color-gray;
        border-color: $color-gray;
        color: $color-white;
        &__placeholder {
          color: $color-white;
        }
        &-selected-value {
          color: $color-white !important;
        }
      }
      &-arrow {
        color: $color-white;
      }
    }
  }
  &--size-m {
    .ant-select-selection {
      padding: 0;
      &--multiple,
      &--single {
        min-height: 52px;
        font-size: $space-16;
        line-height: $lh-14;
        margin: 0 !important;
        padding: $space-10 $space-24;
      }
      &__placeholder {
        margin-left: 0 !important;
        margin-right: 0;
      }
    }
  }
  &--size-s {
    .ant-select-selection {
      padding: 0;
      box-shadow: none !important;
      &--multiple,
      &--single {
        min-height: 40px;
        font-size: $space-14;
        line-height: $lh-14;
        margin: 0 !important;
        padding: $space-4 41px $space-4 $space-14;
      }
      &__rendered {
        margin: 0 !important;
      }
      &__placeholder {
        margin-left: 0 !important;
        margin-right: 0;
      }
    }
    .ant-select-arrow {
      margin: 0 !important;
      width: 35px;
      background-color: $bg-light-blue;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 2px;
      right: 2px;
      height: calc(100% - 4px);
      border-radius: 3px;
      &:hover {
        filter: brightness(1.3);
      }
    }
  }
  &--size-xs {
    .ant-select-selection {
      padding: 0;
      box-shadow: none !important;
      &--multiple,
      &--single {
        min-height: 32px;
        font-size: $space-14;
        line-height: $lh-14;
        margin: 0 !important;
        padding: 0 $space-36 $space-4 $space-10;
      }
      &__rendered {
        margin: 0 !important;
      }
      &__placeholder {
        margin-left: 0 !important;
        margin-right: 0;
      }
    }
    .ant-select-arrow {
      margin: 0 !important;
      width: $space-28;
      background-color: $bg-light-blue;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 2px;
      right: 2px;
      height: calc(100% - 4px);
      border-radius: 3px;
      &:hover {
        filter: brightness(1.3);
      }
    }
  }
  .ant-select {
    width: 100%;
    &-arrow,
    .anticon {
      display: inline-flex;
      align-items: center;
    }
    &-arrow {
      margin-top: -5px;
    }
  }
  .searchable-icon {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 35px;
    background-color: $bg-light-blue;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 6px);
    border-radius: 3px;
    pointer-events: none;
  }

  .size-xs {
    .searchable-icon {
      width: 25px;
    }
  }
  &--error {
    border-color: $color-red !important;
    .ant-select-selection {
      border-color: $color-red !important;
      &__placeholder {
        color: $color-red !important;
      }
    }
    &-msg {
      color: $color-red;
      position: absolute;
      left: 0;
      display: block;
      max-width: 100%;
      animation: slideDown 0.3s forwards;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: $fs-12;
    }
    @keyframes slideDown {
      from {
        top: 100%;
        opacity: 0;
      }
      to {
        top: 100%;
        opacity: 1;
      }
    }
  }
  &--hint-msg {
    color: $color-gray;
    position: absolute;
    left: 0;
    display: block;
    max-width: 100%;
    animation: slideDown 0.3s forwards;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: $fs-12;
  }
}
.ant-select-dropdown-menu-item {
  &-disabled {
    color: $color-gray !important;
  }
}
</style>
