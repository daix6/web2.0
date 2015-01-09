$(document).ready(function() {
	var container = $("#container");
	var footbar = $("#footbar");
	var body = $("body");
	var success = false;

	container.css("display", "none");

	body.on("click", bodyClick);
	$(".cbtn").on("click", nextBg);

	function nextBg() {
		if (body.attr("background").search("img00") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("00", "01");
				$("body").attr("background", newBg);
				$("#plot-text").text("你受不了这个事实，倒在了地上，卒！");
				success = true;
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("00", "02");
				$("body").attr("background", newBg);
				$("#plot-text").text("谁说大学非要恋爱呢？我当个学霸还不行吗！哼，我要去图书馆发奋苦读！");
				$("#question-text").text("要进去吗？");
				$("#A").text("A. 要");
				$("#B").text("B. 不要");
				$("#C").text("C. 自杀");
			} else {
				var newBg = body.attr("background").replace("00", "03");
				$("body").attr("background", newBg);
				$("#plot-text").text("突然，你感觉左方传来一股异样的吸引力，原来是软件学院~");
				$("#question-text").text("你希望遇见谁？");
				$("#A").text("A. 辅导员");
				$("#B").text("B. 潘茂林");
				$("#C").text("C. 谁也不想遇到");
			}
		} else if (body.attr("background").search("img02") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("02", "04");
				$("body").attr("background", newBg);
				$("#plot-text").text("你来到图书馆，发现没带校园卡，于是你回到了宿舍。");
				$("#question-text").text("你现在要干什么？");
				$("#A").text("A. 去三饭吃饭");
				$("#B").text("B. 睡觉");
				$("#C").text("C. 撸一把");
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("02", "05");
				$("body").attr("background", newBg);
				$("#plot-text").text("来到图书馆，看见图书馆里都是人，你又不想进去了。这时，天上一道闪电劈死了你。不恋爱又不当学霸，不如去死！卒！");
				success = true;
			} else {
				var newBg = body.attr("background").replace("02", "06");
				$("body").attr("background", newBg);
				$("#plot-text").text("虽然不知道是哪里传来的力量让你自杀，你还是走到了小谷河边，准备葬生于此。却看见一位少女正要跳河！");
				$("#question-text").text("要救吗？");
				$("#A").text("A. 救");
				$("#B").text("B. 不救");
				$("#C").text("C. 一起跳下去");
			}
		} else if (body.attr("background").search("img03") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("03", "07");
				$("body").attr("background", newBg);
				$("#plot-text").text("希望成真，你遇到了辅导员！辅导员走上来，神情严肃地告知你，你挂科太多，已经被劝退了。再见^_^");
				success = true;
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("03", "08");
				$("body").attr("background", newBg);
				$("#plot-text").text("希望成真，你遇到了看穿了一切的pml！之后，你跟随pml，成为前端大神，赢娶白富美，走上人生巅峰！");
				success = true;
			} else {
				var newBg = body.attr("background").replace("03", "09");
				$("body").attr("background", newBg);
				$("#plot-text").text("希望成真，你谁也没遇着。真寂寞啊……你继续走，走到了公教楼。这时，你看到地上有一张校园卡……");
				$("#question-text").text("要捡吗？");
				$("#A").text("A. 捡");
				$("#B").text("B. 不捡");
				$("#C").text("C. 原地坐等卡主归来");
			}
		} else if (body.attr("background").search("img04") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("04", "10");
				$("body").attr("background", newBg);
				$("#plot-text").text("一天的劳累之后，你在三饭大快朵颐，竟然没发现自己菜里面的虫子。三天后的夜晚，你入睡，再也没有醒来……卒！");
				success = true;
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("04", "00");
				$("body").attr("background", newBg);
				$("#plot-text").text("一天的劳累之后，你爬上床，美美地睡着了。醒来你发现你回到了游戏的起点！");
				$("#question-text").text("你希望在大学里恋爱吗？");
				$("#A").text("A. 希望");
				$("#B").text("B. 不希望");
				$("#C").text("C. 随缘");
			} else {
				var newBg = body.attr("background").replace("04", "00");
				$("body").attr("background", newBg);
				$("#plot-text").text("一天的劳累之后，你想撸一把缓解缓解心情，这时你的电脑突然蓝屏，几分钟后变回来了，屏幕上是游戏的起点。");
				$("#question-text").text("你希望在大学里恋爱吗？");
				$("#A").text("A. 希望");
				$("#B").text("B. 不希望");
				$("#C").text("C. 随缘");
			} 
		} else if (body.attr("background").search("img06") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("06", "10");
				$("body").attr("background", newBg);
				$("#plot-text").text("你救下了少女！一番交谈，你得知少女也是软院的，因为课程压力太大，起了轻生的念头。你以自己为例，劝导少女。少女豁然开朗，笑着说，对哦，你这样都活得下去，我怎么能死呢？你无言，邀少女去吃饭，选择了三饭。一向孤单的你突然有了少女陪伴，高兴不已，没注意到菜里的虫，三天后的夜晚，你入睡，再也没有醒来……卒！");
				success = true;
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("06", "11");
				$("body").attr("background", newBg);
				$("#plot-text").text("你没救少女，继续向前走。走着走着，你感觉到心口很痛。身后传来少女落水的声音，你闻声倒地。痛的是你的良心啊！卒！");
				success = true;
			} else {
				var newBg = body.attr("background").replace("06", "12");
				$("body").attr("background", newBg);
				$("#plot-text").text("你和少女相谈甚欢，决定一起跳河……被路人救下，少女说她其实是波斯明教的圣女，既然命不该绝，她决定带你一起回到波斯。就此，你和她展开了一段奇妙恋爱物语！");
				success = true;
			}
		} else if (body.attr("background").search("img09") != -1) {
			if ($(this).attr("id") == "A") {
				var newBg = body.attr("background").replace("09", "13");
				$("body").attr("background", newBg);
				$("#plot-text").text("你捡起了校园卡，发现卡中少女十分美丽！环顾四周并无人，保安也不在，你决定出去碰碰运气，来到了图书馆，竟然真的找到少女，并拿到了微信！之后，展开了恋爱物语！");
				success = true;
			} else if ($(this).attr("id") == "B") {
				var newBg = body.attr("background").replace("09", "09");
				$("body").attr("background", newBg);
				$("#plot-text").text("你没有捡起校园卡，担心卡上有毒，于是绕了过去。你走出玻璃门，发现自己还在公教楼。");
				$("#question-text").text("要捡吗？");
				$("#A").text("A. 捡");
				$("#B").text("B. 不捡");
				$("#C").text("C. 原地坐等卡主归来");
			} else {
				var newBg = body.attr("background").replace("09", "14");
				$("body").attr("background", newBg);
				$("#plot-text").text("你盘腿坐下，玩起了手机。身边不断有人经过，却没有人为你停下。手机玩到没电，头发也长长，你没有等到卡主人，自己却在漫长的岁月中老去了年华。卒。");
				success = true;
			}
		} else {}
		showPlot();
	}

	function bodyClick(event) {
		var target = $(event.target);
		if (!(target.is("#container") || target.is(".btn"))) {
			if (!isFinished() && container.css("display") == "none") {
				footbar.css("display", "none");
				container.fadeIn("50000").css("display", "block");
			}
		}
	}

	function showPlot() {
		container.css("display", "none");
		footbar.fadeIn("50000").css("display", "block");
	}

	function isFinished() {
		if (success) return true;
		else return false;
	}
})
