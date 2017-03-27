//downloads string as file
		function download(path, content) {
		    var c = document.createElement('a');
		    c.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
		    c.setAttribute('download', path);
		    if (document.createEvent) {
		        var event = document.createEvent('MouseEvents');
		        event.initEvent('click', true, true);
		        c.dispatchEvent(event);
		    }
		    else {c.click();}
		}