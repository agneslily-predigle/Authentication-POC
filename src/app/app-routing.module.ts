import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './Component/admin/admin.component';
import { UserComponent } from './Component/user/user.component';
import { TesterComponent } from './Component/tester/tester.component';
import { AuthGuard } from './Guard/auth.guard';
import { RoleGuard } from './Guard/role.guard';

const routes: Routes = [
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent},
        { path: '', component: HomeComponent},
        { path:'signout',component:SignoutComponent },
        { path:'profile',component:ProfileComponent,canActivate: [AuthGuard] },
        { path:'admin',component:AdminComponent, canActivate: [AuthGuard, RoleGuard],    
                data: { roleGuard: { allowedRoles: ['admin'] } }},
        { path:'user',component:UserComponent, canActivate: [AuthGuard, RoleGuard] ,
                data: { roleGuard: { allowedRoles: ['user'] } } },
        { path:'tester',component:TesterComponent, canActivate: [AuthGuard, RoleGuard],
                data: { roleGuard: { allowedRoles: ['tester'] } } },
        { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
