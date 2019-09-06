"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class CodeWriter {
    constructor() {
        this._text = "";
        this._suffix = ";";
        this._identSize = 2;
        this._blockDepth = 0;
        this._semicolonEnabled = true;
        this._joinSeparatorChar = ", ";
        this._identEnabled = false;
        this._newLined = false;
        this._closingChars = {
            "{": "}",
            "(": ")",
            "[": "]"
        };
    }
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
    SetJoinSeparatorChar(separator = ",", withSpace = true) {
        this._joinSeparatorChar = separator + (withSpace ? " " : "");
        return this;
    }
    SetSuffix(suffix = ";") {
        this._suffix = suffix;
    }
    SetBlockDepth(depth) {
        this._blockDepth = depth;
        return this;
    }
    SetIdentEnabled(ident) {
        this._identEnabled = ident;
        return this;
    }
    IncrementBlockDepth(depth) {
        return this.SetBlockDepth(this._blockDepth + depth);
    }
    SetClosingChars(closingChars) {
        this._closingChars = closingChars;
        return this;
    }
    SetCurrentWrapChar(char) {
        this._currentWrapChar = char;
        return this;
    }
    SetCurrentBlockChar(char) {
        this._currentBlockChar = char;
        return this;
    }
    SetSemicolonEnabled(semiColonEnabled) {
        this._semicolonEnabled = semiColonEnabled;
        return this;
    }
    SetIdentSize(size) {
        this._identSize = size;
        return this;
    }
    StartWrap(wrapChar = "(") {
        this
            .SetCurrentWrapChar(wrapChar)
            .Write(this.CurrentWrapChar);
        return this;
    }
    WriteJoin(...texts) {
        return this.Write(texts.join(this._joinSeparatorChar));
    }
    GetContent() {
        return new CodeWriter();
    }
    CommitContent(codeWriter) {
        this.Write(codeWriter.Text);
    }
    CloseWrap(wrapChar) {
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
    Write(...texts) {
        this.edit(texts.filter((text) => text).join(""));
        return this;
    }
    WriteCond(cond, ...texts) {
        if (cond(texts)) {
            this.Write(...texts);
        }
        return this;
    }
    WriteLineCond(cond, ...texts) {
        this
            .WriteCond(cond, ...texts)
            .AddNewLine();
        return this;
    }
    CofirmLine() {
        this.WriteSemicolon();
    }
    WriteLine(...texts) {
        this
            .Write(...texts)
            .AddNewLine();
        return this;
    }
    AddNewLine(withSemicolon, times = 1) {
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
    StartBlock(text, blockChar = "{") {
        this
            .DisableSemicolon()
            .WriteLine((text ? `${text} ` : ""), blockChar)
            .EnableSemicolon()
            .SetCurrentBlockChar(blockChar)
            .IncrementBlockDepth(1);
        return this;
    }
    CloseBlock(text, blockChar) {
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
    AddSpaces(size) {
        this._text += __1.getSpaces(size);
        return this.commit();
    }
    WriteSuffix() {
        return this.Write(this._suffix);
    }
    LoadConfig(codeWriter) {
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
    edit(text) {
        this.Ident();
        this._text += text;
        return this.commit();
    }
    commit() {
        if (this._forNextLine) {
            const currentText = this._text;
            this.LoadConfig(this._savedConfig);
            this._text = currentText;
        }
        this._newLined = false;
        return this;
    }
    getCloseChar(char) {
        return this._closingChars[char];
    }
}
exports.CodeWriter = CodeWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZVdyaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQ29kZVdyaXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUErQjtBQUUvQixNQUFhLFVBQVU7SUFBdkI7UUFFWSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFDdEIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDbEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBSWxDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBOEI7WUFDbkQsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1NBQ1QsQ0FBQztJQXFSSixDQUFDO0lBblJDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ25CLE9BQU8s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