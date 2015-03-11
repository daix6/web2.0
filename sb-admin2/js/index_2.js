window.onload = initPage();

// initialize the page
function initPage() {
    // bootstrap plugins initilization
    pluginsOn();
    //refreshPerMin();
    showOrders(); //testing

    $(".chooseBuild").bind("click", buildingChoose);

    document.getElementById("li_orders").onclick = showOrders;
    document.getElementById("li_replenishment").onclick = showReplenishment;
    document.getElementById("li_all").onclick = showAll;
    document.getElementById("li_one").onclick = showOne;
}

function pluginsOn() {
    // bootstrap tab plugins
    $("#myTab a").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    $(function () { $("#myModal").modal({
        keyboard: true
    })});
}

function isArray(arg) {
    if (typeof arg == "object") {
        var criteria = arg.constructor.toString.match(/array/i);
        return criteria != null;
    }
    return false;
}

function clearTables(text) {
    var tables = $(text);
    while (tables.firstChild) {
        tables.removeChild(tables[i].firstChild);
    }
}

function showOrders() {
//  if (request.readyState == 4) {
//      if (request.status == 200) {
            //refresh the orders and stocks tables
            var text = '{"code": 0, "data": {"buildings": [{"id": 1, "name": "至善园1号"}, {"id": 2, "name": "至善园2号"}], "orders": [{"released_time": 1425981398, "receiver_info": {"name": "张三", "location": "至善园3号", "phone": "123456"}, "money": 12.3, "status": "uncompleted"}, {"released_time": 1425933398, "receiver_info": {"name": "张四", "location": "至善园4号", "phone": "111111"}, "money": 15.3, "status": "completed"}], "inventory": [{"id": 1234, "name": "炒饭", "description": "炒饭", "price": 12.3, "quantity": 120}, {"id": 1254, "name": "炒菜", "description": "炒菜", "price": 15.3, "quantity": 45}], "total_sales": {"amount": 200, "money": 142324.5}}}'; //text = request.responseText
            // unix时间戳->normal：先 var unixTimestamp = new Date(Unix timestamp * 1000) 然后 commonTime = unixTimestamp.toLocaleString()
            // normal->unix时间戳：var commonTime = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
            clearTables("orders_table_body"); //clear the body content in tables
            var json = JSON.parse(text);
            InsertOrdersContent(json);
//      }
//    }
}

function showReplenishment() {
//  if (request.readyState == 4) {
//      if (request.status == 200) {
            //refresh the orders and stocks tables
            var text = '{"code": 0, "data": {"buildings": [{"id": 1, "name": "至善园1号"}, {"id": 2, "name": "至善园2号"}], "orders": [{"released_time": 1425981398, "receiver_info": {"name": "张三", "location": "至善园3号", "phone": "123456"}, "money": 12.3, "status": "uncompleted"}, {"released_time": 1425933398, "receiver_info": {"name": "张四", "location": "至善园4号", "phone": "111111"}, "money": 15.3, "status": "completed"}], "inventory": [{"id": 1234, "name": "炒饭", "description": "炒饭", "price": 12.3, "quantity": 120}, {"id": 1254, "name": "炒菜", "description": "炒菜", "price": 15.3, "quantity": 45}], "total_sales": {"amount": 200, "money": 142324.5}}}'; //text = request.responseText
            // unix时间戳->normal：先 var unixTimestamp = new Date(Unix timestamp * 1000) 然后 commonTime = unixTimestamp.toLocaleString()
            // normal->unix时间戳：var commonTime = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
            clearTables("replenishment_table_body"); //clear the body content in tables
            var json = JSON.parse(text);
            InsertRepleContent(json);
//      }
//    }
}

function showAll() {
//  if (request.readyState == 4) {
//      if (request.status == 200) {
            //refresh the orders and stocks tables
            var text = '{"code": 0, "data": {"buildings": [{"id": 1, "name": "至善园1号"}, {"id": 2, "name": "至善园2号"}], "orders": [{"released_time": 1425981398, "receiver_info": {"name": "张三", "location": "至善园3号", "phone": "123456"}, "money": 12.3, "status": "uncompleted"}, {"released_time": 1425933398, "receiver_info": {"name": "张四", "location": "至善园4号", "phone": "111111"}, "money": 15.3, "status": "completed"}], "inventory": [{"id": 1234, "name": "炒饭", "description": "炒饭", "price": 12.3, "quantity": 120}, {"id": 1254, "name": "炒菜", "description": "炒菜", "price": 15.3, "quantity": 45}], "total_sales": {"amount": 200, "money": 142324.5}}}'; //text = request.responseText
            // unix时间戳->normal：先 var unixTimestamp = new Date(Unix timestamp * 1000) 然后 commonTime = unixTimestamp.toLocaleString()
            // normal->unix时间戳：var commonTime = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
            clearTables("all_table_body"); //clear the body content in tables
            var json = JSON.parse(text);
            InsertRepleContent(json);
//      }
//    } 
}

