import request from '@/utils/request';

export function getHeroBranding() {
    return request({
        url: '/api/hero-branding-section/get-latest',
        method: 'get'
    })
}
