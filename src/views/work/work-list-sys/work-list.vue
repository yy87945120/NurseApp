<template>
    <div id="workList">
         <nheader :routechoice='router'><span slot='title' @click='actionShow'>中西医结合护理一单元<i class='icon iconfont icon-moreunfold'></i></span><span slot='choice'><i @click='showPatChoice' class='icon iconfont icon-zhuyuanguanli' style='font-size:2.2rem;'></i></span></nheader>
          <div class="filter" id='filter'>
        <div class='layout'>           
            <ul class='filter-date-ul'>
              
              <li class='filter-date-li' v-text="index==3?'今天':index+1" :class="index==3?'focus-class':''"  v-for = '(item,index) in 6' ></li>
              <li class='filter-date-li' @click='openPicker'><i class='icon iconfont icon-icon12' style="font-size:2rem"></i></li>
            </ul>   
        </div>
        <div class='layout' style='display:inline-block'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>医嘱类型:({{filter.type}})</li>
              <li class='filter-detail-li' @click='pickDetail'>项目:({{filter.project}})</li>
              <li class='filter-detail-li' @click='pickDetail'>状态:({{filter.state}})</li>
            </ul>   
        </div>  

        </div>
        <div style="height:83.5vh;width:100vw;overflow:auto;background:rgb(244,244,244)">
          <div class='work-list-div' @click='showActionChoice(item)' v-for='item in workList'>
            <div class='work-list-main-content' style="display:inline-block">
           <div class='work-list-title'> <div class="layout"><div class='title-float-left-text'><i class='icon iconfont icon-shuye icon-font-style icon-font-active'></i>【18-04-01】 14:00</div><div class='title-float-right-done-text'><i class='icon iconfont icon-zhuyuanhushizhan icon-font-style'></i>&nbsp;姚展锋 14:05</div><div class='title-float-right-ing-text'><i class='icon iconfont icon-shouye9 icon-font-style'></i>&nbsp;60滴/分</div></div></div>
            <div class='work-list-content'>
              
              <div class="layout">
                 <table style='width:90vw'>
                      <tr class='order-main-tr' v-for='itemDetail in item.order'>
                        <td class="order-td-text-style">{{ itemDetail.orderName }}</td>
                        <td class='dosage-td-text-style'>{{itemDetail.orderdosage}}{{itemDetail.orderdosageUnit}}&nbsp;{{itemDetail.orderSize}}{{itemDetail.orderSizeUnit}}</td>
                      </tr>
                      
                 </table>
                  <table style='width:90vw'>
                      <tr>
                        <td  class='order-detail-td-text-style'>
                          <i class='icon iconfont icon-linshi' style='font-size:3rem;
                          position:relative;top:0.5rem;color:rgb(255,142,166)'></i>&nbsp;qd&nbsp;|&nbsp;静脉注射&nbsp;|&nbsp;40ml/h
                        </td>
                        <td  class='order-detail-td-text-style' style='text-align:right'>
                          <i :class="item.state=='Y'?'icon-zhixingchenggong':item.state=='R'?'icon-chexiao':item.state=='S'?'icon-dengdaizhihang':item.state=='N'?'icon-gantanhao-':item.state=='O'?'icon-zhihangzhong':''" class='icon iconfont'></i>{{item.state | stateFormat}}
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
                <div class='execute-btn execute-btn-left' >请录入输液的低速</div><div class='execute-btn execute-btn-right' @click="showExecute = !showExecute">取消</div>
              </div>
              <div class='layout'>
              <table>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>滴速</td>
                <td>
                  <div class='speedSelected selectControl'>-</div>
                  <div class='speedSelected selectContent'><input class='selectContent-input' type='text' style="text-align:center" value='30'/></div>
                  <div class='speedSelected selectControl'>+</div>
                </td>
              </tr>
              <tr class='execute-table-tr'>
                <td class='execute-table-title-td'>单位</td>
                <td>
                  <div class='unit unit-focus'>小时</div>
                  <div class='unit'>分钟</div>
                  <div class='unit'>秒</div>
                </td>
              </tr>
            </table>
              </div>
            <div class='popup-execute-div'>
                <div></div>
                <div class='popup-execute-btn'>
                    开始输液
                </div>
            </div>
            </div>
            
            
        </mt-popup>

       <mt-popup v-model="OrderDetailVisible" position="right">
            <div class='orderDetail-div'>
              
             <div class="close">
                <div class='layout'>
                  <i class='icon iconfont icon-guanbi' @click='closeOrderDetail'></i>
                  医嘱详情
                </div>      
              </div>
              <div class='content-main-div'>
              <div class="content-detail-title">
                
                  <div class='orderType'>
                    临时
                  </div>
                <div class='layout'>  
                  <div class='content-detail-order-name'>
                    DR头颅正位*(1)
                  </div>
              </div>
              </div> 
                <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>医嘱序号</td>
                    <td class='text-align-right-td-class table-td'>3</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>当前状态</td>
                    <td class='text-align-right-td-class table-td'>执行</td>
                  </tr>
               
                  <tr>
                    <td class='text-align-left-td-class table-td'>途径</td>
                    <td class='text-align-right-td-class table-td'>99ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>频次</td>
                    <td class='text-align-right-td-class table-td'>99ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>执行时间</td>
                    <td class='text-align-right-td-class table-td'>99ml</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>医生说明</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>急症已做</td>
                  </tr>
              
                </table>
            </div>  
            <div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>开始时间</td>
                    <td class='text-align-right-td-class table-td'>2018-03-30 15:17:00.0</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td'>开始医生</td>
                    <td class='text-align-right-td-class table-td'>姚展锋</td>
                  </tr>
               
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>校对护士</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>姚展锋</td>
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

            <div class='footer-control-operation-item' @click='check'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-yanjing operation-icon'></i></div><div class='footer-control-operation-item-word'>添加巡视</div></div>
            <div class='footer-control-operation-item' @click='GoOn'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-guanlianfujian operation-icon'></i></div><div class='footer-control-operation-item-word'>接瓶</div></div>
            <div class='footer-control-operation-item' @click='stop'><div class='footer-control-operation-item-icon-div'><i class='icon iconfont icon-zanting1 operation-icon'></i></div><div class='footer-control-operation-item-word' >暂停</div></div>
            <div class='footer-control-operation-item footer-control-operation-item-stop' @click='finish'>结束</div>
        </div>
        <div class='footer-execute-div' @click="execute" v-if='false'>
          执行
        </div>
      </div>


         <mt-popup v-model="patChoiceVisible" position="right">
            <div class='patChoice-div'>
              <!--<div class='actionChoice-choice-div' v-for='item in depList' @click='changeDep(item)'>{{item.dep_desc}}</div>-->
              <div class='pat-choice-title'>请选择患者</div>
              <table class='pat-choice-table'>
                <tr>
                  <td class='pat-choice-td'>1床</td>
                  <td class='pat-choice-td'>姚展锋</td>
                </tr>
                <tr>
                  <td class='pat-choice-td'>1床</td>
                  <td class='pat-choice-td'>姚展锋</td>
                </tr>
                <tr>
                  <td class='pat-choice-td'>1床</td>
                  <td class='pat-choice-td'>姚展锋</td>
                </tr>
              </table>
            </div>
        </mt-popup>




        <mt-popup v-model="actionVisible" position="bottom">
            <div class='actionChoice-div'>
              <!--<div class='actionChoice-choice-div' v-for='item in depList' @click='changeDep(item)'>{{item.dep_desc}}</div>-->
              <div class='actionChoice-choice-div'>中西医结合护理一单元</div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import { Picker } from 'vux';
