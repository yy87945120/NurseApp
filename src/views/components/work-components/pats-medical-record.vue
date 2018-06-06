<template>
    <div id="PatsMedicalRecord">
        <div class='medical-chart-scroll-div'>
          <div v-show='medicalChartInfo.length == 0' style='font-size:1.4rem;color:rgb(150,150,150);margin-top:2vh'>无患者病历...</div>
          <div class='medical-chart-div' @click='MedicalChartdetail(item)' v-for='item in medicalChartInfo'>
            <div class='medical-chart-sign'>经治医生已签</div>
            <div class='medical-chart-type'>{{item.type_desc}}</div>
            <div class='medical-chart-datetime'>2018-05-17 02:05:00</div>
          </div>
        </div>
        <mt-popup v-model="MedicalChartDetailVisible" position="right">
            <div class='medical-chart-detail-div'>
              <dheader @close='MedicalChartDetailClose'><span slot='title'>{{typeDesc}}</span></dheader>
              <div class='medical-chart-detail-scroll-div'><img :src='chartpath' class="medical-chart-detail"/></div>
              
            </div>
        </mt-popup>
    </div>
</template>

<script>
import dheader from '@/views/components/dheader'
import { Indicator } from 'mint-ui'
import { getPat } from '@/config'
export default {
  name: 'name',
  data () {
    return {
        medicalChartInfo:[],
        MedicalChartDetailVisible:false,
        typeDesc:'',
        chartpath:''
    }
  },
  components:{dheader},
  methods :{
    getMedicalChart(){
      let _this = this;
      let patInfo = getPat();
      let pat_id = patInfo.pat_id;
      Indicator.open("加载中");
      let params = {
          "pat_id":pat_id
      }
      $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetChartInfo",
        datatype:"json",
        success:function(data){        
          _this.medicalChartInfo=JSON.parse(data);
          Indicator.close();
        },
        error:function(e){
          console.log(e)
        }
        })

    },
    MedicalChartdetail(item){
        this.chartpath = item.chartpath;
        this.typeDesc = item.type_desc;
        this.MedicalChartDetailVisible = true; 
    },
    MedicalChartDetailClose(){
        this.MedicalChartDetailVisible = false;
        this.chartpath='';
    }
  },
  mounted () {
    this.getMedicalChart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#PatsMedicalRecord{
  background:rgb(245,245,245)
}
.medical-chart-detail-div{
  height:100vh;
  width:100vw;
}
.medical-chart-detail{
  width:100vw;
}
.medical-chart-detail-scroll-div{
  width:100vw;
  height:93vh;
  overflow:auto;
}
.medical-chart-scroll-div{
  height:87vh;
  width:100vw;
  overflow-y:auto
}
.medical-chart-div:first-child{
  margin-top:0vh;
}
.medical-chart-div{
  position:relative;
  padding-top:3vh;
  padding-bottom:2vh;
  padding-left:5vw;
  width:100vw;
  text-align:left;
  background:white;
  margin-top:2vh;
  box-sizing:border-box
}
.medical-chart-sign{
  position:absolute;
  right:0px;
  top:0px;
  height:3vh;
  line-height:3vh;
  width:30vw;
  background:rgb(89,195,237);
  color:rgb(248,248,248);
  font-size:1.4rem;
  text-align:center
}
.medical-chart-type{
  font-size:1.4rem;
  height:4vh;
  line-height:4vh
}
.medical-chart-datetime{
  font-size:1.4rem;
  color:rgb(150,150,150)
}
</style>


