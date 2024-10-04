import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BaseTemplateComponent } from './base-template/base-template.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { ActorComponent } from './actor/actor.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';
import { LoadAttachmentComponent } from './load-attachment/load-attachment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectorComponent } from './sector/sector.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';
import { IgxTimePickerModule } from 'igniteui-angular';
import { IgxIconModule } from 'igniteui-angular';
import {IgxInputGroupModule} from "igniteui-angular";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DropdownComponentComponent } from './dropdown-component/dropdown-component.component';
import { SendDeliveryComponent } from './send-delivery/send-delivery.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import { CreateSectorComponent } from './create-sector/create-sector.component';



//PrimeNg
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from "@angular/platform-browser/animations"
import { TableModule } from 'primeng/table'; // Import TableModule from PrimeNG
import { PaginatorModule } from 'primeng/paginator'; // Import PaginatorModule from PrimeNG


@NgModule({
  declarations: [
    AppComponent,
    BaseTemplateComponent,
    HomeComponent,
    ActorComponent,
    NotificationComponent,
    LoginComponent,
    LoadAttachmentComponent,
    DashboardComponent,
    SectorComponent,
    CreateActorComponent,
    CreateNotificationComponent,
    DropdownComponentComponent,
    SendDeliveryComponent,
    CustomPaginatorComponent,
    ConfirmationDialogComponent,
    CreateSectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxTimePickerModule,
    IgxIconModule, IgxInputGroupModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle,
    MatDividerModule,

    //PrimeNg
    ButtonModule,
    DropdownModule,
    TableModule, PaginatorModule

  ],
  providers: [provideAnimations(), //PrimNG
    provideAnimationsAsync(),
    AuthGuard,
    AuthorizationGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}

  ],
  bootstrap: [AppComponent],

  exports: [
    BaseTemplateComponent
  ]
})
export class AppModule {
}
