<template>
    <div id="Login" style='position:relative'>
      <img src='../../assets/img/bg.png' id='bg' >
      
    	<div id="Login-info">
          <div id="username-box">
          <i class="icon iconfont icon-account"></i>
    			<input  id="username" class="input-box" v-model="username"  type='text' placeholder="工号"/>
          </div>
          <div id="password-box">
          <i class="icon iconfont icon-password"></i>
    			<input id="password" class="input-box" v-model="password" type='password' placeholder="密码"/>
          </div>
          <button id="Login-submit" @click="submit">登录</button>
      <div id="text"> 
          <div>NurseApp v1.0.0</div>
          <div>2018-4-1 RRD</div>
      </div>
    </div>



   
    
    </div>
</template>

<script>

import { Indicator } from 'mint-ui';
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      tip:"",
    
      logining:false,
      locList: [{"locDesc":"中西医结合一病区","locId":1},{"locDesc":"中西医结合二病区","locId":2}]
    }
  },
  methods :{
   
   	loadLoc(){
   		
   	},
    submit(){
        Indicator.open('登录中..');
        let _this = this;
        let params = {
          'username':_this.username,
          'password':_this.password
        };
        $.ajax({
          data:params,
          type:"post",
          url:"http://120.24.73.75:8200/CI/index.php/BasicInfo/login",
          datatype:"json",
          success:function(data){
          let rtn = JSON.parse(data);
          
          let user = rtn.res;
          let status = rtn.status;
          let dep = rtn.dep;
          let msg = rtn.err_msg;
          console.log(user);
          if (!status) {
                Indicator.close();
                if(msg==-1){
                  Indicator.open('账号密码错误');
                  _this.password='';
                 setTimeout(() => {
                Indicator.close();
                },2000)
                }
                 if(msg==-2){
                  Indicator.open('非护理人员无权限登录');
                  _this.password='';
                 setTimeout(() => {
                Indicator.close();
                },2000)
                }
                 if(msg==-3){
                  Indicator.open('无绑定病区科室');
                  _this.password='';
                 setTimeout(() => {
                Indicator.close();
                },2000)
                }
                 
              } else {
                Indicator.open('登录成功');
                setTimeout(() => {
                Indicator.close();
                  sessionStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('dep', dep);
                  _this.$router.push({ path: '/Home' });
                },1000)      
              }

    

  },
  error:function(){

  }
        })
       
        
    }
  },
  mounted () {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bg{
  
  position:absolute;
  top:0px;
  left:0px;
  width:37.5rem;
  height:66.7rem;
  z-index:-1
}
#Login-info{
  position:absolute;
  margin:17.342rem auto 0rem;
  width:37.5rem;
}
.icon{
  position:absolute;
  font-size:2.5rem;
  line-height:4.9358rem;
  margin-left:1.3125vw;
   color:rgb(254,110,161)
}

 
.input-box{
    width:32.25rem;
    height:4.9358rem;
    background:white;
    border-radius:2px;
    border:none;
    outline:none;
    box-sizing:border-box;
    padding-left:4.5rem;
    padding-right:4.5rem;
    font-family:inherit;
    font-size:1.6rem;
    
}

 #username{
     

 }    
 #password{
   
 }
#password-box{
   margin-top:2.668rem
}

 #Login-submit{
  background:rgb(253,124,178);
  border:none;
  height:4.669rem;
  width:86vw;
  color:white;
  box-shadow:5px 7px 15px rgb(220,220,220);
  border-radius:50px;
  font-size:1.8rem;
  letter-spacing:10px;
  font-family:inherit;
  text-align:center;
  outline:none;
  margin-top:4.669rem
 }

 #text{
    margin-top:14.674rem;
    color:rgb(150,150,150)
 }
</style>
