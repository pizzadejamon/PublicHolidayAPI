//generate form for countrie select (without angular for whatever reason)
function genCountSelect(id, num, arrayt){
			
			
		let str = ""; //saves the html that is generated
		str += "<form id='countriesformlist'>";
		str += "<div class='row'style='border-bottom: 3px solid #FE9A2E;'><div class='col-sm-1'><b>Include</b></div><div class='col-sm-1'><b>ISO Code</b></div><div class='col-sm-3'><b>Country</b></div></div>";
		
		for(let i = 0; i < num; i++){ //set to countries.length for all locations
			if(i == rndcount){str += "<br><p class='maintext'><b>Other Locations</b></p>"; str += "<div class='row' style='border-bottom: 3px solid #FE9A2E;'><div class='col-sm-1'><b>Include</b></div><div class='col-sm-2'><b>ISO Code</b></div><div class='col-sm-3'><b>Country</b></div></div>";}
			if(i % 2 == 0){ //begin row
				str += '<div class="row row2">';
			}else{
				str += '<div class="row row1">';
			}
			str += "<div class='col-sm-1'><input onclick='uncheckAll()' style='cursor: pointer;' type='checkbox' id='country" + i + "' ";
			if(arrayt[i] == true){
					str += "checked ";
			}
			str += "></div>"; //checkbox
			str += "<div class='col-sm-1' style='cursor: pointer;' onclick='toggleCheckbox(" + i + ")'>" + countries[i].iso + "</div>";
			str += "<div class='col-sm-3' style='cursor: pointer;' onclick='toggleCheckbox(" + i + ")'>" + countries[i].tname + "</div>";
			str += "</div>"; //end of row
		}
		$(id).html(str); //set html of div to generated string
}

	//generate countrie string from form data
function formToString(){
		//id format: countrieX
		var str = "";
		for(var i = 0; i < countries.length; i++){
			var idstr = "#country" + (i);
			if($(idstr).prop('checked')){
				str += countries[i].iso;
				if(i != countries.length - 1){
					str += ",";
				}
			}
		}
		return str;
}

function toggleCheckbox(id){
			$("#country" + id).trigger("click");
			return;
}

function uncheckAll(){
	$("#selectAllCountries").prop("checked", false);
}

