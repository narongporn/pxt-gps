input.onButtonPressed(Button.A, function () {
    if (page > 1) {
        page += -1
        makerbit.clearLcd1602()
    }
})
input.onButtonPressed(Button.B, function () {
    if (page < 3) {
        page += 1
        makerbit.clearLcd1602()
    }
})
let page = 0
gps.init(SerialPin.P13, SerialPin.P14)
makerbit.connectLcd(39)
page = 1
basic.forever(function () {
    if (page == 1) {
        makerbit.showStringOnLcd1602(gps.get_date(), makerbit.position1602(LcdPosition1602.Pos1), 6, TextOption.AlignRight)
        makerbit.showStringOnLcd1602(gps.get_time(), makerbit.position1602(LcdPosition1602.Pos17), 6, TextOption.AlignRight)
        makerbit.showStringOnLcd1602(gps.get_latitude_dir(), makerbit.position1602(LcdPosition1602.Pos8), 1)
        makerbit.showStringOnLcd1602(gps.get_longitude_dir(), makerbit.position1602(LcdPosition1602.Pos24), 1)
        makerbit.showStringOnLcd1602("" + (gps.get_latitude()), makerbit.position1602(LcdPosition1602.Pos10), 7)
        makerbit.showStringOnLcd1602("" + (gps.get_longitude()), makerbit.position1602(LcdPosition1602.Pos25), 8)
    } else if (page == 2) {
        makerbit.showStringOnLcd1602("Speed", makerbit.position1602(LcdPosition1602.Pos1), 5)
        makerbit.showStringOnLcd1602("Alti", makerbit.position1602(LcdPosition1602.Pos17), 5)
        makerbit.showStringOnLcd1602("" + (gps.get_speed()), makerbit.position1602(LcdPosition1602.Pos7), 10)
        makerbit.showStringOnLcd1602("" + (gps.get_altitude()), makerbit.position1602(LcdPosition1602.Pos23), 10)
    } else if (page == 3) {
        makerbit.showStringOnLcd1602("Elev", makerbit.position1602(LcdPosition1602.Pos1), 4)
        makerbit.showStringOnLcd1602("Azim", makerbit.position1602(LcdPosition1602.Pos17), 4)
    } else {
    	
    }
    led.plotBarGraph(
    gps.get_hdop(),
    7
    )
    basic.pause(1000)
})
