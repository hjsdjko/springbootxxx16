<template>
	<div>
		<div class="forget_view">
			<div class="outTitle_view">
				<div class="outTilte">{{projectName}}注册</div>
			</div>
			<el-form :model="forgetForm" class="forget_box">
				<div class="tab_view">
					<div class="tab" :class="pageType==1?'tab_active':''">找回密码</div>
					<div class="tab" :class="pageType==2?'tab_active tab_active1':''">输入密保</div>
					<div class="tab" :class="pageType==3?'tab_active tab_active1 tab_active2':''">重置密码</div>
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
	const pageType = ref(1)
	const forgetForm = ref({})
	const userForm = ref({})
	//返回登录
	const close = () => {
		context?.$router.push({
			path: "/login"
		});
	}
</script>

<style lang="scss" scoped>
	.forget_view {
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
			display: flex;
			width: 29%;
			justify-content: center;
			align-items: center;
			position: fixed;
			height: 50px;
			.outTilte {
				color: #1296FE;
				font-weight: 600;
				font-size: 48px;
			}
		}
		// 表单盒子
		.forget_box {
			border-radius: 10px;
			padding: 30px 0;
			margin: 0 0 0 184px;
			display: flex;
			width: 600px;
			justify-content: center;
			flex-wrap: wrap;
			// tab
			// 盒子
			.tab_view {
				border-radius: 10px;
				margin: 0 0 80px;
				overflow: hidden;
				clip-path: polygon(00% 0%, 100% 00%,  100% 100%,4% 100%, 0 20%);
				background: #5DB6FF;
				font-weight: bold;
				display: flex;
				width: 100%;
				align-items: center;
				// 默认样式
				.tab {
					clip-path: polygon(00% 0%, 100% 00%,  100% 100%,10% 100%, 0 20%);
					background: #5DB6FF;
					width: calc(100% / 3);
					font-size: 18px;
					line-height: 40px;
					box-sizing: border-box;
					text-align: center;
					height: 40px;
				}
				// 选中样式一
				.tab_active {
					border-radius: 10px;
					clip-path: polygon(00% 0%, 80% 00%,95% 90%,  100% 100%,10% 100%, 0 20%);
					background: #fff;
				}
				// 选中样式二
				.tab_active1 {
					border-radius: 10px;
					clip-path: polygon(00% 0%, 80% 00%,95% 90%,  100% 100%,10% 100%, 0 20%);
					background: #fff;
				}
				// 选中样式三
				.tab_active2 {
					border-radius: 10px;
					clip-path: polygon(00% 0%, 80% 00%,95% 90%,  100% 100%,10% 100%, 0 20%);
					background: #fff;
				}
			}
			// item
			.list_item {
				margin: 10px 0;
				display: flex;
				width: 70%;
				justify-content: flex-start;
				align-items: center;
				// label
				.item_label {
					color: #000;
					width: 70px;
					font-size: 14px;
					box-sizing: border-box;
					text-align: center;
				}
				// 输入框
				:deep(.list_inp) {
					border: none;
					border-radius: 20px;
					padding: 0 10px;
					background: #fff;
					width: calc(100% - 90px);
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
				//下拉框样式
				:deep(.list_sel) {
					border: none;
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
			}
			// 按钮盒子
			.list_btn {
				margin: 20px 0 0;
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				// 获取密保
				:deep(.el-button--success) {
					border: 0;
					cursor: pointer;
					border-radius: 30px;
					padding: 0 24px;
					margin: 0 10px 0 0;
					outline: none;
					color: #fff;
					background: linear-gradient(270deg, #9DC8EB 0%, #5FB7FF 100%);
					width: 70%;
					font-size: 14px;
					height: 32px;
				}
				// 获取密保悬浮
				:deep(.el-button--success:hover) {
					background: linear-gradient(90deg, #9DC8EB 0%, #5FB7FF 100%);
				}
				// 确认密保
				:deep(.el-button--primary) {
					border: 0;
					cursor: pointer;
					border-radius: 30px;
					padding: 0 24px;
					margin: 0 10px 0 0;
					outline: none;
					color: #fff;
					background: linear-gradient(270deg, #9DC8EB 0%, #5FB7FF 100%);
					width: 70%;
					font-size: 14px;
					height: 32px;
				}
				// 确认密保悬浮
				:deep(.el-button--primary:hover) {
					background: linear-gradient(90deg, #9DC8EB 0%, #5FB7FF 100%);
				}
				// 重置密码
				:deep(.el-button--warning) {
					border: 0;
					cursor: pointer;
					border-radius: 30px;
					padding: 0 24px;
					margin: 0 10px 0 0;
					outline: none;
					color: #fff;
					background: linear-gradient(270deg, #9DC8EB 0%, #5FB7FF 100%);
					width: 70%;
					font-size: 14px;
					height: 32px;
				}
				// 重置密码悬浮
				:deep(.el-button--warning:hover) {
					background: linear-gradient(90deg, #9DC8EB 0%, #5FB7FF 100%);
				}
				.r-login {
					cursor: pointer;
					padding: 10px 0 0;
					color: #333;
					width: 100%;
					font-size: 14px;
					text-align: center;
				}
			}
		}
	}

	
</style>
