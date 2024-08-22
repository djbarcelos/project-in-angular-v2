import { Component, HostListener, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  dropdownOpen = false;
  selectedOptions: string[] = [];

  @Output() selectionChange = new EventEmitter<string[]>();
  @Input() options: string[] = [];
  @Input() selectedItems: string[] = [];

  ngOnInit() {
    this.selectedOptions = [...this.selectedItems];
  }

  toggleDropdown(event: Event) {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onOptionChange(option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedOptions.includes(option)) {
        this.selectedOptions.push(option);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.custom-select');
    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
