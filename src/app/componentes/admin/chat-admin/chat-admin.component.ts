import { Component } from '@angular/core';
import { AdministradorChatService } from 'src/app/services/chats/administrador-chat.service';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.scss'],
})
export class ChatAdminComponent {
  public message: string;
  public room: string;
  public userList: any[] = [];
  public mensajes: any[] = [];

  // Elegir room:
  public roomElegido: string = '';

  // cantidad de rooms:
  public cantidadRooms: number = 0;

  // click ocultar rooms:
  public roomsActivo: boolean = false;
  public quiarChats: boolean = true;

  ocultar() {
    this.roomsActivo = !this.roomsActivo;
    this.quiarChats = !this.quiarChats;
  }

  constructor(private chatAdmin: AdministradorChatService) {
    this.chatAdmin.loadRooms();
    this.chatAdmin.$userList.subscribe((data) => {
      this.userList = data;
      // para ver cuantos usuarios hay en el chat:
      this.cantidadRooms = Object.keys(this.userList).length;
    });

    this.chatAdmin.$chatList.subscribe((data) => {
      this.mensajes = data;
      if (data.length > 0) {
        if (
          this.mensajes[this.mensajes.length - 1].message ===
          'El usuario ha abandonado en chat'
        ) {
          this.roomElegido = '';
        }
      }
    });
  }

  public sendMessage(): void {
    this.chatAdmin.sendMessageAsesor({
      message: this.message,
      room: this.room,
    });
    this.message = '';
  }

  public disconnectUser(): void {
    this.chatAdmin.disconnectUser(this.room, 'asesor');
  }

  public verChat(token: string) {
    this.roomElegido = token;
    this.room = token;
    this.chatAdmin.verChat(token);
  }
}
