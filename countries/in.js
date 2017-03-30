//Country File for India / Indien - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-22
//change: 2017-03-22
var basiccalc = require('./../basiccalc.js');


//object containing indian holidays
var phodays;
var container = {
		"num": 12,
		"holidays":[
			{
				"name": "गणतंत्र दिवस",
				"tname": "Republic Day",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "01-26"
			},
			{
				"name": "स्वतंत्रता दिवस",
				"tname": "Independence Day",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "गांधी जयंती",
				"tname": "Gandhi Jayanthi",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "10-02"
			},
			{
				"name": "अम्बेडकर जयंती",
				"tname": "Dr. Babasaheb Ambedkar Jayanti",
				"region": "IN: Andhra Pradesh, Bihar, Chandigarh, Gujarat, Haryana, Jammu & Kashmir, Karnataka, Kerala, Maharashtra, Orissa, Pondicherry, Tamil Nadu, Telangana, Uttarakhand, Uttar Pradesh, West Bengal",
				"date": "",
				"type": 0,
				"day": "04-14"
			},
			{
				"name": "मजदूर दिवस",
				"tname": "Labour Day",
				"region": "IN: Telangana, Assam, Bihar, Goa, Karnataka, Andhra Pradesh, Kerala, Manipur, Pondicherry, Tamil Nadu, Tripura, West Bengal, Orissa, Rajasthan",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "तेलंगाना गठन दिवस",
				"tname": "Telangana Formation Day",
				"region": "IN: Telangana",
				"date": "",
				"type": 0,
				"day": "06-02"
			},
			{
				"name": "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ",
				"tname": "Karnataka Formation Day",
				"region": "IN: Karantaka",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "नए साल का दिन",
				"tname": "New Year's Day",
				"region": "IN: Arunachal pradesh, Manipur, Meghalaya, Miizoram, Nagaland, Sikkim, Tamil Nadu only",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "पुथंडु",
				"tname": "Tamil Nadu New Year",
				"region": "IN: Tamil Nadu",
				"date": "",
				"type": 0,
				"day": "04-14"
			},
			{
				"name": "बदूड़ा का जन्मदिन",
				"tname": "Birthday of Buddah",
				"region": "IN: Nationwide",
				"date": "",
				"type": 5
			},
			{
				"name": "क्रिसमस का दिन",
				"tname": "Christmas Day",
				"region": "IN: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},	
			{
				"name": "सेंट स्टीफन के दिन",
				"tname": "Saint Stephen's Day",
				"region": "IN:  Telangana, Mizoram",
				"date": "",
				"type": 0,
				"day": "12-26"
			}
		]
			
	};


//main function of de.js, itterates through all holidays, applies calculation
function processForYear(year){
	for(var i = 0; i < phodays.num; i++){
		
		//this switch has to be alltered in every calculation
		switch(phodays.holidays[i].type){ 
		case 0:
			basiccalc.getSetDays(phodays.holidays[i], year);
			break;
		case 5:
			calculateBuddah(year, i);
			break;

		}
	}
}

//india specific calculation
function calculateBuddah(year, k){ //calculates the full moon in may, == buddah birthday in India
	var request = require('sync-request');
	var url = "http://api.usno.navy.mil/moon/phase?date=5/1/" + year.toString() + "&nump=4";
	var res = request('GET', url);
	var obj = JSON.parse(res.body.toString('utf-8'));
	for(var i = 0; i < 4; i++){
		if(obj.phasedata[i].phase == "Full Moon"){
			//convert date format 2017 May 03 to my format
			var d = new Date(obj.phasedata[i].date);
			d.setTime(d.getTime() + 86400000); //one day offset, this is not correct at all times (like 2015), let the user change it
			phodays.holidays[k].date = d.toISOString().substring(0, 10);
			return;
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