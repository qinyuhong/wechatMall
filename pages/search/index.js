// pages/search/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFouce:false,
    inpValue:"",
  },
  timeId: -1,
  
  handleInput(e) {
    // 获取输入的值
    const {
      value
    } = e.detail;
    // 检验合法性
    if(!value.trim()){
      this.setData({
        goods:[],  
        isFouce:false
      })
      // 值不合法
      return;
    }

    this.setData({
      isFouce:true
    })
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.Qsearch(value)
    }, 1000)

  },
  // 发送请求 获取搜索数据
  async Qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    // console.log(res)
    this.setData({
      goods: res.data.message
    })
  },
  handlebtn(){
    this.setData({
      goods:[],
      isFouce:false,
      inpValue:""
    })
  }

})