<template>
	<div>
		<div class="app-contain">
			<el-form class="password_form" ref="passwordFormRef" :model="form" label-width="120px" :rules="rules">
				<el-form-item label="密码" prop="mima1">
					<el-input class="list_inp" v-model="form.mima1" type="password" show-password />
				</el-form-item>
				<el-form-item label="新密码" prop="mima">
					<el-input class="list_inp" v-model="form.mima" type="password" show-password />
				</el-form-item>
				<el-form-item label="确认密码" prop="mima2">
					<el-input class="list_inp" v-model="form.mima2" type="password" show-password />
				</el-form-item>
				<span class="update_form_btn_box">
					<el-button class="update_btn" type="primary" @click="onSubmit">保存</el-button>
				</span>
					
			</el-form>
		</div>
	</div>
</template>

<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const form = ref({})
	const user = ref({})
	const sessionTable = ref('')
	const passwordFormRef = ref(null)
	const rules = ref({
		mima1: [{
			required: true,
			message: '请输入',
			trigger: 'blur'
		}, ],
		mima: [{
			required: true,
			message: '请输入',
			trigger: 'blur'
		}, ],
		mima2: [{
			required: true,
			message: '请输入',
			trigger: 'blur'
		}, ],
	})
	const onSubmit = async () => {
		passwordFormRef.value.validate(async (valid) => {
			if (valid) {
				if(sessionTable.value == 'users'){
					if (form.value.mima1 != user.value.password) {
						context?.$toolUtil.message('原密码不正确','error')
						return false
					}
					user.value.password = form.value.mima
				}else{
					if(sessionTable.value == 'cangguanyuan'){
						if(form.value.mima1 != user.value.mima){
							context?.$toolUtil.message('原密码不正确', 'error')
							return false
						}
					}
				}
				if (form.value.mima2 != form.value.mima) {
					context?.$toolUtil.message('两次密码输入不一致','error')
					return false
				}
				if(sessionTable.value == 'cangguanyuan'){
					user.value.mima = form.value.mima
				}
				context?.$http({
					url: `${sessionTable.value}/update`,
					method: 'post',
					data: user.value
				}).then(res => {
					context?.$toolUtil.message('修改成功，下次登录将使用新密码登录','success')
				})
			}
		})

	}
	const getInfo = () => {
		sessionTable.value = context?.$toolUtil.storageGet('sessionTable')
		context?.$http({
			url: `${sessionTable.value}/session`,
			method: 'get'
		}).then(res => {
			user.value = res.data.data
		})
	}
	getInfo()
</script>

<style lang="scss" scoped>
	// 表单
	.password_form{
		border-radius: 6px;
		padding: 30px;
		// form item
		:deep(.el-form-item) {
			margin: 0 0 20px 0;
			display: flex;
			// 内容盒子
			.el-form-item__content{
				display: flex;
				width: calc(100% - 90px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					padding: 0 10px;
					background: #fff;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
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
		}
		// 按钮盒子
		.update_form_btn_box {
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			// 确定按钮
			.update_btn {
				border: 0;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				box-shadow: inset 0px 4px 10px 0px rgba(147,147,147,0.302);
				outline: 4px solid #EAF5FF;
				margin: 0 20px;
				color: #2C2C2C;
				background: #96C6EE;
				width: auto;
				font-size: 14px;
				height: 40px;
			}
			// 确定按钮-悬浮
			.update_btn:hover {
				background: rgba(150, 198, 238, 0.5);
				font-size: 16px;
			}
		}
	}
</style>
