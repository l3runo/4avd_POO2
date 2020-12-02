const Doctor = require('../models/Doctors')

module.exports = {
  // Lista os Doctors do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { name: { $regex: '.*' + termo + '.*' } },
        { specialty: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const doctor = await Doctor.paginate(search, { sort: `-${sort}`});
    return res.json(doctor)
  },
  
  // Retoma Doctor requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const doctor = await Doctor.findById(id);
    return res.status(200).json(doctor)
  },

  // gravar os doctors
  async store(req, res) {
    try {
      let doctor = await Doctor.create(req.body)
      const id = doctor._id
      delete doctor._id

      await Doctor.findByIdAndUpdate( { _id: id }, doctor )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o doctor
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Doctor.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o doctor
  async update(req, res) {
    const { id } = req.params
    const doctor = await Doctor.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(doctor)
  },
}
