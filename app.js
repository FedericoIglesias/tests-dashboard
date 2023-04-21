const { Room, Booking } = require('./index')
const A1 = new Room('A1', [], 10.63, 10);
const A2 = new Room('A2', [], 10.63, 10);
const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2020', 2.5, A1)
const Car = new Booking('Carlo', '123@gmail.com', '5/17/2020', '5/29/2020', 2.5, A1)
A1.addBooking(Alb)
A1.addBooking(Car)

const oneDay = 86400000

const addDay = () => {
    const a = new Date('4/17/2020').getTime()
    const b = a + oneDay
    return new Date(b)
}


const array = [{ checkin: '4/10/2020', checkout: '4/20/2020' }, { checkin: '5/1/2020', checkout: '5/4/2020' }]

const occupancyPercentage = (startDate, endDate) => {
    if (startDate < endDate) {
        const oneDay = 86400000
        const numberDays = ((new Date(endDate) - new Date(startDate)) / oneDay) + 1
        let count = 0
        let endDay = new Date(endDate).getTime()


        for (let i = 0; i < array.length; i++) {
            const auxStart = new Date(array[i].checkin).getTime()
            const auxEnd = new Date(array[i].checkout).getTime()
            let startDay = new Date(startDate).getTime()

            while (startDay <= endDay) {
                if (auxStart <= startDay && auxEnd >= startDay) {
                    count += 1
                }
                startDay += oneDay
            }
        }
        return (Math.floor((1 - count / numberDays) * 100) + '%')
    } else {
        return ('error in date')
    }
}

const isOccupied = (date) => {
    const aux = new Date(date).getTime()
    const array = this._booking
    let redFlag = false

    for (let i = 0; i < array.length; i++) {
        const auxStart = new Date(array[i]._checkin).getTime()
        const auxEnd = new Date(array[i]._checkout).getTime()
        if (auxStart <= aux && auxEnd >= aux) {
            redFlag = true
        }
    }
    return redFlag
}

const availableRooms = (rooms, startDate, endDate) => {

    const oneDay = 86400000
    let output = rooms
    let startDay = new Date(startDate).getTime()
    let endDay = new Date(endDate).getTime()

    if (typeof rooms == 'object' && startDay <= endDay) {

        while (startDay <= endDay) {

            for (let i = 0; i < rooms.length; i++) {

                if (rooms[i].isOccupied(startDay)) {
                    output = output.filter(item => item != rooms[i])

                }
                startDay += oneDay
            }
        }

        return output

    } else if (typeof rooms == 'object') {
        return (output = 'error in date')
    } else if (startDay >= endDay) {
        return (output = 'rooms will should be array with room')
    }
    return output
}



console.log(availableRooms([A1, A2], '4/10/2000', '4/16/2020'));