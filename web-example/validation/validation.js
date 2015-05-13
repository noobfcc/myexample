/**
 * 表单验证
 * author: Qzhou 448482356@qq.com
 * date: 2015-04-14 - 2015-04-16
 * Free to use under terms of MIT license
 */
define(function (require, exports, module) {
    'use strict';
    require("lib/jquery.form");
    var validatebox = function(options) {
        var _default = {
            formId: "#form",
            validDom: ".form-group",
            validSuccess: function(ele,msg) {
                $(ele).parents(validDom).removeClass("error").find(".err-msg").text("");
            },
            validError: function(ele,msg) {
                var msg = $(ele).data("msg") || msg;
                $(ele).parents(validDom).addClass("error").find(".err-msg").text(msg);
            },
            ajaxSuccess: function(data) {
               
            }
        };
        var opts = $.extend({},_default,options);
        var validDom = opts.validDom;
        var $formId = $(opts.formId);
        var validSuccess = opts.validSuccess;
        var validError = opts.validError;
        var ajaxSuccess = opts.ajaxSuccess;
        var beforeSubmit = opts.beforeSubmit;
        var reload = opts.reload || 0;
        var $formBtn = $formId.find("button[type='submit']");
        var defaultBtnText = $formId.find("button[type='submit']").html();
        if ($formId.find(".err-tip-content").length < 1) {
//            $formId.find(validDom).append("<span class='err-tip-content'><label class='err-msg'></label></span>");
            $formId.find(validDom).each(function() {
                var w = $(this).width() + 7;
                $(this).append('<div class="err-tip-content" style="left:'+w+'px"><div class="err-box"><div class="tri-right"></div><div class="err-msg"></div></div></div>')
            });
        }
        $.validate = {
            validator: function(type, value, param) {
                var rules = {
                    noEmpty: {
                        isValid: function(value) {
                            return value == ""? false : true;
                        },
                        message: "不能为空"
                    },
                    email: {
                        isValid: function(value) {
                            return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(value);
                        },
                        message: "请输入有效的邮箱地址"
                    },
                    number:  {
                       isValid: function(value) {
                            // return /^\d+$/.test(value);
                            // 可输入小数
                            return /^[0-9]+(.[0-9])?$/.test(value);
                        },
                        message: '请输入数字'
                    },
                    account: {
                        isValid: function(value) {
                            return /^[a-zA-Z][a-zA-Z0-9_]{4,10}$/.test(value);
                        },
                        message: "请输入5~10位，账号需字母开头"
                    },
                    safepass: {
                        isValid: function(value) {
                            return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
                        },
                        message: '密码由字母和数字组成，至少6位'
                    },
                    same: {
                        isValid: function(value) {
                            var valOld = $formId.find(".J_old").val();
                            return  value == valOld? true :false;
                        },
                        message: "两次密码不一致"
                    },
                    mobile: {
                        isValid: function(value) {
                            return /^\d{11}$/.test(value);
                        },
                        message: "请输入有效的手机号码"
                    },
                    idCard: {
                        isValid: function(value) {
                            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
                        },
                        message: "请输入有效的身份证号码"
                    },
                    length: {
                        isValid: function(value, param) {
                            var p = JSON.parse(param);
                            if (p[1]) {
                                return value.length >= p[0] && value.length <= p[1];
                            } else {
                                return value.length >= p[0];
                            }
                        },
                        message: "请输入有效的字数"
                    }
                };
                return {
                    isValid: rules[type].isValid(value, param),
                    message: rules[type].message
                }
            },
            handle: function(type, element, param) {
                var validator = this.validator;
                var $input = $formId.find(element);
                $input.addClass("validate");
                $input.on("focus change", function(e) {
                    var value = $(this).val();
                    var msg = validator(type, value, param).message;
                    if (!validator(type,value,param).isValid) {
                        validError($(this), msg);
                    } else {
                        validSuccess($(this));
                    }
                });
            },
            onSubmit: function() {
                $formId.ajaxForm({
                    beforeSubmit: function() {
                        var isRight = true;
                        $formId.find(".validate").each(function() {
                            if ($(this).val() == "" || $(this).parents(validDom).hasClass("error")) {
                                $(this).focus();
                                isRight = false;
                                return false;
                            }
                        });
                        if (!isRight) {
                            return false;
                        }
                        if (beforeSubmit) {
                           if (beforeSubmit() == false) {
                                return false;
                            }
                        }
                        var $formBtn = $formId.find("button[type='submit']");
                        var msg = $formBtn.data("msg") || "保存中...";
                        $formBtn.attr('disabled','disabled').html(msg);
                        // 超时8000毫秒还原
                        setTimeout(function() {
                            $formBtn.removeAttr('disabled','disabled').html(defaultBtnText);
                        }, 8000);
                    },
                    success: function(data) {
                        ajaxSuccess(data);
                        $formBtn.removeAttr('disabled','disabled').html(defaultBtnText);
                    },
                    dataType: 'json'
                });
            }
        };
        $formId.find("[data-validtype]").each(function() {
            var param;
            var type = $(this).data("validtype");
            var indexOf =  type.indexOf("[");
            if (indexOf > -1) {
                param = type.substr(indexOf);
                type = type.substr(0, indexOf);
            }
            $.validate.handle(type, $(this), param);
        });
        $.validate.onSubmit();
    };
    module.exports = validatebox;
});