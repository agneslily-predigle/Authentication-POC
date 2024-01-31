import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
        constructor(
                private _authService:AuthService,
        ){ }
        userEmail$: Observable<string| null> = this._authService.userEmail$
        userId$: Observable<string| null> = this._authService.userId$
}
