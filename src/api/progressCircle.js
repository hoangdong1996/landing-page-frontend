import request from '@/utils/request'

export function getProgressCircle() {
  return request({
    url: 'progress-circle-section/get-latest',
    method: 'get'
  })
}

export function createProgressCircle(data) {
  return request({
    url: 'progress-circle-section/create',
    method: 'post',
    data: data
  })
}
