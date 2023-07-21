<template>
  <section class="pt-tabs">
    <a-tabs v-model="currentTab" :default-active-key="defaultActiveKey" :animated="animated">
      <slot />
      <slot name="tabBarExtraContent" slot="tabBarExtraContent" />
    </a-tabs>
  </section>
</template>

<script>
export default {
  name: 'PtTabs',
  props: {
    defaultActiveKey: {
      type: [String, Number],
      default: '1',
      required: true,
    },
    value: {
      type: [String, Number],
    },
    animated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentTab: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss">
.pt-tabs {
  $block-name: &;
  @include grow-height;
  .ant-tabs {
    @include grow-height;
    &-content {
      @include grow-height;
    }
    &-tabpane-active {
      @include grow-height;
    }
    &-nav {
    }
    &-tab {
      font-size: $fs-14;
      line-height: $lh-14;
      color: $color-black;
      &:hover {
        color: $color-blue;
      }
      &-active {
        font-weight: $fw-semi-bold;
        color: $color-blue;
      }
      &-disabled {
        opacity: 0.3;
        user-select: none;
        pointer-events: none;
      }
    }
    &-ink-bar {
      background-color: $color-blue;
      &-animated {
        background-color: $color-blue;
      }
    }
    &-top-bar {
      border-color: $color-gray-3;
    }
  }
}
</style>
