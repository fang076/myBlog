import request from '@/utils/request'


export function getAbout() {
  return request({
    url: '/api/about',
    method: 'get'
  })
}

export function setAbout(data) {
  return request({
    url: '/api/about',
    method: 'post',
    data
  })
}
