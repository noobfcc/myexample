/**
 * 标签切换-还在完善中......
 * author: fcc 905464262@qq.com
 * date: 2015-05-09
 * Free to use under terms of MIT license
 */
define(function (require, exports, module) {
(function($){
    $ .tab=function(options){
        var settings={     //以下为默认值
            tabdom:".tab",//可以选定dom元素
            tiggerType:"click",//触发标签类型“click”或者“mouseover”
            effect:"none",//动画效果可以设置成“none”和“fade”(淡入效果)
            autoplay:true,//是否自动切换，可以设置成true和false
            interval:2000//切换时间间隔,时间自己控制
        }
        var opts = $.extend({},settings,options);
        var $tabdom=$(opts.tabdom);
        var effe=opts.effect;
        var auto=opts.autoplay;
        var time=opts.interval;
        var type=opts.tiggerType;
        $tabdom.find("ul").children().eq(0).addClass("on");
        $tabdom.find("ul").siblings().children().eq(0).show();
        if (type == "click") {
            $tabdom.find("ul").children().bind(type,function(){
                var index = $(this).index();
                $(this).addClass("on").siblings().removeClass('on');
                if(effe == "fade"){
                        $(".tab ul").siblings().children().eq(index).fadeIn().siblings().hide();
                }else if(effe == "none"){
                        $(".tab ul").siblings().children().eq(index).show().siblings().hide();
                }
            })
        }
        else if(type == "mouseover") {
            $tabdom.find("ul").children().bind(type,function(){
                var index = $(this).index();
                $(this).addClass("on").siblings().removeClass('on');
                    if(effe == "fade"){
                        $(".tab ul").siblings().children().eq(index).fadeIn().siblings().hide();
                    }else if(effe == "none"){
                        $(".tab ul").siblings().children().eq(index).show().siblings().hide();
                    }
            })
        }
        if(auto ==true){
            var number = 0;
            var maxNumber =$tabdom.find("ul").children().length;
            function autotab(){
                number++;
                number == maxNumber? number = 0 : number;
                $tabdom.find("ul").children().eq(number).addClass('on').siblings().removeClass('on');
                $tabdom.find("ul").siblings().children().eq(number).fadeIn().siblings().hide();
            }
            var tabChange = setInterval(autotab,time);
            $tabdom.find("ul").children().mouseover(function(){
                clearInterval(tabChange);
		number = -1;
            });
            $tabdom.find("ul").children().mouseout(function(){
                tabChange = setInterval(autotab,time);
            });
        }  
    };
})( jQuery); 
)}