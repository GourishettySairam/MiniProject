import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component'
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { ClientViewComponent } from '../client-view/client-view.component';
import { ViewticketComponent } from '../viewticket/viewticket.component';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import { AllTicketsComponent } from '../all-tickets/all-tickets.component';
import { YourTicketsComponent } from '../your-tickets/your-tickets.component';

export const routes : Routes = [
  //{path:'home', component: AppComponent},
  {path : 'users', component : AppComponent},
  {path: 'login', component: LoginComponent},
  {path:'home' , component: HomeComponent},
  {path:'nav',component: NavigationBarComponent},
  {path:'client/createticket', component: ClientViewComponent},
  {path:'client/viewtickets', component: ViewticketComponent},
  {path:'admindashboard', component: AdmindashboardComponent},
  {path:'alltickets', component: AllTicketsComponent},
  {path:'yourtickets', component: YourTicketsComponent},

  //{path:'',component: AppComponent}
  {path: '', redirectTo:'/home',pathMatch:'full'}
];
