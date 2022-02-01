import request from '@/utils/request';

export function getComment(page = 1, limit = 20) {
  return request({
    method: 'get',
    url: '/api/comment',
    params: {
      page,
      limit
    }
  })
}

export function deleteComment(id) {
  return request({
    method: 'delete',
    url: '/api/comment/' + id,
  })
}

