<template>
    <div id="InformItem">
        <nheader :routechoice='routechoice'><span slot='title'>{{this.$route.params.title}}</span><i slot='choice' class='icon iconfont icon-ic_hearing_px' style='font-size:2rem'></i></nheader>
        <div class='item-scroll-div' >
        	<div v-for="item in importantInfoDetail">
        	<div class='layout'>
        	  	<div class='item-time-div'  >
        	  		<div class='item-time'>
        	  			<div>星期三</div>
        	  			<div>15:30</div>
        	  		</div>
        	  	</div>
        	  	<div class='item-desc'  @click='itemDetailShow(item)'>
        	  		<div class='item-desc-from-state-div' >
        	  			<div class='item-desc-from' >{{item.bed}}床 &nbsp; {{item.name}}</div>
        	  			<div class='item-desc-state' >{{item.readed_flag}}</div>
        	  		</div>
        	  		<div class='item-desc-content-div'>
        	  			{{item.content+"..."}}
        	  		</div>
        	  	</div>
        	 </div>
        	 </div>
        </div>


        <mt-popup v-model="showInfoDetail" position="right">
        	<div class='showInfoDetail-div' v-for = 'item in importantInfoDetailInfo'>
        	  <dheader @close='closeItemDetail'><span slot='title'>{{item.bed}}床&nbsp; {{item.name}}</span><i slot='icon' class='icon iconfont icon-ic_hearing_px' style='font-size:2rem'></i></dheader>
        	  <div class='item-detail-scroll-div' >
                <div style='box-sizing:border-box;padding-right:5vw;padding-left:5vw;padding-rgith;padding-top:2vh;padding-bottom:2vh;background:white;width:100vw;text-align:left;border-bottom:1px solid rgb(230,230,230)'>
                  <div style='font-size:1.6rem;'>{{item.title}}</div>
                  <div style='margin-top:.5vh;font-size:1.4rem;color:rgb(150,150,150)'>{{item.time}}</div>
                </div>
                <div style='text-align:left;margin-left:5vw;font-size:1.6rem;margin-top:2vh'>
                  <div>患者：{{item.name}}{{item.bed+'床'}}</div>
                  <div style='margin-top:2vh'>{{item.content}}</div>
                </div>
        	  		
        	  </div>
            <div class='footer-class' @click="linkToPat">
              查看患者详情
            </div>
        	</div>
        </mt-popup>
    </div>
   	
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
import {getUser} from '@/config'; 
import {Indicator} from 'mint-ui'
export default {
  name: 'InformItem',
  data () {
    return {
      routechoice:'goback',
      showInfoDetail:false,
      par_dr:this.$route.params.par,
      patId:1,
      importantInfoDetail:[],
      importantInfoDetailInfo:[]
    }
  },
  components:{nheader,dheader},
  methods :{
   		itemDetailShow(item){
        let _this = this;
        let user = getUser();
          let nurse_id = user[0].row_id;
   			this.showInfoDetail= true;
   			
        let params = {
            "nurseid":nurse_id,
            "informid":item.informid
        }

         $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetInformDetail",
        datatype:"json",
        anysc:false,
        success:function(json){
          let data = JSON.parse(json)
          _this.importantInfoDetailInfo = data;
          
        },
        error:function(e){
          console.log(e);
        }
      })

       $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/ChangeRead",
        datatype:"json",
        anysc:false,
        success:function(json){
          //let data = JSON.parse(json)
            _this.getImportantInfoDetailList()
        
        },
        error:function(e){
          console.log(e);
        }
      })
   		},
      updateRead(){
         let _this = this;
        let user = getUser();
          let nurse_id = user[0].row_id;
        this.showInfoDetail= true;
        
        let params = {
            "nurseid":nurse_id,
            "informid":item.informid
        }
        
        
      },
   		closeItemDetail(){
   			this.showInfoDetail = false
   		},
   		linkToPat(){

   			this.$router.push({name:"PatsInfo", params:{ par: this.importantInfoDetailInfo[0].patid }})
   		},
      getImportantInfoDetailList(){
          Indicator.open("加载中..");
          let _this = this;
          let user = getUser();
          let nurse_id = user[0].row_id;
          let params={
            'nurseid':nurse_id,
            'typeid':_this.par_dr
          }
          $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetInformDetailList",
        datatype:"json",
        anysc:false,
        success:function(data){
          _this.importantInfoDetail = JSON.parse(data);
          Indicator.close();
        },
        error:function(){
        }
      })

      }
   
  },
  mounted () {
    this.getImportantInfoDetailList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-class{
  height:6vh;
  font-size:1.4rem;
  background:rgb(249,143,183);
  color:white;
  line-height:6vh;
  position:fixed;
  bottom:0px;
  width:100vw;
  border-top:1px solid rgb(230,230,230)
}
.showInfoDetail-div{
	  height:100vh;
  	width:100vw;
  	background:white;	
}
.item-scroll-div{
	margin-top:6vh;
	background:rgb(228,228,228);
	height:94vh;
	width:100vw;
	overflow-y:auto
}
.item-time-div{
	height:9vh;
}
.item-time{
	display:inline-block;
	height:5vh;
	margin-top:1.5vh;
	width:20vw;
	background:rgb(188,188,188);
	font-size:1.2rem;
	color:white;
	padding-top:.3vh;
	padding-bottom:.3vh;
}
.item-desc{
	width:90vw;
	height:12vh;
	background:white;
	  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
	padding-left:3vw;
	padding-right:3vw;
}
.item-desc-from-state-div{
	height:4.5vh;
	line-height:4.5vh;
	font-size:1.4rem
}
.item-desc-from{
	float:left
}
.item-desc-state{
	color:rgb(119,87,255);
	float:right
}
.item-desc-content-div{
	text-align:left;
	font-size:1.5rem;
	height:7vh;
	color:rgb(120,120,120);
	line-height:3.5vh
}
.item-detail-scroll-div{
	height:94vh;
	width:100vw;
	background:white
}
</style>



