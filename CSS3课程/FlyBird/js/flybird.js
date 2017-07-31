var startBtn = document.getElementById('start');
var headDiv = document.getElementById("head");
var menuDiv = document.getElementById("menu");
var pipesUl = document.getElementById("pipes");
var birdImg = document.getElementById("bird");
var gameDiv = document.getElementById("game");
var scoreDiv = document.getElementById("score");
var bulletMusic = document.getElementById("bullet");
var gameMusic = document.getElementById("gameMusic");
var gameOverMusic = document.getElementById("gameOver");
var endMenu = document.getElementById("end");
var currentSpan = document.getElementById("currentScore");
var bestSpan = document.getElementById("bestScore");

var bird = new Object();
//  小鸟的速度
var speed = 0;
var num = 0;

var pipeTimer;
var birdDownTimer;
var birdUpTime;

startBtn.onclick = function (event) {
	// 播放背景
	gameMusic.loop = "loop";
	gameMusic.play();

	event.cancelBubble = true;
	event.stopPropagation();

	headDiv.style.display = "none";
	menuDiv.style.display = "none";

	scoreDiv.style.display = "block";

	// createPipe();
	//  生成管道
	if (pipeTimer) {
		clearInterval(pipeTimer);
	}
	pipeTimer = setInterval(createPipe, 4000);

	birdImg.style.display = "block";

	//  小鸟下落
	birdDownTimer = setInterval(birdDown, 30);
	gameDiv.onclick = gameClick;
	
	setInterval(function() {
		var lis = document.querySelectorAll("li");
		for (var i = 0; i < lis.length; i++) {
			//判断顶部管道和小鸟是否发生碰撞
			collision(lis[i].firstElementChild);
			//判断底部管道和小鸟是否发生碰撞
			collision(lis[i].lastElementChild);
		}

	}, 15);

}

function collision(pipe) {
	//小鸟的位置
	var top1 = birdImg.offsetTop;
	var bottom1 = top1 + birdImg.offsetHeight;
	var left1 = birdImg.offsetLeft;
	var right1 = left1 + birdImg.offsetWidth;
	
	//管道的位置(上管道/下管道)
	// console.log(pipe);
	var top2 = pipe.offsetTop;
	var bottom2 = top2 + pipe.offsetHeight;
	var left2 = pipe.offsetParent.offsetLeft;
	var right2 = left2 + pipe.offsetWidth;
	
	//判断碰撞
	if (!(bottom1 < top2 || left1 > right2 || top1 > bottom2 || right1 < left2)) {
		gameOver();
	}
}

function createPipe() {
	var li = document.createElement("li");
	li.className = "pipe";
	li.style.left = pipesUl.clientWidth + 'px';
	pipesUl.appendChild(li);

	var doorHeight = 124;
	var minHeight = 60;

	var topHeight = Math.floor(Math.random() * (li.clientHeight - doorHeight - 2 * minHeight + 1));
	var bottomHeight = li.clientHeight - doorHeight - topHeight;

	var topDiv = document.createElement("div");
	topDiv.className = "pipeTop";
	topDiv.style.height = topHeight + 'px';
	li.appendChild(topDiv);

	var bottomDiv = document.createElement("div");
	bottomDiv.className = "pipeBottom";
	bottomDiv.style.height = bottomHeight + "px";
	li.appendChild(bottomDiv);

	// 管道移动
	var x = pipesUl.clientWidth;
	var pipeMoveTimer = setInterval(function() {
		x--;
		li.style.left = x + 'px';
		if (x <= -li.clientWidth) {
			clearInterval(pipeMoveTimer);
			pipesUl.removeChild(li);
		}
		if (x == 0) {
			changeScore();
		}

	}, 20);

}

//  修改分数
function changeScore() {
	num++;
	scoreDiv.innerHTML = "";
	// 添加图片
	if (num < 10) {
		
		var img = document.createElement('img');
		img.src = "img/" + num + ".jpg";
		scoreDiv.appendChild(img);
	} else {
		var img1 = document.createElement('img');
		img1.src = "img/" + Math.floor(num / 10) + ".jpg";
		scoreDiv.appendChild(img1);

		var img2 = document.createElement('img');
		img2.src = "img/" + num % 10 + ".jpg";
		scoreDiv.appendChild(img2);
	}
}

function birdDown() {
	birdImg.src = "img/down_bird.png";
	speed += 0.5;
	if (speed > 8) {
		speed = 8;
	}
	birdImg.style.top = birdImg.offsetTop + speed + 'px';
	if (birdImg.offsetTop + birdImg.clientHeight >= 423) {
		gameOver();
	}
}

function gameOver() {
	gameOverMusic.play();
	gameMusic.pause();
	var end = setInterval(function(){}, 1);
	for (var i = 1; i <= end; i++) {
		clearInterval(i);
	}
	var result = confirm("胜败乃兵家常事, 大侠请重新来过?")
	if (result) {
		//重新加载
		location.reload();
	}
	endMenu.style.display = "block";
	currentScore.innerHTML = num;
	if (localStorage.bestScore) {
		var a = localStorage.bestScore > num ? localStorage.bestScore : num;
		bestScore.innerHTML = a;
		localStorage.bestScore = a;
	} else {
		bestSpan.innerHTML = num;
		localStorage.bestScore = num;
	}
}

function gameClick() {
	bulletMusic.play();
	clearInterval(birdDownTimer);
	clearInterval(birdUpTime);
	speed = 8;
	birdUpTime = setInterval(birdUp, 30);
}

function birdUp() {

	birdImg.src = "img/up_bird.png";
	speed -= 0.5;
	if (speed < 0) {
		clearInterval(birdUpTime);
		speed = 0;
		birdDownTimer = setInterval(birdDown, 30);
	}
	birdImg.style.top = birdImg.offsetTop - speed + 'px';
	if (birdImg.offsetTop <= 0) {
		gameOver();
	}
}





