// pages/category/index.js
// 引入封装好的请求 用于解决回调地狱的
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单数据
    LeftMenuList: [],
    // 右边菜单的数据
    RightMenuList: [],
    //初始化点击位置
    currentColor: 0,
    // 右侧商品滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:8888/api/private/v1/categories',
      header: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODQ0NDQzOTIsImV4cCI6MTU4NDUzMDc5Mn0.ePB8WYQn53-8NhnIye2SsCeP_xILINpX1lGHAm1Qx8Y"
      },
      success(res){
        console.log('本地',res)
      }
    })
    // this.getCates()

    // 获取缓存中的数据
    const myCates = wx.getStorageSync('cates')
    // 如果缓存当中没有数据 则重新请求数据
    if (!myCates) {
      this.getCates()
    } else {
      // 判断数据是否过期  设置过期时间为十分钟
      if (Date.now() - myCates.time > 1000 * 60 * 10) {
        // 重新发送请求
        this.getCates()
      } else {
        // 可以使用旧数据
        this.Cates = myCates.data;

        let LeftMenuList = this.Cates.map(v => v.cat_name);
        let RightMenuList = this.Cates[0].children;
        this.setData({
          LeftMenuList,
          RightMenuList
        })
      }
    }
  },
  // 使用async await改造 发送异步请求 （这样可以使写法同步化
  async getCates() {
    console.log('11')
    const res = await request({
      url: "/categories"
    })
    console.log('hah',res)
    this.Cates = res.data.message;
    // 将数据存入缓存中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });

    // 获取左边菜单的数据
    let LeftMenuList = this.Cates.map(v => v.cat_name);
    // 获取右边菜单的数据
    let RightMenuList = this.Cates[0].children;
    this.setData({
      LeftMenuList,
      RightMenuList
    })
  },
  getMenuItem(e) {
    // console.log(e)
    // 动态改变选中的状态
    const index = e.currentTarget.dataset.index;
    let RightMenuList = this.Cates[index].children;
    this.setData({
      currentColor: index,
      RightMenuList,
      //重新渲染右侧商品滚动条距离顶部的距离
      scrollTop: 0
    })
  }
})