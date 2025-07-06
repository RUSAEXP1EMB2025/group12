class AirConditionerController {
  constructor(remoClient, spreadSheetService) {
    this.remoClient = remoClient;
    this.spreadSheetService = spreadSheetService;
  }

  /* エアコンの電源をオンにする */
  turnOn() {
    if (PropertiesService.getScriptProperties().getProperty('AirConditionerIsOn') == 'on') {
      console.log("エアコンはすでにオンです。");
      return;
    }
    
    const lineSender = new LINESender(Config.LINE_ACCESS_TOKEN);
    const userSettingTemperature = this.spreadSheetService.readData(Config.USER_SETTING_TEMPERATURE_CELL_ADDRESS);
    if (userSettingTemperature == "") {
      lineSender.sendMassage("エアコンの温度が設定されていません。\n温度を指定してください。");
      return;
    }
    lineSender.sendMassage(`エアコンを${this.spreadSheetService.readData(Config.USER_SETTING_TEMPERATURE_CELL_ADDRESS)}度でオンにしました。`);
    this.remoClient.sendSignal("ON");
    this.updateTemperature();
    PropertiesService.getScriptProperties().setProperty('AirConditionerIsOn', 'on');
  }

  /* エアコンの電源をオフにする */
  turnOff() {
    if (PropertiesService.getScriptProperties().getProperty('AirConditionerIsOn') == 'off') {
      console.log("エアコンはすでにオフです。");
      return;
    }
    this.remoClient.sendSignal("OFF");
    PropertiesService.getScriptProperties().setProperty('AirConditionerIsOn', 'off');
    const lineSender = new LINESender(Config.LINE_ACCESS_TOKEN);
    lineSender.sendMessage("エアコンをオフにしました。");
  }

  /* エアコンの温度を設定する */
  updateTemperature() {
    /* スプレッドシートからデータを読み込んで温度を設定する */
    const temperature = this.spreadSheetService.readData( Config.USER_SETTING_TEMPERATURE_CELL_ADDRESS );
    this.remoClient.sendSignal(temperature);
  }
}
