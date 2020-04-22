// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        isActive:true
      },
      {
        id:1,
        value:'商品、商家投诉',
        isActive:false
      },
      
    ],
    chooseImg:[],
    textVal:""
  },
  // 动态修改active样式
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
  // 点击上传图片
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      // 图片格式：原图 压缩
      sizeType: ['original','compressed'],
      // 图片来源：照相机  相册
      sourceType: ['album','camera'],
      success: (result)=>{
          // console.log(result) 
          this.setData({
            chooseImg:[...this.data.chooseImg,...result.tempFilePaths]
          })
      }
    });
  },
  // 移除需要上传的数组
  handleIndex(e){
      const {index}=e.currentTarget.dataset
      const {chooseImg}=this.data;
      chooseImg.splice(index,1);
      this.setData({
        chooseImg
      })
  },
  // 修改文本域的内容
  handleText(e){
    const {textVal}=this.data;
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交
  handleFormSubmit(){
      const {textVal,chooseImg}=this.data;
      if(!textVal.trim()){
        wx.showToast({
          title: '输入内容不能为空',
          icon: 'none',
          mask: true,
        });
        return;
      }
      // 显示正在等待图标
      wx.showLoading({
        title:"正在上传中",
        mask:true
      })
      if(chooseImg.length!==0){
      
    chooseImg.forEach((v,i)=>{
      // 不支持多个文件上传  所以需要遍历上传
      wx.uploadFile({
        // 要上传到的服务器
        url: 'https://images.ac.cn/user/images',
        // 需要上传的图片路径
        filePath: v,
        // 上传文件的名称  用于后台来获取文件
        name: 'file',
        // 附带额外的内容信息
        formData: {},
        success: (result)=>{
          // console.log(result)

          // 所有的照片都上传完毕
           if(i===chooseImg.length-1){
             wx.hideLoading();
            //  重置数组
              this.setData({
                textVal:"",
                chooseImg:[]
              })
              // 返回上一页
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              })
           }
        },
       
      });
    })
      }else{
        wx.hideLoading();
        this.setData({
          textVal:"",
        })
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }
   

  }
})