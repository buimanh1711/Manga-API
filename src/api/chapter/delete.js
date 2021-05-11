const ChapterModel = require('../../models/chapter')

const remove = (req, res, next) => {
  const { _id } = req.params

  ChapterModel.deleteOne({
    _id: _id
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true
        })
      } else {
        req.err = "Không thể xóa"
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa chapter! ' + err
      next('last')
    })

}

module.exports = remove