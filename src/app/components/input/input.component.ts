import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ConvertService } from 'src/app/service/convert.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  public inputForm: FormGroup;
  public japaneseControl: FormControl;
  public placeholderText: string;
  public hintText: string;
  public languageType: string;

  @Input()
  set convertType(convertType: string) {
    switch (convertType) {
      case '001':
        this.placeholderText = 'テキストを入力';
        this.hintText =
          'ひらがな、カタカナ、半角英数字のいずれかを入力してください';
        this.languageType = '001';
        this.inputForm.reset();
        break;
      case '002':
        this.placeholderText = `モールス信号を入力(ツーは'_'、トンは'.'、文字の間隔は半角スペース)`;
        this.hintText = `モールス信号を入力してください(ツーは'_'、トンは'.'、文字の間隔は半角スペースでお願いします)`;
        this.languageType = '002';
        this.inputForm.reset();
        break;
      case '003':
        this.placeholderText = `モールス信号を入力(ツーは'_'、トンは'.'、文字の間隔は半角スペース)`;
        this.hintText = `モールス信号を入力してください(ツーは'_'、トンは'.'、文字の間隔は半角スペースでお願いします)`;
        this.languageType = '003';
        this.inputForm.reset();
    }
  }
  @Output() inputText = new EventEmitter<string>();

  constructor(
    private builder: FormBuilder,
    private convertService: ConvertService
  ) {
    // 入力フォームの初期設定を行う
    this.createForm();
  }

  public ngOnInit(): void {
    this.japaneseControl = this.inputForm.get('japanese') as FormControl;
  }

  /**
   * フォームの初期設定をする。
   *
   * @memberof InputComponent
   */
  private createForm() {
    this.inputForm = this.builder.group({
      japanese: ['', []]
    });

    this.convert();
  }

  /**
   * 変換ロジックを呼び出す。
   *
   * @memberof InputComponent
   */
  private convert() {
    // 入力フォームの値が変更された場合、500ミリ秒間隔で値を取得する
    this.inputForm
      .get('japanese')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(text => {
        switch (this.languageType) {
          case '001':
            this.inputText.emit(this.convertService.convertToMorseCode(text));
            break;
          case '002':
            this.inputText.emit(this.convertService.convertToEnglish(text));
            break;
          case '003':
            this.inputText.emit(this.convertService.convertToJapanese(text));
            break;
        }
      });
  }
}
