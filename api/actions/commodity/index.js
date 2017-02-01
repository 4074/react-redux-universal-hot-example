import request from 'request'
import { getServerUrl } from '../../utils/url'

export function load(req, params) {
    return new Promise((resolve, reject) => {
        const url = getServerUrl('commodity/list')
        request(url, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                const json = JSON.parse(body)
                if (json.status) {
                    resolve(json.data)
                } else {
                    reject(Error(json.message))
                }
            } else {
                reject(err)
            }
        })
    })
}

export function save(req) {
    const params = req.body
    console.log(params)
    return new Promise((resolve, reject) => {
        const url = getServerUrl(params.id ? 'commodity/update' : 'commodity/insert')
        request({
            url: url,
            method: 'post',
            form: params
        }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                const json = JSON.parse(body)
                if (json.status) {
                    resolve(json.data)
                } else {
                    reject(Error(json.message))
                }
            } else {
                reject(err)
            }
        })
    })
}
