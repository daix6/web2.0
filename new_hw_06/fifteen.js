//Using jQuery

$(document).ready(function() {
	var blocks = $("#puzzlearea div");
	var shufflebtn = $("#shufflebutton");
	var blank_x = 300;
	var blank_y = 300;

	for (var i = 0; i < blocks.length; i++) {
		$(blocks[i]).addClass("puzzlepiece");
		$(blocks[i]).attr("id", i+"");
	}
	for (var i = 0; i < blocks.length; i++) {
		var x = (i%4) * (-100);
		var y = Math.floor(i/4) * (-100);
		$(blocks[i]).css("backgroundPosition", x+ "px " + y + "px");
		$(blocks[i]).css("left", (i%4)*100 + "px");
		$(blocks[i]).css("top", Math.floor(i/4)*100 + "px");
	}
	//set background-img and show all pieces in right position

	shufflebtn.click(shuffle);
	for (var i = 0; i < blocks.length; i++) {
		$(blocks[i]).mouseover(movableBlock);
		$(blocks[i]).click(moveBlock);
	}
	//event handlers


	//if the shuffle button is clicked
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var j = Math.floor(Math.random() * 15);
			//generate a random number between [0, 15]
			var x = parseInt($(blocks[j]).css("top"));
			var y = parseInt($(blocks[j]).css("left"));
			if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
				$(blocks[j]).css("top", blank_x + "px");
				$(blocks[j]).css("left", blank_y + "px")
				blank_x = x;
				blank_y = y;
			}
			//if the random number piece is beside the blank, move
			}
	}

	//if any one puzzle piece is clicked
	function moveBlock() {
		//if the clicked piece is movable
		if (this.className.search("movablepiece") != -1) {
			var x = parseInt($(this).css("top"));
			var y = parseInt($(this).css("left"));
			$(this).css("top", blank_x + "px");
			$(this).css("left", blank_y + "px")
			blank_x = x;
			blank_y = y;
			//swap the clicked and the blank
		}
		//EXTRA FUNCTION: if finished, alert "you win!".
		if (isFinished()) {
			alert("You Win!");
		}
	}

	//if the mouse is over the piece
	function movableBlock() {
		var x = parseInt($(this).css("top"));
		var y = parseInt($(this).css("left"));
		//if moveable, add new class
		if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
			$(this).addClass("movablepiece");
		} else {
			$(this).removeClass("movablepiece");
		}
	}

	//if the game finished
	function isFinished() {
		for (var i = 0; i < blocks.length; i++) {
			var x = parseInt($(blocks[i]).css("top"));
			var y = parseInt($(blocks[i]).css("left"));
			if ((x*4 + y)/100 != parseInt(blocks[i].id)) return false;
		}
		//if every piece is in right position with right id, return true
		return true;
	}

})