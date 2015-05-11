/**
 * author: Qzhou zqz@zlzkj.com
 * date: 2014-11-04 -2014-11-15
 */
define(function (require, exports, module) {
/*
====================================================================
                ####公共模块####
====================================================================
*/    
    // IE mode
    var isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
    var isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
    var isIE10 = !! navigator.userAgent.match(/MSIE 10/);
    // placeholder兼容ie8
    var handleFixInputPlaceholderForIE = function () {
        //fix html5 placeholder attribute for ie8
        if (isIE8) { // ie8
            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
                var input = $(this);
                if(input.val()=='' && input.attr("placeholder") != '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }
                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
                input.blur(function () {                         
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    };
/*
====================================================================
                ####暴露接口####
====================================================================
*/
    module.exports = {
        init: function() {
            handleFixInputPlaceholderForIE();
        }
    }
});