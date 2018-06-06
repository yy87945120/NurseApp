<template>
    <div id="Work">

    	<div id='main-header'>
         <div class="layout">
         <div id="title"> <span><i class='icon iconfont icon-shouye11' style='font-size:2rem'></i></span>护士app<div style='float:right;width:4vw;text-align:center;background:red;display:inline-block;
         height:2vh;line-height:2vh;margin-top:3.2vh;margin-left:2vw;border-radius:4px;width:4vw;display:inline-block;color:white;font-size:1rem' >{{this.notTimeOutMarkItem.length + this.TimeOutMarkItem.length}}</div><i class='icon iconfont icon-shouye14' style='float:right;font-size:2.3rem;margin-top:.3vh' @click='MarkNoticeVisible = true'></i></div>
         
        </div>
       </div>
      <div class='main-content-div'>
      <div id="main-banner">
        <mt-swipe :auto="5000" style="border-radius:5px">
  <mt-swipe-item><img src='../../assets/img/banner1.jpg' /></mt-swipe-item>
  <mt-swipe-item><img src='../../assets/img/banner2.png'/></mt-swipe-item>

</mt-swipe>
      </div>
     
    	<div class="layout">
    	<div id="nav">
          <ul>
            <li @click="delay(PatsNav,'Pats')" ><div class="circle circle-pat"><i class="icon iconfont icon-zhuyuanguanli icon-nav"></i></div><p class="nav-text">{{PatsNav}}</p></li>
            <li @click="delay(WorkListNav,'WorkList')" ><div class="circle circle-wl"><i class="icon iconfont icon-shouye4 icon-nav"></i></div><p class="nav-text">{{WorkListNav}}</p></li>
            <li @click="delay(ThreeTestNav,'ThreeTest')"><div class="circle circle-tt"><i class="icon iconfont icon-shouye13 icon-nav"></i></div><p class="nav-text">{{ThreeTestNav}}</p></li>
            <li @click="delay(InfusionNav,'Infusion')"><div class="circle circle-sy"><i class="icon iconfont icon-shuye icon-nav"></i></div><p class="nav-text">{{InfusionNav}}</p></li>
            <li @click="delay(NurseFormNav,'NurseRecord')" ><div class="circle circle-nr"><i class="icon iconfont icon-icon9 icon-nav"></i></div><p class="nav-text">{{NurseFormNav}}</p></li>
            <li @click="delay(ImportantInformNav,'ImportantInform')" ><div class="circle circle-ii"><i class="icon iconfont icon-shouye19 icon-nav"></i></div><p class="nav-text">{{ImportantInformNav}}</p></li>
            <!--<li @click="delay(ImportantInformNav,'ImportantInform')" ><div class="circle circle-pat"><i class="icon iconfont icon-shouye18 icon-nav"></i></div><p class="nav-text">{{CheckNav}}</p></li>-->
          </ul>
    		</div>
      </div>
      
        <notice></notice>
       
    	   <div class="hr-bar"></div>

        <div class='title-hr'><div class="layout"><div class="title-hr-bar"></div><div class='title-hr-word'>重要通知</div><div v-show="importantInfo.length!=0" style='float:left;margin-top:1.5vh;margin-left:2vw;height:2vh;width:4vw;background:red;color:white'>{{importantInfo.length}}</div></div></div>
        <div v-show="importantInfo.length==0" style='margin-top:2vh;color:rgb(150,150,150);height:4vh;border-bottom:1px solid rgb(245,245,245)'>无重要通知</div>
        <div>

      <div v-for="item in importantInfo">
         <div class=''>{{item.time}}</div>
                <div class='cell-swipe-div'>
          <mt-cell-swipe   class='cell-info' :right="[
    {
      content: options.soundOption,
      style: { background: 'rgb(77,163,73)', color: '#fff' },
      handler(){tellImportantInfo(item)}
    }]"><div class='content-div' @click='informDetail(item)'>
    <div class='content-img-div'>{{(item.desc).substring(0,1)}}</div>
    <div class='content-title-word-div'>
      <div class='content-word' style='margin-top:.8vh'>{{item.desc}}</div>
      <div style='margin-top:1vh'>{{(item.content).substring(0,12)+'...'}}</div>
    </div>
    <div class='content-time-notice-div'>
   
      <div class='content-notice-div'>
       
      </div>
    </div>
  </div></mt-cell-swipe>
  </div>
        </div>   </div>
  
         <!--<div class='title-hr'><div class="title-hr-bar"></div><div class='title-hr-word'>公告</div></div>-->
        <voice></voice>
        <mt-popup v-model="MarkNoticeVisible" position="left">
            <div class='mark-notice-div'>
                <div class='mark-notice-title'>备忘录闹钟提醒</div>
                <div style='box-sizing:border-box;padding-left:5vw;text-align:left;height:4vh;
                line-height:4vh;font-size:1.4rem;border-bottom:1px solid rgb(230,230,230)'>待办事务 {{notTimeOutMarkItem.length}}</div>
                <div style='width:75vw;margin-left:5vw;height:50vh;overflow-y:auto;'>
                  <div @click='cancelTip(item)' v-show="item.readed == 'N'"  v-for="item in notTimeOutMarkItem" style='padding-right:3vw;box-sizing:border-box;border-bottom:1px solid rgb(230,230,230);height:8vh;width:75vw;'>
                      <div style='height:4vh;line-height:4vh;'>
                          <div style='float:left;'>{{item.title}}</div><div style='float:right;'>{{item.date}} {{item.time}}</div>
                      </div>
                      <div style='height:4vh;line-height:4vh;text-align:left'>{{(item.content).substring(0,10)+"..."}}</div>

                  </div>

                </div>
                <div  style='box-sizing:border-box;padding-left:5vw;text-align:left;height:4vh;
                line-height:4vh;font-size:1.4rem;border-top:1px solid rgb(230,230,230);border-bottom:1px solid rgb(230,230,230)'>已过时事务{{TimeOutMarkItem.length}}</div>
                <div  style='width:75vw;margin-left:5vw;height:35vh;overflow-y:auto;'>
                    <div @click='cancelTip(item)' v-for="item in TimeOutMarkItem" v-show="item.readed == 'N'" style='padding-right:3vw;box-sizing:border-box;border-bottom:1px solid rgb(230,230,230);height:8vh;width:75vw;'>
                      <div style='height:4vh;line-height:4vh;'>
                          <div style='float:left;'>{{item.title}}</div><div style='float:right;'>{{item.date}} {{item.time}}</div>
                      </div>
                      <div style='height:4vh;line-height:4vh;text-align:left'>{{(item.content).substring(0,10)+"..."}}</div>

                  </div>

                </div>
            </div>
        </mt-popup>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import  voice  from '@/views/components/voice';
