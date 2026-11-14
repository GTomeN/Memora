function Carregando({ texto = 'Carregando...' }) {
  return (
    <p role="status" 
    className="flex items-center gap-3 py-6 text-tinta-suave">
      <span 
      aria-hidden="true" 
      className="size-3 rounded-full bg-pinho-600 motion-safe:animate-pulse" />
      {texto}
    </p>
  )
}

export default Carregando
