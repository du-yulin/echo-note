<template>
  <div class="resizable" :style="resizableStyle" ref="resizable">
    <div class="resizable__content">
      <slot></slot>
    </div>
    <div
      v-if="barPosition === 'right' || barPosition === 'both'"
      class="resizable__bar"
      :style="rightBarStyle"
      ref="rightBar"
    >
      <div class="resizable__line" :style="rightLineStyle"></div>
    </div>
    <div
      v-if="barPosition === 'bottom' || barPosition === 'both'"
      class="resizable__bar"
      :style="bottomBarStyle"
      ref="bottomBar"
    >
      <div class="resizable__line" :style="bottomLineStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, type CSSProperties } from 'vue'
import { useEventListener } from '@vueuse/core'
type Props = {
  w?: number
  h?: number
  barPosition?: 'right' | 'bottom' | 'both'
  barSize?: number
  lineSize?: number
  lineActiveSize?: number
  lineColor?: string
  lineActiveColor?: string
}
const {
  w,
  h,
  barPosition = 'right',
  barSize = 12,
  lineSize = 1,
  lineActiveSize = 2,
  lineColor = '#ccc',
  lineActiveColor = '#1890ff',
} = defineProps<Props>()

const emit = defineEmits<{
  resizing: [event: MouseEvent, size: { w: number; h: number }]
  endResize: [size: { w: number; h: number }]
}>()

const rightBarRef = useTemplateRef('rightBar')
const bottomBarRef = useTemplateRef('bottomBar')
const resizableRef = useTemplateRef('resizable')
const isHHover = ref(false)
const isVHover = ref(false)
const isHResizing = ref(false)
const isVResizing = ref(false)
const rect = reactive({ w: 0, h: 0 })
const num2px = (num: number | undefined, defaultVal: string = 'auto') =>
  num !== undefined ? `${num}px` : defaultVal

const resizableStyle = computed(
  () =>
    <CSSProperties>{
      height: num2px(h),
      width: num2px(w),
    },
)
const rightBarStyle = computed(
  () =>
    <CSSProperties>{
      top: 0,
      right: 0,
      transform: w! <= barSize ? 'translateX(100%)' : 'translateX(50%)',
      width: num2px(barSize),
      height: '100%',
      cursor: 'ew-resize',
    },
)
const bottomBarStyle = computed(
  () =>
    <CSSProperties>{
      bottom: 0,
      left: 0,
      transform: h! <= barSize ? 'translateY(100%)' : 'translateY(50%)',
      width: '100%',
      height: num2px(barSize),
      cursor: 'ns-resize',
    },
)
const rightLineStyle = computed(
  () =>
    <CSSProperties>{
      width: isHHover.value || isHResizing.value ? num2px(lineActiveSize) : num2px(lineSize),
      height: '100%',
      left: w! <= barSize ? '0' : `calc(50% - ${lineSize / 2}px)`,
      backgroundColor: isHHover.value || isHResizing.value ? lineActiveColor : lineColor,
    },
)
const bottomLineStyle = computed(
  () =>
    <CSSProperties>{
      height: isVHover.value || isVResizing.value ? num2px(lineActiveSize) : num2px(lineSize),
      width: '100%',
      top: h! <= barSize ? '0' : `calc(50% - ${lineSize / 2}px)`,
      backgroundColor: isVHover.value || isVResizing.value ? lineActiveColor : lineColor,
    },
)

const HMouseEnterHandler = () => (isHHover.value = true)
const VMouseEnterHandler = () => (isVHover.value = true)
const HMouseLeaveHandler = () => (isHHover.value = false)
const VMouseLeaveHandler = () => (isVHover.value = false)
const HMouseDownHandler = (e: MouseEvent) => {
  e.preventDefault()
  isHResizing.value = true
  window.addEventListener('mousemove', HMouseMoveHandler)
  window.addEventListener('mouseup', MouseupHandler)
}
const VMouseDownHandler = (e: MouseEvent) => {
  e.preventDefault()
  isVResizing.value = true
  window.addEventListener('mousemove', VMouseMoveHandler)
  window.addEventListener('mouseup', MouseupHandler)
}
const HMouseMoveHandler = (e: MouseEvent) => {
  e.preventDefault()
  rect.w += e.movementX
  emit('resizing', e, rect)
}
const VMouseMoveHandler = (e: MouseEvent) => {
  e.preventDefault()
  rect.h += e.movementY
  emit('resizing', e, rect)
}
const MouseupHandler = () => {
  isHResizing.value = false
  isVResizing.value = false
  emit('endResize', rect)
  window.removeEventListener('mousemove', HMouseMoveHandler)
  window.removeEventListener('mousemove', VMouseMoveHandler)
  window.removeEventListener('mouseup', MouseupHandler)
}

const initRect = () => {
  if (!resizableRef.value) return
  const { width, height } = resizableRef.value.getBoundingClientRect()
  rect.w = width
  rect.h = height
}

useEventListener('resize', initRect)
useEventListener(rightBarRef, 'mouseenter', HMouseEnterHandler)
useEventListener(rightBarRef, 'mouseleave', HMouseLeaveHandler)
useEventListener(bottomBarRef, 'mouseenter', VMouseEnterHandler)
useEventListener(bottomBarRef, 'mouseleave', VMouseLeaveHandler)
useEventListener(rightBarRef, 'mousedown', HMouseDownHandler)
useEventListener(bottomBarRef, 'mousedown', VMouseDownHandler)
onMounted(() => {
  initRect()
})
</script>

<style scoped>
.resizable {
  position: relative;
  max-width: 100%;
}
.resizable__content {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.resizable__bar {
  position: absolute;
}
.resizable__line {
  position: absolute;
  transition:
    background 0.2s ease-in-out,
    width 0.2s ease-in-out,
    height 0.2s ease-in-out;
}
</style>
