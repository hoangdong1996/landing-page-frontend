export function getStyleById(idStyle) {
    let element = document.getElementById(idStyle)
    return element
}

export function addStyleInClass(className, style) {
    let string = `.${className}{${style}!important}`
    if (string.length === 0)
        return ''
    else return string
}

