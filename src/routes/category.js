const express = require('express')
const create = require('../api/category/create')
const getAll = require('../api/category/getAll')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/', auth, create)
router.get('/', getAll)

module.exports = router