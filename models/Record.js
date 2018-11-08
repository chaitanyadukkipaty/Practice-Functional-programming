const mongoose = require('mongoose')

const schema = mongoose.Schema({
  date: Date,
  expense: String,	
  reason: {
     text: String,
  },
  created_at: {
      type: Date,
      default: Date.now()
  }
})

const Record = mongoose.model('Record', schema)

module.exports = { Record }
