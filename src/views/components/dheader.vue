<template>
    <div id="dheader">
      <div class='layout' style='position:relative'>
  		  <i class='icon iconfont icon-guanbi' style='float:left' @click = 'close'></i>
        <span class='title'><slot name="title" ></slot></span>
        <span style='position:absolute;right:0px;' ><slot name="icon"></slot></span>
      </div>
    </div>
</template>

<script>

export default {
  name: 'dheader',
  data () {
    return {
      
    }
  },
  methods :{
    close(){
      this.$emit('close')
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dheader{

  height:4.002rem;
  width:100vw;
  background:rgb(250,250,250);
  line-height:4.002rem;
  border:1px solid rgb(230,230,230)
}
.icon-guanbi{
  position:absolute;
  font-size:2.8rem;
  left:0px

}
.title{
  font-size:1.8rem
}
</style>



