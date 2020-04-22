// pages/goods_list/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      },

    ],
    goodLists:[]
  },
  // 初始化接口参数
OptionsItem:{
  query:"",
  cid:"",
  // 页码
  pagenum:1,
  // 页容量
  pagesize:10
},
//初始化总页数
totalPage:0,


// 页数=Math.ceil(总数total/页容量this.OptionsItem.pagesize)
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    console.log(options)
   this.OptionsItem.cid=options.cid;
   this.getGoodLists()
    
  },
  // 上拉刷新
  onReachBottom(){
    // 判断当前页数是否大于总页码数
    if(this.OptionsItem.pagenum>=this.totalPage){
        wx.showToast({title:'没有更多内容了',icon:'none'})
    }else{
        this.OptionsItem.pagenum++
        // 重新再请求数据
        this.getGoodLists()
    }
  },
  async getGoodLists(){
   const res= await request({url:"/goods/search",data:this.OptionsItem});
   console.log(res);
  //  获取每个接口的总条数
  const total=res.data.message.total;
// 计算总页数
    this.totalPage=Math.ceil(total/this.OptionsItem.pagesize);
    // console.log(this.totalPage)
   this.setData({
    //  下拉刷新后的数据再拼接
    goodLists:[...this.data.goodLists,...res.data.message.goods]
   })
  
    //  手动关闭下拉加载的效果
   wx.stopPullDownRefresh();
  
  },

// 下拉刷新
onPullDownRefreash(){
    //重置数组
    this.setData({
      goodLists:[]
    })
    // 重置页码
    this.OptionsItem.pagenum=1;
    // 重新发送请求
    this.getGoodLists();
},

// 改变tab的active样式
  handleTabsIndex(e){
    // console.log(e);
    const index =e.detail.index;
    // 修改源数组
    let {tabs}=this.data;
    tabs.forEach((val,i)=>i===index?val.isActive=true:val.isActive=false)
    this.setData({
      tabs
    })
  }

})