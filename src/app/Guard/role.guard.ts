import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        const roleGuardData = next.data['roleGuard'] || {};
        const allowedRoles = roleGuardData.allowedRoles as Array<string>;
        if (!this._authService.hasAccess(allowedRoles)) {
                console.log('-------------- Redirecting to Home --------------');      
                this._router.navigate(['']);
                return false;
        }
        return true;
  }
}
