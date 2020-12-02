import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import { FaStreetView } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiStreetLight } from 'react-icons/gi';
import { MdLocalBar } from 'react-icons/md';
import logoImg from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import TextArea from "../../components/TextArea";
import api from '../../services/api';
import { Doctor, Patient, Appointment } from "../../services/interfaces";
import { useHistory } from 'react-router-dom';


const Cadastrar: React.FC = () => {

    const history = useHistory();
    
    const [selectedPatient, setSelectedPatient] = useState('');
    const [doctor, setDoctor] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [patient, setPatient] = useState<Patient[]>([]);
  
    const load = async () => {
      await api
        .get('doctors')
        .then(({ data }) => {
          setDoctor(data.docs)
        })
      await api
        .get('patients')
        .then(({ data }) => {
          setPatient(data.docs)
        })
    }
    useEffect(() => {
      load()}, [])
  
    function handleSelectDoctor(event: ChangeEvent<HTMLSelectElement>) {
      const res = event.target.value;
  
      setSelectedDoctor(res);
    };
  
   
  
  
    function handleSelectPatient(event: ChangeEvent<HTMLSelectElement>) {
      const res = event.target.value;
  
      setSelectedPatient(res);
    };
  
    async function handleSubmit(data: Appointment) {
        try {
          const schema = Yup.object().shape({
            date: Yup.string().required('Data do exame obrigatório'),
            time: Yup.string().required('Hora do exame obrigatório'),
          });
  
          await schema.validate(data, {
              abortEarly: false
          });
  
          if (!selectedDoctor || !selectedPatient) {
            throw new Error("Doutor e Paciente são obrigatórios");
          }
  
          let body = {
            doctor_id: selectedDoctor,
            patient_id: selectedPatient,
            date: data.date,
            time: data.time
          }
          
          try {
              await api({
                  method: 'post',
                  url: 'appointments',
                  data: body,
                  headers: {'Content-Type': 'application/json' }
                  })
  
              alert('Cadastro efetuado com sucesso.')
  
              history.push('/')
          } catch (err) {
              alert('Erro ao cadastrar seus dados.')
          }
      } catch ( error ) {
          console.log(error)
      }
    }
  
    return(
      <Container>
          <header>
              <img src={logoImg} alt="username" />

              <span>Cadastro de Exames</span>

              <a href="/">
              <FiArrowLeft />
                  Voltar
              </a>
          </header>

      <Form onSubmit={handleSubmit}>

      <fieldset>
        <legend>
          <h2>Dados do Exame</h2>
        </legend>
        <select
          value={selectedDoctor}
          onChange={handleSelectDoctor}
        >
          <option>Selecione o Medico</option>
        {
          doctor.length > 0
          ? doctor.map((o) => {
              return (
              <option key={o._id} value={o._id}>{o.name} - {o.specialty}</option>
              )
            })
          : <option>Nenhum Medico encontrado</option>
        }
        </select>

         <select
            value={selectedPatient}
            onChange={handleSelectPatient}
          >
          <option>Selecione o Paciente</option>
        {
          patient.length > 0
          ? patient.map((o) => {
              return (
                <option key={o._id} value={o._id}>{o.name}</option>
              )
            })
          : <option>Nenhum Paciente encontrado</option>
        }
        </select>

         <Input name="date" type="date" placeholder="Data do Exame" />
         <Input name="time" type="time" placeholder="Hora do Exame" />

         
      </fieldset>
      <Button type="submit">
        Cadastrar
      </Button>
    </Form>
      </Container>
          
  );
}


export default Cadastrar;