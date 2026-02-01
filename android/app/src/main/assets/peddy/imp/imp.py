import socket
import datetime
import os
import time

HOST = "0.0.0.0"
PORT = 9100
BUFFER = 4096

# --- Ajustes importantes ---
CONN_TIMEOUT_SEC = 2.0  # se ficar X segundos sem receber dados => fecha cupom
SAVE_DIR = "cupons"
PRINT_TO_CONSOLE = True

# Detecções de fim de cupom
FORM_FEED = b"\x0c"          # FF
GS_V_PREFIX = b"\x1d\x56"    # ESC/POS cut (GS V)
ESC_INIT = b"\x1b\x40"       # ESC @ (init) - opcional, só pra referência

os.makedirs(SAVE_DIR, exist_ok=True)

def now_name(prefix="cupom"):
    return datetime.datetime.now().strftime(f"{prefix}_%Y%m%d_%H%M%S")

def clean_bytes(data: bytes) -> bytes:
    # Remove alguns bytes que atrapalham visualização em texto
    data = data.replace(b"\x00", b"")  # null
    return data

def bytes_to_text(data: bytes) -> str:
    # latin-1 preserva byte->char sem quebrar; bom pra “texto cru”
    return data.decode("latin-1", errors="ignore")

def detect_end_markers(buf: bytes) -> tuple[bytes, str | None]:
    """
    Retorna (buf_truncado, motivo_fim_ou_None)
    Se encontrar FF ou GS V, trunca o buffer até antes do marcador e sinaliza motivo.
    """
    # 1) Form Feed
    ff_pos = buf.find(FORM_FEED)
    if ff_pos != -1:
        return buf[:ff_pos], "FORM_FEED (FF)"

    # 2) Cut ESC/POS (GS V ...)
    cut_pos = buf.find(GS_V_PREFIX)
    if cut_pos != -1:
        return buf[:cut_pos], "ESC/POS CUT (GS V)"

    return buf, None

def handle_connection(conn: socket.socket, addr):
    print(f"\n>>> Conectado por {addr[0]}:{addr[1]}")

    conn.settimeout(CONN_TIMEOUT_SEC)

    raw_chunks: list[bytes] = []
    end_reason = None

    last_data_time = time.time()

    while True:
        try:
            data = conn.recv(BUFFER)
            if not data:
                # cliente fechou a conexão
                end_reason = end_reason or "CONEXAO_FECHADA"
                break

            last_data_time = time.time()

            data = clean_bytes(data)
            data, reason = detect_end_markers(data)
            if reason and end_reason is None:
                end_reason = reason

            if data:
                raw_chunks.append(data)
                if PRINT_TO_CONSOLE:
                    print(bytes_to_text(data), end="")

            # Se detectou fim (FF ou CUT), pode encerrar já
            if end_reason in ("FORM_FEED (FF)", "ESC/POS CUT (GS V)"):
                break

        except socket.timeout:
            # sem dados por X segundos => fim do cupom
            end_reason = end_reason or "TIMEOUT_SEM_DADOS"
            break
        except ConnectionResetError:
            end_reason = end_reason or "CONEXAO_RESETADA"
            break

    conn.close()

    raw = b"".join(raw_chunks)
    text = bytes_to_text(raw)

    print("\n\n======== FIM DO CUPOM ========")
    print(f"Motivo: {end_reason}")
    print("==============================")

    base = now_name()
    txt_path = os.path.join(SAVE_DIR, base + ".txt")
    bin_path = os.path.join(SAVE_DIR, base + ".bin")

    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)

    with open(bin_path, "wb") as f:
        f.write(raw)

    print(f"✅ Cupom salvo em: {txt_path}")
    print(f"🧪 RAW salvo em : {bin_path}")
    print("Aguardando próxima impressão...")

def main():
    print("===================================")
    print(" EMULADOR IMPRESSORA TÉRMICA (RAW) ")
    print(" Porta:", PORT)
    print(" Timeout (fim automático):", CONN_TIMEOUT_SEC, "s")
    print(" Salvando em:", os.path.abspath(SAVE_DIR))
    print("===================================")

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(10)

    while True:
        conn, addr = server.accept()
        handle_connection(conn, addr)

if __name__ == "__main__":
    main()
