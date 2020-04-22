//Page Object
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
 
  
  onShow() {
    
    const address = wx.getStorageSync('myAddress');
    let cart = wx.getStorageSync('cart') || [];
    // 空数组的话 every的返回值为true
    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    cart = cart.filter(v => v.checked)
    
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({
      cart,
      address,
      totalNum,
      totalPrice
    })
  },

  handleToPay() {
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      mask: true,
      success: (result) => {
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/order/index',
          });
        }, 1500)
      },
    });
  }

});