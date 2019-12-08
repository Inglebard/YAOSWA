import Vue from 'vue'


export const UtilsService = new Vue({
	data: function() {
		return {
            mpstokph:3.6,
            mpstomilesph:2.23693629,
            milesphtomps:0.44704,
            mmtoin:0.0393700787,

		}
	},
	methods: {
    	mpsToKph: function(mps)
    	{
    		return mps*this.mpstokph;
    	},
    	mpsToMilesph: function(mps)
    	{
    		return mps*this.mpstomilesph;
    	},
    	mmToIn: function(mm)
    	{
    		return Math.round(mm*this.mmtoin);
    	},
    	getSpeedData: function(temp_unit_id,speed_unit_id,speed_data)
    	{
    		temp_unit_id = temp_unit_id || 0 ;
    		speed_unit_id = speed_unit_id || 0 ;
    		speed_data = speed_data || 0 ;
    		var speed=0;

    		if(temp_unit_id === 0 || temp_unit_id === 2)
    		{
    			speed_data=this.convertmphtoms(speed_data);
    		}
            if(speed_unit_id===0)
    		{
            	speed=speed_data;
    		}
            else if (speed_unit_id===1)
            {
            	speed=this.mpsToKph(speed_data);
    		}
            else if (speed_unit_id===2)
            {
            	speed=this.mpsToMilesph(speed_data);
            }

            return speed;
    	},
        convertmphtoms: function(speed_data)
    	{
        	return speed_data*this.milesphtomps ;
    	},
    	getPrecipData: function(precip_unit_id,precip_data)
    	{
    		precip_unit_id=precip_unit_id||0;
    		var precip=0;
            if(precip_unit_id===0)
    		{
            	precip=precip_data;
    		}
            else if (precip_unit_id===1)
            {
            	precip=this.mmToIn(precip_data);
    		}

            return precip;
    	},
    	getOrientationFromDegree: function(degree)
    	{
    		var orient = "N/A";


    		if((degree>=348.75 && degree<=380) || ((degree>=0 && degree<=11.25)))
    		{
    			orient="N";
    		}
    		else if (degree>=11.25 && degree<=33.75)
    		{
    			orient="NNE";
    		}
    		else if (degree>=33.75 && degree<=56.25)
    		{
    			orient="NE";
    		}
    		else if (degree>=56.25 && degree<=78.75)
    		{
    			orient="ENE";
    		}
    		else if (degree>=78.75 && degree<=101.25)
    		{
    			orient="E";
    		}
    		else if (degree>=101.25 && degree<=123.75)
    		{
    			orient="ESE";
    		}
    		else if (degree>=123.75 && degree<=146.25)
    		{
    			orient="SE";
    		}
    		else if (degree>=146.25 && degree<=168.75)
    		{
    			orient="SSE";
    		}
    		else if (degree>=168.75 && degree<=191.25)
    		{
    			orient="S";
    		}
    		else if (degree>=191.25 && degree<=213.75)
    		{
    			orient="SSW";
    		}
    		else if (degree>=213.75 && degree<=236.25)
    		{
    			orient="SW";
    		}
    		else if (degree>=236.25 && degree<=258.75)
    		{
    			orient="WSW";
    		}
    		else if (degree>=258.75 && degree<=281.25)
    		{
    			orient="W";
    		}
    		else if (degree>=281.25 && degree<=303.75)
    		{
    			orient="WNW";
    		}
    		else if (degree>=303.75 && degree<=326.25)
    		{
    			orient="NW";
    		}
    		else
    		{
    			orient="NNW";
    		}
    		return orient;
    	},
    	isOnline: function()
    	{
    	    return window.navigator.onLine;
    	},
    	getCustomWeatherInfo: function(code,pod,settings) {
    		code = typeof code !== 'undefined' ? code : 801;
      		pod = typeof pod !== 'undefined' ? pod : "d";

    		var color_black="#000000";
    		var color_blue="#55AAFF";
    		var color_gray="#808080";
    		var color_yellow="#E0B000";
    		var color_night="#41403b";

    		var root_image = "img/weather_icon/";
    		var animate=settings.isanimate;
    		if(animate)
    		{
    			root_image="img/weather_icon_animate/";
    		}

    		var image_cloud=root_image+"icon_weather_cloud.svg";
    		var image_hard_cloud=root_image+"icon_weather_hard_cloud.svg";
    		var image_mist=root_image+"icon_weather_mist.svg";
    		var image_rain=root_image+"icon_weather_rain.svg";
    		var image_drizzle=root_image+"icon_weather_rainy.svg";
    		var image_snow=root_image+"icon_weather_snow.svg";
    		var image_snowy=root_image+"icon_weather_snowy.svg";
    		var image_moon_cloud=root_image+"icon_weather_sun_cloud_night.svg";
    		var image_sun_cloud=root_image+"icon_weather_sun_cloud.svg";
    		var image_moon=root_image+"icon_weather_sun_night.svg";
    		var image_sun=root_image+"icon_weather_sun.svg";
    		var image_thunderstorm=root_image+"icon_weather_thunderstorm.svg";


    		var color = color_black;
    		var image = image_cloud;
    		var description;
    		var day_status = "day";
    		var isNight = false;

    		var langWeather=settings.weatherlanguage.label;

    		if(pod=="n")
    		{
    			isNight =true;
    			day_status = "night";
    		}



    		//thunderstorm
    		if(code==200)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==201)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==202)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==210)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==211)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==212)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==221)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==230)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==231)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==232)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}

    		//drizzle
    		else if(code==300)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==301)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==302)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==310)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==311)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==312)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==321)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}

    		//rain
    		else if(code==500)
    		{
    			color=color_blue;
    			image=image_rain;
    		}
    		else if(code==501)
    		{
    			color=color_blue;
    			image=image_rain;
    		}
    		else if(code==502)
    		{
    			color=color_blue;
    			image=image_rain;
    		}
    		else if(code==503)
    		{
    			color=color_blue;
    			image=image_rain;
    		}
    		else if(code==504)
    		{
    			color=color_blue;
    			image=image_rain;
    		}
    		else if(code==511)
    		{
    			color=color_blue;
    			image=image_snow;
    		}
    		else if(code==520)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==521)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==522)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}
    		else if(code==531)
    		{
    			color=color_blue;
    			image=image_drizzle;
    		}

    		//Snow
    		else if(code==600)
    		{
    			color=color_blue;
    			image=image_snow;
    		}
    		else if(code==601)
    		{
    			color=color_blue;
    			image=image_snow;
    		}
    		else if(code==602)
    		{
    			color=color_blue;
    			image=image_snow;
    		}
    		else if(code==611)
    		{
    			color=color_blue;
    			image=image_snow;
    		}
    		else if(code==621)
    		{
    			color=color_blue;
    			image=image_snow;
    		}

    		//Atmosphere
    		else if(code==701)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==711)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==721)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==731)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==741)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==751)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==761)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==762)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==771)
    		{
    			color=color_gray;
    			image=image_mist;
    		}
    		else if(code==781)
    		{
    			color=color_gray;
    			image=image_mist;
    		}

    		//cloud
    		else if(code==800)
    		{
    			color=color_yellow;
    			image=image_sun;
    			if(isNight)
    			{
    				image=image_moon;
    				/*
                    if(this.$t(LangExist(langWeather,"Starry sky"))
    				{
    					description=this.$tLang(langWeather,"Starry sky");
    				}
                    */
    			}

    		}
    		else if(code==801)
    		{
    			color=color_yellow;
    			image=image_sun_cloud;
    			if(isNight)
    			{
    				image=image_moon_cloud;
                    /*
    				if(this.$t(LangExist(langWeather,"Partly starry sky"))
    				{
    					description=this.$t(Lang(langWeather,"Partly starry sky");
    				}
                    */
    			}
    		}
    		else if(code==802)
    		{
    			color=color_gray;
    			image=image_cloud;
    		}
    		else if(code==803)
    		{
    			color=color_gray;
    			image=image_hard_cloud;
    		}
    		else if(code==804)
    		{
    			color=color_gray;
    			image=image_hard_cloud;
    		}

    		//extreme
    		else if(code==900)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==901)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==902)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==903)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==904)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==905)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}
    		else if(code==906)
    		{
    			color=color_black;
    			image=image_thunderstorm;
    		}

    		//TODO
    		//additional
    		else if(code==950)
    		{
    		}
    		else if(code==951)
    		{
    		}
    		else if(code==952)
    		{
    		}
    		else if(code==953)
    		{
    		}
    		else if(code==954)
    		{
    		}
    		else if(code==955)
    		{
    		}
    		else if(code==956)
    		{
    		}
    		else if(code==957)
    		{
    		}
    		else if(code==958)
    		{
    		}
    		else if(code==959)
    		{
    		}
    		else if(code==960)
    		{
    		}
    		else if(code==961)
    		{
    		}
    		else if(code==962)
    		{
    		}

    		if(typeof(description) !== "undefined")
    		{
    			return {"color": color, "image": image,"description": description,"isNight": isNight,"day_status": day_status};
    		}
    		return {"color": color, "image": image,"isNight": isNight,"day_status": day_status};
    	}
	},
	created: function() {

	}
});
