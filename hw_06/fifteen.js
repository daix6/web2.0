//The extra function is that
//When u finish the 15 puzzle, there will be alert~
$ = function(id) {
	return document.getElementById(id);
}

$$ = function(id) {
	return document.querySelectorAll(id);
}

window.onload = function () {
	blocks = $$("#puzzlearea div");
	blank_x = 300;
	blank_y = 300;

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].className = "puzzlepiece";
		blocks[i].id = "" + i;
	}

	for (var i = 0; i < blocks.length; i++) {
		var x = (i%4) * (-100);
		var y = Math.floor(i/4) * (-100);
		blocks[i].style.backgroundPosition = x+ "px " + y + "px";
		blocks[i].style.left = (i%4)*100 + "px";
		blocks[i].style.top = Math.floor(i/4)*100 + "px";
	}

	$('shufflebutton').onclick = shuffle;
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].onmouseover = movableBlock;
		blocks[i].onclick = moveBlock;
	}
}

function shuffle() {
	for (var i = 0; i < 1000; i++) {
		var j = Math.floor(Math.random() * 15);
		var x = parseInt(blocks[j].style.top);
		var y = parseInt(blocks[j].style.left);
		if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
			blocks[j].style.top = blank_x + "px";
			blocks[j].style.left = blank_y + "px";
			blank_x = x;
			blank_y = y;
		}
	}
}

function moveBlock() {
	if (this.className.search("movablepiece") != -1) {
		var x = parseInt(this.style.top);
		var y = parseInt(this.style.left);
		this.style.top = blank_x + "px";
		this.style.left = blank_y + "px";
		blank_x = x;
		blank_y = y;
	}
	if (isFinished()) {
		alert("You Win!");
	}
}

function movableBlock() {
	var x = parseInt(this.style.top);
	var y = parseInt(this.style.left);
	if (Math.abs(x - blank_x) + Math.abs(y - blank_y) == 100) {
		this.className += " movablepiece";
	} else {
		this.className = "puzzlepiece";
	}
}

function isFinished() {
	for (var i = 0; i < blocks.length; i++) {
		var x = parseInt(blocks[i].style.top);
		var y = parseInt(blocks[i].style.left);
		if ((x*4 + y)/100 != parseInt(blocks[i].id)) return false;
	}
	return true;
}
