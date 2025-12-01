//% weight=100 color=#0f7dbc icon="\uf124"
namespace gps {
    let rxPin: SerialPin
    let txPin: SerialPin
    let gps_date = ""
    let gps_time = ""
    let latitude: number
    let lat_dir = ""
    let longitude = 0
    let long_dir = ""
    let altitude = 0
    let speed = 0
    let hdop = 0
    let course = ""
    let data: string[] = []

    //% block="GPS init RX %rx TX %tx"
    export function init(rx: SerialPin, tx: SerialPin): void {
        rxPin = rx
        txPin = tx
        serial.redirect(rxPin, txPin, 9600)
        serial.setRxBufferSize(128)
    }

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        data = serial.readUntil(serial.delimiters(Delimiters.NewLine)).split(",")
        if (data[0].includes("RMC")) {
            gps_date = data[9]
            gps_time = data[1]
            latitude = convertDegree(data[3], 2)
            lat_dir = data[4]
            longitude = convertDegree(data[5], 3)
            long_dir = data[6]
            speed = parseFloat(data[7]) * 1.852
            course = data[8]
        } else if (data[0].includes("GGA")) {
            hdop = parseFloat(data[8])
            altitude = parseFloat(data[9])
        }
    })

    function convertDegree(data: string, num: number) {
        return parseFloat(data.substr(0, num)) + parseFloat(data.substr(num, data.length - num)) / 60
    }

    //% block="time"
    export function get_time(): string {
        return gps_time
    }

    //% block="date"
    export function get_date(): string {
        return gps_date
    }

    //% block="latitude"
    export function get_latitude(): number {
        return latitude
    }

    //% block="latitude direction"
    export function get_latitude_dir(): string {
        return lat_dir
    }

    //% block="longitude"
    export function get_longitude(): number {
        return longitude
    }

    //% block="longitude direction"
    export function get_longitude_dir(): string {
        return long_dir
    }

    //% block="altitude"
    export function get_altitude(): number {
        return altitude
    }

    //% block="HDOP"
    export function get_hdop(): number {
        return hdop
    }

    //% block="speed (km/h)"
    export function get_speed(): number {
        return speed
    }

    //% block="course"
    export function get_course(): string {
        return course
    }

}