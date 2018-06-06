import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login/login'

//工作台组件 开始
import Work from '@/views/work/work'

import Pats from '@/views/work/pats-sys/pats'
import PatsInfo from '@/views/work/pats-sys/pats-info'
import PatBasicInfo from '@/views/components/work-components/pats-basic-info'
import PatWorkList from '@/views/components/work-components/pats-work-list'
import PatOrder from '@/views/components/work-components/pats-order'
import PatThreeTest from '@/views/components/work-components/pats-three-test'
import PatNurseRecord from '@/views/components/work-components/pats-nurse-record'
import PatMedicalRecord from '@/views/components/work-components/pats-medical-record'
import PatFee from '@/views/components/work-components/pats-fee'



import ThreeTest from '@/views/work/three-test-sys/three-test'
import NewThreeTest from '@/views/work/three-test-sys/new-three-test'
import PersonalThreeTest from '@/views/work/three-test-sys/personal-three-test'
import WorkList from '@/views/work/work-list-sys/work-list'


import NurseRecord from '@/views/work/nurse-record-sys/filter'
import NurseRecordDetail from '@/views/work/nurse-record-sys/nurse-record'
import NurseRecordNormal from '@/views/work/nurse-record-sys/nurse-record-normal'
import NurseRecordWomen from '@/views/work/nurse-record-sys/nurse-record-women'

import Infusion from '@/views/work/infusion-sys/infusion'

import ImportantInform from '@/views/work/important-inform-sys/important-inform'
import InformItem from '@/views/work/important-inform-sys/inform-item'
//工作台组件 结束

//扫码组件 开始
import Scan from '@/views/Scan/Scan'
import scanResult from '@/views/scan/scan-action/scan-result'
import scanPha from '@/views/scan/scan-action/scan-pha'
//扫码组件 结束

//备忘录 开始
import Mark from '@/views/mark/mark'
//备忘录 结束

//我的组件 开始
import Mine from '@/views/mine/mine'
//我的组件 结束



Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/Work',
      children: [
            { path: '/Work', component: Work, name: 'Work' },

            // { path: '/Comulity', component: Comulity, name: 'Comulity' },
              
            { path: '/Mark', component: Mark, name: 'Mark' },
            { path: '/Mine', component: Mine, name: 'Mine' },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ThreeTest',
      name: 'ThreeTest',
      component: ThreeTest
    },
    {
      path: '/Infusion',
      name: 'Infusion',
      component: Infusion
    },
     {
      path: '/Scan',
      name: 'Scan',
      component: Scan
    },
    {
      path: '/scanResult',
      name: 'scanResult',
      component: scanResult
    },
    {
      path: '/scanPha ',
      name: 'scanPha',
      component: scanPha
   
    },
    {
      path: '/NurseRecord',
      name: 'NurseRecord',
      component: NurseRecord
    },
    {
      path: '/NurseRecord',
      name: 'NurseRecord',
      component: NurseRecord
    },
    {
      path: '/WorkList ',
      name: 'WorkList',
      component: WorkList
    },
    {
      path: '/ImportantInform',
      name: 'ImportantInform',
      component: ImportantInform
    },
    {
      path: '/NurseRecordDetail',
      name: 'NurseRecordDetail',
      component: NurseRecordDetail
    },
    {
      path: '/NurseRecordNormal',
      name: 'NurseRecordNormal',
      component: NurseRecordNormal
    },
    {
      path: '/NurseRecordWomen',
      name: 'NurseRecordWomen',
      component: NurseRecordWomen
    },
    {
      path: '/Pats',
      name: 'Pats',
      component: Pats
    },
    {
      path: '/PatsInfo',
      name: 'PatsInfo',
      component: PatsInfo,
      children:[
          { path: '/PatBasicInfo', component: PatBasicInfo, name: 'PatBasicInfo' },
          { path: '/PatWorkList', component: PatWorkList, name: 'PatWorkList' },
          { path: '/PatOrder', component: PatOrder, name: 'PatOrder' },
          { path: '/PatThreeTest', component: PatThreeTest, name: 'PatThreeTest' },
          { path: '/PatNurseRecord', component: PatNurseRecord, name: 'PatNurseRecord' },
          { path: '/PatMedicalRecord', component: PatMedicalRecord, name: 'PatMedicalRecord' },
          { path: '/PatFee', component: PatFee, name: 'PatFee' }
      ]
    },
    {
      path:'/PersonalThreeTest',
      name:'PersonalThreeTest',
      component:PersonalThreeTest
    },
     {
      path:'/NewThreeTest',
      name:'NewThreeTest',
      component:NewThreeTest
    },
     {
      path:'/InformItem',
      name:'InformItem',
      component:InformItem
    }

    
  ]
})
