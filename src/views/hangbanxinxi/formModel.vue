<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="公司名称" prop="gongsimingcheng">
							<el-input class="list_inp" v-model="form.gongsimingcheng" placeholder="公司名称"
								 type="text" 								:readonly="!isAdd||disabledForm.gongsimingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="航班号" prop="hangbanhao">
							<el-input class="list_inp" v-model="form.hangbanhao" placeholder="航班号"
								 type="text" 								:readonly="!isAdd||disabledForm.hangbanhao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item prop="tupian"
									  label="图片"
						>
							<uploads
								:disabled="!isAdd||disabledForm.tupian?true:false"
								action="file/upload"

								tip="请上传图片"
								:limit="3"
								style="width: 100%;text-align: left;"
								:fileUrls="form.tupian?form.tupian:''" 
								@change="tupianUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="起飞城市" prop="qifeichengshi">
							<el-input class="list_inp" v-model="form.qifeichengshi" placeholder="起飞城市"
								 type="text" 								:readonly="!isAdd||disabledForm.qifeichengshi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="抵达城市" prop="didachengshi">
							<el-input class="list_inp" v-model="form.didachengshi" placeholder="抵达城市"
								 type="text" 								:readonly="!isAdd||disabledForm.didachengshi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="起飞时间" prop="qifeishijian">
							<el-date-picker
								class="list_date"
								v-model="form.qifeishijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.qifeishijian?true:false"
								placeholder="请选择起飞时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="落地时间" prop="luodishijian">
							<el-date-picker
								class="list_date"
								v-model="form.luodishijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.luodishijian?true:false"
								placeholder="请选择落地时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="可运输货物" prop="keyunshuhuowu">
							<el-input class="list_inp" v-model="form.keyunshuhuowu" placeholder="可运输货物"
								 type="text" 								:readonly="!isAdd||disabledForm.keyunshuhuowu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="货物类型" prop="huowuleixing">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.huowuleixing?true:false"
								v-model="form.huowuleixing" 
								placeholder="请选择货物类型"
								>
								<el-option v-for="(item,index) in huowuleixingLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="每公斤/元" prop="danjia">
							<el-input class="list_inp" v-model.number="form.danjia" placeholder="每公斤/元"
								 type="number" 								:readonly="!isAdd||disabledForm.danjia?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="航班介绍" prop="hangbanjieshao">
							<editor :value="form.hangbanjieshao" placeholder="请输入航班介绍" :readonly="!isAdd||disabledForm.hangbanjieshao?true:false"
								class="list_editor" @change="(e)=>editorChange(e,'hangbanjieshao')"></editor>
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
	const tableName = 'hangbanxinxi'
	const formName = '航班信息'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		gongsimingcheng : false,
		hangbanhao : false,
		tupian : false,
		qifeichengshi : false,
		didachengshi : false,
		qifeishijian : false,
		luodishijian : false,
		hangbanjieshao : false,
		storeupnum : false,
		keyunshuhuowu : false,
		huowuleixing : false,
		danjia : false,
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
		gongsimingcheng: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		hangbanhao: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		tupian: [
		],
		qifeichengshi: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		didachengshi: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		qifeishijian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		luodishijian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		hangbanjieshao: [
		],
		storeupnum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		keyunshuhuowu: [
		],
		huowuleixing: [
		],
		danjia: [
			{ validator: validateNumber, trigger: 'blur' },
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//图片上传回调
	const tupianUploadSuccess=(e)=>{
		form.value.tupian = e
	}
	//货物类型列表
	const huowuleixingLists = ref([])
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			gongsimingcheng: '',
			hangbanhao: '',
			tupian: '',
			qifeichengshi: '',
			didachengshi: '',
			qifeishijian: '',
			luodishijian: '',
			hangbanjieshao: '',
			storeupnum: '0',
			keyunshuhuowu: '',
			huowuleixing: '',
			danjia: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.hangbanjieshao = res.data.data.hangbanjieshao?(res.data.data.hangbanjieshao.replace(reg,'../../../cl2894591/file')):'';
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
				if(x=='gongsimingcheng'){
					form.value.gongsimingcheng = row[x];
					disabledForm.value.gongsimingcheng = true;
					continue;
				}
				if(x=='hangbanhao'){
					form.value.hangbanhao = row[x];
					disabledForm.value.hangbanhao = true;
					continue;
				}
				if(x=='tupian'){
					form.value.tupian = row[x];
					disabledForm.value.tupian = true;
					continue;
				}
				if(x=='qifeichengshi'){
					form.value.qifeichengshi = row[x];
					disabledForm.value.qifeichengshi = true;
					continue;
				}
				if(x=='didachengshi'){
					form.value.didachengshi = row[x];
					disabledForm.value.didachengshi = true;
					continue;
				}
				if(x=='qifeishijian'){
					form.value.qifeishijian = row[x];
					disabledForm.value.qifeishijian = true;
					continue;
				}
				if(x=='luodishijian'){
					form.value.luodishijian = row[x];
					disabledForm.value.luodishijian = true;
					continue;
				}
				if(x=='hangbanjieshao'){
					form.value.hangbanjieshao = row[x];
					disabledForm.value.hangbanjieshao = true;
					continue;
				}
				if(x=='storeupnum'){
					form.value.storeupnum = row[x];
					disabledForm.value.storeupnum = true;
					continue;
				}
				if(x=='keyunshuhuowu'){
					form.value.keyunshuhuowu = row[x];
					disabledForm.value.keyunshuhuowu = true;
					continue;
				}
				if(x=='huowuleixing'){
					form.value.huowuleixing = row[x];
					disabledForm.value.huowuleixing = true;
					continue;
				}
				if(x=='danjia'){
					form.value.danjia = row[x];
					disabledForm.value.danjia = true;
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
			form.value.storeupnum='0'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
		})
		context?.$http({
			url: `option/huowuleixing/huowuleixing`,
			method: 'get'
		}).then(res=>{
			huowuleixingLists.value = res.data.data
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
		if(form.value.tupian!=null) {
			form.value.tupian = form.value.tupian.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
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
				// 下拉框
				.list_sel {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					padding: 0 10px;
					background: #fff;
					width: 100%;
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
				// 富文本
				.list_editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					margin: 0;
					width: 100%;
					border-color: #5FB7FF;
					border-width: 2px;
					border-style: solid;
					height: auto;
				}
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
						margin: 7px 0 0;
						color: #999;
						display: none;
						font-size: 12px;
						justify-content: flex-start;
						align-items: center;
					}
					//外部盒子
					.el-upload--picture-card {
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
					.el-upload-list__item {
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