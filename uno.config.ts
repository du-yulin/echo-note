import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { COLORS } from './src/appConfig'
export default defineConfig({
  shortcuts: [
    // ...
  ],
  rules: [],
  theme: {
    colors: {
      ...COLORS,
    },
    breakpoints: {
      md: '640px',
      lg: '1024px',
    },
    animation: {
      durations: {
        'fade-in': '0.4s',
        'fade-out': '0.4s',
      },
    },
  },
  presets: [presetWind3(), presetIcons(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
