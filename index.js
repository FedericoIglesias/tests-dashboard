class Room {
    constructor(name = 'no name', booking = [], rate = 0, discount = 0) {
        this._booking = [];
        if (booking.length !== 0) {
            this._booking.push(booking)
        }
        this._name = name;
        this._rate = rate;
        this._discount = discount
    }

    get name() {
        return this._name
    }
    get booking() {
        return this._booking
    }

    get rate() {
        return this._rate
    }

    get discount() {
        return this._discount
    }

    set name(string) {
        this._name = string
    }


    set rate(rate) {
        this._rate = rate
    }

    set discount(discount) {
        this._discount = discount
    }

    addBooking(booking) {
        this._booking.push(booking)
    }

    removeBooking(booking) {
        this._booking = this._booking.filter(item => item != booking)
    }

    isOccupied(date) {
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

    occupancyPercentage = (startDate, endDate) => {
        if (startDate < endDate) {
            const oneDay = 86400000
            const numberDays = ((new Date(endDate) - new Date(startDate)) / oneDay) + 1 
            let count = 0
            let endDay = new Date(endDate).getTime()
            const array = this._booking
    
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
            return (Math.floor((count / numberDays) * 100) + '%')
        } else {
            return ('error in date')
        }
    }

    static availableRooms = (rooms, startDate, endDate) => {

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

}

class Booking {
    constructor(name, email, checkin, checkout, discount, room) {
        this._name = name;
        this._email = email;
        this._checkin = checkin
        this._checkout = checkout
        this._discount = discount
        this._room = room
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    get checkin() {
        return this._checkin
    }

    get checkout() {
        return this._checkout
    }

    get discount() {
        return this._discount
    }

    get room() {
        return this._room
    }

    set name(string) {

        this._name = string
    }

    set email(email) {
        this._email = email
    }

    set checkin(checkin) {
        this._checkin = checkin
    }

    set checkout(checkout) {
        this._checkout = checkout
    }

    set discount(discount) {
        this._discount = discount
    }

    set room(room) {
        this._room = room
    }

}


module.exports = {
    Room,
    Booking,
}