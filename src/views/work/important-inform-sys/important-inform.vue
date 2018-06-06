<template>
    <div id="ImportantInform">
        <nheader :routechoice='router'><span slot='title'>重要通知</span><div slot='choice' class='notice-num' v-show='remain != 0' @click='toggleShow'>{{remain}}</div></nheader>
        <div class='scroll-div'>
        <div v-for='item in importantInfo' class='cell-swipe-div'>
        	<mt-cell-swipe   class='cell-info' :right="[
    {
      content: options.soundOption,
      style: { background: 'rgb(77,163,73)', color: '#fff' },
      handler(){deleteInfo(item)}
    }]"><div class='content-div' @click='informDetail(item)'>
  	<div class='content-img-div'>{{(item.title).substring(0,1)}}</div>
  	<div class='content-title-word-div'>
  		<div class='content-word' style='margin-top:.8vh'>{{item.title}}</div>
  		<div style='margin-top:1vh'>{{(item.content).substring(0,12)+"..."}}</div>
  	</div>
  	<div class='content-time-notice-div'>
  		<div class='content-time'>{{item.createtime}}</div>
  		<div class='content-notice-div' v-show='item.noreadnum>0'>
  			<div class='content-notice' >{{item.noreadnum}}</div>
  		</div>
  	</div>
  </div></mt-cell-swipe>
  </div>
  	</div>
        
    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
import {Indicator} from 'mint-ui'
import {getUser} from '@/config'
export default {
  name: 'ImportantInform',
  data () {
    return {
      router:'gohome',
      remain:0,
      toggleShow:true,
      options:{
      	 "topOption":"<i class='icon iconfont icon-zhiding'>&nbsp;置顶</i>",
      	 "soundOption":"<i class='icon iconfont icon-ic_hearing_px'>&nbsp;语音播报</i>",
      },
      title:'手术通知',
      importantInfo:[]
    }
  },
  components:{nheader,dheader},
  methods :{
    deleteInfo(item){
  		console.log(item)
  	},
  	informDetail(item){
      
  		this.$router.push({name:"InformItem", params:{ par: item.typeid,title: item.title }})
  	},
  	closeDetailInfo(){
  		
  	},
    getImportantInfo(){
        console.log(1);
      Indicator.open("加载中..");
      let _this = this;
      let user = getUser();
      let user_id = user[0].row_id;
      let params = {
        "nurseid":user_id
      };  
      $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetTypeInformList",
        datatype:"json",
        anysc:false,
        success:function(data){
          let json = JSON.parse(data);
          _this.importantInfo=json;
         
          Indicator.close();
        },
        error:function(){
        }
      })
    }
  },
  mounted () {
  //_this.remain+=item.noreadnum
        //console.log( _this.remain);
       // console.log(item.noreadnum)
    let _this = this;
    this.getImportantInfo();
    console.log(_this.importantInfo);
    this.remain = 0;
    this.importantInfo.forEach(function(item){
       console.log(11);
    })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notice-num{
	height:3vh;
	width:7vw;
	background:rgb(244,67,54);
	color:white;
	line-height:3vh;
	border-radius:50%;
	margin-top:1.6vh;
	font-size:1.4rem
}
.scroll-div{
	height:90vh;
	width:100vw;
	background:white;
	margin-top:7vh;
	padding-top:1vh;
	padding-bottom:1vh;
}
.cell-swipe-div:first-child{
	margin-top:0vh;
}
.cell-swipe-div{
	margin-top:1.5vh;
}

.cell-info{
	position:relative;
	height:9vh;
}
.mint-cell{
	min-height:9vh;
	border-bottom:1px solid rgb(230,230,230);

}

.content-div{
	position:absolute;
	height:9vh;
	width:90%;
	top:0px;
	left:5%;
}
.content-img-div{
	width:16vw;
	height:9vh;
	box-sizing:border-box;
	border:1px solid rgb(230,230,230);
	position:absolute;
  line-height:9vh;
  font-size:3rem
	
}

.content-title-word-div{
	position:absolute;
	width:59vw;
	height:9vh;
	text-align:left;
	margin-left:17vw;
	padding-top:5px;
	padding-left:5px;
	font-size:1.6rem;

}
.content-time-notice-div{
	position:absolute;
	width:15vw;
	right:0px;
	height:9vh;
	padding-top:5px;
	
}
.content-time{
	color:rgb(60,60,60)
}
.content-word{
	color:black
}
.content-notice{
	display:inline-block;
	height:2.5vh;
	width:6vw;
	font-size:1.3rem;
	color:white;
	line-height:2.5vh;
	background:rgb(244,67,54);
	border-radius:40%
}
.content-notice-div{
  margin-top:1.5vh
}
</style>


