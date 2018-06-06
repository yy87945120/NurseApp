<template>
    <div id="PatsThreeTest">
        <div class="filter" id='filter'>
        <div class='layout'>           
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==5?'今天':(item.split('-')[2])" :class="{'focus-class':index ==checkindex }" @click='toggle(index)' v-for = '(item,index) in dateArr' >{{(item.split("-"))[2]}}</li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        </div>

        <div id="content">
          <div v-show='totalInfo.length == 0 && detailInfo.length==0' style='font-size:1.4rem;color:rgb(150,150,150);margin-top:2vh'>无三测单记录...</div>
          <div v-for="item in totalInfo">
            <div class='content-title'>
              <div class='layout'>
                {{item.日期}}
              </div>
            </div>
            <div class="content-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>总出量</td>
                    <td class='text-align-right-td-class table-td'>{{item.总出量}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>总入量</td>
                    <td class='text-align-right-td-class table-td'>{{item.总入量}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>大便</td>
                    <td class='text-align-right-td-class table-td'>{{item.大便次数}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>尿量</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.尿量}}</td>
                  </tr>
                </table>
            </div>
          </div>

          <div v-for='item in detailInfo'>
            <div>
            <div class='content-title'>
              
                <div class='layout'>
                  {{item.测量时间点}}
                </div>
            
            </div>
            <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>{{(item.体温).substring(0,4)}}</td>
                    <td class='text-align-right-td-class table-td'>{{(item.体温).substring(4)}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>脉搏</td>
                    <td class='text-align-right-td-class table-td'>{{item.脉搏}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>呼吸</td>
                    <td class='text-align-right-td-class table-td'>{{item.呼吸}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>心率</td>
                    <td class='text-align-right-td-class table-td'>{{item.心率}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td '>血压</td>
                    <td class='text-align-right-td-class table-td '>{{item.血压}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>护理事件</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.护理事件}}</td>
                  </tr>
                </table>
            </div>
            </div>

           



          </div>
        </div>
        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
        <mt-popup style="height:100vh;width:100vw"
          v-model="popupVisible"
             position="bottom">
              <div class="close">
                <i class='icon iconfont icon-guanbi' @click='closeTable'></i> 
              </div>
            <div id="temperature-table">
              
            </div>
        </mt-popup>
        <mt-popup style="height:100vh;width:100vw;background:white"
          v-model="popupVisibleForm"
             position="right">
             
              <div class='newRecord-div'>
              <!--yy-->
              <div v-show='typeShow' style='position:absolute;width:80vw;border:1px solid rgb(230,230,230);box-shadow:5px 5px 5px rgb(40,40,40);background:white;z-index:99;margin-left:10vw;top:30%;'>
                <div @click='chooseTypeMethod(item)' v-for='item in arrType' style='height:6vh;width:80vw;line-height:6vh;font-size:1.4rem;text-align:center;border:1px solid rgb(230,230,230)'>{{item.name}}</div>
              </div>
              <div class='mask' v-show='showMask'><div @click='showMask = !showMask'><i class='icon iconfont icon-yuyin' style='font-size:5rem;line-height:100vh;color:white'></i></div></div>
            <dheader @close='closeForm' ><span slot='title'>体征录入</span><i class='icon iconfont icon-shouye2' slot='icon' style='font-size:2.4rem' @click='checkThressTest'></i></dheader>
            <div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem;' v-show='false'>
              <div class='layout'>           
                <ul class='filter-detail-ul' style='margin-top:.5rem'>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   
              </div> 
            </div> 
            <div class='main-new-record-scroll-div'>
           
            <div class='form-scroll-div-new-record'>
                <div style='position:absolute;width:100vw;background:rgb(239,239,244);height:4.6rem;' v-show='true'>
                        
                <ul class='filter-detail-ul-new' style='margin-top:.5rem;margin-left:5vw'>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   
             
            </div> 
            <div class='new-record-form'>
              <div class='group-item group-item-basic'>
                  <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td' style='text-decoration:underline'  @click='chooseTypeShow(1)'>{{tep}}:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.tempra' class='new-record-input' placeholder='请填写体温'/></td>
                      <td class='new-record-unit'>℃</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>脉搏:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.pulse' class='new-record-input' placeholder='请填写脉搏'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>心率:</td>
                      <td class='new-record-input-td'><input class='new-record-input' v-model='dataList.rate' type='text' placeholder='请填写心率'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>呼吸:</td>
                      <td class='new-record-input-td'><input type='text' v-model="dataList.breath" class='new-record-input' placeholder='填写呼吸次数'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>血压:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.blood' class='new-record-input' placeholder='填写血压'/></td>
                      <td class='new-record-unit'>mmHg</td>
                    </tr>
                  </table>
              </div>
              <div class='group-item group-item-all'>
                  <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总入量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.input' class='new-record-input' placeholder='请填写总入量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>大便:</td>
                      <td class='new-record-input-td'><input class='new-record-input' v-model='dataList.shit' type='text' placeholder='填写大便次数'/></td>
                      <td class='new-record-unit'>次</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>尿量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.urine' class='new-record-input' placeholder='请填写尿量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总出量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='dataList.output' class='new-record-input' placeholder='请填写总出量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>

                  </table>
              </div>
              <div class='group-item group-item-event'>
                   <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td' style='text-decoration:underline' @click='chooseTypeShow(2)'>护理事件:</td>
                      <td class='new-record-input-td'><input type='text' readonly class='new-record-input' v-model='nurseEvent' placeholder="选填护理事件"/></td>
                      
                    </tr>
                 
                  </table>
              </div>
           </div>
           </div>
            </div>
           <div class='footer-new'>
           
          <div class='footer-new-div' @click='submitForm'>保存

        </div>
   
        </div>
        </div>
         <div v-show="confirmVisible" style='position:fixed;border:1px solid rgb(230,230,230);background:white;height:24vh;width:85vw;top:50%;left:50%;margin-top:-12vh;margin-left:-42.5vw;border-bottom:1px solid rgb(230,230,230)'>
              <div style='height:6vh;font-size:1.6rem;font-weight:bold;line-height:6vh;border-bottom:1px solid rgb(230,230,230)'>体征数据不完整</div>
              <div style='height:12vh;font-size:1.4rem;line-height:10vh;color:rgb(150,150,150)'>请和对数据是否完整，无误后请确认</div>
              <div style='border-top:1px solid rgb(230,230,230)'>
                  <div style='float:left;width:42vw;height:6vh;line-height:6vh;font-size:1.4rem' @click='cancel'>取消</div>
                  <div style='float:left;width:42vw;border-left:1px solid rgb(230,230,230);height:6vh;line-height:6vh;font-size:1.4rem' @click='correct'>确认</div>
              </div>
            </div>
        </mt-popup>
        <div id='controller'>
          <div class='controller-btn' @click="toggleRightPopup">体温单</div>
          <div class='controller-btn' @click="createForm">新建</div>
        </div>
        

       <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>
        
    </div>
   
</template>

<script>
import { Picker} from 'vux';
import dheader from '@/views/components/dheader'
import {getUser,getPat} from '@/config'
import {Indicator} from 'mint-ui'

let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/line')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require("echarts/lib/component/legendScroll");
export default {

  name: 'PatsThreeTest',
  data () {
    return {
      totalInfo:[],
      tempDate:[],
      maiboList:[],
      tiwen:[],
      detailInfo:[],
      startDate:new Date('2018-4-23'),
      endDate:new Date([(new Date()).getFullYear()+"-"+(parseInt((new Date()).getMonth())+parseInt(1))+"-"+(new Date()).getDate()]),
      datePickerValue:'',
      popupVisible:false,
      popupVisibleForm:false,
      popupVisibleNewRecord:false,
      nurseEvent:'',
      typeShow:false,
      arrType:[],
      dataList:{
        "tempra":"",
        "blood":"",
        "rate":"",
        "breath":"",
        "pulse":"",
        "urine":"",
        "shit":"",
        "input":"",
        "output":""
      },
      type:0,
      tempertureType:[
          {
              "name":"腋下体温",
              "value":0
          },
          {
              "name":"口腔体温",
              "value":1
          },
          {
              "name":"直肠体温",
              "value":2
          }
      ],
      nurseEventType:[
        {
          "name":"手术",
          "value":1
        },
        {
          "name":"死亡",
          "value":2
        },
        {
          "name":"出院",
          "value":3
        }
      ],
      confirmVisible:false,
      filter:{
          date:0,
          ward:'普外科护理一单元',
          date:'2018-03-11'
        },
      filterNewRecord:{
          date:0,
          ward:"",
          time:"08:00:00"
      },
      showMask:false,
      checkindex:5,
      detailValue:[],
      detailValueNewRecord:[],
      detailArr:[
          ["普外科护理一单元","普外科护理二单元"],
          ["2018-03-11","2018-03-12"]
      ],
      detailArrNewRecord:[
          [],
          ["04:00:00","08:00:00","12:00:00","16:00:00","20:00:00","00:00:00"]
      ],
      dateArr:[],
      tep:'',
      nurseEventId:0,
      tepId:0
    }
  },
  components:{dheader,Picker},
  methods :{
      dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
},
      toggle (index) {
        this.checkindex = index;
        //yzf
        this.getAllThree(this.dateArr[index]);
      },
      pickDetailNewRecord(){
          this.popupVisibleNewRecord = true
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },
      chooseTypeMethod(item){
        if(this.type==1){
          this.tep = item.name;
          this.tepId = item.value
          this.typeShow = false;
        }else{
          this.nurseEvent = item.name;
          this.nurseEventId = item.value
          this.typeShow = false;
        }
      },
      chooseTypeShow(type){
        if(type == 1){
          this.typeShow = true;
          this.arrType=this.tempertureType;
          this.type=1
        }else{
          this.typeShow = true;
          this.arrType=this.nurseEventType;
          this.type=2
        }
      },
      checkThressTest(){
          let state = true;
          let _this = this;
          for(var i in this.dataList){

            if(this.dataList[i] == "" && i <= 4){
              state = false;
              break;
            }
            }
          if(!state){
            this.confirmVisible= true;
          }else{
            _this.submitForm();
          }

      },

       clean(){
          for(var i in this.dataList){
              this.dataList[i] = "";
          }
      },
      cancel(){
          this.confirmVisible= false;

      },

      correct(){
          this.submitForm();
          this.confirmVisible= false;
      },
      handleDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false;

          this.filterNewRecord.ward = this.detailValueNewRecord[0];
          this.filterNewRecord.time = this.detailValueNewRecord[1];
          
      },
      pickDetail(){
        this.popupVisible = true
      },
      //添加三测单
      submitForm(){
        let _this=this;
        
        //关键信息
        let pat = getPat();
        let user = getUser();
        let patientId = pat.pat_id;
        let patientNo = pat.patient_no;
        let nurse_id = user[0].row_id;
        let time = this.filterNewRecord.ward+" "+this.filterNewRecord.time;
        let tepType = this.tepId;
        let eventid = this.nurseEventId;
        //小时数据
        let tempra= this.dataList.tempra;
        let blood = this.dataList.blood;
        let rate = this.dataList.rate;
        let breath = this.dataList.breath;
        let pulse = this.dataList.pulse;

        //日数据
        let urine = this.dataList.urine;
        let shit = this.dataList.shit;
        let input = this.dataList.input;
        let output = this.dataList.output;

        //参数设置
        let params = {
            'patid':patientId,
            'nurseid':nurse_id,
            'time':time,
            'inhosno':patientNo,
            'temtype':tepType,
            'event':eventid,
            'tempra':tempra,
            'blood':blood,
            'rate':rate,
            'breath':breath,
            'pulse':pulse,
            'urine':urine,
            'shit':shit,
            'input':input,
            'output':output
        }

        $.ajax({
          data:params,
          type:"post",
          timeout:'10000',
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/AddOneThree",
          datatype:"json",
          
          success:function(json){

             _this.getAllThree(_this.dateArr[_this.checkindex]);
             _this.popupVisibleForm=false;
            alert("录入成功");
           _this.clean()
            
          },
          complete(XMLHttpRequest,statusText){

            if(XMLHttpRequest.status==500){  
              
              alert("此患者日数据或者小数数据已经存在请仔细核查再填写");
             
            }
          },
          error:function(){

          }

          })
      },
      closeTable(){
          this.popupVisible = false
          //if (!window.plus) return;
          //plus.screen.lockOrientation("portrait-primary");
      },
      createForm(){
          this.popupVisibleForm = true;
      },
      closeForm(){
          this.popupVisibleForm = false;
      },
      openPicker() {
        this.$refs.picker.open();
      },
      today(date){
        let chooseDate = new Date(date);
        
        let nowDate = new Date(chooseDate.getFullYear()+"-"+(parseInt(chooseDate.getMonth())+parseInt(1))+"-"+chooseDate.getDate());
        
     
        let endDateTimeStamp = new Date(nowDate.getTime()-5*24*3600*1000);
        let startDate= nowDate.getFullYear()+"-"+(parseInt(nowDate.getMonth())+1)+"-"+nowDate.getDate()
        let endDate = endDateTimeStamp.getFullYear()+"-"+(parseInt(endDateTimeStamp.getMonth())+1)+"-"+endDateTimeStamp.getDate();
        console.log(startDate,endDate)
        this.getDateMethod(startDate,endDate)
      },

      startDates(){
        let chooseDate = this.datePickerValue

        let nowDate = new Date(chooseDate.getFullYear()+"-"+(parseInt(chooseDate.getMonth())+parseInt(1))+"-"+chooseDate.getDate());
        
     
        let endDateTimeStamp = new Date(nowDate.getTime()-5*24*3600*1000);
        let startDate= nowDate.getFullYear()+"-"+(parseInt(nowDate.getMonth())+1)+"-"+nowDate.getDate()
        let endDate = endDateTimeStamp.getFullYear()+"-"+(parseInt(endDateTimeStamp.getMonth())+1)+"-"+endDateTimeStamp.getDate();
        console.log(startDate,endDate)
        this.getDateMethod(startDate,endDate)
       
      },
      getDateChange(datestr){  
        var temp = datestr.split("-");  
        var date = new Date(temp[0],temp[1]-1,temp[2]);  
          
        return date;  
      },
      getDateMethod(sta,end){
        var date_all=[],i=0;  

        var startTime = this.getDateChange(end);  
        var endTime = this.getDateChange(sta);  
        while((endTime.getTime()-startTime.getTime())>=0){  
        var year = startTime.getFullYear();  
        var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();  
        var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();  
        date_all[i]=year+"-"+month+"-"+day;  
        startTime.setDate(startTime.getDate()+1);  
        i+=1;  
} 
    this.dateArr = date_all;
   
      },
      toggleRightPopup(){
      //yzf
      this.popupVisible = true;
      this.clearechart();
        //chart.removeAttribute("_echarts_instance_")
        let _this = this;
        let pat = getPat();
        let patientid = pat.pat_id;
        
        
        //if (!window.plus) return;
        
          //plus.screen.lockOrientation("landscape-primary");

        let parmas = {
          'patid':patientid,
          'date':_this.dateArr[_this.checkindex]
        };
        
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetThreeDraw",
        datatype:"json",

        success:function(json){
            let data = JSON.parse(json);
            console.log(data.message);
            if(data.code == 200){
                 _this.maiboList = [];
                 _this.dateFormat = [];
                 _this.tempDate=[];
                let res = data.message;
                res.forEach(function(item){
                    let dateFormat = item.measure_time.substring(5,13);
                    _this.tempDate.push(dateFormat);
                    if(item.sphygmus == ''){
                        item.sphygmus = 85
                    }
                    _this.maiboList.push(item.sphygmus);
                    if(item.temperature < 35){
                        item.temperatur = 36.5
                    }
                    _this.tiwen.push(item.temperature);

                });
                 _this.drawLine();

                 
                
            }else{
                alert(data.message);
            }
       

            
        },
        error:function(e){
          console.log(e)
        }
      })

          
         
          
      
      },
      clearechart(){
      let myChart = echarts.init(document.getElementById('temperature-table'))
      

          var option={};

          myChart.setOption(option);

          myChart.dispose();

          },
      drawLine() {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例

      let myChart = echarts.init(document.getElementById('temperature-table'))
      // 绘制图表
      myChart.setOption({
        title: { 
            left:'center',
            text: '体温单' 
        },
       
        xAxis: {
          axisTick:{
              alignWithLabel:true
          },
          axisLabel: {  
              interval:0,  
              rotate:-20  
          }  ,
          boundaryGap: false,
          data: _this.tempDate,
          
          splitLine:{  
            show:true,
            lineStyle:{
            color:'#00ff00',
            width: 2,
            alignWithLabel:true

            }
           }     
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                handleSize: 20,//滑动条的 左右2个滑动条的大小
                height: 8,//组件高度
                left: 40, //左边的距离
                right: 50,//右边的距离
                bottom: 20,//右边的距离
                handleColor: '#ddd',//h滑动图标的颜色
                handleStyle: {
                    borderColor: "#cacaca",
                    borderWidth: "1",
                    shadowBlur: 2,
                    background: "#ddd",
                    shadowColor: "#ddd",
                },
                fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                    //给第一个设置0，第四个设置1，就是垂直渐变
                    offset: 0,
                    color: '#1eb5e5'
                }, {
                    offset: 1,
                    color: '#5ccbb1'
                }]),
                backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
                filterMode: 'filter',
            },
            //下面这个属性是里面拖到
            {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 1,
                end: 100
            }
        ],
        grid:{
                show:true
        },
        legend: {
          data:['体温','脉搏'],
          right:100,
          top:8
        },
        yAxis: [{
            splitNumber: 35.0,
            name: '体温 ℃',
            type:'value',
            max:42.0,
            min:35,
            axisLabel : {
            formatter :  function (value, index) {
                  
              }
            },
            minInterval : 0.2 ,
            
            
            
        },
        {
            splitNumber: 44,
            name: '脉搏 次/分',
            type:'value',
            max:180,

            min:40,
            minInterval : 20 ,
            
        }],
        series: [{
          name: '体温',
          type: 'line',
          data: _this.tiwen,
          yAxisIndex:0, 
          boundaryGap: false,
          itemStyle : { normal: {label : {show: true}}}
        },
        {
          name: '脉搏',
          type: 'line',
          data: _this.maiboList,
          yAxisIndex:1,
          boundaryGap: false,
          itemStyle : { normal: {label : {show: true}}}
        }]
      })
    },
    //显示三测单
    getAllThree(date){
        Indicator.open("加载中...");
        let _this = this;
        let pat = getPat();
        let patientid = pat.pat_id;
        let params = {
          'patientid':patientid,
          'date':date
        };

        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetAllThree",
          datatype:"json",
          success:function(json){
              let data = JSON.parse(json)
              _this.totalInfo = data.total;
              _this.detailInfo = data.detailInfo;
            
              Indicator.close();
          },
          error:function(){

          }
        })
       
    }
  },
  mounted () {
    this.today(this.$route.params.date);
    this.getAllThree(this.dateArr[5]);
    this.tep = this.tempertureType[0].name;
    let crtTime = new Date();
    let date = this.dateFtt("yyyy-MM-dd",crtTime);
    this.filterNewRecord.ward = date;
    this.detailArrNewRecord[0].push(date);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
  height:200px
}
.filter{
  position:fixed;
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
#content{
  display:inline-block;
  width:100vw;
  margin-top:9.9vh;
  height:70vh;
  overflow-y:auto;
}
#temperature-table{
  position:absolute;
  //left:-14.274rem;
  //top:14.674rem;
  //height:37.5rem;
  //width:66.7rem;
  height:100vh;
  width:100vw;
  overflow-y:auto;
  background:white;
  
  //transform:rotate(90deg);
  //-ms-transform:rotate(90deg);   /* IE 9 */
  //-moz-transform:rotate(90deg);  /* Firefox */
  //-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  //-o-transform:rotate(90deg);
}
.icon-guanbi{
  font-size:2.6rem;

}
#scrollDiv{
  overflow:hidden;
  //height:37.5rem;
  //width:66.7rem;
 height:100vh;
  width:100vw;
}
#table-content{
  //height:37.5rem;
  //width:66.7rem;
  height:100vh;
  width:100vw;
}
.close{
  position:fixed;
  left:0rem;
  z-index:99
}
#controller{
  position:fixed;
  bottom:0px;
  height:7vh;
  width:100vw;
  background:white;
  border-top:1px solid rgb(220,220,220)
}
.controller-btn{
  display:inline-block;
  width:45vw;
  height:5vh;
  line-height:5vh;
  background:rgb(254, 110, 161);
  font-size:1.4rem;
  color:white;
  margin-top:1vh

}
.content-table{
  width:95vw;
  margin-left:5vw;
}
.table-td{
  font-size:1.3rem;
  height:3.5vh;
  border-bottom:1px solid rgb(230,230,230)
}

