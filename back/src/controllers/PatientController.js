const Patient = require('../models/Patients')

module.exports = {
  // Lista os Patients do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { name: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const patient = await Patient.paginate(search, { sort: `-${sort}`});
    return res.json(patient)
  },
  
  // Retoma Patient requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const patient = await Patient.findById(id);
    return res.status(200).json(patient)
  },

  // gravar os patients
  async store(req, res) {
    try {
      let patient = await Patient.create(req.body)
      const id = patient._id
      delete patient._id

      await Patient.findByIdAndUpdate( { _id: id }, patient )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o patient
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Patient.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o patient
  async update(req, res) {
    const { id } = req.params
    const patient = await Patient.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(patient)
  },
}
