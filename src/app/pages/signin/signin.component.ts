import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
        constructor(
                private _fb:FormBuilder,
                private _router:Router,
                private _authService: AuthService
                ) {  }

        userObj = this._fb.group({
                email:["",Validators.required],
                password:["",Validators.required],
        })

        onSubmit(){
                const email = this.userObj.value.email!
                const password = this.userObj.value.password!
                this._authService.signIn({email,password})                
                this._router.navigate([""])
        }
}