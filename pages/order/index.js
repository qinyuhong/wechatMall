// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'待发货',
        isActive:false
      },
      {
        id:3,
        value:'退款\退货',
        isActive:false
      },
   
    ],
    OrderValue:[]
  },
 onLoad(){
    const cart=wx.getStorageSync('cart')||[];
    this.setData({
      OrderValue:cart.map(v=>({...v,curTime:(new Date(v.localTime).toLocaleString())}))
    })
 },
// onshow生命周期函数中形参options无效
onShow(){   
  let pages=getCurrentPages()
  let currentPages=pages[pages.length-1]
  // 获取到个人页面传递过来的参数
  const {type} = currentPages.options
  // console.log(type)
  this.setIndexChange(type-1)
},

  handleTabsIndex(e){
    // console.log(e);
    const index =e.detail.index;
    this.setIndexChange(index)
  },
  setIndexChange(index){
       // 修改源数组
    let {tabs}=this.data;
    tabs.forEach((val,i)=>i===index?val.isActive=true:val.isActive=false)
    this.setData({
      tabs
    })
  }
})