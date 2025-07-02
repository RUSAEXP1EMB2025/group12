/*
グローバル変数のクラス
アクセス方法: Config.<変数名>
*/
class Config {
    /*
    GASのプロパティサービスを使用して、スクリプトプロパティからremoのアクセストークンを取得する
    */
    static get REMO_ACESS_TOKEN() {
        return PropertiesService.getScriptProperties().getProperty('REMO_ACCESS_TOKEN');
    }

    /*
    GASのプロパティサービスを使用して、スクリプトプロパティからLINEのアクセストークンを取得する
    */
    static get LINE_ACCESS_TOKEN() {
        return PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN');
    }

    static get SHEET_ID() {
        return PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    }

    /*
    ユーザデータを格納するスプレッドシート名
    */
    static get USER_SHEET_NAME() {
        return "User";
    }

    /*
    Remoデータを格納するスプレッドシート名
    */
    static get REMO_SHEET_NAME() {
        return "Remo";
    }

    static get USER_LATITUDE_CELL_ADDRESS() {
        return "B1";
    }
    static get USER_LONGITUDE_CELL_ADDRESS() {
        return "B2";
    }
    static get USER_SETTING_DISTANCE_CELL_ADDRESS() {
        return "B3";
    }
    static get USER_SETTING_TEMPERATURE_CELL_ADDRESS() {
        return "B4";
    }
    static get USER_LINE_ID() {
        return PropertiesService.getScriptProperties().getProperty('USER_LINE_ID');
    }
    static get REMO_LATITUDE_CELL_ADDRESS() {
        return "B1";
    }
    static get REMO_LONGITUDE_CELL_ADDRESS() {
        return "B2";
    }
    static get REMO_HUMIDITY_CELL_ADDRESS() {
        return "B4";
    }
    static get REMO_TEMPERATURE_CELL_ADDRESS() {
        return "B3";
    }
}