export function param2Obj(url) {
  const search = url.split('?')[1]     //split()以某分隔符将字符串分割成数组
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

}