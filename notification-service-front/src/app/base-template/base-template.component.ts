import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";





@Component({
  selector: 'app-base-template',
  templateUrl: './base-template.component.html',
  styleUrl: './base-template.component.css'
})
export class BaseTemplateComponent implements OnInit {

  protected readonly AuthService = AuthService;
  showDropdownMenu = false;
  currentlyOpenDropdown: string | null = null;

  constructor(public authService : AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }




}
