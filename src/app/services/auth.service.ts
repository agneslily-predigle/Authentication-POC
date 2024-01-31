import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
        token: string = ""
        isAuthenticated: boolean;
        currentUser$: Observable<boolean | null> = of(this._afs.currentUser !== null);
        authState$: Observable<firebase.default.User | null> = this._afs.authState;
        userEmail$: Observable<string | null> = this.authState$.pipe(
                map(user => {
                        return !user ? null : user.email
                })
        );
        userId$: Observable<string | null> = this.authState$.pipe(
                map(user => {
                        return !user ? null : user.uid
                })
        );

  constructor(
        private _afs:AngularFireAuth,
        private _fs:AngularFirestore
  ) { 
        if(localStorage.getItem("token")){
                this.token = localStorage.getItem("token") || ""
        }
        this.isAuthenticated = this.isLoggedIn()

  }

async signUp(email: string, password: string, name:string): Promise<void> {
        try {
           await this._afs.createUserWithEmailAndPassword(email, password);
        // if(userCredential && userCredential.user){
                // await this._fs.collection('users').doc(userCredential.user.uid).set({
                //         email: email,
                //         displayName: name,
                //         uid:userCredential.user.uid
                //         });
                // console.log('User signedup successfully:', userCredential.user.uid);
        // }
        } catch (error) {
          console.error('Error signing up:', error);
          throw error;
        
      }
    }
    async signIn(user: { email: string, password: string }): Promise<void> {
        try {
            const userCredential = await this._afs.signInWithEmailAndPassword(user.email, user.password);
                if(userCredential && userCredential.user){
                        const idToken = await userCredential.user.getIdToken();
                        localStorage.setItem('token', idToken);
                        console.log(idToken);
                }
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }
    
  async signOut(){
        localStorage.removeItem("token")
        await this._afs.signOut()
  }
  isLoggedIn() {

        const token = localStorage.getItem('token');
        if(token){
                const payload = atob(token.split('.')[1]);
                const parsedPayload = JSON.parse(payload);
                return parsedPayload.exp > Date.now() / 1000;
        }
        return false
      }
      hasAccess(allowedRoles: string[]){
        const token = localStorage.getItem('token');
        if(token){
                const payload = atob(token.split('.')[1]);
                const parsedPayload = JSON.parse(payload);
                const userRole = parsedPayload.role[0]
                if (allowedRoles.includes(userRole)) {
                        console.log('Access Granted for ', userRole,"✅");
                        return true;
                } else {
                        console.log('Acces Rejected for', userRole,"❌");
                }
                return false;
        }
        return false
      }
}
