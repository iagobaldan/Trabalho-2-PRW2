import Cartaz from './Cartaz';

function CamposFilme({ valores, onChange }) {
  return (
    <>
      <div className="campo">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required
          placeholder="Digite o nome do filme"
          value={valores.nome ?? ''} onChange={onChange} />
      </div>
      <div className="campo">
        <label htmlFor="genero">Gênero:</label>
        <input type="text" id="genero" name="genero" required
          placeholder="Digite o gênero"
          value={valores.genero ?? ''} onChange={onChange} />
      </div>
      <div className="campo">
        <label htmlFor="ano">Ano:</label>
        <input type="text" id="ano" name="ano" required
          placeholder="Digite o ano"
          value={valores.ano ?? ''} onChange={onChange} />
      </div>
      <div className="campo">
        <label htmlFor="imagem">Imagem (URL):</label>
        <input type="url" id="imagem" name="imagem"
          placeholder="https://exemplo.com/imagem.jpg"
          value={valores.imagem ?? ''} onChange={onChange} />
      </div>
      <div className="previa">
        <Cartaz key={valores.imagem} src={valores.imagem} alt="Prévia da imagem" />
      </div>
    </>
  );
}

export default CamposFilme;
