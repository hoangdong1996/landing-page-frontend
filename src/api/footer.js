import request from '@/utils/request'

export function getFooter() {
  return request({
    url: 'footer-section/get-latest',
    method: 'get'
  })
}

export function createFooter(data) {
  return request({
    url: 'footer-section/create',
    method: 'post',
    data: data
  })
}
