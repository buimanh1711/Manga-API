const StoryModel = require('../../models/story')

const getOne = (req, res, next) => {
    const { _id } = req.params

    StoryModel.findOne({ _id })
        .populate('chaps.chapter')
        .populate('comments.author')
        .populate('follows.author')
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    guest: resData
                })
            } else {
                req.err = 'Không tìm thấy khách hàng!'
                next('last')
            }
        })
}

module.exports = getOne