import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from 'src/app/websocket/websocket.service';
import { WsMessage } from 'src/app/websocket/ws-message.model';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SendMessagePage implements OnInit {
  exchangeId: any;
  receivedMessage: any[] = [];
  newMessage: string = '';
  dresseur: any;

  constructor(private route: ActivatedRoute ,private wsService:WebsocketService, private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.exchangeId = this.route.snapshot.params['exchangeId'];
    this.auth.getUser$().subscribe(dresseur => {
      this.dresseur = dresseur;
    });
    this.wsService.listen<WsMessage>().subscribe((res: any) => {
      try {
        const parsedResponse = JSON.parse(res);
        const messages = parsedResponse.getMessagesOfEchange;
        if (messages) {

          this.receivedMessage.push(...messages);
        } else {
          console.error('The response does not have getMessagesOfEchange property or it is not an array:', parsedResponse);
        }
      } catch (error) {
        console.error('Error parsing WebSocket response:', error);
      }
    })
    this.getWebSocketMessage();
  }

  getWebSocketMessage(){
    this.wsService.send({
      type:'getMessagesOfEchange',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWE0ZjM5OTdjYTA3NzFiNDQ1NGE4YjAiLCJleHAiOjE3MDY2MjMzOTMsImlhdCI6MTcwNjAxODU5M30.QZo2DHDen4avP153klEdyh9CW0wr-w3CYRPw3uQvrwg',
      echangeId: this.exchangeId
    });
  }

  send(){
    this.wsService.listen<WsMessage>().subscribe(() => {})
    this.sendWebSocketMessage();
    this.newMessage = '';
    this.receivedMessage = [];
    this.ngOnInit();
  }

  sendWebSocketMessage(){
    this.wsService.send({
      type:'sendMessageInEchange',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWE0ZjM5OTdjYTA3NzFiNDQ1NGE4YjAiLCJleHAiOjE3MDY2MjMzOTMsImlhdCI6MTcwNjAxODU5M30.QZo2DHDen4avP153klEdyh9CW0wr-w3CYRPw3uQvrwg',
      contenu: this.newMessage,
      echangeId: this.exchangeId
    });
  }

  trackByFn(index: number, message: any): string {
    return message._id; // Use a unique identifier for each message
  }
}
