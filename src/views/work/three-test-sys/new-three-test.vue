<template>
    <div id="NewThreeTest">
         
        <div class='newRecord-div'>
            <dheader @close='closeForm' ><span slot='title' @click='actionChoice=!actionChoice'>{{depShow}}<i class='icon iconfont icon-moreunfold'></i></span><i class='icon iconfont icon-shouye2'  style='font-size:2.4rem' ></i></dheader>
            <div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem;' v-show='false'>
              <div class='layout'>           
                <ul class='filter-detail-ul' style='margin-top:.5rem'>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   
              </div> 
            </div> 
            <div class='main-new-record-scroll-div'>
           <div class='bed-scroll-div-new-record'>
                <div class='bed-item' :class="{'pat-onfocus':index ==checkindex }"  @click='toggle(index)'   v-for='(item,index) in pat'>
                    {{item.bed_desc}}床
                    <div v-show='checkindex==index'>{{item.name}}</div>
                </div>
           </div>
            <div class='form-scroll-div-new-record'>
                <div style='position:absolute;width:76vw;background:rgb(239,239,244);height:4.6rem;' v-show='true'>
                        
                <ul class='filter-detail-ul-new' style='margin-top:.5rem;margin-left:5vw'>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.ward}}</li>
                  <li class='filter-detail-li-new' @click='pickDetailNewRecord'>{{filterNewRecord.time}}</li>
                </ul>   

            </div> 
            <div class='new-record-form'>
              <div class='group-item group-item-basic'>
                  <table class='new-record-table'>
                    <tr class='new-record-tr'>
                       <td class='new-record-title-td' style='text-decoration:underline'  @click='chooseTypeShow(1)'>{{tep}}:</td>
                      <td class='new-record-input-td'><input v-model='formList.tempra' type='text' class='new-record-input' placeholder='请填写体温'/></td>
                      <td class='new-record-unit'>℃</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>脉搏:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.pulse' class='new-record-input' placeholder='请填写脉搏'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>心率:</td>
                      <td class='new-record-input-td'><input class='new-record-input' v-model='formList.rate' type='text' placeholder='请填写心率'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>呼吸:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.breath' class='new-record-input' placeholder='填写呼吸次数'/></td>
                      <td class='new-record-unit'>次/分</td>
                    </tr>
              		 <tr class='new-record-tr'>
                      <td class='new-record-title-td'>血压:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.blood' class='new-record-input' placeholder='请填写血压'/></td>
                      <td class='new-record-unit'>mmHg</td>
                    </tr>
                  </table>
              </div>
              <div class='group-item group-item-all'>
                  <table class='new-record-table'>
                   
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总入量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.input' class='new-record-input' placeholder='请填写总入量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>大便:</td>
                      <td class='new-record-input-td'><input class='new-record-input' v-model='formList.shit' type='text' placeholder='填写大便次数'/></td>
                      <td class='new-record-unit'>次</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>尿量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.urine' class='new-record-input' placeholder='请填写总出量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td'>总出量:</td>
                      <td class='new-record-input-td'><input type='text' v-model='formList.output' class='new-record-input' placeholder='请填写总出量'/></td>
                      <td class='new-record-unit'>ml</td>
                    </tr>

                  </table>
              </div>
              <div class='group-item group-item-event'>
                   <table class='new-record-table'>
                    <tr class='new-record-tr'>
                      <td class='new-record-title-td' style='text-decoration:underline' @click='chooseTypeShow(2)'>护理事件:</td>
                      <td class='new-record-input-td'><input type='text' class='new-record-input'  v-model='nurseEvent' placeholder='请填写护理事件'/></td>
                      
                    </tr>
                 
                  </table>
              </div>
           </div>
           </div>
            </div>
            <div v-show='typeShow' style='position:absolute;width:80vw;border:1px solid rgb(230,230,230);box-shadow:5px 5px 5px rgb(40,40,40);background:white;z-index:99;margin-left:10vw;top:30%;'>
                <div @click='chooseTypeMethod(item)' v-for='item in arrType' style='height:6vh;width:80vw;line-height:6vh;font-size:1.4rem;text-align:center;border:1px solid rgb(230,230,230)'>{{item.name}}</div>
              </div>
           <div class='footer-new'>
            <div class='footer-new-left-right-div' @click='preBed'>上床</div>
          <div class='footer-new-div' @click='submitForm'>保存

        </div>
        <div class='footer-new-left-right-div' @click='nextBed'>下床</div>
        </div>
        </div>
        <div class='mask' v-show='showMask'><div @click='showMask = !showMask'><i class='icon iconfont icon-yuyin' style='font-size:5rem;line-height:100vh;color:white'></i></div></div>
       <mt-popup v-model="actionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' v-for='item in dep' @click='changeDep(item)'>{{item.dep_desc}}</div>
              
            </div>
        </mt-popup>
    <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>
    </div>

