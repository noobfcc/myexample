/**  
 * layout方法扩展  
 * @param {Object} jq  
 * @param {Object} region  
 */  
$.extend($.fn.layout.methods, {   
    /**  
     * 面板是否存在和可见  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    isVisible: function(jq, params) {   
        var panels = $.data(jq[0], 'layout').panels;   
        var pp = panels[params];   
        if(!pp) {   
            return false;   
        }   
        if(pp.length) {   
            return pp.panel('panel').is(':visible');   
        } else {   
            return false;   
        }   
    },   
    /**  
     * 隐藏除某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    hidden: function(jq, params) {   
        return jq.each(function() {   
            var opts = $.data(this, 'layout').options;   
            var panels = $.data(this, 'layout').panels;   
            if(!opts.regionState){   
                opts.regionState = {};   
            }   
            var region = params;   
            function hide(dom,region,doResize){   
                var first = region.substring(0,1);   
                var others = region.substring(1);   
                var expand = 'expand' + first.toUpperCase() + others;   
                if(panels[expand]) {   
                    if($(dom).layout('isVisible', expand)) {   
                        opts.regionState[region] = 1;   
                        panels[expand].panel('close');   
                    } else if($(dom).layout('isVisible', region)) {   
                        opts.regionState[region] = 0;   
                        panels[region].panel('close');   
                    }   
                } else {   
                    panels[region].panel('close');   
                }   
                if(doResize){   
                    $(dom).layout('resize');   
                }   
            };   
            if(region.toLowerCase() == 'all'){   
                hide(this,'east',false);   
                hide(this,'north',false);   
                hide(this,'west',false);   
                hide(this,'south',true);   
            }else{   
                hide(this,region,true);   
            }   
        });   
    },   
    /**  
     * 显示某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    show: function(jq, params) {   
        return jq.each(function() {   
            var opts = $.data(this, 'layout').options;   
            var panels = $.data(this, 'layout').panels;   
            var region = params;   
  
            function show(dom,region,doResize){   
                var first = region.substring(0,1);   
                var others = region.substring(1);   
                var expand = 'expand' + first.toUpperCase() + others;   
                if(panels[expand]) {   
                    if(!$(dom).layout('isVisible', expand)) {   
                        if(!$(dom).layout('isVisible', region)) {   
                            if(opts.regionState[region] == 1) {   
                                panels[expand].panel('open');   
                            } else {   
                                panels[region].panel('open');   
                            }   
                        }   
                    }   
                } else {   
                    panels[region].panel('open');   
                }   
                if(doResize){   
                    $(dom).layout('resize');   
                }   
            };   
            if(region.toLowerCase() == 'all'){   
                show(this,'east',false);   
                show(this,'north',false);   
                show(this,'west',false);   
                show(this,'south',true);   
            }else{   
                show(this,region,true);   
            }   
        });   
    }   
}); 

/**
 * 验证扩展
 */
$.extend($.fn.validatebox.defaults.rules, {
    idcard : {// 验证身份证 
        validator : function(value) { 
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value); 
        }, 
        message : '身份证号码格式不正确'
    },
    safepass: {
        validator: function (value, param) {
             return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
        },
        message: '密码由字母和数字组成，至少6位'
    },
    phone : {// 验证电话号码 
        validator : function(value) { 
            return /^0\d{2,3}(\-)?\d{7,8}$/.test(value);
        }, 
        message : '格式不正确,请使用下面格式:020-88888888'
    }, 
    mobile : {// 验证手机号码 
        validator : function(value) { 
            return /^\d{11}$/.test(value);
        }, 
        message : '请输入正确的手机号码'
    }, 
    currency : {// 验证货币 
        validator : function(value) { 
            return /^d+(.d+)?$/i.test(value); 
        }, 
        message : '货币格式不正确'
    }, 
    qq : {// 验证QQ,从10000开始 
        validator : function(value) { 
            return /^[1-9]\d{4,10}$/.test(value); 
        }, 
        message : 'QQ号码格式不正确'
    }, 
    integer : {// 验证整数 
        validator : function(value) { 
            return /^[0-9]*[1-9][0-9]*$/.test(value); 
        }, 
        message : '只能输入正整数'
    }, 
    age : {// 验证年龄
        validator : function(value) { 
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value); 
        }, 
        message : '年龄必须是0到120之间的整数'
    }, 
     
    chinese : {// 验证中文 
        validator : function(value) { 
            return /^[Α-￥]+$/i.test(value); 
        }, 
        message : '请输入中文'
    }, 
    english : {// 验证英语 
        validator : function(value) { 
            return /^[A-Za-z]+$/i.test(value); 
        }, 
        message : '请输入英文'
    },
    number: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入数字'
    },
    unnormal : {// 验证是否包含空格和非法字符 
        validator : function(value) { 
            return /.+/i.test(value); 
        }, 
        message : '输入值不能为空和包含其他非法字符'
    }, 
    username : {// 验证用户名 
        validator : function(value) { 
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value); 
        }, 
        message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    }, 
    faxno : {// 验证传真 
        validator : function(value) { 
//            return /^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/i.test(value); 
            return /^(((d{2,3}))|(d{3}-))?((0d{2,3})|0d{2,3}-)?[1-9]d{6,7}(-d{1,4})?$/i.test(value); 
        }, 
        message : '传真号码不正确'
    }, 
    zip : {// 验证邮政编码 
        validator : function(value) { 
            return /^[1-9]\d{5}$/.test(value);
        }, 
        message : '邮政编码格式不正确'
    }, 
    ip : {// 验证IP地址 
        validator : function(value) { 
            return /d+.d+.d+.d+/i.test(value); 
        }, 
        message : 'IP地址格式不正确'
    }, 
    name : {// 验证姓名，可以是中文或英文 
            validator : function(value) { 
                return /^[Α-￥]+$/i.test(value)|/^w+[ws]+w+$/i.test(value); 
            }, 
            message : '请输入正确的姓名'
    },
    date : {// 日期验证 
        validator : function(value) { 
         //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])1(?:29|30)|(?:0?[13578]|1[02])1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?22(?:29))$/i.test(value); 
        },
        message : '请输入合适的日期格式'
    },
    same:{ 
        validator : function(value, param){ 
            if($("#"+param[0]).val() != "" && value != ""){ 
                return $("#"+param[0]).val() == value; 
            }else{ 
                return true; 
            } 
        }, 
        message : '两次输入的密码不一致！'   
    },
    minLength: {
        validator: function(value, param){
        return value.length >= param[0];
        },
        message: '内容长度至少为 {0} 位！'
    },
    onlyLength: {
        validator: function(value, param){
        return value.length == param[0];
        },
        message: '内容长度只能为 {0} 位！'
    }
});

/**
 * 禁用combo文本域
 * @param {Object} jq
 * activeTextArrow:是否激活点击文本域显示下拉列表
 */
$.extend($.fn.combo.methods, {   
    activeTextArrow : function(jq) {   
        return jq.each(function() {   
            var textbox = $(this).combo("textbox");   
            var that = this;   
            var panel = $(this).combo("panel");   
            textbox.bind('click.mycombo', function() {   
                if (panel.is(":visible")) {   
                    $(that).combo('hidePanel');   
                } else {   
                    $("div.combo-panel").panel("close");   
                    $(that).combo('showPanel');   
                }   
            });   
        });   
    },   
    /**
     * 取消点击文本框也显示下拉面板的功能  
     * @param {Object} jq  
     */  
    inactiveTextArrow : function(jq) {   
        return jq.each(function() {   
            var textbox = $(this).combo("textbox");   
            textbox.unbind('click.mycombo');   
        });   
    }   
});  

