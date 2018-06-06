<template>
    <div id='scanResult'>
    
      <nheader :routechoice='router'><span slot="title">扫码结果</span><i @click="showScan(0)" class='icon iconfont icon-saoma' style='font-size:2.4rem' slot='choice'></i></nheader>
     
    <div class="title first-title"><div class='layout'>当前患者信息</div></div>
    <div class='PatInfo-div' v-for="item in PatInfoList">
    <table id='PatInfo' >
      <tr>
        <td id="pat-bed">{{item.床位号+"床"}}</td>
        <td id="pat-name">{{item.姓名}}</td>
        <td id="pat-sex">{{item.性别}}</td>
        <td id="pat-age">{{item.年龄}}</td>
        <td d="pat-state" rowsspan='2'>{{item.护理等级}}</td>

      <tr class="font-format-class">
        <td >医生:</td>
        <td class="text-align-left-td-class" colspan='3'>{{item.住院医生}}</td>
      </tr>
      <tr class="font-format-class">
        <td >诊断:</td>
        <td class="text-align-left-td-class" colspan='4'>{{item.入院诊断}}</td>
      </tr>
      <tr class="font-format-class">
        <td>病情:</td>
        <td class="text-align-left-td-class" colspan='4'>{{item.病情}}</td>
      </tr>
        
    </table>
    </div>
    <div class="title"><div class='layout'>当前执行单信息</div></div>
    <div v-show='OEorderList.length == 0' style='font-size:1.4rem;color:rgb(150,150,150);margin-top:2vh'>无医嘱信息<br/>可点击右上角添加核对执行单信息...</div>
    <div id="infusion-content" v-for='item in OEorderList'>
        
        <div class='content-main-info'>
            <div class='layout'>
                 <table>
                      <tr class='order-main-tr' @click="checkee(item)">

                        <td class="order-td-text-style">{{item.项目名称}}</td>
                        <td class='dosage-td-text-style'>{{item.规格}} 100毫升/瓶</td>
                      </tr>
                   
                 </table>
                  <table>
                      <tr>
                        <td  class='order-detail-td-text-style'>
                         {{item.医嘱性质}}&nbsp;qd&nbsp;|&nbsp;{{item.用法}}&nbsp;|&nbsp;{{item.滴速}}ml/{{item.滴速单位}}
                        </td>
                      </tr>
               
                   </table>
          </div>
       </div>

    </div>
    <div class='infusion-div' v-for='item in OEorderList'>
    <div class='tab-btn-container'>

      <div class='tab-btn' v-text="item.执行单类别=='输液'?'输液预览':'预览'" @click="changeTab('tab-preview')">
          
      </div>
      <div class='tab-btn' @click="changeTab('tab-order')">
          医嘱详情
      </div>
      <div class='tab-btn' v-text="item.执行单类别=='输液'?'输液过程':'无'" @click="changeTab('tab-process')">
          
      </div>
    </div>
    <div class="page-tab-container">   
      
          <mt-tab-container v-model="active" swipeable>
          
             <mt-tab-container-item id="tab-preview" >  
             <div class="layout">   
                <div class='preview-dateAndstate'>
                    <div class='tab-preview-dateAndstate-div' style='float:left'>{{(item.计划执行时间).substring(5,10)}}</div>
                    <div class='tab-preview-dateAndstate-div' style='float:right'>{{item.执行状态}}</div>
                 </div>
                 <div>
                    <img src='../../../assets/img/infusion.png' width="100%"/>
                 </div>
                 </div>  
                 <div class='preview-time-div'>
                    <div style='font-size:1.4rem'>计划执行时间</div>
                    <div style='font-size:2.5rem'>{{item.计划执行时间}}</div>
                 </div>
            </mt-tab-container-item>
          <mt-tab-container-item id="tab-order">
            <div id="InfusionInfo">
            
            
                <div class='scroll-container'>
                   
                        <div class="content-main" v-for = "item in orderInfoList">
                            <table class='content-table'>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>类型</td>
                                  <td class='text-align-right-td-class table-td'>{{item.医嘱性质}}</td>
                               </tr>
                               <tr>
                                  <td class='text-align-left-td-class table-td'>医嘱序号</td>
                                  <td class='text-align-right-td-class table-td'>{{item.医嘱序号}}</td>
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
                        <div class="content-main" v-for = "item in orderInfoList">
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
                         
                         
                 
                </div>
                 <div class="layout"> 
                    </div>
                 
             </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-process">
            <div class='scroll-container' style="background:white">
              <div class="layout"> 
              <!--yzf-->
                  <div class='step-date'>
                    {{processDate}}
                  </div>
                  
                  <table class='table-step' v-for='(item,index) in eventList' >
                    
                      <tr style='display:inline-block;position:relative;clear:both'>
                        <td class='step-table-step-td'  style='clear:both;float:left'  valign="top">
                            <div class='step-table-time-div'><div class='step-table-time'>{{item.exetime}}</div><div class='triangle-left'></div></div>
                            <div  class='step-table-td-bar-div'><div class='step-table-td-bar' v-show='index != 5'></div></div>
                            <div class='table-hr-div' v-show='index != 5'><div class='table-hr'></div></div>
                        </td>
                        <td class='step-table-content-td' style='postion:absolute;float:right'  rowspan=2 valign="top">
                          <div class='step-table-content'>
                             {{item.act}}:{{item.content}} 
                          </div>
                          <div class='step-table-content-nurse'>执行护士:&nbsp;{{item.nurse}}</div></td>
                      </tr>
                      
                     
                  </table>
                  
                 
              </div>
            </div>
          </mt-tab-container-item>
          </mt-tab-container>

    </div>
    <div id="footer-scan">
        <div class='footer-control-operation-div' v-show = "item.执行状态=='执行中' && item.执行单类别=='输液'">
            <div class='footer-control-operation-item' @click='check(item)'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-yanjing operation-icon'></i></div><div class='footer-control-operation-item-word'>添加备注</div></div>
            <div class='footer-control-operation-item' @click='GoOn(item)'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-guanlianfujian operation-icon'></i></div><div class='footer-control-operation-item-word'>接瓶</div></div>
            <div class='footer-control-operation-item' @click='stop(item)'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-zanting1 operation-icon'></i></div><div class='footer-control-operation-item-word' >暂停</div></div>
            <div class='footer-control-operation-item footer-control-operation-item-stop' @click='finish(item)'>结束</div>
        </div>
        <div class='footer-execute-div' @click="execute(item)" v-show = "item.执行状态=='未执行'">
          执行
        </div>
        <div class='footer-execute-div' v-show = "item.执行状态=='已执行'">
          已执行
        </div>
        <div class='footer-execute-div' v-show = "item.执行状态=='停止'">
          已停止不可操作
        </div>
        
    </div>
    

    

    <mt-popup
          v-model="showExecute"
          position="bottom">
            <div class='ExecuteForm'>
              <div class='layout'>
                <div class='execute-btn execute-btn-left' >请录入输液的低速</div><div class='execute-btn execute-btn-right' @click="showExecute = !showExecute">取消</div>
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
                <div class='popup-execute-btn' @click='BeginInfusion'>
                    开始输液
                </div>
            </div>
            </div>
            
            
        </mt-popup>
           </div>
             <div >
      <popup v-model="show" height="100%">
        <div class="popup">
            <scanpha ref='scanphaMethod' :patId='PatId' :scantype='scanType'  @close='closeMethod' @toggleShow='closeScan'></scanpha>
        </div>
      </popup>
    </div>
    <!--yzf modelshowInfusionList classshowInfusionListForm-->
    
 </div>
 
