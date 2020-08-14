import request from '@/utils/request'

export function getAboutSection() {
  return request({
    url: 'about-section/get-latest',
    method: 'get'
  })
}

export function createAboutSection(data) {
  return request({
    url: 'about-section/create',
    method: 'post',
    data: data
  })
}
