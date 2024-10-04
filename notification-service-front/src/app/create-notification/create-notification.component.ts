import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Notification} from "../models/Notification";
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import {NotificationService} from "../services/notification.service";
import { Router } from '@angular/router';
import {Sector} from "../models/Sector";
import {SectorService} from "../services/sector.service";
import {Actor} from "../models/Actor";
import {ActorService} from "../services/actor.service";
import {NotificationType} from "../models/NotificationType";
import {NotificationTypeService} from "../services/notification-type.service";
import {Template} from "../models/Template";
import {TemplateWithDynamicValues} from "../models/TemplateWithDynamicValues";
import {DynamicValue} from "../models/DynamicValue";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

import * as jsPDF from 'jspdf';
import {Delivery} from "../models/Delivery";
import {DeliveryService} from "../services/delivery.service";
import {DeliveryMethod} from "../models/DeliveryMethod"; // This is incorrect for jsPDF
/*import { jsPDF } from 'jspdf';*/
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.css'
})
export class CreateNotificationComponent implements OnInit{

  notificationType: NotificationType = {templates: [], id: 0, name: ""};
  notificationTypes!: NotificationType [];
  selectedNotificationType!: NotificationType;


  template: Template ={body: "", creationDate: "", id: 0, notificationType: [], title: ""}
  templates!: Template[]; // Array to store templates
  selectedTemplate!: Template;



  deliveryMethod: DeliveryMethod = {name:"", id:0, description:""}

  delivery!: Delivery;
  deliveries!: Delivery[];
  selectedDelivery!: Delivery;


  notification : Notification= {content: "", id: 0, type:this.notificationType, users:[],delivery:this.delivery,creationDate:new Date()};

  sectors!: Sector[];
  selectedSector!: Sector;

  actors!: Actor[];
  selectedActor!: Actor;

  showSelects: boolean = false; // Boolean variable to control visibility of select items


  audience: Actor[] = []; // Array to hold the selected actors



  selectedDate!: Date;

  showOptionalInputs: boolean = false;


  public date: Date = new Date();
  time: string = '';
  public location: string = '';
  public name: string = '';
  public reason: string = '';
  public contact: string = '';
  public salary: string = '';

  templateBody: string = "We are pleased to inform you about an upcoming event that will take place on [Event Date]. The event will be held at [Event Location] and will start at [Event Time]. Please mark your calendar and make sure to attend this exciting event. Best regards.";

  // Define the customized template body variable to hold the result
  customizedTemplateBody!: string; // Variable to hold customized template body


  // Define a boolean flag to control the visibility of the Template 1 input fields
  showTemplate1Inputs: boolean = false;

  showDateInput: boolean = false;
  showTimeInput: boolean = false;
  showNameInput: boolean = false;
  showLocationInput: boolean = false;
  showReasonInput: boolean = false;
  showContactInfoInput: boolean = false;
  showSalaryInput: boolean = false;

  // Define a boolean flag to control the visibility of the Template 2 input fields
  showTemplate2Inputs: boolean = false;

  printable: boolean = false;






  constructor(private http : HttpClient, private notificationService : NotificationService,
              private router:Router, private sectorService:SectorService,
              private actorService:ActorService, private notificationTypeService: NotificationTypeService,
              private deliveryService:DeliveryService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(){

    this.notificationTypeService.getNotificationTypes().subscribe(notificationTypes => {
      this.notificationTypes = notificationTypes;
    });

    this.sectorService.getSectors().subscribe(sectors => {
      this.sectors = sectors;
    });

    this.actorService.getActors().subscribe(actors => {
      this.actors = actors;
    });

    this.deliveryService.getAvailableDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
    });


    // Perform the replacement of placeholders with dynamic values
    const customizedTemplateBody: string = this.replacePlaceholders(this.templateBody, this.templateWithDynamicValues.dynamicValues);

