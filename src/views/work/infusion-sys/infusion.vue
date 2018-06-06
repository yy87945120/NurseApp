<template>
    <div id="Infusion">
     <nheader :routechoice='router'><span slot="title">智慧输液</span><p slot='choice'><i class="icon iconfont" :class="active=='tab-detail'?'icon-all-copy':'icon-all'" @click="togglePerformance"></i></p></nheader>
    
     
     
      <div id="filter"><search ref='selectOne' @on-change="onChange"  v-model='searchValue' placeholder="床位号 || 姓名 || 住院号" :results="res" :on-cancel="onCancel" class="search">
      <table slot='res'>
     
        
      </table>
      </search>
      
      </div>
    	<div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem'>
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.ward}}</li>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.order}}</li>
              
            </ul>   
        </div> 
      </div> 

    	
     <div class="page-tab-container" style="">   
     <div class="layout">
     <mt-tab-container v-model="active" style='height:79vh;' swipeable>
  <mt-tab-container-item id="tab-list">
      <div class='layout'>
         <div class='infusion-main-content' v-for='item in InfusionInfo' @click='actionShow(item)'>
              <table class='infusion-main-content-table' v-for = "items in item.userInfo">
                  <tr class='infusion-main-content-table-first-tr'>
                      <td class='pats-bed'>{{items.bed}}床</td>
                      <td class='pats-name'>{{items.name}}</td>
                      <td  class='pats-sex'>{{items.sex | sFormat}}</td>
                      <td colspan='2' class='pats-age'>{{items.age | ageFormat}}</td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr class='infusion-main-content-table-second-tr'>
                      <td>{{item.dosage+"ml"}}</td>
                      <td colspan='2' >已消耗 {{item.precent}}%</td>
                      <td colspan='2'  style="width:28vw;text-align:left;font-size:1.2rem"><span v-show='item.needTime!=0'>剩余</span> {{item.needTime | timeFormat}}</td>
                      <td style='text-align:right;padding-right:8px'>{{item.speed}}滴/{{item.speedUnit}}</td>

                  </tr>
                  <tr>
                      <td colspan='6'>
                        <div class='main-content-progress-bar'>
                            <div :style="{width:((item.needTime/(item.endTime-item.startTime)*100)+'%')}" :class="(100-item.precent)>=50?'main-content-progress-bar-rest-primary':50>(100-item.precent)>=20?'main-content-progress-bar-rest-warning':20>item.precent>=0?'main-content-progress-bar-rest-danger':''" class='main-content-progress-bar-rest '></div>
                        </div>
                      </td>
                  </tr>
              </table>
              
          </div>

          <!--
          <div class='infusion-main-content'>
              <table class='infusion-main-content-table' v-for = "item in 1" @click='actionShow(item)'>
                  <tr class='infusion-main-content-table-first-tr'>
                      <td class='pats-bed'>1001床</td>
                      <td class='pats-name'>姚展锋</td>
                      <td class='pats-sex'>1</td>
                      <td class='pats-age'>22岁</td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr class='infusion-main-content-table-second-tr'>
                      <td>500ml</td>
                      <td colspan='2' >已消耗 90%</td>
                      <td colspan='2' style='text-align:left'>剩余 00:30:48</td>
                      <td style='text-align:right;padding-right:8px'>60滴/分</td>

                  </tr>
                  <tr>
                      <td colspan='6'>
                        <div class='main-content-progress-bar'>
                            <div  class='main-content-progress-bar-rest main-content-progress-bar-rest-danger'></div>
                        </div>
                      </td>
                  </tr>
              </table>
              
          </div>
          -->
          <div>
          </div>
      </div>  
  </mt-tab-container-item>
  <mt-tab-container-item id="tab-detail">
    <div id="InfusionInfo">
          <ul>
            <li class='InfusionInfo-pic-li' v-for="(item,index) in InfusionInfo" @click='actionShow(item)'>
              <div class='InfusionInfo-pic-li-content' v-for="items in item.userInfo">
                <div class='InfusionInfo-pic-bed'>{{items.bed}}床</div>
                
                <div class='InfusionInfo-pic-info'>
                    <div class='InfusionInfo-pic-dosage'>

                      <div class='InfusionInfo-pic-dosage-volumn'>{{item.dosage}}ml</div>
                      <div class='InfusionInfo-pic-dosage-hr'></div>
                      <div class='InfusionInfo-pic-dosage-speed'><span class='icon iconfont icon-iconset0457'></span>{{item.speed}}滴/{{item.speedUnit}}</div>
                    </div>

                    <div class='InfusionInfo-empty-pic'><img  src='../../../assets/img/infusionEmpty.png' /></div>
                    <div class='InfusionInfo-pic-info-top' :class="(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)>50?'InfusionInfo-pic-color-blue':(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)<20?'InfusionInfo-pic-color-red':'InfusionInfo-pic-color-yellow'" :style="{height:(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)+'%'}">
                       
                    </div>
                    <div class='InfusionInfo-pic-info-bottom' :class="(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)>50?'InfusionInfo-pic-color-blue':(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)>20?'InfusionInfo-pic-color-yellow':(((item.needTime/(item.endTime - item.startTime ))*100)*0.9216)>0?'InfusionInfo-pic-color-red':''"></div>
                </div>
                <Countdown @gettime="mytime($event,index)" :value="item.needTime" style='float:right;margin-right:2vw' :start="doStart"></Countdown>
