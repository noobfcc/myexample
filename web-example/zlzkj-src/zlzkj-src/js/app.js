define(function (require, exports, module) {
    require("nprogress");
    var nprogress = function() {
        NProgress.start();
        $(function() {
            NProgress.done();
        });
    }();
    var flexslider = function() {
        require.async("flexslider", function() {
            $(".flexslider").flexslider({
                animation: "slide"
            });
        });
    };
    var scrollspy = function() {
        require.async("scrollspy");
    };
    // 暴露接口
    module.exports = {
        slide: flexslider,
        scrollspy: scrollspy
    };
});