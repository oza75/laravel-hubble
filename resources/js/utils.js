export const buildFormData = (data) => {
    let formData = new FormData
    const appendData = (items, prefix = null) => {
        Object.keys(items).forEach(key => {
            let datum = items[key];
            if (datum === null) return formData;
            if (Array.isArray(datum)) {
                datum.forEach((elem, k) => {
                    if (prefix) appendData(elem, `${prefix}[${key}][${k}]`)
                    else appendData(elem, `${key}[${k}]`)
                })
            } else if (typeof datum === 'object') {
                appendData(datum, key)
            } else {
                if (prefix) formData.append(`${prefix}[${key}]`, datum)
                else formData.append(`${key}`, datum);
            }
        })
    }

    appendData(data)

    return formData;
}

export const smart_substr = (str, len) => {
    let temp = str.substr(0, len);
    if (str.length > len) temp += '...';
    if (temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
        temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
        if (str.length > len) temp += '...';
    }
    return temp;
}

export const encodeUrl = function (params, prefix = null) {
    let queries = []
    Object.keys(params).forEach((key) => {
        let param = params[key];
        if (param === null) return;
        if (Array.isArray(param)) {
            param.forEach((p, k) => {
                let value = encodeURIComponent(p);
                if (Array.isArray(p) || typeof p === 'object') {
                    if (prefix) {
                        queries.push(`${encodeUrl(p, `${prefix}[${key}][${k}]`)}`)
                    } else {
                        queries.push(`${encodeUrl(p, `${key}[${k}]`)}`)
                    }
                } else {
                    if (prefix) {
                        queries.push(`${prefix}[${key}][${k}]=${value}`)
                    } else {
                        queries.push(`${key}[${k}]=${value}`)
                    }
                }
            })
        } else if (typeof param === 'object') {
            queries.push(encodeUrl(param, key))
        } else {
            if (prefix) {
                queries.push(`${prefix}[${key}]=${encodeURIComponent(param)}`)
            } else {
                queries.push(`${key}=${encodeURIComponent(param)}`)
            }
        }
    })

    return queries.filter(val => !!val).join("&");
}
