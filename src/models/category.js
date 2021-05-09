const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Category = new Schema({
  title: { type: String, default: '' },
  slug: { type: String, slug: "title" },
  stories: [{ story: { type: Schema.Types.ObjectId, ref: 'story' } }] || [],
})

module.exports = mongoose.model('category', Category)