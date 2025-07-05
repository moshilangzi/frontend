import { io, Socket } from 'socket.io-client';

export type SocketStatus = 'disconnected' | 'connecting' | 'connected';

class SocketClient {
  private socket: Socket | null = null;
  public status: SocketStatus = 'disconnected';

  connect(url: string, opts?: any) {
    if (this.socket) return;
    this.status = 'connecting';
    this.socket = io(url, opts);
    this.socket.on('connect', () => {
      this.status = 'connected';
    });
    this.socket.on('disconnect', () => {
      this.status = 'disconnected';
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.status = 'disconnected';
    }
  }

  send(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  on(event: string, handler: (...args: any[]) => void) {
    this.socket?.on(event, handler);
  }

  off(event: string, handler?: (...args: any[]) => void) {
    this.socket?.off(event, handler);
  }

  isConnected() {
    return this.status === 'connected';
  }
}

export const socketClient = new SocketClient(); 