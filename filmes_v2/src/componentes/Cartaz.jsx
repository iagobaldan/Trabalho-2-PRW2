import { useState } from 'react';

function Cartaz({ src, alt }) {
  const [falhou, setFalhou] = useState(false);

  if (!src || falhou) {
    return <div className="cartaz cartaz-vazio">🎬</div>;
  }

  return (
    <img
      className="cartaz"
      src={src}
      alt={alt}
      onError={() => setFalhou(true)}
    />
  );
}

export default Cartaz;
