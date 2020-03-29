function getDateDiff(dateTimeStamp) {
  var value = dateTimeStamp.toString().replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/, '$1 $2').replace(/-/g, '/')
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  //区分用户的机型
  var tempTime = ''
  var diffValue = ''
  wx.getSystemInfo({
    success: function (res) {
      if (res.platform == "ios") {
        diffValue = now - new Date(Date.parse(value)) - 1000 * 60 * 60 * 8
      } else {
        diffValue = now - new Date(dateTimeStamp).getTime();
      }
    },
  })
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result = '';
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}

module.exports = {
  getDateDiff: getDateDiff
}
