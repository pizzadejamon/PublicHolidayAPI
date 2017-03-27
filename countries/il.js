//Country File for Israel / Israel - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-24
//change: 2017-03-24

//this file is very different than the others (uses free API)
var container = { "num": 0,
				"holidays": []
};


var request = require('sync-request');

function processForYear(year){
	var phodays = JSON.parse(JSON.stringify(container));
	let url = "http://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&year=" + year.toString(); //use hebcal.com since hebrew calendar is... hard
	var res = request('GET', url);
    //response 'body' is string in JSON format - extract information on weather from the response
    var obj = JSON.parse(res.body.toString('utf-8'));
	for(var i = 0; i < obj.items.length; i++){
		let dummy = {
				"name": obj.items[i].hebrew,
				"tname": obj.items[i].title,
				"date": obj.items[i].date,	
				"region": "IL: Public / Jewish"
		};
		phodays.num++;
		phodays.holidays.push(dummy);
	}
	return phodays;

}

module.exports = {
		getHolidays: function (year){
			return processForYear(year);
		}
}