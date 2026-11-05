import { useEffect, useRef } from "react";

// Janela de diálogo nativa (<dialog>): fecha com Esc, prende o foco e bloqueia o fundo.
export default function Modal({ aberto, titulo, onFechar, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (aberto && !dialog.open) dialog.showModal();
    if (!aberto && dialog.open) dialog.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-titulo"
      onClose={onFechar}
      onClick={(e) => e.target === ref.current && onFechar()}
    >
      {aberto && (
        <div className="modal-corpo">
          <h2 id="modal-titulo">{titulo}</h2>
          {children}
        </div>
      )}
    </dialog>
  );
}