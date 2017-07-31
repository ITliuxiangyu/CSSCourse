/**
 * Created by qingyun on 16/10/20.
 */
(function () {
    var leftBtn = document.querySelector('.leftBtn');
    var rightBtn = document.querySelector('.rightBtn');
    var imgContent = document.querySelector('.imgContent');
    var imgArr = document.querySelectorAll('img');
    var liArr = document.querySelectorAll('li');
    liArr[0].style.backgroundColor = 'red';
    //当前图片的索引
    var index = 0;

    function rightBtnClick () {
        // 增加index
        index++;
        // 移动contentDiv
        moveImgContent('right');
    }

    rightBtn.onclick = rightBtnClick;


    function leftBtnClick () {
        index--;
        moveImgContent('left');
    }
    leftBtn.onclick = leftBtnClick;

    //移动图片的方法
    function moveImgContent(direction) {
        //在移动的过程中按钮不能被点击
        leftBtn.onclick = null;
        rightBtn.onclick = null;
        var timeId = setInterval(function () {
            if(direction == "right"){
                imgContent.style.left = imgContent.offsetLeft - 5 + "px";
            }else if (direction == "left"){
                imgContent.style.left = imgContent.offsetLeft + 5 + "px";
            }
            //判断移动到什么时候停止
            if(imgContent.offsetLeft % 300 == 0){
                clearInterval(timeId);
                index = indexForEnable(index);
                rightBtn.onclick = rightBtnClick;
                leftBtn.onclick = leftBtnClick;

                //一定要放在下面
                setImageForImg();
                changePageForPicture();
                // console.log(index);

            }
        },10);

    }


    //设置图片
    var pics = ['1.jpg','2.jpg','3.jpg'];

    // 确保索引有效
    function indexForEnable (i) {
        if (i < 0) {
            return pics.length - 1;
        }else if (i > pics.length - 1) {
            return 0;
        }else {
            return i;
        }
    }
    function setImageForImg () {
        // 更改img的图片
        var leftImg = imgArr[0];
        var middleImg = imgArr[1];
        var rightImg = imgArr[2];
        // 设置图片
        middleImg.src = 'img/' + pics[indexForEnable(index)];
        leftImg.src = 'img/' + pics[indexForEnable(index - 1)];
        rightImg.src = 'img/' + pics[indexForEnable(index + 1)];
        // 调整imgContent的left（让第二个的img显示在中间）
        imgContent.style.left = '-300px';
    }
    //首先进行一次调整 让第一个图出现在中间
    setImageForImg();


    var a = 0;
    function autoPlay() {
        a++;
        if(a % 120 == 0){
            rightBtnClick();
        }
        timer = requestAnimationFrame(autoPlay);
    }
    // 更改页码
    function changePageForPicture () {
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].style.backgroundColor = 'black';
        }
        liArr[index].style.backgroundColor = 'red';
    }
    //自动轮播
    var timer = requestAnimationFrame(autoPlay);
    var mainDiv = document.getElementById('main');
    mainDiv.onmouseenter = function () {
        cancelAnimationFrame(timer);
    };
    mainDiv.onmouseleave = function () {
        timer = requestAnimationFrame(autoPlay);
    };
})();