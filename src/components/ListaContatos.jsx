function ListaContatos({ contatos, onEditar, onExcluir, onSubir, onDescer, onAlternarWhatsapp }) {
  if (contatos.length === 0) {
    return <p className="cartao text-tinta-suave">Nenhum contato cadastrado ainda.</p>
  }

  return (
    <ol className="grid gap-3">
      {contatos.map((contato, indice) => (
        <li key={contato.id} className="cartao flex gap-4">
          <p className="flex size-11 shrink-0 items-center 
          justify-center rounded-full 
          bg-pinho-600 text-lg font-bold text-white">
            <span className="sr-only">Posição na fila: </span>
            {indice + 1}º
          </p>

          <div className="flex-1">
            <h3 className="text-xl font-bold">{contato.nome}</h3>
            <div className="mt-1 space-y-1 text-tinta-suave">
              <p>{contato.parentesco}</p>
              <p>WhatsApp: {contato.whatsapp}</p>
              {contato.autorizaWhatsapp && <p className="font-bold text-ok-700">Recebe aviso pelo WhatsApp.</p>}
              {!contato.autorizaWhatsapp && <p>Não recebe aviso pelo WhatsApp, só no painel.</p>}
            </div>

            {!contato.ativo && (
              <p className="mt-3 inline-block rounded-full 
              bg-fundo px-3 py-1 text-base font-bold 
              text-tinta-suave">
                Pausado: fica fora da fila de avisos.
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => onSubir(contato)} disabled={indice === 0} className="botao-secundario">
                Subir na fila
              </button>
              <button type="button" onClick={() => onDescer(contato)} disabled={indice === contatos.length - 1} className="botao-secundario">
                Descer na fila
              </button>
              <button type="button" onClick={() => onAlternarWhatsapp(contato)} className="botao-secundario">
                {contato.autorizaWhatsapp ? 'Desligar WhatsApp' : 'Ligar WhatsApp'}
              </button>
              <button type="button" onClick={() => onEditar(contato)} className="botao-secundario">Editar</button>
              <button type="button" onClick={() => onExcluir(contato)} className="botao-discreto">Excluir</button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ListaContatos