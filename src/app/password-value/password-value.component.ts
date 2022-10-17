import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-input',
  templateUrl: './password-value.component.html',
  styleUrls: ['./password-value.component.scss']
})
export class PasswordValue {

  @Input()
  public value!: string;

  constructor() {
    this.value = '';
  }

}
