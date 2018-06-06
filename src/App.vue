<template>
  <div id="app">
  <transition :name="transitionName" mode="out-in">         
		<router-view class="child-view"></router-view>
	</transition>
  
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {  
    return {  
      transitionName: 'fade'
  	}  
  },
  watch: {  
    
  }  
    
}
</script>

<style>
@import "./assets/icon-font/iconfont.css"; 
html{
  font-size:2.6666667vw !important;
  font-family:"微软雅黑";

}
*{
	margin:0px;
  padding:0px
}
.layout{
  width:90vw;
  margin:0px auto;
}
.layout{
  width:90vw;
  margin:0px auto;
}




#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100vw;
  height:100vh;
  position:relative
}


li{
	list-style-type:none
}

.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100vw;  
  height: 100vh;  
  transition: all .1s cubic-bezier(.55,0,.1,1);  
}


//登录页向下滑动
.slide-down-enter-active {
	top: 0;
}
.slide-down-enter,
.slide-down-leave-active {
	top: 1000px;
}

//回主菜单子菜单向右滑动退出
.slide-left-enter-active {
	left:-600px;
}
.slide-right-leave-active {
	left: 0px;
}
//前往子菜单子菜单想左滑动进入


.slide-left-enter-active,.slide-left-enter{
  left:0px;
}

.slide-left-leave-active {
	left:0px;
}

//其它路由组件渐隐渐现
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}


.mint-cell-swipe-button{
  line-height:9vh;
  font-size:1.4rem;
  padding:0px 4vw;

}
.vux-no-group-title{
  padding-top:0px !important
}
.mint-cell-wrapper{
  background-origin:border-box
}
</style>
