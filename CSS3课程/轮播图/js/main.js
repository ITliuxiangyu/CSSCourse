/**
 * Created by qingyun on 16/10/20.
 */
(function () {
    var index = 0;
    var imgArr = document.querySelectorAll('img');
    var liArr = document.querySelectorAll('li');
    liArr[0].style.color = 'red';
    function changeShowImg(str) {
        if(str == "back"){
            index--;
        }else {
            index++;
        }
        for(var i = 0; i < imgArr.length;i++){
            imgArr[i].style.opacity = 0;
            liArr[i].style.color = 'white';
        }
        index = index > 2 ? 0 : index;
        index = index < 0 ? 2 : index;
        imgArr[index].style.opacity = 1;
        //改变下面的标识
        liArr[index].style.color = 'red';
    }
    var timer = setInterval(changeShowImg,2000);
    var mainDiv = document.getElementById('main');
    mainDiv.onmouseenter = function () {
        clearInterval(timer);
    };
    mainDiv.onmouseleave = function () {
        timer = setInterval(changeShowImg,2000);
    };

    //点击按钮改变图片
    var leftBtn = document.querySelector('.leftBtn');
    leftBtn.addEventListener('click',function () {
        changeShowImg('back');
    });
    var rightBtn = document.querySelector('.rightBtn');
    rightBtn.addEventListener('click',function () {
        changeShowImg();
    });
})();