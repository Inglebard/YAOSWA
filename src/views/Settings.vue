<template>
<div class="setting">
  <div class="">
    <div class="">
      <form v-on:submit.prevent>
        <div class="setting_section_header">
          <span>{{ $t("Localisation") }}</span>
        </div>
        <div class="input_control_text" v-bind:class="toggleSettingClass('city')">
          <div class="input_control_text_label_desc_icon row" v-on:click="clickSettingToggle('city')">
            <div class="col-xs-10 input_control_text_label_desc">
              <div class="input_control_text_label">
                <span>{{ $t("City") }}</span>
              </div>
              <div class="input_control_text_desc">
                <span>{{getDynamicDesc('city')}}</span>
              </div>
            </div>
            <div class="input_control_text_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_text_data">
            <input type="text" v-model="settingsData.city" />
          </div>
        </div>
        <div class="input_control_checkbox">
          <div class="input_control_checkbox_label_desc_data row">
            <div class="col-xs-10 input_control_checkbox_label_desc">
              <div class="input_control_checkbox_label">
                <span>{{ $t("Accurate") }}</span>
              </div>
              <div class="input_control_checkbox_desc">
                <span>{{getDynamicDesc('isaccurate')}}</span>
              </div>
            </div>
            <div class="input_control_checkbox_data col-xs-2">
              <div class="input_control_checkbox_input_wrapper checkbox_switch pull-right">
                <input name="isaccurate_checkbox" id="isaccurate_checkbox" type="checkbox" data-type="switch" v-model="settingsData.isaccurate">
                <label for="isaccurate_checkbox">
                  <span class="toggle">
                    <span class="toggle-handle"></span>
                    <span class="toggle-bg"></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="input_control_checkbox" v-if="geolocationAvailable()">
          <div class="input_control_checkbox_label_desc_data row">
            <div class="col-xs-10 input_control_checkbox_label_desc">
              <div class="input_control_checkbox_label">
                <span>{{ $t("Auto positionning") }}</span>
              </div>
              <div class="input_control_checkbox_desc">
                <span>{{getDynamicDesc('isgeolocate')}}</span>
              </div>
            </div>
            <div class="input_control_checkbox_data col-xs-2">
              <div class="input_control_checkbox_input_wrapper checkbox_switch pull-right">
                <input name="isgeolocate_checkbox" id="isgeolocate_checkbox" type="checkbox" data-type="switch" v-model="settingsData.isgeolocate">
                <label for="isgeolocate_checkbox">
                  <span class="toggle">
                    <span class="toggle-handle"></span>
                    <span class="toggle-bg"></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="setting_section_header">
          <span>{{ $t("Units") }}</span>
        </div>
        <div class="input_control_select" v-bind:class="toggleSettingClass('tempunitid')">
          <div class="input_control_select_label_desc_icon row" v-on:click="clickSettingToggle('tempunitid')">
            <div class="col-xs-10 input_control_select_label_desc">
              <div class="input_control_select_label">
                <span>{{ $t("Temperature") }}</span>
              </div>
              <div class="input_control_select_desc">
                <span>{{getDynamicDesc('tempunitid')}}</span>
              </div>
            </div>
            <div class="input_control_select_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_select_data">
            <select v-model="settingsData.tempunitid">
              <option v-for="option in tempList" :value="option.id">{{option.label_setting}}</option>
            </select>
          </div>
        </div>
        <div class="input_control_select" v-bind:class="toggleSettingClass('speedunitid')">
          <div class="input_control_select_label_desc_icon row" v-on:click="clickSettingToggle('speedunitid')">
            <div class="col-xs-10 input_control_select_label_desc">
              <div class="input_control_select_label">
                <span>{{ $t("Speed") }}</span>
              </div>
              <div class="input_control_select_desc">
                <span>{{getDynamicDesc('speedunitid')}}</span>
              </div>
            </div>
            <div class="input_control_select_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_select_data">
            <select v-model="settingsData.speedunitid">
              <option v-for="option in speedList" :value="option.id">{{option.label_setting}}</option>
            </select>
          </div>
        </div>

        <div class="setting_section_header">
          <span>{{ $t("Results") }}</span>
        </div>
        <div class="input_control_text" v-bind:class="toggleSettingClass('cnt')">
          <div class="input_control_text_label_desc_icon row" v-on:click="clickSettingToggle('cnt')">
            <div class="col-xs-10 input_control_text_label_desc">
              <div class="input_control_text_label">
                <span>{{ $t("Max Results") }}</span>
              </div>
              <div class="input_control_text_desc">
                <span>{{getDynamicDesc('cnt')}}</span>
              </div>
            </div>
            <div class="input_control_text_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_text_data">
            <input type="text" v-model="settingsData.cnt" />
          </div>
        </div>
        <div class="setting_section_header">
          <span>{{ $t("Languages") }}</span>
        </div>
        <div class="input_control_select" v-bind:class="toggleSettingClass('applanguageid')">
          <div class="input_control_select_label_desc_icon row" v-on:click="clickSettingToggle('applanguageid')">
            <div class="col-xs-10 input_control_select_label_desc">
              <div class="input_control_select_label">
                <span>{{ $t("Application language") }}</span>
              </div>
              <div class="input_control_select_desc">
                <span v-html="getDynamicDesc('applanguageid')"></span>
              </div>
            </div>
            <div class="input_control_select_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_select_data">
            <select v-model="settingsData.applanguageid">
              <option v-for="option in appLanguageList" :value="option.id">{{option.label_setting}}</option>
            </select>
          </div>
        </div>
        <div class="input_control_select" v-bind:class="toggleSettingClass('weatherlanguageid')">
          <div class="input_control_select_label_desc_icon row" v-on:click="clickSettingToggle('weatherlanguageid')">
            <div class="col-xs-10 input_control_select_label_desc">
              <div class="input_control_select_label">
                <span>{{ $t("Weather Language") }}</span>
              </div>
              <div class="input_control_select_desc">
                <span v-html="getDynamicDesc('weatherlanguageid')"></span>
              </div>
            </div>
            <div class="input_control_select_icon col-xs-2">
              <div class="input_control_text_icon_wrapper pull-right">
                <i class="fa fa-setting-chevron"></i>
              </div>
            </div>
          </div>
          <div class="input_control_select_data">
            <select v-model="settingsData.weatherlanguageid">
              <option v-for="option in weatherLanguageList" :value="option.id">{{option.label_setting}}</option>
            </select>
          </div>
        </div>
        <div class="setting_section_header">
          <span>{{ $t("Others") }}</span>
        </div>
        <div class="input_control_checkbox">
          <div class="input_control_checkbox_label_desc_data row">
            <div class="col-xs-10 input_control_checkbox_label_desc">
              <div class="input_control_checkbox_label">
                <span>{{ $t("Animations") }}</span>
              </div>
              <div class="input_control_checkbox_desc">
                <span>{{getDynamicDesc('isanimate')}}</span>
              </div>
            </div>
            <div class="input_control_checkbox_data col-xs-2">
              <div class="input_control_checkbox_input_wrapper checkbox_switch pull-right">
                <input name="isanimate_checkbox" id="isanimate_checkbox" type="checkbox" data-type="switch" v-model="settingsData.isanimate">
                <label for="isanimate_checkbox">
                  <span class="toggle">
                    <span class="toggle-handle"></span>
                    <span class="toggle-bg"></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form_submit" style="margin-bottom:20px">
          <button v-on:click="saveSetting()">{{ $t("Save") }}</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import {
  SettingsService
} from '@/services/SettingsService.js'
import {
  HeaderService
} from '@/services/HeaderService.js'

