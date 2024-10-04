import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit{

  public actors : any; // Holds the list of actors fetched from the API
  public dataSource : any; // Data source for the Material table
  public displayedColumns = ['id','name','email','phoneNumber','sector']; // Columns to display in the table

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to the paginator component
  @ViewChild(MatSort) sort!: MatSort; // Reference to the sorting component

  constructor(private http : HttpClient) {

  }

  ngOnInit() {
    // Lifecycle hook that is called after the component has been initialized
    this.http.get("http://localhost:8080/api/users").subscribe({
      next: data => {
        this.actors = data; // Assign the fetched data to the actors variable
        this.dataSource = new MatTableDataSource(this.actors); // Create a new data source for the table
        this.dataSource.paginator = this.paginator; // Link the paginator to the data source
        this.dataSource.sort = this.sort; // Link the sort to the data source
      },
      error: err => {
        console.log(err); // Log any errors that occur during the HTTP request
      }
    });
  }


}
