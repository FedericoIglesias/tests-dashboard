

class Room {
    constructor(name = 'no name', booikng = { startDate: '0/0/0', endDate: '0/0/0' }, rate = 0, discount = 0) {
        this._name = name;
        this._booking = booikng;
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

    set startDate(date) {
        this._booking.startDate = date
    }

    set endDate(date) {
        this._booking.endDate = date
    }

    set rate(rate) {
        this._rate = rate
    }

    set discount(discount) {
        this._discount = discount
    }



    isOccupied(date) {
        const aux = new Date(date).getTime()
        const auxStart = new Date(this._booking.startDate).getTime()
        const auxEnd = new Date(this._booking.endDate).getTime()

        if (auxStart <= aux && auxEnd >= aux) {
            return true
        } else { return false }
    }
}

module.exports = Room;