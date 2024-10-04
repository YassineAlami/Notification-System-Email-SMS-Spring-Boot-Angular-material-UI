import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ActorComponent} from "./actor/actor.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NotificationComponent} from "./notification/notification.component";
import {LoginComponent} from "./login/login.component";
import {SectorComponent} from "./sector/sector.component";
import {BaseTemplateComponent} from "./base-template/base-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {CreateActorComponent} from "./create-actor/create-actor.component";
import {CreateNotificationComponent} from "./create-notification/create-notification.component";
import {SendDeliveryComponent} from "./send-delivery/send-delivery.component";
import {CreateSectorComponent} from "./create-sector/create-sector.component";

const routes: Routes = [
  {path: "", component : LoginComponent},
  {path: "login", component : LoginComponent},
  {path: "base", component : BaseTemplateComponent,
    canActivate : [AuthGuard],
    children: [
      {path: "sectors", component : SectorComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {path: "create-sector", component : CreateSectorComponent},
      {path: "home", component : HomeComponent},
      {path: "actors", component : ActorComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {path: "create-actor", component : CreateActorComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}
      },
      {path: "dashboard", component : DashboardComponent},
      {path: "notifications", component : NotificationComponent},
      {path: "create-notification", component : CreateNotificationComponent},
      {path: "deliveries/:id", component : SendDeliveryComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
