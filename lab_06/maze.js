$ = function(id) {
	return document.getElementById(id);
}

$$ = function(id) {
	return document.querySelectorAll(id);
}


window.onload = function() {
	walls = $$("#maze .boundary");
	playGame = false;
    youLose = false;
    //global variables

	$('start').onclick = startGame;
	for (var i = 0; i < walls.length; i++) {
		walls[i].onmouseover = changeBackground;
		break;
	}
	$('end').onmouseover = endMessage;
	$('maze').onmouseout = changeBackground;

}

function startGame () {
	playGame = true;
	if (youLose) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].className = "boundary";
		}
	}
	$('status').innerHTML = "Move your mouse over the 'S' to begin.";
	youLose = false;
}

function changeBackground() {
	if (playGame) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].className += " youlose";
		}
		$('status').innerHTML += "<br>You lose!";
		youLose = true;
	}
}

function endMessage() {
	if (playGame) {
		if (!youLose) {
			$('status').innerHTML += "<br>You win!";
		}
		playGame = false;
	}
}