import  {getUser}  from '@/config';
import notice from '@/views/components/infusion-notice';
export default {
  name: 'Work',
  components:{notice,voice},
  data () {
    return {
      PatsNav:"在院患者",
      WorkListNav:"执行单",
      ThreeTestNav:"三测单",
      InfusionNav:"输液管理",
      NurseFormNav:"护理记录单",
      ImportantInformNav:"重要通知",
      CheckNav:'护记审核',
      MarkNoticeVisible:false,
      importantInfo:[],
      totalMark:0,
      options:{
         "topOption":"<i class='icon iconfont icon-zhiding'>&nbsp;置顶</i>",
         "soundOption":"<i class='icon iconfont icon-ic_hearing_px'>&nbsp;语音</i>",
      },
      notTimeOutMarkItem:[],
      TimeOutMarkItem:[]
    }
  },
  methods :{
   	  delay(titleText,route){
   	  	Indicator.open();
   	  
   	  	setTimeout(() => {
   	  		this.$router.push({name:route, params:{ title: titleText }})
            Indicator.close();   
        },500)
   	  },
      tellImportantInfo(item){
          let text =item.desc + item.time + item.content;
            if(!window.plus) return;
  var main = plus.android.runtimeMainActivity();
                var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
                SpeechUtility.createUtility(main,"appid=5ad6ddb3");

                var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
                var play = SynthesizerPlayer.createSynthesizer(main, null);
                play.startSpeaking(text,null);
      },
      cancelTip(item){
          let text = "备忘录:"+item.title + item.content;
          if(!window.plus) return;
  var main = plus.android.runtimeMainActivity();
                var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
                SpeechUtility.createUtility(main,"appid=5ad6ddb3");

                var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
                var play = SynthesizerPlayer.createSynthesizer(main, null);
                play.startSpeaking(text,null);
      },
      informDetail(item){
        this.$router.push({name:"InformItem", params:{ par: item.row_id,title: item.desc }})
      },
      notice(){
          //console.log(1)
      },
      getImportantInfo(){
      //Indicator.open("加载中..");
      let _this = this;
      let user = getUser();
      let user_id = user[0].row_id;
      let params = {
        "nurseid":user_id
      };  
      $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetNoRead",
        datatype:"json",
        anysc:false,
        success:function(data){
          let json = JSON.parse(data);
          _this.importantInfo=json;
          console.log(_this.importantInfo);
          //Indicator.close();
        },
        error:function(){
        }
      })
    },
    getEvent(){

    },
    getOrderDetail(){

    },
    getMarkItem(){
      Indicator.open("加载中..");
      let _this = this;
      let user = getUser();
      let user_id = user[0].row_id;
      let params = {
        "nurse_id":user_id
      }; 
      $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/Yzf/getMarkItemMethodYzf",
        datatype:"json",
        anysc:false,
        success:function(data){
          let json = JSON.parse(data);
          _this.notTimeOutMarkItem = json.notTimeOut;
          _this.TimeOutMarkItem = json.timeOut;
          
          
          Indicator.close();
        },
        error:function(){
        }
      })
    }
      
  },
  mounted () {

    this.getImportantInfo();
    //setInterval(()=>{
    //    this.getImportantInfo();
    //},30000)
    this.getMarkItem();
    
    
 

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title{
  
  text-align:left;
  font-size:1.6rem
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
  margin-top:1vh;
  margin-bottom:1vh
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
.main-content-div{
  width:100vw;
  height:84vh;
  overflow-y:auto;
}
.icon-shouye11{
  
}
.mark-notice-title{
  height:6vh;
  line-height:6vh;
  padding-left:5vw;
  text-align:left;
  font-size:1.6rem;
  border-bottom:1px solid rgb(230,230,230);
  color:white;
  background:rgb(249,143,183)
}
#main-header{
  height:8vh;
  width:100vw;
  line-height:8vh;
  background:white
}
.mark-notice-div{
  width:80vw;
  height:100vh;

}
#main-banner{
  height:20vh;
  width:90vw;
  display:inline-block;
  margin-top:2vh auto 0vh;
  background:#ccc;
  border-radius:5px
}
#main-banner img{
  height:100%;
  width:100%;
  border-radius:5px
}
#nav{
	margin:0vh auto 0vh;
  display:inline-block
}
#nav>ul>li{
  float:left;
  width:22.5vw;
  margin-top:3vh;
 
}
#delayLoading{
  position:absolute;
  left:45%;
  top:45%;
  transform:translate(-50% -50%);
}