export default {
  'name': 'settings',
  'components': {},
  'data': function () {
    return {
      settingsData: {
        city: '',
        isaccurate: false,
        isgeolocate: false,
        cnt: 0,
        isanimate: false,
        tempunitid: 0,
        speedunitid: 0,
        applanguageid: 0,
        weatherlanguageid: 0

      },
      settingsToggled: null,
      weatherLanguageList: {},
      appLanguageList: {},
      speedList: {},
      tempList: {},
    }
  },
  methods: {
    getDynamicDesc: function (key) {
      if (key == "city") {
        if (this.settingsData.city === null || String(this.settingsData.city).trim() === '') {
          return this.$t("No city set.");
        } else {
          return this.$t("Current city set : {CITY}.", {
            CITY: String(this.settingsData.city).trim()
          });
        }
      }
      if (key == "isaccurate") {
        if (this.settingsData.isaccurate === false) {
          return this.$t("Will search the closest city.");
        } else {
          return this.$t("Will search the exact city.");
        }
      }
      if (key == "isgeolocate") {
        if (this.settingsData.isgeolocate === false) {
          return this.$t("Will use the registered city.");
        } else {
          return this.$t("Will use wifi/GPS location if enable.");
        }
      }
      if (key == "tempunitid" && this.tempList && this.tempList[this.settingsData.tempunitid]) {

        return this.$t("Selected temp unit : {UNIT}.", {
          UNIT: this.tempList[this.settingsData.tempunitid].unit
        });
      }
      if (key == "speedunitid" && this.speedList && this.speedList[this.settingsData.speedunitid]) {
        return this.$t("Selected speed unit : {UNIT}.", {
          UNIT: this.speedList[this.settingsData.speedunitid].unit
        });
      }
      if (key == "applanguageid" && this.appLanguageList && this.appLanguageList[this.settingsData.applanguageid]) {
        return this.$t("Language for the application.<br/>Currently selected : {LABEL_SETTING}.", {
          LABEL_SETTING: this.appLanguageList[this.settingsData.applanguageid].label_setting
        });
      }
      if (key == "weatherlanguageid" && this.weatherLanguageList && this.weatherLanguageList[this.settingsData.weatherlanguageid]) {
        return this.$t("Language weather from the provider OpenWeatherMap.<br/>Currently selected : {LABEL_SETTING}.", {
          LABEL_SETTING: this.weatherLanguageList[this.settingsData.weatherlanguageid].label_setting
        });
      }

      if (key == "cnt") {
        if (this.settingsData.cnt === null || String(this.settingsData.cnt).trim() === '') {
          return this.$t("Will use default max number of results.");
        } else {
          return this.$t("Max number of results if available : {NUMBER}.", {
            NUMBER: String(this.settingsData.cnt).trim()
          });
        }
      }

      if (key == "isanimate") {
        if (this.settingsData.isanimate === false) {
          return this.$t("Will use SVG files without animation.");
        } else {
          return this.$t("Will use animated SVG files.");
        }
      }
      return '';
    },
    clickSettingToggle: function (section) {
      if (this.settingsToggled == section) {
        this.settingsToggled = null;
      } else {
        this.settingsToggled = section;
      }
    },
    toggleSettingClass: function (section) {
      if (this.settingsToggled == section) {
        return 'show_input_data'
      }
    },
    saveSetting: function () {
      SettingsService.$emit('saveSettings', this.settingsData);
      this.$router.push({
        path: '/'
      });
    },
    geolocationAvailable: function () {
      if (navigator.geolocation) {
        return true;
      }
      return false;
    }
  },
  created: function () {

    SettingsService.$on('settingsData', function (dataEvent) {
      this.settingsData.city = dataEvent.city;
      this.settingsData.isaccurate = dataEvent.isaccurate;
      this.settingsData.isgeolocate = dataEvent.isgeolocate;
      this.settingsData.cnt = dataEvent.cnt;
      this.settingsData.isanimate = dataEvent.isanimate;
      this.settingsData.tempunitid = dataEvent.tempunitid;
      this.settingsData.speedunitid = dataEvent.speedunitid;
      this.settingsData.applanguageid = dataEvent.applanguageid;
      this.settingsData.weatherlanguageid = dataEvent.weatherlanguageid;

    }.bind(this));

    SettingsService.$on('weatherLanguageList', function (dataEvent) {
      this.weatherLanguageList = dataEvent;
    }.bind(this));
    SettingsService.$on('appLanguageList', function (dataEvent) {
      this.appLanguageList = dataEvent;
    }.bind(this));
    SettingsService.$on('speedList', function (dataEvent) {
      this.speedList = dataEvent;
    }.bind(this));
    SettingsService.$on('tempList', function (dataEvent) {
      this.tempList = dataEvent;
    }.bind(this));
  },
  beforeMount: function () {
    SettingsService.$emit('emitWeatherLanguageList', null);
    SettingsService.$emit('emitAppLanguageList', null);
    SettingsService.$emit('emitSpeedList', null);
    SettingsService.$emit('emitTempList', null);
    SettingsService.$emit('emitSettingsData', null);
    HeaderService.$emit('showBackButton');
  }
}
</script>
