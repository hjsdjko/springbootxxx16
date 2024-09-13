<template>
	<div class="home_view">
		<div class="projectTitle">欢迎使用 {{projectName}}</div>
	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const init=()=>{
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	init()
</script>
<style lang="scss">
	.projectTitle{
		padding: 20px 0;
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 30px;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
	
	// 总数盒子
	.count_list{
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 总数card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// card头部
			.el-card__header {
				border: 1px solid #e4e7ed;
				padding: 7px 20px;
				background: #62B8FF;
				width: 100%;
				border-width: 0;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #fff;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon {
							cursor: pointer;
							color: #fff;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.count_item{
					padding: 30px 20px 60px;
					flex-direction: column-reverse;
					display: flex;
					// 总数标题
					.count_title{
						color: #3753A2;
						font-weight: bold;
						font-size: 16px;
						line-height: 1;
						order: 1;
					}
					// 总数数字
					.count_num{
						color: #3753A2;
						font-weight: bold;
						font-size: 50px;
						line-height: 1.5;
						order: 2;
					}
				}
			}
		}
	}
	// 首页盒子
	.home_view {
		padding: 20px;
		background: url(http://clfile.zggen.cn/20240203/09a98f4852104a599055d47953ef0a23.png) no-repeat center top / 100% 100% !important;
		width: 100%;
		min-height: 100vh;
		height: auto;
	}
	// 统计图盒子
	.card_list {
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 统计图card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// 头部
			.el-card__header {
				border: 0px solid #e4e7ed;
				padding: 7px 20px;
				background: #62B8FF;
				width: 100%;
				border-width: 0;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #fff;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon{
							cursor: pointer;
							color: #fff;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.card_item{
					padding: 30px;
					text-align: center;
				}
			}
		}
	}
</style>
