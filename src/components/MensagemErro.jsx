function MensagemErro({ mensagem }) {
  if (!mensagem) {
    return null
  }

  return <p role="alert">{mensagem}</p>
}

export default MensagemErro
