import crypto from 'crypto'

const config = {
    appid: '1251334503',
    bucket: 'zhide',
    secretid: 'AKIDWD0gGj5GF2e4J5vacS6nJe4MScicYq9N',
    secretkey: 'DESZZO1UdkgV8Zt7nQs8C4kHsJrMgomh',
    host: 'zhide-1251334503.cosgz.myqcloud.com'
}

const request_url = 'http://gz.file.myqcloud.com/files/v2/' + config.appid + '/' + config.bucket + '/'

function encryptOrigin(origin, key = config.secretkey) {
    console.log(origin)
    const hmac = crypto.createHmac('sha1', key)
    hmac.update(origin)
    const digest = hmac.digest('hex')
    console.log(digest)
    const buffer = new Buffer(digest + origin)
    console.log(buffer)
    return buffer.toString('base64')
}

function getAuthorization() {
    let result = []
    const name = [
        'a',
        'b',
        'k',
        'e',
        't',
        'r',
        'f'
    ]

    const currentTime = parseInt(new Date().getTime() / 1000)
    const expiredTime = currentTime + 7776000

    const value = [
        config.appid,
        config.bucket,
        config.secretid,
        expiredTime,
        currentTime,
        1,
        ""
    ]

    for (let i=0, len=name.length; i<len; i++) {
        result.push(name[i] + '=' + value[i])
    }

    result = result.join('&')

    return 'mYfJvtehIIGg1tzS2kH2HRJgu1ZhPTEyNTEzMzQ1MDMmaz1BS0lEV0QwZ0dqNUdGMmU0SjV2YWNTNm5KZTRNU2NpY1lxOU4mZT0xNDkzNzEwNTczJnQ9MTQ4NTkzNDU3MyZyPTE1NzUyMTE1MTImZj0mYj16aGlkZQ=='
    // return encryptOrigin('a=200001&b=newbucket&k=AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv&e=1437995704&t=1437995644&r=2081660421&f=', 'bLcPnl88WU30VY57ipRhSePfPdOfSruK')
}

function test() {
    console.log(getAuthorization())
}
test()
listDir()
function listDir() {
    window.sign = getAuthorization()
    let headers = new Headers()
    headers.append('Authorization', getAuthorization())
    const request = new Request('http://blog.parryqiu.com', {
        method: 'GET',
        mode: 'cors',
        headers: headers
    })
    
    fetch('http://blog.parryqiu.com', {
        method: 'GET',
        headers: {
            'ff': 'd',
            Method: 'get'
        }
    }).then(function(res) {
        console.log(res)
    })
}