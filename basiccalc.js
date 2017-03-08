//does basic, non country specific calculations.
//type 1 calculation is declared country specific and processed in xx.js

function calculateSetDays(holiOBJ, year){ //only sets the date of type 0 holidays according to the year
	
	var i = holiOBJ.num;
	
	for(let j = 0; j < i; j++){
		if(holiOBJ.holidays[j].type == 0){
			holiOBJ.holidays[j].date = year.toString() + '-' + holiOBJ.holidays[j].day;
			delete holiOBJ.holidays[j].type;
			delete holiOBJ.holidays[j].day;
		}
	}
	return holiOBJ;
}

function calculateSetDays(obj, year){ //only sets the date of type 0 holidays according to the year

			obj.date = year.toString() + '-' + obj.day;
			delete obj.type;
			delete holiOBJ.holidays[j].day;
			return holiOBJ;
}


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


//calculating first of or index
function calculateFirstOfOffset(holiOBJ, year){
var i = holiOBJ.num;
	
	for(let j = 0; j < i; j++){
		if(holiOBJ.holidays[j].type == 2){
			
			//get day of first day of month
			var d = new Date(year.toString() + '-' + padout(holiOBJ.holidays[j].month) + '-01');
			let dayi = d.getDay();

			var offset;
			//calculate days until next day
			if(dayi <= holiOBJ.holidays[j].day){
				offset = holiOBJ.holidays[j].day - dayi; //<= 0
			}else{
				offset = 8 - dayi;
			}

			var dj = 1 + offset + holiOBJ.holidays[j].offset * 7;

			
			holiOBJ.holidays[j].date = year.toString() + '-' + holiOBJ.holidays[j].month + '-' + dj.toString();
			
			delete holiOBJ.holidays[j].type;
			delete holiOBJ.holidays[j].day;
			delete holiOBJ.holidays[j].month;
			delete holiOBJ.holidays[j].offset;
		}
	}
	return holiOBJ;
}

function calculateLastOffset



module.exports = {
	getSetDays: function (holiOBJ, year){
		return calculateSetDays(holiOBJ, year);
	},
	getEasterDay: function(year){
		return calculateEaster(year);
	},
	getIndexDays: function (holiOBJ, year){
		return calculateFirstOfOffset(holiOBJ, year);
	}
};




