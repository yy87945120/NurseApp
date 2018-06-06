<template>
    <div id="InfusionNotice">
        <div  :class="arrLength==0?'null-notice':(!seeMore?'notice-box':'notice-box-see')"  @click="seeMore = !seeMore">
           
                       需处理数目:{{arrLength}}人
                
                  
                  <table v-show="seeMore" style="width:100%">

                      <tr v-for="item in List">
                        <div  v-for="items in item.userInfo">
                        <td>{{items.name}}</td> 
                        <td><countdown :value="item.needTime" :start="true"></countdown></td> 
                        <td><span>{{item.dep}}</span></td> 
                        <td><span>{{items.bed}}床</span></td> 
                         </div>
                      </tr>
                  </table>
                  
              
         
        </div>
    </div>
</template>

<script>
import {Countdown} from 'vux';
import {getConfig,getUser} from '@/config';
//import { getInfusion } from '@/api/api';
import {Indicator} from 'mint-ui';
export default {
  name: 'InfusionNotice',
  components:{Countdown},
  data () {
    return {
      show:false,
      seeMore:false,
      List:[],
      arrLength:0,
      infusion:[]
    }
  },
  methods :{


      getInfusionData(){
        let config = getConfig();
        let user = getUser();
        let nurse_id = user[0].row_id;
         
      let _this = this;
      let par = {
        "nurse_id":nurse_id
      }
       
       Indicator.open("加载中...")

          $.ajax({
            data:par,
            type:"post",
            url:"http://120.24.73.75:8200/CI/index.php/Yzf/getInfusionNoticeMethod",
            datatype:"json",
           
            success:function(data){
              Indicator.close();
              _this.infusion = JSON.parse(data);

              _this.infusion.forEach(function(item){

                  if(item.needTime < 1800){
                    _this.List.push(item);
                  }
              });
              _this.arrLength = _this.List.length;
              if(!window.plus){
                  return;
              }else{
              //yzf
                  if(_this.arrLength > 0){
              if(config.voiceOn){
                 var main = plus.android.runtimeMainActivity();
                var SpeechUtility = plus.android.importClass('com.iflytek.cloud.SpeechUtility');
                SpeechUtility.createUtility(main,"appid=5ad6ddb3");

                var SynthesizerPlayer = plus.android.importClass('com.iflytek.cloud.SpeechSynthesizer');
                var play = SynthesizerPlayer.createSynthesizer(main, null);
                play.startSpeaking('当前有'+_this.arrLength+'位病人需要关注输液',null);
              }
              if(config.shakeOn){
                plus.device.vibrate( 2000 );
              }
                
              
              }
              }



            },
            error:function(e){
            console.log(e);
            }
          });

     
        }
  },
  mounted () {
  
    this.getInfusionData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#InfusionNotice{
  position:fixed;
  right:0;
  top:6.67rem;
  index:99;
  
}
.null-notice{
  width:0vw;
  height:0rem;
  
  border-radius:10px 0 0 10px;
  transition:all .3s;
  
}


.notice-box{
  width:15vw;
  height:2.668rem;
  border-left:3px green solid;
  border-bottom:3px green solid;
  border-top:3px green solid;
  border-radius:10px 0 0 10px;
  background:white;
  transition:all .3s;
}

.notice-box-see{
  width:60vw;
  border-left:3px green solid;
  border-bottom:3px green solid;
  border-top:3px green solid;
  border-radius:10px 0 0 10px;
  background:white;
  border-radius:10px 0 0 10px;
   
}
</style>