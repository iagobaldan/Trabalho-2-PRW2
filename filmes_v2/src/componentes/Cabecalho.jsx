import { NavLink } from 'react-router-dom';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <h1 className="cabecalho-titulo">🎬 Catálogo de Filmes</h1>
      <nav className="menu">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/criar">Criar</NavLink>
        <NavLink to="/alterar">Alterar</NavLink>
        <NavLink to="/apagar">Apagar</NavLink>
      </nav>
    </header>
  );
}

export default Cabecalho;
