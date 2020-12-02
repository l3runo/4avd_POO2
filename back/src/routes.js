const { Router } = require('express')
const multer = require('multer')
const DoctorController = require('./controllers/DoctorController')
const PatientController = require('./controllers/PatientController')
const AppointmentController = require('./controllers/AppointmentController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/doctors', DoctorController.index)
routes.post('/doctors', DoctorController.store)
routes.put('/doctors/:id', DoctorController.update)
routes.delete('/doctors/:id', DoctorController.destroy)
routes.get('/doctors/:id', DoctorController.show)

routes.get('/patients', PatientController.index)
routes.post('/patients', PatientController.store)
routes.put('/patients/:id', PatientController.update)
routes.delete('/patients/:id', PatientController.destroy)
routes.get('/patients/:id', PatientController.show)

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.store)
routes.put('/appointments/:id', AppointmentController.update)
routes.delete('/appointments/:id', AppointmentController.destroy)
routes.get('/appointments/:id', AppointmentController.show)

module.exports = routes