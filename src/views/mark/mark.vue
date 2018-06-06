<template>
    <div id='Mark'>
    	<div class='mark-header'>
        <div class='layout'>
          <i style='font-size:2.2rem;float:left' class='icon iconfont icon-zhankai' @click='showGroup'></i>
          <div class='title-div' style='height:6vh;line-height:6vh;float:left;margin-left:10px'><span style='font-size:1.5rem;line-height:6vh'>{{title}}</span></div>
        </div>
      </div>
    	<div class='scroll-div'>
      
      <div class='mark-content-div' @click='showContent(item)' v-for='item in markItemList'>
            <div class='create-time-div'>
                <span style='font-weight:bold'>2018-5-10</span>&nbsp;&nbsp;<span>9:21</span>
            </div>
            <div class='main-content-div' >
                <<{{item.mark_info.title}}>>{{(item.mark_info.content).substring(0,12)+"..."}}
            </div>
            <div class='tip-time-div' v-for='itemClock in item.clock'>
                <i class='icon iconfont icon-iconfontzhizuobiaozhun023132'></i>&nbsp;&nbsp;<span>{{itemClock.date}}&nbsp;{{itemClock.time}}</span>
            </div>
      </div>
      <div class='new-mark-div' @click='newMarkMethod'><i class='icon iconfont icon-icon9 new-mark' ></i></div>
               <!--<button @click="startRecognize">开始识别</button><br/>
    <button @clikc="textContent">识别内容</button>-->
      </div>

    <mt-popup v-model="groupVisible" position="left">
            <div class='group-div'>
              <div class='group-title-div'>备忘录分组</div>
              <div class='group-all-div' @click='chooseAll'>
                <i style='font-size:2.4rem;float:left' class='icon iconfont icon-quanbu' @click='showGroup'></i>
          <div class='title-div' style='height:6vh;line-height:6vh;float:left;margin-left:10px'><span style='font-size:1.5rem;line-height:6vh'>全部</span></div>
          <div style='float:right'><i :class="checkAll?'icon-xuanze':''" class='icon iconfont' style='color:rgb(249,143,183)'></i></div>
              </div>
              <div class='hr'></div>
              <div class='operation-div'>
                <div class='operation'>
                    <div style='float:left;height:5vh;line-height:5vh;font-size:1.3rem'>分组</div>
                    <div style='float:right;height:5vh;line-height:5vh;font-size:1.3rem;color:rgb(249,143,183)' @click='editGroup'>编辑</div>
                </div>
              </div>
              <div style='overflow-y:auto;height:74vh;width:80vw'>
              <div class='group-item-div'>
                <div class='group-item' v-for='(item,index) in group' @click='chooseGroup(item,index)'>
                    <div class='group-item-detail group-item-detail-left'><i class='icon iconfont icon-09-copy' style='font-size:1.4rem;color:rgb(249,143,183)'></i></div>
                    <div class='group-item-detail group-item-detail-right' >
                      <div style='float:left;font-size:1.4rem;width:53vw;overflow:hidden;text-align:left'>
                      {{ item.group_name }}</div>
                      <div style='float:right'><i :class="item.check=='true'?'icon-xuanze':''" class='icon iconfont' style='color:rgb(249,143,183)'></i></div>
                    </div>
                </div>
              </div>
              </div>
              <div class='group-setting-div'>
                  <div class='group-setting' @click='showSetting'>
                      <div class='group-setting-item' style='width:8vw'><i class='icon iconfont icon-shouye6' style='font-size:2.4rem'></i></div>
                      <div class='group-setting-item' style='font-size:1.6rem'>设置</div>
                  </div>
              </div>
            </div>
        </mt-popup>
          <mt-popup v-model="MarkVisible" position="right">
            <div class='new-mark-content-div' v-for="item in editInfo">
              <dheader @close='closeNewMarkMethod'><span slot='title' @click='showGroupChoice'>{{editInfo.mark_info.title}}</span><span  slot='icon'><i @click='deleteMarkItem' style='font-size:2.2rem' class='icon iconfont icon-icon-'></i></span></dheader>
              <!--v-model='contentTitle' v-model="editContent"-->
                <div class='content-title'><input  class='content-title-input' type='text' placeholder='标题'  v-model='editInfo.mark_info.title' /><i @click='cleanContentTitle' :class="contentTitle!=''?'clean-content-title':''" class='icon iconfont icon-guanbi '></i></div>
                <div class='edit-content-div'>
                  <textarea v-model="editInfo.mark_info.content"  class='edit-content' placeholder='容易忘记的事情!'>
                  
                  </textarea>
                  
                </div>
                <!--<div class='record-title-div' >
                  <div class='record-title-left'>录音</div>
                  <div class='record-title-right'><i class='icon iconfont icon-plus' :class="newRecordStatus?'newRecordIcon':''" @click='newRecord'></i></div>
                </div>
                <div class='record-scroll-div'>

                    <div class='record-item-div' v-show='newRecordStatus'>
                        <div class='record-item record-item-time' >00:00</div>
                        <div class='record-item record-item-pic'>
                          <div class='record-item-pic-line'></div>
                        </div>
                        <div class='record-item record-item-control'>
                            <div class='record-item-control-circle record-item-control-left' @click='stopNewRec'><i :class="newRecordStopStatus?'icon-zanting1':'icon-yuyin'" class='icon iconfont'></i></div>
                            <div class='record-item-control-circle record-item-control-right' @click='createRecord'><i style='font-size:1.2rem'  class='icon iconfont icon-09-copy'></i></div>
                        </div>
                        <div class='item-decaration-div decaration-left'></div>
                        <div class='item-decaration-div decaration-right'></div>
                    </div>

                    <div class='record-item-div' v-for='itemRecord in editInfo.record'>
                        <div class='record-item' :class="!playStatus?'record-item-time':'record-item-time-play'">{{itemRecord.time}}<span v-show='playStatus'>/:00:20</span></div>
                        <div class='record-item' :class="!playStatus?'record-item-pic':'record-item-pic-play'">
                          <div class='' :class="!playStatus?'record-item-pic-line':'record-item-pic-line-play'"></div>
                        </div>
                        <div class='record-item record-item-control'>
                            <div class='record-item-control-circle record-item-control-left' @click='deleteRecord'><i class='icon iconfont icon-icon-'></i></div>
                            <div class='record-item-control-circle record-item-control-right' @click='playRecord'><i style='font-size:1.2rem'  :class="!playStatus?'icon-bofang':'icon-zanting1'" class='icon iconfont'></i></div>
                        </div>
                        <div class='item-decaration-div decaration-left'></div>
                        <div class='item-decaration-div decaration-right'></div>
                    </div>

                    

                </div>-->
                <!--{{PickerValue}}-->
                <div class='clock-content-div' @click='showClock'>
                  <div class='record-title-left'>提示</div>
                  <div class='record-title-right'>{{PickerValue}}</div><div class='record-title-right'><i  class='icon iconfont icon-iconfontzhizuobiaozhun023132'></i></div>
                </div>
                <div class='save-content-div' @click='saveContent'><div  class='save-content save-content-active'><div class='save-content-float-left'><i class='icon iconfont icon-baocun save-content-icon'></i></div><div class='save-content-float-left save-content-text'>保存</div></div></div>
            </div>
        </mt-popup>



        <mt-popup v-model="newMarkVisible" position="bottom">
            <div class='new-mark-content-div'>
              <dheader @close='closeNewMarkMethod'><span slot='title' @click='showGroupChoice'>{{contentTitle}}</span></dheader>
              <div></div>
                <div class='content-title'><input  v-model='contentTitle' class='content-title-input' type='text' placeholder='标题' /><i @click='cleanContentTitle' :class="contentTitle!=''?'clean-content-title':''" class='icon iconfont icon-guanbi '></i></div>
                <div class='edit-content-div'>
                  <textarea  v-model="editContent" class='edit-content' placeholder='容易忘记的事情!'>
                    
                  </textarea>
                  
                </div>
                <!--<div class='record-title-div'>
                  <div class='record-title-left'>录音</div>
                  <div class='record-title-right'><i class='icon iconfont icon-plus' :class="newRecordStatus?'newRecordIcon':''" @click='newRecord'></i></div>
                </div>
                <div class='record-scroll-div'>

                    <div class='record-item-div' v-show='newRecordStatus'>
                        <div class='record-item record-item-time' >00:00</div>
                        <div class='record-item record-item-pic'>
                          <div class='record-item-pic-line'></div>
                        </div>
                        <div class='record-item record-item-control'>
                            <div class='record-item-control-circle record-item-control-left' @click='stopNewRec'><i :class="newRecordStopStatus?'icon-zanting1':'icon-yuyin'" class='icon iconfont'></i></div>
                            <div class='record-item-control-circle record-item-control-right' @click='createRecord'><i style='font-size:1.2rem'  class='icon iconfont icon-09-copy'></i></div>
                        </div>
                        <div class='item-decaration-div decaration-left'></div>
                        <div class='item-decaration-div decaration-right'></div>
                    </div>

                    <div class='record-item-div'>
                        <div class='record-item' :class="!playStatus?'record-item-time':'record-item-time-play'">00:20<span v-show='playStatus'>/:00:20</span></div>
                        <div class='record-item' :class="!playStatus?'record-item-pic':'record-item-pic-play'">
                          <div class='' :class="!playStatus?'record-item-pic-line':'record-item-pic-line-play'"></div>
                        </div>
                        <div class='record-item record-item-control'>
                            <div class='record-item-control-circle record-item-control-left' @click='deleteRecord'><i class='icon iconfont icon-icon-'></i></div>
                            <div class='record-item-control-circle record-item-control-right' @click='playRecord'><i style='font-size:1.2rem'  :class="!playStatus?'icon-bofang':'icon-zanting1'" class='icon iconfont'></i></div>
                        </div>
                        <div class='item-decaration-div decaration-left'></div>
                        <div class='item-decaration-div decaration-right'></div>
                    </div>

                    

                </div>-->
                <div class='clock-content-div' @click='showClock'>
                  <div class='record-title-left'>提示</div>
                  <div class='record-title-right'>{{PickerValue}}<i class='icon iconfont icon-iconfontzhizuobiaozhun023132'></i></div>
                </div>
                <div class='save-content-div'><div @click='newContent' class='save-content' :class="editStatus?'save-content-active':'save-content-disable'"><div class='save-content-float-left'><i class='icon iconfont icon-baocun save-content-icon'></i></div><div class='save-content-float-left save-content-text'>保存</div></div></div>
            </div>
        </mt-popup>

          <mt-popup v-model="settingVisible" position="right">
            <div class='setting-div'>
            <dheader @close='closeSettingMethod'><span slot='title'>提示功能</span></dheader>
                  <group class='group'>
                    <cell class="cell" title='备忘录震动提示' style='text-align:left'><mt-switch @change="chageShakeValue"  v-model="configArr.shakeOn"></mt-switch></cell>
                    <cell  class="cell" title='推送提示' style='text-align:left'><mt-switch @change="chageSendValue"  v-model="configArr.sendOn"></mt-switch></cell>
                    <cell  class="cell" title='语音提示' style='text-align:left'><mt-switch @change="chageVoiceValue"  v-model="configArr.voiceOn"></mt-switch></cell>
                </group>
              
            </div>
        </mt-popup>

          <mt-popup v-model="groupSettingVisible" position="right">
            <div class='setting-div'>
            <dheader @close='closeGroupSettingMethod'><span slot='title'>分组编辑</span><span @click='newGroupMethod' slot='icon'><i class='icon iconfont icon-09-copy' style='font-size:1.4rem;color:rgb(249,143,183)'></i>New</span></dheader>
            <div class="groupSetting-scroll-div">
                <group>
                   <mt-checklist title="分组编辑选项" style='text-align:left' align='right' v-model="optionArr" :options="groupOption">
                   </mt-checklist>
                </group>
            </div>
            <div class='edit-group-operation-div'>
              <div class='editGroupName' :class="groupEditStatus?'group-edit-active':''" @click='editGroupNameMethod'><i class='icon iconfont icon-icon9' style='margin-top:1vh;font-size:2.4rem'></i><div>编辑</div></div>
              <div class='deleteGroup' :class="groupDeleteStatus?'group-delete-active':''" @click='deleteGroupNameMethod'><i class='icon iconfont icon-icon10' style='margin-top:1vh;font-size:2.4rem'></i><div>删除</div></div>
            </div>

                <div  :class="newGroupVisible?'newGroupClass':'newGroupClass-in'">
                    <div class='newGroupClass-title' style='height:45px;line-height:45px;font-size:1.6rem'>新建分组</div>
                    <div style='height:70px;line-height:70px' >
                      <input v-model='newGroupName' type='text' style='width:80vw;height:30px;border:none;border-bottom:1px solid rgb(80,80,80)' placeholder='请填写分组名字'/>
                    </div>
                    <div>
                        <div @click='newGroupVisible = false' style='float:left;height:30px;line-height:30px;width:45vw;font-size:1.6rem'>取消</div>
                        <div @click='makeGroupMethod' style='float:left;height:30px;line-height:30px;width:45vw;font-size:1.6rem'>确定</div>
                    </div>
                </div>
               
                <div  :class="eidtGroupVisible?'newGroupClass':'newGroupClass-in'">
                    <div class='newGroupClass-title' style='height:45px;line-height:45px;font-size:1.6rem'>编辑分组</div>
                    <div style='height:70px;line-height:70px' >
                      <input v-model='newGroupName' type='text' style='width:80vw;height:30px;border:none;border-bottom:1px solid rgb(80,80,80)' placeholder='请填写分组名字'/>
                    </div>
                    <div>
                        <div @click='eidtGroupVisible = false' style='float:left;height:30px;line-height:30px;width:45vw;font-size:1.6rem'>取消</div>
                        <div @click='editGroupMethod' style='float:left;height:30px;line-height:30px;width:45vw;font-size:1.6rem'>确定</div>
                    </div>
                </div>
            </div>
        </mt-popup>

        <mt-popup v-model="actionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' >item.title</div>
                
            </div>
        </mt-popup>
        
         <mt-popup v-model="recordActionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' style='color:red' @click='deleteRecordCorrect'>删除录音</div>
              <div class='actionChoice-choice-div' @click='recordActionChoice=false'>取消</div>
            </div>
        </mt-popup>


        <mt-datetime-picker ref="picker" type="dateTime" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日"  :startDate='startDate' @cancel='cleanClock' @confirm='startDates' v-model="datePickerValue">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { Group,Cell } from 'vux';