</template>

<script>
import nheader from '@/views/components/nheader';
import scanpha from '@/views/scan/scan-action/scan-pha';
//import {getPatInfo, getOEOrderItm} from '@/api/api';
import {getUser,getPat} from '@/config'
import { Popup, TransferDom } from 'vux';
import { Indicator,MessageBox } from 'mint-ui';
import dheader from '@/views/components/dheader';

export default {
  name: 'scanResult',
  directives: {
    TransferDom
  },
  components:{Indicator,nheader,Popup,TransferDom,scanpha,dheader},
  data () {
    return {
      checkindex2:1,
      unit:["小时","分钟","秒"],
      PatInfoList:[],
      speed:40,
      show: false,
      OEorderList:[],
      nullOEOI:true,
      router:'goback',
      active:'tab-preview',
      showExecute:false,
      stepList:[

      ],
      orderInfoList:[],
      oldOrderId:0,
      PatId:0,
      scanType:0,
      orderId:0,
      orderType:0,
      eventList:[],
      showInfusionList:true,
      processDate:''

    }
  },
  
  methods :{
      closeMethod(){
        this.show = false;
        this.scanType = 0 ;
      },
      toggle2(item,index){
        this.checkindex2 = index;  
      },
      //输液执行
      BeginInfusion(){

          let _this = this;
          if(this.scanType==0){
                  let patientid = this.$route.params.patId
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = _this.speed;
          
      
          Indicator.open('确认中...')
           let params = {
            "exenum":_this.OEorderList[0].执行单id,
            "patientid":_this.$route.params.patId,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id,
            "projecttype":_this.OEorderList[0].执行单类别,
          };

          $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecute",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){

                _this.refreshMethod();
                Indicator.close();
                 _this.showExecute = false;
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = true;
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = true;
                return ;
            }
  
        },
        error:function(e){
          console.log(e)
        }
      })
          }else{
          let patientid = this.$route.params.patId
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          //单位
          let speedunit = this.unit[this.checkindex2];
          //滴速
          let speed = _this.speed;


          //Indicator.open('确认中...');
           let params = {
            "newexenum":_this.OEorderList[0].执行单id,
            "oldexenum":_this.oldOrderId,
            "patientid":_this.$route.params.patId,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id
          };
          //Indicator.close()
          console.log(params);
        
          $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetNext",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){

                _this.refreshMethod();
                Indicator.close();
                 _this.showExecute = false;
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = true;
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = true;
                return ;
            }
  
        },
        error:function(e){
          console.log(e)
        }
      })
          }
        
    
      },
     

      //获取输液操作列表
      GetActionList(){
      let patientId = this.PatId;
      let exenum = this.OEorderList[0].执行单id;
      let exestatus = this.OEorderList[0].执行单类别;
      let _this = this;
      let parmas = {
        "patientid":patientId,
        "exenum":exenum,
        "exestatus":exestatus
      }
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetActionList",
        datatype:"json",
        success:function(json){
              let data = JSON.parse(json);
              if(data.code==200){
                _this.eventList = data.res;
                if(_this.eventList.length>0){
                   _this.processDate = _this.eventList[0].exedate;
                }
               
              }else{
                alert(data.message);
              }


            
        },
        error:function(e){
          console.log(e)
        }
      })
 
      },
     GetOrderDetail(){
        let _this = this;
        let parmas = {
            "itemid":this.OEorderList[0].医嘱id
        };
           
   
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOrderDetail",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            _this.orderInfoList = data;


            //yzf
        },
        error:function(e){
          console.log(e)
        }
      })
     },
   
      checkee(item){

      },
      execute(item){
        
        let _this = this;
        if(item.执行单类别=='输液')
        {
            _this.showExecute = true;
            _this.orderId = item.执行单id;
            _this.orderType = item.执行单类别;

        }else{
          _this.orderId = item.执行单id;
             MessageBox({
        $type:'confirm',
        title:'是否执行',
        message:'是否执行此执行单',
        showCancelButton:true
    }).then(({ value, action }) => {
          //参数设置

          //病人id 
          Indicator.open('确认中');
          let patientid = _this.$route.params.patId
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
          let exenum = item.执行单id;
          //执行单类别
          let projecttype = item.执行单类别;

         let parmas = {
            "exenum":exenum,
            "patientid":patientid,
            "speed":speed,
            "speedunit":speedunit,
            "exenurse":exenurse,
            "exenurseid":nurse_id,
            "projecttype":projecttype,
          };
//yzf2
         $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecute",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                _this.refreshMethod();
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
        }
        
      },
      closeScan(data) {

          let _this = this;
  
          this.show = !this.show;
          this.OEorderList = data;

          setTimeout(()=>{
            _this.GetOrderDetail();
            _this.GetActionList();
            
          },3000);
          

          
  
     },
  
     showScan(type){
      let _this = this;
      this.scanType = type
  
        this.show = true;

        setTimeout(()=>{
            this.$refs.scanphaMethod.startRecognize();
            this.$refs.scanphaMethod.startScan();
        },600)
     },
     changeTab(par){
        this.active = par;
       
     },
     refreshMethod(){
        let _this = this;
        let parmas = {
            'patientid':_this.$route.params.patId,
            'exenum':_this.OEorderList[0].执行单id
         };
        $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/SCanExeInfo",
        datatype:"json",
        async:false,
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                

               _this.OEorderList = data.res;
               _this.GetActionList();
              _this.GetOrderDetail();
               
                return ;
            }
            if(data.code==400){
               alert(data.message);
               return ;
            }
            if(data.code==401){
               alert(data.message);
               return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
     },
     stop(item){
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
      Indicator.open("暂停输液中...");
          
          //yzf
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


        let parmas = {
          "exenum":item.执行单id,
          "patientid":this.$route.params.patId,
          "overnurse":exenurse,
          "overnurseid":nurse_id,
          "projecttype":item.执行单类别,
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
                _this.refreshMethod();
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
    finish(item){
      let _this= this;
        MessageBox({
        $type:'confirm',
        title:'结束输液',
        message:'是否结束输液',
        showCancelButton:true
    }).then(({ value, action }) => {
        Indicator.open('结束输液中...');

    //参数设置
          Indicator.open("正在结束输液中...")
     
          
          //护士id 
          let user = getUser();
          let nurse_id = user[0].row_id;
          //护士名字
          let exenurse = user[0].name;
          

       
         let params = {
          "exenum":item.执行单id,
          "patientid":this.$route.params.patId,
          "overnurse":exenurse,
          "overnurseid":nurse_id,
        }
     
        $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOver",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                Indicator.close();
                _this.refreshMethod();
                 _this.showExecute = false;
                return ;
            }
            if(data.code==400){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = false;
                return ;
            }
            if(data.code==402){
                alert(data.message);
                Indicator.close();
                 _this.showExecute = false;
                return ;
            }
  
        },
        error:function(e){
          console.log(e)
        }
      })
    }).catch((e)=>{
        console.log(e);
    });
    },
    GoOn(item){
        this.oldOrderId = item.执行单id;
        this.showScan(1);

    },
    check(item){
    let _this = this;
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

            
//yzf
      let parmas={
          "patientid":this.$route.params.patId,
          "exenum":item.执行单id,
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
                _this.refreshMethod();
                alert(data.message)
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
    }
  },

  mounted () {
            this.PatInfoList = this.$route.params.patInfo;
           this.PatId = this.$route.params.patId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


.showInfusionListForm{
    width:100vw;
    height:100vh;
    background:white;
}
#PatInfo{
  width:90vw;
  margin:0px auto 0px;
  display:inline-block;
  height:15vh
}
.PatInfo-div{
  height:15vh 
}
.popup {
  width:100%;
  height:100%;
}



