import { Component, Input } from "@angular/core";

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

  public copyText(): void {
    navigator.clipboard.writeText(this.value);
  }

}