import { Indicator,MessageBox } from 'mint-ui';
import { getUser } from '@/config';
import dheader from '@/views/components/dheader'
var r = null;
var text=null;
export default {
  name: 'Mark',
  data () {
    return {
        groupOption:[],
        optionArr:[],
        groupDeleteStatus:false,
        groupEditStatus:false,
        checkAll:true,
        title:'全部',
        groupVisible:false,
        settingVisible:false,
        MarkVisible:false,
        newMarkVisible:false,
        newMark:false,
        groupSettingVisible:false,
        configArr:{
            shakeOn:false,
            sendOn:false,
            voiceOn:false
        },
        editInfo:[],
        newGroupName:'',
        contentTitle:'',
        editContent:'',
        actionChoice:false,
        recordActionChoice:false,
        playStatus:false,
        newRecordStatus:false,
        newRecordStopStatus:true,
        editStatus:false,
        startDate:new Date('2018-5-14'),
        datePickerValue:'',
        PickerValue:'',
        newGroupVisible:false,
        markItemList:[],
        group:[],
        group_id:0,
        eidtGroupVisible:false
    }
  },
  components:{Group,Cell,dheader,Indicator,MessageBox},
  methods :{
    editGroupConfirm(){
      
    },
    editGroupMethod(){
      let group_id = this.optionArr[0];
      let group_name = this.newGroupName;
      let _this = this;
      let params = {
        "group_id":group_id,
        "group_name":group_name
      }
      $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/editGroupName",
          datatype:"json",
          async:false,
          success:function(data){
            _this.getMarkItemInfo(0);
            let groupArr = [];
            _this.group.forEach(function(item){
              let arr = {};
              arr.label=item.group_name;
              arr.value=item.row_id;
              groupArr.push(arr);
              _this.eidtGroupVisible=false
              })
              _this.groupOption=groupArr;
          },
          error:function(e){
            console.log(e);
          }
        })
    },
    deleteMarkItem(){
      let row_id = this.editInfo.mark_info.row_id;
      let _this = this;
      let params = {
         "row_id":row_id
      };
      $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/deleteMarkItem",
          datatype:"json",
          async:false,
          success:function(data){
            _this.getMarkItemInfo(_this.group_id);
            _this.MarkVisible=false;
          },
          error:function(e){
            console.log(e);
          }
        })
    },
    editGroupNameMethod(){
      if(this.groupEditStatus){
        this.eidtGroupVisible=true
    }else{
      return;
    }
    },
    deleteGroupNameMethod(){
    if(this.groupDeleteStatus){

        let arr = JSON.stringify(this.optionArr);
        let _this = this;
        let params = {
          "arr":arr
        }
        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/deleteMarkGroup",
          datatype:"json",
          async:false,
          success:function(data){
            console.log(data);
            _this.getMarkItemInfo(0);
            let groupArr = [];
            _this.group.forEach(function(item){
              let arr = {};
              arr.label=item.group_name;
              arr.value=item.row_id;
              groupArr.push(arr);
              _this.eidtGroupVisible=false
              })
              _this.groupOption=groupArr;
              _this.groupEditStatus=false;
              _this.groupDeleteStatus=false;
          },
          error:function(e){
            console.log(e);
          }
        })
        

    }else{
      return;
    }
      
    },  
    chooseAll(){
      this.checkAll = true;
      this.title='全部';
      
      this.getMarkItemInfo(0);
      this.groupVisible = false;

      this.group_id = 0;
    },
    chooseGroup(item,index){
      let group = this.group
      group[index].check = "true";
      this.checkAll = false;
      this.getMarkItemInfo(item.row_id);
      this.groupVisible = false;
      this.title = item.group_name;
      this.group_id = item.row_id;

    },

    getMarkItemInfo(group_dr){
        let _this = this;
        let user = getUser();
        console.log(user[0].row_id);
        let params = {
          'nurse_id':user[0].row_id,
          'group_dr':group_dr
        };
        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/getMarkInfo",
          datatype:"json",
          async:false,
          success:function(data){
            let res = JSON.parse(data);
            
            _this.group = res.group;
           
            _this.markItemList = res.mark_item;
          },
          error:function(e){
            console.log(e);
          }
        })
    },
    showContent(item){
        this.editInfo = item;
        this.MarkVisible=true;
        console.log(item);
        this.PickerValue = item.clock[0].date+" "+item.clock[0].time
    },
    cleanClock(){
        this.PickerValue = '';
    },
    startDates(){ 
        let year = new Date(this.datePickerValue).getFullYear();
        let month = new Date(this.datePickerValue).getMonth()+1;
        let date = new Date(this.datePickerValue).getDate();

        let hour = new Date(this.datePickerValue).getHours();
        let minute = new Date(this.datePickerValue).getMinutes();
        let second = new Date(this.datePickerValue).getSeconds();
        console.log(year,month,date,hour,minute,second)
        this.PickerValue = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        console.log(this.PickerValue);
    },
    showClock(){
        this.$refs.picker.open();

    },
    saveContent(){
        let _this = this;
        let user = getUser();
        let pickValue = this.PickerValue.split(" ");
        let clock_date = pickValue[0];
        let clock_time = pickValue[1];
        let title = this.editInfo.mark_info.title;
        let content = this.editInfo.mark_info.content;
       
        let params = {
          'nurse_id':user[0].row_id,
          'title':title,
          'content':content,
          'clock_date':clock_date,
          'clock_time':clock_time,
          'row_id':this.editInfo.mark_info.row_id
        };
        
      $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/editMarkMethod",
          datatype:"json",
          async:false,
          success:function(data){
              _this.getMarkItemInfo(_this.group_id);
              alert("保存成功");
          },
          error:function(e){
            console.log(e);
          }
        })
    },
    newContent(){
        let _this = this;
        let user = getUser();
        let pickValue = this.PickerValue.split(" ");
        let clock_date = pickValue[0];
        let clock_time = pickValue[1];
        let title = this.contentTitle;
        let content = this.editContent
        let group_id = this.group_id
        let params = {
          'nurse_id':user[0].row_id,
          'group_dr':group_id,
          'title':title,
          'content':content,
          'clock_date':clock_date,
          'clock_time':clock_time,
        };
        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/newMarkMethod",
          datatype:"json",
          async:false,
          success:function(data){
            _this.getMarkItemInfo(_this.group_id);
            _this.editStatus = false;
            _this.newMarkVisible = false;
            _this.MarkVisible = false;

          },
          error:function(e){
            console.log(e);
          }
        })
        
      
      
    },
    
    stopNewRec(){
      if(this.newRecordStopStatus){
          this.newRecordStopStatus=false;
      }else{ 
          this.newRecordStopStatus=true
      }
    },
    createRecord(){
      this.newRecordStatus=false;
    },
    newRecord(){
      if(this.newRecordStatus){
        return ;
      }
      this.newRecordStatus = true
    },
    deleteRecordCorrect(){
      this.recordActionChoice = false 
    },
    deleteRecord(){
      this.recordActionChoice = true
    },
    playRecord(){
      this.playStatus = !this.playStatus
    },
    showGroupChoice(){
      this.actionChoice = true;
    },
    cleanContentTitle(){
        this.contentTitle = '';
    },
    closeNewMarkMethod(){
        this.newMarkVisible = false;
        this.MarkVisible = false;
    },
    makeGroupMethod(){
       let user = getUser()
       let nurse_id = user[0].row_id;
       let groupName = this.newGroupName;
       let _this = this;

       let data={
          'nurse_id':nurse_id,
          'group_name':groupName
       }
       $.ajax({
        data:data,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/newGroupMethod",
        datatype:"json",
        success:function(data){        
            _this.getMarkItemInfo(0);

            let groupArr = [];
            _this.group.forEach(function(item){
              let arr = {};
              arr.label=item.group_name;
              arr.value=item.row_id;
              groupArr.push(arr);
        })
            _this.groupOption=groupArr;
            _this.newGroupVisible = false;
            _this.groupEditStatus=false;
            _this.groupDeleteStatus=false;
        },
        error:function(e){
          console.log(e)
        }
        })
      
    },
    newGroupMethod(){
       this.newGroupVisible = true;
       this.newGroupName = '';
    },
    editGroup(){
      let _this = this;
      let groupArr = [];
      this.group.forEach(function(item){
          let arr = {};
          arr.label=item.group_name;
          arr.value=item.row_id;
          groupArr.push(arr);
      })
      _this.groupOption=groupArr;
      this.groupVisible = false;
      this.groupSettingVisible = true;

    },
    closeGroupSettingMethod(){
        this.groupSettingVisible = false;
    },
    closeSettingMethod(){
        this.settingVisible = false;
    },
    chageShakeValue(){

    },
    chageSendValue(){

    },
    chageVoiceValue(){

    },
    newMarkMethod(){
        this.newMarkVisible = true;
    },
    showSetting(){
      this.groupVisible = false;
      this.settingVisible = true;
    },
    showGroup(){
          this.groupVisible = true
    }

  },
  mounted () {
    this.getMarkItemInfo(0);
  },
  watch:{
    contentTitle(oldVal,newVal){
      if(newVal != oldVal){
        this.editStatus = true;
      }
    },
    editContent(oldVal,newVal){
      if(newVal != oldVal){
        this.editStatus = true;
      }
    },
    optionArr(newVal){
      let _this = this;
      if(newVal.length == 0){
         _this.groupDeleteStatus=false;
        _this.groupEditStatus=false;
      }
      if(newVal.length == 1){
         _this.groupDeleteStatus=true;
        _this.groupEditStatus=true;
      }

      if(newVal.length > 1 ){
        _this.groupDeleteStatus=true;
        _this.groupEditStatus=false;
      }
    }
  }
}
</script>

