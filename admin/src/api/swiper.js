import request from '@/utils/request'

export function getSwiperList() {
  return request({
    url: 'rest/swiper',
    method: 'get'
  })
}

export function addSwiper(data) {
  return request({
    url: 'rest/swiper',
    method: 'post',
    data
  })
}
