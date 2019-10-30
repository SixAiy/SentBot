const request = require('request');
	
exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-var
	if(!args[0]) {
		msg.channel.send('You need to state the city you would like the weather from');
	} else {
		request("http://api.openweathermap.org/data/2.5/weather?appid=88aa72d78aab5bc9ee8015123a4f87f9&units=metric&q=" + args[0], function(err, res, body) {
			if(err) {
				client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
			} else {
				let icon = "";
				const f = JSON.parse(body);
				if(f.weather[0].icon == "01d" || f.weather[0].icon == "01n") icon += ":sunny:";
				if(f.weather[0].icon == "02d" || f.weather[0].icon == "02n") icon += ":partly_sunny:";
				if(f.weather[0].icon == "03d" || f.weather[0].icon == "03n" || f.weather[0].icon == "04d" || f.weather[0].icon == "04n") icon += ":cloud:";
				if(f.weather[0].icon == "09d" || f.weather[0].icon == "09n") icon += ":cloud_rain:";
				if(f.weather[0].icon == "10d" || f.weather[0].icon == "10n") icon += ":white_sun_rain_cloud:";
				if(f.weather[0].icon == "11d" || f.weather[0].icon == "11n") icon += ":thunder_cloud_rain:";
				if(f.weather[0].icon == "13d" || f.weather[0].icon == "13n") icon += ":snowflake:";
				if(f.weather[0].icon == "50d" || f.weather[0].icon == "50n") icon += ":foggy:";
				const infoz = {
					color: 0x0099ff,
					author: {
						name: `Weather for ${f.name}, ${f.sys.country}`
					},
					description: `**Weather:** ${f.weather[0].main} ${icon} \n**Temp:** ${f.main.temp} °C\n**Wind:** ${f.wind.speed} MPH \n**Humidity:** ${f.main.humidity}%`
				}
				msg.channel.send({embed: infoz });
			}
		});
	} 
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "weather",
    category: "General",
    description: "Check the weather in your city",
    usage: "..weather cityname"
};