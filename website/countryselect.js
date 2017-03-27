//generate form for countrie select (without angular for whatever reason)
function genCountSelect(id){
			
			
		let str = ""; //saves the html that is generated
		str += "<form id='countriesformlist'>";
		str += "<div class='row'style='border-bottom: 3px solid #FE9A2E;'><div class='col-sm-1'><b>Include</b></div><div class='col-sm-2'><b>ISO Code</b></div><div class='col-sm-3'><b>Country</b></div></div>";
		for(let i = 0; i < countries.length; i++){
			if(i == rndcount){str += "<br><p class='maintext'><b>Other Locations</b></p>"; str += "<div class='row'style='border-bottom: 3px solid #FE9A2E;'><div class='col-sm-1'><b>Include</b></div><div class='col-sm-2'><b>ISO Code</b></div><div class='col-sm-3'><b>Country</b></div></div>";}
			if(i % 2 == 0){ //begin row
				str += "<div class='row' style='background-color: #ffffff;'>";
			}else{
				str += "<div class='row'>";
			}
			str += "<div class='col-sm-1'><input type='checkbox' id='country" + i + "'></div>"; //checkbox
			str += "<div class='col-sm-2'>" + countries[i].iso + "</div>";
			str += "<div class='col-sm-3'>" + countries[i].tname + "</div>";
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