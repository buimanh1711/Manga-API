const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/story/create')
const getAll = require('../api/story/getAll')
const getOne = require('../api/story/getOne')
const update = require('../api/story/update')
const remove = require('../api/story/delete')
const comment = require('../api/story/comment')
const follow = require('../api/story/follow')

router.put('/:_id/follow', auth, follow)
router.put('/:_id/comment', auth, comment)
router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.get('/:_id', auth, getOne)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router
