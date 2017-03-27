//Country File for DUMMY
//author: Marius Riehl
//date:	  2017-03-15
//change: 2017-03-15

//object containing dummy holidays
var phodays;
var container = {
		"num": 0,
		"holidays":[

		]	
};


function processForYear(year){
	//does nothing in dummy
}


//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}