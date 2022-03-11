import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from "ng2-charts";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordComponent } from './password/password.component';
import { RegistrationManagementComponent } from './registration-management/registration-management.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { PromotedEstateComponent } from './promoted-estate/promoted-estate.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { MessageComponent } from './message/message.component';
import { InboxComponent } from './inbox/inbox.component';
import { ThreadComponent } from './thread/thread.component';
import { ChatComponent } from './chat/chat.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { ApproveEstateComponent } from './approve-estate/approve-estate.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { FlatChartComponent } from './flat-chart/flat-chart.component';
import { CityEstateChartComponent } from './city-estate-chart/city-estate-chart.component';
import { RentPriceChartComponent } from './rent-price-chart/rent-price-chart.component';
import { BuyPriceChartComponent } from './buy-price-chart/buy-price-chart.component';
import { ApproveOfferComponent } from './approve-offer/approve-offer.component';
import { ApprovedOffersComponent } from './approved-offers/approved-offers.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PasswordComponent,
    RegistrationManagementComponent,
    CreateUserComponent,
    UserManagementComponent,
    NavigatorComponent,
    ProfileComponent,
    HomepageComponent,
    EstateCardComponent,
    PromotedEstateComponent,
    EstateDetailComponent,
    MessageComponent,
    InboxComponent,
    ThreadComponent,
    ChatComponent,
    CreateEstateComponent,
    ApproveEstateComponent,
    EditEstateComponent,
    FlatChartComponent,
    CityEstateChartComponent,
    RentPriceChartComponent,
    BuyPriceChartComponent,
    ApproveOfferComponent,
    ApprovedOffersComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
