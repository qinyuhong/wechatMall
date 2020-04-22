// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{},
    isCollect:false
  },

  // 商品分组数据
  GoodsListInfo:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    let {goods_id}=currentPage.options
   console.log(goods_id);
   this.getGoodsDetail(goods_id)
 
  },
// 获取数据
  async getGoodsDetail(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
    console.log(res);
    this.GoodsListInfo=res.data.message;
     //  获取缓存中商品收藏的缓存数组
    const collect=wx.getStorageSync('collect')||[];
    // 判断商品是否被收藏
    const isCollect=collect.some(v=>v.goods_id===this.GoodsListInfo.goods_id)
    this.setData({
      dataObj:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        // 部分苹果手机不支持webp格式的图片  可以将后台的图片格式修改一下
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.data.message.pics
      },
      isCollect
    })
  },
  // 点击轮播图放大预览
  handlePreview(e){
    const urls=this.GoodsListInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls,
    });
  },
  // 添加购物车功能
  handleAddCart(){
    // 获取缓存中的购物车数据
    let cart=wx.getStorageSync('cart')||[];
    // 判断购物车中是否存在该商品
    const index=cart.findIndex(v=>v.goods_id===this.GoodsListInfo.goods_id)
    if(index===-1){
      // 购物车中不存在该商品 将该商品加购进数组 并且该数量为1
      this.GoodsListInfo.num=1;
      // 模拟订单的数据
      this.GoodsListInfo.shopNum="JMYG"+new Date().getTime()
      this.GoodsListInfo.localTime=new Date().getTime()
      this.GoodsListInfo.checked=true
      cart.push(this.GoodsListInfo);
      
    }else{
      // 存在该商品  重新缓存购物车的数据
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        // 防止客户多次点击  防抖功能
       mask: true,
       
      });

  },
  // 立即购买
  handleTobuy(){
     // 获取缓存中的购物车数据
     let cart=wx.getStorageSync('cart')||[];
     // 判断购物车中是否存在该商品
     const index=cart.findIndex(v=>v.goods_id===this.GoodsListInfo.goods_id)
     if(index===-1){
       // 购物车中不存在该商品 将该商品加购进数组 并且该数量为1
       this.GoodsListInfo.num=1;
       // 模拟订单的数据
       this.GoodsListInfo.shopNum="JMYG"+new Date().getTime()
       this.GoodsListInfo.localTime=new Date().getTime()
       this.GoodsListInfo.checked=true
       cart.push(this.GoodsListInfo);
       
     }else{
       // 存在该商品  重新缓存购物车的数据
       cart[index].num++;
     }
     wx.setStorageSync('cart', cart);
    //  跳转到结算
       wx.reLaunch({
         url: '/pages/cart/index'
        
       });
  },
  // 商品收藏功能
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的数组
    let collect=wx.getStorageSync('collect')||[];
    // 2 判断该商品是否被收藏
    let index=collect.findIndex(v=>v.goods_id===this.GoodsListInfo.goods_id);
    if(index!==-1){
      // 商品被收藏了 则点击按钮 移除收藏的商品
      collect.splice(index,1)
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
        
      });
    }else{
      // 商品还没有被收藏  则收藏商品进缓存数组中
      collect.push(this.GoodsListInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
        
      });
    }
    //  将数组加入缓存中
    wx.setStorageSync('collect', collect);
    // 刷新isCollect的值
    this.setData({
      isCollect
    })
  }
})