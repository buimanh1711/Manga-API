const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Story = new Schema({
  title: { type: String, maxLength: 255 },
  categories: [{ category: { type: Schema.Types.ObjectId, ref: 'category' } }] || [],
  chaps: [{ chapter: { type: Schema.Types.ObjectId, ref: 'chap' } }] || [],
  author: { type: Schema.Types.ObjectId, ref: 'account' },
  comments: [{ author: { type: Schema.Types.ObjectId, ref: 'account' }, content: { type: String }, createAt: { type: Date } }] || [],
  follows: [{ author: { type: Schema.Types.ObjectId, ref: 'account' } }] || [],
  isCompleted: { type: Boolean, default: false },
  image: { type: Object, default: { url: '/images/user_default_img.png' } },
  shortDescription: { type: String, default: 'Đang cập nhật...' },
  slug: { type: String, slug: "title" },
  text: { type: String, default: "" }
}, {
  timestamps: true
})

module.exports = mongoose.model('story', Story)