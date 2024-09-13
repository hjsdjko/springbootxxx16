<template>
	<div>
		<div class="register_view">
			<div class="outTitle_view">
				<div class="outTilte">{{projectName}}注册</div>
			</div>
			<el-form :model="registerForm" class="register_form">
				<div class="list_item">
					<div class="list_label">仓管员账号：</div>
					<el-input class="list_inp"
						 v-model="registerForm.cangguanyuanzhanghao" 
						 placeholder="请输入仓管员账号"
						 type="text"
						/>
				</div>
				<div class="list_item">
					<div class="list_label">密码：</div>
					<el-input class="list_inp"
						 v-model="registerForm.mima" 
						 placeholder="请输入密码"
						 type="password"
						 />
				</div>
				<div class="list_item">
					<div class="list_label">确认密码：</div>
					<el-input class="list_inp" v-model="registerForm.mima2" type="password" placeholder="请输入确认密码" />
				</div>
				<div class="list_item">
					<div class="list_label">仓管员姓名：</div>
					<el-input class="list_inp"
						 v-model="registerForm.cangguanyuanxingming" 
						 placeholder="请输入仓管员姓名"
						 type="text"
						/>
				</div>
				<div class="list_item">
					<div class="list_label">头像：</div>
					<div :style='{"width":"calc(100% - 120px)"}' class="list_file_list">
						<uploads
							action="file/upload" 
							tip="请上传头像" 
							:limit="3"
							:fileUrls="registerForm.touxiang?registerForm.touxiang:''" 
							@change="touxiangUploadSuccess">
						</uploads>
					</div>
				</div>
				<div class="list_item">
					<div class="list_label">性别：</div>
					<el-select 
						class="list_sel"
						v-model="registerForm.xingbie" 
						placeholder="请选择性别"
						>
						<el-option v-for="item in cangguanyuanxingbieLists" :label="item" :value="item"></el-option>
					</el-select>
				</div>

				<div class="list_item">
					<div class="list_label">手机号码：</div>
					<el-input class="list_inp"
						 v-model="registerForm.shoujihaoma" 
						 placeholder="请输入手机号码"
						 type="text"
						/>
				</div>
				<div class="list_btn">
					<el-button class="register" type="success" @click="handleRegister">注册</el-button>
					<div class="r-login" @click="close">已有账号，直接登录</div>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context?.$project.projectName
	//获取注册类型
	import { useRoute } from 'vue-router';
	const route = useRoute()
	const tableName = ref('cangguanyuan')
	
	//公共方法
	const getUUID=()=> {
		return new Date().getTime();
	}
	const registerForm = ref({
        xingbie: '',
	})
	const cangguanyuanxingbieLists = ref([])
	const init=()=>{
		cangguanyuanxingbieLists.value = "男,女".split(',')
	}
    const touxiangUploadSuccess=(fileUrls)=> {
        registerForm.value.touxiang = fileUrls;
    }
	// 多级联动参数
	//注册按钮
	const handleRegister = () => {
		let url = tableName.value +"/register";
		if((!registerForm.value.cangguanyuanzhanghao)){
			context?.$toolUtil.message(`仓管员账号不能为空`,'error')
			return false
		}
		if((!registerForm.value.mima)){
			context?.$toolUtil.message(`密码不能为空`,'error')
			return false
		}
		if(registerForm.value.mima!=registerForm.value.mima2){
			context?.$toolUtil.message('两次密码输入不一致','error')
			return false
		}
		if((!registerForm.value.cangguanyuanxingming)){
			context?.$toolUtil.message(`仓管员姓名不能为空`,'error')
			return false
		}
		if(registerForm.value.touxiang!=null){
			registerForm.value.touxiang = registerForm.value.touxiang.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if(registerForm.value.shoujihaoma&&(!context?.$toolUtil.isMobile(registerForm.value.shoujihaoma))){
			context?.$toolUtil.message(`手机号码应输入手机格式`,'error')
			return false
		}
		
		context?.$http({
			url:url,
			method:'post',
			data:registerForm.value
		}).then(res=>{
			context?.$toolUtil.message('注册成功','success', obj=>{
				context?.$router.push({
					path: "/login"
				});
			})
		})
	}
	//返回登录
	const close = () => {
		context?.$router.push({
			path: "/login"
		});
	}
	init()
</script>
<style lang="scss" scoped>
	
	.register_view {
		background-repeat: no-repeat;
		background-size: cover !important;
		background: url(http://clfile.zggen.cn/20240318/cb621f6084bf47a280c5ab08f1809c0f.png);
		display: flex;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		position: relative;
		background-position: center center;
		// 标题盒子
		.outTitle_view {
			margin: -25px 0 0;
			top: 50%;
			left: 0;
			width: 29%;
			line-height: 50px;
			position: fixed;
			text-align: center;
			height: 50px;
			.outTilte {
				color: #1296FE;
				font-weight: bold;
				letter-spacing: 6px;
				font-size: 48px;
			}
		}
		// 表单盒子
		.register_form {
			border-radius: 10px;
			padding: 30px 60px;
			margin: 0 0 0 100px;
			background: none;
			display: flex;
			width: 600px;
			justify-content: center;
			flex-wrap: wrap;
		}
		// item盒子
		.list_item {
			margin: 10px 0;
			display: flex;
			width: 100%;
			justify-content: flex-start;
			align-items: center;
			// label
			.list_label {
				color: #000;
				width: 90px;
				font-size: 14px;
				box-sizing: border-box;
				text-align: center;
			}
			// 输入框
			:deep(.list_inp) {
				border-radius: 20px;
				padding: 0 10px;
				background: #fff;
				width: calc(100% - 90px);
				border-color: #5FB7FF;
				outline-offset: 4px;
				border-width: 2px;
				line-height: 36px;
				box-sizing: border-box;
				border-style: solid;
				height: 36px;
				//去掉默认样式
				.el-input__wrapper{
					border: none;
					box-shadow: none;
					background: none;
					border-radius: 0;
					height: 100%;
					padding: 0;
				}
				.is-focus {
					box-shadow: none !important;
				}
			}
		}
		//下拉框样式
		:deep(.list_sel) {
			border: 2px solid #5FB7FF;
			border-radius: 20px;
			padding: 0 10px;
			background: #fff;
			width: calc(100% - 90px);
			line-height: 36px;
			box-sizing: border-box;
			//去掉默认样式
			.select-trigger{
				height: 100%;
				.el-input{
					height: 100%;
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
			}
		}
		//按钮盒子
		.list_btn {
			margin: 20px 0 0;
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			//注册按钮
			.register {
					border: none;
					border-radius: 0;
					color: #fff;
					background: linear-gradient(90deg, #FB843D 0%, #9EC8EA 0%, #5DB6FF 100%);
					width: 80%;
					font-size: 20px;
					height: 40px;
			}
			//注册按钮悬浮样式
			.register:hover {
				border: none;
				border-radius: 0;
				background: linear-gradient(270deg, #FB843D 0%, #9EC8EA 0%, #5DB6FF 100%);
				width: 80%;
				font-size: 20px;
				height: 40px;
			}
			//已有账号
			.r-login {
				cursor: pointer;
				padding: 10px 0 0;
				color: #000;
				width: 100%;
				font-size: 14px;
				text-align: center;
			}
		}
		//图片上传样式
		.list_file_list  {
			//提示语
			:deep(.el-upload__tip){
				margin: 7px 0 0;
				color: #666;
				display: none;
				font-size: 14px;
				justify-content: flex-start;
				align-items: center;
			}
			//外部盒子
			:deep(.el-upload--picture-card){
				border: 2px solid #5FB7FF;
				cursor: pointer;
				background-color: #fff;
				border-radius: 20px;
				width: 90px;
				line-height: 100px;
				text-align: center;
				height: 90px;
				//图标
				.el-icon{
					color: #9E9E9E;
					font-size: 32px;
				}
			}
			:deep(.el-upload-list__item) {
				border: 2px solid #5FB7FF;
				cursor: pointer;
				background-color: #fff;
				border-radius: 20px;
				width: 90px;
				line-height: 100px;
				text-align: center;
				height: 90px;
			}
		}
	}
</style>