import { Indicator,MessageBox } from 'mint-ui';
export default {
  name: 'workList',
  data () {
    return {
      router:'gohome',
      actionVisible:false,
      patChoiceVisible:false,
      workList:[
                { 
                  state:'N',
                  orderType:'infusion',
                  
                  order:[
                    { 
                      orderId:1,
                      orderName:'0.9%氯化钠注射液(软袋)',
                      orderdosage:'100',
                      orderdosageUnit:'毫升',
                      orderSize:'100',
                      orderSizeUnit:'毫升/瓶'
                    },
                    {
                      orderId:2,
                      orderName:'注射用灯盏花素',
                      orderdosage:'25',
                      orderdosageUnit:'毫克',
                      orderSize:'25',
                      orderSizeUnit:'毫克/支'
                    }
                  ]

                },
                { 
                  state:'O',
                  orderType:'infusion',
                  orderId:2,
                  order:[
                    {
                      orderId:3,
                      orderName:'0.9%氯化钠注射液(软袋)',
                      orderdosage:'100',
                      orderdosageUnit:'毫升',
                      orderSize:'100',
                      orderSizeUnit:'毫升/瓶'
                    },
                    {
                      orderId:4,
                      orderName:'葡萄糖注射液',
                      orderdosage:'25',
                      orderdosageUnit:'毫克',
                      orderSize:'25',
                      orderSizeUnit:'毫克/支'
                    }
                  ]

                },
                { 
                  state:'Y',
                  orderType:'oral',
                  
                  order:[
                    {
                      orderId:5,
                      orderName:'阿莫西林片剂',
                      orderdosage:'1',
                      orderdosageUnit:'片',
                      orderSize:'30',
                      orderSizeUnit:'片/瓶'
                    }
                  ]

                },
                {
                  state:'S',
                  orderType:'specimen',
                
                  order:[
                    {
                      orderId:6,
                      orderName:'血常规',
                      orderdosage:'1',
                      orderdosageUnit:'次',
                      orderSize:'',
                      orderSizeUnit:''
                    }
                  ]

                },
                { 
                  state:'R',
                  orderType:'treatment',
                 
                  order:[
                    {
                       orderId:7,
                      orderName:'大换药',
                      orderdosage:'1',
                      orderdosageUnit:'次',
                      orderSize:'',
                      orderSizeUnit:''
                    }
                  ]

                },
                { 
                  state:'R',
                  orderType:'injection',
                  
                  order:[
                    {
                       orderId:8,
                      orderName:'葡萄糖注射液',
                      orderdosage:'100',
                      orderdosageUnit:'毫升',
                      orderSize:'100',
                      orderSizeUnit:'毫升/瓶'
                    }
                  ]

                }
              ],
        filter:{
          date:0,
          project:'所有',
          type:'所有',
          state:'所有'
        },
        orderId:0,
        orderType:0,
        infusionOperationShow:false,
        detailValue:[],
        detailArr:[
            ["所有","长期","临时"],
            ["所有","输液","注射"],
            ["所有","未执行","执行中","已执行"]
        ],
        startDate:new Date('2014-1-1'),
        endDate:new Date('2014-1-2'),
        datePickerValue:'',
        popupVisible:false,

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
        OrderDetailVisible:false

    }

   
  },
  components:{nheader,Picker},
  methods :{
    actionShow(){
      this.actionVisible = true;
    },
    showPatChoice(){
      this.patChoiceVisible = true;
    },
    showOrderDetail(){
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
        this.orderId=item.order[0].orderId;
       
        this.orderType=item.orderType;

        for (var Key in this.stateVisible){
            this.stateVisible[Key] = false;     
         }

          
          if(item.state == 'Y'){
            this.stateVisible.returnVisible = true;
          }
          if(item.state =='S'){
            this.stateVisible.stopWorkListVisible = true;
          }
          if(item.state =='N'){
            this.stateVisible.executeVisible = true;
            this.stateVisible.stopVisible = true;
          }
          if(item.state =='R'){
            this.stateVisible.executeVisible = true;
            this.stateVisible.stopVisible = true;
          }

          if(item.state =='O'){
            this.stateVisible.infusionVisible = true;
           
          }
          //判断是否执行状态执行完毕显示执行完毕，执行中显示状态处理，未执行显示执行；再判断如果是输液就显示输液框
          this.actionChoice = !this.actionChoice;

      },
      StopMethod(){

          MessageBox({
        $type:'prompt',
        title:'停止执行',
        message:'停止执行原因',
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
        if(this.orderType != 'infusion'){
            MessageBox({
        $type:'prompt',
        title:'执行',
        message:'请填写医嘱密码',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'密码不能为空',
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
          this.popupVisible = false
          this.filter.type = this.detailValue[0]
          this.filter.project = this.detailValue[1]
          this.filter.state = this.detailValue[2]
      },
      stop(){
      MessageBox({
        $type:'prompt',
        title:'暂停输液',
        message:'请填写暂停原因',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {
        console.log(value);
    }).catch(()=>{
    
    });
        
    },
    finish(){
        MessageBox({
        $type:'confirm',
        title:'结束输液',
        message:'是否结束输液',
        showCancelButton:true
    }).then(({ value, action }) => {
        
    }).catch(()=>{
    
    });
    },
    GoOn(){
        
    },

    check(){
        MessageBox({
        $type:'prompt',
        title:'添加巡视',
        message:'不填默认为无异常',
        showCancelButton:true,
        inputPlaceholder:'患者未诉任何不适',
        showInput:true
    }).then(({ value, action }) => {
        console.log(value);
    }).catch(()=>{
    
    });
    }
  },
  mounted () {

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
  position:relative;
  top:6vh;
  padding-top:0.667rem;
  padding-bottom:0.667rem;
  width:100vw;
  background:rgb(244,244,244);
  z-index:1;

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
  font-size:2.4rem;
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

</style>