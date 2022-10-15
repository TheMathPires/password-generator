import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-input',
  templateUrl: './password-value.component.html',
  styleUrls: ['./password-value.component.scss']
})
export class PasswordValue {

  public value!: string;

  @Output()
  public onValueCopy!: EventEmitter<string>;

  constructor() {
    this.value = '';
    this.onValueCopy = new EventEmitter<string>();
  }


  public copyPassword(): void {
    console.log(this.value);
    this.onValueCopy.emit(this.value);
  }

}
