import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/Actor';
import {Sector} from "../models/Sector";
import {ActorService} from "../services/actor.service";
import {Router} from "@angular/router";
import {SectorService} from "../services/sector.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.css'
})
export class CreateActorComponent  implements OnInit{

  sector : Sector = {id: 0, name:"", description:""}
  sectors!: Sector[];
  selectedSector!: Sector;


  actor : Actor = {id : 0, email : "", password : "", username : "", phoneNumber :"", sector: this.sector}



  constructor(private actorService : ActorService, private router :Router, private sectorService : SectorService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.sectorService.getSectors().subscribe(sectors => {
      this.sectors = sectors;
    });

  }

  saveActor(actorForm: any) {
    this.actorService.saveActor(this.actor).subscribe(
      {
        next:(res : Actor) =>{
          console.log(res);
          /*alert("Actor created successfully");*/
          this.router.navigateByUrl('/base/actors');
        },error:(err)=>{
          alert("Actor was NOT created successfully");
          console.log(err)
        }
      }
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
