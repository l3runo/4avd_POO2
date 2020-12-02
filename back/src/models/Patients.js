const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const PatientSchema = new mongoose.Schema({
  name: String
}, {
  timestamps: true
})
PatientSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Patients', PatientSchema)
