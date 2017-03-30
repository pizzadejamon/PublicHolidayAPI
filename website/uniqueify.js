function makeUnique(obj){
		var obj2 = {num : 0, holidays: []}; //dummy object
		
		for(let i = 0; i < obj.num; i++){
			let found = false;
			let foundx;
			for(let j = 0; j < obj2.holidays.length; j++){
				if(obj2.holidays[j].tname == obj.holidays[i].tname && obj2.holidays[j].date == obj.holidays[i].date){
					found = true;
					foundx = j;
				}
			}
			if(found == true){
				//already in array, to not add, but add regions
				obj2.holidays[foundx].region += "<br>" + obj.holidays[i].region;
			}else{
				//not found, add to array
				obj2.holidays.push(obj.holidays[i]);
				obj2.num++;
			}
		}
		
		return obj2;
}