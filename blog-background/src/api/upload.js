// 向服务器上传数据

import request from '@/utils/request'


export function upload(data){
  return request({
      url: '/api/upload',
      method: 'post',
      data
    })
}