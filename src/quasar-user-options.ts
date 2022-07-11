
import 'quasar/dist/quasar.css'
import langIT from 'quasar/lang/it.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    brand: {
      primary: '#7ebeb0',
      secondary: '#357364',
      accent: '#da804b',

      dark: '#1d1d1d',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  },
  plugins: {
  },
  lang: langIT
}