$(document).ready(function (){
	$("#previewadd").submit(function(event){
		addHoliday();
	});
	
	function addHoliday(){
		
		//generate holiday obj
		var dummy = {
			"name": $("#addname").val(),
			"tname": $("#addtname").val(),
			"region": $("#addregion").val(),
			"date": $("#adddate").val()
		};
		globres.holidays.push(dummy);
		customcount++;
		globres.num++;
		
		
		
		globres = makeUnique(globres); //merge holidays if name / date is the same
		
		//now sort data, key is timestamp of date
		globres.holidays.sort(function(a, b){
			var x = a['date']; var y = b['date'];
			var x1 = (new Date(x)).getTime(); var y1 = (new Date(y)).getTime();
			return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : 0));
		});
		
		//reset html of preview form
		$("#preview").html(convertToTable(globres));
		$("#successadd").html("Succesful! Added holiday <i>'" + dummy.tname + "'</i> to calendar.");
		$("#successadd").removeClass("hidden");
		$("#success").html("Created calendar with " + globres.num + " holidays. Download it direclty or customize it in advanced settings.");
	}
	
	//why do i have to copy this in again?
	function makeUnique(obj){
		var obj2 = {num : 0, holidays: []}; //dummy object
		
		for(let i = 0; i < obj.num; i++){
			let found = false;
			for(let j = 0; j < obj2.holidays.length; j++){
				if(obj2.holidays[j].tname == obj.holidays[i].tname && obj2.holidays[j].date == obj.holidays[i].date){
					found = true;
				}
			}
			if(found == true){
				//already in array, to not add, but add regions
				obj2.holidays[obj2.num-1].region += "<br>" + obj.holidays[i].region;
			}else{
				//not found, add to array
				obj2.holidays.push(obj.holidays[i]);
				obj2.num++;
			}
		}
		
		return obj2;
	}
	
});