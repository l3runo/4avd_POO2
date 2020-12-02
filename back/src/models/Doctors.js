const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
}, {
  timestamps: true
})
DoctorSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Doctors', DoctorSchema)
