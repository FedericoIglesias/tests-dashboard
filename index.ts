class Room {

  name: string;
  rate: number;
  discount: number;
  booking: any;

  constructor(name: string = "no name", booking: any = [], rate: number = 0, discount: number = 0) {
    this.booking = [];
    if (booking.length !== 0) {
      this.booking.push(booking);
    }
    this.name = name;
    this.rate = rate;
    this.discount = discount;
  }

  get names() {
    return this.name;
  }
  get bookings() {
    return this.booking;
  }

  get rates() {
    return this.rate;
  }

  get discounts() {
    return this.discount;
  }

  set names(string:string) {
    this.name = string;
  }

  set rates(rate: number) {
    this.rate = rate;
  }

  set discounts(discount: number) {
    this.discount = discount;
  }

  addBooking(booking) {
    this.booking.push(booking);
  }

  removeBooking(booking) {
    this.booking = this.booking.filter((item) => item != booking);
  }

  isOccupied(date) {
    const aux = new Date(date).getTime();
    const array = this.booking;
    let redFlag = false;

    for (let i = 0; i < array.length; i++) {
      const auxStart = new Date(array[i].checkin).getTime();
      const auxEnd = new Date(array[i].checkout).getTime();
      if (auxStart <= aux && auxEnd >= aux) {
        redFlag = true;
      }
    }
    return redFlag;
  }

  occupancyPercentage = (startDate, endDate) => {
    if (startDate < endDate) {
      const oneDay = 86400000;
      const numberDays = (new Date(endDate) - new Date(startDate)) / oneDay + 1;
      let count = 0;
      let endDay = new Date(endDate).getTime();
      const array = this.booking;

      for (let i = 0; i < array.length; i++) {
        const auxStart = new Date(array[i].checkin).getTime();
        const auxEnd = new Date(array[i].checkout).getTime();
        let startDay = new Date(startDate).getTime();

        while (startDay <= endDay) {
          if (auxStart <= startDay && auxEnd >= startDay) {
            count += 1;
          }
          startDay += oneDay;
        }
      }
      return Math.floor((count / numberDays) * 100) + "%";
    } else {
      return "error in date";
    }
  };

  static availableRooms = (rooms, startDate, endDate) => {
    const oneDay = 86400000;
    let output = rooms;
    let startDay = new Date(startDate).getTime();
    let endDay = new Date(endDate).getTime();

    if (typeof rooms == "object" && startDay <= endDay) {
      while (startDay <= endDay) {
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].isOccupied(startDay)) {
            output = output.filter((item) => item != rooms[i]);
          }
          startDay += oneDay;
        }
      }

      return output;
    } else if (typeof rooms == "object") {
      return (output = "error in date");
    } else if (startDay >= endDay) {
      return (output = "rooms will should be array with room");
    }
    return output;
  };
}

class Booking {

name: string
email: string
checkin: string
checkout: string
discount: number
room: any

  constructor(name: string, email: string, checkin: string, checkout: string, discount: number, room: any) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }

  get names() {
    return this.name;
  }

  get emails() {
    return this.email;
  }

  get checkins() {
    return this.checkin;
  }

  get checkouts() {
    return this.checkout;
  }

  get discounts() {
    return this.discount;
  }

  get rooms() {
    return this.room;
  }

  set names(name: string) {
    this.name = name;
  }

  set emails(email: string) {
    this.email = email;
  }

  set checkins(checkin: string) {
    this.checkin = checkin;
  }

  set checkouts(checkout: string) {
    this.checkout = checkout;
  }

  set discounts(discount: number) {
    this.discount = discount;
  }

  set rooms(room: any) {
    this.room = room;
  }
}

module.exports = {
    Room,
    Booking,
}