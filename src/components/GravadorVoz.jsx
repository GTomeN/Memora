function GravadorVoz({ horario, periodo, audio, gravando, ocupado, onGravar, onParar, onApagar }) {
  return (
    <article>
      <h3>Remédio da {periodo} · {horario}</h3>

      {gravando && (
        <>
          <p>Gravando... fale a mensagem para ela.</p>
          <button type="button" onClick={onParar}>Parar gravação</button>
        </>
      )}

      {!gravando && !audio && (
        <>
          <p>Ainda não tem lembrete gravado para este horário.</p>
          <button type="button" onClick={() => onGravar(horario)} disabled={ocupado}>Gravar lembrete</button>
        </>
      )}

      {!gravando && audio && (
        <>
          <audio controls src={audio} aria-label={`Lembrete das ${horario}`} />
          <button type="button" onClick={() => onGravar(horario)} disabled={ocupado}>Regravar</button>
          <button type="button" onClick={() => onApagar(horario)} disabled={ocupado}>Apagar</button>
        </>
      )}
    </article>
  )
}

export default GravadorVoz
