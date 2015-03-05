window.onload = initPage();

// initialize the page
function initPage() {

	// bootstrap plugins initilization
    pluginsOn();
    displayOnMode();  //display page on PC mode or mobile mode
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

//display page on different modes with PC or mobile
function displayOnMode() {
	//create a request
	request = createRequest();
	url = "/admin";   //set the url to get whether the client is using PC or mobile

	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}

  	request.onreadystatechange = function() {
  		if (request.responseText == "Mobile") {
  			document.getElementById("not-seen-on-phone").style.visibility = "hidden";
  		}
  	};
  	//open the url
  	request.open("GET", url, true);
  	request.send(null);
}

//refresh the page per minute
function refreshPerMin() {
	refresh();
	setTimeOut(refreshPerMin, 60*1000);
}

//refresh the page
function refresh() {
	//create a request
	request = createRequest();
	url = "/admin";   //set the url to get all orders 

	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}

  	request.onreadystatechange = showTable;
  	//open the url
  	request.open("GET", url, true);
  	request.send(null);
}

function showTable() {
//	if (request.readyState == 4) {
//    	if (request.status == 200) {
    		//refresh the orders and stocks tables
    		var text = "123123,李一奇,戴旋,完成,01:01:01;123123,李一奇住在某某街某某楼是某某年纪的学弟,戴旋,完成,01:01:01|戴旋,111;李一奇,123"; //text = request.responseText

    		clearTablesContent(); //clear the former body content in tables
    		InsertTablesContent(text);  //insert the new body contents in tables
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


function createBtn(className) {
	var btn = document.createElement("button");
	var text;

	btn.setAttribute("type","button");
	btn.setAttribute("class","btn-xs operationBtn");


	if (className == "finishOrderBtn") {
		text = document.createTextNode("完成订单");
	} else {
		text = document.createTextNode("删除订单");
	}

	btn.className += className;
	btn.appendChild(text);

	btn.onclick = operationBtnFunc;
	return btn;
}

function operationBtnFunc() {
	var password = prompt("请输入密码：", "");

	//post password to back-end
	if (password != null && password != "") {
		if (this.className.indexOf("finishOrderBtn") != -1)
			validation(password, this.parentNode.parentNode.firstChild.firstChild.nodeValue, 1);
		if (this.className.indexOf("deleteOrderBtn") != -1)
			validation(password, this.parentNode.parentNode.firstChild.firstChild.nodeValue, 0);
	}
}


function validation(password, order_id, operation) {
	var request = createRequest();
	var sendData;

	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}

  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
  	
  	//set the url
  	url = "/admin/order/change_status/"+order_id;  //set the url to change the order status
  	//send different data with different operations
  	if (operation == 1) 
  		sendData = "new_status="+"completed"+"&password="+password;
  	if (operation == 0)
  		sendData = "new_status="+"cancelled"+"&password="+password;
  	
  	request.open("POST", url, true);
  	request.send(sendData);
	//testing alert(url + "\n" + sendData);
}