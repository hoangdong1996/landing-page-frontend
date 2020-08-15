import request from '@/utils/request'

export function getBusinessSection() {
  return request({
    url: 'business-section/get-latest',
    method: 'get'
  })
}

export function createBusinessSection(data) {
  return request({
    url: 'business-section/create',
    method: 'post',
    data: data
  })
}
