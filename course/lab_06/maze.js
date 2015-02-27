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

//if the 'S' is clicked
function startGame () {
	playGame = true;
	//if you losed, clear the color of boundary, and start again
	if (youLose) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].className = "boundary";
		}
	}
	$('status').innerHTML = "Move your mouse over the 'S' to begin.";
	youLose = false;
	//renew
}

//if your mouse if out of the maze or over any boundary
function changeBackground() {
	if (playGame) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].className += " youlose";
		}
		$('status').innerHTML += "<br>You lose!";
		//show message when you lose
		youLose = true;
	}
}

//if your mouse if over 'E' amd not lose before
function endMessage() {
	if (playGame) {
		if (!youLose) {
			$('status').innerHTML += "<br>You win!";
			//show message when you win
		}
		playGame = false;
	}
}
