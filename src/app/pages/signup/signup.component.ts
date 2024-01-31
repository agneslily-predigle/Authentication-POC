import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
        constructor(
                private _fb:FormBuilder,
                private _authService:AuthService,
                private _router:Router
                ) { }

        userObj = this._fb.group({
                name:["",Validators.required],
                email:["",Validators.required],
                password:["",Validators.required],
        })

        async onSubmit(): Promise<void> {
                try {
                        const email = this.userObj.value.email!;
                        const password = this.userObj.value.password!;
                        const name = this.userObj.value.name!;
                  await this._authService.signUp(email, password,name);
                  this._router.navigate(["signin"])
                  console.log('User signed up and data stored successfully');
                } catch (error) {
                  console.error('Error signing up or storing user data:', error);
                }
              }
}
