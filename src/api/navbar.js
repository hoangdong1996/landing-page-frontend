import request from '@/utils/request';

export function getNavbar() {
    return request({
        url: 'navbar-section/get-latest',
        method: 'get'
    })
}
