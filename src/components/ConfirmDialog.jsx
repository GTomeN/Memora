function ConfirmDialog({ mensagem, textoConfirmar, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end 
    justify-center bg-tinta/50 p-4 sm:items-center">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Confirmação"
        className="w-full max-w-md rounded-2xl 
        bg-superficie p-6 shadow-xl"
      >
        <p className="text-xl font-bold leading-snug">{mensagem}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancelar}
            autoFocus className="botao-secundario">Cancelar</button>
          <button type="button" onClick={onConfirmar}
            className="botao-primario">{textoConfirmar}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog