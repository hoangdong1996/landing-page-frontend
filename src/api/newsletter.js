import request from '@/utils/request'

export function getNewsletter() {
  return request({
    url: 'newsletter-section/get-latest',
    method: 'get'
  })
}

export function createNewsletter(data) {
  return request({
    url: 'newsletter-section/create',
    method:'post',
    data: data
  })
}
