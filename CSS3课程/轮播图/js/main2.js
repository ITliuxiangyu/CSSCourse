/**
 * Created by qingyun on 16/10/21.
 */
(function () {
    var imgContent = document.getElementById('imgContent');
    var index = -200;
    var direction = 'right';
    var timeId;
    function changeImg() {
        clearInterval(timeId);
        timeId = setInterval(function () {
            if (direction == 'left'){
                index++;
            }else {
                index--;
            }

            imgContent.style.left = index + "px";
            if (imgContent.offsetLeft % 200 == 0) {
                direction = "right";
                clearInterval(timeId);

                if (imgContent.offsetLeft / 200 < -3) {
                    index = -200;
                }
                if (imgContent.offsetLeft / 200 > -1) {
                    console.log(imgContent.offsetLeft);
                    index = -600;
                }
            }
        }, 5)
    }

    var a = 0;
    function autoPlay() {
        a++;
        if (a % 150 == 0){
            console.log(a);
            changeImg();
        }
        timer = requestAnimationFrame(autoPlay);
    }
    var timer = requestAnimationFrame(autoPlay);
    var leftBtn = document.querySelector('.leftBtn');
    var rightBtn = document.querySelector('.rightBtn');
    leftBtn.addEventListener('click',function () {
        direction = "left";
        changeImg();
    });
    rightBtn.addEventListener('click',function () {
        direction = "right";
        changeImg();
    });
    var mainDiv = document.getElementById('main');
    mainDiv.onmouseenter = function () {
        cancelAnimationFrame(timer);
    };
    mainDiv.onmouseleave = function () {
        timer = requestAnimationFrame(autoPlay);
    };
})();