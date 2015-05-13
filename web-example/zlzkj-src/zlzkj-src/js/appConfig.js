seajs.config({
	// Sea.js 的基础路径
	base: './',
	// 设置别名，方便调用
	alias: {
		"jquery": "js/jquery/jquery",
		"avalon": "js/avalon.js",
		"dropdown": "js/bootstrap/dropdown",
		"scrollspy": "js/bootstrap/scrollspy",
		"flexslider": "addons/flexslider/flexslider.js",
		"nprogress": "addons/nprogress/nprogress.js",
		'baidumap': 'http://api.map.baidu.com/getscript?v=2.0&ak=C3ef7404a7f457abebb032ff9b1af4eb'
	},
	// 预加载
	preload: ['jquery']
});
avalon.define("tpl", function(vm){
	var search = window.location.pathname;
	var file = search.split("/zlzkj/")[1].split(".html")[0];
	vm.index = file == "index"? true: false;
	vm.server = file == "server"? true: false;
	vm.product = file == "product"? true: false;
	vm.friend = file == "friend"? true: false;
	vm.news = file == "news"? true: false;
	vm.about = file == "about"? true: false;
	vm.headerUrl = 'header.html';
	vm.footerUrl = 'footer.html';
});
