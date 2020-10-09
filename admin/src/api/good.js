import request from '@/utils/request'

export function getGood(id) {
  return request({
    url: `/rest/good/${id}`,
    method: 'get'
  })
}

export function getGoodList() {
  return request({
    url: `/rest/good`,
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

export function addGoodAttr(data) {
  return request({
    url: '/rest/goodAttribute',
    method: 'post',
    data
  })
}

export function getGoodAttr() {
  return request({
    url: '/rest/goodAttribute',
    method: 'get'
  })
}

export function removeGoodAttr(id) {
  return request({
    url: `/rest/goodAttribute/${id}`,
    method: 'delete'
  })
}

export function addGoodSpec(data) {
  return request({
    url: '/rest/goodSpec',
    method: 'post',
    data
  })
}
