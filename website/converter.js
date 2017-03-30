	//visualizes data in table
		function convertToTable(obj, bool){
			let str = "";

			str += "<form id='reviewform'>";
			str += "<div class='row' style='border-bottom: 3px solid #FE9A2E;'><div class='col-sm-1'><b>Include</b></div><div class='col-sm-4'><b>Holiday Name</b></div><div class='col-sm-2'><b>Date observed</b></div><div class='col-sm-5'><b>Information</b></div></div>";
			for(let i = 0; i < obj.num; i++){
				if(i % 2 == 0){
					str += "<div class='row row2'>";
				}else{
					str += "<div class='row row1'>";
				}
				if(bool == true){ //for check all / uncheck all
				str += "<div class='col-sm-1'><input type='checkbox' onclick='uncheckAllh()' checked id='ho" + i + "' style='cursor: pointer;'></div>";}else{
					str += "<div class='col-sm-1'><input onclick='uncheckAllh()' type='checkbox' id='ho" + i + "' style='cursor: pointer;'></div>";}
				str += "<div class='col-sm-4' onclick='toggleCheckboxh(" + i + ")' style='cursor: pointer;'><p class='maintext'>" + obj.holidays[i].tname + "</p></div>";
				str += "<div class='col-sm-2' onclick='toggleCheckboxh(" + i + ")' style='cursor: pointer;'><p class='maintext'>" + obj.holidays[i].date + "</p></div>";
				str += "<div class='col-sm-4' onclick='toggleCheckboxh(" + i + ")' style='cursor: pointer;'><p class='maintext'>" + obj.holidays[i].region + "</p></div>";
				//button for editing
				str += "<dic class='col-sm-1'><a style='margin-top: 5px;' class='btn btn-default btn-xs center-block' onclick='edit(" + i + ")'><span class='glyphicon glyphicon-pencil'></span></a></div>";
				str += "</div>";
			}
			str += "</form>";
			return str;
		}
		
		
		function toggleCheckboxh(id){
			$("#ho" + id).trigger("click");
			return;
		}
		function uncheckAllh(){
			$("#selectAllHolidays").prop("checked", false);
		}
		
		function convertToICS(obj){
			//calname
			var calname = $("#calname").val();
			
			//ok, get array of checkboxes 
			var x = $("#ho1").val();

			let ics = "";
	
			//firstlines, calendar settings hardcoded
			ics = "BEGIN:VCALENDAR\r\n"
			+ "PRODID:-//PublicHolidayAPI//SoftwareAG//EN\r\n"
			+ "VERSION:2.0\r\n"
			+ "CALSCALE:GREGORIAN\r\n"
			+ "METHOD:PUBLISH\r\n"
			+ "X-WR-CALNAME:" + calname + "\r\n"
			+ "X-WR-TIMEZONE:Europe/Berlin\r\n";
	
			var qdate = convertDate(new Date().toISOString());
	
			
			ics += "X-WR-CALDESC:Number of Holidays " + obj.num.toString() +"\r\n";
			//itterate through list, convert to vCal
			for(var i = 0; i < obj.num; i++){
				var idstr = "#ho" + (i);
				if($(idstr).prop('checked')){
					ics += "BEGIN:VEVENT\r\n";
					ics += "UID:" + obj.holidays[i].tname + "\r\n";
					//add the date (DTSTART / DTEND)
					let pdate = convertDate(obj.holidays[i].date);
					let rdate = getOneDayLater(obj.holidays[i].date);
					ics += "DTSTAMP:" + qdate + "T000000\r\n";
					ics += "DTSTART;VALUE=DATE:" + pdate + "\r\n";
					ics += "DTEND;VALUE=DATE:" + rdate + "\r\n";
					ics += "SUMMARY:" + obj.holidays[i].tname + "\r\n"; //use translated name as title
					ics += "LOCATION:" + obj.holidays[i].region.split("<br>").join("; ") + "\r\n";
					ics += "STATUS:CONFIRMED\r\n";
					ics += "SEQUENCE:0\r\n";
					ics += "END:VEVENT\r\n";
				}
			}
	
			//last line
			ics += "END:VCALENDAR\r\n";
	
			return ics;
		}
		
		
		//Used for conversion to IC
		function convertDate(date){
			let pdate;
	
			let y = date.substring(0, 4);
			let m = date.substring(5, 7);
			let d = date.substring(8, 10);
	
			pdate = y + m + d; 
	
			return pdate;
		}

		function getOneDayLater(date){
			let z = new Date(date);
			let y = new Date(z.getTime() + 24*60*60*1000);
			return convertDate(y.toISOString());
		}