</template>

<script>
import dheader from '@/views/components/dheader'
import {getDepartment,getUser} from '@/config'
import {Indicator} from 'mint-ui';
import { Picker} from 'vux';
export default {
  name: 'NewThreeTest',
  data () {
    return {
      tep:'',
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
      nurseEventType:[
        {
          "name":"手术",
          "value":1
        },
        {
          "name":"死亡",
          "value":2
        },
        {
          "name":"出院",
          "value":3
        }
      ],
      dep:[],
      pat:[],
      checkindex:0,
      actionChoice:false,
      showMask:false,
      today:'',
      depShow:'',
      eventid:0,
      temType:1,
      depId:0,
      filterNewRecord:{
          date:0,
          ward:'2018-03-11',
          time:"08:00:00"
      },
      PatId:0,
      PatNo:0,
      popupVisibleNewRecord:false,
      detailArrNewRecord:[
          [],
          ["04:00:00","08:00:00","12:00:00","16:00:00","20:00:00","00:00:00"]
      ],
      detailValueNewRecord:[],
      dataList:[],
      formList:{
        "tempra":"",
        "blood":"",
        "rate":"",
        "breath":"",
        "pulse":"",
        "urine":"",
        "shit":"",
        "input":"",
        "output":"", 
      },
      tepId:0,
      nurseEventId:0,
      formListNormal:{
      	"pat_id":0,
      	"nurse_id":1,
        "tempra":"",
        "blood":"",
        "rate":"",
        "breath":"",
        "pulse":"",
        "urine":"",
        "shit":"",
        "input":"",
        "output":"",
        "temType":"",
        "eventid":""
      },
      nurseEvent:''
    }

  },
  components:{dheader,Picker},
  methods :{
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
  	checkFormList(){
  		let _this = this;
  		let pat_id = this.PatId;

  		let emptyFlag = true;
  		let formList = this.formList
  		for(var item in formList){
  			
  			if(item != "pat_id" && item !="nurse_id" && item != "temType")
  			{
  			
  			if(_this.formList[item]!=""){
  				for (var i = 0; i < _this.dataList.length; i++){
  					if(pat_id == _this.dataList[i].pat_id){
  						let tempArr={};
  					for(var itemDetail in _this.formList){
  						tempArr[itemDetail]=(_this.formList[itemDetail]) 
  					}
  						_this.dataList.splice(i,1,tempArr);
  						emptyFlag = false;
  						break;
  					}
  				}
  				if(!emptyFlag){
  					break;
  				} else{
  					let tempArr={};
  					for(var itemDetail in _this.formList){
  						tempArr[itemDetail]=(_this.formList[itemDetail]) 
  					}
  					console.log(tempArr);
  					_this.dataList.push(tempArr);
  				emptyFlag = false;
  				break;
  				}
  				
  			}
  				
  				
  			}
  		}
  		 
  		if(!emptyFlag){
  			return ; 
  		}else{
  			
  			for (var j = 0; j < _this.dataList.length; j++){
  				if(pat_id == _this.dataList[j].pat_id){
  					_this.dataList.splice(j,1);
  					break;
  				}
  			}
  		}
	
  	},
  	getFormList(){
  		let _this = this;
  		for(var x=0 ; x < _this.dataList.length ; x++){
  			if(_this.dataList[x].pat_id ==  _this.PatId){
  					
  					for(var item in _this.dataList[x]){
  						let value = _this.dataList[x][item]		
  						_this.formList[item] = value
  					}
  					break;
  				
  				
  			}else{
  				
  				for(var i in _this.formListNormal){
  						let value = _this.formListNormal[i]
  						_this.formList[i] = value;

  				}
  				_this.formList["pat_id"] = _this.PatId;
  		}



  	
}
  	},
  	toggle (index) {
        
        //this.checkFormList();
        
        this.checkindex = index;
        this.PatId = this.pat[index].row_id;
       this.PatNo =  this.pat[index].inhosipital_NO
        
      
        //this.getFormList();
        
      },
  	nextBed(){
  		
  		if(this.checkindex+1 == this.pat.length){
  				alert("无上床了");
  				return ;
  		}else{
  				
  				//this.checkFormList();
  				//console.log(this.dataList)
  				this.checkindex++;
  				this.PatId = this.pat[this.checkindex].row_id;
          this.PatNo =  this.pat[index].inhosipital_NO
  				//this.formList["pat_id"] = this.PatId;
  				//this.getFormList();
  		}
  		
  		
  	},
  	preBed(){
  		if(this.checkindex == 0){
  				alert("无下床了");
  				return ;
  		}else{
  				
  				//this.checkFormList();
  				//console.log(this.dataList)
  				this.checkindex--;
  				this.PatId = this.pat[this.checkindex].row_id;
          this.PatNo =  this.pat[index].inhosipital_NO
  				//this.formList["pat_id"] = this.PatId;
  				//this.getFormList();
  		}
  		
  	},


  closeForm(){
      	this.$router.push({path:'./ThreeTest'})
      },
  handleDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false;

          this.filterNewRecord.ward = this.detailValueNewRecord[0];
          this.filterNewRecord.time = this.detailValueNewRecord[1];
          
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },
    getLocalStorage(){
        let dep = getDepartment();  
        this.dep=dep;
        console.log(dep);
        this.depShow = this.dep[0].dep_desc;
        this.depId = this.dep[0].row_id;    
    },
   
      clean(){
        let _this = this;
          for(var i in _this.formList){
              _this.formList[i] = "";
          }
      },
    pickDetailNewRecord(){
          this.popupVisibleNewRecord = true
      },

    changeDep(item){
        this.depShow=item.dep_desc;
        this.depId =item.row_id; 
        this.actionChoice = false;
        this.getPat(this.depId);
      },
  	getPat(dep){
  		let _this = this;
  		let dep_id = dep;
  		let user = getUser();
  		let user_id = user[0].row_id;
  		let params = {
  			"nurseid":user_id,
  			"wardid":dep_id
  		}
  		//获取pat列表后
  		 $.ajax({
        data:params,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/Getpat",
        datatype:"json",
        async:false,
        success:function(json){
        	let data = JSON.parse(json) 
            if(data.code){
              if(data.code == 400){
                console.log(data.message);
              }
            }else{
                _this.pat = data;
                _this.PatId = _this.pat[0].row_id;
               _this.PatNo =_this.pat[0].inhosipital_NO;
                _this.checkindex=0;
            }
        },
        error:function(e){
          console.log(e)
        }
      })
  	},
    submitForm(){
        let _this=this;
        
        //关键信息
 
        let user = getUser();
        let patientId = _this.PatId;
        let patientNo = _this.PatNo;
        let nurse_id = user[0].row_id;
        let time = this.filterNewRecord.ward+" "+this.filterNewRecord.time;
        let tepType = this.tepId;
        let eventid = this.nurseEventId;
        //小时数据
        let tempra= this.formList.tempra;
        let blood = this.formList.blood;
        let rate = this.formList.rate;
        let breath = this.formList.breath;
        let pulse = this.formList.pulse;

        //日数据
        let urine = this.formList.urine;
        let shit = this.formList.shit;
        let input = this.formList.input;
        let output = this.formList.output;

        //参数设置
        let params = {
            'patid':patientId,
            'nurseid':nurse_id,
            'time':time,
            'inhosno':patientNo,
            'temtype':tepType,
            'event':eventid,
            'tempra':tempra,
            'blood':blood,
            'rate':rate,
            'breath':breath,
            'pulse':pulse,
            'urine':urine,
            'shit':shit,
            'input':input,
            'output':output
        }
       
        $.ajax({
          data:params,
          type:"post",
          timeout:'10000',
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/AddOneThree",
          datatype:"json",
          
          success:function(json){

            // _this.getAllThree(_this.dateArr[_this.checkindex]);
            // _this.popupVisibleForm=false;
            alert("录入成功");
            _this.clean();
            
          },
          complete(XMLHttpRequest,statusText){

            if(XMLHttpRequest.status==500){  
              
              alert("此患者日数据或者小时数据已经存在请仔细核查再填写");
              
            }
          },
          error:function(){

          }

          })
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

  },
  mounted () {
  	this.getLocalStorage()
//yzf
  	this.getPat(this.depId)
    this.formList["eventid"] = this.nurseEventId;
    this.formList["temType"] = this.tepId;
    this.formList["pat_id"] = this.PatId;
    let crtTime = new Date();
    let date = this.dateFtt("yyyy-MM-dd",crtTime);
    this.filterNewRecord.ward=date;
     this.detailArrNewRecord[0].push(date);
    this.formListNormal["eventid"] = this.nurseEventId;
    this.formListNormal["temType"] = this.tepId;
    this.formListNormal["pat_id"] = this.PatId;

    this.tep = this.tempertureType[0].name;
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-new{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
}
.pat-onfocus{
  background:rgb(239, 239, 244)
}
.footer-new-left-right-div{
  height:2.668rem;
  line-height:2.668rem;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:18vw;
  display:inline-block;
  background:rgb(254, 110, 161);
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
.filter-detail-ul-new{
  margin-top:0.3335rem;
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
.filter-detail-li-new{
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
  width:33vw
}
.filter-detail-li-new:last-child{
    border-right:1px solid rgb(200,200,200)
}
.footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:60vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}
.new-footer-new-div{
  height:2.668rem;
  line-height:2.668rem;
  display:inline-block;
  margin-top:1.0005rem;
  color:white;
  border-radius:2px;
  width:90vw;
  background:rgb(254, 110, 161);
  font-size:1.4rem
}
.new-record-table{
  display:inline-block
}
.new-record-tr{
  height:3.0015rem;
}
.new-record-form{
  margin-top:4.669rem;
  height:52.693rem;
  width:76vw;
  overflow-y:auto
}
.new-record-unit{
  font-size:1.4rem;
  text-align:left
}
.group-item:first-child{
  margin-top:0vh
}
.group-item{
  display:inline-block;
  width:76vw;
  background:white;
  
  margin-top:2vh
}
.group-item-basic{
  height:16.675rem
}
.group-item-all{
  height:20.677rem
}
.group-item-event{
  height:12.673rem
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
.new-record-title-td{
  font-size:1.4rem;
  text-align:right;
  width:20vw
}
.new-record-input-td{
  
}
.new-record-input{
  border:none;
  border-bottom:1px solid rgb(230,230,230);
  width:25vw;
  text-align:center
}
.pats-list-text-align-left{
  text-align:left
}
.pats-list-text-align-right{
  text-align:right
}
.pat-basic-info-td{
  
}

.pats-bed{
  background:rgb(102,240,102);
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
.pats-status{
  text-align:left;
  height:2.668rem;
  color:rgb(150,150,150)
}
.font-format-class{
  font-size:1.4rem;
}
.scroll-div{
  width:100vw;
  height:45.7572rem;
  overflow-y:auto
}
.newRecord-div{
  height:100vh;
  width:100vw;
  background:white
}
.main-new-record-scroll-div{
  height:86vh;
  width:100vw;

}
.bed-scroll-div-new-record{
  
  display:inline-block;
  height:86vh;
  width:23vw;
  overflow-y:auto;
  float:left;
  border-right:1px solid rgb(230,230,230);
}
.form-scroll-div-new-record{
  position:relative;
  height:86vh;
  display:inline-block;
  width:76vw;
  overflow-y:auto;
  float:left;
  background:rgb(239, 239, 244)
}
.bed-item{
  padding-top:.8vh;
  padding-bottom:.8vh;
  width:23vw;
  border-bottom:2px solid rgb(230,230,230);
  line-height:3.5vh;
  font-size:1.4rem
}
.mask{
  position:absolute;
  z-index:101;
  width:100vw;
  height:66.7rem;
  background:red;
  top:0px;
  background:#000;
  opacity:0.7;
}
.form-ul-li-item{
  display:inline-block;
  padding-top:.5vh;
  padding-bottom:.5vh;
  background:red
}

</style>


