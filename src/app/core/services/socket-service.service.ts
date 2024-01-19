import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3500');
  }

  public on(eventName: string, callback: (...args: any[]) => void) {
    this.socket.on(eventName, callback);
  }

  public emit(eventName: string, ...args: any[]) {
    this.socket.emit(eventName, ...args);
  }
}