<!--
              <p v-show="show">{{item.id}}<p/>
              <p>{{item.name}}<p/>
              <p>{{item.startDate}}<p/>
              <p>{{item.startTime}}<p/>
              <p>{{item.endDate}}<p/>
              <p>{{item.endTime}}<p/>
            
              
              <p v-show="!show">{{item.needTime}}<p/>
              <p v-show="show">{{item.OEOrderDr}}<p/>
              <Countdown @gettime="mytime($event,index)" :value="item.needTime" :start="doStart"></Countdown>
              <p v-show="!show">{{item.state}}<p/>
              -->
              </div>
             
            </li>
          </ul>
        </div>
     </mt-tab-container-item>
      
</mt-tab-container>

        </div>  

        </div>
         <mt-popup
          v-model="popupVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
        </mt-popup>


        <mt-popup v-model="actionVisible" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' @click='showInfusionOperation'>输液操作</div>
          <div class='actionChoice-choice-div' @click='showEvent'>查看输液事件</div>
            <div class='actionChoice-choice-div' @click='showOrderDetail'>查看医嘱详情</div>
                
            </div>
         
        </mt-popup>

        <mt-popup v-model="OrderDetailVisible" position="right">
            <div class='orderDetail-div' v-for = 'item in orderDetailList'>
              
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
                    <td class='text-align-right-td-class table-td'></td>
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
            <div class='footer-control-operation-item' @click='GoOn'><div class='footer-control-operation-item-icon-div' style='background:rgb(150,150,150)'><i class='icon iconfont icon-guanlianfujian operation-icon'></i></div><div style='background:rgb(150,150,150)' class='footer-control-operation-item-word'>接瓶</div></div>
            <div class='footer-control-operation-item' @click='stop'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-zanting1 operation-icon'></i></div><div class='footer-control-operation-item-word' >暂停</div></div>
            <div class='footer-control-operation-item footer-control-operation-item-stop' @click='finish'>结束</div>
        </div>
       
      </div>
       <mt-popup v-model="showOperationRecord" position="right">
             <div class='operation-div'>
            <dheader @close='closeMethod'><span slot='title'>输液记录页</span></dheader>
            <div class='scroll-div'>
      
                <div class='layout'>
                  <timeline>
      <timeline-item style='text-align:left'>
        <div class='date-time-div'>{{operationDate}}&nbsp;操作记录明细</div>
      </timeline-item>
      <div v-for='item in eventInfoList.res'>
      <timeline-item style='text-align:left'>
        <div class='record-detail-div'>
          <div class='record-detail-content'>{{item.act}}操作:{{item.content}}</div>
          <div class='record-detail-time'>{{item.exetime}}</div>
        </div>
      </timeline-item>
      </div>
    
    </timeline>
    
                </div>
            </div>
          </div>
        </mt-popup>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import dheader from '@/views/components/dheader';
