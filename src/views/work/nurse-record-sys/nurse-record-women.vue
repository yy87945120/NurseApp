<template>
    <div id="NurseRecordEdit">
        <nheader routechoice='goback'><span slot='title'>1001床 病人</span><span slot='choice'>预览</span></nheader>
        <div class="filter" id='filter'>
        <div class='layout'>           
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==5?'今天':index+1" :class="index==5?'focus-class':''"  v-for = '(item,index) in 6' ></li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        </div>
        <div class='record-title'><div class='layout'>护理记录单(妇科)</div></div>
        <div class='record-content-scroll-div'>
        	<div></div>
        </div>
        <div class='footer-div'>
        	<div class='footer-item'><i class='icon iconfont icon-yuanshujushezhi'></i>&nbsp;数据设置</div>
        	<div class='footer-item'><i class='icon iconfont icon-heji'></i>&nbsp;出入量合计</div>
        	<div class='footer-item'><i class='icon iconfont icon-jiaguanzhuhuati'></i>&nbsp;添加记录</div>
        </div>
        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
    </div>

</template>

<script>
import nheader from '@/views/components/nheader'
import {getUser,getPat} from '@/config';
export default {
  name: 'name',
  data () {
    return {
      startDate:new Date('2018-5-01'),
      endDate:new Date('2018-5-17'),
      datePickerValue:'',
      patId:0,
      nurseId:0
    }
  },
  components:{nheader},
  methods :{
   	  openPicker() {
        this.$refs.picker.open();
      },
      getPatInfo(){
        //GetPatList
      },
      getPatId(){
        let pat = getPat();
        this.patId = pat.pat_id;
      },
      getUserId(){
        let user = getUser();
        this.nurseId = user[0].row_id;
      }
  },
  mounted () {
      //let crtTime = new Date();
    let date = this.dateFtt("yyyy-MM-dd",crtTime);this.getPatInfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#NurseRecordEdit{
	background:rgb(244,244,244)
}
.footer-div{
	height:7vh;
	width:100vw;
	background:white;
	margin-top:1vh
}
.footer-item:last-child{
	border-right:none;
}
.footer-item{
	margin-top:1.5vh;
	float:left;
	width:33vw;
	height:4vh;
	border-right:1px solid rgb(230,230,230);
	line-height:4vh;
	font-size:1.4rem
}
.record-title{
	height:4vh;
	width:100vw;
	background:rgb(244,244,244);
	line-height:4vh;
	text-align:left;
	font-size:1.2rem;
	color:blue;
	border-bottom:1vh solid white
}
.record-content-scroll-div{
	width:100vw;
	display:inline-block;
	height:70.5vh;
}
.filter{
  margin-top:6.2vh;
  padding-top:0.667rem;
  padding-bottom:0.667rem;
  width:100vw;
  background:rgb(244,244,244);
}
.filter-date-ul{
  display:inline-block
}
.filter-date-li{
  height:4.669rem;
  width:12.5vw;
  float:left;
  line-height:4.669rem;
  background:white;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200)
}
.filter-date-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
.focus-class{
    background:rgb(244,244,244)
}
</style>



