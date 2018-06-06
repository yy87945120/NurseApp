<template>
    <div id="NurseRecord">
        <nheader routechoice='goback'><span slot='title'>1001床 病人</span><span slot='choice' >上一床&nbsp;&nbsp;</span><span slot='choice' >下一床</span></nheader>

        <div id="pats-list">
              <div class='pats-list-div'>
            <table class="pats-list-table">
              <tr >
                <td class='pats-list-title pats-bed'>1001床</td>
                <td class="pats-name">aa</td>
                <td class="pats-sex">1</td>
                <td class="pats-age">18</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>入院:</td>
                <td colspan='4' class="pats-list-text-align-left">2018-05-11 (第一天)</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>医生:</td>
                <td colspan='4' class="pats-list-text-align-left">bb</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>诊断:</td>
                <td colspan='4' class="pats-list-text-align-left">cc:ss</td>
              </tr>
            </table>
        </div>
         </div>
         <div class='scroll-div'>
             <group class="group" style='padding-top:0px !important'>
                     <cell class="cell" @click.native="goRecord('NurseRecordNormal')" title="护理记录单 (公共)" :is-link="true" ></cell>
                     <cell class="cell" @click.native="goRecord('NurseRecordWomen')" title="护理记录单 (妇科)" :is-link="true" ></cell>
              </group>
         </div>


         <div class='footer-div'>
            <div class='footer-item' @click='actionChoice=!actionChoice'>新建护理记录单</div>
         </div>

         <mt-popup v-model="actionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div'>护理记录单 (公共)</div>
              <div class='actionChoice-choice-div'>护理记录单 (妇科)</div>
              <div class='actionChoice-choice-div'>压疮护理记录单 (妇科)</div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Group,Cell } from 'vux';
import nheader from '@/views/components/nheader'
export default {
  name: 'NurseRecord',
  data () {
    return {
        actionChoice:false
    }
  },
  components:{nheader,Group,Cell},
  methods :{
      goRecord(type){
         this.$router.push({ name: type, params: { 'type': type }})
      }
      
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#NurseRecord{
  background:rgb(244,244,244)
}
.actionChoice-div{
  
  width:100vw;
}
.actionChoice-choice-div:first-child{
  border-bottom:1px solid rgb(230,230,230);
}
.actionChoice-choice-div:first-child{
  border-bottom:1px solid rgb(230,230,230);
}
.actionChoice-choice-div{
  height:7vh;
  width:100vw;
  line-height:7vh;
  font-size:1.6rem
}
.footer-item{
  display:inline-block;
  height:5vh;
  margin-top:1.5vh;
  line-height:5vh;
  width:90vw;
  color:white;
  background:rgb(254, 110, 161);
  font-size:1.2rem;

}

.group{
  margin-top:0px
}
.cell{
  text-align:left
}
.scroll-div{
  margin-top:1.5vh;
  height:66.5vh;
  width:100vw;
 
  overflow-y:auto;
}
.footer-div{
  border-top:1px solid rgb(230,230,230);
  height:8vh;
  width:100vw;
  display:inline-block;
  background:white
}
.pats-list-div:first-child{
    margin-top:8vh
}
.pats-list-table{
    width:90vw;
    margin:0.667rem auto 0.667rem;
    background:white;

}
.pats-list-div{
    display:inline-block;
    width:100vw;
    background:white;
    margin-top:0.667rem
}

.pats-list-text-align-left{
    text-align:left
}
.pats-list-text-align-right{
    text-align:right
}
.pat-basic-info-td{
    
}
.pats-list-title{
    width:12vw;
}
.pats-bed{
  background:rgb(128,200,114);
  width:12vw;
  color:white;
  font-weight:bold;
}
.pats-name{
  width:15vw;
  font-size:1.6rem;
  font-weight:bold;
}
.pats-sex{
  width:4vw;
}
.pats-age{
  width:10vw;
}
.font-format-class{
  font-size:1.4rem;
}

</style>



