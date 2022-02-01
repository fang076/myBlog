// 向服务器发送请求，获取首页标语

import request from '@/utils/request'


//基础，页面从创建开始就要获取分类，用来把已有的数据渲染出来
export function getBlogType() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}

// 设置类型，在顶部的设置位置可以添加类型
export function setBlgoType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

// 删除，需要传递id才能删除
export function deleteBlgoType(id) {
  return request.delete(`/api/blogtype/${id}`);
}


// 传递一个id，通过id查找到数据，并且回填到dia里。
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}


//更新分类，点击dia的确定按钮后，可以更新页面。需要传 id 和 需要更新的数据
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}
