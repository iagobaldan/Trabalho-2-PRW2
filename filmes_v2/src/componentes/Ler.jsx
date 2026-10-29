import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../api';
import Cartaz from './Cartaz';

function Ler() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [naoAchou, setNaoAchou] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => setFilme(res.data))
      .catch(err => {
        console.log(err);
        setNaoAchou(true);
      })
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <div className="cartao">
      <h2>Detalhes do filme</h2>

      {carregando && <p className="aviso">Carregando...</p>}
      {naoAchou && <p className="mensagem-erro">Filme não encontrado.</p>}

      {filme && (
        <>
          <div className="previa">
            <Cartaz src={filme.imagem} alt={filme.nome} />
          </div>
          <div className="detalhes">
            <p><strong>ID:</strong> {filme.id}</p>
            <p><strong>Nome:</strong> {filme.nome}</p>
            <p><strong>Gênero:</strong> {filme.genero}</p>
            <p><strong>Ano:</strong> {filme.ano}</p>
          </div>
        </>
      )}

      <div className="botoes">
        <button className="btn btn-cancelar" onClick={() => navigate('/')}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Ler;
