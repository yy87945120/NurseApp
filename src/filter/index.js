let sFormat = value => {
  if(value == 0){
  	 return "男"
  }else if(value == 1){
  	 return "女";
  }else{
  	 return "未知";
  } 
}
let dateFormat = value =>{
    let date = value.getDate();
    return date
}
let timeFormat = value => {
  	let hour = Math.floor(value / 3600) ;
    let minute = Math.floor((value -  hour * 3600) / 60) ;
    let second = Math.floor(value - hour * 3600 - minute * 60) ; 
  	if( hour == 0){
  		
  		if (minute == 0 && second == 0){
  			return "输液完成"
  		}else{
  			if(hour == 0 && minute == 0 ){
  				return second+"秒";
  			}else{
  				return minute+"分"+second+"秒";
  			}
  			
  		}
  	}else{
  		if(isNaN(hour)){
  			return "输液完成"
  		}else{
  			return hour+"时"+minute+"分"+second+"秒";
  		}
  		
  	}
}

let stateFormat = value => {
  	if(value == 'Y'){
  		return "已执行";
  	}else if(value =='S'){
  		return '停止执行';
  	}else if(value =='N'){
  		return '未执行';
  	}else if(value =='O'){
      return '执行中';
    }
}

let infusionStateFormat = value => {
  if(value == 'Y'){
  	 return '已经完成';
  }else if(value == 'O'){
  	return '执行中';
  }else{
  	return '未开始';
  }
}

let ageFormat = value =>{
  if(value < 1){
      return value+"月"
  }else{
    return value+"岁"
  }
  
}

let dateYYYYMMddFormat = value => {
    let year = value.getFullYear();
    let month = value.getMonth();
    let date = value.getDate();
    return year+'-'+month+'-'+date
}

export { sFormat, timeFormat, stateFormat, infusionStateFormat, ageFormat, dateYYYYMMddFormat, dateFormat };
