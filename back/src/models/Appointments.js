const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const AppointmentSchema = new mongoose.Schema({
  doctor_id: String,
  patient_id: String,
  date: String,
  time: String,
}, {
  timestamps: true
})
AppointmentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Appointments', AppointmentSchema)
