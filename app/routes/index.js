const {Router} = require('express')

const router = Router()
router.use('/room', require('./room'))

module.exports = router
