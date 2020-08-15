import request from '@/utils/request'

export function getFeatureCarouselSection() {
  return request({
    url: 'feature-carousel-section/get-latest',
    method: 'get'
  })
}

export function createFeatureCarouselSection(data) {
  return request({
    url: 'feature-carousel-section/create',
    method:'post',
    data:data
  })
}
