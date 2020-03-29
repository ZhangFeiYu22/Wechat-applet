var store = require('../store/index');
var hexMD5 = require('./spark-md5');

export function imgsUpload(imagesArr) {
  return new Promise((resolve, reject) => {
    var ossData = store.default.state.ossData;
    wx.showLoading({
      title: "上传中,请稍等..."
    });
    var tempFilePaths = imagesArr;
    var md5name = hexMD5.hexMD5(
      Number(
        Math.random()
        .toString()
        .substr(3, 7) + Date.now()
      ).toString(36)
    );
    wx.uploadFile({
      url: ossData.host, //此处为实际接口地址
      filePath: tempFilePaths, //存储图片路径
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      method: "post",
      formData: {
        name: tempFilePaths,
        key: ossData.dir + "/" + md5name + ".png",
        policy: ossData.policy,
        OSSAccessKeyId: ossData.accessid,
        success_action_status: "200",
        signature: ossData.signature
      },
      success: function (res) {
        wx.hideLoading();
        var resImgUrl = ossData.host + "/" + ossData.dir + "/" + md5name + ".png";
        resolve(resImgUrl)
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: "上传失败，请重新上传",
          icon: "none",
          duration: 2000
        });
        reject(err);
      }
    });
  })
}
