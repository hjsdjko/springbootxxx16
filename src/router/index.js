	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import dingdanfenpei from '@/views/dingdanfenpei/list'
	import huowuchuku from '@/views/huowuchuku/list'
	import yonghu from '@/views/yonghu/list'
	import huowuleixing from '@/views/huowuleixing/list'
	import huowuxinxi from '@/views/huowuxinxi/list'
	import dingdanxinxi from '@/views/dingdanxinxi/list'
	import cangguanyuan from '@/views/cangguanyuan/list'
	import hangbanxinxi from '@/views/hangbanxinxi/list'
	import huowupeisong from '@/views/huowupeisong/list'
	import huowuruku from '@/views/huowuruku/list'
	import hangbandaoda from '@/views/hangbandaoda/list'
	import cangguanyuanRegister from '@/views/cangguanyuan/register'
	import cangguanyuanCenter from '@/views/cangguanyuan/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/cangguanyuanCenter',
			name: '仓管员个人中心',
			component: cangguanyuanCenter
		}
		,{
			path: '/news',
			name: '新闻资讯',
			component: news
		}
		,{
			path: '/dingdanfenpei',
			name: '订单分配',
			component: dingdanfenpei
		}
		,{
			path: '/huowuchuku',
			name: '货物出库',
			component: huowuchuku
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/huowuleixing',
			name: '货物类型',
			component: huowuleixing
		}
		,{
			path: '/huowuxinxi',
			name: '货物信息',
			component: huowuxinxi
		}
		,{
			path: '/dingdanxinxi',
			name: '订单信息',
			component: dingdanxinxi
		}
		,{
			path: '/cangguanyuan',
			name: '仓管员',
			component: cangguanyuan
		}
		,{
			path: '/hangbanxinxi',
			name: '航班信息',
			component: hangbanxinxi
		}
		,{
			path: '/huowupeisong',
			name: '货物配送',
			component: huowupeisong
		}
		,{
			path: '/huowuruku',
			name: '货物入库',
			component: huowuruku
		}
		,{
			path: '/hangbandaoda',
			name: '航班到达',
			component: hangbandaoda
		}
		]
	},
	{
		path: '/cangguanyuanRegister',
		name: '仓管员注册',
		component: cangguanyuanRegister
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
