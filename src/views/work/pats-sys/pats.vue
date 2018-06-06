<template>
    <div id="Pats">
    	<div id="Infusion">
    	<nheader :routechoice='router'><span slot="title" @click='actionChoice=!actionChoice'>{{depShow}}<i class='icon iconfont icon-moreunfold'></i></span></nheader>
        	
		<div id="filter">
    		<search class="search" ref='selectOne' placeholder="床位号||住院号||姓名"  @on-change="onChange"  v-model='searchValue' :results="filterRes" :on-cancel="onCancel">
    		<!--<table slot="res" style='width:100%'>
    			<tr v-for="item in filterRes" @click="handleResultClick(item)" style='height:3.335rem;'>			 
             <td style='font-size:1.6rem'>{{item.dep_desc}}</td>
             <td style='font-size:1.6rem'>{{item.bed_desc}}床</td>
             <td style='font-size:1.6rem'>{{item.pat_name}}</td>
    			</tr>

    		</table>--></search>
    		</div>
    	</div>
     
    	<div id="pats-list">
    		  <div class='pats-list-div' v-for='item in patList' @click="choosePats(item)">
            <table class="pats-list-table">
              <tr >
                <td class='pats-list-title pats-bed'>{{item.bed_desc}}床</td>
                <td class="pats-name">{{item.pat_name}}</td>
                <td class="pats-sex">{{item.pat_sex | sFormat}}</td>
                <td class="pats-age">{{item.pat_age | ageFormat}}</td>
                <td class='pats-list-text-align-right'>状态图标栏</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>医生:</td>
                <td colspan='4' class="pats-list-text-align-left">{{item.doctor_name}}</td>
              </tr>
              <tr class="font-format-class">
                <td class='pats-list-title'>诊断:</td>
                <td colspan='4' class="pats-list-text-align-left">{{item.diagnose_desc}}:{{item.diagnose_content}}</td>
              </tr>
            </table>
        </div>
    
    		
    	</div>
      <mt-popup v-model="actionChoice" position="bottom">
            <div class='actionChoice-div'>
              <div class='actionChoice-choice-div' v-for='item in depList' @click='changeDep(item)'>{{item.dep_desc}}</div>
              
            </div>
        </mt-popup>
    </div>
</template>

<script>
import nheader from '@/views/components/nheader';
import {Search} from 'vux'
import {getPatInfo,getFilterPatInfo,getExactPatInfo } from '@/api/api'
import {Indicator} from 'mint-ui'
import {getUser,getDepartment} from '@/config'
export default {
  name: 'Pats',
  components:{nheader,Search},
  data () {
    return {
      actionChoice:false,
      router:'gohome',
      searchValue:'',
      filterRes:[],
      depShow:'',
      depId:'',
      patList:[],
      
      depList:[],
    
      
    }
  },
 
  methods :{
    handleResultClick(item){

      let _this = this;
      $.ajax({
        data:{'pat_id':item.pat_id},
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/getExactPatInfo",
        datatype:"json",
        success:function(data){
          let json = (JSON.parse(data));
          _this.patList=json;
          _this.$refs.selectOne.isCancel = false
          _this.$refs.selectOne.isFixed = false

        },
        error:function(){
        }
      })
    },
      changeDep(item){
        this.depShow=item.dep_desc;
        this.depId =item.row_id; 
        this.actionChoice = false;
        this.getPatInfoMethod();
      },
   	onChange(){
      this.getPatInfoMethod();
   	},

   	onCancel(){
      this.cancel = true;
   	},
    getLocalStorage(){
        let dep = getDepartment();  
        this.depList=dep;
        console.log(dep);
        this.depShow = this.depList[0].dep_desc;
        this.depId = this.depList[0].row_id;    
    },
    getPatInfoMethod(){
      let user = getUser();
      let nurse_id = user[0].row_id;
      let _this = this;
      let data = {
        'par':this.searchValue,
        'nurse_id':nurse_id,
        'dep_dr':this.depId
      };
      Indicator.open("加载中...")
      $.ajax({
        data:data,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/getPatInfoList",
        datatype:"json",
        success:function(data){
        let json = (JSON.parse(data));
        Indicator.close();
        _this.patList = json;
        },
        error:function(){
        }
      })
   },
   	choosePats(item){
       Indicator.open('加载中..');

   		 setTimeout(()=>{
   		 try{
   		 	localStorage.removeItem('pats');

   		 	let patsInfo = {
        			pat_id:item.pat_id,
              pat_name:item.pat_name,
              bed_desc:item.bed_desc,
              nurse_id:item.nurse_id,
              doctor_id:item.doctor_id,
              patient_no:item.pn
    	 	};
		 	localStorage.setItem('pats', JSON.stringify(patsInfo));
   		 	this.$router.push({path:'./PatsInfo'});
         	Indicator.close();
   		 }
   		 catch(err){
   		 	alert(err+'不支持本地存储功能将导致页面数据无法传递')
   		 }
   		 
       },500)
   	}
  },
  mounted () {
      this.getLocalStorage();
      this.getPatInfoMethod();
      
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
#filter{
	margin-top:4.002rem;
	width:100vw;
	height:5rem
}
#filter .search{
	height:4.002rem;
	margin-top:4.002rem	
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
  background: rgb(128,200,114);
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

</style>

