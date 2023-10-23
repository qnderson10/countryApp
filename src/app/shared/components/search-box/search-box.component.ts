import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  private deBouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @ViewChild('txtSearchInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.deBouncer
      .pipe(
        debounceTime(300),
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  emitOnSearchTag(): void {
    const newTag = this.tagInput.nativeElement.value;

    if (newTag.length > 0){
      this.onValue.emit(newTag);
    }

    this.tagInput.nativeElement.value = '';
  }

  onKeyPress(searchTerm: string): void {
    this.deBouncer.next(searchTerm);
  }
}
