
<template>
    <div id="PatsOrder">
    	<div id="filter" >
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>类型:({{filter.type}})</li>
              <li class='filter-detail-li' @click='pickDetail'>种类:({{filter.project}})</li>
              <li class='filter-detail-li' @click='pickDetail'>状态:({{filter.state}})</li>
            </ul>   
        </div> 
        
      
    </div>
    <div id="content">
             <div v-show='orderList.length == 0' style='font-size:1.4rem;color:rgb(150,150,150);margin-top:2vh'>无医嘱信息...</div>
        	  <div class='content-div' v-for="(item,index) in orderList">
        	  	<div class='content-title'>
        	  			<div class='layout'>
        	  				<div class='text-align-left-class'>
                      


        	  					<strong style='font-size:1.6rem'>{{index+1+'.'}}</strong>&nbsp;&nbsp;<i :class="item.医嘱状态=='执行'?'icon-zhixingchenggong':item.医嘱状态=='作废'?'icon-icon-':item.医嘱状态=='停止'?'icon-dengdaizhihang':item.医嘱状态==新开?'icon-zuixin':''" class='icon iconfont '></i> &nbsp;&nbsp; {{item.开单日期}} {{item.开单时间}}
        	  				</div>
        	  				<div class='text-align-right-class'>
        	  					<div><i class='icon iconfont icon-zhuyuanyishengzhan'></i>&nbsp;&nbsp;{{item.病人姓名}}</div>
        	  				</div>
        	  			</div>
        	  	</div>
        	  	<div class='content-main' @click='orderDetail(item)'>
        	  			<div class='layout'>
        	  				 <table style='width:90vw;'>
        	  				 	<tr class='order-main-tr'>
        	  				 		<td class="order-td-text-style">{{item.项目名称}}</td>
        	  				 		<td class='dosage-td-text-style'>{{item.剂量}}{{item.单位}}  {{item.规格}}</td>
        	  				 	</tr>
        	  				 	
        	  				 </table>
        	  				  <table style='width:90vw;'>
    	  				 		<tr>
        	  				 		<td  class='order-detail-td-text-style'>{{item.用法}}&nbsp{{item.频次}}&nbsp{{item.说明}}</td>
        	  				 	</tr>
        	  				 	<tr>
        	  				 		<td  class='order-detail-td-text-style'>剂量：{{item.剂量}} {{item.单位}}</td>
        	  				 	</tr>
        	  				 
        	  				 </table>
        	  			</div>
        	  	</div>
        	  </div>
        </div>
          <mt-popup v-model="popupVisible" position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
    	  </mt-popup>

    	   <mt-popup v-model="OrderDetailVisible" position="right">
            <div class='orderDetail-div' >
              <div class='orderDetail' style='height:92.6vh;overflow-y:auto;width:100vw'>
          	 <div class="close">
              	<div class='layout'>
                	<i class='icon iconfont icon-guanbi' @click='closeOrderDetail'></i>
                	医嘱详情
              	</div>      
              </div>
              <div class='content-main-div' v-for='item in orderDetailInfo'>
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
                    <td class='text-align-right-td-class table-td'>{{item.医嘱id}}</td>
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
                    <td class='text-align-left-td-class table-td border-bottom-none'>校对护士</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.审核护士}}</td>
                  </tr>
              
              
                </table>
        		</div>	

        		<div class="content-detail-main">
                <table class='content-table'>
                  <tr>
                    <td class='text-align-left-td-class table-td'>停止时间</td>
                    <td class='text-align-right-td-class table-td'>{{item.停止时间}}</td>
                  </tr>
                  <tr>
                    <td class='text-align-left-td-class table-td border-bottom-none'>停止医生</td>
                    <td class='text-align-right-td-class table-td border-bottom-none'>{{item.停止医生}}</td>
                  </tr>             
                </table>
        		</div>
            	</div>
              </div>
              <div style='position:fixed;bottom:0px;height:7vh;width:100vw;background:white;border-top:1px solid rgb(230,230,230)'>
              <div @click='checkOrder' style="display:inline-block;width:90vw;height:4vh;margin-top:1.5vh;background:rgb(254, 110, 161);color:white;font-size:1.4rem;line-height:4vh" >校对此医嘱</div>
            </div>
            <div v-show="confirmVisible" style='position:fixed;border:1px solid rgb(230,230,230);background:white;height:24vh;width:85vw;top:50%;left:50%;margin-top:-12vh;margin-left:-42.5vw;border-bottom:1px solid rgb(230,230,230)'>
              <div style='height:6vh;font-size:1.6rem;font-weight:bold;line-height:6vh;border-bottom:1px solid rgb(230,230,230)'>校对医嘱</div>
              <div style='height:12vh;font-size:1.4rem;line-height:10vh;color:rgb(150,150,150)'>校对医嘱后将生成相应的执行单记录，请核实</div>
              <div style='border-top:1px solid rgb(230,230,230)'>
                  <div style='float:left;width:42vw;height:6vh;line-height:6vh;font-size:1.4rem' @click='cancel'>取消</div>
                  <div style='float:left;width:42vw;border-left:1px solid rgb(230,230,230);height:6vh;line-height:6vh;font-size:1.4rem' @click='correct'>确认</div>
              </div>
            </div>
          
            </div>
            
    	  </mt-popup>
   </div>
