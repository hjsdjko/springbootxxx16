<template>
	<div>
		<div class="login_view">
			<div class="outTitle_view">
				<div class="outTilte">基于SpringBoot的航空散货调度系统登录</div>
			</div>
			<el-form :model="loginForm" class="login_form">
				<div class="tabView" v-if="userList.length>1">
					<div class="tab" :style="{'width':`calc(100% / ${userList.length})`}"
						:class="loginForm.role==item.roleName?'tabActive':''" v-for="(item,index) in userList"
						:key="index" @click="tabClick(item.roleName)">{{item.roleName}}</div>
				</div>
				<div class="list_item" v-if="loginType==1">
					<div class="list_label">
						账号：
					</div>
					<input class="list_inp" v-model="loginForm.username" placeholder="请输入账号" />
				</div>
				<div class="list_item" v-if="loginType==1">
					<div class="list_label">
						密码：
					</div>
					<input class="list_inp" v-model="loginForm.password" type="password" placeholder="请输入密码" @keydown.enter.native="handleLogin"  />
				</div>
				<div class="btn_view">
					<el-button class="login" v-if="loginType==1" type="success" @click="handleLogin">登录</el-button>
					<el-button class="register" type="primary" @click="handleRegister('cangguanyuan')">注册仓管员</el-button>
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
		onMounted,
	} from "vue";
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//注册
    const handleRegister = (tableName) => {
    	context?.$router.push(`/${tableName}Register`)
    	
    }
	//登录用户tab切换
	const tabClick = (role) => {
		loginForm.value.role = role
		
	}
	const handleLogin = () => {
		if (!loginForm.value.username) {
			context?.$toolUtil.message('请输入用户名', 'error')
			
			return;
		}
		if (!loginForm.value.password) {
			context?.$toolUtil.message('请输入密码', 'error')
			
			return;
		}
		if (userList.value.length > 1) {
			if (!loginForm.value.role) {
				context?.$toolUtil.message('请选择角色', 'error')
				verifySlider.value.reset()
				return;
			}
			for (let i = 0; i < menus.value.length; i++) {
				if (menus.value[i].roleName == loginForm.value.role) {
					tableName.value = menus.value[i].tableName;
				}
			}
		} else {
			tableName.value = userList.value[0].tableName;
			loginForm.value.role = userList.value[0].roleName;
		}
		login()
	}
	const login = () => {
		context?.$http({
			url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
			method: 'post'
		}).then(res => {
			context?.$toolUtil.storageSet("Token", res.data.token);
			context?.$toolUtil.storageSet("role", loginForm.value.role);
			context?.$toolUtil.storageSet("sessionTable", tableName.value);
			context?.$toolUtil.storageSet("adminName", loginForm.value.username);
			context?.$router.push('/')
		}, err => {
		})
	}
	//获取菜单
	const getMenu=()=> {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id',
      }

      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
          menus.value = JSON.parse(res.data.data.list[0].menujson)
          for (let i = 0; i < menus.value.length; i++) {
            if (menus.value[i].hasBackLogin=='是') {
              userList.value.push(menus.value[i])
            }
          }
			loginForm.value.role = userList.value[0].roleName
          context?.$toolUtil.storageSet("menus", JSON.stringify(menus.value));
      })
    }
	//初始化
	const init = () => {
		getMenu();
	}
	onMounted(()=>{
		init()
		
	})
</script>

<style lang="scss" scoped>
	.login_view {
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
		.login_form {
			border-radius: 10px;
			margin: 0 0 0 184px;
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
			width: 90%;
			justify-content: center;
			align-items: center;
			// label
			.list_label {
				color: #000;
				width: 90px;
				font-size: 14px;
				text-align: center;
			}
			// 输入框
			.list_inp {
				border: 0px solid #ddd;
				border-radius: 20px;
				padding: 0 10px;
				background: #fff;
				width: calc(100% - 90px);
				outline-offset: 4px;
				line-height: 36px;
				height: 36px;
			}
		}
		// 用户类型样式
		.tabView{
			border-radius: 10px;
			margin: 0 0 60px;
			overflow: hidden;
			clip-path: polygon(00% 0%, 100% 00%,  100% 100%,5% 100%, 0 20%);
			background: #5DB6FF;
			font-weight: bold;
			display: flex;
			width: 100%;
			font-size: 18px;
			justify-content: space-between;
			align-items: center;
			height: auto;
			// 默认样式
			.tab{
				cursor: pointer;
				border-radius: 4px;
				clip-path: polygon(00% 0%, 100% 00%,  100% 100%,10% 100%, 0 20%);
				color: #333;
				background: #5DB6FF;
				line-height: 40px;
				text-align: center;
				height: 40px;
			}
			// 选中样式
			.tabActive{
				cursor: pointer;
				border-radius: 4px;
				box-shadow: 0 4px 6px rgba(0, 0, 0, .3);
				clip-path: polygon(00% 0%, 80% 00%,95% 90%,  100% 100%,10% 100%, 0 20%);
				color: #333;
				background: #fff;
				line-height: 40px;
				text-align: center;
				height: 40px;
			}
		}
		// 按钮盒子
		.btn_view {
			padding: 20px 0 0;
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			// 登录
			.login {
				border: 0;
				cursor: pointer;
				border-radius: 10px;
				padding: 0 24px;
				margin: 0 10px 10px;
				color: #fff;
				background: linear-gradient(270deg, #FB843D 0%, #9EC8EA 0%, #5DB6FF 100%);
				width: 80%;
				font-size: 18px;
				height: 40px;
			}
			// 注册
			.register {
				border: 0;
				cursor: pointer;
				border-radius: 10px;
				padding: 0 24px;
				margin: 0 10px 10px;
				outline: none;
				color: #666;
				background: #CDE9FF;
				width: 38%;
				font-size: 18px;
				height: 40px;
			}
		}
	}

</style>