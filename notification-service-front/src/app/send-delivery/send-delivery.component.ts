import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {DeliveryService} from "../services/delivery.service";
import {Delivery} from "../models/Delivery";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Notification} from "../models/Notification";
import {NotificationType} from "../models/NotificationType";
import {NotificationService} from "../services/notification.service";
import {EmailService} from "../services/email.service";
import {EmailRequest} from "../models/EmailRequest";
import {Actor} from "../models/Actor";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";



const INFO_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
</svg>
`;

const NOTIFICATION_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
</svg>
`;

const SALARY_CHANGE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z"/>
</svg>
`;

const EVENT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z"/>
</svg>
`;

const NEW_POLICY_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    <path d="M272.2 64.6l-51.1 51.1c-15.3 4.2-29.5 11.9-41.5 22.5L153 161.9C142.8 171 129.5 176 115.8 176H96V304c20.4 .6 39.8 8.9 54.3 23.4l35.6 35.6 7 7 0 0L219.9 397c6.2 6.2 16.4 6.2 22.6 0c1.7-1.7 3-3.7 3.7-5.8c2.8-7.7 9.3-13.5 17.3-15.3s16.4 .6 22.2 6.5L296.5 393c11.6 11.6 30.4 11.6 41.9 0c5.4-5.4 8.3-12.3 8.6-19.4c.4-8.8 5.6-16.6 13.6-20.4s17.3-3 24.4 2.1c9.4 6.7 22.5 5.8 30.9-2.6c9.4-9.4 9.4-24.6 0-33.9L340.1 243l-35.8 33c-27.3 25.2-69.2 25.6-97 .9c-31.7-28.2-32.4-77.4-1.6-106.5l70.1-66.2C303.2 78.4 339.4 64 377.1 64c36.1 0 71 13.3 97.9 37.2L505.1 128H544h40 40c8.8 0 16 7.2 16 16V352c0 17.7-14.3 32-32 32H576c-11.8 0-22.2-6.4-27.7-16H463.4c-3.4 6.7-7.9 13.1-13.5 18.7c-17.1 17.1-40.8 23.8-63 20.1c-3.6 7.3-8.5 14.1-14.6 20.2c-27.3 27.3-70 30-100.4 8.1c-25.1 20.8-62.5 19.5-86-4.1L159 404l-7-7-35.6-35.6c-5.5-5.5-12.7-8.7-20.4-9.3C96 369.7 81.6 384 64 384H32c-17.7 0-32-14.3-32-32V144c0-8.8 7.2-16 16-16H56 96h19.8c2 0 3.9-.7 5.3-2l26.5-23.6C175.5 77.7 211.4 64 248.7 64H259c4.4 0 8.9 .2 13.2 .6zM544 320V176H496c-5.9 0-11.6-2.2-15.9-6.1l-36.9-32.8c-18.2-16.2-41.7-25.1-66.1-25.1c-25.4 0-49.8 9.7-68.3 27.1l-70.1 66.2c-10.3 9.8-10.1 26.3 .5 35.7c9.3 8.3 23.4 8.1 32.5-.3l71.9-66.4c9.7-9 24.9-8.4 33.9 1.4s8.4 24.9-1.4 33.9l-.8 .8 74.4 74.4c10 10 16.5 22.3 19.4 35.1H544zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm528 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>
</svg>
`;

const UPDATE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
</svg>
`;

const DELETE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
</svg>
`;

const SEND_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
</svg>
`;

@Component({
  selector: 'app-send-delivery',
  templateUrl: './send-delivery.component.html',
  styleUrl: './send-delivery.component.css'
})
export class SendDeliveryComponent implements OnInit{
  deliveryId!: number;
  public delivery!: Delivery;

  /*notifications!: Notification[];*/
  notifications: any[]= [];

  step = -1;


  public dataSource : any;
  public displayedColumns = ['id','username','sector'];

  currentPageIndex = 1;
  pageSize = 5;

