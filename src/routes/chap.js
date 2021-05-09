const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/chap/create')
const getAll = require('../api/chap/getAll')
const update = require('../api/chap/update')
const remove = require('../api/chap/delete')

router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router
