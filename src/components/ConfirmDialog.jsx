function ConfirmDialog({ mensagem, textoConfirmar, onConfirmar, onCancelar }) {
  return (
    <div role="alertdialog" aria-modal="true" aria-label="Confirmação">
      <p>{mensagem}</p>
      <button type="button" onClick={onConfirmar}>{textoConfirmar}</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </div>
  )
}

export default ConfirmDialog
