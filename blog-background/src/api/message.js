import request from '@/utils/request';

// 获取全部的留言板
export function getMessage(page=1,limit=20) {
  return request({
    method: 'get',
    url: '/api/message',
    params:{
      page,
      limit
    }
  })
}

// 删除留言板，传递一个id
export function deleteMessage(id) {
  return request({
    method: 'delete',
    url: '/api/message/' + id
  })
}
