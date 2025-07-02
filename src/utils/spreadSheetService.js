class SpreadSheetService {
    // コンストラクタでスプレッドシートIDとシート名からシートを取得
    constructor(spreadsheetId, sheetName) {
        this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        this.sheet = this.spreadsheet.getSheetByName(sheetName);

        if (!this.sheet) {
        throw new Error(`シート名 "${sheetName}" が見つかりません。`);
        }
    }

    // スプレッドシートからデータを取得するメソッド
    /*
    cellAddress: 取得するセルのアドレス（例: 'A1'）
    戻り値: セルの値（例: '値1'）
    */
    readData(cellAddress) {
        return this.sheet.getRange(cellAddress).getValue();
    }

    // スプレッドシートにデータを書き込むメソッド
    /*
    cellAddress: 書き込み先のセルアドレス（例: 'A1'）
    values: 書き込む値の配列（例: ['値1', '値2']）
    */
    writeData(cellAddress, values) {
        this.sheet.getRange(cellAddress).setValue(values);
    }
}