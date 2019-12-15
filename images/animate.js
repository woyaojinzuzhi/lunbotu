function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,null)[attr];
    }
}


function animate(obj,json,callback){//目标是什么（谁动），属性是什么，回调函数（运动结束后的操作）
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //attr 是属性，json attr是值
        var isStop = true;
        for(var attr in json){
            var now = 0;
            if(attr == "opacity"){
                now = parseInt(getStyle(obj,attr)*100);
            }
            else{
                now = parseInt(getStyle(obj,attr));
            }
            
            var speed = Math.ceil((json[attr] - now)/6);
            // console.log(speed);
            var current = now + speed;
            if(attr == "opacity"){
                obj.style.opacity = current/100;
            }
            else{
                obj.style[attr] = current + "px";
            }
            if(json[attr] != current){
                isStop = false;
            }
        }
        if(isStop){
            clearInterval(obj.timer);
            if(callback){callback()};
        }
    },30)
}