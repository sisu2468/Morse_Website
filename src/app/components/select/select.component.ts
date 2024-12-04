import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Output() sendConvertType = new EventEmitter<string>();

  public selectForm: FormGroup;
  public selectControl: FormControl;

  constructor(private builder: FormBuilder) {
    // 入力フォームの初期設定を行う
    this.createForm();
  }

  public ngOnInit(): void {
    this.selectControl = this.selectForm.get('convertType') as FormControl;
  }

  private createForm() {
    this.selectForm = this.builder.group({
      convertType: ['001', []]
    });

    this.selectForm
      .get('convertType')
      .valueChanges.subscribe(convertType =>
        this.sendConvertType.emit(convertType)
      );
  }
}
