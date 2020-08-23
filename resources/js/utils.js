export const buildFormData = (data) => {
    let formData = new FormData
    function appendData(data, parentKey) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                appendData(data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
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

export function arrayToFileList(files) {
    const data = new ClipboardEvent('').clipboardData || new DataTransfer();
    files.forEach(file => data.items.add(file));
    return data.files;
}

export function mergeFiles(files1, files2) {
    const files = [...files1];
    files2.forEach(file => {
        if (files.find(f => f.size === file.size && f.name === file.name) === undefined) {
            files.push(file);
        }
    });
    return files;
}

export function mergeFileLists(files1, files2) {
    return arrayToFileList(mergeFiles(Array.from(files1), Array.from(files2)));
}

export function diffFiles(oldFiles, newFiles) {
    if (oldFiles === null) {
        return [Array.from(newFiles), []];
    }
    const added = Array.from(newFiles).filter(f => !Array.from(oldFiles).includes(f));
    const removed = Array.from(oldFiles).filter(f => !Array.from(newFiles).includes(f));
    return [added, removed];
}

export function removeFile(fileList, file) {
    return arrayToFileList(Array.from(fileList).filter(f => f !== file));
}
