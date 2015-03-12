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

function ini() { // 初始
}
　

function submit(f) {
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

function sel(f) {  //根据学校选择楼栋
	$(f.buildingSelect).append($('<option>', {
                        value: 0,
                        text: "test"
                    }));
	$('.selectpicker').selectpicker('refresh');
}


function del(f) { // 删除
}

function check(id) {
		if (id.indexOf("school_id") >= 0 && $("#" + id).val() == -1) {
			$("#building_id").val(-1);
			$("#building_id").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("school_id") >= 0 && $("#" + id).val() == 0) {
			$("#building_id").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("building_id") >= 0 && $("#" + id).val() != -1) {
			$('.selectpicker').selectpicker('refresh');
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("year_id") >= 0 && $("#" + id).val() != -1) {
			$("#season_id").val(-1);
			$("#month_id").val(-1);
			$("#season_id").removeAttr("disabled");
			$("#month_id").removeAttr("disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("season_id") >= 0 && $("#" + id).val() != -1) {
			$("#month_id").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("month_id") >= 0 && $("#" + id).val() != -1) {
			$("#season_id").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("season_id") >= 0 && $("#" + id).val() == -1) {
			$("#month_id").removeAttr("disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("month_id") >= 0 && $("#" + id).val() == -1) {
			$("#season_id").removeAttr("disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("school_id") >= 0 && $("#" + id).val() != -1) {
			$("#building_id").removeAttr("disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("year_id") >= 0 && $("#" + id).val() == -1) {
			$("#season_id").val(-1);
			$("#month_id").val(-1);
			$("#season_id").attr("disabled", "disabled");
			$("#month_id").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if (id.indexOf("building_id") >= 0 && $("#" + id).val() == -1) {
			$('.selectpicker').selectpicker('refresh');
		}
}

function update(id, f) {
		if ($("#" + id).val() == -1) {
			$(f.second).attr("disabled", "disabled");
			$(f.second).val(-1);
			$('.selectpicker').selectpicker('refresh');
		} else if ($("#" + id).val() != -1) {
			$(f.second).removeAttr("disabled");
			$(f.second).selectpicker('refresh');
		}
}

function add(f) {
	var temp = f.name;
	var text = $("#school_idX").val();
	if (temp.indexOf("schoolX") >= 0) {
	$("#"+temp).find('tbody').append('<tr><td>'+f.word.value
									   +'</td><td><input type="button" value="确认" class="btn btn-default" /> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" /></td></tr>');
} else if (temp.indexOf("manageX") >= 0) {
	$("#"+temp).find('tbody').append('<tr><td>'+text+'</td><td>'+f.word[0].value
									   +'</td><td>'+f.word[1].value+'</td><td>'+f.word[2].value+'</td><td>'
									   +f.word[3].value+'</td><td><input type="button" value="确认" class="btn btn-default" /> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" /></td></tr>');
}
}

function deleteRow(t) {
	$(t).parent().parent().remove();
}
// initialize the page
function initPage() {
	$('.selectpicker').selectpicker({
    style: 'btn-info',
    size: 4
    });
	$('.selectpicker').selectpicker();
	// bootstrap plugins initilization
    pluginsOn();
    //refreshPerMin();
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


