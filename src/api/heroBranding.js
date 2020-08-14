import request from '@/utils/request';

export function getHeroBranding() {
    return request({
        url: 'hero-branding-section/get-latest',
        method: 'get'
    })
}

export function createHeroBranding (data) {
    return request({
        url: 'hero-branding-section/create',
        method: 'post',
        data: data
    })

}
