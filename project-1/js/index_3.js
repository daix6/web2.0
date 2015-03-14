window.onload = initPage();

// initialize the page
function initPage() {

	// bootstrap plugins initilization
    pluginsOn();
    //displayOnMode();  //display page on PC mode or mobile mode
    //refreshPerMin();
    showTable(); //testing
    logout();  //enable the logout ajax
}

function logout() {
	document.getElementById("logout").onclick = function() {
		request = createRequest();
		url = "/admin/logout";

		if (request == null) {
    		alert("Unable to create request");
    		return;
  		}

  		request.onreadystatechange = function() {
  			var code = JSON.parse(request.responseText).code;
  			if (code == 1) {
  				alert("invaild arguments");
  			} else if (code == 2) {
  				alert("crsf_token check failed");
  			} else if (mode == -2) {
  				alert("未登录");
  			} else alert("invalid code");
  		};

  		//open the url
  		request.open("POST", url, true);
  		request.send("_csrf_token="+window.sessionStorage.getItem("token"));
	}
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
	url = "/admin/levels/query?get_order_list=1&get_inventory_list=1";   //set the url to get all orders 
	token = window.sessionStorage.getItem(token);
	sendData = "_csrf_token=" + token;
	
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}

  	request.onreadystatechange = showTable;
  	//open the url
  	request.open("POST", url, true);
  	request.send(sendData);
}

