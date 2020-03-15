import Vue from 'vue'
import i18n from '@/i18n'

export const SettingsService = new Vue({
  i18n,
  data: function () {
    return {
      defaultSettings: {
        city: 'Limoges,FR',
        isaccurate: false,
        isgeolocate: false,
        cnt: 14,
        isanimate: true,
        tempunitid: 0,
        speedunitid: 0,
        applanguageid: 0,
        weatherlanguageid: 0
      },
      currentSettings: {},
      apiId: '26e1b3965e3ffa342a675e4b6b735832'

    }
  },
  methods: {
    getTempList: function () {
      return {

        0: {
          id: 0,
          label: 'standard',
          owm: 'standard',
          label_setting: this.$t('Kelvin (K)'),
          unit: this.$t('K')
        },
        1: {
          id: 1,
          label: 'imperial',
          owm: 'imperial',
          label_setting: this.$t('Fahrenheit (°F)'),
          unit: this.$t('°F')
        },
        2: {
          id: 2,
          label: 'metric',
          owm: 'metric',
          label_setting: this.$t('Celsius (°C)'),
          unit: this.$t('°C')
        }
      }
    },
    getSpeedList: function () {
      return {
        0: {
          id: 0,
          label: 'meterspersecond',
          label_setting: this.$t('Meters per second (m/s)'),
          unit: this.$t('m/s')
        },
        1: {
          id: 1,
          label: 'kilometersperhour',
          label_setting: this.$t('Kilometers per hour (km/h)'),
          unit: this.$t('km/h')
        },
        3: {
          id: 2,
          label: 'milesperhour',
          label_setting: this.$t('Miles per hour (MpH)'),
          unit: this.$t('MpH')
        }
      }
    },
    getAppLanguageList: function () {
      return {
        0: {
          id: 0,
          label: 'en',
          label_setting: 'English'
        },
        1: {
          id: 1,
          label: 'fr',
          label_setting: 'Français'
        }
      }
    },

    getWeatherLanguageList: function () {
      return {
        0: {
          id: 0,
          label: 'en',
          label_setting: 'English'
        },
        1: {
          id: 1,
          label: 'fr',
          label_setting: 'Français'
        },
        2: {
          id: 2,
          label: 'ru',
          label_setting: 'Русский'
        },
        3: {
          id: 3,
          label: 'it',
          label_setting: 'Italiano'
        },
        4: {
          id: 4,
          label: 'sp',
          label_setting: 'Español'
        },
        5: {
          id: 5,
          label: 'ua',
          label_setting: 'Українська'
        },
        6: {
          id: 6,
          label: 'de',
          label_setting: 'Deutsch'
        },
        7: {
          id: 7,
          label: 'pt',
          label_setting: 'Português'
        },
        8: {
          id: 8,
          label: 'ro',
          label_setting: 'Română'
        },
        9: {
          id: 9,
          label: 'pl',
          label_setting: 'Polski'
        },
        10: {
          id: 10,
          label: 'fi',
          label_setting: 'Suomi'
        },
        11: {
          id: 11,
          label: 'nl',
          label_setting: 'Nederlands'
        },
        12: {
          id: 12,
          label: 'bg',
          label_setting: 'български език'
        },
        13: {
          id: 13,
          label: 'se',
          label_setting: 'Svenska'
        },
        14: {
          id: 14,
          label: 'zh_tw',
          label_setting: '达伟'
        },
        15: {
          id: 15,
          label: 'zh_cn',
          label_setting: '汉语'
        },
        16: {
          id: 16,
          label: 'tr',
          label_setting: 'Türkçe'
        },
        17: {
          id: 17,
          label: 'cz',
          label_setting: 'Čeština'
        },
        18: {
          id: 18,
          label: 'gl',
          label_setting: 'Galego'
        },
        19: {
          id: 19,
          label: 'vi',
          label_setting: 'Tiếng Việt'
        },
        20: {
          id: 20,
          label: 'ar',
          label_setting: 'اللغة العربية'
        },
        21: {
          id: 21,
          label: 'mk',
          label_setting: 'Mакедонски'
        },
        22: {
          id: 22,
          label: 'sk',
          label_setting: 'Slovenčina'
        }
      }
    },
    getPercList: function () {
      return {
        0: {
          id: 0,
          label: 'default',
          unit: '%'
        }
      }
    },
    getPressureList: function () {
      return {
        0: {
          id: 0,
          label: 'default',
          unit: 'hPa'
        }
      }
    },
    getPrecipList: function () {
      return {
        0: {
          id: 0,
          label: 'millimeters',
          unit: 'mm'
        },
        1: {
          id: 1,
          label: 'inch',
          unit: 'inch'
        }
      }
    },
    getCity: function () {
      return this.currentSettings.city || this.defaultSettings.city
    },
    setCity: function (city) {
      this.currentSettings.city = city
    },
    getIsAccurate: function () {
      var isAccurate = this.currentSettings.isaccurate
      if (typeof (isAccurate) !== 'undefined') {
        if (isAccurate === 'true' || isAccurate === true) {
          return true
        } else if (isAccurate === 'false' || isAccurate === false) {
          return false
        } else {
          return this.defaultSettings.isaccurate
        }
      } else {
        return this.defaultSettings.isaccurate
      }
    },
    setIsAccurate: function (isaccurate) {
      this.currentSettings.isaccurate = isaccurate
    },
    getIsGeolocate: function () {
      var isGeolocate = this.currentSettings.isgeolocate
      if (typeof (isGeolocate) !== 'undefined') {
        if (isGeolocate === 'true' || isGeolocate === true) {
          return true
        } else if (isGeolocate === 'false' || isGeolocate === false) {
          return false
        } else {
          return this.defaultSettings.isgeolocate
        }
      } else {
        return this.defaultSettings.isgeolocate
      }
    },
    setIsGeolocate: function (isgeolocate) {
      this.currentSettings.isgeolocate = isgeolocate
    },
    getIsAnimate: function () {
      var isAnimate = this.currentSettings.isanimate
      if (typeof (isAnimate) !== 'undefined') {
        if (isAnimate === 'true' || isAnimate === true) {
          return true
        } else if (isAnimate === 'false' || isAnimate === false) {
          return false
        } else {
          return this.defaultSettings.isanimate
        }
      } else {
        return this.defaultSettings.isanimate
      }
    },
    setIsAnimate: function (isanimate) {
      this.currentSettings.isanimate = isanimate
    },
    getTempUnitId: function () {
      var TempList = this.getTempList()
      if (typeof (this.currentSettings.tempunitid) !== 'undefined') {
        if (typeof (TempList[this.currentSettings.tempunitid]) !== 'undefined') {
          return TempList[this.currentSettings.tempunitid].id
        }
      }
      return this.defaultSettings.tempunitid
    },
    getTempUnit: function () {
      var TempList = this.getTempList()
      if (typeof (this.currentSettings.tempunitid) !== 'undefined') {
        if (typeof (TempList[this.currentSettings.tempunitid]) !== 'undefined') {
          return TempList[this.currentSettings.tempunitid]
        }
      }
      return TempList[this.defaultSettings.tempunitid]
    },
    setTempUnitId: function (tempunitid) {
      this.currentSettings.tempunitid = tempunitid
    },
    getSpeedUnitId: function () {
      var speedList = this.getSpeedList()
      if (typeof (this.currentSettings.speedunitid) !== 'undefined') {
        if (typeof (speedList[this.currentSettings.speedunitid]) !== 'undefined') {
          return speedList[this.currentSettings.speedunitid].id
        }
      }
      return this.defaultSettings.speedunitid
    },
    getSpeedUnit: function () {
      var speedList = this.getSpeedList()
      if (typeof (this.currentSettings.speedunitid) !== 'undefined') {
        if (typeof (speedList[this.currentSettings.speedunitid]) !== 'undefined') {
          return speedList[this.currentSettings.speedunitid]
        }
      }
      return speedList[this.defaultSettings.speedunitid]
    },
    setSpeedUnitId: function (speedunitid) {
      this.currentSettings.speedunitid = speedunitid
    },
    getAppLanguageId: function () {
      var appLanguageList = this.getAppLanguageList()
      if (typeof (this.currentSettings.applanguageid) !== 'undefined') {
        if (typeof (appLanguageList[this.currentSettings.applanguageid]) !== 'undefined') {
          return appLanguageList[this.currentSettings.applanguageid].id
        }
      }
      return this.defaultSettings.applanguageid
    },
    getAppLanguage: function () {
      var appLanguageList = this.getAppLanguageList()
      if (typeof (this.currentSettings.applanguageid) !== 'undefined') {
        if (typeof (appLanguageList[this.currentSettings.applanguageid]) !== 'undefined') {
          return appLanguageList[this.currentSettings.applanguageid]
        }
      }
      return appLanguageList[this.defaultSettings.applanguageid]
    },
    setAppLanguageId: function (applanguageid) {
      this.currentSettings.applanguageid = applanguageid
    },
    getWeatherLanguageId: function () {
      var weatherLanguageList = this.getWeatherLanguageList()
      if (typeof (this.currentSettings.weatherlanguageid) !== 'undefined') {
        if (typeof (weatherLanguageList[this.currentSettings.weatherlanguageid]) !== 'undefined') {
          return weatherLanguageList[this.currentSettings.weatherlanguageid].id
        }
      }
      return this.defaultSettings.weatherlanguageid
    },
    getWeatherLanguage: function () {
      var weatherLanguageList = this.getWeatherLanguageList()
      if (typeof (this.currentSettings.weatherlanguageid) !== 'undefined') {
        if (typeof (weatherLanguageList[this.currentSettings.weatherlanguageid]) !== 'undefined') {
          return weatherLanguageList[this.currentSettings.weatherlanguageid]
        }
      }
      return weatherLanguageList[this.defaultSettings.weatherlanguageid]
    },
    setWeatherLanguageId: function (weatherlanguageid) {
      this.currentSettings.weatherlanguageid = weatherlanguageid
    },
    isLanguageSet: function () {
      if (typeof (this.currentSettings.applanguageid) === 'undefined' || typeof (this.currentSettings.weatherlanguageid) === 'undefined') {
        return false
      }
      return true
    },
    getCnt: function () {
      return this.currentSettings.cnt || this.defaultSettings.cnt
    },
    setCnt: function (cnt) {
      this.currentSettings.cnt = cnt
    },
    getApiId: function () {
      return this.apiId
    },
    getPercUnit: function () {
      var PercList = this.getPercList()
      if (typeof (PercList[0]) !== 'undefined') {
        return PercList[0]
      }
      return PercList[0]
    },
    getPrecipUnit: function () {
      var PrecipList = this.getPrecipList()
      if (typeof (PrecipList[0]) !== 'undefined') {
        return PrecipList[0]
      }
      return PrecipList[0]
    },
    getPressureUnit: function () {
      var PressureList = this.getPressureList()
      if (typeof (PressureList[0]) !== 'undefined') {
        return PressureList[0]
      }
      return PressureList[0]
    },
    getAllSettings: function () {
      var objParam = {}
      objParam.city = this.getCity()
      objParam.isaccurate = this.getIsAccurate()
      objParam.isanimate = this.getIsAnimate()
      objParam.isgeolocate = this.getIsGeolocate()
      objParam.tempunitid = this.getTempUnitId()
      objParam.speedunitid = this.getSpeedUnitId()
      objParam.applanguageid = this.getAppLanguageId()
      objParam.weatherlanguageid = this.getWeatherLanguageId()

      objParam.speedunit = this.getSpeedUnit()
      objParam.tempunit = this.getTempUnit()
      objParam.percunit = this.getPercUnit()
      objParam.pressureunit = this.getPressureUnit()

      objParam.weatherlanguage = this.getWeatherLanguage()
      objParam.applanguage = this.getAppLanguage()
      objParam.cnt = this.getCnt()
      objParam.apiId = this.getApiId()
      return objParam
    },
    setSettingsFromObj: function (objParam) {
      if (typeof (objParam.city) !== 'undefined') {
        this.setCity(objParam.city)
      }
      if (typeof (objParam.isaccurate) !== 'undefined') {
        this.setIsAccurate(objParam.isaccurate)
      }
      if (typeof (objParam.isgeolocate) !== 'undefined') {
        this.setIsGeolocate(objParam.isgeolocate)
      }
      if (typeof (objParam.tempunitid) !== 'undefined') {
        this.setTempUnitId(objParam.tempunitid)
      }
      if (typeof (objParam.isanimate) !== 'undefined') {
        this.setIsAnimate(objParam.isanimate)
      }
      if (typeof (objParam.speedunitid) !== 'undefined') {
        this.setSpeedUnitId(objParam.speedunitid)
      }
      if (typeof (objParam.applanguageid) !== 'undefined') {
        this.setAppLanguageId(objParam.applanguageid)
      }
      if (typeof (objParam.weatherlanguageid) !== 'undefined') {
        this.setWeatherLanguageId(objParam.weatherlanguageid)
      }
      if (typeof (objParam.cnt) !== 'undefined') {
        this.setCnt(objParam.cnt)
      }
    },

    saveData: function (settingsData) {
      this.setSettingsFromObj(settingsData)
      localStorage.setItem('SettingsData', JSON.stringify(this.getAllSettings()))
      i18n.locale = this.getAppLanguage().label
      this.emitSettingsData()
    },
    loadData: function () {
      let localstoragedata = JSON.parse(localStorage.getItem('SettingsData'))
      if (localstoragedata) {
        this.setSettingsFromObj(localstoragedata)
      }
      i18n.locale = this.getAppLanguage().label
      this.emitSettingsData()
    },

    emitSettingsData: function () {
      this.$emit('settingsData', this.getAllSettings())
    },
    emitWeatherLanguageList: function () {
      this.$emit('weatherLanguageList', this.getWeatherLanguageList())
    },
    emitAppLanguageList: function () {
      this.$emit('appLanguageList', this.getAppLanguageList())
    },
    emitSpeedList: function () {
      this.$emit('speedList', this.getSpeedList())
    },
    emitTempList: function () {
      this.$emit('tempList', this.getTempList())
    }

  },
  created: function () {
    this.$on('emitSettingsData', function (dataEvent) {
      this.emitSettingsData()
    }.bind(this))

    this.$on('emitWeatherLanguageList', function (dataEvent) {
      this.emitWeatherLanguageList()
    }.bind(this))
    this.$on('emitAppLanguageList', function (dataEvent) {
      this.emitAppLanguageList()
    }.bind(this))
    this.$on('emitSpeedList', function (dataEvent) {
      this.emitSpeedList()
    }.bind(this))
    this.$on('emitTempList', function (dataEvent) {
      this.emitTempList()
    }.bind(this))

    this.$on('saveSettings', function (dataEvent) {
      this.saveData(dataEvent)
    }.bind(this))

    this.loadData()
  }
})
