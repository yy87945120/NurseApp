<template>
    <div id="ThreeTest">
        <nheader :routechoice='router'><p slot='title'>护理体征记录</p></nheader>
         <div id="filter"><search ref='selectOne' @on-change="onChange"  v-model='searchValue' placeholder="床位号 || 姓名 || 登记号" :results="res" :on-cancel="onCancel" class="search">
      <table slot='res'>
      <tr v-for="item in resData" @click="handleResultClick(item)">
           
      </tr>
        
      </table>
      </search>
      
      </div>
      <div style='display:inline-block;width:100vw;background:rgb(239,239,244);height:4.6rem' >
        <div class='layout'>           
            <ul class='filter-detail-ul'>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.ward}}</li>
              <li class='filter-detail-li' @click='pickDetail'>{{filter.date}}</li>
              
            </ul>   
        </div> 
      </div> 
      <div class='scroll-div'>
        <div id="pats-list">
          <div class='pats-list-div' v-for='item in pats'>
            <table class="pats-list-table" @click='showPatDetail(item)'>
              <tr>
                <td class='pats-list-title pats-bed'>{{item.床位+"床"}}</td>
                <td class="pats-name">{{item.姓名}}</td>
                <td class="pats-sex">{{item.性别}}</td>
                <td class="pats-age">{{item.年龄}}</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td colspan='5' class='pats-status'>{{item.测量时间}}&nbsp;脉搏&nbsp;{{item.脉搏}},{{(item.体温).substring(0,4)}}&nbsp;{{(item.体温).substring(4)}}</td>
                
              </tr>
              
            </table>
        </div>
          </div>
        </div>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPicker">取消</div><div class='detail-picker-btn' @click="handleDetailPicker">确认</div>
            <picker :data='detailArr' v-model='detailValue' @on-change='detailChange' class='detailPicker'></picker> 
        </mt-popup>

        <mt-popup
          v-model="popupVisibleNewRecord"
          position="bottom">
            <div class='detail-picker-btn' @click="cancelDetailPickerNewRecord">取消</div><div class='detail-picker-btn' @click="handleDetailPickerNewRecord">确认</div>
            <picker :data='detailArrNewRecord' v-model='detailValueNewRecord' class='detailPicker'></picker> 
        </mt-popup>

        <div class="footer-new">
        <div class='new-footer-new-div' @click="creatRecord">
          新建批量三测单
        </div>
        </div>
     
       
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import dheader from '@/views/components/dheader';
import {getDepartment} from "@/config";
import {Indicator} from "mint-ui"
import { Search,Picker} from 'vux';

