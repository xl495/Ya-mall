import request from '@/utils/request'

export function getArticle() {
  return request({
    url: '/rest/article',
    method: 'get'
  })
}

export function removeArticle(id) {
  return request({
    url: `/rest/article/${id}`,
    method: 'delete'
  })
}

export function addArticle(data) {
  return request({
    url: '/rest/article',
    method: 'post',
    data
  })
}
