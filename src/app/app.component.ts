import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title!: string;
  public copiedValue!: string;

  constructor() {
    this.title = 'Password Generator';
    this.copiedValue = '';
  }

  public getValue(event: string) {
    this.copiedValue = event;
    console.log(this.copiedValue);
  }
}
