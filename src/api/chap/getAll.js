const ChapModel = require('../../models/chap')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 8

const getAll = (req, res, next) => {
  const { page, story } = req.query

  if (!story) {
    req.err = 'Yêu cầu không hợp lệ!'
    next('last')
  }

  const { skip, limit } = getPage(page, PAGE_SIZE)

  ChapModel.find({
    story
  })
    .populate('story')
    .skip(skip)
    .limit(limit)
    .then(resData => {
      if (resData) {
        ChapModel.countDocuments({
          story
        })
          .then(count => {
            if (count || count === 0) {
              res.json({
                status: true,
                message: 'Lấy Chapter thành công!',
                currentPage: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                chaps: resData
              })
            }
          })
      } else {
        req.err = 'Lỗi lấy chapter!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy chapter ' + err
      next('last')
    })
}

module.exports = getAll