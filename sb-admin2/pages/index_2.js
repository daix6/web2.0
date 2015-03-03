window.onload = initPage();

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

//refresh the page per minute
function refreshPerMin() {
    refresh();
    // setTimeOut(refreshPerMin, 60*1000);
}

//refresh the page
function refresh() {
    //create a request
    request = createRequest();

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
//  if (request.readyState == 4) {
//      if (request.status == 200) {
            //refresh the orders and stocks tables
            var text = "2015/02/27,李一奇,10000元,未完成;2015/02/27,邓霭霖,20000元,未完成|邓霭霖,0;李一奇,999|200单,10000元|至善园4号,100单,4000元;至善园3号,100单,6000元"; //text = request.responseText

            clearTablesContent(); //clear the body content in tables
            InsertTablesContent(text);
//      }
//    }
}

function clearTablesContent() {
    var tables = $('.toDelete');

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
                tableContainer = document.getElementById("replenishment_table_body");
                break;
            case 2:
                tableContainer = document.getElementById("all_table_body");
                break;
            case 3:
                tableContainer = document.getElementById("one_table_body");

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
            if (i == 1) {
                var td = document.createElement("td");
                var replenishInput = createInput("replenishInput")
                td.appendChild(replenishInput);
                tr.appendChild(td);

                td = document.createElement("td");
                var replenishBtn = createBtn("replenishBtn");
                td.appendChild(replenishBtn);
                tr.appendChild(td);
            }
            
        }
    }
}

function createBtn(className) {
    var btn = document.createElement("button");
    var text;

    btn.setAttribute("type","submit");
    btn.setAttribute("class","btn");

    text = document.createTextNode("补货");
    btn.appendChild(text);

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
/*
function operationBtnFunc() {
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

    //set the url
    url = url+id;
    //send data
    sendData = "quantity="+amount;

    request.open("POST", url, true);
    request.send(sendData);
    alert(url + "\n" + sendData);
}
*/