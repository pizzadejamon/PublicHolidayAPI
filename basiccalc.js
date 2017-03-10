//Caculation for Dates
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-09


//does basic, non country specific calculations.
//type 1 calculation is declared country specific and processed in xx.js


//type 0
function calculateSetDays(obj, year){ //only sets the date of type 0 holidays according to the year
		obj.date = year.toString() + '-' + obj.day;
		return obj;
}


//type 2
//calculating first of or index
function calculateFirstOfOffset(obj, year){
	//get day of first day of month
	var d = new Date(year.toString() + '-' + padout(obj.month) + '-01');
	let dayi = d.getDay(); //something like: 01.03 is Monday

	var offset;
	//calculate days until next weekday occurs
	if(dayi <= obj.day){
				offset = obj.day - dayi; //<= 0
	}else{
		offset = 8 - dayi;
	}
	var dj = 1 + offset + obj.offset * 7; //dj = daynumber of date

			
	obj.date = year.toString() + '-' + padout(obj.month) + '-' + dj.toString();
	return obj;
}


//type 3
//calculate date of last day ie: "last monday of september"
function calculateLastOf(obj, year){
	//get last day of month
	var dayCount = daysInMonth(obj.month, year);
	var date = new Date(year.toString() + '-' + padout(obj.month) + '-' + dayCount);
	while (date.getDay() != obj.day)
	{
		dayCount--;
		date = new Date(year.toString() + '-' + padout(obj.month) + '-' + dayCount);
	}
	
	obj.date = date.toISOString().substring(0, 10);
	return obj;
}



module.exports = {
	getSetDays: function (obj, year){
		return calculateSetDays(obj, year);
	},
	getEasterDay: function(year){
		return calculateEaster(year);
	},
	getIndexDays: function (obj, year){
		return calculateFirstOfOffset(obj, year);
	},
	getLastDays: function (obj, year){
		return calculateLastOf(obj, year);
	}
};








//misc calcs
//easter calculation with Gauß Easter Formula
function padout(number) { return (number < 10) ? '0' + number : number; }
function calculateEaster(year){
	    var C = Math.floor(year/100);
	    var N = year - 19*Math.floor(year/19);
	    var K = Math.floor((C - 17)/25);
	    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
	    I = I - 30*Math.floor((I/30));
	    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
	    var J = year + Math.floor(year/4) + I + 2 - C + Math.floor(C/4);
	    J = J - 7*Math.floor(J/7);
	    var L = I - J;
	    var M = 3 + Math.floor((L + 40)/44);
	    var D = L + 28 - 31*Math.floor(M/4);

	    return padout(M) + '-' + padout(D);
}



//gerneral stuff
function daysInMonth(month, year){
	let d = new Date(year, month, 0);
	return d.getDate();
}

//currently not used
function lastDayOfMonth(month, year){
	let m = daysInMonth(month, year);
	let d = new Date(year, month - 1, m);
	return d.getDay();
}