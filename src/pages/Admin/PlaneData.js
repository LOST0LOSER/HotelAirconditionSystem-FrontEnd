let PlaneData = {
  Rooms: [{
      RoomID: 1,  //房间号
      powerOn: false, //开关
      curTemp: 25,  //当前温度
      targetTemp: 23, //目标温度
      windSpeed: 2, //风速
      sweeping: true, //扫风
      timerSet: false,  //计时器开关
      timerDuration: 0, //计时器时间
      costs: 200, //费用
      isCool: true, //制冷制热
      defaultTemp: 25,  //默认温度
      highLimitedTemp: 30,  //最高限制温度
      lowLimitedTemp: 16,   //最低限制温度
      runningTime: "0:02:30"  //运行时间
    },
    {
      RoomID: 2,
      powerOn: false,
      curTemp: 25,
      targetTemp: 23,
      windSpeed: 2,
      sweeping: true,
      timerSet: false,
      timerDuration: 0, //计时器时间
      costs: 200,
      isCool: true,
      defaultTemp: 25,
      highLimitedTemp: 30,
      lowLimitedTemp: 16,
      runningTime: "0:02:30"
    }
  ]
}

export default PlaneData;