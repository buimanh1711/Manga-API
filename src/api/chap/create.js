const ChapModel = require('../../models/chap')
const StoryModel = require('../../models/story')

const toSlug = require('../../utils/toSlug')

const create = (req, res, next) => {
  const data = req.body

  ChapModel.findOne({
    slug: toSlug(data.name),
    story: data.story
  })
    .then(resData => {
      if (resData) {
        req.err = 'chapter đã tồn tại!'
        next('last')
      } else {

        const newData = {
          ...data
        }

        const newChapter = new ChapModel(newData)
        newChapter.save(err => {
          if (err === null) {
            StoryModel.findByIdAndUpdate({
              _id: data.story
            }, {
              createAt: Date.now(),
              $push: {
                chaps: { chapter: newChapter._id }
              }
            })
              .then(resData2 => {
                if (resData2) {
                  res.json({
                    status: true,
                    message: 'Thêm chapter thành công!',
                    newChapter: newChapter
                  })
                } else {
                  req.err = 'Thêm chapter thất bại!'
                  console.log(err)
                  next('last')
                }
              })
          } else {
            req.err = 'Thêm chapter thất bại!'
            next('last')
          }
        })
      }
    })
}

module.exports = create