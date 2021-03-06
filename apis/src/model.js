const db = require('./db')
// ////////////////////////////////////////////////////////////////////////// //
exports.list = () => ({ ok: true, list: db.read() })
// ////////////////////////////////////////////////////////////////////////// //
exports.update = (userId, user) => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id == userId)

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND' }

  data[userIndex] = { id: userId, ...user }
  db.write(data)
  return { ok: true, user }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.create = obj => {
  const data = db.read()
  const isUserExist = data.filter(x=> x.email === obj.email)[0]
  if(!isUserExist){
    const user = { id: Date.now(), ...obj }
    data.push(user)
    db.write(data)
    return { ok: true, user }
  }

  return { ok: false, message: 'User email already exist!' }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.remove = userId => {
  const data = db.read()
  const userIndex = data.findIndex(({ id }) => id == userId)

  if (userIndex < 0) return { ok: false, message: 'USER-NOT-FOUND' }

  data.splice(userIndex, 1)
  db.write(data)
  return { ok: true, userId }
}
// ////////////////////////////////////////////////////////////////////////// //
exports.flush = () => {
  db.write([])
  return { ok: true }
}
