import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/service/auth.service';
import { UserClass } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: UserClass;
  constructor(private auth: AuthService) {
    this.user = this.auth.user;
  }
  logOut(){
    this.auth.logout();
  }
}
