import request from '@/utils/request'

export function getStyle() {
    return request({
        url: 'style/get-latest',
        method: 'get'
    })
}

export function createStyle(data) {
    return request({
        url: 'style/create',
        method: 'post',
        data: data
    })
}
