import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import CamposFilme from './CamposFilme';

function Alterar() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState('busca');
  const [idDigitado, setIdDigitado] = useState('');
  const [valores, setValores] = useState({ id: '', nome: '', genero: '', ano: '', imagem: '' });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleProcurar = (e) => {
    e.preventDefault();
    setCarregando(true);
    axios.get(`${API_URL}/${idDigitado.trim()}`)
      .then(res => {
        setValores(res.data);
        setEtapa('encontrado');
      })
      .catch(err => {
        console.log(err);
        setEtapa('naoachou');
      })
      .finally(() => setCarregando(false));
  };

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleAlterar = (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    axios.put(`${API_URL}/${valores.id}`, valores)
      .then(() => navigate('/'))
      .catch(err => {
        console.log(err);
        setErro('Erro ao alterar o filme.');
        setCarregando(false);
      });
  };

  return (
    <div className="cartao">
      <h2>Alterar filme</h2>

      {etapa === 'busca' && (
        <form onSubmit={handleProcurar}>
          <div className="campo">
            <label htmlFor="id">ID do filme:</label>
            <input type="text" id="id" required
              placeholder="Digite o id do filme"
              value={idDigitado} onChange={e => setIdDigitado(e.target.value)} />
          </div>
          <div className="botoes">
            <button type="submit" className="btn btn-principal" disabled={carregando}>
              Procurar
            </button>
            <button type="button" className="btn btn-cancelar" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {etapa === 'encontrado' && (
        <form onSubmit={handleAlterar}>
          <p className="aviso">Editando o filme de ID {valores.id}</p>
          <CamposFilme valores={valores} onChange={handleChange} />

          {erro && <p className="mensagem-erro">{erro}</p>}

          <div className="botoes">
            <button type="submit" className="btn btn-principal" disabled={carregando}>
              Alterar
            </button>
            <button type="button" className="btn btn-cancelar" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {etapa === 'naoachou' && (
        <div>
          <p className="mensagem-erro">
            Nenhum filme encontrado com o ID "{idDigitado}".
          </p>
          <div className="botoes">
            <button className="btn btn-cancelar" onClick={() => navigate('/')}>
              Voltar para o Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alterar;
