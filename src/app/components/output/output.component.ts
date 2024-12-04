import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {
  @Input() text: string;
  @Input()
  set convertType(convertType: string) {
    switch (convertType) {
      case '001':
        this.hintText = '入力したテキストのモールス信号が出力されます';
        this.text = '';
        break;
      case '002':
        this.hintText =
          '人力したモールス信号のテキスト(アルファベット)が出力されます';
        this.text = '';
        break;
      case '003':
        this.hintText =
          '人力したモールス信号のテキスト(カタカナ)が出力されます';
        this.text = '';
        break;
    }
  }

  public hintText: string;
}
