$(document).ready(function (){
	$("#final").submit(function(event){
		directDownload();
	});
	$("#previewbutton").click(function(){ //when download button is clicked, convert to ics and download
			previewPost();
	});
	
	function directDownload(){
		//transform countriesform to string
		$("#finalcountries").val(formToString());
		$("#loadanimation").removeClass("hidden");
		var values = $("#final").serialize(); 
		   $.ajax({
	        	url : "http://rndtools13.eur.ad.sag:121/data/",
	        	type: "post",
	        	data: values,
	        	complete: function (response){
					if(response.responseText.substring(0, 1) != "{"){
						$("#error").html(response.responseText); //display error message
						$("#error").removeClass("hidden");
						$("#success").addClass("hidden");
						$("#loadanimation").addClass("hidden");
					}else{
						globres = makeUnique(JSON.parse(response.responseText));

					
						$("#preview").html(convertToTable(globres));
					
						//download
						let p = convertToICS(globres);
						var calname = $("#calname").val();
						download(calname + '.ics', p);
						
						$("#loadanimation").addClass("hidden");
					}
	        	}
	        });
	}
	
	function previewPost(){
		//transform countriesform to string
		$("#finalcountries").val(formToString());
		$("#loadanimation").removeClass("hidden");
		var values = $("#final").serialize(); 
		   $.ajax({
	        	url : "http://rndtools13.eur.ad.sag:121/data/",
	        	type: "post",
	        	data: values,
	        	complete: function (response){
	        		if(response.responseText.substring(0, 1) != "{"){ //json response must begin with {
						$("#error").html(response.responseText); //display error message
						
						$("#error").removeClass("hidden");
						$("#success").addClass("hidden");
						$("#loadanimation").addClass("hidden");
					}else{						
						
						
						//get obj from response
						var obj = JSON.parse(response.responseText);
						
						//make obj unique (remove double holidays)
						obj = makeUnique(obj);
						
						globres = obj; //save to globale variable
						
						
						$("#review").removeClass("hidden");
						$("#round1").addClass("hidden");
						$("#error").addClass("hidden");
						$("#success").removeClass("hidden");
						
						$("#preview").html(convertToTable(globres));
						$("#success").html("Created calendar with " + obj.num + " holidays. Download it direclty or customize it in advanced settings.");
						
						$("#loadanimation").addClass("hidden");
					}
					
	        	}
	        });
	};
	
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