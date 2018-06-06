// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//路由引入
import router from './router'
//mock随机数据生成器
// import Mock from './mock/mock'
// Mock.bootstrap();

//vuex公共状态插件引入
// import store from './vuex'

//mint-ui
// import 'mint-ui/lib/style.css'
// import MintUI from 'mint-ui'
// Vue.use(MintUI)


// import Indicator from 'mint-ui/lib/Indicator';
import { Indicator, Swipe, SwipeItem, TabContainer, TabContainerItem, DatetimePicker, Popup, Badge, CellSwipe, Field, Switch, Radio,Checklist} from 'mint-ui';
Vue.use(Indicator, Swipe, SwipeItem, TabContainer, TabContainerItem, DatetimePicker, Popup,Badge, CellSwipe, Field, Switch, Radio,Checklist);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Popup.name, Popup);
Vue.component(Badge.name, Badge);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Field.name, Field);
Vue.component(Switch.name, Switch);
Vue.component(Radio.name, Radio);
Vue.component(Checklist.name, Checklist);
// Vue.component(Indicator.name, Indicator)

//导入全局过滤器注册
import * as filter from '@/filter'
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})


//系统配置
Vue.config.productionTip = false



Vue.filter('sexFormat', function (value) {

})
var myFilter = Vue.filter('my-filter')

//路由跳转中检验是否有登录
router.beforeEach((to, from, next) => {　　  
  	
if(to.path == '/Login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/Login') {
    next({ path: '/Login' })
  } else {
    next()
  }
})  


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
