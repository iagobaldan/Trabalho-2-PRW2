import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import Cartaz from './Cartaz';

function Apagar() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState('busca');
  const [idDigitado, setIdDigitado] = useState('');
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleProcurar = (e) => {
    e.preventDefault();
    setCarregando(true);
    axios.get(`${API_URL}/${idDigitado.trim()}`)
      .then(res => {
        setFilme(res.data);
        setEtapa('encontrado');
      })
      .catch(err => {
        console.log(err);
        setEtapa('naoachou');
      })
      .finally(() => setCarregando(false));
  };

  const handleApagar = () => {
    setCarregando(true);
    setErro('');
    axios.delete(`${API_URL}/${filme.id}`)
      .then(() => navigate('/'))
      .catch(err => {
        console.log(err);
        setErro('Erro ao apagar o filme.');
        setCarregando(false);
      });
  };

  return (
    <div className="cartao">
      <h2>Apagar filme</h2>

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

      {etapa === 'encontrado' && filme && (
        <div>
          <p className="aviso">Confirme os dados do filme que será apagado:</p>
          <div className="previa">
            <Cartaz src={filme.imagem} alt={filme.nome} />
          </div>
          <div className="detalhes">
            <p><strong>ID:</strong> {filme.id}</p>
            <p><strong>Nome:</strong> {filme.nome}</p>
            <p><strong>Gênero:</strong> {filme.genero}</p>
            <p><strong>Ano:</strong> {filme.ano}</p>
          </div>

          {erro && <p className="mensagem-erro">{erro}</p>}

          <div className="botoes">
            <button className="btn btn-perigo" onClick={handleApagar} disabled={carregando}>
              Apagar
            </button>
            <button className="btn btn-cancelar" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </div>
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

export default Apagar;
