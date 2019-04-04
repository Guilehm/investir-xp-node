const https = require('https');

const CONNECTION_TIMEOUT = 1000

function getUrlData(url) {

    return new Promise((resolve, reject) => {
        let dealWithResponse = response => {
            let data = ''
            response.on('data', dataChunk => data += dataChunk)
            response.on('end', () => {
                try {
                    let obj = JSON.parse(data)
                    resolve(obj)
                } catch (e) {
                    reject(e)
                }})}

        let request = https
            .get(url, dealWithResponse)
            .on('error', (e) => {
                reject(e)
            })

        request.setTimeout(CONNECTION_TIMEOUT, () => {
            request.abort()
        })
        request.end()
    })
}

module.exports = getUrlData
