import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDropdownOpen = false;
  searchQuery: string = '';

    constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  searchProducts() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/productos'], { queryParams: { search: this.searchQuery } });
    }
  }
}
