import Vue from 'vue'
import VueI18n from 'vue-i18n'

const dateTimeFormats = {
  'en': {
    short: {
      weekday: 'short', month: 'short', day: 'numeric'
    },
    timehourmin: {
      hour: 'numeric', minute: 'numeric'
    },
    timehourminsec: {
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    }
  },
  'fr': {
    short: {
      weekday: 'short', month: 'short', day: 'numeric'
    },
    timehourmin: {
      hour: 'numeric', minute: 'numeric'
    },
    timehourminsec: {
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    }
  }
}

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  dateTimeFormats,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
