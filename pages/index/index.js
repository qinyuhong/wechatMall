//Page Object
// 引入封装好的请求 用于解决回调地狱的
import {request} from "../../request/index.js";
Page({
  data: {
    newSwipeList:[
      {image_src:"https://res.vmallres.com/pimages/detailImg/2020/01/15/24731F82F5B16A641C0368E3C08824DFF305EEEE71B4877B.jpg"},
      {image_src:"https://res.vmallres.com/pimages/detailImg/2019/10/22/7D52FB70D62549A3AA4BBAC22B86F3C063AF072A3F9A84D7.jpg"},
      {image_src:"https://res.vmallres.com/pimages/detailImg/2020/01/15/4ED6420129772D645D7B5DEB1AA8130BEBA5C27569CD750F.jpg"},
      {image_src:"https://res.vmallres.com/pimages/detailImg/2019/11/12/8AF5CC4FD17D1B8E0D192BC51D6CCA80E40782216763A78A.jpg"},
      {image_src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1386329772,3017138673&fm=26&gp=0.jpg"},
    ],
    
    swiperList: [],
    categoryList:[],
    getFloorList:[],
    recommendList:[
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i2/13933024215842254/T171dgFnNeXXXXXXXX_!!0-item_pic.jpg_500x500q90.jpg_.webp",
        title:"法式乡村田园公主床阿伦铁艺床1.5米1.8米单人双人床梅伍德铁架床",
        price:"1,858"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i4/1918616623/TB26.o9bbBkpuFjy1zkXXbSpFXa_!!1918616623.jpg_500x500q90.jpg_.webp",
        title:"树形置物架实木书架创意客厅木桩架简易小书柜落地多层柜现代原木",
        price:"120"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i4/1646324413/O1CN01OaxBVk1iTCNl5foWt_!!0-item_pic.jpg_500x500q90.jpg_.webp",
        title:"北欧表情NORHOR/墨尔本系列实木家具/都市复古/赫姆梳妆台梳妆凳",
        price:"3,980"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i2/1753075900/O1CN011tSFGCXSmdPmgff_!!0-item_pic.jpg_500x500q90.jpg_.webp",
        title:"懒人沙发单人阳台卧室小沙发小户型休闲简易折叠沙发午休房间躺椅",
        price:"498"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i3/1887331762/O1CN01QS2V6q1Ot2OeLVUtX_!!1887331762.jpg_500x500q90.jpg_.webp",
        title:"集木室物所/dramadeco设计师化妆镜ins网红玄关镜艺术异形镜子",
        price:"988"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i2/504369715/O1CN01MqZtvt2LdWMVuX3vx_!!0-item_pic.jpg_500x500q90.jpg_.webp",
        title:"日本进口冰箱密封保鲜盒果蔬收纳盒超大容量加厚食物干果储存盒",
        price:"41"
      },
      {
        image_src:"https://gw.alicdn.com/bao/uploaded/i3/354689984/O1CN01wREbWE2Ncit0Q4Ye1_!!0-item_pic.jpg_500x500q90.jpg_.webp",
        title:"陶泥汝釉小花插 景德镇陶瓷花瓶日式空间花器 茶席雅用茶道配件摆",
        price:"28.8"
      }
    ]
  },

  
  //options(Object)
  onLoad: function (options) {
    // 请求轮播图数据
    //  wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result)
    //     this.setData({
    //       swiperList:result.data.message 
    //     })
    //   },

    // });
    this.getSwiperList();
    this.getCategoryList();
    this.getFloorList();
    console.log(new Date().getTime())
  },
  onShow:function(){
    console.log(new Date().getTime())
  },
  
  // 获取轮播图数据
  getSwiperList:function(){
    // 封装之后的请求 解决回调地狱的问题
    request({
      url: '/home/swiperdata'
    }).then(result => {
      console.log(result.data)
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 获取分类导航数据
  getCategoryList:function(){
    request({
      url: '/home/catitems'
    }).then(result => {
        this.setData({
          categoryList: result.data.message
        })
      })
  },
  // 获取楼层数据
  getFloorList:function(){
    request({
      url: '/home/floordata'
    }).then(result => {
        this.setData({
          getFloorList: [...result.data.message,]
        })
      })
  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});