  numberNotifications!: number;


  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private activatedRoute:ActivatedRoute,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private deliveryService : DeliveryService, private notificationService : NotificationService,
              private emailService: EmailService, private dialog: MatDialog) {
    this.deliveryId=this.activatedRoute.snapshot.params['id'];

    iconRegistry.addSvgIconLiteral('info', sanitizer.bypassSecurityTrustHtml(INFO_ICON));
    iconRegistry.addSvgIconLiteral('notification', sanitizer.bypassSecurityTrustHtml(NOTIFICATION_ICON));
    iconRegistry.addSvgIconLiteral('salary-change', sanitizer.bypassSecurityTrustHtml(SALARY_CHANGE_ICON));
    iconRegistry.addSvgIconLiteral('event', sanitizer.bypassSecurityTrustHtml(EVENT_ICON));
    iconRegistry.addSvgIconLiteral('new-policy', sanitizer.bypassSecurityTrustHtml(NEW_POLICY_ICON));
    iconRegistry.addSvgIconLiteral('update', sanitizer.bypassSecurityTrustHtml(UPDATE_ICON));
    iconRegistry.addSvgIconLiteral('delete', sanitizer.bypassSecurityTrustHtml(DELETE_ICON));
    iconRegistry.addSvgIconLiteral('send', sanitizer.bypassSecurityTrustHtml(SEND_ICON));
  }

  ngOnInit(): void {

    this.deliveryService.getDeliveriesById(this.deliveryId).subscribe({
      next:data => {
        this.delivery = data;

        /*this.dataSource = new MatTableDataSource(this.delivery.notifications);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort = this.sort;*/
      },
      error: err => {
        console.log(err)
      }
    })


    this.notificationService.getNotificationsFromDelivery(this.deliveryId).subscribe({
      next: data => {
        this.notifications = data;
        // Initialize currentPageIndex for each notification to 0
        this.notifications.forEach(notification => {
          notification.currentPageIndex = 0;
        });
      },
      error: err => {
        console.log(err);
      }
    });

    // Loop through notifications and initialize MatTableDataSource for each notification's users
    /*this.notifications.forEach(notification => {
      const dataSource = new MatTableDataSource(notification.users);
      this.notificationUsersDataSourceMap.push(dataSource);
    });*/


  }


  onPageChange(pageIndex: number, notification: any) {
    notification.currentPageIndex = pageIndex;
  }

  getVisibleUsers(notification: any): any[] {
    const startIndex = notification.currentPageIndex * this.pageSize;
    // Return the first page of users when the page loads
    return notification.users.slice(startIndex, startIndex + this.pageSize);
  }

  getDataSource(users: any[]): MatTableDataSource<any> {
    const dataSource = new MatTableDataSource(users);
    dataSource.paginator = null; // Disable MatTableDataSource paginator
    return dataSource;
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  getNotificationsNumber(){
    return this.delivery?.notifications.length;
  }

  getTotalUsersInNotifications(): number {
    // Check if delivery and notifications exist
    if (!this.delivery || !this.delivery.notifications) {
      return 0;
    }

    // Initialize total user count
    let totalUsers = 0;

    // Iterate through each notification in the delivery
    for (const notification of this.notifications) {
      // Check if notification and users exist
      if (!notification || !notification.users) {
        continue;
      }

      // Add the number of users in the current notification to the total count
      totalUsers += notification.users.length;
    }

    return totalUsers;
  }




  getTotalTargetedSectors(): number {
    // Check if delivery and notifications exist
    if (!this.delivery || !this.delivery.notifications) {
      return 0;
    }

    // Initialize a set to store unique sectors
    const targetedSectors = new Set<number>();

    // Iterate through each notification in the delivery
    for (const notification of this.notifications) {
      // Check if notification and users exist
      if (!notification || !notification.users) {
        continue;
      }

      // Extract sectors from users and add to the set
      for (const user of notification.users) {
        if (user.sector.id) {
          targetedSectors.add(user.sector.id); // Add sector name to the set
        }
      }
    }

    // Return the size of the set (number of unique sectors)
    return targetedSectors.size;
  }



  emailRequest: EmailRequest = {
    to: '',
    subject: '',
    body: ''
  };

  sendEmail(): void {
    this.emailService.sendEmail(this.emailRequest).subscribe(
      response => {
        console.log(response); // Handle successful response
      },
      error => {
        console.error(error); // Handle error
      }
    );
  }

  replaceRecipientPlaceholder(template: string, user: Actor): string {
    // Regular expression to match the placeholder
    const placeholderRegex = new RegExp('\\[\\$Recipient Name\\]', 'g');
    // Replace the placeholder with user's username
    return template.replace(placeholderRegex, user.username);
  }



  sendEmailNotifications(): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirm Notification Send', message: 'Are you sure you want to send emails?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Proceed with sending notification emails (existing code)

        // Loop through all notifications in the array
        this.notifications.forEach(notification => {
          // Loop through users in the current notification
          notification.users.forEach((user: Actor) => {
            // Create a copy of the email request for each user
            let emailRequest: EmailRequest = {
              to: user.email, // Set recipient email for each user
              subject: notification.type.name, // Subject from NotificationType
              body: this.replaceRecipientPlaceholder(notification.content, user) // Replace placeholder in content
            };

            // Send the email request for each user
            this.emailService.sendEmail(emailRequest)
              .subscribe(
                response => {
                  console.log(`Email sent to ${user.email}`); // Handle successful response per user
                },
                error => {
                  console.error(`Error sending email to ${user.email}`, error); // Handle error per user
                }
              );
          });
        });

      } else {
        // Handle user canceling the confirmation
        console.log('Notification send canceled');
      }
    });
  }

  /*openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirm Notification Send', message: 'Are you sure you want to send emails?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Proceed with sending notification emails (existing code)
      } else {
        // Handle user canceling the confirmation
        console.log('Notification send canceled by user.');
      }
    });
  }*/


  sendEmailSingleNotification(notification: Notification): void {
    notification.users.forEach(user => {
      let emailRequest: EmailRequest = {
        to: user.email,
        subject: notification.type.name,
        body: this.replaceRecipientPlaceholder(notification.content, user)
      };

      this.emailService.sendEmail(emailRequest)
        .subscribe(
          response => {
            console.log(`Email sent to ${user.email}`);
          },
          error => {
            console.error(`Error sending email to ${user.email}`, error);
          }
        );
    });
  }
}
