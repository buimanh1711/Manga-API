const Story = require('../../models/story')
const AccountModel = require('../../models/account')

const follow = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { authorId } = data

  Story.updateOne({
    _id
  }, {
    $push: {
      follows: { author: { _id: authorId } }
    }
  })
    .then(resData => {
      if (resData) {
        AccountModel.findOneAndUpdate({
          _id: authorId
        }, {
          $push: {
            following: { story: _id }
          }
        })
          .then((resData2) => {
            if (resData2) {
              res.json({
                status: true,
                message: 'follow khách hàng thành công!'
              })
            }
          })
      } else {
        req.err = 'Lỗi follow!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi follow! ' + err
      next('last')
    })
}

module.exports = follow