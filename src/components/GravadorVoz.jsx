function GravadorVoz({ horario, periodo, audio, gravando, ocupado, onGravar, onParar, onApagar }) {
  return (
    <article
      data-gravando={gravando}
      className="cartao data-[gravando=true]:border-2 data-[gravando=true]:border-pinho-600 data-[gravando=true]:bg-pinho-50"
    >
      <h3 className="text-xl font-bold">Remédio da {periodo} · {horario}</h3>

      {gravando && (
        <div className="mt-3 space-y-3">
          <p role="status" className="flex items-center gap-3 font-bold text-pinho-700">
            <span aria-hidden="true" className="size-3 rounded-full bg-pinho-600 motion-safe:animate-pulse" />
            Gravando... fale a mensagem para ela.
          </p>
          <button type="button" onClick={onParar} className="botao-primario w-full sm:w-auto">
            Parar gravação
          </button>
        </div>
      )}

      {!gravando && !audio && (
        <div className="mt-3 space-y-3">
          <p className="text-tinta-suave">Ainda não tem lembrete gravado para este horário.</p>
          <button type="button" onClick={() => onGravar(horario)} disabled={ocupado} className="botao-primario w-full sm:w-auto">
            Gravar lembrete
          </button>
        </div>
      )}

      {!gravando && audio && (
        <div className="mt-3 space-y-3">
          <audio controls src={audio} aria-label={`Lembrete das ${horario}`} className="w-full" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onGravar(horario)} disabled={ocupado} className="botao-secundario">
              Regravar
            </button>
            <button type="button" onClick={() => onApagar(horario)} disabled={ocupado} className="botao-discreto">
              Apagar
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

export default GravadorVoz