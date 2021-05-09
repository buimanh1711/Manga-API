const StoryModel = require('../../models/story')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 10

const getAll = (req, res, next) => {
  const { category, page, search } = req.query
  const { skip, limit } = getPage(page, PAGE_SIZE)
  const query = {}

  if (category && category !== 'null') query.category = category
  if (search && search !== 'null') query.text = { $regex: search, $options: 'gi'}

  StoryModel.find(query)
    .populate('comments.author', 'image _id fullName')
    .populate('follows.author', 'image _id fullName')
    .skip(skip)
    .limit(limit)
    .then(resData => {
      if (resData) {
        StoryModel.countDocuments(query)
          .then(count => {
            if (count || count === 0) {
              res.json({
                status: true,
                message: 'Lấy truyện thành công!',
                stories: resData,
                currentPage: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                totalStories: count
              })
            } else {
              req.err = 'Lỗi lấy truyện'
              next('last')
            }
          })
      } else {
        req.err = 'Lỗi lấy truyện!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy truyện! + ${err}`
      next('last')
    })
}

module.exports = getAll