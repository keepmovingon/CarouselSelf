/**
 * Created by zhangxin1.dz on 2017/3/22.
 */
//请求所需要的数据
/*var imgArr=[{"id":1,"source":"/qrtrace/selfDefine/data/moren.png"},
 {"id":2,"source":"/qrtrace/selfDefine/data/moren.png"},
 {"id":3,"source":"/qrtrace/selfDefine/data/moren.png"},
 {"id":4,"source":"/qrtrace/selfDefine/data/moren.png"},
 {"id":5,"source":"/qrtrace/selfDefine/data/moren.png"},
 {"id":6,"source":"/qrtrace/selfDefine/data/moren.png"}];*/
//参数为main.js中的全局广播器broad
try{
    if(KMG){
        $(".lunbo-outer").css("height",240);
        $(".lunbo-main").css("height",240);
        /*console.log(555);*/
    }
}catch(err){}

lunbo(broad);
function lunbo(broad,around,arr){
    var imgArrs=[];
    /*第二个参数用作传入数组图片，日后可进行扩展*/
    if(arr != undefined){
        imgArrs=arr;
    }
    //断点2:console.log(222);
    /*创建变量*/

    /*var defineStr = "var imgArr"+"s".toString();
     eval(defineStr);*/
    lunbo();
    function lunbo(){
        /*时间戳作为前端的ID值，防止冲突*/
        var t=Date.parse(new Date());
        if($("#QRCode").length != 0){
            var html='<div class="lunbo-outer" id="lunbo' + t + '"><ul class="lunbo-main"><li><i data-i="1"></i></li></ul><ul class="lunbo-tt"></ul></div>';
        }else{
            var html='<div class="lunbo-outer" id="lunbo' + t + '"><ul class="lunbo-main"><li><i data-i="1"><img src="/qrtrace/selfDefine/data/moren.png"/></i></li></ul><ul class="lunbo-tt"></ul></div>';
        }
        //在定制页面时，发现ID将组件加入，否则是手机端访问
        try{
            $("#lunbo"+broad).append(html);
            $("#lunbo"+broad).children(".lunbo-outer").addClass("lunbo-outer"+broad);
            $("#lunbo"+broad).find(".lunbo-main").addClass("lunbo-main"+broad);
            $("#lunbo"+broad).find(".lunbo-tt").addClass("lunbo-tt"+broad);
        }catch(err){
            $("body").append(html);
            /*多个相同的会不会造成冲突*/
        }
        /*judge();*/
    }
    /*记录当前实例ID，因为全局的会变化*/
    var presentId=0;
    presentId=broad;
    /*页面刚加载时，如果有图片，则加载，运行轮播动画，没有图片时，加载默认的图片*/
    if($("#QRCode").length != 0){
        var datas="componentPropertyId="+broad+"&isPhone="+1;
    }else{
        var datas="componentPropertyId="+broad+"&isPhone="+0;
    }
    $.ajax({
        type:"get",
        url:"/qrtrace/carouselComponent/loadComponentProperty",
        data:datas,
        success:function(data){
            if(imgArrs.length > data.length){
                execLunbo(imgArrs);
            }else{
                if(data.length != 0 && data){
                    imgArrs=[];
                    for(var i=0;i<data.length;i++){
                        //1-6代表轮播的顺序
                        imgArrs.push({"id":i+1,"source":data[i].pictureLocation,"src":data[i].pictureHyperlink});
                    }
                    /*console.log("轮播使用的数组",imgArrs);*/
                    execLunbo(imgArrs);
                }else{
                    /*console.log("数组长度不够");*/
                    $(".lunbo-main"+presentId).html('<li><i data-i="1"><img src="/qrtrace/selfDefine/data/moren.png"/></i></li>');
                }
            }
            judge();
            //console.log(imgArr);
        },
        error:function(jqXHR,textStatus,err){
            errorCode(jqXHR.status);
        }
        /*error:function(err){
         console.log("加载图片数据失败"+err);
         }*/
    });
    /*服务器返回参数，转换成一定的格式，作为参数，添加图片，执行轮播*/
    /*记得传入汇总的图片集合*/
    function execLunbo(shuzu){
        try{
            if(shuzu.length > 1 && shuzu){
                Lunbo(shuzu);
            }else if(shuzu.length == 0){
                $(".lunbo-main"+presentId).html('<li><i data-i="1"><img src="/qrtrace/selfDefine/data/moren.png"/></i></li>');
            }else if(shuzu.length == 1){
                $(".lunbo-main"+presentId).html('<li><a href="' + shuzu[0].src + '"><img src="' + shuzu[0].source + '"/></a></i>');
                /*可能需要删除轮播函数*/
            }
        }catch(err){
            console.log(err);
        }
    }
    /*将对象方法改为函数方法，因为会有多次添加的情况*/
    function Lunbo(shuzu){
        var imgArr=[],
            timer=0,//计时器
            //手指滑动开始坐标
            //手指滑动结束坐标
            startX= 0,startY= 0,moveX=0,moveY=0,endX= 0,endY=0,dx=0,
            left=0,//初始的left值
            flag=true,//控制是否自动轮播
            w=0,//轮播图容器宽度，暨每个图片设定的宽度
            len=0,//图片的数量
            L=0,//内层容器的长度
            kk=1,r=0;
        imgArr=shuzu?shuzu:[];
        /*if(around == true){*/
        /*排除图片数量叠加引起的，暂定为定时器未能消除掉,但是之前的图片还存在？*/
        /*	alert(imgArr.length);
         clearInterval(timer);
         timer=0;
         $("#lunbo"+broad).html("");
         lunbo();
         }else{
         init();
         }*/
        init();
        function init(){
            /*w=parseInt($(".lunbo-outer"+presentId).css("width"));*/
            if($("#QRCode").length != 0 && $("#QRCode").attr("data-times").indexOf("PC") != -1){
                w=300;
            }else if($("#QRCode").length != 0 && !$("#QRCode").attr("data-times")){
                w=$("body").width();
            }else if($("#QRCode").length != 0){
                w=fatherF;
            }else{
                //因为做了缩放，所以实际尺寸需要进行换算
                w=parseInt($(".lunbo-outer"+presentId).css("width"))*5/3;
            }
            console.log(w);
            initStatic();
            kk=1;
            var html1="";
            for(var i=0;i<imgArr.length;i++){
                html1+='<li><i data-i="' + imgArr[i].id + '"></i></li>';
            }
            $(".lunbo-tt"+presentId).html(html1);
            var ll=len*18/2;
            $(".lunbo-tt"+presentId).css("margin-left",-ll);
            $(".lunbo-tt"+presentId+" i[data-i=1]").addClass("lunbo-active");
            move();
            if(flag){
                moveAuto();
            }
        }
        function initStatic(){
            var html="";
            for(var i=0;i<imgArr.length;i++){
                html+='<li class="lunbo-container' + presentId + '" data-i="' + imgArr[i].id + '"><a href="' + imgArr[i].src + '"><img src="' +
                    imgArr[i].source + '" class="jumpp"/></a></li>';
            }
            len=imgArr.length;
            L=len*w;
            $(".lunbo-main"+presentId).css("width",L);
            $(".lunbo-main"+presentId).html(html);
            $(".lunbo-container"+presentId).css("width",w+"px");
        }
        function control(){
            var html="";
            for(var i=0;i<imgArr.length;i++){
                html+='<li class="lunbo-container' + presentId + '" data-i="' + imgArr[i].id + '"><a href="' + imgArr[i].src + '"><img src="' +
                    imgArr[i].source + '" class="jumpp"/></a></li>';
            }
            $(".lunbo-main"+presentId).html(html);
        }
        function move(){
            /*var self=this;*/
            $(".lunbo-main"+presentId).css("left",left);
            /*获取初始位置*/
            $(".lunbo-outer"+presentId).on("touchstart",function(e){
                /* e.preventDefault();*/
                //当前跟踪的触摸操作的touch对象的数组
                startX= e.touches[0].pageX;
                startY= e.touches[0].pageY;
                /*触摸的时候进行数组操作，以及初始化，结束时候再变回来*/
                /*imgArr=imgArr.splice(imgArr.length-1,1).concat(imgArr);
                 control();
                 left=-w;
                 $(".lunbo-main"+presentId).css("left",left);*/
                /*清楚定时器，停止自动轮播*/
                setTimeout(function(){
                    flag=false;
                    clearInterval(timer);
                    timer=0;
                },1000);
            });
            /*跟随手指进行移动*/
            $(".lunbo-outer"+presentId).on("touchmove",function(e){
                //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                moveX=e.touches[0].pageX;
                /*移动的偏移量*/
                dx=moveX-startX;
                /*只能在向右滑动时，执行一次*/
                /*if(r == 0 && dx > 0){
                 imgArr=imgArr.splice(imgArr.length-1,1).concat(imgArr);
                 initStatic();
                 left=-w;
                 $(".lunbo-main"+presentId).css("left",left);
                 r=1;
                 }*/
                $(".lunbo-main"+presentId).css("left",left+dx);
            });
            /*手指离开，完成图片切换*/
            $(".lunbo-outer"+presentId).on("touchend",function(e){
                /*e.preventDefault();*/
                r=0;
                endX= e.changedTouches[0].pageX;
                endY= e.changedTouches[0].pageY;
                if(parseInt(startX)-parseInt(endX)>30){
                    //向左滑动
                    //注释掉的这两段会失去动画效果
                    left=-w;
                    $(".lunbo-main"+presentId).animate({left: left}, 400,"linear",function(){
                        imgArr=imgArr.concat(imgArr.splice(0,1));
                        //console.log(imgArr);
                        left=0;
                        $(".lunbo-main"+presentId).css("left",left);
                        initStatic();
                    });
                    /*正常方向轮播*/
                    if(kk<imgArr.length){
                        kk++;
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                    }else if(kk==imgArr.length){
                        kk=1;
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                    }
                }else if(parseInt(endX)-parseInt(startX)>30){
                    //向右滑动
                    //先截取放在数组的左边
                    imgArr=imgArr.splice(imgArr.length-1,1).concat(imgArr);
                    initStatic();
                    left=-w;
                    $(".lunbo-main"+presentId).css("left",left);
                    left+=w;
                    $(".lunbo-main"+presentId).animate({left: left}, 400);
                    //console.log(imgArr);
                    /*反方向轮播*/
                    if(kk > 1){
                        kk--;
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                    }else if(kk==1){
                        kk=imgArr.length;
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                        $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                    }
                }else{
                    $(".lunbo-main"+presentId).css("left",0);
                }
                setTimeout(function(){
                    flag=true;
                    if(flag){
                        moveAuto();
                    }
                },1000);
            });
        }
        function moveAuto(){
            /*var self=this;*/
            /*console.log(imgArr);*/
            if(imgArr.length >= 2){
                timer=setInterval(function(){
                    /*if(around == true){
                     console.log(7);
                     clearInterval(timer);
                     timer=0;*/
                    left=-w;
                    $(".lunbo-main"+presentId).animate({left: left}, 300,"linear",function(){
                        imgArr=imgArr.concat(imgArr.splice(0,1));
                        //console.log(imgArr);
                        left=0;
                        $(".lunbo-main"+presentId).css("left",left);
                        initStatic();
                        /*console.log(self.kk);*/
                        if(kk<imgArr.length){
                            kk++;
                            $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                            $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                        }else if(kk==imgArr.length){
                            kk=1;
                            $(".lunbo-tt"+presentId+" li:nth-child("+kk+") i").addClass("lunbo-active");
                            $(".lunbo-tt"+presentId+" li:nth-child("+kk+")").siblings().find("i").removeClass("lunbo-active");
                        }
                    });
                },3000);
                timerArr.push(timer);
            }else{
                clearInterval(timer);
                timer=0;
            }
        }
    }
}
