<!-- SVG图标控件 -->

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'svg-icon',
    props: {
      iconClass: {
        type: String,           // 类型检测
        required: true          // 必填项
      },
      className: {
        type: String
      }
    },
    // 计算属性
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`              // 用于当做id,根据这个id查找到对应的icon
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>