.title{
  width:100vw;
  margin:0px auto 0px;
  line-height:4.002rem;
  text-align:left;
  background:rgb(240,240,240);
}

.first-title{
  margin-top:4.002rem;
}

#pat-bed{
  background:rgb(102,240,102);
  width:12vw;
  color:white;
  font-weight:bold;
}
#pat-name{
  width:15vw;
  font-size:1.6rem;
  font-weight:bold;
}
#pat-sex{
  width:4vw;
}
#pat-age{
  width:10vw;
}
.text-align-left-td-class{
  text-align:left
}
.font-format-class{
  font-size:1.4rem;
}
#infusion-content{
  width:90vw;
  margin:0.667rem auto 0px;
}

.text-align-left-class{
  float:left
}
.text-align-right-class{
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
  color:rgb(120,120,120)
}
.page-tab-container{
  height:27.5471rem;
  
  overflow:auto
}
.tab-btn{
  display:inline-block
}
.tab-btn-container{
  height:3.0015rem;
  width:100vw;
  margin-top:1.334rem;
  border-bottom:5px solid rgb(244,244,244)
}
.tab-btn{
  width:29.8vw;
  font-size:1.4rem;
  border-right:1px solid rgb(230,230,230)
}
.tab-btn:last-child{
  border-right:none
}
.preview-dateAndstate{
   height:3.335rem;

}
.tab-preview-dateAndstate-div{
   color:white;
   width:15vw;
   margin-top:1.0005rem;
   height:2.3345rem;
   line-height:2.3345rem;
   text-align:center;
   background:rgb(148,148,148);
   font-size:1.2rem
}
.preview-time-div{
    height:5.336rem;
    background:rgb(242,242,242);
    width:100vw;
    padding-top:0.5rem
}
#footer-scan{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
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
    width:21.25vw;
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
.footer-execute-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  background:white;
  border-radius:2px;
  width:90vw;
  background:rgb(228,228,228);
  font-size:1.4rem
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

