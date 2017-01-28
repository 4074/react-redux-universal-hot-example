import crypto from 'crypto'

const config = {
    secretid: 'QmFzZTY0IGlzIGEgZ2VuZXJp',
    secretkey: 'AKIDZfbOA78asKUYBcXFrJD0a1ICvR98JM'
}

function getAuthorization(time, method, uri, params, headers) {
    let result = []
    const name = [
        'q-sign-algorithm',
        'q-ak',
        'q-sign-time',
        'q-key-time',
        'q-header-list',
        'q-url-param-list',
        'q-signature'
    ]

    const signature = getSignature(time, method, uri, params, headers)

    let headerKeys = []
    headers = headers.split('&')
    
    for (let h of headers) {
        h = h.split('=')
        if (h.length && h[0]) {
            headerKeys.push(h[0])
        }
    }

    const value = [
        'sha1',
        config.secretid,
        time,
        time,
        headerKeys.join(';'),
        params,
        signature
    ]

    for (let i=0, len=name.length; i<len; i++) {
        result.push(name[i] + '=' + value[i])
    }

    return result.join('&')

    function hmacSha1(s, key = config.secretkey) {
        const hmac = crypto.createHmac('sha1', key)
        hmac.update(s)
        return hmac.digest('hex')
    }

    function getFormatString(method, uri, params, headers) {
        const str = method + '\n' + uri + '\n' + params + '\n' + headers + '\n'
        const sha1 = crypto.createHash('sha1')
        sha1.update(str)
        return sha1.digest('hex')
    }

    function getSignature(time, method, uri, params, headers) {
        const key = hmacSha1(time)
        const stringToSign = 'sha1\n' + time + '\n' + getFormatString(method, uri, params, headers) + '\n'
        return hmacSha1(stringToSign, key)
    }
}

function test() {
    console.log(getAuthorization('1480932292;1481012292', 'get', '/testfile', '', 'host=testbucket-125000000.cn-north.myqcloud.com&range=bytes%3d0-3'))
}
test()