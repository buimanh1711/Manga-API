const Story = require('../../models/story')

const comment = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { authorId, content } = data

  Story.updateOne({
    _id
  }, {
    $push: {
      comments: { author: { _id: authorId }, content, createAt: Date.now() }
    }
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'comment khách hàng thành công!'
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