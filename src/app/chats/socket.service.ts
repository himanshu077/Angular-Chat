// socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your backend URL
  }
  // Method to send a chat message
  sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }
  // Method to handle incoming chat messages
  receiveMessage() {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
