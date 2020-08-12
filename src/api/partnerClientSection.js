import request from '@/utils/request'

export function getPartnerClientSection() {
    return request({
        url: 'partner-client-section/get-latest',
        method: 'get'
    })
}