<!-- Add "scoed" attribute to limit CSS to this component only -->
<style scoped>
.edit-group-operation-div{
    width:100vw;
    height:7vh;
    color:rgb(150,150,150)
}
.deleteGroup{
    
    float:left;
    width:50vw;

}
.editGroupName{
   
    float:left;
    width:50vw;
}
.groupSetting-scroll-div{
  width:90vw;
  height:86vh;
  overflow-y:auto;
  display:inline-block;
}
.newGroupClass-in{
   position:absolute;
  border-radius:5px;
  border:1px solid rgb(200,200,200);
  width:90vw;
  height:150px;
  top:100%;
  left:50%;
  background:white;
  margin-left:-45vw;
  transition:all .3s cubic-bezier(.55,0,.1,1);
}
.newGroupClass{
  position:absolute;
  background:white;
  border-radius:5px;
  border:1px solid rgb(200,200,200);
  width:90vw;
  height:150px;
  top:50%;
  left:50%;
  margin-top:-75px;
  margin-left:-45vw;
  transition:all .3s cubic-bezier(.55,0,.1,1);
}
.clock-content-div{
  height:5vh;
  display:inline-block;
  width:90vw;
  line-height:5vh;
  background:white;
  margin-top:1vh;
  border-top:1px solid rgb(230,230,230);
  border-bottom:1px solid rgb(230,230,230);
}
.save-content-div{
  display:inline-block;
  width:90vw;
  height:6vh;
  line-height:6vh;
  margin-top:1.5vh
}
.save-content{
  position:absolute;
  left:50%;
  height:5vh;
  line-height:5vh;
  width:17vw;
  
  margin-left:-8.5vw;
  margin-top:1.5vh;
  border-radius:5px;
  color:white
}
.save-content-disable{
  background:rgb(230,230,230);
}
.save-content-active{
  background:rgb(249,143,183);
}

