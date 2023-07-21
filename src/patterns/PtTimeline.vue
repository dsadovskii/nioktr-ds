<template>
  <article class="pt-timeline">
    <section v-for="time in timeline" :key="time.title" class="pt-timeline__item">
      <el-text size="14" lh="20" font-weight="bold" class="pt-timeline__item-date">{{ time.date }}</el-text>
      <el-text size="14" lh="20" class="pt-timeline__item-text">{{ time.title }}</el-text>
    </section>
  </article>
</template>

<script>
import ElText from '../elements/ElText.vue'
export default {
  name: 'PtTimeline',
  components: {
    ElText,
  },
  props: {
    timeline: {
      type: Array,
      default: () => [],
    },
    timeValue: {
      type: String,
      default: 'date',
    },
    titleValue: {
      type: String,
      default: 'title',
    },
  },
}
</script>

<style lang="scss">
.pt-timeline {
  $block-name: &;
  &__item {
    display: flex;
    padding: $space-14 0;
    &-text {
      padding-left: $space-30;
    }
    &-date {
      position: relative;
    }
    &:not(:last-child) {
      #{$block-name}__item-date:before {
        @include pseudo();
        width: 1px;
        height: 100%;
        top: $space-24;
        left: 50%;
        transform-origin: center;
        border-left: 1px dashed $bg-gray;
      }
    }
  }
}
</style>
