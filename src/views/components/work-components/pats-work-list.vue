<template>
    <div id="PatsWorkList">
        
        <div class="filter" id='filter'>
        <div class='layout'>      	   
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==3?'今天':(item.split('-')[2])" :class="{'focus-class':index ==checkindex }"  v-for = '(item,index) in dateArr' @click='toggle(item,index)'></li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>类型:({{filter.type}})</li>
              <li class='filter-detail-li' @click='pickDetail'>项目:({{filter.project}})</li>
              <li class='filter-detail-li' @click='pickDetail'>状态:({{filter.state}})</li>
            </ul>   
        </div>  

        </div>
    	  <div style="height:87.5vh;width:100vw;overflow:auto;background:rgb(244,244,244)">
          <div v-show="workList.length==0" style='font-size:1.4rem;color:rgb(150,150,150);margin-top:16vh;height:2vh;line-height:2vh;width:100vw;'>{{errorMsg}}</div>
          <div class='work-list-div' :style="index==0?'margin-top:16vh':''" @click='showActionChoice(item)' v-for='(item,index) in workList'>
            <div class='work-list-main-content' style="display:inline-block">
           <div class='work-list-title'> <div class="layout"><div class='title-float-left-text'><i :class="item.执行单类别=='输液'?'icon-shuye':item.执行单类别=='注射'?'icon-yiliaoqixie':item.执行单类别=='口服'?'icon-shouye4':item.执行单类别=='采血'?'icon-caixieshouyang':''" class='icon iconfont icon-font-style icon-font-active'></i>{{item.计划执行时间}}</div>&nbsp;&nbsp;<div class='title-float-left-text' style='margin-left:5px'><i v-show="item.执行状态=='执行中'" class='icon iconfont icon-shouye9 icon-font-style'></i>&nbsp;<span v-show="item.执行状态=='执行中'">{{item.滴速}}滴/{{item.滴速单位}}</span></div><div class='title-float-right-done-text'><i class='icon iconfont icon-zhuyuanhushizhan icon-font-style'></i>&nbsp;{{item.执行护士}} {{item.执行时间}}</div></div></div>
            <div class='work-list-content'>
              
              <div class="layout">
                 <table style='width:90vw'>
                      <tr class='order-main-tr'>
                        <td class="order-td-text-style">{{item.项目名称}}</td>
                        <td class='dosage-td-text-style'>{{item.剂量}}&nbsp;{{item.规格}}</td>
                      </tr>
                      
                 </table>
                  <table style='width:90vw'>
                      <tr>
                        <td  class='order-detail-td-text-style'>
                          <!--<i class='icon iconfont icon-linshi' style='font-size:3rem;
                          position:relative;top:0.5rem;color:rgb(255,142,166)'></i>-->{{item.医嘱性质}}&nbsp;{{item.频次}}&nbsp;|&nbsp;{{item.用法}}&nbsp;|&nbsp;40ml/h
                        </td>
                        <td  class='order-detail-td-text-style' style='text-align:right'>
                          <i :class="item.执行状态=='已执行'?'icon-zhixingchenggong':item.执行状态=='停止'?'icon-dengdaizhihang':item.执行状态=='未执行'?'icon-gantanhao-':item.执行状态=='执行中'?'icon-zhihangzhong':''" class='icon iconfont'></i>{{item.执行状态}}
                        </td>
                      </tr>
               
                   </table>
       

              </div>
            </div>



          </div>
 
             
        </div>
             
        </div>
        
        <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" :startDate='startDate' :endDate='endDate' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
        </mt-popup>
        <mt-popup v-model="actionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' v-show='stateVisible.stopWorkListVisible' >执行单已经停止</div>
              <div class='actionChoice-choice-div' v-show='stateVisible.infusionVisible' @click='showInfusionOperation'>输液操作</div>
              <div class='actionChoice-choice-div' v-show='stateVisible.stopVisible' @click='StopMethod'>停止执行</div>
              <div class='actionChoice-choice-div' v-show='stateVisible.returnVisible' @click='ReturnMethod'>撤销执行</div>
              <div class='actionChoice-choice-div' v-show='stateVisible.executeVisible' @click='ExecuteMethod'>执行</div>
              <div class='actionChoice-choice-div' @click='showOrderDetail'>查看医嘱详情</div>
            </div>
        </mt-popup>

         <mt-popup
          v-model="showExecute"
          position="bottom">
            <div class='ExecuteForm'>
              <div class='layout'>
                <div class='execute-btn execute-btn-left' >请录入输液的滴速</div><div class='execute-btn execute-btn-right' @click="showExecute = !showExecute">取消</div>
              </div>
              <div class='layout'>
              <table>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>滴速</td>
                <td>
                  <div class='speedSelected selectControl' @click='speed--'>-</div>
                  <div class='speedSelected selectContent'><input class='selectContent-input' type='text' style="text-align:center" v-model='speed'/></div>
                  <div class='speedSelected selectControl' @click='speed++'>+</div>
                </td>
              </tr>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>单位</td>
                <td>
                  <div v-for='(item,index) in unit' :class="{'unit-focus':index == checkindex2 }" @click='toggle2(item,index)'  class='unit '>{{item}}</div>
                  
                </td>
              </tr>
            </table>
              </div>
            <div class='popup-execute-div'>
                <div></div>
                <div class='popup-execute-btn' @click='beginInfusion'>
                    开始输液
                </div>
            </div>
            </div>
            
            
        </mt-popup>

       <mt-popup v-model="OrderDetailVisible" position="right">
            <div class='orderDetail-div' v-for = "item in orderInfoList">
              
             <div class="close">
                <div class='layout'>
                  <i class='icon iconfont icon-guanbi' @click='closeOrderDetail'></i>
                  医嘱详情
                </div>      
              </div>
              <div class='content-main-div'>
              <div class="content-detail-title">
                
                  <div class='orderType'>
                    {{item.医嘱性质}}
                  </div>
                <div class='layout'>  
                  <div class='content-detail-order-name'>
                    {{item.项目名称}}
                  </div>
              </div>
              </div> 
                <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>医嘱序号</td>
                    <td class='text-align-right-td-class table-td'>{{item.医嘱序号}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>当前状态</td>
                    <td class='text-align-right-td-class table-td'>{{item.医嘱状态}}</td>
                  </tr>
               
                  <tr>
                    <td class='text-align-left-td-class table-td'>途径</td>
                    <td class='text-align-right-td-class table-td'>{{item.用法}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>频次</td>
                    <td class='text-align-right-td-class table-td'>{{item.频次}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>执行时间</td>
                    <td class='text-align-right-td-class table-td'>{{item.执行时间}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>医生说明</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.说明}}</td>
                  </tr>
              
                </table>
            </div>  
            <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>开始时间</td>
                    <td class='text-align-right-td-class table-td'>{{item.开始时间}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>开始医生</td>
                    <td class='text-align-right-td-class table-td'>{{item.开始医生}}</td>
                  </tr>
               
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>审核护士</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.审核护士}}</td>
                  </tr>
              
              
                </table>
            </div>  

            <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>停止时间</td>
                    <td class='text-align-right-td-class table-td'>2018-03-30 15:17:00.0</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>停止医生</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>姚展锋</td>
                  </tr>             
                </table>
            </div>
              </div>
            </div>
        </mt-popup>



    <div id="footer-scan" style='position:fixed;bottom:0px' >

            <div class='footer-control-operation-div' v-show='infusionOperationShow'>
            <div class='footer-control-operation-item' @click='closeInfusionOperation'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-guanbi operation-icon'></i></div><div class='footer-control-operation-item-word'>关闭</div></div>

            <div class='footer-control-operation-item' @click='check'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-yanjing operation-icon'></i></div><div class='footer-control-operation-item-word'>添加备注</div></div>
            <div class='footer-control-operation-item' @click='GoOn()'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-guanlianfujian operation-icon'></i></div><div class='footer-control-operation-item-word'>接瓶</div></div>
            <div class='footer-control-operation-item' @click='stop'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-zanting1 operation-icon'></i></div><div class='footer-control-operation-item-word' @click='StopMethod'>暂停</div></div>
            <div class='footer-control-operation-item footer-control-operation-item-stop' @click='finish'>结束</div>
        </div>
        <div class='footer-execute-div' @click="execute" v-if='false'>
          执行
        </div>
      </div>
     </div>
</template>

<script>
import { Picker } from 'vux';
import { Indicator,MessageBox } from 'mint-ui';
import {getPat,getUser} from "@/config";
export default {
  name: 'PatsWorkList',
  data () {
    return {
        unit:["小时","分钟","秒"],
        checkindex:3,
        speed:40,
        checkindex2:1,
        workList:[],
        filter:{
          date:0,
          project:'全部',
          type:'全部',
          state:'全部'
        },
        oldOrderId:0,
        orderId:0,
        orderType:0,
        infusionOperationShow:false,
        detailValue:[],
        detailArr:[
            ["全部","长期医嘱","临时医嘱"],
            ["全部","输液","注射","口服","采血"],
            ["全部","未执行","执行中","已执行","停止"]
        ],
      	startDate:new Date(),
        endDate:new Date(), 
        datePickerValue:'',
        popupVisible:false,
        errorMsg:'',
        showInfusionExecute:false,
        stateVisible:{
          stopVisible:false,
          returnVisible:false,
          executeVisible:false,
          stopWorkListVisible:false,
          infusionVisible:false
        },
        actionChoice:false,
        showExecute:false,
        OrderDetailVisible:false,
        dateArr:[],
        workListId:0,
        RealorderId:0,
        orderInfoList:[],
        infusitonList:[],
        infusionType:0,
        ActionTime:'',
        getBeginDate:''
    }
  },
  components:{Picker},
  methods :{
  //yzf1

      beginInfusion(){
      let _this = this;
        console.log(this.infusionType);
      if(this.infusionType != 1){
         _this.showExecute = false;
         
     MessageBox({
        $type:'confirm',
        title:'确实执行提示',
        message:'是否执行',
        showCancelButton:true
    }).then(({ value, action }) => {
       Indicator.open('确认中..');
       console.log(1);
       //yzf 
      //参数配置
          //病人id 
          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType

          let parmas = {
            "exenum":exenum,
            "patientid":patientid,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id,
            "projecttype":projecttype,
          };
          

      $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecute",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }
            },
        error:function(e){
          console.log(e)
        }
      })
      }).catch((e)=>{

      })
      }else{
 _this.showExecute = false;
         
     MessageBox({
        $type:'confirm',
        title:'确实执行提示',
        message:'是否执行',
        showCancelButton:true
    }).then(({ value, action }) => {
       Indicator.open('确认中..');
      
       //yzf 

      //参数配置
          let date = _this.dateArr[_this.checkindex]

          //病人id 
          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = _this.unit[this.checkindex2];
          //滴速
          let speed = _this.speed;
          //执行单id
          let newexenum = _this.orderId;
          //执行单类别
          let projecttype = _this.orderType
          //旧执行单号
          let oldexenum = _this.oldOrderId;

     
     
         // let overtime = datetime

          let parmas = {
            "newexenum":newexenum,
            "oldexenum":oldexenum,
            "patientid":patientid,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id
          };
          

          
      $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetNext",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                _this.infusionType = 0;
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){

                alert(data.message);
                Indicator.close();
                return ;
            }
            },
        error:function(e){
          console.log(e)
        }
      })
      }).catch((e)=>{

      })
      }
 
   
      },
       toggle(item,index) {
        this.checkindex = index;
        this.getWorkList(item);
      },
      toggle2(item,index){
        this.checkindex2 = index;
        
      },
   
      today(date){
        let chooseDate = new Date(date);
        
        let nowDate = new Date(chooseDate.getFullYear()+"-"+(parseInt(chooseDate.getMonth())+parseInt(1))+"-"+chooseDate.getDate());
        
     
        let endDateTimeStamp = new Date(nowDate.getTime()-3*24*3600*1000);
        let startDate= nowDate.getFullYear()+"-"+(parseInt(nowDate.getMonth())+1)+"-"+(parseInt(nowDate.getDate())+2)
        let endDate = endDateTimeStamp.getFullYear()+"-"+(parseInt(endDateTimeStamp.getMonth())+1)+"-"+endDateTimeStamp.getDate();
        console.log(startDate,endDate)
        this.getDateMethod(startDate,endDate)
      },
      showOrderDetail(){
          let _this = this;
         let orderId =  this.RealorderId;
         let parmas = {
            "itemid":orderId
         };
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOrderDetail",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            _this.orderInfoList = data;


            
        },
        error:function(e){
          console.log(e)
        }
      })
          this.OrderDetailVisible=true;

      },
      closeOrderDetail(){
          this.OrderDetailVisible = false;
          this.actionChoice = false;
      },
      closeInfusionOperation(){
        this.infusionOperationShow =false;
      },
      showInfusionOperation(){
          this.infusionOperationShow =true;
          this.actionChoice = false;
      },
      showActionChoice(item){
        this.infusionOperationShow =false;
        this.orderId=item.执行单id;
        this.RealorderId=item.医嘱id;
        console.log(this.orderId);
        this.orderType=item.执行单类别;
        if(item.执行时间 != null){
          this.ActionTime = item.执行时间
        }
       

        for (var Key in this.stateVisible){
            this.stateVisible[Key] = false;     
         }

          
          if(item.执行状态  == '已执行'){
            
          }
          if(item.执行状态  =='停止'){
            this.stateVisible.stopWorkListVisible = true;
          }
          if(item.执行状态  =='未执行'){
            this.stateVisible.executeVisible = true;
            this.stateVisible.stopVisible = true;
          }
          if(item.执行状态  =='执行中'){
            this.stateVisible.infusionVisible = true;
            
          }
          

        
          //判断是否执行状态执行完毕显示执行完毕，执行中显示状态处理，未执行显示执行；再判断如果是输液就显示输液框
          this.actionChoice = !this.actionChoice;

      },
      StopMethod(){
      let _this = this;
      //参数配置
      let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType
      
          MessageBox({
        $type:'prompt',
        title:'停止执行',
        message:'停止执行原因',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {
    Indicator.open('停止执行中...')
            let parmas = {
              "patientid":patientid,
              "exenum":exenum,
              "overnurse":exenurse,
              "overnurseid":nurse_id,
              "projecttype":projecttype,
              "reason":value
            };

      $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetQuit",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })



        
      
    }).catch((e)=>{
        console.log(e)
    });
          this.actionChoice = false;
      },
      ReturnMethod(){
          MessageBox({
        $type:'prompt',
        title:'撤销执行',
        message:'撤销执行原因',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {
        Indicator.open('确认中..');
        setTimeout(()=>{
            Indicator.close();
            Indicator.open('执行成功')
        },1000)
        setTimeout(()=>{
            Indicator.close()
        },1000)
    }).catch(()=>{
    
    });
          this.actionChoice = false;
      },
      ExecuteMethod(){
        let _this = this;
        this.actionChoice = false;
        if(this.orderType != '输液'){
        MessageBox({
        $type:'confirm',
        title:'确实执行提示',
        message:'是否执行',
        showCancelButton:true
    }).then(({ value, action }) => {
       Indicator.open('确认中..');
       console.log(1);
       //yzf 
      //参数配置
          //病人id 
          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType

          let parmas = {
            "exenum":exenum,
            "patientid":patientid,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id,
            "projecttype":projecttype,
          };
          console.log(parmas)

      $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecute",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })

}).catch((e)=>{
    
})


          
        }else{

          this.showExecute = true;
          this.actionChoice = false;
        }
        
        
          
      },
      openPicker() {
        this.$refs.picker.open();
      },
      startDates(){
        console.log(this.pickerValue)
      },
      pickDetail(){
        this.popupVisible = true
      },
  	  detailChange(res){
         
      },
      cancelDetailPicker(){
          this.popupVisible = false
      },
      handleDetailPicker(){
          this.popupVisible = false;
          this.filter.type = this.detailValue[0];
          this.filter.project = this.detailValue[1];
          this.filter.state = this.detailValue[2];
          //yzf
          let date = this.dateArr[this.checkindex]
          this.getWorkList(date);
      },
      stop(){
      let _this = this;
      MessageBox({
        $type:'prompt',
        title:'暂停输液',
        message:'请填写暂停原因',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {

    //参数设置
      Indicator.open("暂停中");
          //病人id 
          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType

        let parmas = {
          "exenum":exenum,
          "patientid":patientid,
          "overnurse":exenurse,
          "overnurseid":nurse_id,
          "projecttype":projecttype,
          "reason":value
        }

         $.ajax({
        
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetQuit",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
    }).catch((e)=>{
    
    });
        
    },
    startDates(){
        let chooseDate = this.datePickerValue

        let nowDate = new Date(chooseDate.getFullYear()+"-"+(parseInt(chooseDate.getMonth())+parseInt(1))+"-"+chooseDate.getDate());
        
     
        let endDateTimeStamp = new Date(nowDate.getTime()-3*24*3600*1000);
        let startDate= nowDate.getFullYear()+"-"+(parseInt(nowDate.getMonth())+1)+"-"+(parseInt(nowDate.getDate())+2)
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
   
      },startDates(){
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
    finish(){
      let _this = this;
        MessageBox({
        $type:'confirm',
        title:'结束输液',
        message:'是否结束输液',
        showCancelButton:true
    }).then(({ value, action }) => {


    //参数设置
          Indicator.open("正在结束输液中...")
          //病人id 
          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType

        let params = {
          "exenum":exenum,
          "patientid":patientid,
          "overnurse":exenurse,
          "overnurseid":nurse_id,
        }
//yzf2
         $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOver",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
    }).catch(()=>{
    
    });
    },
    getIndate(){
        let _this = this; 
        let pat = getPat();
        let patinentid = pat.pat_id
        let parmas={
            'patientid':patinentid
        }
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetInDate",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            console.log(data);
            if(data.code==200){

              let arr = data.res[0].InDate.split(" ");
              
              _this.startDate = new Date(arr[0])
            }else{
              console.log('缺少入院日期，提供默认值2018-05-20');
                 _this.startDate  = new Date("2018-05-20");
            }
        },
        error:function(e){
          console.log(e)
        }
      })
    },
    GoOn(){
        this.oldOrderId = this.orderId;
        if(this.infusionType==1)return ;
        let _this = this;
        console.log(this.orderInfoList);
        this.workList.forEach(function(item){
              if(item.执行状态=='未执行' && item.执行单类别=='输液'){
                  console.log(1);
                  _this.infusitonList.push(item)
              }
              
        })
        this.workList = this.infusitonList;
         
        this.infusionType = 1;
    },
//yzf
    check(){
      let _this = this;

       //参数设置

              MessageBox({
        $type:'prompt',
        title:'添加备注',
        message:'不填默认为无异常',
        showCancelButton:true,
        inputPlaceholder:'患者未诉任何不适',
        showInput:true
    }).then(({ value, action }) => {
       //病人id 

          let pat = getPat();
          let patientid = pat.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = this.speed;
          //执行单id
          let exenum = this.orderId;
          //执行单类别
          let projecttype = this.orderType;
            

      let parmas={
          "patientid":patientid,
          "exenum":exenum,
          "exenurse":exenurse,
          "content":value
      }

          $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/AddRecord",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                let date = _this.dateArr[_this.checkindex]
                _this.getWorkList(date);
                Indicator.close();
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                return ;
            }

            
        },
        error:function(e){
          console.log(e)
        }
      })
    }).catch(()=>{

    });


 
          
    },

    getWorkList(date){
    this.infusionType=0;
      // $patientid = '1';
    // $exedate = '2018-02-04';
    // $ordertype = "长期医嘱";
    // $projecttype = "全部";
    // $exestatus = "未执行";
    let pat = getPat();
    
    let _this = this;
    let patientid = pat.pat_id;

    let exedate = date;
    let ordertype = this.filter.type;
    let projecttype = this.filter.project;
    let exestatus = this.filter.state;
    Indicator.open("正在匹配医嘱中...")
    let params = {
        "patientid":patientid,
        "exedate":exedate,
        "ordertype":ordertype,
        "projecttype":projecttype,
        "exestatus":exestatus
    }
    $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecution",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
           
            if(data.code!=200){
              if(data.code == 400){
                _this.errorMsg = data.message
                _this.workList=[];
                Indicator.close()
                return ;
              }
              if(data.code == 401){
                _this.errorMsg = data.message
                _this.workList=[];
                Indicator.close()
                return ;
              }
            }else{
                _this.workList = data.res;
                Indicator.close()
            }
        },
        error:function(e){
          console.log(e)
        }
      })

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
  },
  mounted () {
    let nowDate = (new Date()).getFullYear()+"-"+(parseInt((new Date()).getMonth())+parseInt(1))+"-"+(new Date()).getDate();
    this.getWorkList(nowDate);
    this.today(new Date())
     this.getIndate();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-gantanhao-{
    color:#FF6666
}

.icon-zhihangzhong{
    color:#99CC66
}
.icon-chexiao{
    color:#CCCCCC
}
.icon-dengdaizhihang{
    color:red
}
.icon-zhixingchenggong{
    color:green
}
#PatsWorkList{
	background:rgb(244,244,244);
	overflow:auto
}
.filter{
	position:fixed;
	padding-top:0.667rem;
  padding-bottom:0.667rem;
	width:100vw;
	background:rgb(244,244,244);
  z-index:1
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
.filter-detail-ul{
  margin-top:0.3335rem;
}
.filter-detail-li{
  float:left;
  width:29.5vw;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem
}
.filter-detail-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
.float-right{
  right:0px;
  position:absolute;
  margin-right:3px;
  margin-top:1px
}

.focus-class{
    background:rgb(244,244,244)
}

.date-span{
  display:inline-block;
  background:blue;
  line-height:11vw
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
.work-list-div:first-child{
  margin-top:16vh;
}
.work-list-div{
  display:inline-block;
  width:100vw;
  background:rgb(244,244,244);
  margin-top:2vh;
}

.work-list-main-content{
  margin-top:1.0005rem;

}
.work-list-main-content:first-child{
  margin-top:0vh
}
.work-list-title{
  width:100vw;
  height:2.668rem;
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  //text-align:left;
  line-height:2.668rem;
  background:white 
}
.work-list-content{

  width:100vw;
  border-bottom:1px solid rgb(230,230,230);
  background:white
}
.icon-font-style{
  font-size:2.2rem;
}
.icon-font-active{
  color:rgb(254, 110, 161)
}
.title-float-left-text{
  float:left
}
.title-float-right-done-text{
  float:right
}
.title-float-right-ing-text{
  float:right
}
.order-td-text-style{
  font-size:1.4rem;
  text-align:left;
  width:50vw
}

.dosage-td-text-style{
  text-align:right;
  width:40vw;
  color:rgb(255,142,166);
  font-size:1.1rem;
}
.order-detail-td-text-style{
  text-align:left;
  font-size:1.3rem;
  color:rgb(120,120,120);
  height:1vh
}


.ExecuteForm{
  height:20.01rem;
  width:100vw;
  background:white
}

.execute-btn{
   display:inline-block;
   width:45vw;
   font-size:1.4rem;
   height:4.002rem;
   line-height:4.002rem
}
.execute-btn-left{
  text-align:left
} 
.execute-btn-right{
  text-align:right
}
.popup-execute-div{
  position:absolute;
  bottom:0px;
  height:4.002rem;
  background:white;
  width:100vw;
  border-radius:2px;
  border-top:1px solid rgb(230,230,230);

}
.popup-execute-btn{
  display:inline-block;
  margin-top:0.667rem;
  height:2.668rem;
  line-height:2.668rem;
  font-size:1.4rem;
  background:rgb(228,228,228);
  width:90vw
}
.speedSelected{
  float:left;
  border-left:1px solid rgb(230,230,230);
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  height:2.668rem;
  line-height:2.668rem;
  font-size:1.2rem
}
.selectContent{
  width:15vw;

}
.selectContent-input{
  width:15vw;
  height:2.668rem;
}
.selectControl{
   width:5vw;
}
.speedSelected:last-child{
  border-right:1px solid rgb(230,230,230)
}
.unit:first-child{
  margin-left:0vw
}
.unit{
  border:1px solid rgb(230,230,230);
  float:left;
  margin-left:4vw;
  width:17.8vw;
  height:2.668rem;
  line-height:2.668rem;
  font-size:1.4rem
}
.unit-focus{
  background:url('../../../assets/img/selected.png') no-repeat right bottom;
  background-size:cover;
  -moz-background-size:cover;
  -webkit-background-size:cover;
  border:1px solid rgb(98,175,56)
}
.execute-table-tr{
  height:5.336rem
}
.execute-table-title-td{
  width:10vw;
  font-size:1.4rem;
  color:rgb(150,150,150);
  text-align:left
}


.footer-control-operation-div{
    width:100vw;
    height:4.669rem;
    background:white;
}
.footer-control-operation-item:first-child{
    border-left:none
}
.footer-control-operation-item{
    width:15.8vw;
    height:4.5rem;
    border-left:1px solid rgb(230,230,230);
    float:left;
    
}
.footer-control-operation-item-icon-div{
    margin-top:0.8004rem
}
.footer-control-operation-item-word{
    font-size:1.4rem
}
.footer-control-operation-item-stop{
    width:35vw;
    background:rgb(255,204,204);
    font-size:1.6rem;
    line-height:4.7rem;
}
.operation-icon{
    margin-top:1px
}

.actionChoice-div{
  
  width:100vw;
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
.orderDetail-div{
  height:100vh;
  width:100vw;
  background:white
}
.close{
  position:relative;
  height:6vh;
  width:100vw;
  line-height:6vh;
  z-index:99;
  background:rgb(250,250,250);
  font-size:1.8rem;
  border-bottom:1px solid rgb(230,230,230)
}
.icon-guanbi{
  font-size:3rem;
  float:left
}
.content-table{
  width:95vw;
  margin-left:5vw;

}
.content-detail-main{
  margin-top:2vh;
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
  background:white
}
.text-align-left-td-class{
  text-align:left;
  color:rgb(150,150,150)

}
.content-main-div{
  display:inline-block;
  background:rgb(250,250,250);
  height:93.4vh
}
.text-align-right-td-class{
  text-align:right;
  padding-right:5vw;
  font-family:"微软雅黑"
}
.table-td{
  font-size:1.4rem;
  height:5vh;
  border-bottom:1px solid rgb(230,230,230)
}
.border-bottom-none{
  border-bottom:none
}
.content-detail-title{
  height:10vh;
  width:100vw;
  background:white;
  border-top:1px solid rgb(230,230,230);
  margin-top:2vh;
  border-bottom:1px solid rgb(230,230,230);
}
.orderType{
  width:18vw;
  height:3.5vh;
  line-height:3.5vh;
  background:rgb(254, 110, 161);
  color:white;
  font-size:1.3rem
}
.content-detail-order-name{
  font-size:1.8rem
}
</style>


