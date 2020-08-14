import request from '@/utils/request';

export function uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    return request({
        url: 'api/image/uploadFile',
        method: 'post',
        data: formData
    })
}

export function uploadMultiFile(files) {
    const formData = new FormData()
    files.forEach(file => {
        formData.append('files',file)
    });
    return request({
        url: 'api/image/uploadMultiFile',
        method: 'post',
        data: formData
    })
}
