//The extra function is that
//When u finish the 15 puzzle, there will be alert~
$ = function(id) {
	return document.getElementById(id);
}

$$ = function(id) {
	return document.querySelectorAll(id);
}

window.onload = function () {
	blocks = $$("div#puzzlearea");
	//get all puzzle pieces
	blank_x = 300;
	blank_y = 300;
	//set the position of blank piece

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].className = "puzzlepiece";
		blocks[i].id = "" + i;
	}
	//add attributes on every piece, for style and checking if finish game

	for (var i = 0; i < blocks.length; i++) {
		var x = (i%4) * (-100);
		var y = Math.floor(i/4) * (-100);
		blocks[i].style.backgroundPosition = x+ "px " + y + "px";
		blocks[i].style.left = (i%4)*100 + "px";
		blocks[i].style.top = Math.floor(i/4)*100 + "px";
	}
	//set background-img and show all pieces in right position

	$('shufflebutton').onclick = shuffle;
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].onmouseover = movableBlock;
		blocks[i].onclick = moveBlock;
	}
	//event handlers
}

//if the shuffle button is clicked
function shuffle() {
	for (var i = 0; i < 1000; i++) {
		var j = Math.floor(Math.random() * 15);
		//generate a random number between [0, 15]
		var x = parseInt(blocks[j].style.top);
		var y = parseInt(blocks[j].style.left);
		if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
			blocks[j].style.top = blank_x + "px";
			blocks[j].style.left = blank_y + "px";
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
		var x = parseInt(this.style.top);
		var y = parseInt(this.style.left);
		this.style.top = blank_x + "px";
		this.style.left = blank_y + "px";
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
	var x = parseInt(this.style.top);
	var y = parseInt(this.style.left);
	//if moveable, add new class
	if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
		this.className += " movablepiece";
	} else {
		this.className = "puzzlepiece";
	}
}

//if the game finished
function isFinished() {
	for (var i = 0; i < blocks.length; i++) {
		var x = parseInt(blocks[i].style.top);
		var y = parseInt(blocks[i].style.left);
		if ((x*4 + y)/100 != parseInt(blocks[i].id)) return false;
	}
	//if every piece is in right position with right id, return true
	return true;
}
