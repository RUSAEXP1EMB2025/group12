class RemoClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /*
    センサのデータを取得するメソッド
    戻り値: SensorData（例: { temperature: 22.5, humidity: 45 }）
    https://api.nature.global/1/devicesを使用
    */
    getSensorData() {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.accessToken
        };

        const options = {
            method: "get",
            headers: headers
        };

        // 家電情報を取得
        const getResponse = UrlFetchApp.fetch("https://api.nature.global/1/devices", options);
        const appliances = JSON.parse(getResponse.getContentText());

        const temperature = appliances[0].newest_events.te.val;
        const humidity = appliances[0].newest_events.hu.val;

        let sensorData = new SensorData(temperature, humidity)
        return sensorData;
    }

    /*
    Nature Remo APIを使用してエアコンの操作を行うメソッド
    */
    sendSignal(signal) {  //"ON", "OFF", or number
        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            "Content-Type": "application/json"
        };

        const getOptions = {
            method: "get",
            headers: headers
        };

        // 家電情報を取得
        const getResponse = UrlFetchApp.fetch("https://api.nature.global/1/appliances", getOptions);
        const appliances = JSON.parse(getResponse.getContentText());

        // nickname が "エアコン" のものを探す
        let applianceId = "";
        for (let appliance of appliances) {
            if (appliance.nickname === "エアコン") {
                applianceId = appliance.id;
                break;
            }
        }
        if (applianceId == "")
            throw new Error("nickname が『エアコン』の家電が見つかりませんでした。");

        const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

        let command;
        if (signal == "ON") {
            command = "ON";
        } else if (signal == "OFF") {
            command = "OFF";
        } else {
            command = Number(signal);
        }

        let payload = {}
        switch (command) {
            case "ON":
                payload = {button: 'power-on'};
                break;
            case "OFF":
                payload = {button: 'power-off'};
                break;
            default:
                payload = {
                    temperature: String(command),
                    mode: "auto",
                    fan: "auto",
                };
                break;
        }

        const postOptions = {
            method: "post",
            headers: headers,
            payload: payload,
            muteHttpExceptions: true
        };

        const postResponse = UrlFetchApp.fetch(url, postOptions);
        Logger.log(postResponse.getContentText());
    }

    // getState() {
    //     const headers = {
    //         "Authorization": "Bearer " + this.accessToken,
    //         "Content-Type": "application/json"
    //     };

    //     const options = {
    //         method: "get",
    //         headers: headers
    //     };

    //     // 家電情報を取得
    //     const getResponse = UrlFetchApp.fetch("https://api.nature.global/1/appliances", options);
    //     const appliances = JSON.parse(getResponse.getContentText());

    //     // button が "power-off"か判定(onのときは空文字列)
    //     for (let appliance of appliances) {
    //         if (appliance.nickname === "エアコン") {
    //             if (!appliance.settings || Object.keys(appliance.settings).length === 0) {
    //                 return 0; // 電源OFFとみなす
    //             } else {
    //                 return 1; // 電源ONとみなす
    //             }
    //         }
    //     }

    //     throw new Error("『エアコン』の家電が見つかりませんでした。");
    // }
}