.border-bottom-none{
  border-bottom:none
}
.content-title{
  border-top:1px solid rgb(220,220,220);
  text-align:left;
  border-bottom:1px solid rgb(220,220,220);
  font-size:1.2rem;
  background:rgb(242,242,242);
  height:3.5vh;
  line-height:4.3vh
}

.text-align-left-td-class{
  text-align:left;
}
.text-align-right-td-class{
  text-align:right;
  padding-right:5vw
}
.content-detail-main{
  border-bottom:1px solid rgb(230,230,230)
}






.pat-onfocus{
  background:rgb(239, 239, 244)
}

.new-record-table{
  display:inline-block
}
.new-record-tr{
  height:3.0015rem;
}
.new-record-form{
  margin-top:4.669rem;
  height:52.693rem;
  width:100vw;
  overflow-y:auto
}
.new-record-unit{
  font-size:1.4rem;
  text-align:left
}
.group-item:first-child{
  margin-top:0vh
}
.group-item{
  display:inline-block;
  width:100vw;
  background:white;
  
  margin-top:2vh
}
.group-item-basic{
  height:16.675rem
}
.group-item-all{
  height:20.677rem
}
.group-item-event{
  height:20.677rem
}


.filter-detail-ul{
  margin-top:0.3335rem;
}

