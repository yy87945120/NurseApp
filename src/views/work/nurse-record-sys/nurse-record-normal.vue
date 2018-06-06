<template>
    <div id="NurseRecordNormal">
        <nheader routechoice='goback'><span slot='title'>{{patInfoList[0].床位号+'床'}} {{patInfoList[0].姓名}}</span><span @click='newRecordMethod' slot='choice'><i class='icon iconfont icon-plus'></i><span style='font-size:1.4rem'>&nbsp;添加</span></span></nheader>
        <div id="pats-list">
              <div class='pats-list-div'>
            <table class="pats-list-table" v-for='item in patInfoList'>
              <tr >
                <td class='pats-list-title pats-bed'>{{item.床位号+'床'}}</td>
                <td class="pats-name">{{item.姓名}}</td>
                <td class="pats-sex">{{item.性别}}</td>
                <td class="pats-age">{{item.年龄}}</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>入院:</td>
                <td colspan='4' class="pats-list-text-align-left">{{item.入院时间}}</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>医生:</td>
                <td colspan='4' class="pats-list-text-align-left">{{item.住院医生}}</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>诊断:</td>
                <td colspan='4' class="pats-list-text-align-left">{{"入院诊断:"+item.入院诊断}}</td>
              </tr>
            </table>
        </div>
         </div>
         <div class='time-filter' style='border-bottom:1px solid rgb(230,230,230)'>
          <div class='layout'>
            <div class='time-filter-normal time-filter-pre'><i class='icon iconfont icon-next' @click='pre'></i></div>
            <div class='time-filter-normal time-filter-date' @click='datePickerVisible = true'>{{dateArr[dateIndex-1]}}</div>
            <div class='time-filter-normal time-filter-next'><i  class='icon iconfont icon-goLeft'  @click='next'></i></div>
           </div>
         </div>
         <div class='record-scroll-div'>
         <div v-show='recordList.length==0' style='margin-top:5px;font-size:1,4rem;color:rgb(150,150,150)'>无护理记录</div>
            <div class='record-main-content-div' v-for = 'item in recordList'>
              <div class='record-time'>
                <div class='layout'>
                  <div class='record-time-left'>{{item.record_time}}</div>
                  <div class='record-time-right' @click="sign(item)" v-show="item.sign_signal=='N'">点击签名</div>
                  <div class='record-time-right' style='color:blue' @click="shenhe(item)" v-show="item.sign_signal=='Y' && item.check_signal=='N'">审核</div>
                 </div>
              </div>
              
              <div class='record-content' @click='editContent1(item)'>
                <div class='layout'>
                  <div class='record-content-left'>{{tempertureType[item.temperature_type_dr].name}}:{{item.temperature+'℃'}} 呼吸:{{item.breathe}} 血压:{{item.b_pressure}}mmHg 脉搏:{{item.sphygmus}} 病情描述:{{item.pat_situation}}</div>
                  <div class='record-content-right'><i class='icon iconfont icon-goLeft'></i></div>
                </div>
              </div>

            </div>


         </div>

         <mt-popup v-model="newRecordVisible" position="bottom">
            <div class='popup-div'>
                <dheader @close='closeNewRecordMethod'><span slot='title'>{{patInfoList[0].床位号+'床'}} {{patInfoList[0].姓名}}</span><span slot='icon'><i class='icon iconfont icon-shouye2' style='font-size:2.4rem' @click='submit'></i></span></dheader>
               <div class="content-main">
               <div v-show='typeShow' style='position:absolute;width:80vw;border:1px solid rgb(230,230,230);box-shadow:5px 5px 5px rgb(40,40,40);background:white;z-index:99;margin-left:10vw;top:30%;'>
                <div @click='chooseTypeMethod(item)' v-for='item in arrType' style='height:6vh;width:80vw;line-height:6vh;font-size:1.4rem;text-align:center;border:1px solid rgb(230,230,230)'>{{item.name}}</div>
              </div>
                <table class='content-table'>
                  <tr @click='pickDetailNewRecord' class='table-tr'>
                    <td class='text-align-left-td-class table-td'>日期</td>
                    <td class='text-align-right-td-class table-td'>{{filterNewRecord.ward}}</td>
                  </tr>
                  <tr @click='pickDetailNewRecord' class='table-tr'>
                    <td class='text-align-left-td-class table-td'>时间</td>
                    <td class='text-align-right-td-class table-td'>{{filterNewRecord.time}}</td>
                  </tr>
                </table>

                <table class='content-table'>

                  <tr  class='table-tr'> 
                    <td class='text-align-left-td-class table-td' @click='chooseTypeShow(1)'>{{tep}}(℃)</td>
                    <td class='text-align-right-td-class table-td'><input type='text' v-model='dataList.tempra' placeholder='请填写体温' class='input-style'></td>
                   
                  </tr>
                  <tr  class='table-tr'>
                    <td class='text-align-left-td-class table-td'>血压(mmHg)</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='dataList.blood' placeholder='请填写血压' class='input-style'></td>
                   
                  </tr>
                  <tr  class='table-tr'>
                    <td class='text-align-left-td-class table-td'>呼吸(次/分)</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='dataList.breath' placeholder='请填写呼吸' class='input-style'></td>
                   
                  </tr>
                  <tr  class='table-tr'>
                    <td class='text-align-left-td-class table-td'>脉搏(次/分)</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='dataList.pulse' placeholder='请填写脉搏' class='input-style'></td>
                   
                  </tr>
                
                </table>
                <div style='margin-top:2vh;display:inline-block;text-align:left;width:90vw;font-size:1.4rem;color:rgb(150,150,150)'>病情描述</div>
                <div >
                
                    <textarea  style='width:90vw;resize:none;height:13.34rem;font-size:1.4rem' placeholder="请输入护理事件"  v-model='dataList.content'></textarea>
                </div>

            </div>
        <div style='height:8vh;width:100vw;position:fixed;bottom:0px;border-top:1px solid rgb(230,230,230)'>
            <div  style='height:5vh;background:rgb(249,143,183);color:white;font-size:1.4rem;margin-top:1.5vh;margin-left:5vw;line-height:5vh;width:90vw;position:fixed;' @click='getInfofrom'>同步三测单数据</div>
        </div>
            </div>
         </mt-popup>

          <mt-popup v-model="editRecordVisible" position="right" >
            <div class='popup-div'>
                <dheader @close='closeEditRecordMethod'><span slot='title'>{{patInfoList[0].床位号+'床'}} {{patInfoList[0].姓名}}</span><span slot='icon' @click='deleteRecord'><i class='icon iconfont icon-icon10'></i><span style='font-size:1.4rem'>&nbsp;删除</span></span></dheader>

               <div class="content-main">
               <div v-show='typeShow' style='position:absolute;width:80vw;border:1px solid rgb(230,230,230);box-shadow:5px 5px 5px rgb(40,40,40);background:white;z-index:99;margin-left:10vw;top:30%;'>
                <div @click='chooseTypeMethod(item)' v-for='item in arrType' style='height:6vh;width:80vw;line-height:6vh;font-size:1.4rem;text-align:center;border:1px solid rgb(230,230,230)'>{{item.name}}</div>
              </div>
                <table class='content-table'>
                  <tr @click='pickDetailNewRecord'class='table-tr'>
                    <td class='text-align-left-td-class table-td'>日期</td>
                    <td class='text-align-right-td-class table-td'>{{filterNewRecord.ward}}</td>
                  </tr>
                  <tr @click='pickDetailNewRecord'class='table-tr'>
                    <td class='text-align-left-td-class table-td'>时间</td>
                    <td class='text-align-right-td-class table-td'>{{filterNewRecord.time}}</td>
                  </tr>
                </table>

                <table class='content-table'>

                  <tr class='table-tr'> 
                    <td class='text-align-left-td-class table-td' @click='chooseTypeShow(1)'>{{tep}}</td>
                    <td class='text-align-right-td-class table-td'><input type='text' v-model='editDataList.tempra' placeholder='请填写体温' class='input-style'></td>
                   
                  </tr>
                  <tr class='table-tr'>
                    <td class='text-align-left-td-class table-td'>血压</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='editDataList.blood' placeholder='请填写血压' class='input-style'></td>
                   
                  </tr>
                  <tr class='table-tr'>
                    <td class='text-align-left-td-class table-td'>呼吸</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='editDataList.breath' placeholder='请填写呼吸' class='input-style'></td>
                   
                  </tr>
                  <tr class='table-tr'>
                    <td class='text-align-left-td-class table-td'>脉搏</td>
                    <td class='text-align-right-td-class table-td'><input type='text'  v-model='editDataList.pulse' placeholder='请填写脉搏' class='input-style'></td>
                   
                  </tr>
                
                </table>
                <div style='margin-top:2vh;display:inline-block;text-align:left;width:90vw;font-size:1.4rem;color:rgb(150,150,150)'>病情描述</div>
                <div >
                
                    <textarea style='width:90vw;resize:none;height:13.34rem;font-size:1.4rem' placeholder="请输入护理事件"  v-model='editDataList.content'></textarea>
                </div>

            </div>
        <div style='height:8vh;width:100vw;position:fixed;bottom:0px;border-top:1px solid rgb(230,230,230)'>
            <div  style='height:5vh;background:rgb(249,143,183);color:white;font-size:1.4rem;margin-top:1.5vh;margin-left:5vw;line-height:5vh;width:90vw;position:fixed;' @click='updateInfo'>保存更新</div>
        </div>



            </div>
         </mt-popup>
 <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>
        
        <mt-popup
          v-model="datePickerVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="datePickerVisible = !datePickerVisible">取消</div><div class='detail-picker-btn' @click="datePickerConfirm">确认</div>
            <picker :data='dateArrList' v-model='dateArrChoice' class='detailPicker'></picker> 
        </mt-popup>


    </div>
