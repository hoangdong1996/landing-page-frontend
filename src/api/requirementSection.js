import request from '@/utils/request'

export function getRequirementSection() {
  return request({
    url: 'requirement-section/get-latest',
    method: 'get'
  })
}

export function createRequirementSection(data) {
  return request({
    url: 'requirement-section/create',
    method: 'post',
    data: data
  })
}
