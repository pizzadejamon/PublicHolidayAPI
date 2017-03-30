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
		$("#loadanimation").show();
		var values = $("#final").serialize(); 
		   $.ajax({
	        	url : "http://rndtools13.eur.ad.sag:121/data/",
	        	type: "post",
	        	data: values,
	        	complete: function (response){
					if(response.responseText.substring(0, 1) != "{"){
						$("#error").html("<b>" + response.responseText + "</b>"); //display error message
						$("#error").show();
						$("#success").hide();
						$("#loadanimation").hide();
					}else{
						globres = makeUnique(JSON.parse(response.responseText));

					
					
						//download
						let p = convertToICS(globres);
						var calname = $("#calname").val();
						download(calname + '.ics', p);
						
						$("#loadanimation").hide();
					}
	        	}
	        });
	}
	
	function previewPost(){
		//transform countriesform to string
		$("#finalcountries").val(formToString());
		$("#loadanimation").show();
		var values = $("#final").serialize(); 
		   $.ajax({
	        	url : "http://rndtools13.eur.ad.sag:121/data/",
	        	type: "post",
	        	data: values,
	        	complete: function (response){
	        		if(response.responseText.substring(0, 1) != "{"){ //json response must begin with {
						$("#error").html("<b>" + response.responseText + "</b>"); //display error message
						
						$("#error").show();
						$("#success").hide();
						$("#loadanimation").hide();
					}else{						
						
						
						//get obj from response
						var obj = JSON.parse(response.responseText);
						
						//make obj unique (remove double holidays)
						obj = makeUnique(obj);
						
						globres = obj; //save to globale variable
						
						$("#review").show();
						$("#round1").hide();
						$("#error").hide();
						$("#success").show();
						
						$("#preview").html(convertToTable(globres, true));
						if(obj.num != 42){
							$("#success").html("<b>Created calendar with " + obj.num + " holidays. Download it direclty or customize it in advanced settings.</b>");
						}else{
							$("#success").html("<b>Created calendar with " + obj.num + " holidays. Don't forget your towel, Hitchhiker!</b>");
						}
						
						
						$("#loadanimation").hide();
					}
					
	        	}
	        });
	};
	
	
	
});