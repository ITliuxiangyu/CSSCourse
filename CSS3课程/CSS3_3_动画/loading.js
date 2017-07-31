/**
 * Created by qingyun on 16/10/15.
 */
(function (global) {
    //打开动画
    function openLoading() {
        //动画style
        var rotate = "@keyframes loadingRotate {from {transform: rotate(0deg)}to {transform: rotate(360deg)}}";
        var rotateStyle = document.createElement('style');
        rotateStyle.id = "loadingRotate";
        rotateStyle.innerHTML = rotate;
        document.head.appendChild(rotateStyle);

        //蒙版
        // var maskDiv = document.createElement('div');
        // maskDiv.id = "maskDiv";
        // maskDiv.setAttribute("style","height:100%;background-color:rgba(0, 0, 0, .7);left:0;right:0;bottom:0;top:0;position:fixed;margin:auto;");

        //动画的div
        var loadingBox = document.createElement('div');
        loadingBox.id = "loadingBox";
        loadingBox.setAttribute("style","width:100px;height:100px;background-color:rgba(0, 0, 0, .7);left:0;right:0;bottom:0;top:0;position:fixed;margin:auto;border-radius: 10%");

        //内部的圆圈
        var loadingDiv = document.createElement('div');
        loadingDiv.setAttribute("style","width: 40px; height: 40px;border: 3px solid rgba(255, 255, 255, 0.5);border-radius: 50%;animation: loadingRotate 1.5s infinite;border-top: 3px solid rgba(255, 255, 255, 1);left:0;right:0;bottom:0;top:0;position:fixed;margin:auto;");
        loadingBox.appendChild(loadingDiv);
        // maskDiv.appendChild(loadingBox);
        // document.body.appendChild(maskDiv);
        document.body.appendChild(loadingBox);
    }
    //移除动画元素
    function closeLoading() {
        var loadingBox = document.getElementById('loadingBox');
        var loadingRotate = document.getElementById("loadingRotate");
        document.body.removeChild(loadingBox);
        document.head.removeChild(loadingRotate);
    }

    var loading = {
        openLoading:openLoading,
        closeLoading:closeLoading
    };
    global.loading = loading;
}(window));