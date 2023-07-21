<template>
  <section class="el-datepicker" :class="computedClasses">
    <span class="el-datepicker__title" :class="{ required: required && !!title }">{{ title }}</span>
    <date-picker
      :id="name"
      :ref="name"
      v-model="date"
      :valueType="valueType"
      :type="type"
      :name="name"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :format="format"
      :append-to-body="appendToBody"
      :class="{ 'el-datepicker--with-title': !!this.title }"
      :disabled-date="disabledDate"
      @change="emit('change', $event)"
      @open="emit('open', $event)"
      @close="emit('close', $event)"
      @clear="emit('clear', $event)"
      @pick="emit('pick', $event)"
      @focus="emit('focus', $event)"
    />
    <small class="el-datepicker--error-msg">{{ errorMessage }}</small>
    <small v-if="hint && !errorMessage" class="el-datepicker--hint-msg">{{ hint }}</small>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'
import moment from 'moment'
import momentTz from 'moment-timezone'
export default {
  name: 'ElDatepicker',
  components: {
    DatePicker,
  },
  props: {
    value: {
      type: [String, Date, Number],
      default: null,
    },
    type: {
      type: String,
      default: 'date',
    },
    size: {
      type: String,
      default: 's',
    },
    name: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valueType: {
      type: String,
      default: 'format',
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    format: {
      type: String,
      default: 'DD.MM.YYYY',
    },
    toFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm',
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
    disabledAfterToday: {
      type: Boolean,
      default: false,
    },
    disabledBeforeToday: {
      type: Boolean,
      default: false,
    },
    defaultSelectToday: {
      type: Boolean,
      default: true,
    },
    /**
     * Функция проверяюая и устанавливающая доступна ли дата для выбора
     * Params [String] date - текущая дата
     * return Boolean, где true - дата заблокирована для выбора
     * **/
    disabledDates: {
      type: Function,
      // eslint-disable-next-line no-unused-vars
      default: date => false,
    },
    timezone: {
      type: String,
      default: momentTz.tz.guess(),
    },
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    }
  },
  computed: {
    errorMessage() {
      const err = this.error
      return err && err.constructor === Array ? err[0] : err
    },
    computedClasses() {
      return [{ 'el-datepicker--error': this.error }, { [`el-datepicker--size-${this.size}`]: true }]
    },
    currentTimezone() {
      return this.timezone || 'UTC'
    },
    useTimezone() {
      return !!this.format.match(/((HH|hh)(:|-))?(mm)((:|-)(SS|ss))?/)
    },
    date: {
      get() {
        return this.useTimezone
          ? momentTz.tz(moment(this.value, 'YYYY-MM-DD HH:mm:SS')._i, this.currentTimezone).format(this.format)
          : this.value
          ? moment(this.value, this.toFormat).format(this.format)
          : this.defaultSelectToday
          ? moment(this.value, this.toFormat).format(this.format)
          : null
      },
      set(value) {
        if (!value) return this.$emit('input', null)
        this.$emit(
          'input',
          this.useTimezone
            ? momentTz
                .tz(moment(value, this.format).format('YYYY-MM-DD HH:mm:SS'), this.currentTimezone)
                .utc()
                .format()
            : this.toFormat
            ? moment(value, this.format).format(this.toFormat)
            : moment(value, this.format).format(),
        )
      },
    },
  },
  methods: {
    emit(event, value) {
      this.$emit(event, value)
    },
    disabledDate(date) {
      switch (true) {
        case this.disabledAfterToday:
          return moment(date).isAfter(moment())
        case this.disabledBeforeToday:
          return moment(date).isBefore(moment().subtract(1, this.format === 'YYYY' ? 'year' : 'days'))
        default:
          return this.disabledDates && this.disabledDates(date)
      }
    },
  },
}
</script>

