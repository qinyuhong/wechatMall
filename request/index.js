 // 发起多个异步请求的时候
 let ajaxTimes=0;
export const request=(params)=>{
    ajaxTimes++
    // 显示加载图标
    wx.showLoading({
        title:'加载中',
        mask:true
    })
  // const baseUrl ="http://127.0.0.1:8888/api/private/v1"
  const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
         wx.request({
             ...params,
            url:baseUrl+params.url,
            header:{
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODQ0NDQzOTIsImV4cCI6MTU4NDUzMDc5Mn0.ePB8WYQn53-8NhnIye2SsCeP_xILINpX1lGHAm1Qx8Y"
            },
            success: (result)=>{
               resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                     // 显示隐藏图标
                    wx.hideLoading()
                }
               
            }
        });
    })
}