$ = function(id) {
	return document.getElementById(id);
}

window.onload = function() {
	$("pimp_btn").onclick = pimpText;
	$("bold").onclick = blingText;
	$("snoopify_btn").onclick = snoopifyText;

	currentFontSize = "12pt";
}

function pimpText() {
	timer = setInterval(function() {
		var fontSizeInt = parseFloat(currentFontSize);
		fontSizeInt = fontSizeInt + 2;
		currentFontSize = fontSizeInt + "pt";
		$("textarea").style.fontSize = currentFontSize;
	}, 500);
	//font-size can increase without limit.
}

function blingText() {
	if (this.checked == true) {
		$("textarea").className = "blink";
	} else {
		$("textarea").className = "notblink";
	}
}

function snoopifyText() {
	$("textarea").value = $("textarea").value.toUpperCase();
	var subs = $("textarea").value.split('.');
	var s = subs[0] + "-izzle.";
	$("textarea").value = s;
}
