// 向服务器发送请求，获取首页标语

import request from '@/utils/request'

export function getBanner(){
    return request({
        url: '/api/banner',
        method: 'get'
      })
}

export function setBanner(data){
  return request({
      url: '/api/banner',
      method: 'post',
      data
    })
}