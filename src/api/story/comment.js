const StoryModel = require('../../models/story')

const comment = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { content } = data
  const { userId } = req

  StoryModel.updateOne({
    _id
  }, {
    $push: {
      comments: { author: { _id: userId }, content, createdAt: Date.now() }
    }
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'comment truyện thành công!'
        })
      } else {
        req.err = 'Lỗi comment!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi comment! ' + err
      next('last')
    })
}

module.exports = comment

