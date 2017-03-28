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
	
	globres = makeUnique(globres);
	
	//reset html of preview form
	$("#preview").html(convertToTable(globres));
	$("#success").html("Success! Saved changes to holiday.");
	
	$("#editModal").modal("hide");
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