// pages/login/index.js
Page({
  GetuserInfo(e){
  // console.log(e)
  const {userInfo} =e.detail
  wx.setStorageSync('userInfo', userInfo)
  wx.navigateBack({
    delta: 1, // 回退前 delta(默认为1) 页面
    
  })
  }
})