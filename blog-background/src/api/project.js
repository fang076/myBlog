import request from '@/utils/request';
// 添加项目的api ，需要传递一个对象
// {
//   "description": "", 项目描述段落
//   "name": "", // 项目名称
//   "url": "", // 项目效果请求地址
//   "github": "", // 项目github地址
//   "thumb": "", // 缩略图，项目截图
//   "order": 1 // 排序
// }
export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

//获取所有项目
export function getProject() {
  return request({
    url: '/api/project',
    method: 'get',
  })
}

// 删除项目 ，传一个id
export function deleteProject(id) {
  return request({
    // 调试了好久，路径后面一定要跟"/"再加id
    url: `/api/project/${id}`,
    method: 'delete',
  })
}

// 编辑，传一个对象，对象形式： {id:    ,data:  }
export function editProject(projectInfo) {
  return request({
    url: `/api/project/${projectInfo.id}`,
    method: 'put',
    data: projectInfo.data
  })
}
// 