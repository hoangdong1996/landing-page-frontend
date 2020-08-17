import request from '@/utils/request'

export function getPartnerClientSection() {
    return request({
        url: 'partner-client-section/get-latest',
        method: 'get'
    })
}

export function createPartnerClientSection(data) {
    return request({
        url: 'partner-client-section/create',
        method: 'post',
        data: data
    })
}
