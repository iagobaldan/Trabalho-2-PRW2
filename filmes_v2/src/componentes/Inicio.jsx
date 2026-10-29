import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api';
import Cartaz from './Cartaz';

function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setFilmes(res.data))
      .catch(err => {
        console.log(err);
        setErro('Não foi possível carregar os filmes. Verifique a URL da API.');
      })
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="cartao cartao-largo">
      <h2>Filmes cadastrados</h2>

      {carregando && <p className="aviso">Carregando...</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
      {!carregando && !erro && filmes.length === 0 && (
        <p className="aviso">Nenhum filme cadastrado ainda.</p>
      )}

      <div className="grade">
        {filmes.map(f => (
          <Link to={`/ler/${f.id}`} className="card-filme" key={f.id}>
            <span className="card-id">#{f.id}</span>
            <Cartaz src={f.imagem} alt={f.nome} />
            <p className="card-info">
              {f.nome} • {f.ano} • {f.genero}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
