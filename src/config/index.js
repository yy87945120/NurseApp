const getUser=()=>{
	if(typeof(localStorage.user)=="undefined"){
		return -1;
	}else{
		return JSON.parse(localStorage.getItem('user'));
	}
}

const getPat=()=>{
	if(typeof(localStorage.pats)=="undefined"){
		return -1;
	}else{
		return JSON.parse(localStorage.getItem('pats'));
	}
}

const getConfig = () =>{
	if(typeof(localStorage.config)=="undefined"){
		console.log("default config info");
		let defaultConfig={};
		defaultConfig={
			shakeOn:true,
			voiceOn:true,
			infusionShowValue:"0"
		} 
		localStorage.setItem('config', JSON.stringify(defaultConfig));
		return JSON.parse(localStorage.getItem('config'));
	}else{
		return JSON.parse(localStorage.getItem('config'));
	}
}

const getDepartment = () =>{
	if(typeof(localStorage.dep)=="undefined"){
		return -1	
	}else{
		return JSON.parse(localStorage.getItem('dep'));
	}
}

export{getConfig, getUser, getDepartment, getPat}




