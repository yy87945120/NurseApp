<template>
  <div class="scanPha">

     
    <div id="bcid">
      <div style="height:40%">
      <div style='position:fixed;top:10px;left:5vw' @click="closeMethod" ><i style='font-size:3rem' class='icon iconfont icon-guanbi'></i></div></div>
      <p class="tip">...载入中...</p>
    </div>
    <footer>
        <div id="tip-content" style="color:red">*请扫输液瓶贴<button @click="nextPage()">直接传送</button></div>
    </footer>
  </div>
</template>

<script type='text/ecmascript-6'>
  let scan = null;

  export default {
    data() {
      return {
        patInfo:[],
        phaInfo:[],
        type:0
      }
    },
    props:['patId','scantype'],
    methods: {
      //创建扫描控件
   
      startRecognize() {
   
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = onmarked;
  
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
            if(that.scantype==0){
              let parmas = {
            'patientid':that.patId,
            'exenum':result
         };
        $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/SCanExeInfo",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                that.closeScan();
                that.phaInfo = data.res
                that.$emit('toggleShow',that.phaInfo);
                return ;
            }
            if(data.code==400){
               alert(data.message);
               that.startScan();
               return ;
            }
            if(data.code==401){
               alert(data.message);
               that.startScan();
               return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
            }else{
                  let parmas = {
            'patientid':that.patId,
            'exenum':result
         };
        $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/SCanNextInfo",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                that.closeScan();
                that.phaInfo = data.res
                that.$emit('toggleShow',that.phaInfo);
                return ;
            }
            if(data.code==400){
               alert(data.message);
               that.startScan();
               return ;
            }
            if(data.code==401){
               alert(data.message);
               that.startScan();
               return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
            }
       
      
        
            
        }
      },
      closeMethod(){
        this.closeScan();
        this.$emit('close')
      },
      //开始扫描
      startScan() {
  
        if (!window.plus) return;
       
          scan.start();
     	
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
      
        if (!window.plus) return;
        scan.close();
      },
      nextPage() {
          //传回医嘱id
            console.log(this.scantype);
          if(this.scantype==0){
                 let that =this;
          let parmas = {
            'patientid':that.patId,
            'exenum':11
         };
        $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/SCanExeInfo",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                that.closeScan();
               that.phaInfo = data.res
                that.$emit('toggleShow',that.phaInfo);
                return ;
            }
            if(data.code==400){
               alert(data.message);
               return ;
            }
            if(data.code==401){
               alert(data.message);
               return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
          //this.closeScan();
          //this.$emit('toggleShow',res)
     
          }else{
                     let that =this;
          let parmas = {
            'patientid':that.patId,
            'exenum':23
         };
        $.ajax({
        data:parmas,
        type:"post",
        url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/SCanNextInfo",
        datatype:"json",
        success:function(json){
            let data = JSON.parse(json)
            if(data.code==200){
                that.closeScan();
               that.phaInfo = data.res
                that.$emit('toggleShow',that.phaInfo);
                return ;
            }
            if(data.code==400){
               alert(data.message);
               return ;
            }
            if(data.code==401){
               alert(data.message);
               return ;
            }


            
        },
        error:function(e){
          console.log(e)
        }
      })
          //this.closeScan();
          //this.$emit('toggleShow',res)
          }
       
     	}
    },
     mounted () {

        console.log(this.patId);
      },

  }
</script>
<style lang="less">
  .scanPha {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:2rem;
      text-align: center;
      color: #fff;
      background: black;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 0rem;
      width:100vw;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
      
      #tip-content{
        position:relative;
        height:100%;
        width:100%;
        text-align:center
      }
    }
  }
</style>
