export function pngSrc(src) {
    const begin = 'data:image/png;base64,'
    return begin + src
}

export function imgUrl(id) {
    return `${process.env.VUE_APP_BASE_API}image/${id}`
}
