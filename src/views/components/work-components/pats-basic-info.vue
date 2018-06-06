<template>
    <div id="PatsBasicInfo" >
        <div v-for='item in patsInfo'>
    	<div id="pat-basic-info">
    	<div class="font-layout">
    		<!--<div style="float:left;width:22vw;height:10vh"><img/></div>-->
    		<div style="float:left;margin-left:5vw;width:60vw;">
    			<table class='basic-info-table' style='width:65vw;'>
    				<tr>
    					<td class="text-align-left"  style="width:10vw;font-size:1.7rem;
    					color:black">{{item.姓名}}<span class="text-align-left" style="color:rgb(120,120,120);width:6vw;font-size:1.4rem">&nbsp;&nbsp;&nbsp;{{item.性别}}</span>
                        <span class="text-align-left" style="color:rgb(120,120,120);width:10vw;font-size:1.4rem">&nbsp;{{item.年龄}}</span></td>
    					
    				</tr>
    				<tr>
    					<td class="text-align-left" style="color:rgb(120,120,120);font-size:1.4rem" colspan='3'>{{item.电话}}</td>
    					
    				</tr>
    				<tr>
    					<td class="text-align-left" style="color:rgb(120,120,120);font-size:1.4rem" colspan='3'>{{item.地址}}</td>
    				
    				</tr>
    			</table>
    		</div>
    		</div>
    	</div>
    	<div id="pat-detail-info">
    		
    		<div class='info-title'>
    			<div class="font-layout">住院信息
    		</div>
    		</div>
    		<div>
    		<div class="font-layout">
    			<table>
    				<tr class='table-tr'>
    					<td class='title-td'>病人ID</td>
    					<td class='content-td'>{{patId}}</td>
    				</tr>
    				<tr>
    					<td class='title-td'>住院号</td>
    					<td class='content-td'>{{item.住院号}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>住院次数</td>
    					<td class='content-td'>{{item.住院次数}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>入院日期</td>
    					<td class='content-td'>{{item.入院日期}}</td>
    				</tr>
    				<tr>
    					<td class='title-td'>住院天数</td>
    					<td class='content-td'>{{item.住院天数}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>住院医生</td>
    					<td class='content-td'>{{item.住院医生}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>住院科室</td>
    					<td class='content-td'>{{item.科室}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>入院诊断</td>
    					<td class='content-td'>{{item.入院诊断}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>护理单元</td>
    					<td class='content-td'>{{item.病区}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>床号</td>
    					<td class='content-td'>{{item.床位号}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>护理等级</td>
    					<td class='content-td'>{{item.护理等级}}</td>
    				</tr>
    				<tr class='table-tr'>
    					<td class='title-td'>病情</td>
    					<td class='content-td'>{{item.病情}}</td>
    				</tr>
    			</table>
    		</div>
    		</div>
    	</div>
    	<div id="pat-family-info">
    	
    		<div class='info-title'>
    			<div class="font-layout">联系人信息
    		</div>
    		</div>
    		<div>
    		<div class="font-layout">
    		<table>
    			<tr class='table-tr'>
    				<td class='title-td'>
    					姓名
    				</td>
    				<td class='content-td'>
    					{{item.联系人姓名}}
    				</td>
    			</tr>
    				<tr class='table-tr'>
    				<td class='title-td'>
    					电话
    				</td>
    				<td class='content-td'>
    					{{item.联系人电话}}
    				</td>
    			</tr>
    				<tr class='table-tr'>
    				<td class='title-td'>
    					地址
    				</td>
    				<td class='content-td'>
    					{{item.联系人地址}}
    				</td>
    			</tr>
    		</table>
    		</div>
    		</div>
    	</div>
        </div>
    </div>
</template>

<script>
import {getPat} from '@/config';
import {Indicator} from 'mint-ui';
export default {
  name: 'PatsBasicInfo',
  data () {
    return {
      active:'tab-info',
      patsInfo:[],
      patId:0
    }
  },
  components:{},
  methods :{
   	getPatsBasicInfo(){
        Indicator.open('加载患者信息中...')
        let pat = getPat()
        this.patId = pat.pat_id;
        let data = {"patientid":pat.pat_id};
        let _this = this;
        $.ajax({
        data:data,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/GetPatInfo",
        datatype:"json",
        success:function(data){
        let json = (JSON.parse(data));
            Indicator.close()
            _this.patsInfo = json;
        },
        error:function(){
        }
      });
   	}
  },
  mounted () {
    this.getPatsBasicInfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#PatsBasicInfo{
	background:rgb(244,244,244);
	padding-top:2.5vh;
	overflow:auto;
	height:94vh;
	font-family:"微软雅黑"
}
.font-layout{
	width:95%;
	margin:0px auto 0px;
}
#pat-basic-info{
	padding-top:.8vh;
    padding-bottom:.8vh;
	width:95vw;
	display:inline-block;
	background:white;
	border:2px solid rgb(220,220,220)
}
#pat-detail-info{
	width:95vw;
	display:inline-block;
	margin-top:2.5vh;
	border:2px solid rgb(220,220,220);
	background:white
}
#pat-family-info{
	width:95vw;
	margin-top:2.5vh;
	display:inline-block;
	border:2px solid rgb(220,220,220);
	background:white;
	
}
.title-td{
	width:19vw;
	text-align:left;
	color:rgb(150,150,150);
	font-size:1.4rem;
}
.info-title{
	text-align:left;
	height:4vh;
	line-height:4vh;
	color:black;
	border-bottom:2px solid rgb(220,220,220);
	font-size:1.5rem;
	
	background:white;
}
.text-align-left{
	text-align:left;

}
.table-tr{
	height:4vh
}
.content-td{
	text-align:left;
	font-size:1.4rem;
	color:black
}
</style>


