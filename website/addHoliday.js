$(document).ready(function (){
	$("#previewadd").submit(function(event){
		addHoliday();
	});
	
	$("#addclear").click(function (){
		clearForm();
	});
	
	function addHoliday(){
		
		//generate holiday obj
		var dummy = {
			"name": $("#addname").val(),
			"tname": $("#addtname").val(),
			"region": $("#addregion").val(),
			"date": $("#adddate").val(),
			"include": true
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
		$("#successadd").html("<b>Succesful! Added holiday <i>'" + dummy.tname + "'</i> to calendar.</b>");
		$("#successadd").hide();
		if(globres.num != 42){
			$("#success").html("<b>Created calendar with " + globres.num + " holidays. Download it direclty or customize it in advanced settings.</b>");
		}else{
			$("#success").html("<b>Created calendar with " + globres.num + " holidays. Don't forget your towel, Hitchhiker!</b>");
		}
		
		$("#addModal").modal("hide");
		//unset val
		$("#addname").val("");$("#addtname").val("");$("#addregion").val("");
		let d = new Date();
		let p = d.toISOString().substring(0, 4);
		var start = p + "-01-01";
		$("#adddate").val(start);
		$("#adddate").trigger('input');
	}
	
	function clearForm(){
		$("#addname").val("");$("#addname").trigger('input');
		$("#addtname").val("");$("#addtname").trigger('input');
		$("#addregion").val("");$("#addregion").trigger('input');
		let d = new Date();
		let p = d.toISOString().substring(0, 4);
		var start = p + "-01-01";
		$("#adddate").val(start);$("#adddate").trigger('input');
	}
	
});