.save-content-icon{
  font-size:2.8rem
}
.save-content-text{
  font-size:1.4rem
}
.save-content-float-left{
  float:left 
}
.icon-zanting1{
   font-size:1.2rem;
}
.newRecordIcon{
   color:rgb(230,230,230)
}
.record-item-control-circle{
   float:left;
   background:white;
   border-radius:50%;
   height:4vh;
   width:4vh;
   line-height:4vh;
   text-align:center;
   margin-top:1vh;
   background:rgb(249,117,176)
}
.record-item-control-left{
    color:white
    
    
    
}
.record-item-control-right{
    margin-left:2vw;
    color:white
}
.record-scroll-div{
  height:30vh;
  width:90vw;
  display:inline-block;
  border-left:1px solid rgb(230,230,230);
  border-right:1px solid rgb(230,230,230);
  overflow-y:auto;

}
.record-item-div:first-child{
  margin-top:0vh
}
.record-item-div{
  width:70vw;
  height:6vh;
  background:rgb(249,143,183);
  position:relative;
  left:10vw;
  margin-top:1.5vh
}
.record-item{
  height:6vh;
  line-height:6vh;
  z-index:99;
  position:relative
}
.record-item-time{
  float:left;
  background:white;
  width:12vw;
  background:rgb(249,143,183);
  color:white;
  font-size:1.5rem;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-time-play{
  float:left;
  background:white;
  width:24vw;
  background:rgb(249,143,183);
  color:white;
  font-size:1.5rem;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-pic{
  float:left;
  background:black;
  width:41vw;
  background:rgb(249,143,183);
  line-height:5.2vh;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-pic-play{
  float:left;
  background:black;
  width:29vw;
  background:rgb(249,143,183);
  line-height:5.2vh;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-pic-line{
   display:inline-block;
   height:.2vh;
   width:34vw;
   background:white;
   transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-pic-line-play{
   display:inline-block;
   height:.4vh;
   width:22vw;
   background:white;
   transition: all .3s cubic-bezier(.55,0,.1,1);
}
.record-item-control{
  float:left;
  background:red;
  width:17vw;
  background:rgb(249,143,183);
}
.item-decaration-div{
  position:absolute;
  width:6vh;
  height:6vh;
  z-index:0
}
.decaration-left{
  left:0px;
  background:rgb(249,143,183);
  left:-3vh;
  border-radius:50%
}
.decaration-right{
  border-radius:50%;
  background:rgb(249,143,183);
  right:-3vh;

}

.record-title-div{
  height:3vh;
  line-height:3vh;
  display:inline-block;
  width:90vw;
}
.record-title-left{
  float:left
}
.record-title-right{
  float:right
}
.edit-content-div{
  display:inline-block;
  width:90vw;
  height:60vh;
  border-bottom:1px solid rgb(230,230,230);
  position:relative;
  margin-top:1vh;

}
.edit-content{
  width:90vw;
  height:60vh;
  resize:none;
  border:none;
  outline:none;
  font-family:'微软雅黑'
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
.clean-content-title{
   position:absolute;
   right:5px;
   top:3.2vh;
   margin-top:-1.5vh;
}
.content-title{
   display:inline-block;
   position:relative;
   height:6vh;
   width:90vw;
   border-bottom:1px solid rgb(230,230,230)
}
.content-title-input{
   position:absolute;
   width:100%;
   height:100%;
   left:0px;
   outline:none;
   border:none
}
.new-mark-content-div{
  height:100vh;
  width:100vw;
  background:white
}
.group{
  margin-top:0px
}
.cell{
  text-align:left
}
.setting-div{
  height:100vh;
  width:100vw;
  background:white;
  pisition:relative
}
.tip-time-div{
  height:2vh;
  line-height:2vh;
  text-align:right
}
.main-content-div{
  height:5vh;
  line-height:5vh;
  text-align:left;
  font-size:1.4rem
}
.create-time-div{
  height:3vh;
  line-height:3vh;
  font-size:1.4rem;
  text-align:left
}
.mark-content-div:first-child{
  margin-top:0vh;
}
.mark-content-div{
  width:100vw;
  padding:2vh 5vw;
  background:white;
  box-sizing:border-box;
  margin-top:1.5vh;
}
.new-mark-div{
  position:fixed;
  width:14vw;
  height:14vw;
  background:rgb(249,143,183);
  bottom:10vh;
  left:50%;
  margin-left:-7vw;
  border-radius:50%
}
.new-mark{
  line-height:14vw;
  font-size:2.4rem;
  color:white
}
.group-setting-div{
  width:80vw;
  height:8vh;
}
.group-setting{
  display:inline-block;
  width:70vw;
  height:8vh;
  
}
.group-setting-item{
    height:8vh;
    line-height:8vh;
    float:left
}

.group-item-div{
    
    width:80vw
}
.group-item{
    height:6vh;
    width:70vw;
    display:inline-block
}
.group-item-detail{
    height:6vh;
    line-height:6vh;

}
.group-item-detail-left{
    float:left;
    width:10vw;
   
}
.group-item-detail-right{
    float:right;
    width:60vw
}
.operation-div{
  width:80vw;
  height:5vh;

}
.operation{
  width:70vw;
  display:inline-block;
  height:5vh;
  border-bottom:1px solid rgb(230,230,230)
}
.hr{
  height:2vh;
  width:80vw;
  background:rgb(239,239,239)  
}
.group-all-div{
    height:6vh;
    line-height:6vh;
    box-sizing:border-box;
    padding-left:5vw;
    padding-right:5vw;
}

  
.group-title-div{
   height:6vh;
   width:80vw;
   line-height:6vh;
   color:white;
   font-size:1.6rem;
   text-align:left;
   box-sizing:border-box;
   padding-left:5vw;
   background:rgb(249,143,183)
}
.group-div{
   height:100vh;
   width:80vw;
   backgroud:red
}
.double-border{
	
	 	border: 1.5vw solid #ddd;

        padding: 1.2vw;

        background: #fff;
	    width:95vw

}
.mark-header{
  height:6vh;
  width:100vw;
  line-height:6vh;
  text-align:left;
  background:rgb(249,143,183);
  color:white
}
.scroll-div{
  width:100vw;
  height:86vh;
  background:rgb(237,237,237);
  overflow-y:auto
}
.group-delete-active{
  color:rgb(249,143,183);
}
.group-edit-active{
  color:rgb(249,143,183);
}
</style>


