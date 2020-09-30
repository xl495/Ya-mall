import request from '@/utils/request'

export function getGood() {
  return request({
    url: '/rest/good',
    method: 'get'
  })
}

export function removeGood(id) {
  return request({
    url: `/rest/good/${id}`,
    method: 'delete'
  })
}

export function addGood(data) {
  return request({
    url: '/rest/good',
    method: 'post',
    data
  })
}

export function updateGood(type, data) {
  return request({
    url: `/rest/good/${type}`,
    method: 'put',
    data
  })
}
