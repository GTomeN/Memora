function MensagemErro({ mensagem }) {
  if (!mensagem) {
    return null
  }

  return (
    <p role="alert" 
    className="rounded-xl border-l-4
     border-atencao-300 
     bg-atencao-50 
     px-4 py-3 font-bold 
     text-atencao-800">
      {mensagem}
    </p>
  )
}

export default MensagemErro