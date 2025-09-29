import { io, Socket } from "socket.io-client";

const SERVER_SOCKET_URL = import.meta.env.VITE_SERVER_SOCKET_URL;

type SocketCallback = (data: any) => void;

export class SocketClient {
    private socket: Socket;
    private pizarraId: string;

    constructor(pizarraId: string) {
        this.pizarraId = pizarraId;
        this.socket = io(SERVER_SOCKET_URL);
        this.socket.emit("unirse", { pizarraId });

        this.socket.on("dibujo", (data: any) => {
            this.socketCallbacks.forEach(cb => cb(data));
        });
    }

    private socketCallbacks: SocketCallback[] = [];

    on(event: string, callback: SocketCallback) {
        if (event === "update") {
            this.socketCallbacks.push(callback);
        } else {
            this.socket.on(event, callback);
        }
    }

    emit(action: string, objeto: any) {
        this.socket.emit("dibujo", {
            pizarraId: this.pizarraId,
            objeto,
            accion: action
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}
