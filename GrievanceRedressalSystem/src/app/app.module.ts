
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {FormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientService } from './services/client.service';
import { ViewticketComponent } from './viewticket/viewticket.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { YourTicketsComponent } from './your-tickets/your-tickets.component';
import { AddmembersComponent } from './addmembers/addmembers.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddclientsComponent } from './addclients/addclients.component';
import { RatedTicketsComponent } from './rated-tickets/rated-tickets.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationBarComponent,
    LoginComponent,
    HomeComponent,
    ClientViewComponent,
    ViewticketComponent,
    AdmindashboardComponent,
    AllTicketsComponent,
    TicketDetailComponent,
    YourTicketsComponent,
    AddmembersComponent,
    CategoriesComponent,
    AddclientsComponent,
    RatedTicketsComponent,
    TicketReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
	AuthService,
	AuthGuardService,
  ClientService,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