</template>

<script>
import nheader from '@/views/components/nheader'
import dheader from '@/views/components/dheader'
import {getPat,getUser} from '@/config'
import {Picker} from 'vux'
import { MessageBox,Indicator } from 'mint-ui';


export default {
  name: 'NurseRecordNormal',
  data () {
    return {
      datePickerVisible:false,
      dateArrList:[[]],
      editStatus:false,
      newRecordVisible:false,
      editRecordVisible:false,
      popupVisibleNewRecord:false,
      dateIndex:0,
      NurseId:0,
      dateArrChoice:[],
        detailArrNewRecord:[
          [],
          ["04:00:00","08:00:00","12:00:00","16:00:00","20:00:00","00:00:00"]
      ],
      tep:'腋下体温',
      filterNewRecord:{
          date:0,
          ward:"2018-06-03",
          time:"08:00:00"
      },
      PatId:1,
      typeShow:false,
      
      arrType:[],
      tempertureType:[
          {
              "name":"腋下体温",
              "value":0
          },
          {
              "name":"口腔体温",
              "value":1
          },
          {
              "name":"直肠体温",
              "value":2
          }
      ],
      detailValueNewRecord:[],
      editDataList:{
          tempra:'',

          pulse:'',
          rate:'',
          breath:'',
          blood:'',
          content:''
      },
      dataList:{
          tempra:'',

          pulse:'',
          rate:'',
          breath:'',
          blood:'',
          content:''
      },
      tepId:0,
      dateArr:[],
      dateFormat:"",
      patInfoList:[],
      recordList:[],
      pickShow:false,
      recordId:0,
      inhospitalDate:""
    }
  },
  components:{nheader,dheader,Picker},
  methods :{
      clean(){
        let data = this.dataList;
          for(var i in data){
              data[i] = '';
          }
      },
      datePickerConfirm(){
          
          this.dateIndex = (parseInt(this.dateArrChoice[0])+1);

          console.log(this.dateArrChoice[0]);

          console.log(this.dateIndex);
          this.datePickerVisible=false;
          this.getPatInfoList();
      },
      shenhe(item){
      
      let _this =this;
          MessageBox({
       $type:'prompt',
        title:'医嘱密码',
        message:'请填写医嘱密码',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {
          Indicator.open("审核中...")
          let parmas={
          "passwprd":value,
          "recordid":item.row_id,
          "nurseid":_this.NurseId
        }
 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/Shenhe",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                _this.getPatInfoList();
                Indicator.close();
                alert(data.message)
                return ;
            }else{
                Indicator.close();
                alert(data.message);
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
     closeNewRecordMethod(){
        this.newRecordVisible = false;
        this.clean();
     },
      handleDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false;

          this.filterNewRecord.ward = this.detailValueNewRecord[0];
          this.filterNewRecord.time = this.detailValueNewRecord[1];
          
      },

      //yzf
      deleteRecord(){
          //this.recordId
          let parmas = {
            'recordId':this.recordId
          };


 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetExecute",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
               _this.getPatInfoList();
                Indicator.close();
                alert(data.message)
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

      },
      updateInfo(){
          let _this =this;
            let params = {
            "nurseid":_this.NurseId,
            "temtype":_this.tepId,
            "patid":_this.PatId,
            "tempra":_this.editDataList.tempra,
            "blood":_this.editDataList.blood,
            "breath":_this.editDataList.breath,
            "pulse":_this.editDataList.pulse,
            "condition":_this.editDataList.content,
            "date":this.filterNewRecord.ward,
            "time":this.filterNewRecord.time
        };

           $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/UpNurseRe",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
           if(data.code == 200){

              _this.closeEditRecordMethod();
              _this.getPatInfoList();
           }else{
              alert(data.message);
           }
           },
        error:function(e){
          console.log(e)
        }
      })



      },
      getDateChange(datestr){  
        var temp = datestr.split("-");  
        var date = new Date(temp[0],temp[1]-1,temp[2]);  
          
        return date;  
      },
      getDateMethod(sta,end){
        var date_all=[],i=0;  

        var startTime = this.getDateChange(sta);  
        var endTime = this.getDateChange(end);  
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


      submit(){
 

        let _this = this;



        let params = {
            "nurseid":_this.NurseId,
            "temtype":_this.tepId,
            "patid":_this.PatId,
            "tempra":_this.dataList.tempra,
            "blood":_this.dataList.blood,
            "breath":_this.dataList.breath,
            "pulse":_this.dataList.pulse,
            "condition":_this.dataList.content,
            "date":this.filterNewRecord.ward,
            "time":this.filterNewRecord.time
        };
     
       


           $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/AddNurseRecord",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
           if(data.code == 200){

              _this.closeNewRecordMethod();
              _this.getPatInfoList();
           }else{
              alert(data.message);
           }
           },
        error:function(e){
          console.log(e)
        }
      })



      },
      pickDetailNewRecord(){
          this.popupVisibleNewRecord = true
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },
     closeEditRecordMethod(){
        this.editRecordVisible = false
     },
     newRecordMethod(){
        this.newRecordVisible = true
     },
     sign(item){
      let _this =this;
     
    MessageBox({
        $type:'prompt',
        title:'医嘱密码',
        message:'请填写医嘱密码',
        showCancelButton:true,
        inputPattern: /\S/,    //正则条件
        inputErrorMessage:'原因不能为空',
        showInput:true
    }).then(({ value, action }) => {
    Indicator.open("签名中...");
        if(action != "cancel"){
            let parmas={
          "passwprd":value,
          "recordid":item.row_id,
          "nurseid":_this.NurseId
        }
        $.ajax({
   
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/Write",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                _this.getPatInfoList();
                Indicator.close();
                alert(data.message);
                return ;
            }else{
                alert(data.message);
                Indicator.close();
                return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
        }
        
    }).catch((e)=>{
      console.log(e);
    });


     },
     editContent1(item){
      let _this = this;
      this.recordId = item.row_id;
      console.log(this.recordId);
      if(item.sign_signal == 'Y' ){
            alert("已经签名无法修改");
            return;
          }
          if(item.check_signal == 'Y'){
            alert("已经审核无法修改");
            return;
          }
          _this.editRecordVisible=true;
        console.log(item.temperature);

      _this.editDataList['tempra'] = item.temperature
      _this.editDataList['pulse'] = item.sphygmus

      _this.editDataList['breath'] = item.breathe
      _this.editDataList['blood'] = item.b_pressure
      _this.editDataList['content'] = item.pat_situation

     },
     pre(){
        if(this.dateIndex == 1)return;
        this.dateIndex--;
        this.getPatInfoList();
     },
     next(){
        if(this.dateIndex == this.dateArr.length)return;
        this.dateIndex++;
        this.getPatInfoList();
     },
     editContent2(){
        if(!this.editStatus){
            MessageBox({
        $type:'confirm',
        title:'提示',
        confirmButtonText:'申请确认',
        message:'此护理记录已经签名确认不可修改<br/>是否申请修改?',
        showCancelButton:true
    }).then(( value ) => {
        console.log(value)
    }).catch((e)=>{
        console.log(e)
    });
        }
     },
     getPatientId(){
        let pat = getPat();
        this.PatId = pat.pat_id;
     },
     dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
},
  getInfofrom(){
      let _this = this;
      let patid = this.PatId;
      let datetime = this.filterNewRecord.ward+" "+this.filterNewRecord.time;
      let parmas = {
          'patid':patid,
          'date':datetime
      }

       $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetThreeData",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json);
            //yzf
            if(data.code==200){

              _this.tepId = data.res[0].temp_type
              _this.tep = _this.tempertureType[data.res[0].temp_type].name;
                _this.dataList["tempra"] = data.res[0].temperature;
                 _this.dataList["pulse"] = data.res[0].sphygmus;
          
                   _this.dataList["breath"] = data.res[0].breathe;
                    _this.dataList["blood"] = data.res[0].b_pressure;

            }else{
              alert(data.message)
            }
        },
        error:function(){

        }
        })
      
  },
  getNurseId(){

      let user = getUser();
      this.NurseId = user[0].row_id;
  },
  getFirstList(){
     let _this = this;
    
    
    let parmas = {
        "nurseid":_this.NurseId,
         "patid":_this.PatId,
         "date":this.dateFormat
    };


 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetPatList",
        datatype:"json",
        async:false,
        success:function(json){
            let data = JSON.parse(json)

            if(data.code==200){
                _this.patInfoList =  data.info;
                _this.recordList = data.record;
                let filter = data.info[0].入院时间.split("(");
                _this.inhospitalDate = filter[0];
                
                return ;
            }
            if(data.code==400){
                alert(data.message);
                return ;
            }
           

            
        },
        error:function(e){
          console.log(e)
        }
      })
  },
  getPatInfoList(){
    let _this = this;
    
    
    let parmas = {
        "nurseid":_this.NurseId,
         "patid":_this.PatId,
         "date":this.dateArr[this.dateIndex-1]
    };


 $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetPatList",
        datatype:"json",
        async:false,
        success:function(json){
            let data = JSON.parse(json)

            if(data.code==200){
                _this.patInfoList =  data.info;
                _this.recordList = data.record;
                let filter = data.info[0].入院时间.split("(");
                _this.inhospitalDate = filter[0];
                
                return ;
            }
            if(data.code==400){
                alert(data.message);
                return ;
            }
           

            
        },
        error:function(e){
          console.log(e)
        }
      })
  },
  chooseTypeMethod(item){
        if(this.type==1){
          this.tep = item.name;
          this.tepId = item.value
          this.typeShow = false;
        }else{
          this.nurseEvent = item.name;
          this.nurseEventId = item.value
          this.typeShow = false;
        }
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


//获取格式化日期
  
     
  },
  mounted () {
    let _this = this ;
    this.getPatientId();
    this.getNurseId();
    let crtTime = new Date();
    let date = this.dateFtt("yyyy-MM-dd",crtTime);
    this.dateFormat = date;
    this.filterNewRecord.ward = date;
    this.detailArrNewRecord[0].push(date);
    this.getFirstList();
    console.log(_this.inhospitalDate,_this.dateFormat)
    this.getDateMethod(_this.inhospitalDate,_this.dateFormat);

    this.dateIndex = this.dateArr.length;

    this.dateArr.forEach(function(item,index){
          let arr = {
             "name":item,
             "value":index
          }
          _this.dateArrList[0].push(arr);
    })
  
    console.log(_this.dateArrList)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#NurseRecordNormal{
  background:rgb(248,248,248)
}
.table-tr{
  height:2.668rem
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
.unit{
  margin-right:5vw;
}
.input-style{
    text-align:right;

  
    border:none;
    outline:none;
    left:0px;
    top:0px;
    
}
.detailPicker{
  width:100vw
}
.popup-div{
  width:100vw;
  height:100vh;
  background:rgb(248,248,248)
}
.content-main{
  background:white
}
.content-table{
  width:95vw;
  margin-left:5vw;
  margin-top:3vh;
  
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
  padding-right:5vw;
  position:relative
}
.content-detail-main{
  border-bottom:1px solid rgb(230,230,230)
}
.record-main-content-div:first-child{
  margin-top:0vh;
}
.record-main-content-div{
  margin-top:2vh;
}
.record-content{
  background:white;
  padding-top:1vh;
  width:100vw;
  padding-bottom:1vh;
  display:inline-block;
  padding-top:1vh;
  padding-bottom:1vh;
  position:relative;
}
.record-content-left{
  float:left;
  width:80vw;

  font-size:1.4rem;
  
  
  text-align:left
}
.record-content-right{
  float:left;
  width:10vw;
  font-size:1.4rem;
  position:absolute;
  right:0px;
  top:50%;
  margin-right:5vw;
  margin-top:-12px;
  text-align:center
}
.record-scroll-div{
  width:100vw;
  height:72vh;
  overflow-y:auto;
}
.record-time{
  height:3vh;
  font-size:1.4rem;
  line-height:3vh;
  background:white;
  border-bottom:1px solid rgb(220,220,220)
}
.record-time-left{
  float:left;
  color:rgb(150,150,150);

}
.record-time-right{
  float:right;
  color:red;
}
.pats-list-div:first-child{
    margin-top:8vh
}
.pats-list-table{
    width:90vw;
    margin:0.667rem auto 0.667rem;
    background:white;

}
.pats-list-div{
    display:inline-block;
    width:100vw;
    background:white;
    margin-top:0.667rem
}

.pats-list-text-align-left{
    text-align:left
}
.pats-list-text-align-right{
    text-align:right
}
.pat-basic-info-td{
    
}
.pats-list-title{
    width:12vw;
}
.pats-bed{
  background:rgb(128,200,114);
  width:12vw;
  color:white;
  font-weight:bold;
}
.pats-name{
  width:15vw;
  font-size:1.6rem;
  font-weight:bold;
}
.pats-sex{
  width:4vw;
}
.pats-age{
  width:10vw;
}
.font-format-class{
  font-size:1.4rem;
}
.time-filter{
  height:4vh;

}
.time-filter-normal{
  float:left;
  height:4vh;
  line-height:4vh;
  font-size:1.4rem;
}
.time-filter-pre{
  
  font-size:1.8rem;
  color:rgb(150,150,150)
}
.time-filter-date{
  margin-left:1vw;
}
.time-filter-next{
  font-size:1.8rem;
  color:rgb(150,150,150);
  margin-left:1vw;
}
</style>


