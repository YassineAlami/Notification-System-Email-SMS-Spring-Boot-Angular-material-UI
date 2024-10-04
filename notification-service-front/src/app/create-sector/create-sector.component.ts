import { Component } from '@angular/core';
import {Sector} from "../models/Sector";
import {Notification} from "../models/Notification";
import {SectorService} from "../services/sector.service";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button'; // Import ButtonModule from PrimeNG

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrl: './create-sector.component.css'
})
export class CreateSectorComponent {

  sector: Sector = {name : "", description : "", id : 0};

  constructor(private sectorService : SectorService, private router: Router, private _snackBar: MatSnackBar) {
  }

  saveSector(notificationForm: any) {
    this.sectorService.saveSector(this.sector).subscribe(
      {
        next:(res : Sector) =>{
          console.log(res);
          /*alert("Sector created successfully");*/
          this.router.navigateByUrl('/base/sectors');
        },error:(err)=>{
          alert("Sector was NOT created successfully");
          console.log(err)
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }



}
