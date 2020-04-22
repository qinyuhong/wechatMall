// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false
      },
      {
        id:3,
        value:'浏览器足迹',
        isActive:false
      },
   
    ],
    collectData:[]
  },
  onShow(){
    let collectData=wx.getStorageSync('collect');
    this.setData({
      collectData
    })
  },
  handleTabsIndex(e){
    // console.log(e);
    const index =e.detail.index;
      // 修改源数组
      let {tabs}=this.data;
      tabs.forEach((val,i)=>i===index?val.isActive=true:val.isActive=false)
      this.setData({
        tabs
      })
  },
  
})