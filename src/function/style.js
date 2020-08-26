export function getStyleById(idStyle){
    let element = document.getElementById(idStyle)
    return element
}

export function addStyleInClass(className,style) {
    let string = `.${className}{${style}!important}`
    return string
}

