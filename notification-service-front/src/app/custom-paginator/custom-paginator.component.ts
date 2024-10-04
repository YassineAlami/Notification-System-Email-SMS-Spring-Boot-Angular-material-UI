import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


const BACK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
</svg>
`;

const NEXT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
</svg>
`;


@Component({
  selector: 'custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Output() page = new EventEmitter<number>();

  currentPage = 0;


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIconLiteral('back', sanitizer.bypassSecurityTrustHtml(BACK_ICON));
    iconRegistry.addSvgIconLiteral('next', sanitizer.bypassSecurityTrustHtml(NEXT_ICON));
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.emitPageEvent();
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.emitPageEvent();
    }
  }

  hasNextPage(): boolean {
    return this.currentPage < this.getNumberOfPages() - 1;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  getNumberOfPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  emitPageEvent() {
    this.page.emit(this.currentPage);
  }
}
