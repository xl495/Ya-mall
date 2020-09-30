import request from '@/utils/request'

export function getCategory() {
  return request({
    url: '/rest/category',
    method: 'get'
  })
}

export function getCategoryDetails(id) {
  return request({
    url: `/rest/category/${id}`,
    method: 'get'
  })
}

export function removeCategory(id) {
  return request({
    url: `/rest/category/${id}`,
    method: 'delete'
  })
}

export function addCategory(data) {
  return request({
    url: '/rest/category',
    method: 'post',
    data
  })
}

export function editCategory(id, data) {
  return request({
    url: `/rest/category/${id}`,
    method: 'put',
    data
  })
}
