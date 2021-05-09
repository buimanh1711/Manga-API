const ChapModel = require('../../models/chap')

const remove = (req, res, next) => {
  const { _id } = req.params

  ChapModel.deleteOne({
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