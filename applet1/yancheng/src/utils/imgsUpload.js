var store = require('../store/index');
var hexMD5 = require('./spark-md5');

export function imgsUpload(imagesArr) {
  var imgArr = [];
  var ossData = store.default.state.ossData;
  wx.showLoading({
    title: "上传中,请稍等..."
  });
  var tempFilePaths = imagesArr;
  for (var i = 0; i < tempFilePaths.length; i++) {
    // for是同步任务，for循环都结束时才会执行里面的异步函数，通过自执行函数传参（匿名函数），这样就形成了不受外界变量影响的局部作用域
    (function (i) {
      var md5name = hexMD5.hexMD5(
        Number(
          Math.random()
          .toString()
          .substr(3, 7) + Date.now()
        ).toString(36)
      );
      wx.uploadFile({
        url: ossData.host, //此处为实际接口地址
        filePath: tempFilePaths[i], //存储图片路径
        name: "file",
        header: {
          "Content-Type": "multipart/form-data"
        },
        method: "post",
        formData: {
          name: tempFilePaths[i],
          key: ossData.dir + "/" + md5name + ".png",
          policy: ossData.policy,
          OSSAccessKeyId: ossData.accessid,
          success_action_status: "200",
          signature: ossData.signature
        },
        success: function (res) {
          wx.hideLoading();
          var resImgUrl = ossData.host + "/" + ossData.dir + "/" + md5name + ".png";
          imgArr.push(resImgUrl);
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: "上传失败，请重新上传",
            icon: "none",
            duration: 2000
          });
        }
      });
    })(i);
  }
  return  imgArr
}