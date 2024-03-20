import { Component, OnInit, ElementRef, ViewChild  } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from 'moment';
import { AuthService } from "../auth/auth.service";
import { SocketService } from "./socket.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'], // Use styleUrls instead of styleUrl
})
export class ChatsComponent implements OnInit {
  message: string = '';
  messages: string[] = [];
  items = [
    {username:'Alex',title: 'Terminatorr', message: 'hellow How are You?', image: 'assets/imgs/ai-generated-8032359_1280.jpg', alt: 'User 2 Profile Picture',inbox:'how are you' ,userinbox:'i am fine' },
    {username:'cloudy', title: 'Titan', message: 'Hii Good morning', image: 'assets/imgs/chat.jpg', alt: 'User 3 Profile Picture',inbox:'howz',userinbox:'Good u say' },
    {username:'Elly', title: 'Ace', message: 'Hii Good morning', image: 'assets/imgs/chat1.png', alt: 'User 3 Profile Picture',inbox:'call u latter',userinbox:'oky no problem' },
    {username:'david', title: 'Smith', message: 'Hii Good morning', image: 'assets/imgs/circle-5816819_1280.jpg', alt: 'User 3 Profile Picture',inbox:'hy smith' ,userinbox:'david'}
  ];

  date: Date = new Date();
  showChatContainer: boolean = false;
  selectedUser: string = '';
  selectedUserimages:string=''
  selectuserinbox:string=''
  recieverimessge:string=''
  recieveinbox:string=''
  username:string=''
  userinboxall:string=''
  today= moment().calendar();
  userlist = this.items.slice();

  constructor(private router: Router,
    private socketService: SocketService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        localStorage.clear()
        console.log('Response:', res);
        this.router.navigate(["/login"]).then(() => {
      window.location.reload()
        });
      }
    });
  }
  userdetail(item:any){
  if(item){
    this.showChatContainer = true;
    this.selectedUser = item.title;
    this.selectedUserimages=item.image
    this.selectuserinbox=item.inbox
    this.username=item.username
    this.userinboxall=item.userinbox
  }}
  filterItems(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase(); // Trim and convert to lowercase
    if (!searchTerm) {
      this.items = this.userlist.slice();
    } else {
      this.items = this.userlist.filter(item =>
        item.title.toLowerCase().startsWith(searchTerm))
    }
  }
 
  sendMessage() {
    if (this.message.trim() !== '') {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
