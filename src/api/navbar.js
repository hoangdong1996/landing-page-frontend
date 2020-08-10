import request from '@/utils/request';

export function getNavbar() {
    return request({
        url: '/api/navbar-section/get-latest',
        method: 'get'
    })
}
