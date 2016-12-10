//flag的判断代码过于冗长，需要修改
function gradualMove(ele,json,fn){
    var flag=false;    //假设属性达到目标值
    if(ele.intervalId){
     clearInterval(ele.intervalId);
    }
    
     ele.intervalId=setInterval(function(){
         var i=0;
         var a=[];
         for(var attr in json){
         
         var now;
         if(attr=="opacity"){
             now=parseFloat(getStyle(ele,attr))*100;
         }else{
             now=parseInt(getStyle(ele,attr));
         }
         var speed=(json[attr]-now)/10;
        if(speed>0){
             speed=Math.ceil(speed);
        }else{
            speed=Math.floor(speed);
        }
        
        if(now !=json[attr]){
            a[i]=false;
            if(attr=="opacity"){
                ele.style.opacity=(now+speed)/100;
                ele.style.filter="alpha(opacity="+(now+speed)+")";
            }else{
                
                ele.style[attr]=now+speed+"px";
            }
        }else{
            a[i]=true;
        }
        i++;
         }
         if(a.length>1){
             for(var j=0;j < a.length;j++){
             if(a[j] && a[j+1]){
                 flag=true;
             }
             }
         }else{
             flag=a[0];
         }
         
         if(flag){
             clearInterval(ele.intervalId);
            if(fn){
                 fn();
             }
         }
        
    },60)
   function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];   //非IE
    }else{
        return ele.currentStyle[attr];    //IE
    }
    } 
}
