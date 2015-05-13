// 获取某类下API列表

function getApiList(apiClass){
	$.getJSON(ZLZ.CONTROLLER+"/listapi?api_class="+apiClass, function(json){
		var apiOptionHtml = '';
		var apiParamsHtml = '';
		if(json.error!=undefined){
			alert(json.error);
		}else{

			for(var i in json){
				apiOptionHtml += '<option value="'+json[i]['api']+'">'+json[i]['api']+'</option>';
				apiParamsHtml += '<table class="'+json[i]['api'].replace("/","__")+'">';
				apiParamsHtml +=	'<tr><td align="right">API作用说明：</td><td>'+json[i]['mark']+'</td></tr>';
				for(var j in json[i]['params']){
					apiParamsHtml += '<tr>';
					apiParamsHtml += '	<td align="right">'+json[i]['params'][j]['name']+'：</td>';
					var type = 'text';
					if(json[i]['params'][j]['mark'].indexOf('密码')>0){
						type = 'password';
					}
					apiParamsHtml += '	<td><input type="'+type+'" name="'+json[i]['params'][j]['name']+'" />'+json[i]['params'][j]['mark']+'['+json[i]['params'][j]['type']+']</td>';
					apiParamsHtml += '</tr>';
				}
				apiParamsHtml += '</table>';

			};
		}
		$("#params_container").html(apiParamsHtml);
		$("#api").html(apiOptionHtml);
		getApiDetail($("#api").val());
	});
}

// 获取某个API的详情
function getApiDetail(api){
	var html = '';
	if(api){
		html = $("#params_container ."+api.replace("/","__")).html();
	}
	$("#api_params").html(html);
}

// 获取填写的API参数并返回签名
function createSign(params,appSecret){
	
	params = ksort(params);

	var stringToBeSigned = appSecret;
    for(var key in params)
    {
        stringToBeSigned += key+params[key];
    }
    stringToBeSigned += appSecret;
    return hex_md5(stringToBeSigned);
	
}

// 按照数组键排序
function ksort(inputArr, sort_flags) {

	var tmp_arr = {},
	  keys = [],
	  sorter, i, k, that = this,
	  strictForIn = false,
	  populateArr = {};

	switch (sort_flags) {
	case 'SORT_STRING':
	  // compare items as strings
	  sorter = function(a, b) {
	    return that.strnatcmp(a, b);
	  };
	  break;
	case 'SORT_LOCALE_STRING':
	  // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
	  var loc = this.i18n_loc_get_default();
	  sorter = this.php_js.i18nLocales[loc].sorting;
	  break;
	case 'SORT_NUMERIC':
	  // compare items numerically
	  sorter = function(a, b) {
	    return ((a + 0) - (b + 0));
	  };
	  break;
	// case 'SORT_REGULAR': // compare items normally (don't change types)
	default:
	  sorter = function(a, b) {
	    var aFloat = parseFloat(a),
	        bFloat = parseFloat(b),
	        aNumeric = aFloat + '' === a,
	        bNumeric = bFloat + '' === b;
	    if (aNumeric && bNumeric) {
	      return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
	    } else if (aNumeric && !bNumeric) {
	      return 1;
	    } else if (!aNumeric && bNumeric) {
	      return -1;
	    }
	    return a > b ? 1 : a < b ? -1 : 0;
	  };
	  break;
	}

	// Make a list of key names
	for (k in inputArr) {
	if (inputArr.hasOwnProperty(k)) {
	  keys.push(k);
	}
	}
	keys.sort(sorter);

	// BEGIN REDUNDANT
	this.php_js = this.php_js || {};
	this.php_js.ini = this.php_js.ini || {};
	// END REDUNDANT
	strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
	populateArr = strictForIn ? inputArr : populateArr;

	// Rebuild array with sorted key names
	for (i = 0; i < keys.length; i++) {
	k = keys[i];
	tmp_arr[k] = inputArr[k];
	if (strictForIn) {
	  delete inputArr[k];
	}
	}
	for (i in tmp_arr) {
	if (tmp_arr.hasOwnProperty(i)) {
	  populateArr[i] = tmp_arr[i];
	}
	}

	return strictForIn || populateArr;
}

// 高亮格式化显示JSON
var JSONFormat = (function(){
    var _toString = Object.prototype.toString;

    function format(object, indent_count){
        var html_fragment = '';
        switch(_typeof(object)){
            case 'Null' :0
                html_fragment = _format_null(object);
                break;
            case 'Boolean' :
                html_fragment = _format_boolean(object);
                break;
            case 'Number' :
                html_fragment = _format_number(object);
                break;
            case 'String' :
                html_fragment = _format_string(object);
                break;
            case 'Array' :
                html_fragment = _format_array(object, indent_count);
                break;
            case 'Object' :
                html_fragment = _format_object(object, indent_count);
                break;
        }
        return html_fragment;
    };

    function _format_null(object){
        return '<span class="json_null">null</span>';
    }

    function _format_boolean(object){
        return '<span class="json_boolean">' + object + '</span>';
    }

    function _format_number(object){
        return '<span class="json_number">' + object + '</span>';
    }

    function _format_string(object){
        if(0 <= object.search(/^http/)){
            object = '<a href="' + object + '" target="_blank" class="json_link">' + object + '</a>'
        }
        return '<span class="json_string">"' + object + '"</span>';
    }

    function _format_array(object, indent_count){
        var tmp_array = [];
        for(var i = 0, size = object.length; i < size; ++i){
            tmp_array.push(indent_tab(indent_count) + format(object[i], indent_count + 1));
        }
        return '[\n'
            + tmp_array.join(',\n')
            + '\n' + indent_tab(indent_count - 1) + ']';
    }

    function _format_object(object, indent_count){
        var tmp_array = [];
        for(var key in object){
            tmp_array.push( indent_tab(indent_count) + '<span class="json_key">"' + key + '"</span>:' +  format(object[key], indent_count + 1));
        }
        return '{\n'
            + tmp_array.join(',\n')
            + '\n' + indent_tab(indent_count - 1) + '}';
    }

    function indent_tab(indent_count){
        return (new Array(indent_count + 1)).join('   ');
    }

    function _typeof(object){
        var tf = typeof object,
            ts = _toString.call(object);
        return null === object ? 'Null' :
            'undefined' == tf ? 'Undefined'   :
                'boolean' == tf ? 'Boolean'   :
                    'number' == tf ? 'Number'   :
                        'string' == tf ? 'String'   :
                            '[object Function]' == ts ? 'Function' :
                                '[object Array]' == ts ? 'Array' :
                                    '[object Date]' == ts ? 'Date' : 'Object';
    };

    function loadCssString(){
        var style = document.createElement('style');
        style.type = 'text/css';
        var code = Array.prototype.slice.apply(arguments).join('');
        try{
            style.appendChild(document.createTextNode(code));
        }catch(ex){
            style.styleSheet.cssText = code;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    loadCssString(
        '.json_key{ color: purple;}',
        '.json_null{color: red;}',
        '.json_string{ color: #077;}',
        '.json_link{ color: #717171;}',
        '.json_array_brackets{}');

    var _JSONFormat = function(origin_data){
        this.data = 'string' != typeof origin_data ? origin_data :
            JSON && JSON.parse ? JSON.parse(origin_data) : eval('(' + origin_data + ')');
    };

    _JSONFormat.prototype = {
        constructor : JSONFormat,
        toString : function(){
            return format(this.data, 1);
        }
    }

    return _JSONFormat;

})();