function showTable() {
//	if (request.readyState == 4) {
//    	if (request.status == 200) {
    		//refresh the orders and stocks tables
    		//var output = '{"code": "0","data":{"orders":[{"number": "xxx","details":[{"name": "xxx","price": "x.x","quantity": "x"}],"receiver_info":{"name": "xxx","location": "xxx","phone": "xxxxxxxxxxx",},"status": "xxx", "released_time": "12", "timedelta": "123", "timeout": "true"}],"inventory":[{"name": "xxx","description": "xxx","quantity": "x"}]}}'; 
			//text = request.responseText
			var output =  '{"code":0,"data":{"orders":[{"number":"1234", "details":[{"name":"deng","price":1.1,"quantity":1}],"receiver_info":{"name":"xxx","location":"xxx","phone":"12345678"},"status":"cancelled","released_time":9999999123456789,"timedelta":2345678,"timeout":"true"},{"number":"1234", "details":[{"name":"deng","price":1.1,"quantity":1}],"receiver_info":{"name":"xxx","location":"xxx","phone":"12345678"},"status":"cancelled","released_time":9999999123456789,"timedelta":2345678,"timeout":"true"}],"inventory":[{"name":"aaa","description":"abcdefg","quantity":12}]}}'; 
    		var outputJson = JSON.parse(output);
    		code = outputJson.code;
    		alert(code);
    		
    		// code == 0
    		if (!code) {
    			clearTablesContent(); //clear the former body content in tables
    			InsertTablesContent(outputJson);  //insert the new body contents in tables
    		} else if (code == 1) {
    			alert("post的数据不符合格式");
    		} else if (code == 2) {
    			alert("crsf token check failed");
    		} else if (code == -2) {
    			alert("未登录");
    		} else if (code == -10) {
    			alert("非三级管理员");
    		} else if (code == -6) {
    			alert("管理员还没有被分配管理楼栋");
    		} else {
    			alert("invaild code here");
    		}

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
// text type: json
function InsertTablesContent(outputJson) {
	//json mode
	var orders = outputJson.data.orders;
	var items = outputJson.data.inventory;

	insertIntoDataTable(orders);
	insertIntoItemTable(items);
	
}

// insert into the orders table
function insertIntoDataTable(orders) {
	var tableContainer = document.getElementById("orders_table_body");

	for (var k = 0; k < orders.length; k++) {
		var tr = document.createElement("tr");
		tableContainer.appendChild(tr);

		for (var property in orders[k]) {
			if (property == "number" || property == "details" || property == "receiver_info" || property == "status" || property == "timedelta") {
				var td = document.createElement("td");
				tr.appendChild(td);
			}

			if (property == "number") {
				var textNode = document.createTextNode(orders[k]["number"]);
				td.appendChild(textNode);
			} else if (property == "details") {
				for (var i = 0; i < orders[k][property].length; i++) { 
					var ul = document.createElement("ul");
					td.appendChild(ul);

					for (var s_porperty in orders[k][property][i]) {
						var li = document.createElement("li");
						var text = "";
						ul.appendChild(li);

						if (s_porperty == "name") {
							text = "名称："+orders[k][property][i][s_porperty];
						} else if (s_porperty == "price") {
							text = "价格："+orders[k][property][i][s_porperty];
						} else if (s_porperty == "quantity") {
							text = "数量："+orders[k][property][i][s_porperty];
						}

						var textNode = document.createTextNode(text);
						li.appendChild(textNode);
					}
				}	
			} else if (property == "receiver_info") {
				var ul = document.createElement("ul");
				td.appendChild(ul);

				for (var s_porperty in orders[k][property]) {
					var li = document.createElement("li");
					var text = "";
					ul.appendChild(li);

					if (s_porperty == "name") {
						text = "姓名："+orders[k][property][s_porperty];
					} else if (s_porperty == "location") {
						text = "住址："+orders[k][property][s_porperty];
					} else if (s_porperty == "phone") {
						text = "电话："+orders[k][property][s_porperty];
					}

					var textNode = document.createTextNode(text);
					li.appendChild(textNode);
				}	
			} else if (property == "status") {
				var text = "";
				if (orders[k][property] == "completed") {
					text = "已完成";
				} else if (orders[k][property] == "uncompleted") {
					text = "未完成";
				} else if (orders[k][property] == "cancelled") {
					text = "已取消";
				}

				if (orders[k]["timeout"]) {
					text += "(超时)";
				}
				var textNode = document.createTextNode(text);
				td.appendChild(textNode);
			} else if (property == "timedelta") {
				var text = "";

				var restTime = orders[k]["released_time"]+orders[k]["timedelta"]-Date.parse(new Date());
				alert(restTime);
				text = restTime>0 ? restTime:0;
				
				var textNode = document.createTextNode(text);
				td.appendChild(textNode);
			} 
		}

		//add operation button into the chart
		var td = document.createElement("td");
		tr.appendChild(td);

		var completeOrderBtn = createBtn("completeOrderBtn");
		var deleteOrderBtn = createBtn("deleteOrderBtn");

		td.appendChild(completeOrderBtn);
		td.appendChild(deleteOrderBtn);
	}
}

//insert into the item table(intervory)
function insertIntoItemTable(items) {
	var tableContainer = document.getElementById("stocks_table_body");

	for (var k = 0; k < items.length; k++) {
		var tr = document.createElement("tr");
		var text;
		tableContainer.appendChild(tr);

		for (var property in items[k]) {
			var td = document.createElement("td");
			tr.appendChild(td);

			text = document.createTextNode(items[k][property]);
			td.appendChild(text);
		}
	}
}


function createBtn(className) {
	var btn = document.createElement("button");
	var text;

	btn.setAttribute("type","button");
	btn.setAttribute("class","btn-xs operationBtn");


	if (className == "completeOrderBtn") {
		text = document.createTextNode("完成订单");
	} else {
		text = document.createTextNode("取消订单");
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
	var sendData = "_csrf_token="+window.sessionStorage.getItem(token)+"&ticketid="+order_id;

	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}

  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var outputJson = JSON.parse(request.responseText);
	    		//if back-end return true, refresh
	    		if (outputJson.code == 0) refresh();
	    		else if (code == 1) {
	    			alert("post的数据不符合格式");
	    		} else if (code == 2) {
	    			alert("csrf token check failed");
	    		} else if (code == -2) {
	    			alert("未登录");
	    		} else if (code == -10) {
    				alert("非三级管理员");
    			} else if (code == -11) {
    				alert("订单不存在，可能被级联删除了");
    			} else if (code == -12) {
    				alert("订单已经完成或取消，不能二次操作");
    			} else alert("invaild code");
	    		
	    		//else alert("操作失败");
	    	}
	    }
  	};
  	
  	//set the url
  	url = "/level3/handle_order";  //set the url to change the order status
  	//send different data with different operations
  	if (operation == 1) 
  		sendData += "&handle="+"true"+"&password="+password;
  	if (operation == 0)
  		sendData += "&handle="+"false"+"&password="+password;
  	
  	request.open("POST", url, true);
  	request.send(sendData);
	//testing alert(url + "\n" + sendData);
}

// for json
function isArray(arg) {
  if (typeof arg == 'object') {
    var criteria = arg.constructor.toString().match(/array/i);
    return (criteria != null);
  }
  return false;
}
