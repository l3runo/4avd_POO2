import React, { useState, useEffect  } from "react";
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Doctor, Patient, Appointment } from "../../services/interfaces";

const Profile: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState<Appointment[]>([]);

    const load = async () => {
        await api
          .get('appointments')
          .then(({ data }) => {
            setData(data.docs)
            console.log(data)
            
          })
    }
    useEffect(() => {
      load()}, [])

      const handleEdit = async (codigo: String) => {
        history.push('/alterar/' + codigo)
      }
  
      const handleDelete = async (codigo: String) => {
          try {
              await api.delete(`appointments/${codigo}`)
  
              alert('Cadastro deletado com sucesso.')
              load()
  
          } catch (err) {
              alert('Erro ao deletar registro.')
          }
      }


    return(
        <Container>
            <header>
                <img src={Logo} alt="medico" />
                <a href="/cadastrar">Cadastrar Exame</a>
            </header>

        

<h1>Consultas cadastradas</h1>
            <div>
            {
                data.length > 0
                ? data.map((p) => {
                    return (
                    <ul key={p._id}>
                        <li>
                                    <strong>Data da Consulta: {p.date}          </strong>
                                    <strong>Horario da Consulta: {p.time}       </strong>
                                    <strong>Nome do Médico: {p.doctor.name}    </strong>
                                    <strong>Especialidade: {p.doctor.specialty}</strong>
                                    <strong>Nome do Paciente: {p.patient.name}</strong>

                                    <button className="actionEditBtn" onClick={() => { handleEdit(p._id) }}>
                                            Alterar Informações
                                    </button>
                                    
                                    <button className="actionDelBtn" onClick={() => { handleDelete(p._id) }}>
                                        Cancelar Exame
                                    </button>                                
                                </li>

                          </ul> 
                    )
                })
                : <ul>
                    <li>
                        <span>Nenhum registro encontrado</span>
                    </li>
                </ul>
            }
        </div>
        </Container>
            
    );
}

export default Profile;