export default {
  name: 'ThreeTest',
  components :{
    nheader,Search,Picker,dheader
  },
  data () {
    return {
      
      loading:false,
      showMask:false,
      createNewRecord:false,
      popupVisibleNewRecord:false,
      Pat:[],
      BedList:[],
      router:'gohome',
      searchValue:'',
      resData:[],
      depShow:'',
      filter:{
          date:0,
          ward:'',
          date:'',
      },
      filterNewRecord:{
          date:0,
          ward:'2018-03-11',
          time:"8:00"
      },
      detailValue:[],
      detailValueNewRecord:[],
      dep:[],
      detailArr:[
          [],
          []
      ],
      detailArrNewRecord:[
          [(new Date()).getFullYear()+"-"+(parseInt((new Date()).getMonth())+parseInt(1))+"-"+(new Date()).getDate()],
          ["7:00","8:00","9:00","10:00"]
      ],
      popupVisible:false,
      res:[],
      pats:[],
      pats1:[
        {
          name:'姚展锋',
          sex:1,
          age:22,
          id:1,
          bed:'1001',
          doctorDr:1,
          nurseDr:2,
          icon:[]
        },
        {
          name:'yy',
          sex:1,
          age:22,
          id:1,
          bed:'1001',
          doctorDr:1,
          nurseDr:2,
          icon:[]
        },

      ],
    }
  },
  methods :{
    pickDetail(){
        this.popupVisible = true
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },
      handleDetailPicker(){
          
          let _this = this;
          let ward = '';
          let dep_id = this.detailValue[0];
          let date = this.detailValue[1];
          console.log(this.detailValue);
          this.dep.forEach(function(item){
              if(Number(item.row_id) == Number(dep_id)){
                ward = item.dep_desc
              }
          })
          this.filter.ward = ward;
          
          this.depId = this.detailValue[0];
          this.filter.date = this.detailValue[1];
          this.popupVisible = false;
          this.getThreeAll();
      },
      cancelDetailPicker(){
          this.popupVisible = false
      },
      detailChange(res){
         
      },
      mytime($event,index){
          this.InfusionInfo[index].needTime = $event;
      },
      onChange (){
          this.getThreeAll();
        

      },

      handleResultClick(item){
      console.log(item)
          
    
      },
      getDateChange(datestr){  
        var temp = datestr.split("-");  
        var date = new Date(temp[0],temp[1]-1,temp[2]);  
        console.log(date);  
        return date;  
      },
      getDateMethod(){
        var date_all=[],i=0;  
        var start = "2018-4-30";  
var end = ((new Date()).getFullYear()+"-"+(parseInt((new Date()).getMonth())+parseInt(1))+"-"+(new Date()).getDate());  
var startTime = this.getDateChange(start);  
var endTime = this.getDateChange(end);  
while((endTime.getTime()-startTime.getTime())>=0){  
  var year = startTime.getFullYear();  
  var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();  
  var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();  
  date_all[i]=year+"-"+month+"-"+day;  
  startTime.setDate(startTime.getDate()+1);  
  i+=1;  
} 
  this.detailArr[1]=date_all;
      },
      onCancel(){

      },
      creatRecord(){
          this.$router.push({path:'./newThreeTest'})
      },
      showPatDetail(item){
       
          Indicator.open('加载中..');

       setTimeout(()=>{
       try{
        localStorage.removeItem('pats');

        let patsInfo = {
              pat_id:item.病人id,
              pat_name:item.姓名,
              bed_desc:item.床位,
              nurse_id:0,
              doctor_id:0,
              patient_no:item.住院号
        };
      localStorage.setItem('pats', JSON.stringify(patsInfo));
        this.$router.push({path:'./PatsInfo'});
          Indicator.close();
          this.$router.push({name:'PersonalThreeTest', params:{ pat_id: item.病人id , date:this.filter.date}})
       }
       catch(err){
        alert(err+'不支持本地存储功能将导致页面数据无法传递')
       }
       
       },500)
  
          
      },
  
      pickDetailNewRecord(){
          this.popupVisibleNewRecord = true
      },
      cancelDetailPickerNewRecord(){
          this.popupVisibleNewRecord = false
      },

      handleDetailPickerNewRecord(){
          this.getThreeAll();
          this.popupVisibleNewRecord = false;
         
      },
      getThreeAll(){
          let _this = this;
          
         
          let params = {
              "wardid":_this.depId,
              "date":_this.filter.date,
              "par":_this.searchValue
          }
          $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetThreeList",
          datatype:"json",
          
          success:function(json){
            let data = JSON.parse(json)
            _this.pats = data;
          },
          error:function(){

          }
          })
          this.popupVisibleNewRecord = false;
         
      },
      choiceItem(){
          
      },
      ifEmpty(){

      },
      getLocalStorage(){
        let dep = getDepartment();  
        let _this = this;
        this.dep=dep;
        console.log(dep);
        this.filter.ward = this.dep[0].dep_desc;
        this.dep.forEach(function(item){
            let arr = {
              "name":item.dep_desc,
              "value":String(item.row_id)
            }
            console.log(arr);
            _this.detailArr[0].push(arr);
        })
        
        this.depId = this.dep[0].row_id;    
    }
      
  },
  mounted () {
    this.getLocalStorage()
    this.getDateMethod();
    this.filter['date'] = this.detailArr[1][this.detailArr[1].length-1];
    this.getThreeAll();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.pat-onfocus{
  background:rgb(239, 239, 244)
}
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  
.new-record-table{
  display:inline-block
}
.new-record-tr{
  height:4.5vh;
}
.new-record-form{
  margin-top:7vh;
  height:79vh;
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
  height:25vh
}
.group-item-all{
  height:31vh
}
.group-item-event{
  height:19vh
}

#filter{
  width:100vw;
  height:4.84rem;
  line-height:4.002rem;
  margin-top:4.002rem;
  
}
#filter .search{
    margin-top:4.002rem;
    height:4.002rem;
    line-height:3.335rem;
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

.footer-new{
  position:fixed;
  bottom:0px;
  width:100vw;
  height:4.669rem;
  text-align:center;
  background:white;
  border-top:1px solid rgb(230,230,230)
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

#pats-list{
  width:100vw;
  background:rgb(244,244,244)
}
.pats-list-div:first-child{
  margin-top:0vh
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

