const Appointment = require('../models/Appointments')
const Doctor = require('../models/Doctors')
const Patient = require('../models/Patients')

module.exports = {
  // Lista os Appointments do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { doctor_id: { $regex: '.*' + termo + '.*' } },
        { patient_id: { $regex: '.*' + termo + '.*' } },
        { date: { $regex: '.*' + termo + '.*' } },
        { time: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const appointment = await Appointment.paginate(search, { sort: `-${sort}`});
    let array = []

    const someFunction = (myArray) => {
      const promises = myArray.map(async (o) => {
        const doctor = await Doctor.paginate({_id: o.doctor_id});
        const patient = await Patient.paginate({_id: o.patient_id});
        return {
          _id: o._id,
          doctor_id: o.doctor_id,
          doctor: doctor.docs[0],
          patient_id: o.patient_id,
          patient: patient.docs[0],
          date: o.date,
          time: o.time,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          __v: o.__v
        }
      });
      return Promise.all(promises);
  }

    array = await someFunction(appointment.docs)
    appointment.docs = array
    return res.json(appointment)
  },
  
  // Retoma Appointment requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const o = await Appointment.findById(id);
    const doctor = await Doctor.paginate({_id: o.doctor_id});
    const patient = await Patient.paginate({_id: o.patient_id});
    appointment = {
      _id: o._id,
      doctor_id: o.doctor_id,
      doctor: doctor.docs[0],
      patient_id: o.patient_id,
      patient: patient.docs[0],
      date: o.date,
      time: o.time,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      __v: o.__v
    }
    return res.status(200).json(appointment)
  },

  // gravar os appointments
  async store(req, res) {
    try {
      let appointment = await Appointment.create(req.body)
      const id = appointment._id
      delete appointment._id

      await Appointment.findByIdAndUpdate( { _id: id }, appointment )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o appointment
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Appointment.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o appointment
  async update(req, res) {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(appointment)
  },
}