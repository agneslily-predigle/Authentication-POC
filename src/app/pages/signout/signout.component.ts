import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})
export class SignoutComponent {
        constructor(
                private _authService:AuthService,
                private _router:Router
        ){
                this._authService.signOut()
                this._router.navigate(["signin"])
        }
}
