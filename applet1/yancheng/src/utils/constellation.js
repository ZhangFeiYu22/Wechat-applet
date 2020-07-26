function constellation(dateTime) {
  let aa = dateTime.split('-')
  var month = aa[1];
  var day = aa[2];
  var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}

module.exports = {
  constellation: constellation
}
