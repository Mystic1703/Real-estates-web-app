import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveEstateComponent } from './approve-estate/approve-estate.component';
import { ApproveOfferComponent } from './approve-offer/approve-offer.component';
import { ApprovedOffersComponent } from './approved-offers/approved-offers.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationManagementComponent } from './registration-management/registration-management.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "password", component: PasswordComponent },
  { path: "registration-management", component: RegistrationManagementComponent },
  { path: "create-user", component: CreateUserComponent },
  { path: "user-management", component: UserManagementComponent },
  { path: "profile", component: ProfileComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "estate-detail", component: EstateDetailComponent },
  { path: "message", component: MessageComponent },
  { path: "inbox", component: InboxComponent },
  { path: "create-estate", component: CreateEstateComponent },
  { path: "approve-estate", component: ApproveEstateComponent },
  { path: "edit-estate", component: EditEstateComponent },
  { path: "approve-offer", component: ApproveOfferComponent },
  { path: "approved-offers", component: ApprovedOffersComponent },
  { path: "update-user", component: UpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