.scroll-container{
  width:100vw;
  height:25.82624rem;
  overflow-y:auto;
  background:rgb(228,228,228)
}
.content-main:first-child{
  border-top:none;
  margin-top:0rem
}
.content-main{
  border-top:1px solid rgb(230,230,230);
  background:white;
  margin-top:.9rem
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
.step-date{
  text-align:left;
  height:6vh;
  width:90vw;
 
  font-size:1.4rem
}
.step-table-step-td{
  display:block;
  height:100%;
  width:18vw;
  clear:both
}
.step-table-time-div{
  position:absolute;
  top:0px;
  z-index:1;
  background:rgb(242,242,242);
  width:12vw;
  border-radius:3px;
  height:2.001rem;
  line-height:2.001rem;
  border:1px solid rgb(230,230,230);
  left:2.8%
}
.step-table-time{
  position:absolute;
  left:50%;
  width:12vw;
  margin-left:-6vw
}
.step-table-td-bar-div{
  position:absolute;
  width:18vw;
  height:110%;
  top:0px;
}
.step-table-td-bar{
  background:rgb(211,211,211);
  position:absolute;
  height:100%;
  width:.6vw;
  left:50%;
  margin-left:-0.3vw  
}
.triangle-left{
  position:absolute;
  right:-3.3vw;
  top:0.3335rem;
  width: 0;
  height: 0;
  border-top: 2vw solid transparent;
  border-right: 4vw solid rgb(242,242,242);
  border-bottom: 2vw solid transparent; 
}
.step-table-content-td{
  background:rgb(242,242,242);
  border:1px solid rgb(230,230,230);
  width:63vw;
  border-radius:3px;
  text-align:left;
  padding:0.2001rem 0.4998rem
}
.table-hr-div{
  width:18vw;
  height:2vh;
  position:absolute;
  bottom:-2.6vh;
}
.table-hr{
  height:2vh;
  margin:0px auto;
  width:.6vw;
  background:rgb(211,211,211);
}
.table-step{
  margin-bottom:2vh;
}
.step-table-content{
  font-size:1.4rem;
}
.step-table-content-nurse{
  font-size:1.4rem;
  color:rgb(150,150,150)
}
</style>