<style lang="scss">
.el-datepicker {
  $block-name: &;
  position: relative;
  width: 100%;
  &--with-title {
    margin-top: $space-10;
  }
  &__title {
    font-size: $fs-14;
    line-height: $lh-14;
    color: $color-dark-gray;
    max-width: 100%;
    white-space: normal;
    word-break: break-all;
    &.required {
      &::after {
        content: '*';
        color: $color-red;
      }
    }
  }
  &--size-m {
    .mx-datepicker {
      width: 100%;
      .mx-input {
        padding: $space-14 $space-24;
        font-size: $fs-16;
        line-height: $lh-14;
        background-color: transparent;
        border: 1px solid $color-gray;
        box-shadow: none;
        outline: none;
        color: $color-black;
        height: 52px;
        border-radius: 3px;
        &::placeholder {
          color: $color-gray;
          font-size: $fs-16;
        }
      }
      .mx-icon-calendar,
      .mx-icon-clear {
        right: 24px;
        color: $color-black;
      }
      &-main {
        width: 100%;
        max-width: 300px;
        .mx-calendar {
          width: 100%;
          &-content {
            height: auto;
            .mx-table {
              &-date {
                td,
                th {
                  font-size: $fs-16;
                  line-height: $lh-2;
                }
              }
            }
          }
        }
      }
      .mx-icon-calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 52px;
        right: 0;
        color: $color-white;
        background: $color-light-blue;
        pointer-events: none;
        border-radius: 3px;
      }
    }
  }
  &--size-s {
    .mx-datepicker {
      width: 100%;
      background-color: $bg-lighter-blue;
      .mx-input {
        padding: $space-8 $space-14;
        font-size: $fs-14;
        line-height: $lh-14;
        background-color: transparent;
        border: 1px solid $color-gray;
        box-shadow: none;
        outline: none;
        color: $color-black;
        height: 40px;
        border-radius: 3px;
        &::placeholder {
          color: $color-gray;
          font-size: $fs-14;
        }
      }
      .mx-icon-calendar,
      .mx-icon-clear {
        right: 12px;
        color: $color-black;
      }
      &-main {
        width: 100%;
        max-width: 300px;
        .mx-calendar {
          width: 100%;
          &-content {
            height: auto;
            .mx-table {
              &-date {
                td,
                th {
                  font-size: $fs-16;
                  line-height: $lh-2;
                }
              }
            }
          }
        }
      }
      .mx-icon-calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: calc(100% - 6px);
        max-height: 35px;
        right: 3px;
        color: $color-white;
        background: $color-light-blue;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          filter: brightness(1.3);
        }
      }
      &-popup {
        min-width: 350px;
      }
    }
  }
  &--size-xs {
    .mx-datepicker {
      width: 100%;
      background-color: $bg-lighter-blue;
      .mx-input {
        padding: $space-8 $space-14;
        font-size: $fs-14;
        line-height: $lh-14;
        background-color: transparent;
        border: 1px solid $color-gray;
        box-shadow: none;
        outline: none;
        color: $color-black;
        height: 34px;
        border-radius: 3px;
        &::placeholder {
          color: $color-gray;
          font-size: $fs-14;
        }
      }
      .mx-icon-calendar,
      .mx-icon-clear {
        right: 10px;
        color: $color-black;
      }
      &-main {
        width: 100%;
        max-width: 300px;
        .mx-calendar {
          width: 100%;
          &-content {
            height: auto;
            .mx-table {
              &-date {
                td,
                th {
                  font-size: $fs-16;
                  line-height: $lh-2;
                }
              }
            }
          }
        }
      }
      .mx-icon-calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: calc(100% - 6px);
        max-height: 35px;
        right: 3px;
        color: $color-white;
        background: $color-light-blue;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          filter: brightness(1.3);
        }
      }
      &-popup {
        min-width: 250px;
      }
    }
  }
  &--error {
    color: $color-red;
    .mx-input {
      border-color: #{$color-red} !important;
      background-color: #{$color-red}20;
      color: inherit;
    }
    .mx-input::placeholder {
      color: $color-red !important;
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
        top: calc(100% + 5px);
        opacity: 1;
      }
    }
  }
  &--hint {
    &-msg {
      color: $color-gray;
      font-size: $fs-12;
      left: 0;
      animation: slideDown 0.3s forwards;
    }
  }
}
</style>
