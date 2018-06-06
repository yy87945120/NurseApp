<template>
    <div id="Home">
      <transition name='fade' mode='out-in'>
      <router-view></router-view>
      </transition>
    
        <div id="menu">
      <ul>

          <router-link :to="{path: './Work'}" tag="li" activeClass="active-class" class="singleMenu"><p><i class='icon iconfont icon-gongzuotai'></i></p><p class='icon-text'>工作台</p></router-link>
          <!--<router-link :to="{path: './Comulity'}"  tag="li">社区</router-link>-->
          <router-link :to="{path: './Scan'}" tag="li" activeClass="active-class" class="doubleMenu"><p><i class='icon iconfont icon-shouye8'></i></p><p class='icon-text'>扫码</p></router-link>
          <router-link :to="{path: './Mark'}" activeClass="active-class" tag="li"><p><i class='icon iconfont icon-shouye17'></i></p><p class='icon-text'></i></p>备忘录</router-link>
          <router-link :to="{path: './Mine'}" tag="li" activeClass="active-class"  @click="alert(1)" class="singleMenu"><p><i class='icon iconfont icon-shouye3'></i></p><p class='icon-text'>我的</p></router-link>
      </ul>
    </div>
    </div>
  

</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
        focusNav:'work'
    }
  },
  methods :{
    
  },
  mounted () {

  },
  watch :{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Home{
  position:absolute;
  height:100vh;
  width:100vw;
}
.active-class{
  color:rgb(254,110,161);
}
#menu{
  position:fixed;
  bottom:0px;
  width:100vw;
  background:rgb(247,247,247);
  box-shadow:0px -1px 1px rgb(200,200,200)
}
#menu>ul{
  
  width:100vw;
}
#menu>ul>li{
  float:left;
  height:8vh;
  width:25vw;
}
.icon{
  font-size:3rem
}
.icon-text{
  margin-top:.5vh
}
.singleMenu{
  width:40vw;
}
.doubleMenu{
  width:20vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}



</style>

