<template>
    <div id="patsInfo">
    	<nheader :routechoice='router' ><p slot='title' >{{ pats.bed_desc }}床&nbsp&nbsp{{ pats.pat_name }}</p></nheader>
     <div style='margin-top:6vh'>
       <tab :line-width=2 active-color='rgb(254,110,161)' v-model="index" >
       <div class='more-tab'  @click='isFold = !isFold' slot='fold' style=' position:absolute;right:0px;height:2.8014rem;width:8vw;z-index:99;top:0.8004rem;-moz-shadow:-2px 0px 0px rgb(150,150,150);background:white;box-shadow:-2px 0px 10px rgb(150,150,150)' > <i style='font-size:2.2rem;line-height:2.8014rem;' class='icon iconfont fold-icon'  :class="isFold?'icon-less':'icon-moreunfold'"></i> </div>
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click='routerView'  :key="index">{{item}}</tab-item>
        <div class='more-tab-content' style='position:fixed;top:8.004rem;width:100vw;z-index:99;background:white' v-show='isFold' slot='list'>
      <ul>
          <li v-for="(item, index) in list2" style='float:left;width:33vw;height:3.335rem;line-height:3.335rem;font-size:1.4rem;'  @click='clickHandle(index)'>{{item}}</li>
      </ul>
       </div>
   
      </tab>
      <router-view></router-view>
    </div>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import {getPat} from '@/config'
import { Tab, TabItem} from 'vux'
const list = () => ['基本信息','执行单', '三测单', '医嘱','病历管理', '护理记录']
export default {
  name: 'patsInfo',
  data () {
    return {
      router:'gopats',
      list2: list(),
      index: 0,
      demo2: '基本信息',
      isFold: false,
      pats:{}
    }
  },
  components:{nheader,Tab,TabItem},
  methods :{
    clickHandle(index){
        this.isFold = !this.isFold;
        this.index = index;
        this.routerView(index);
    },
    routerView(index){
      if(index == 0){
         this.$router.push({path:'./PatBasicInfo'});
      }else if(index == 1){
         this.$router.push({path:'./PatWorkList'});
      }else if(index == 2){
          this.$router.push({name:'PatThreeTest', params:{ pat_id: this.pats.row_id , date:((new Date()).getFullYear()+"-"+(parseInt((new Date()).getMonth())+parseInt(1))+"-"+(new Date()).getDate())}})
          
      }else if(index == 3){
        this.$router.push({path:'./PatOrder'});
      }else if(index == 4){
        this.$router.push({path:'./PatMedicalRecord'});
      }else if(index == 5){
        this.$router.push({path:'./NurseRecordNormal'})
      }else if(index == 6){
        this.$router.push({path:'./PatFee'})
      }
    },
    getPatsInfo(){ 
      let pat = getPat();
      this.pats=pat;
      
    }
  },
  mounted () {
      this.getPatsInfo();
      
      if(this.$route.params.redirect != undefined){
        if(this.$route.params.redirect=='PatWorkList'){
            this.index = 1;
            this.$router.push({path:'./PatWorkList'});

        }else if(this.$route.params.redirect=='PatThreeTest'){
            this.index = 2;
            this.$router.push({path:'./PatThreeTest'});
        }else if(this.$route.params.redirect=='PatOrder'){
            this.index = 3;
            this.$router.push({path:'./PatOrder'});
        }else if(this.$route.params.redirect=='PatMedicalRecord'){
            this.index = 5;
            this.$router.push({path:'./PatMedicalRecord'});
        }else if(this.$route.params.redirect=='PatNurseRecord'){
            this.index = 4;
            this.$router.push({path:'./PatNurseRecord'});
        }else if(this.$route.params.redirect=='PatBasicInfo'){
            this.index = 0;
            this.$router.push({path:'./PatBasicInfo'});
        }
      }else{
        this.$router.push({path:'./PatBasicInfo'});
      } 
    
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

