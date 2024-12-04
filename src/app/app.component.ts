import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public setText = '';
  public setConvertType = '001';

  onInput(text: string) {
    this.setText = text;
  }

  onSendConvertType(type: string) {
    this.setConvertType = type;
  }
}
