import {buildFormData} from "./utils";

let timers = {};
export const required = function (value) {
    return !(value === null || value === undefined || value === "");
}

export const min = function (value, name, length) {
    let func = (passed, type) => {
        if (passed) return true;

        return window.trans(`validation.min.${type}`, {
            attribute: name,
            min: length
        });
    }

    if (Array.isArray(value)) return func(value.length >= length, 'array');

    else if (typeof value === 'number') return func(value >= length, 'numeric');

    else if (typeof value === 'string') return func(value.length >= length, 'string')

    return true;
}
export const max = function (value, name, length) {
    let func = (passed, type) => {
        if (passed) return true;

        return window.trans(`validation.max.${type}`, {
            attribute: name,
            max: length
        });
    }

    if (Array.isArray(value)) return func(value.length <= length, 'array');

    else if (typeof value === 'number') return func(value <= length, 'numeric');

    else if (typeof value === 'string') return func(value.length <= length, 'string')

    return true;
}

export const email = function (value, name) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value)
}

export const unique = function (value, name, c, o = 'id') {
    return new Promise((resolve, reject) => {
        window.axios.post('/validation', {rules: {[name]: [`unique:${c},${o}`]}, value: {[name]: value}}).then(res => {
            resolve(true)
        }).catch(err => {
            let data = err.response.data;
            if (data.errors) resolve(data.errors);
            else resolve(data.message);
        })
    })
}
export const nullable = function (value, name) {
    return !required(value)
}
export const defaultHandler = function (value, name, rule, ...params) {
    return new Promise((resolve, reject) => {
        let rules = rule;
        if (params.length > 0) rules += ":" + (params.join(','))
        const data = buildFormData({rules: {[name]: [rules]}, [name]: value});
        window.axios.post('/validation', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(true)
        }).catch(err => {
            let data = err.response.data;
            if (data.errors) resolve(data.errors);
            else resolve(data.message);
        })
    })
}
