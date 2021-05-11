const StoryModel = require('../../models/story')

const getOne = (req, res, next) => {
    const { _id } = req.params

    StoryModel.findOne({ _id })
        .populate('chaps.chapter')
        .populate('comments.author', '_id role fullName image')
        .populate('follows.author', '_id role fullName image')
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    story: resData
                })
            } else {
                req.err = 'Không tìm thấy truyện!'
                next('last')
            }
        })
}

module.exports = getOne