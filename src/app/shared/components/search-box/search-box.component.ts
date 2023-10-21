import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('txtSearchInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  emitOnSearchTag(): void {
    const newTag = this.tagInput.nativeElement.value;

    if (newTag.length > 0){
      this.onValue.emit(newTag);
    }

    this.tagInput.nativeElement.value = '';
  }
}
