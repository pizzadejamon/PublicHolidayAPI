//Country File for Slovakia / Slowakei - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-27
//change: 2017-03-27
var basiccalc = require('./../basiccalc.js');


//object containing slovakia holidays
var phodays;
var container = {
		"num": 15,
		"holidays":[
			{
				"name": "Deň vzniku Slovenskej republiky",
				"tname": "Day of the Establishment of the Slovak Republic",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Zjavenie Pána",
				"tname": "Epiphany",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Veľkonočný piatok",
				"tname": "Good Friday",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Veľkonočný pondelok",
				"tname": "Easter Monday",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Sviatok práce",
				"tname": "Labour Day",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Deň víťazstva nad fašizmom",
				"tname": "Day of the victory over fasicm",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "05-08"
			},
			{
				"name": "Sviatok svätého Cyrila a Metoda",
				"tname": "Saints Cyril and Methodius Day",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "07-05"
			},
			{
				"name": "Výročie Slovenského národného povstania",
				"tname": "Slovak National Uprising anniversary",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "08-29"
			},
			{
				"name": "Deň Ústavy Slovenskej republiky",
				"tname": "Day of the Constitution of the Slovak Republic",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "09-01"
			},
			{
				"name": "Sviatok Panny Márie Sedembolestnej, patrónky Slovenska",
				"tname": "Day of Our Lady of the Seven Sorrows, patron saint of Slovakia",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "09-15"
			},
			{
				"name": "Sviatok všetkých svätých",
				"tname": "All Saints' Day",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Deň boja za slobodu a demokraciu",
				"tname": "Struggle for Freedom and Democracy Day",
				"region": "SK: Nationwide / National holiday",
				"date": "",
				"type": 0,
				"day": "11-17"
			},
			{
				"name": "Štedrý deň",
				"tname": "Christmas Day",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "12-24"
			},
			{
				"name": "Prvý sviatok vianočný",
				"tname": "Christmas Day",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Druhý sviatok vianočný",
				"tname": "Saint Stephen's Day",
				"region": "SK: Nationwide / Religious holiday",
				"date": "",
				"type": 0,
				"day": "12-26"
			},
		]
			
	};


//main function of sk.js, itterates through all holidays, applies calculation
function processForYear(year){
	for(var i = 0; i < phodays.num; i++){
		
		//this switch has to be alltered in every calculation
		switch(phodays.holidays[i].type){ 
		case 0:
			basiccalc.getSetDays(phodays.holidays[i], year);
			break;
		case 1:
			processEasterHolidays(year);
			break;
		}
	}
}


//slovakia specific calculation
function processEasterHolidays(year){
	var easterday = new Date(year.toString() + '-' + basiccalc.getEasterDay(year));
	
	
	for(var i = 0; i < phodays.num; i++){
		if(phodays.holidays[i].type == 1)
		{
			var d = new Date();
			
			d.setTime(easterday.getTime() + phodays.holidays[i].offset * 86400000);
			phodays.holidays[i].date = d.toISOString().substring(0, 10);
		}
	}
}





//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}