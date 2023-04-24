var Room = /** @class */ (function () {
    function Room(name, booking, rate, discount) {
        if (name === void 0) { name = "no name"; }
        if (booking === void 0) { booking = []; }
        if (rate === void 0) { rate = 0; }
        if (discount === void 0) { discount = 0; }
        var _this = this;
        this.occupancyPercentage = function (startDate, endDate) {
            if (startDate < endDate) {
                var oneDay = 86400000;
                var numberDays = (new Date(endDate) - new Date(startDate)) / oneDay + 1;
                var count = 0;
                var endDay = new Date(endDate).getTime();
                var array = _this.booking;
                for (var i = 0; i < array.length; i++) {
                    var auxStart = new Date(array[i].checkin).getTime();
                    var auxEnd = new Date(array[i].checkout).getTime();
                    var startDay = new Date(startDate).getTime();
                    while (startDay <= endDay) {
                        if (auxStart <= startDay && auxEnd >= startDay) {
                            count += 1;
                        }
                        startDay += oneDay;
                    }
                }
                return Math.floor((count / numberDays) * 100) + "%";
            }
            else {
                return "error in date";
            }
        };
        this.booking = [];
        if (booking.length !== 0) {
            this.booking.push(booking);
        }
        this.name = name;
        this.rate = rate;
        this.discount = discount;
    }
    Object.defineProperty(Room.prototype, "names", {
        get: function () {
            return this.name;
        },
        set: function (string) {
            this.name = string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "bookings", {
        get: function () {
            return this.booking;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "rates", {
        get: function () {
            return this.rate;
        },
        set: function (rate) {
            this.rate = rate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "discounts", {
        get: function () {
            return this.discount;
        },
        set: function (discount) {
            this.discount = discount;
        },
        enumerable: false,
        configurable: true
    });
    Room.prototype.addBooking = function (booking) {
        this.booking.push(booking);
    };
    Room.prototype.removeBooking = function (booking) {
        this.booking = this.booking.filter(function (item) { return item != booking; });
    };
    Room.prototype.isOccupied = function (date) {
        var aux = new Date(date).getTime();
        var array = this.booking;
        var redFlag = false;
        for (var i = 0; i < array.length; i++) {
            var auxStart = new Date(array[i].checkin).getTime();
            var auxEnd = new Date(array[i].checkout).getTime();
            if (auxStart <= aux && auxEnd >= aux) {
                redFlag = true;
            }
        }
        return redFlag;
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var oneDay = 86400000;
        var output = rooms;
        var startDay = new Date(startDate).getTime();
        var endDay = new Date(endDate).getTime();
        if (typeof rooms == "object" && startDay <= endDay) {
            while (startDay <= endDay) {
                var _loop_1 = function (i) {
                    if (rooms[i].isOccupied(startDay)) {
                        output = output.filter(function (item) { return item != rooms[i]; });
                    }
                    startDay += oneDay;
                };
                for (var i = 0; i < rooms.length; i++) {
                    _loop_1(i);
                }
            }
            return output;
        }
        else if (typeof rooms == "object") {
            return (output = "error in date");
        }
        else if (startDay >= endDay) {
            return (output = "rooms will should be array with room");
        }
        return output;
    };
    return Room;
}());
var Booking = /** @class */ (function () {
    function Booking(name, email, checkin, checkout, discount, room) {
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }
    Object.defineProperty(Booking.prototype, "names", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "emails", {
        get: function () {
            return this.email;
        },
        set: function (email) {
            this.email = email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "checkins", {
        get: function () {
            return this.checkin;
        },
        set: function (checkin) {
            this.checkin = checkin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "checkouts", {
        get: function () {
            return this.checkout;
        },
        set: function (checkout) {
            this.checkout = checkout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "discounts", {
        get: function () {
            return this.discount;
        },
        set: function (discount) {
            this.discount = discount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Booking.prototype, "rooms", {
        get: function () {
            return this.room;
        },
        set: function (room) {
            this.room = room;
        },
        enumerable: false,
        configurable: true
    });
    return Booking;
}());
module.exports = {
    Room: Room,
    Booking: Booking,
};
