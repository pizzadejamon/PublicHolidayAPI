$(document).ready(function (){
	
	$("#editholiday").submit(function(event){
		saveEdit();
	});

});


function edit(index){
	//initialize values and open modal
	$("#editid").val(index);
	$("#editname").val(globres.holidays[index].name);
	$("#editname").trigger('input');
	$("#edittname").val(globres.holidays[index].tname);
	$("#edittname").trigger('input');
	$("#editregion").val(globres.holidays[index].region);
	$("#editregion").trigger('input');
	$("#editdate").val(globres.holidays[index].date);
	$("#editdate").trigger('input');
	
	
	$("#editModal").modal("show");
}

//called when modal is closed
function saveEdit(){
	
	//override holiday
	var i = $("#editid").val();
	globres.holidays[i].name = $("#editname").val();
	globres.holidays[i].tname = $("#edittname").val();
	globres.holidays[i].region = $("#editregion").val();
	globres.holidays[i].date = $("#editdate").val();
	
	customcount++; //(for modal popup when back)
	
	//now sort data, key is timestamp of date
	globres.holidays.sort(function(a, b){
		var x = a['date']; var y = b['date'];
		var x1 = (new Date(x)).getTime(); var y1 = (new Date(y)).getTime();
		return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : 0));
	});
		
	//reset html of preview form
	$("#preview").html(convertToTable(globres));
	$("#success").html("Success! Saved changes to holiday.");
	
	$("#editModal").modal("hide");
}