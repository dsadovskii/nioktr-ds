<template>
  <article class="el-file-upload">
    <section class="el-file-upload__file">
      <label class="el-file-upload__label" :for="name">
        <span class="el-file-upload__icon-prepend">
          <slot v-if="$slots['icon-prepend']" name="icon-prepend" />
        </span>
        <span class="el-file-upload__content">
          {{ text }}
        </span>
        <span class="el-file-upload__icon-append">
          <div class="icon-box">
            <el-svg-icon slot="icon-append" name="pin" size="16" color="white" />
          </div>
        </span>
      </label>
      <input
        :id="name"
        :ref="name"
        :name="name"
        :disabled="disabled"
        type="file"
        class="el-file-upload__input"
        multiple
        @change="setFile"
      />
    </section>
    <template v-if="hasFiles">
      <el-badge
        v-for="(file, index) in files"
        @close="() => removeFile(index, file)"
        variant="blue"
        color="white"
        :closable="!disabled"
        :key="`file${file}`"
        class="mt-16 mr-16"
      >
        {{ fileName(file) }}
      </el-badge>
    </template>
  </article>
</template>

<script>
import ElBadge from './ElBadge.vue'
import ElSvgIcon from './ElSvgIcon.vue'
export default {
  name: 'ElFileUpload',
  components: {
    ElBadge,
    ElSvgIcon,
  },
  props: {
    value: {},
    name: {
      type: String,
      default: null,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    files: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    hasFiles() {
      return this.value && this.value.length
    },
    text() {
      if (this.disabled) {
        return 'Files uploaded'
      } else if (this.files && this.files.length) {
        return `Selected ${this.files.length} files`
      }
      return this.title
    },
  },
  methods: {
    fileName(file) {
      if (file) {
        return file.name || file
      }
    },
    setFile(event) {
      this.$emit('input', [...event.target.files])
    },
    clearFile() {
      this.$emit('input', null)
    },
    // eslint-disable-next-line no-unused-vars
    removeFile(index, file) {
      let files = [...this.files]
      files.splice(index, 1)
      this.files = files
    },
  },
}
</script>

<style lang="scss">
.el-file-upload {
  $block-name: &;
  position: relative;
  &__input {
    display: none;
  }
  &__file,
  &__label,
  &__icon-append,
  &__icon-prepend,
  &__result {
    display: inline-flex;
    align-items: center;
  }
  &__icon-append {
    position: absolute;
    right: 2px;
    top: 1px;
    /* transform: translateY(-50%); */
    height: calc(100% - 2px);
    width: 35px;
    .icon-box {
      height: inherit;
      width: inherit;
      background-color: $bg-blue;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
    }
  }
  &__file {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: $bg-lighter-blue;
    border: 1px solid $color-gray;
    padding: 0 $space-20;
    height: 40px;
    border-radius: 3px;
  }
  &__label {
    font-size: $fs-16;
    line-height: $lh-14;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    width: 100%;
    #{$block-name}__content {
      flex-grow: 2;
      color: $color-gray;
      font-size: $fs-14;
    }
    @media #{$desktop} {
      &:hover {
        cursor: pointer;
        color: $color-blue;
        #{$block-name}__icon-append,
        #{$block-name}__icon-prepend {
          .el-icon {
            transition: all 0.2s ease;
            stroke: $color-red;
          }
        }
      }
    }
    @media #{$mobile} {
      &:active {
        color: $color-red;
        #{$block-name}__icon-append,
        #{$block-name}__icon-prepend {
          .el-icon {
            transition: all 0.2s ease;
            stroke: $color-red;
          }
        }
      }
    }
  }
  &__result {
    position: relative;
    padding-right: 20px;
  }
  &__restore {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(30%, -30%);
    @media #{$desktop} {
      &:hover {
        cursor: pointer;
        transition: all 0.2s ease;
        stroke: $color-red;
      }
    }
    @media #{$mobile} {
      &:active {
        transition: all 0.2s ease;
        stroke: $color-red;
      }
    }
  }
}
</style>