//insert the table content into the suitable table container
function InsertOrdersContent(json) {
    var ordersDetails = json.data.orders;
    var tableContainer = document.getElementById("orders_table_body");

    for (var order in ordersDetails) {
        var orderInfo = ordersDetails[order];
        var tr = document.createElement("tr");
        tableContainer.appendChild(tr);

        for (var property in orderInfo) {
            var td = document.createElement("td");
            var text;

            if (property == 'released_time') {
                var unixTimestamp = new Date(orderInfo[property] * 1000);
                text = document.createTextNode(unixTimestamp.toLocaleString());
            } else if (property == 'receiver_info') {
                var list = document.createElement("ul");
                list.setAttribute("style", "list-style: none; padding: 0;");
                for (var info in orderInfo[property]) {
                    var li = document.createElement("li");
                    var pre;
                    if (info == "name") pre = "姓名：";
                    else if (info == "location") pre = "地址：";
                    else if (info == "phone") pre = "电话：";
                    li.appendChild(document.createTextNode(pre + orderInfo[property][info]));
                    list.appendChild(li);
                }
                text = list;
            } else if (property == 'money') {
                text = document.createTextNode(orderInfo[property] + "元");
            } else if (property == 'status') {
                if (orderInfo[property] == 'uncompleted') text = document.createTextNode("未完成");
                else if (orderInfo[property] == 'completed') text = document.createTextNode("已完成");
                else if (orderInfo[property] == 'cancelled') text = document.createTextNode("已取消");
            }
            td.appendChild(text);
            tr.appendChild(td);
        }
    }
}

function InsertRepleContent(json) {
    var repleDetails = json.data.inventory;
    var tableContainer = document.getElementById("replenishment_table_body");

    for (var reple in repleDetails) {
        var repleInfo = repleDetails[reple];
        var tr = document.createElement("tr");
        var td;
        tableContainer.appendChild(tr);

        for (var property in repleInfo) {
            td = document.createElement("td");
            if (property == 'price') {
                var text = document.createTextNode(repleInfo[property] + "元");
            } else if (property == 'quantity') {
                var text = document.createTextNode(repleInfo[property] + "份");
            } else {
                var text = document.createTextNode(repleInfo[property]);
            }
            td.appendChild(text);
            tr.appendChild(td);
        }
        td = document.createElement("td");
        td.appendChild(createInput("replenishInput"));
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(createBtn("replenishBtn"));
        tr.appendChild(td);
    }
}

function createBtn(className) {
    var btn = document.createElement("button");
    var text;

    btn.setAttribute("type","submit");
    btn.setAttribute("class","btn");

    text = document.createTextNode("补货");
    btn.appendChild(text);

    btn.onclick = operationBtnFunc;

    return btn;
}

function createInput(className) {
    var input = document.createElement("input");

    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("name", "amount");
    input.setAttribute("placeholder", "请输入数量");

    return input;
}

function operationBtnFunc() {
    var amount = this.parentNode.parentNode.childNodes[2].firstChild.value;

    if (amount == "") {
        alert("Please input a valid number");
    } else {
        var origin = parseInt(this.parentNode.parentNode.childNodes[1].firstChild.nodeValue);
        origin = origin + parseInt(amount);
        this.parentNode.parentNode.childNodes[1].firstChild.nodeValue = origin;
        this.parentNode.parentNode.childNodes[2].firstChild.value = "";
    }

    /*
    url = "/admin/product_building"
    
    request = createRequest();
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

    //send data
    sendData = "?quantity="+amount;

    request.open("POST", url, true);
    request.send(sendData);
    alert(url + "\n" + sendData);
    */
}

function buildingChoose() {
    var text = this.innerHTML;
    if (this.className.indexOf("tab1") >= 0) {
        document.getElementById("build1").innerHTML = this.innerHTML;
    } else if (this.className.indexOf("tab2") >= 0) {
        document.getElementById("build2").innerHTML = this.innerHTML;
    }
}
