//Page Object
import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  
  onShow(){
    const address=wx.getStorageSync('myAddress');
    const cart=wx.getStorageSync('cart')||[];
    // 空数组的话 every的返回值为true
    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({address})
    this.setCart(cart);
  },
 
async  handleChooseAddress(){
    // 获取收货地址
    // wx.chooseAddress({
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })

    // // 获取用户权限
    // wx.getSetting({
    //   success: (result)=>{
    //     console.log(result) 
    //     // 获取权限状态
    //     const scopeAddress=result.authSetting["scope.address"]

    //     if(scopeAddress===true||scopeAddress===undefined){
    //         wx.chooseAddress({
    //           success:(res)=>{
    //             console.log(res)
    //           }
    //       })
    //     }else{
    //       // 用户以前拒绝过  诱导用户打开权限
    //       wx.openSetting({
    //         success:(result1)=>{
    //           wx.chooseAddress({
    //             success:(res1)=>{
    //               console.log(res1)
    //             }
    //         })
    //         }
    //       })
    //     }
    //   }
    // });
    try {
       // 优化   获取用户权限
    const res1=await getSetting();
    const scopeAddress=res1.authSetting["scope.address"]
    if(scopeAddress===false){
      // 诱导用户打开权限
      await openSetting()
    }
     // 调用收货地址
     const myAddress=await chooseAddress();
    //  将收货地址存入缓存中
     wx.setStorageSync('myAddress', myAddress)
    // console.log(res3)
    } catch (error) {
      console.log(error)
    }
   
  },

// 改变复选框选中状态
  handleItemChange(e){
      const itemIndex=e.currentTarget.dataset.id;
      // console.log(itemIndex)
      const {cart}=this.data;
      const index=cart.findIndex(v=>v.goods_id===itemIndex)
      // 状态取反
      cart[index].checked=! cart[index].checked;
      this.setCart(cart)
  },

  // 全选和反选
  handleItemAllchecked(){
    let {cart,allChecked} = this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },

// 商品的增加和减少
async handleItemComputed(e){
  let {operation,id}=e.currentTarget.dataset;
  console.log(operation,id);
  let {cart} = this.data;
  const index=cart.findIndex(v=>v.goods_id==id);
  if(cart[index].num===1&&operation===-1){
    const res =await showModal({content:"您是否要删除"});
    if(res.confirm){
      cart.splice(index,1)
      this.setCart(cart)
    }
  }else{
    cart[index].num+=operation;
    // 重新刷新data和缓存
    this.setCart(cart);
  }
  
},

// 结算功能
async handlepay(){
    const {address,totalNum,cart}=this.data;
    if(!address.userName){
      await showToast({title:'您还没有选择收货地址'})
      return;
    }
    if(totalNum===0){
      await showToast({title:'您还没有选择商品'})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
},

// 封装刷新缓存和data中购物车的数据
  setCart(cart){
     
      let allChecked=true;
      let totalPrice=0;
      let totalNum=0;
      cart.forEach(v=>{
        if(v.checked){
          totalPrice+=v.num*v.goods_price;
          totalNum+=v.num;
        }else{
          allChecked=false;
        }
      })
      allChecked=cart.length!==0?allChecked:false;
     
      this.setData({
          cart,
          allChecked,
          totalNum,
          totalPrice
      })
       //刷新缓存和data中购物车的数据
       wx.setStorageSync('cart', cart)
  }

  
});