import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import CamposFilme from './CamposFilme';

function Criar() {
  const navigate = useNavigate();
  const [valores, setValores] = useState({ nome: '', genero: '', ano: '', imagem: '' });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');
    axios.post(API_URL, valores)
      .then(() => navigate('/'))
      .catch(err => {
        console.log(err);
        setErro('Erro ao criar o filme.');
        setEnviando(false);
      });
  };

  return (
    <div className="cartao">
      <h2>Criar filme</h2>
      <form onSubmit={handleSubmit}>
        <CamposFilme valores={valores} onChange={handleChange} />

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="botoes">
          <button type="submit" className="btn btn-principal" disabled={enviando}>
            Criar
          </button>
          <button type="button" className="btn btn-cancelar" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Criar;
