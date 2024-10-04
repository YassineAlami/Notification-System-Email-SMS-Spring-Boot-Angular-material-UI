import { Component , OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Sector} from "../models/Sector";
import {SectorService} from "../services/sector.service";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'] // Use styleUrls instead of styleUrl
})
export class SectorComponent implements OnInit {

  public sectors: any;
  public dataSource: any;
  public displayedColumns = ['id', 'name', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8080/api/sectors").subscribe({
      next: data => {
        this.sectors = data;
        this.dataSource = new MatTableDataSource(this.sectors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err)
      }
    })
  }



 /* public sectors: Sector[] = [];
  public displayedColumns: any[] = [
    { header: 'Id', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' }
  ];

  constructor(private sectorService: SectorService) {}

  ngOnInit() {
    this.sectorService.getSectors().subscribe(
      (data: Sector[]) => {
        this.sectors = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }*/

}
