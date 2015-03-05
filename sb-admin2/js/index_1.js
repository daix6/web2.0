window.onload = initPage();

function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }	
  return request;
}

function watch_ini() { // 初始
　　 for(var i = 0; i < schools.length; i++) {
　　   var oOption=new Option(schools[i],arguments[i]);
　　   document.getElementById("schoolsSelect").options[i] = oOption;
　　 }
     for(var i = 0; i < buildings.length; i++) {
　　   var oOption=new Option(buildings[i],arguments[i]);
　　   document.getElementById("buildingsSelect").options[i] = oOption;
　　 }
     for(var i = 0; i < managers.length; i++) {
　　   var oOption = new Option(managers[i],arguments[i]);
　　   document.getElementById("managersSelect").options[i] = oOption;
　　 }
     for(var i = 0; i < hosts.length; i++) {
　　   var oOption=new Option(hosts[i],arguments[i]);
　　   document.getElementById("hostsSelect").options[i] = oOption;
　　 }
     for(var i = 0; i < catagories.length; i++) {
　　   var oOption=new Option(catagories[i],arguments[i]);
　　   document.getElementById("catagoriesSelect").options[i] = oOption;
　　 }
     for(var i = 0; i < cargos.length; i++) {
　　   var oOption = new Option(cargos[i],arguments[i]);
　　   document.getElementById("cargosSelect").options[i] = oOption;
　　 }
}

function watch_add(f) { // 增加      
    	var x;
     	if (f.word.length==null) {
       		x = f.word.value;
     	} else {
     	for (var i=0; i<f.word.length; ++i) {
　　    	if (i==0) {
	   	x = f.word[i].value;
        	} else {
	   	x = x+","+ f.word[i].value;
			}
		}
	}
	var oOption=new Option(x,x);
	f.keywords.options[f.keywords.length]=oOption;
	var request = createRequest();
	var sendData;
	var formName=f.name; // 判断类别
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
　　 }
　
function watch_mod(f) { // 修改
	if (f.word.length==null) {
       		x = f.word.value;
       	} else {
       	for (var i=0; i<f.word.length; ++i) {
　　   	if (i==0) {
		x = f.word[i].value;
	} else {
		x = x+","+ f.word[i].value;
	}
	}
   }
　　 	f.keywords.options[f.keywords.selectedIndex].text = x;
}

function watch_submit(f) { // 修改
	var request = createRequest();
	var sendData;
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
}

function watch_sel(f) { // 编辑
     	var items=f.keywords.options[f.keywords.selectedIndex].text.split(",");
     	if (items.length==1) {
     		f.word.value=items[0];
     	} else {
     	for (var i=1; i<=items.length; ++i) {
　　 	f.word[i-1].value=items[i-1];
     	}
    }
}

function watch_del(f) { // 删除
　　 f.keywords.options.remove(f.keywords.selectedIndex);
}

// initialize the page
function initPage() {

	// bootstrap plugins initilization
    pluginsOn();
    //refreshPerMin();
    showTable(); //testing
}

function pluginsOn() {
	// bootstrap tab plugins
	$("#myTab a").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    //boostrap modal plugins
    $("#deleteOrderBtn").modal({
    	show: false
    });

    $("#finishOrderBtn").modal({
    	show: false
    });
}


function showTable() {
//	if (request.readyState == 4) {
//    	if (request.status == 200) {
    		//refresh the orders and stocks tables
    		var text = "123123,李一奇,戴旋,完成,01:01:01;123123,李一奇住在某某街某某楼是某某年纪的学弟,戴旋,完成,01:01:01|戴旋,111;李一奇,123"; //text = request.responseText

    		clearTablesContent(); //clear the body content in tables
    		InsertTablesContent(text);
//    	}
//    }
}

function clearTablesContent() {
	var tables = document.getElementsByTagName("tbody");

	for (var i = 0; i < tables.length; i++) {
		while (tables[i].firstChild) {
			tables[i].removeChild(tables[i].firstChild);
		}
	}
}

//insert the table content into the suitable table container
function InsertTablesContent(text) {
	var tablesContents = text.split("|");

	//tablesContents[0] contains the content about the table body of the orders
	//tablesContents[1] contains the content about the table body of the stocks
	for (var i = 0; i < tablesContents.length; i++) {
		var tableContainer;
		var list = tablesContents[i].split(";");   

		// switch the table container
		switch (i) {
			case 0:
				tableContainer = document.getElementById("orders_table_body");
				break;
			case 1:
				tableContainer = document.getElementById("stocks_table_body");
				break;
			default:
				break;
		}

		// each insert into a row
		for (var j = 0; j < list.length; j++) {
			var infos = list[j].split(",");    //infos -- about each one
			var tr = document.createElement("tr");
			tableContainer.appendChild(tr);

			for (var k = 0; k < infos.length; k++) {
				var td = document.createElement("td");
				var text = document.createTextNode(infos[k]);
				td.appendChild(text);
				tr.appendChild(td);
			}

			//create Button optional
			if (i == 0) {
				var td = document.createElement("td");
				var finishBtn = createBtn("finishOrderBtn");
				var deleteBtn = createBtn("deleteOrderBtn");


				td.appendChild(finishBtn);
				td.appendChild(deleteBtn);
				tr.appendChild(td);
			}
		}
	}
}


