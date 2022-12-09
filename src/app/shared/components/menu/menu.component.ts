import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
username: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUserLogged();
  }

}