.filter-detail-li{
  float:left;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  width:44.5vw
}
.filter-detail-ul-new{
  margin-top:0.3335rem;
}

.filter-detail-li-new{
  float:left;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  width:45vw
}
.filter-detail-li-new:last-child{
    border-right:1px solid rgb(200,200,200)
}
.detailPicker{
  width:100vw
}
.detail-picker-btn{
  float:left;
  height:40px;
  font-size:1.6rem;
  line-height:40px;
  color:#26a2ff;
  width:50vw;
  border-bottom:2px solid rgb(244,244,244)
}

.footer-new{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
}


.footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:90vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}
.new-footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:90vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}

#pats-list{
  width:100vw;
  background:rgb(244,244,244)
}
.pats-list-div:first-child{
  margin-top:0vh
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
.new-record-title-td{
  font-size:1.4rem;
  text-align:right;
  width:20vw
}
.new-record-input-td{
  
}
.new-record-input{
  border:none;
  border-bottom:1px solid rgb(230,230,230);
  width:25vw;
  text-align:center
}


.scroll-div{
  width:100vw;
  height:45.7572rem;
  overflow-y:auto
}
.newRecord-div{
  height:100vh;
  width:100vw;
  background:white
}
.main-new-record-scroll-div{
  height:86vh;
  width:100vw;

}
.bed-scroll-div-new-record{
  
  display:inline-block;
  height:86vh;
  width:23vw;
  overflow-y:auto;
  float:left;
  border-right:1px solid rgb(230,230,230);
}
.form-scroll-div-new-record{
  position:relative;
  height:86vh;
  display:inline-block;
  width:100vw;
  overflow-y:auto;
  float:left;
  background:rgb(239, 239, 244)
}

.mask{
  position:absolute;
  z-index:101;
  width:100vw;
  height:66.7rem;

  top:0px;
  background:#000;
  opacity:0.7;
}
.form-ul-li-item{
  display:inline-block;
  padding-top:.5vh;
  padding-bottom:.5vh;

}

</style>




