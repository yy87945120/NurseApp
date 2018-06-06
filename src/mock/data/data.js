import Mock from 'mockjs';

//随机数函数
const RandomTime =()=>{
  let myDate = new Date();
  let hour = myDate.getHours()*3600;
  let minute = myDate.getMinutes()*60;
  let second = myDate.getSeconds();
  let currentDate = myDate.getDate();
  let currentTime = hour+minute+second;
  let randomTime = parseInt(Math.random()*1800);
  let cutRandSecond = currentTime-parseInt(Math.random()*1800);
  let addRandSecond = currentTime+randomTime

  let randomTimeArr = {
    "startTime":cutRandSecond,
    "endTime":addRandSecond,
    "startDate":currentDate,
    "endDate":currentDate,
    "needTime":randomTime
  } 
  return randomTimeArr
}


//特定的登录人员
//病人信息随机生成
//床位信息
//输液信息
//医嘱信息

//特定的登录人员
const LoginUsers = [
  {
    id: 1,
    username: '411',
    password: '1',
    locList:[
    			{
    				locDesc:"中西医结合一病区",
    				locId:1
    			},
    			{
    				locDesc:"中西医结合二病区",
    				locId:2
    			}
    		],
    name: '姚展锋',
    job:"护师"
  },
  {
    id: 2,
    username: '119',
    password: '123',
	locList:[
				{
					locDesc:"呼吸内科一病区",
					locId:3
				},
				{
					locDesc:"呼吸内科二病区",
					locId:4
				}
			],
    name: "yy",
    job:"护士长"
  }
];


//病人信息随机生成
const Pats = [];

// for (let i = 0; i < 1000; i++) {
//   Pats.push(Mock.mock({
//     id: Mock.Random.guid(),
//     name: Mock.Random.cname(),
//     addr: Mock.mock('@county(true)'),
//     'age|18-80': 1,
//     reachedDate:Mock.Random.date('2018-2-dd'),
//     arrangedFlag:MockRandom.boolean(1,5,false),
//     idCard: Mock.Random.id(),
//     sex: Mock.Random.integer(0, 1),
//   }));  
// }
for (let i = 0; i < 10; i++) {
  Pats.push(Mock.mock({
    PatId: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    bed: '1001'
  }));  
}
const exaPat={
          PatId: 195790,
          name: "姚展锋",
          addr: "广东省 广州市 从化区 街口街",
          age:22,
          birth:"1996-3-11",
          sex:0
      }

Pats.push(exaPat);
//图标信息
const Icon = [
  	{
  	  	id:1,
  	  	iconDesc:"新临时医嘱",
  	  	iconUrl:""
  	},
  	{
  	  	id:2,
  	  	iconDesc:"新长时医嘱",
  	  	iconUrl:""
  	},
  	{
  	  	id:3,
  	  	iconDesc:"欠费状态",
  	  	iconUrl:""
  	},
  	{
  	  	id:4,
  	  	iconDesc:"病危",
  	  	iconUrl:""
  	},
  	{
  	  	id:5,
  	  	iconDesc:"有未执行医嘱",
  	  	iconUrl:""
  	}
];

//床位信息
const Bed = [
	{
		roomId:1,
		locId:1,
		bedNum:2,
		roomDesc:"双人间",
		bedList:[
			{	
				id:1,
				bedId:"1||1",
			},
			{	
				id:2,
				bedId:"1||1",

			}
		]
	},
	{
		roomId:2,
		locId:1,
		bedNum:1,
		roomDesc:"单人间",
		bedList:[
			{	
				id:3,
				bedId:"1||1"
			}
    ]
	}
]

//输液信息
//当前时间
const Infusion = [];

for (let i = 0; i < 10; i++) {
  let RandomData=RandomTime();
  Infusion.push(Mock.mock({
    id: i,
    patId:i,
    name:Mock.Random.cname(),
    'age|18-60': 1,
    sex: Mock.Random.integer(0, 1),
    startDate:RandomData.startDate,
    startTime:RandomData.startTime,
    endTime:RandomData.endTime,
    endDate:RandomData.endDate,
    needTime:RandomData.needTime,
    state:'Y',
    NurseDr:i,
    OEOrderDr:i,
    bed:'1001'
  }));  
}


//输液医嘱信息
const InfusionOEOrderItm = [
      {
        OEOrderId:123,
        patDr:195790,
        OEOrderName:"氯化钠",
        OEOrderBind:123,
      },
      {
        OEOrderId:124,
        patDr:195790,
        OEOrderName:"葡萄糖",
        OEOrderBind:123,
      }

]

export { LoginUsers, Pats, Bed, Icon, Infusion, InfusionOEOrderItm};