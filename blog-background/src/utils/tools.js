// 工具的函数

export function dateComputed(time) {
  // const赋值后，就不能再赋值了。
  let date = new Date(parseInt(time));
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
// 给所有个位数的日期前面加个0
  if (month > 0 && month < 10) {
    month = '0' + month;
  }
  if (day > 0 && day < 10) {
    day = '0' + day;
  }
  if (hour > 0 && hour < 10) {
    hour = '0' + hour;
  }
  if (minute > 0 && minute < 10) {
    minute = '0' + minute;
  }
// 模板字符串拼接  tips 模板字符串保留空格
  const fullDate = `${year}-${month}-${day}  ${hour}:${minute}`
  return fullDate;
}
