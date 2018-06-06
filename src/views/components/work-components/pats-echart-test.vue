
<template>
    <div id="name">
       	 	
    </div>
    
</template>

<script>
import indicator from 'mint-ui'
let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/line')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require("echarts/lib/component/legendScroll");
export default {
  name: 'PatsThreeTest',
  data () {
    return {
      startDate:new Date('2014-1-1'),
      endDate:new Date('2014-1-2'),
      datePickerValue:'',
      popupVisible:false,
    }
  },
  components:{},
  methods :{
      openPicker() {
        this.$refs.picker.open();
      },
      startDates(){
        console.log(this.datePickerValue)
      },
      toggleRightPopup(){
       
        this.popupVisible = true;
        
        setTimeout(()=>{
          
          this.drawLine();
          
        },500)
      },
      drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('name'))
      // 绘制图表
      myChart.setOption({
        title: { 
            left:'center',
            text: '体温单' 
        },
       
        xAxis: {
          axisTick:{
              alignWithLabel:true
          },
          axisLabel: {  
              interval:0,  
              rotate:-20  
          }  ,
          boundaryGap: false,
          data: ["4-13 2","4-13 6", "4-13 10", "4-13 14", "4-13 18", "4-13 22","4-14 2","4-14 6", "4-14 10", "4-14 14", "4-14 18", "4-14 22"],

          splitLine:{  
            show:true,
            lineStyle:{
            color:'#00ff00',
            width: 2,
            alignWithLabel:true

            }
           }     
        },
        dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 1,
              end: 100
            },
            //下面这个属性是里面拖到
            {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 1,
                end: 100
            }
        ],
        grid:{
                show:true
        },
        legend: {
          data:['体温','脉搏'],
          right:100,
          top:8
        },
        yAxis: [{
            splitNumber: 35,
            name: '体温 ℃',
            type:'value',
            max:42,
            min:35,
            axisLabel : {
            formatter :  function (value, index) {
                    if(Math.round(value) === value){
                        return value;
                    }else{
                        return '';
                    }
              }
            },
            minInterval : 0.2 ,
            
            
            
        },
        {
            splitNumber: 44,
            name: '脉搏 次/分',
            type:'value',
            max:180,

            min:40,
            minInterval : 20 ,
            
        }],
        series: [{
          name: '体温',
          type: 'line',
          data: [37.10,36.50,37.00,37.40,38.00,37.00,37.10,36.50,37.00,37.40,38.00,37.00],
          yAxisIndex:0,
          lineStyle:{

          },
          symbol:"path://src/assets/svg/close.svg",
          itemStyle : { normal: {label : {show: true}}}
        },
        {
          name: '脉搏',
          type: 'line',
          data: [70,88,99,120,130,70,70,88,99,120,130,70],
          yAxisIndex:1,
          itemStyle : { normal: {label : {show: true}}}
        }]
      })
    }
  },
  mounted () {
  		this.drawLine()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#name{

	height:100vh;
	width:100vw
}
</style>


