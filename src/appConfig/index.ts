import type { AliasToken } from 'ant-design-vue/es/theme/internal'

/**
 * @description 默认主题颜色模式
 */
export const DEFAULT_COLOR_MODE = 'auto'
/**
 * @description 主题颜色配置
 */
export const COLORS = {
  bg: '#fff',
  bgDark: '#191919',
  bgLayout: '#f8f8f7',
  bgLayoutDark: '#202020',
  // primary
  primary: '#2383e2',
  primaryDark: '#2383e2',
  primaryBlack: '#000',
  primaryBlackDark: '#fff',
  primaryBlackHover: '#000',
  primaryBlackHoverDark: '#fff',
  primaryBlackText: '#fff', // primary 类型button text颜色
  primaryBlackTextDark: '#000', // primary 类型button text颜色
  primaryBlackTextHover: '#fff', // primary 类型button text颜色
  primaryBlackTextHoverDark: '#000', // primary 类型button text颜色
  primaryBlackBg: '#0000000f',
  primaryBlackBgDark: '#ffffff0e',
  // siderBg: '#f8f8f7',
  // siderBgDark: '#202020',
  // siderItem: '#5f5e5b',
  // siderItemDark: '#9b9b9b',
  // siderItemActive: '#32302c',
  // siderItemActiveDark: '#ffffffcf',
  // siderItemBgHover: '#0000000f',
  // siderItemBgHoverDark: '#ffffff0e',
  // siderItemBgActive: '#0000000f',
  // siderItemBgActiveDark: '#ffffff0e',
}
/**
 * @description antd主题token
 */
type AntdThemeToken = { dark: Partial<AliasToken>; light: Partial<AliasToken> }
export const GLOBAL_TOKEN: Readonly<AntdThemeToken> = {
  light: {
    colorBgBase: COLORS.bg,
    colorPrimary: COLORS.primary,
    colorBgLayout: COLORS.bgLayout,
  },
  dark: {
    colorBgBase: COLORS.bgDark,
    colorPrimary: COLORS.primaryDark,
    colorBgLayout: COLORS.bgLayoutDark,
  },
}
export const BLACK_PRIMARY_TOKEN: Readonly<AntdThemeToken> = {
  light: {
    colorPrimary: COLORS.primaryBlack,
    colorPrimaryHover: COLORS.primaryBlackHover,
    colorPrimaryBg: COLORS.primaryBlackBg,
    // colorPrimaryTextHover: COLORS.primaryBlackTextHover,
    colorTextLightSolid: COLORS.primaryBlackText, // primary 类型button text颜色
  },
  dark: {
    colorPrimary: COLORS.primaryBlackDark,
    colorPrimaryHover: COLORS.primaryBlackHoverDark,
    colorPrimaryBg: COLORS.primaryBlackBgDark,
    // colorPrimaryTextHover: COLORS.primaryBlackTextHoverDark,
    colorTextLightSolid: COLORS.primaryBlackTextDark, // primary 类型button text颜色
  },
}
/**
 * @description md屏幕及以上，header 高度
 */
export const HEADER_HEIGHT = 64
/**
 * @description sm屏幕，header 高度
 */
export const HEADER_HEIGHT_SM = 48
/**
 * @description md屏幕及以上，侧边栏展开宽度
 */
export const SIDER_DEFAULT_WIDTH = 200
/**
 * @description md屏幕及以上，侧边栏展开最小宽度
 */
export const SIDER_MIN_WIDTH = 200
/**
 * @description md屏幕及以上，侧边栏展开最大宽度
 */
export const SIDER_MAX_WIDTH = 450
/**
 * @description md及以上屏幕，触发侧边栏covershow的鼠标的与屏幕左侧x方向距离
 */
export const SIDER_COVERSHOW_TRIGGER_X = 48
/**
 * @description md及以上屏幕，关闭侧边栏covershow的鼠标的与sider右边x方向距离
 */
export const SIDER_COVERSHOW_OFF_TRIGGER_X = 16
/**
 * @description sm屏幕，侧边栏covershow时右边距
 */
export const SIDER_COVERSHOW_MARGIN_RIGHT_SM = 150
/**
 * @description md及以上屏幕，侧边栏covershow时左边距
 */
export const SIDER_COVERSHOW_MARGIN_LEFT = 8
/**
 * @description md及以上屏幕，侧边栏covershow时上下边距
 */
export const SIDER_COVERSHOW_MARGIN_Y = 64
