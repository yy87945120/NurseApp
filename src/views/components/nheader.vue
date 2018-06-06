<template>
    <div id="nheader" style="text-align:center">
      <div class="layout" style='position:relative'>
          <i class="icon iconfont icon-back" @click="goback"></i>
          <span class='header-title'><slot name='title'></slot></span>
          <span style='position:absolute;right:0px;'><slot name='choice'></slot></span>
    </div>
    </div>
</template>

<script>

export default {
  name: 'nheader',
  data () {
    return {
      
    }
  },
  props:["routechoice"],
  methods :{
    goback(){
      if(this.routechoice == 'gohome'){
          this.$router.push({path:'./Home'})
      }else if(this.routechoice == 'goback'){
          this.$router.back(-1)
      }else if(this.routechoice == 'gopats'){
        this.$router.push({path:'./Pats'})
      
      }
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nheader{
  position:fixed;
  top:0px;
  
  width:100vw;
  height:4.002rem;
  line-height:4.002rem;
  background:rgb(250,250,250);

  box-shadow:1px 0px 1px rgb(80,80,80);
  z-index:101;
  color:black;
  border-bottom:1px solid rgb(230,230,230)
}
.header-title{
  font-size:1.8rem;
}
.icon-back{
  position:absolute;
  font-size:2.8rem;
  left:0px
  
}
</style>


