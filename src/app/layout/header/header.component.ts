import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
        isAuthenticated:boolean;

        constructor(
                private _authService:AuthService
        ){
                this.isAuthenticated = this._authService.isAuthenticated
        }

}
