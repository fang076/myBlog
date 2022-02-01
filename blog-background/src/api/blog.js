// 向服务器发送请求,获得文章数据

import request from '@/utils/request';


// 页面创建时获取到文章，适用于获取文章页
export function getBlog(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }

  })
}


// 添加文章的api ，适用于添加文章页
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

export function deleteBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'delete',
  })
}


// 通过id查找到单篇文章，需要传递一个id

export function findOneBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'get',
  })
}

//编辑文章，需要传递一个对象，对象内有id和和一个对象data

export function editBlog(blogInfo) {
  return request({
    url: '/api/blog/' + blogInfo.id,
    method: 'put',
    data: blogInfo.data
  })
}