//import { getInfusion } from '@/api/api';
import { Countdown,Search,Picker,Timeline,TimelineItem} from 'vux';
import { Indicator,MessageBox } from 'mint-ui';
import {getDepartment,getUser} from "@/config";

 
export default {
  name: 'Infusion',
  components:{
  	Countdown,
    Timeline,
    TimelineItem,
    dheader,
    Search, 
    nheader,
    Picker,
    MessageBox
  },
  props:['title'],
  data () {
    return {
      	InfusionInfo:[],
        pat_id:0,
      	filter:[],
        showOperationRecord:false,
      	doStart:true,
      	show:false,
        loading:false,
        timeLeft:0,
        active:'tab-list',
        transition:false,
        searchValue:'',
        res:[],
        router:'gohome',
        resData:[],
        executeId:0,
        orderId:0,
        operationDate:'',
        filter:{
          date:0,
          ward:'中西医结合护理一单元',
          order:'按消耗量'
        },
        detailValue:[],
        detailArr:[
            ["中西医结合护理一单元","中西医结合护理二单元"],
            ["按消耗量","按床位"]
        ],
        popupVisible:false,
        actionVisible:false,
        OrderDetailVisible:false,
        infusionOperationShow:false,
        executeId:0,
        orderDetailList:[],
        eventInfoList:[]
    }
  },
  methods :{
      showInfusionOperation(){
          this.infusionOperationShow =true;
          this.actionVisible = false;
      },
      closeMethod(){
          this.actionVisible = false;
          this.showOperationRecord = false;
      },
      closeOrderDetail(){
        this.OrderDetailVisible = false;
      },
      closeInfusionOperation(){
        this.infusionOperationShow =false;
      },
     
      showOrderDetail(){
          this.actionVisible = false;
          let order


          this.OrderDetailVisible = true;

      },
      //yzf
      showEvent(){
        let _this = this;
        this.actionVisible = false;
        let patientid = this.pat_id;
        let exenum = this.executeId;
        let exestatus = "执行中";

        let params = {
          "patientid":patientid,
          "exenum":exenum,
          "exestatus":exestatus
        }
       
  $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetActionList",
        datatype:"json",
        success:function(json){
             _this.eventInfoList = JSON.parse(json);

              _this.operationDate = _this.eventInfoList.res[0].exedate
        },
        error:function(e){
          console.log(e)
        }
      })

        this.showOperationRecord = true;



     
      },

      actionShow(item){
        let _this = this;
        this.actionVisible = true;
        this.pat_id = item.userInfo[0].row_id;
        this.executeId = item.execId;
        this.orderId = item.orderId
      },
  		pickDetail(){
        this.popupVisible = true
      },
      getEvent(){
      
      },  

      showOrderDetail(){
         this.actionVisible = false;
          let _this = this;

          let orderId = this.orderId;
          let params = {
            "itemid":orderId
          }

    
 $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOrderDetail",
        datatype:"json",
        success:function(json){
           _this.orderDetailList = JSON.parse(json);

            
        },
        error:function(e){
          console.log(e)
        }
      })
       this.OrderDetailVisible=true;
      },
      handleDetailPicker(){
          this.popupVisible = false;
          this.filter.ward = this.detailValue[0];
          this.filter.order = this.detailValue[1];
          this.getInfusionInfo()
      },
      cancelDetailPicker(){
          this.popupVisible = false
      },
      detailChange(res){
         
      },
      mytime($event,index){
          this.InfusionInfo[index].needTime = $event;
      },
   		getInfusionInfo(){
      let _this = this;
      let par = {
        "par" : _this.searchValue,
        "ward":_this.filter.ward,
        "filter":_this.filter.order
      }
       
       Indicator.open("加载中...")

          $.ajax({
            data:par,
            type:"post",
            url:"http://120.24.73.75:8200/CI/index.php/Yzf/getInfusionMethod",
            datatype:"json",
           
            success:function(data){
              Indicator.close();
              _this.InfusionInfo = JSON.parse(data);
              console.log(_this.InfusionInfo);
              
            },
            error:function(e){
            console.log(e);
            }
          });
   		},
      togglePerformance(){
        if( this.active == 'tab-list'){
            this.active='tab-detail'
        }else{
            this.active='tab-list'
        }      
        this.transition = !this.transition;
      },
      onChange (){
        this.getInfusionInfo();
      },
      handleResultClick(item){
      console.log(item)
          this.$refs.selectOne.isCancel = false
          this.$refs.selectOne.isFixed = false
          Indicator.open('加载中...');
          
          this.filter = item
           this.getInfusionInfo()
    
      },
      onCancel(){

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
         let patientid = _this.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
        
       
          //执行单id
          let exenum = _this.executeId;
          //执行单类别
          let projecttype = "输液";

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
            alert("暂停成功");
                _this.getInfusionInfo();

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
          
          let patientid = this.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          
        
          
          //执行单id
          let exenum = this.executeId;
       

        let parmas = {
          "exenum":exenum,
          "patientid":patientid,
          "overnurse":exenurse,
          "overnurseid":nurse_id,
        }

//yzf2
         $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOver",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                _this.getInfusionInfo();
                alert("结束成功");
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
    GoOn(){
        
    },

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
       Indicator.open('添加中...');
          
          let patientid = _this.pat_id;
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let exenum = _this.executeId;
      
          //执行单类别
          let projecttype = "输液";
            

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

                Indicator.close();
                alert("添加备注成功")
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
    }

  },
  mounted () {
      let _this = this;
  		this.getInfusionInfo();
      let dep = getDepartment();
      
    
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#InfusionInfo{
	
}
.date-time-div{
  position:relative;
  left:3vw;
  top:.2vh;
  height:4vh;
  width:60vw;
 
  font-size:1.8rem
}
.record-detail-div{
  position:relative;
  left:3vw;
}
.record-detail-content{
  font-size:1.6rem
}
.record-detail-time{
  font-size:1.2rem
}
.date-time-div{
  position:relative;
  left:3vw;
  top:.2vh;
  height:4vh;
  width:60vw;
 
  font-size:1.8rem
}
.filter-detail-li{
  float:left;
  width:90vw;
  height:3.2016rem;
  background:white;
  font-size:1.4rem;
  line-height:3.2016rem;
  border-left:1px solid rgb(200,200,200);
  border-top:1px solid rgb(200,200,200);
  border-bottom:1px solid rgb(200,200,200);
  position:relative;
  font-size:1.4rem;
  margin-top:1rem
}
.filter-detail-li:last-child{
    border-right:1px solid rgb(200,200,200)
}
.scroll-div{
  height:94vh;
  width:100vw;
  overflow-y:auto;
  position:relative
}
.filter{
  
  width:100vw;
  height:5rem
}
.operation-div{
  height:100vh;
  width:100vw;
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
.icon-all{
  float:right;
  font-size:2.2rem;
  font-weight:bold;
}
.icon-all-copy{
  float:right;
  font-size:2.2rem;
  font-weight:bold;
  
  color:rgb(254,110,161);
}

.InfusionInfo-pic-li{
  float:left;
  width:45vw;
  height:13.34rem;
  margin-top:2rem;
  position:relative;
}
.InfusionInfo-pic-bed{
  position:absolute;
  height:2.1344rem;
  width:18vw;
  background:red; 
  top:-1.1rem;
  left:8.5vw;
  line-height:2.1344rem;
  background:rgb(228,228,228);
  border:1px solid rgb(212,212,212);
  color:rgb(15,8,247);
  font-weight:bold;
}
.InfusionInfo-pic-dosage{
  position:absolute;
  left:50%;
  margin-left:-2rem;
  top:3.6685rem; 
  z-index:2;
  width:4rem
}
.InfusionInfo-pic-dosage-volumn{
  font-size:1.4rem;
}
.InfusionInfo-pic-li-content{
  margin:0px auto;
  width:32.5vw;
  height:13.34rem;
  border:1px solid rgb(212,212,212);
  border-radius:5px;
}
.InfusionInfo-empty-pic{
  position:absolute;
   z-index:1
}
.InfusionInfo-empty-pic img{
    
    width:100%;
    height:100%;
   
}
.InfusionInfo-pic-info{
  width:20vw;
  height:10.2rem;
  margin:1.5341rem auto 0px;
  position:relative;
  
}
.InfusionInfo-pic-info-top{
  position:absolute;
  width:19.5vw;
  left:.5vw;
  bottom:.8rem;
  margin:0.1334rem auto 0px;
  border-radius:5px;
  z-index:0
}

.InfusionInfo-pic-color-blue{
  background:rgb(102,204,255)
}
.InfusionInfo-pic-color-red{
  background:rgb(255,152,102)
}
.InfusionInfo-pic-color-yellow{
  background:rgb(255,255,153)
}
.InfusionInfo-pic-info-bottom{
  position:absolute;
  bottom:0px;
  width:3vw;
  height:.8rem;
  left:9.3vw;
  bottom:0px;
}
#filter{
	
	width:100vw;
	height:4.84rem;
  line-height:4.002rem;
	margin-top:4.002rem;
	
}
#filter .search{
    margin-top:4.002rem;
    height:4.002rem;
    line-height:3.335rem;
}
#loadingData(){
  
}
.progressBar{
  position:relative;
  height:20px;
  width:120px;
  background:#ccc;
}
.progressBar-content{
  position:alsolute;
  left:0;
  top:0;
 
  height:100%;
  background:black
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

.filter-detail-li:last-child{
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
#InfusionInfo{
  height:79vh;
  overflow-y:auto;
  width:90vw;
  display:inline-block
}
.infusion-main-content{
  height:79vh;
  overflow-y:auto;
  width:90vw;
  display:inline-block
}
.infusion-main-content-table{
  width:90vw
}
.infusion-main-content:first-child{
  margin-top:1vh;
}
.infusion-main-content{
  margin-top:2vh;
  height:10.5vh;
  width:90vw;
  background:rgb(242,242,242);
  border-radius:5px
}
.pats-bed{
  background:rgb(128,200,114);
  width: 12vw;
  height:3vh;
  color: white;
  font-weight: bold;
}
.pats-name {
  width: 20vw;
  font-size: 1.6rem;
  font-weight: bold;
}
.pats-sex {
  width: 4vw;
}
.pats-age {
  width: 10vw;
}
.main-content-progress-bar{
  position:relative;
  height:.8vh;
  width:100%;
  border-radius:2px;
  background:rgb(199,199,199);
}
.main-content-progress-bar-rest{
  position:absolute;
  top:0px;
  right:0px;
  height:100%;
  background:rgb(94,148,255);
  border-radius:2px;
}
.main-content-progress-bar-rest-danger{
  background:rgb(255,91,36);

}

.main-content-progress-bar-rest-warning{
  background:rgb(242,243,5);

}
.main-content-progress-bar-rest-primary{
  background:rgb(94,148,255);
}
.infusion-main-content-table-first-tr{
  height:3vh
}
.infusion-main-content-table-second-tr{
  height:4vh
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
.pat-choice-td{
  height:6vh;
  font-size:1.4rem;
  width:27.5vw;
  border-bottom:1px solid rgb(230,230,230)
}
.pat-choice-table{
    width:45vw
}
.pat-choice-title{
  heigth:6vh;
  line-height:6vh;
  font-size:1.6rem;
  text-align:center;
  border-bottom:1px solid rgb(230,230,230)
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
.patChoice-div{
  height:100vh;
  width:45vw;
  overflow:auto;
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
</style>

