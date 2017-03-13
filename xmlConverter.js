//XML Converter, converts JSON 'list' of holidays into own xml format
//should work with next, area, list mode
//author: Marius Riehl
//date:	  2017-03-13
//change: 2017-03-13

function convert(obj){
	let xml = "";
	
	//first num (or any other metadata that might be added to response obj in the future...
	if(typeof obj.num != "undefined"){
		xml += "<num>" + obj.num.toString() + "</num>\r\n";
		//then all holiday objects
		for(var i = 0; i < obj.num; i++){
			xml += "<holiday num=" + i.toString() + ">\r\n";
			xml += "<name>" + obj.holidays[i].name + "</name>\r\n";
			xml += "<tname>" + obj.holidays[i].tname + "</tname>\r\n";
			xml += "<region>" + obj.holidays[i].region + "</region>\r\n";
			xml += "<date>" + obj.holidays[i].date + "</date>\r\n";
			xml += "</holiday>";
		}
	}else{
		//this mean it is requestType = Next
		xml += "<holiday>\r\n";
		xml += "<name>" + obj.name + "</name>\r\n";
		xml += "<tname>" + obj.tname + "</tname>\r\n";
		xml += "<region>" + obj.region + "</region>\r\n";
		xml += "<date>" + obj.date + "</date>\r\n";
		xml += "</holiday>";
	}
	
	
	return xml;
}

module.exports = {
		getXML: function (obj){
			return convert(obj);
		}
}