    // Log the customized template body to the console
    console.log(customizedTemplateBody);
  }


  saveNotification(notificationForm: any) {
    this.notificationService.saveNotification(this.notification).subscribe(
      {
        next:(res : Notification) =>{
          console.log(res);
          this.router.navigateByUrl('/base/notifications');
          /*notificationForm.reset();*/
        },error:(err)=>{
          console.log(err)
        }
      }
    );
  }

  toggleSelects() {
    this.showSelects = !this.showSelects;
  }

  getAudienceUsernames(): string {
    return this.notification.users.map(actor => actor.username).join(', ');
  }
  assignActor() {
    if (this.selectedActor) {
      console.log('Selected Actor:', this.selectedActor);
      this.audience.push(this.selectedActor);

      // Remove the selected actor from the actors array
      this.actors = this.actors.filter(actor => actor !== this.selectedActor);

    } else {
      console.log('No actor selected.');
    }

    // Assign the audience array directly to this.notification.users
    this.notification.users = this.audience;
  }

  assignActorsFromSector(){
    if (this.selectedSector) {
      // Find all actors belonging to the selected sector
      const sectorActors = this.actors.filter(actor => actor.sector.id === this.selectedSector.id);

      // Add all sector actors to the audience
      this.audience.push(...sectorActors);

      // Remove the selected sector from the sectors array
      this.sectors = this.sectors.filter(sector => sector !== this.selectedSector);

      // Remove users belonging to the selected sector from the actors array
      this.actors = this.actors.filter(actor => actor.sector.id !== this.selectedSector.id);
    } else if (this.selectedActor) {
      // Add the selected actor to the audience
      this.audience.push(this.selectedActor);
    } else {
      console.log('No sector or actor selected.');
    }

    // Update the notification users with the updated audience
    this.notification.users = this.audience;
  }

  // Method to filter templates based on selected notification type
  filterTemplates(selectedType: any): void {
    this.templates = [];
    this.selectedTemplate=this.template;
    this.notification.content="";
    if (selectedType) {
      // Set the selected notification type
      this.selectedNotificationType = selectedType;
      // Filter templates based on selected notification type
      this.templates = this.selectedNotificationType.templates;
      this.hideTemplateFields();
    } /*else {
      // Reset templates if no notification type is selected
      this.templates = [];
    }*/
  }


  updateTextareaContent(): void {
    if (this.selectedTemplate) {
      // Set the content of the textarea to the body of the selected template
      //this.textareaContent = this.selectedTemplate.body;
      this.notification.content = this.selectedTemplate.body;
      //
      this.templateBody =  this.notification.content;
      //Show the hidden inputs for dynamic values
      this.showDateInput=this.showLocationInput=this.showNameInput=this.showReasonInput=this.showContactInfoInput=this.showTimeInput=this.showSalaryInput=false;
      if (this.selectedTemplate.id==1){
        //this.toggleTemplateInput();
         this.showDateInput=this.showLocationInput=this.showTimeInput=true;
      }else if(this.selectedTemplate.id==2){
        this.showDateInput=this.showLocationInput=this.showNameInput=this.showReasonInput=this.showContactInfoInput=true;
      }else if(this.selectedTemplate.id==3){
        this.showDateInput=this.showSalaryInput=this.showReasonInput=true;
      }

    }
  }


  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.date = new Date(event.value.toUTCString()); // Convert to UTC format
      console.log('Selected date:', this.date);
    }
  }
  onLocationChange() {
    console.log('Location:', this.location);
  }
  onTimeChange() {
    console.log('Time:', this.time);
    // we can perform any other actions with the time value here
  }

  onNameChange() {
    console.log('Name:', this.name);
  }
  onReasonChange() {
    console.log('Reason:', this.reason);
  }
  onContactChange() {
    console.log('Contact:', this.contact);
  }
  onSalaryChange() {
    console.log('New Salary:', this.salary);
  }






  // Function to replace placeholders with dynamic values
  replacePlaceholders(template: string, dynamicValues: DynamicValue[]): string {
    // Iterate over dynamic values
    dynamicValues.forEach(dynamicValue => {
      // Create a regular expression to match the placeholder
      const placeholderRegex = new RegExp(`\\[${dynamicValue.key}\\]`, 'g');
      // Replace all occurrences of the placeholder with the dynamic value
      template = template.replace(placeholderRegex, dynamicValue.value);
    });
    return template;
  }


  // Example template with dynamic values
  templateWithDynamicValues: TemplateWithDynamicValues = {
    templateId: 1,
    dynamicValues: [
      { key: 'date', value: '11/11/2011' },
      { key: 'location', value: 'l9amra'},
      { key: 'time', value: '9:00 PM' }
      // we can add other dynamic values as needed
    ]
  };


  generateCustomizedTemplate(): void {
    // Get the template body from the textarea
    const templateBody: string = this.templateBody;

    // Replace the placeholder with the dynamic date value
    const customizedTemplateBody: string = templateBody
      .replace('[$date]', this.formatDate(this.date))
      .replace('[$location]', this.location) // Replace location placeholder with location value);
      .replace('[$time]', this.time) // Replace location placeholder with location value);
      .replace('[$name]', this.name)
      .replace('[$reason]', this.reason)
      .replace('[$contact]', this.contact)
      .replace('[$salary]', this.salary)

      .replace('[$company]', this.time)
      .replace('[$description of new policy]', this.time)
      .replace('[$impact of new policy]', this.time);
    // Display the customized template body
    console.log(customizedTemplateBody);
    this.customizedTemplateBody = customizedTemplateBody;
    this.notification.content = this.customizedTemplateBody;
    this.scrollToTop();
    this.printable=true;
  }

  formatDate(date: Date): string {
    // Extract the year, month, and day from the date
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1; // Month is zero-based
    const day: number = date.getDate();

    // Format the date as "YYYY-MM-DD"
    const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  }


  // Function to toggle the visibility of the input field
  toggleTemplateInput(): void {
    this.showDateInput=true;this.showLocationInput=true;this.showTimeInput;
  }
  // Function to toggle the visibility of the input field
  toggleTemplate2Input(): void {
    this.showTemplate1Inputs = true;
  }

  scrollToTop() {
    let scrollPosition = window.pageYOffset;
    const scrollStep = Math.floor(scrollPosition / 10); // Adjust scroll step for desired speed

    const scrollInterval = setInterval(() => {
      window.scrollBy(0, -scrollStep);
      scrollPosition -= scrollStep;
      if (scrollPosition <= 0) {
        clearInterval(scrollInterval);
        window.scrollTo(0, 0);
      }
    }, 15); // Adjust interval for animation duration (lower value = faster)
  }


  saveAsPDF() {
    const textAreaContent = (document.getElementById('textAreaId') as HTMLTextAreaElement).value;
    let doc = new (jsPDF as any).jsPDF(); // Type assertion for clarity
    doc.setFontSize(10)
    doc.text(textAreaContent, 10, 40); // Adjust positioning as needed
    doc.save('text-data.pdf');
  }

  hideTemplateFields (){
    this.showDateInput=this.showTimeInput=this.showLocationInput=this.showNameInput=this.showReasonInput=this.showSalaryInput=this.showContactInfoInput=false;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
