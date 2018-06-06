<template>
    <div id="PersonalThreeTest">
        <dheader @close='closeForm'><p slot='title'>{{title}}</p></dheader>
        <ptt></ptt>
    
    </div>
</template>

<script>
import dheader from '@/views/components/dheader';
import {getPat} from '@/config';
import ptt from '@/views/components/work-components/pats-three-test';
export default {
  name: 'PersonalThreeTest',
  data () {
    return {
      router:'goback',
      title:''
    }
  },
  components:{dheader,ptt},
  methods :{
      closeForm(){
        this.$router.push({name:'ThreeTest'})
      }
  },
  mounted () {
    let pat = getPat();
    let bed = pat.bed_desc;
    let name = pat.pat_name
    this.title = bed+" "+name
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