.circle{
  width: 14vw; 
  height: 14vw;
  margin:0px auto; 
   
  -moz-border-radius: 50px; 
  -webkit-border-radius: 50px; 
  border-radius: 50px;
  box-shadow:0px 5px 10px rgb(150,150,150);
  line-height:14vw;
}
.icon-nav{
  font-size:3.2rem;
  color:white
}
.nav-text{
  font-size:1.6rem;
  margin-top:2.5vh;
  color:rgb(80,80,80)
}
.circle-pat{
  background:rgb(138,217,218)
}
.circle-wl{
  background:rgb(127,198,254)
}
.circle-tt{
   background:rgb(252,156,116)
}
.circle-sy{
   background: rgb(249,143,183);
}
.circle-nr{
  background:rgb(127,198,254)
 } 
.circle-ii{
   background: rgb(249,143,183);
 
}
.hr-bar{
  height:2vh;
  width:100vw;
  background:rgb(244,244,244);
  margin-top:2vh
}


.title-hr{
  height:5vh;
  border-radius:3px;
  border-bottom:1px solid rgb(244,244,244); 
}
.title-hr-bar{
  float:left;
  height:5vh;
  width:2vw;
  background:rgb(254, 110, 161);
  border-radius:3px 0px 0px 3px;
}
.title-hr-word{
  float:left;
  line-height:5vh;
  margin-left:1.5vw;
  font-size:1.4rem
}
</style>

