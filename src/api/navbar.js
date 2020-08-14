import request from '@/utils/request';

export function getNavbar() {
    return request({
        url: 'navbar-section/get-latest',
        method: 'get'
    })
}

export function createNavbar(data) {
    return request({
        url: 'navbar-section/create',
        method: 'post',
        data: data
    })
}
