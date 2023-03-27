import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() currentPage: string='';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter;

  constructor() {
    console.log('Contructor called');
  }

  ngOnInit(): void{
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void{
    console.log('ngOnViewInit called');
  }

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }

  close() {
    this.onCloseSidenav.emit(true);
  }
}
