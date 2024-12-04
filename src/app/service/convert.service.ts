import { Injectable } from '@angular/core';
import mapping from '../../assets/mapping.json';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  public morseMap: Map<string, string>;
  public japaneseMap: Map<string, string>;
  public englishMap: Map<string, string>;

  constructor() {
    this.createMorseMap();
    this.createEnglishMap();
    this.createJapaneseMap();
  }

  /**
   * 文字列を1文字に分割してからモールス信号に変換する。
   *
   * @param {string} [text=''] 入力フォームの文字列
   * @returns {string} 変換後の文字列
   * @memberof ConvertService
   */
  public convertToMorseCode(text = ''): string {
    if (!text) {
      return '';
    }
    const textList = text.trim().split('');
    const morseCodeList = this.mapping(textList);
    return morseCodeList.join('  ');
  }

  public convertToJapanese(text = ''): string {
    if (!text) {
      return '';
    }
    const textList = text.trim().split(' ');
    const morseCodeList = this.mappingJp(textList);
    return morseCodeList.join('');
  }

  public convertToEnglish(text = ''): string {
    if (!text) {
      return '';
    }
    const textList = text.trim().split(' ');
    const morseCodeList = this.mappingEn(textList);
    return morseCodeList.join('');
  }

  /**
   * 1文字ずつモールス信号に変換する。
   *
   * @private
   * @param {string[]} textList 入力フォームの文字配列
   * @returns {string[]} 変換後の文字配列
   * @memberof ConvertService
   */
  private mapping(textList: string[]): string[] {
    return textList.map(text =>
      this.morseMap.has(text) ? this.morseMap.get(text) : ''
    );
  }

  private mappingJp(textList: string[]): string[] {
    return textList.map(text =>
      this.japaneseMap.has(text) ? this.japaneseMap.get(text) : ''
    );
  }

  private mappingEn(textList: string[]): string[] {
    return textList.map(text =>
      this.englishMap.has(text) ? this.englishMap.get(text) : ''
    );
  }

  /**
   * 日本語・アルファベットがKey、
   * モールス信号がValueになるMapを作成する。
   *
   * @private
   * @memberof ConvertService
   */
  private createMorseMap(): void {
    // 初期化
    this.morseMap = new Map<string, string>();

    // 日本語のモールス信号へのマッピング
    mapping.morseJp.forEach((code, index) => {
      this.morseMap.set(mapping.hiragana[index], code);
      this.morseMap.set(mapping.katakana[index], code);
    });

    // 英語のモールス信号へのマッピング
    mapping.morseEn.forEach((code, index) => {
      this.morseMap.set(mapping.uppercaseAlphabet[index], code);
      this.morseMap.set(mapping.lowercaseAlphabet[index], code);
    });

    // 数字のモールス信号へのマッピング
    mapping.morseNum.forEach((code, index) => {
      this.morseMap.set(mapping.numbers[index], code);
    });

    // 記号のモールス信号へのマッピング
    mapping.morseSymbol.forEach((code, index) => {
      this.morseMap.set(mapping.symbol[index], code);
    });
  }

  private createEnglishMap(): void {
    // 初期化
    this.englishMap = new Map<string, string>();

    // 英語のモールス信号へのマッピング
    mapping.outputMorseEn.forEach((code, index) => {
      this.englishMap.set(code, mapping.uppercaseAlphabet[index]);
    });

    // 数字のマッピング
    mapping.outputMorseNum.forEach((code, index) => {
      this.englishMap.set(code, mapping.numbers[index]);
    });

    // 記号のマッピング
    mapping.outputSymbolEn.forEach((code, index) => {
      this.englishMap.set(code, mapping.inputSymbolEn[index]);
    });
  }

  private createJapaneseMap(): void {
    // 初期化
    this.japaneseMap = new Map<string, string>();

    // 日本語のモールス信号へのマッピング
    mapping.outputMorseJp.forEach((code, index) => {
      this.japaneseMap.set(code, mapping.katakana[index]);
    });

    // 数字のマッピング
    mapping.outputMorseNum.forEach((code, index) => {
      this.japaneseMap.set(code, mapping.numbers[index]);
    });

    // 記号のマッピング
    mapping.outputSymbolJp.forEach((code, index) => {
      this.japaneseMap.set(code, mapping.inputSymbolJp[index]);
    });
  }
}
