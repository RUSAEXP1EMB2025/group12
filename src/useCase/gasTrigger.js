/*
GASのトリガーで定期的に呼ばれる関数
*/
function gasTrigger() {
  calculateDistance();

  CheckRoomTemperature();
  updateSensorData();
}

function calculateDistance() {
  console.log("calculateDistance called");
  const user_spreadSheetService = new SpreadSheetService(Config.SHEET_ID, Config.USER_SHEET_NAME);
  const remo_spreadSheetService = new SpreadSheetService(Config.SHEET_ID, Config.REMO_SHEET_NAME);
  const userlat = user_spreadSheetService.readData(Config.USER_LATITUDE_CELL_ADDRESS);
  const userlon = user_spreadSheetService.readData(Config.USER_LONGITUDE_CELL_ADDRESS);
  const remolat = remo_spreadSheetService.readData(Config.REMO_LATITUDE_CELL_ADDRESS);
  const remolon = remo_spreadSheetService.readData(Config.REMO_LONGITUDE_CELL_ADDRESS);
  const dis = DistanceCalculator.calculateDistance(Number(userlat),Number(userlon),Number(remolat),Number(remolon));
  const usersettingdis = user_spreadSheetService.readData(Config.USER_SETTING_DISTANCE_CELL_ADDRESS);
  
  remo_spreadSheetService.writeData("B6", dis);

  if (dis < usersettingdis){
    const remoClient = new RemoClient(Config.REMO_ACESS_TOKEN);
    const airConditionerController = new AirConditionerController(remoClient,user_spreadSheetService);
    airConditionerController.turnOn();
  }else{
    const remoClient = new RemoClient(Config.REMO_ACESS_TOKEN);
    const airConditionerController = new AirConditionerController(remoClient,user_spreadSheetService);
    airConditionerController.turnOff();
  }

}

function CheckRoomTemperature() {
  console.log("CheckRoomTemperature called");
}

/*
センサーデータを取得し、スプレッドシートに保存する関数
*/
function updateSensorData() {
  console.log("updateSensorData called");
  let remoClient = new RemoClient(Config.REMO_ACESS_TOKEN);
  let spreadSheetService = new SpreadSheetService(Config.SHEET_ID, Config.REMO_SHEET_NAME);
  let remoData = remoClient.getSensorData();
  spreadSheetService.writeData(Config.REMO_TEMPERATURE_CELL_ADDRESS, [remoData.temperature]);
  spreadSheetService.writeData(Config.REMO_HUMIDITY_CELL_ADDRESS, [remoData.humidity]);
}