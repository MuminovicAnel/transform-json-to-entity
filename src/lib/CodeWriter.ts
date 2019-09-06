import { getSpaces } from "../Utils/TextUtil";

export class CodeWriter {
  protected _savedConfig: CodeWriter;
  protected _text: string = "";
  protected _suffix: string = ";";
  protected _identSize: number = 2;
  protected _blockDepth: number = 0;
  protected _semicolonEnabled: boolean = true;
  protected _joinSeparatorChar: string = ", ";
  protected _forNextLine: boolean;
  protected _currentWrapChar?: string;
  protected _currentBlockChar?: string;
  protected _identEnabled: boolean = false;
  protected _newLined: boolean = false;
  protected _closingChars: { [key: string]: string } = {
    "{": "}",
    "(": ")",
    "[": "]"
  };

  get Text() {
    return this._text;
  }

  get IdentSize() {
    return this._identSize;
  }

  get SemicolonEnabled() {
    return this._semicolonEnabled;
  }

  get ClosingChars() {
    return this._closingChars;
  }

  get BlockDepth() {
    return this._blockDepth;
  }

  get CurrentBlockChar() {
    return this._currentBlockChar;
  }

  get CurrentWrapChar() {
    return this._currentWrapChar;
  }

  get JoinSeparatorChar() {
    return this._joinSeparatorChar;
  }

  get IdentEnabled() {
    return this._identEnabled;
  }

  get Suffix() {
    return this._suffix;
  }

  get NextLine() {
    this._forNextLine = true;
    this._savedConfig = this;
    return this;
  }

  SetJoinSeparatorChar(separator: string = ",", withSpace: boolean = true) {
    this._joinSeparatorChar = separator + (withSpace ? " " : "");
    return this;
  }

  SetSuffix(suffix: string = ";") {
    this._suffix = suffix;
  }

  SetBlockDepth(depth: number) {
    this._blockDepth = depth;
    return this;
  }

  SetIdentEnabled(ident: boolean) {
    this._identEnabled = ident;
    return this;
  }

  IncrementBlockDepth(depth: number) {
    return this.SetBlockDepth(this._blockDepth + depth);
  }

  SetClosingChars(closingChars: { [key: string]: string }) {
    this._closingChars = closingChars;
    return this;
  }

  SetCurrentWrapChar(char: string) {
    this._currentWrapChar = char;
    return this;
  }

  SetCurrentBlockChar(char: string) {
    this._currentBlockChar = char;
    return this;
  }

  SetSemicolonEnabled(semiColonEnabled: boolean) {
    this._semicolonEnabled = semiColonEnabled;
    return this;
  }

  SetIdentSize(size: number) {
    this._identSize = size;
    return this;
  }

  StartWrap(wrapChar: string = "(") {
    this
      .SetCurrentWrapChar(wrapChar)
      .Write(this.CurrentWrapChar);

    return this;
  }

  WriteJoin(...texts: string[]) {
    return this.Write(texts.join(this._joinSeparatorChar));
  }

  GetContent() {
    return new CodeWriter();
  }

  CommitContent(codeWriter: CodeWriter) {
    this.Write(codeWriter.Text);
  }

  CloseWrap(wrapChar?: string) {
    return this.Write(this.getCloseChar(wrapChar || this._currentWrapChar));
  }

  DisableIdent() {
    return this.SetIdentEnabled(false);
  }

  EnableIdent() {
    return this.SetIdentEnabled(true);
  }

  DisableSemicolon() {
    return this.SetSemicolonEnabled(false);
  }

  EnableSemicolon() {
    return this.SetSemicolonEnabled(true);
  }

  Write(...texts: string[]) {
    this.edit(texts.filter((text) => text).join(""));
    return this;
  }

  WriteCond(cond: (texts: string[]) => any, ...texts: string[]) {
    if (cond(texts)) {
      this.Write(...texts);
    }
    return this;
  }

  WriteLineCond(cond: (texts: string[]) => any, ...texts: string[]) {
    this
      .WriteCond(cond, ...texts)
      .AddNewLine();
    return this;
  }

  CofirmLine() {
    this.WriteSemicolon();
  }

  WriteLine(...texts: string[]) {
    this
      .Write(...texts)
      .AddNewLine();

    return this;
  }

  AddNewLine(withSemicolon?: boolean, times: number = 1) {
    this
      .SetSemicolonEnabled(withSemicolon !== undefined ? withSemicolon : this.SemicolonEnabled)
      .WriteSemicolon()
      .DisableIdent()
      .DisableSemicolon();

    for (let i = 0; i < times; i++) {
      this.edit("\r\n");
    }

    this
      .EnableIdent()
      .EnableSemicolon();

    this._newLined = true;
    return this;
  }

  AddSpaceLine() {
    return this.AddNewLine(undefined, 2);
  }

  StartBlock(text?: string, blockChar: string = "{") {
    this
      .DisableSemicolon()
      .WriteLine((text ? `${text} ` : ""), blockChar)
      .EnableSemicolon()
      .SetCurrentBlockChar(blockChar)
      .IncrementBlockDepth(1);

    return this;
  }

  CloseBlock(text?: string, blockChar?: string) {
    if (!text) {
      this.DisableSemicolon();
    }

    this
      .IncrementBlockDepth(-1)
      .AddNewLine();

    this
      .Write(this.getCloseChar(blockChar || this._currentBlockChar), (text ? ` ${text}` : ""))
      .EnableSemicolon();

    return this;
  }

  Ident() {
    if (this._identEnabled && this._newLined) {
      this.AddSpaces(this._blockDepth * this._identSize);
    }
    return this;
  }

  WriteSemicolon() {
    if (this._semicolonEnabled) {
      this._text += ";";
    }
    return this.commit();
  }

  AddSpaces(size: number) {
    this._text += getSpaces(size);
    return this.commit();
  }

  WriteSuffix() {
    return this.Write(this._suffix);
  }

  LoadConfig(codeWriter: CodeWriter) {
    this._joinSeparatorChar = codeWriter._joinSeparatorChar;
    this._semicolonEnabled = codeWriter._semicolonEnabled;
    this._currentBlockChar = codeWriter._currentBlockChar;
    this._currentWrapChar = codeWriter._currentWrapChar;
    this._closingChars = codeWriter._closingChars;
    this._identEnabled = codeWriter._identEnabled;
    this._savedConfig = codeWriter._savedConfig;
    this._forNextLine = codeWriter._forNextLine;
    this._blockDepth = codeWriter._blockDepth;
    this._identSize = codeWriter._identSize;
    this._newLined = codeWriter._newLined;
    this._suffix = codeWriter._suffix;
    this._text = codeWriter._text;
    return this;
  }

  private edit(text: string) {
    this.Ident();
    this._text += text;

    return this.commit();
  }

  private commit() {
    if (this._forNextLine) {
      const currentText = this._text;
      this.LoadConfig(this._savedConfig);
      this._text = currentText;
    }
    this._newLined = false;
    return this;
  }

  private getCloseChar(char: string) {
    return this._closingChars[char];
  }
}
