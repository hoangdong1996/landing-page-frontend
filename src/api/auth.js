import request from '@/utils/request'

export function login(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data: data
    })
}1``
