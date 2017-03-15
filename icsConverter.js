//ICS Converter, converts JSON 'list' of holidays into ics format
//should work with next, area, list mode, if responseType == JSON
//author: Marius Riehl
//date:	  2017-03-13
//change: 2017-03-13



function convertDate(date){
	let pdate;
	
	let y = date.substring(0, 4);
	let m = date.substring(5, 7);
	let d = date.substring(8, 10);
	
	pdate = y + m + d; 
	
	return pdate;
}

function convert(obj){
	let ics = "";
	
	//firstlines, calendar settings hardcoded
	ics = "BEGIN:VCALENDAR\r\n"
		+ "PRODID:-//PublicHolidayAPI//Copyright Marius Riehl//EN\r\n"
		+ "VERSION:2.0\r\n"
		+ "CALSCALE:GREGORIAN\r\n"
		+ "METHOD:PUBLISH\r\n";
	
	
	
	var qdate = convertDate(new Date().toISOString());
	
	if(typeof obj.num != 'undefined'){
		ics += "X-WR-CALDESC:Number of Holidays:" + obj.num.toString() +"\r\n";
		
		//itterate through list, convert to vCal
		for(var i = 0; i < obj.num; i++){
			ics += "BEGIN:VEVENT\r\n";
			ics += "UID: calendar-user\r\n";
			//add the date (DTSTART / DTEND)
			let pdate = convertDate(obj.holidays[i].date);
			ics += "DTSTAMP:" + qdate + "T000000Z\r\n";
			ics += "DTSTART;VALUE=DATE:" + pdate + "\r\n";

			ics += "SUMMARY:" + obj.holidays[i].tname + " - " + obj.holidays[i].name + "\r\n"; //use translated name as title
			ics += "LOCATION:" + obj.holidays[i].region + "\r\n";
			ics += "STATUS:CONFIRMED\r\n";
			ics += "SEQUENCE:0\r\n";
			ics += "END:VEVENT\r\n";
		}
	}else{ //exception for requesttype=NEXT
		ics += "X-WR-CALDESC:Number of Holidays:1\r\n";
		ics += "BEGIN:VEVENT\r\n";
		ics += "UID: calendar-user\r\n";
		let pdate = convertDate(obj.date);
		ics += "DTSTAMP:" + qdate + "T000000Z\r\n";
		ics += "DTSTART;VALUE=DATE:" + pdate + "\r\n";
		ics += "SUMMARY:" + obj.tname + " - " + obj.name + "\r\n"; //use translated name as title
		ics += "LOCATION:" + obj.region + "\r\n";
		ics += "STATUS:CONFIRMED\r\n";
		ics += "SEQUENCE:0\r\n";
		ics += "END:VEVENT\r\n";
	}
	

	//last line
	ics += "END:VCALENDAR";
	
	return ics;
}

module.exports = {
		getICS: function (obj){
			return convert(obj);
		}
}