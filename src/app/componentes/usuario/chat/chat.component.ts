import { Component } from '@angular/core';
import { UsuarioChatService } from 'src/app/services/chats/usuario-chat.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  {
  public message: string;
  public mensajes: any[] = [];
  private token: string;
  public isChatVisible: boolean = false;

  constructor(private chatService: UsuarioChatService, private auth: AuthService) {
    // math.random() genera un número aleatorio entre 0 y 1

    this.token = this.auth.getToken();
    this.chatService.$chatList.subscribe((data) => {
      this.mensajes = data;
    });
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.message, this.token);
    this.message = '';
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
