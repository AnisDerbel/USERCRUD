const makeResponse = require('./response')
const model = require('./model')
// ////////////////////////////////////////////////////////////////////////// //
const resolveRequest = req =>
  new Promise(resolve => {
    let body = ''
    req.on('data', data => (body += data))
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (e) {
        resolve({})
      }
    })
  })
// ////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////// //
exports.get = (req, res) => makeResponse(res, model.list())
// ////////////////////////////////////////////////////////////////////////// //
exports.post = async (req, res) => {
  const payload = await resolveRequest(req)
  makeResponse(res, model.create(payload))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.put = async (req, res) => {
  const [userId] = req.url.split('/').reverse()
  const payload = await resolveRequest(req)
  makeResponse(res, model.update(userId, payload))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.del = ({ url }, res) => {
  const [userId] = url.split('/').reverse()
  makeResponse(res, model.remove(userId))
}
// ////////////////////////////////////////////////////////////////////////// //
exports.flush = (req, res) => {
  makeResponse(res, model.flush())
}
// ////////////////////////////////////////////////////////////////////////// //
exports.notFound = res => res.writeHead(404).end()