</template>

<script>
import { Picker } from 'vux'
import {getPat} from "@/config"
import {Indicator} from "mint-ui"
import nheader from '@/views/components/nheader'
export default {
  name: 'PatsOrder',
  data () {
    return {
      	filter:{
          date:0,
          project:'所有',
          type:'长期医嘱',
          state:'所有'
        },
        detailValue:[],
        detailArr:[
            ["长期医嘱","临时医嘱"],
            ["所有","药疗","手术","检查","检验"],
            ["所有","新开","执行","停止","作废"]
        ],
        popupVisible:false,
        OrderDetailVisible:false,
        confirmVisible:false,
        orderId:0,
        orderList:[],
        orderDetailInfo:[]
    }
  },
  components:{Picker,nheader},
  methods :{
      cancel(){
          this.confirmVisible= false
      },
      correct(){
          this.confirmVisible= false
      },
      checkOrder(){
         this.confirmVisible= true
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
          this.getAllOrder();
      },
      
      orderDetail(item){
          let _this = this;
      	  
          this.orderId=item.医嘱id;
          let params ={
            "itemid":_this.orderId
          };
          $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetOrderDetail",
          datatype:"json",
          
          success:function(json){
            let data = JSON.parse(json)
            _this.orderDetailInfo = data;
            _this.OrderDetailVisible = true;
          },
          error:function(){

          }
      })


      },
      closeOrderDetail(){
          this.OrderDetailVisible = false;
          
      },
      getAllOrder(){
        Indicator.open("加载中...")
        let _this = this;
        let pat = getPat();
        let patientid = pat.pat_id;
        let params = {
            "patientid":patientid,
            "kind":this.filter.type,
            "type":this.filter.project,
            "status":this.filter.state
        }

        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/getAllOrder",
          datatype:"json",
          success:function(json){
            let data = JSON.parse(json)
            _this.orderList = data;
            Indicator.close()
          },
          error:function(){

          }
      })
      }
  },
  mounted () {
    this.getAllOrder()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PatsOrder-div{
	height:86vh;
	width:100vw;
	background:rgb(244,244,244);
}
#filter{
	position: fixed;
	padding-top: 1rem;
	padding-bottom: 1rem;
	width: 100vw;
	background: rgb(244,244,244);
}
.icon-zhixingchenggong{
  color:green
}
.icon-icon-{
  color:#FF6666
}
.icon-dengdaizhihang{
  color:red
}
.icon-zuixin{
  color:#99CC66
}
.filter-detail-ul{
  
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
#content{
 display:inline-block;
  margin-top:5.2016rem;
  height:22vh;
  width:100vw;
}
.content-div{
 	display:inline-block;
 	margin-top:2vh;
}
.content-div:first-child{
	margin-top:2vh;
}
.content-title{
 	width:100vw;
  	height:2.5rem;
  	border-top:2px solid rgb(244,244,244);
  	border-bottom:2px solid rgb(244,244,244);
  	//text-align:left;
  	line-height:2.5rem;
  	background:white;
  	font-size:1.4rem;
  	color:rgb(120,120,120)
}
.content-main{
	border-bottom:2px solid rgb(244,244,244);
}
.text-align-left-class{
	float:left;

}
.text-align-right-class{
	float:right
}
.order-td-text-style{
	font-size:1.6rem;
	font-weight:bold;
	text-align:left;
	width:40vw
}
.dosage-td-text-style{
	text-align:right;
	width:50vw;
	color:rgb(245,179,112);
	font-size:1.4rem;
	font-weight:600
}
.order-detail-td-text-style{
	text-align:left;
	font-size:1.3rem;
	color:rgb(120,120,120);

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


