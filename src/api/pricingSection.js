import request from '@/utils/request'

export function getPricingSection() {
  return request({
    url: 'pricing-component-section/get-latest',
    method: 'get'
  })
}
