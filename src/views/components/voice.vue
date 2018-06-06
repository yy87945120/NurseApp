<template>
    <div id="Voice">
        <div class='voice-icon' @click='startRecognize'><i class='icon iconfont icon-yuyin1'></i></div>
        <div class='tip' v-show='showVisible'>
          <div class='tip-title'>
            <span class='tip-title-content' >{{CID}}关于 {{text}} 可能的操作：</span><span class='close-icon'><i class='icon iconfont icon-guanbi' style='font-size:2.4rem' @click='showVisible = false'></i></span>
          </div>
          <div class='tip-content'>   
            <ol>
              <!--<li class='tip-content-li' @click="goTO('scanResult','')">查看 {{text}} 床病人扫码结果</li>-->
              <li class='tip-content-li' @click="goTO('PatsInfo','PatOrder')">查看 {{text}} 床病人医嘱详情</li>
              <li class='tip-content-li' @click="goTO('PatsInfo','PatNurseRecord')">查看 {{text}} 床病人护理记录</li>
              <li class='tip-content-li' @click="goTO('PatsInfo','PatBasicInfo')">查看 {{text}} 床病人基础信息</li>
              <li class='tip-content-li' @click="goTO('PatsInfo','PatMedicalRecord')">查看 {{text}} 床病人病历页</li>
              <li class='tip-content-li' @click="goTO('PatsInfo','PatWorkList')">查看 {{text}} 床病人执行单详情</li>
              <li class='tip-content-li' @click="goTO('PatsInfo','PatThreeTest')">查看 {{text}} 床病人三测单信息</li>
              
            </ol>       
          </div>
          <div class='tip-footer'>
            <label for='selection'>
                病区选择：
            </label>
            <select v-model="depOption">
              <option v-for='item in depList' :value="item.row_id">
                  {{item.dep_desc}}
              </option>
            </select>
          </div>
        </div>
    </div>
</template>

<script>
import {getDepartment} from "@/config";
export default {
  name: 'Voice',
  data () {
    return {
      text:'',
      depList:[],
      showVisible:false,
      CID:'',
      depOption:0
    }
  },
  components:{},
  methods :{
    getCid(){
      if (!window.plus) return;
      this.CID = plus.push.getClientInfo();
      alert(this.CID);
    },
    startRecognize () {
        let _this = this;
        if (!window.plus) return;
        var options = {};
        options.engine = 'iFly';
        _this.text = '';
        plus.speech.startRecognize( options, function ( s ) {
        let filter = s.replace(/[^0-9]/ig,"");
        _this.text += filter;
        _this.showVisible = true;
      }, function ( e ) {
        alert( "语音识别失败："+e.message );
      } );
    },
    goTO(route,to){
      let _this = this;
      let params = {
          "bed_desc":this.text,
          "dep_id":this.depOption
      }
      $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/getExactPatInfoByBedDesc",
          datatype:"json",
          async:false,
          success:function(json){
            let data = JSON.parse(json);
            if(data.status==1){
              localStorage.removeItem('pats');
              let patsInfo = {
                pat_id:data.res[0].pat_id,
                pat_name:data.res[0].pat_name,
                bed_desc:data.res[0].bed_desc,
                nurse_id:data.res[0].nurse_id,
                doctor_id:data.res[0].doctor_id
              };
              localStorage.setItem('pats', JSON.stringify(patsInfo));
              _this.$router.push({name:route, params:{ redirect: to }})
            }else{
              alert("抱歉，本科室无此床位或者床位不存在");
              return;
            }
          },
          error:function(e){
            console.log(e);
          }
        })
    }
  },
  mounted () {
    this.depList = getDepartment();
    let arr = this.depList;
    console.log(arr);
    this.depOption = arr[0].row_id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.close-icon{
  float:right;
  right:5vw;
  margin-right:3vw;

}
.tip{
  height:60vh;
  border-radius:5px;
  position:fixed;
  z-index:99;
  top:50%;
  left:50%;
  margin-left:-40vw;
  margin-top:-30vh;
  width:80vw;
  z-index:99;
  background:white; 
  border:1px solid rgb(230,230,230)
}
.tip-title{
  height:6vh;
  width:80vw;
  line-height:6vh;
  border-bottom:1px solid rgb(230,230,230)
}
.tip-title-content{
  float:left;
  margin-left:3vw;
  font-size:1.4rem
}
.tip-content{
  width:77vw;
  margin-left:3vw;
  height:47vh;
  overflow-y:auto;
} 
.tip-content-li{
  width:77vw;
  height:6vh;
  line-height:6vh;
  text-align:left;
  font-size:1.4rem;
  list-style-type:block;
  list-style-position:inside;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */;
  border-bottom:1px solid rgb(230,230,230)
  
}
.tip-footer{
  height:6vh;
  width:80vw;
  line-height:6vh;
  font-size:1.4rem;
  text-align:left;
  border-top:1px solid rgb(230,230,230);
  padding-left:3vw;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.voice-icon{
  position:fixed;
  width:14vw;
  height:14vw;
  background:rgb(254, 110, 161);
  border-radius:50%;
  box-shadow: 0px 5px 10px rgb(150,150,150);
  bottom:12vh;
  right:8vw
}
.icon-yuyin1{
  color:white;
  line-height:14vw;
  font-size:3rem;

}
</style>


