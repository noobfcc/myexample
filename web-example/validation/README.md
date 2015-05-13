# validation
简单实用的表单验证插件，几行代码即可搞定复杂的表单验证。

## 使用说明
在表单输入框里加``入data-validtype=""``,	
目前验证规则有：	
不能为空``data-validtype="noEmpty"``,	
邮箱地址``data-validtype="email"``,		
数字``data-validtype="number"``,	
手机号码``data-validtype="mobile"``,	
身份证号码``data-validtype="idCard"``,  
长度验证``data-validtype="length[1,3]"``,``[]``里填写长度限制      
通过``data-msg=""``,可以修改提示内容

## 最佳实践

	<form id="form" action="" method="post">
		<div class="form-group">
	        <label>
	            <span class="label">登录账号：</span>
	            <input type="text" data-validtype="account" data-msg="请输入5~10位" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">手机号码：</span>
	            <input type="text" data-validtype="mobile" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">邮箱地址：</span>
	            <input type="text" data-validtype="email" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">身份证号：</span>
	            <input type="text" data-validtype="idCard" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">年龄：</span>
	            <input type="text" data-validtype="number" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">密码：</span>
	            <input type="password" data-validtype="noEmpty" class="J_old" />
	        </label>
	    </div>
	    <div class="form-group">
	        <label>
	            <span class="label">确认密码：</span>
	            <input type="password" data-validtype="same" />
	        </label>
	    </div>
	    <div class="form-group">
	        <span class="label">&nbsp;</span>
	        <button class="btn btn-warning" type="submit" data-msg="保存中...">提交</button>
	    </div>
	</form>
	<script>
		seajs.use("validation", function(validatebox) {
		    validatebox({
		        formId: "#form",
		        ajaxSuccess: function(data) {
		            alert(data.info);
		        }
		    });
		});
	</script>

## 配置说明
#### formId
需要实例化的表单ID	
Type: String	
Default: "#form"

#### validDom
输入框验证区块，所有的输入框验证区块的class必须保持统一的类名	
Type: String	
Default: ".form-group"

#### beforeSubmit
表单提交前的操作回调	
Type: Function	 
Default: null

#### ajaxSuccess
表单提交成功后的回调	 
Type: Function	 
Default: null