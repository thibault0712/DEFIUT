import { createVuetify } from 'vuetify'

const FONT_BODY = 'Poppins, sans-serif'
const FONT_HEADINGS = 'Orbitron, sans-serif'

const lightTheme = {
  dark: false,
  colors: {
    'background': '#FFFFFF',
    'surface': '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    'primary': '#1867C0',
    'primary-darken-1': '#1F5592',
    'secondary': '#48A9A6',
    'secondary-darken-1': '#018786',
    'error': '#B00020',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',
  },
  variables: {
    'font-family': FONT_BODY,
    'heading-font-family': FONT_HEADINGS,
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    'background': '#0B121F',
    'surface': '#141A28',
    'surface-bright': '#141A28',
    'surface-light': '#F1F1E4',
    'surface-variant': '#424242',
    'on-surface-variant': '#424242',
    'primary': '#8A9B46',
    'primary-darken-1': '#8A9B46',
    'secondary': '#BA2653',
    'secondary-darken-1': '#BA2653',
    'error': '#B00020',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',
  },
  variables: {
    'font-family': FONT_BODY,
    'heading-font-family': FONT_HEADINGS,
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})
