//does basic, non country specific calculations.


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




//easter calculation
function padout(number) { return (number < 10) ? '0' + number : number; }
function calculateEaster(Y){
	    var C = Math.floor(Y/100);
	    var N = Y - 19*Math.floor(Y/19);
	    var K = Math.floor((C - 17)/25);
	    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
	    I = I - 30*Math.floor((I/30));
	    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
	    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
	    J = J - 7*Math.floor(J/7);
	    var L = I - J;
	    var M = 3 + Math.floor((L + 40)/44);
	    var D = L + 28 - 31*Math.floor(M/4);

	    return padout(M) + '-' + padout(D);
}








module.exports = {
	getSetDays: function (holiOBJ, year){
		return calculateSetDays(holiOBJ, year);
	},
	getEasterDay: function(year){
		return calculateEaster(year);
	}
};




