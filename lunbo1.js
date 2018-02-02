/**
 * Created by zhangxin1.dz on 2017/3/28.
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
/*import config from './src/config.json';引用json文件*/

//请求所需要的数据
/*$.ajax({
 type:"get",
 url:"",
 data:data,
 success:function(){

 },
 error:function(){

 }
 });*/

class Lunbo extends Component{
    render() {
        return (
            <div className="outer">
                <ul className="main">
                </ul>
                <ul className="tt">
                    <li><i></i></li>
                    <li><i className="active"></i></li>
                    <li><i></i></li>
                </ul>
            </div>
        );
    }
}
render(<Lunbo/>,document.getElementById('root'));
/*export default Lunbo*/

var imgArr=[{"id":1,"source":"../data/Desert.jpg"},
    {"id":2,"source":"../data/Hydrangeas.jpg"},
    {"id":3,"source":"../data/Jellyfish.jpg"},
    {"id":4,"source":"../data/Koala.jpg"},
    {"id":5,"source":"../data/Lighthouse.jpg"},
    {"id":6,"source":"../data/Tulips.jpg"}];

var lunbo={
    step:200,
    distance:300,//距离
    bu:1.5,//步长
    startX: 0,//手指滑动开始坐标
    startY: 0,
    endX: 0,//手指滑动结束坐标
    endY:0,
    left:0,//初始的left值
    flag:false,//控制是否自动轮播
    init:function(){
        this.initStatic();
        this.move();
    },
    initStatic:function(){
        var html="";
        for(var i=0;i<imgArr.length;i++){
            html+=`<li class="container" data-i="${imgArr[i].id}"><img src="${imgArr[i].source}" alt=""/></li>`;
        }
        $(".main").html(html);
    },
    move:function(){
        var self=this;
        $(".main").css("left",self.left);
        $(".outer").on("touchstart",function(e){
            e.preventDefault();
            //当前跟踪的触摸操作的touch对象的数组
            self.startX= e.touches[0].pageX;
            self.startY= e.touches[0].pageY;
        });
        $(".outer").on("touchend",function(e){
            e.preventDefault();
            self.endX= e.changedTouches[0].pageX;
            self.endY= e.changedTouches[0].pageY;
            if(parseInt(self.startX)-parseInt(self.endX)>30){
                //向左滑动
                //注释掉的这两段会失去动画效果
                self.left=-220;
                $(".main").animate({left: self.left}, 300,"linear",function(){
                    imgArr=imgArr.concat(imgArr.splice(0,1));
                    //console.log(imgArr);
                    self.left=0;
                    $(".main").css("left",self.left);
                    self.initStatic();
                });

            }else if(parseInt(self.endX)-parseInt(self.startX)>30){
                //向右滑动
                //先截取放在数组的左边
                imgArr=imgArr.splice(imgArr.length-1,1).concat(imgArr);
                self.initStatic();
                self.left=-220;
                $(".main").css("left",self.left);
                self.left+=220;
                $(".main").animate({left: self.left}, 300);

                //console.log(imgArr);
            }
        });
    }
};
lunbo.init();