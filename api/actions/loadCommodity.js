import request from 'request'
import { getServerUrl } from '../utils/url'

export default function loadCommodity() {
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
