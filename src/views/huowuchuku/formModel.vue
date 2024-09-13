<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="货物编号" prop="huowubianhao">
							<el-input class="list_inp" v-model="form.huowubianhao" placeholder="货物编号"
								 type="text" 								:readonly="!isAdd||disabledForm.huowubianhao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="货物名称" prop="huowumingcheng">
							<el-input class="list_inp" v-model="form.huowumingcheng" placeholder="货物名称"
								 type="text" 								:readonly="!isAdd||disabledForm.huowumingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="存放位置" prop="cunfangweizhi">
							<el-input class="list_inp" v-model="form.cunfangweizhi" placeholder="存放位置"
								 type="text" 								:readonly="!isAdd||disabledForm.cunfangweizhi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="货物数量" prop="huowushuliang">
							<el-input class="list_inp" v-model.number="form.huowushuliang" placeholder="货物数量"
								 type="text" 								:readonly="!isAdd||disabledForm.huowushuliang?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="货物类型" prop="huowuleixing">
							<el-input class="list_inp" v-model="form.huowuleixing" placeholder="货物类型"
								 type="text" 								:readonly="!isAdd||disabledForm.huowuleixing?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="出库时间" prop="chukushijian">
							<el-date-picker
								class="list_date"
								v-model="form.chukushijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.chukushijian?true:false"
								placeholder="请选择出库时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="仓管员账号" prop="cangguanyuanzhanghao">
							<el-input class="list_inp" v-model="form.cangguanyuanzhanghao" placeholder="仓管员账号"
								 type="text" 								:readonly="!isAdd||disabledForm.cangguanyuanzhanghao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="仓管员姓名" prop="cangguanyuanxingming">
							<el-input class="list_inp" v-model="form.cangguanyuanxingming" placeholder="仓管员姓名"
								 type="text" 								:readonly="!isAdd||disabledForm.cangguanyuanxingming?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="货物介绍" prop="huowujieshao">
							<el-input v-model="form.huowujieshao" placeholder="货物介绍" type="textarea"
							:readonly="!isAdd||disabledForm.huowujieshao?true:false"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'huowuchuku'
	const formName = '货物出库'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		huowubianhao : false,
		huowumingcheng : false,
		cunfangweizhi : false,
		huowushuliang : false,
		huowujieshao : false,
		huowuleixing : false,
		chukushijian : false,
		cangguanyuanzhanghao : false,
		cangguanyuanxingming : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		huowubianhao: [
		],
		huowumingcheng: [
		],
		cunfangweizhi: [
		],
		huowushuliang: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		huowujieshao: [
		],
		huowuleixing: [
		],
		chukushijian: [
		],
		cangguanyuanzhanghao: [
		],
		cangguanyuanxingming: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			huowubianhao: '',
			huowumingcheng: '',
			cunfangweizhi: '',
			huowushuliang: '',
			huowujieshao: '',
			huowuleixing: '',
			chukushijian: '',
			cangguanyuanzhanghao: '',
			cangguanyuanxingming: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
			form.value.chukushijian = context?.$toolUtil.getCurDateTime()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='huowubianhao'){
					form.value.huowubianhao = row[x];
					disabledForm.value.huowubianhao = true;
					continue;
				}
				if(x=='huowumingcheng'){
					form.value.huowumingcheng = row[x];
					disabledForm.value.huowumingcheng = true;
					continue;
				}
				if(x=='cunfangweizhi'){
					form.value.cunfangweizhi = row[x];
					disabledForm.value.cunfangweizhi = true;
					continue;
				}
				if(x=='huowushuliang'){
					form.value.huowushuliang = row[x];
					disabledForm.value.huowushuliang = true;
					continue;
				}
				if(x=='huowujieshao'){
					form.value.huowujieshao = row[x];
					disabledForm.value.huowujieshao = true;
					continue;
				}
				if(x=='huowuleixing'){
					form.value.huowuleixing = row[x];
					disabledForm.value.huowuleixing = true;
					continue;
				}
				if(x=='chukushijian'){
					form.value.chukushijian = row[x];
					disabledForm.value.chukushijian = true;
					continue;
				}
				if(x=='cangguanyuanzhanghao'){
					form.value.cangguanyuanzhanghao = row[x];
					disabledForm.value.cangguanyuanzhanghao = true;
					continue;
				}
				if(x=='cangguanyuanxingming'){
					form.value.cangguanyuanxingming = row[x];
					disabledForm.value.cangguanyuanxingming = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.huowushuliang = 0
			disabledForm.value.huowushuliang = false;
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
			if(json.hasOwnProperty('cangguanyuanzhanghao')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.cangguanyuanzhanghao = json.cangguanyuanzhanghao
				disabledForm.value.cangguanyuanzhanghao = true;
			}
			if(json.hasOwnProperty('cangguanyuanxingming')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.cangguanyuanxingming = json.cangguanyuanxingming
				disabledForm.value.cangguanyuanxingming = true;
			}
		})
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		if(objcross!='') {
			objcross.huowushuliang = objcross.huowushuliang - form.value.huowushuliang
			if(objcross.huowushuliang<0){
				context?.$toolUtil.message('货物数量不足','error')
				return false
			}
		}
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								//修改跨表数据
								changeCrossData(objcross)
								emit('formModelChange')
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						//修改跨表数据
						changeCrossData(objcross)
						emit('formModelChange')
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border-radius: 6px;
		padding: 30px;
		// form item
		:deep(.el-form-item) {
			margin: 0 0 20px 0;
			display: flex;
			//label
			.el-form-item__label {
			 color: #9E9E9E;
			 display: block;
			 width: 90px;
			 text-align: center;
			}
			// 内容盒子
			.el-form-item__content {
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
				//日期选择器
				.list_date {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					background: #fff;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 长文本
				.el-textarea__inner {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					padding: 12px;
					outline: none;
					color: #333;
					background: #fff;
					width: 400px;
					font-size: 14px;
					min-height: 120px;
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 10px 0 0;
			outline: none;
			color: #B8B8B8;
			background: #CDE9FF;
			width: auto;
			font-size: 14px;
			height: 40px;
		}
		.formModel_cancel:hover {
			color: #333;
			background: rgba(205, 233, 255, 0.5);
			font-size: 16px;
		}
		
		.formModel_confirm {
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
		.formModel_confirm:hover {
			background: rgba(150, 198, 238, 0.5);
			font-size: 16px;
		}
	}
</style>