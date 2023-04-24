const {Room, Booking} = require('./index')




test('test initial Room whitout value', () => {
    const fisrtRoom = new Room();
    expect(fisrtRoom.names).toBe('no name');
    expect(fisrtRoom.bookings).toEqual([]);
    expect(fisrtRoom.rates).toBe(0);
    expect(fisrtRoom.discounts).toBe(0);
});

test('test initial Room whit value', () => {
    const fisrtRoom = new Room('A1', 'a', 10.63, 10);
    expect(fisrtRoom.names).toBe('A1');
    expect(fisrtRoom.bookings).toEqual(['a']);
    expect(fisrtRoom.rates).toBe(10.63);
    expect(fisrtRoom.discounts).toBe(10);
});

test('test set Room props', () => {
    const fisrtRoom = new Room('A1', 'a', 10.63, 10);
    fisrtRoom.names = 'A2';
    fisrtRoom.rates = 5.30;
    fisrtRoom.discounts = 5;
    fisrtRoom.addBooking('b')
    expect(fisrtRoom.names).toBe('A2');
    expect(fisrtRoom.bookings).toEqual(['a', 'b']);
    expect(fisrtRoom.rates).toBe(5.30);
    expect(fisrtRoom.discounts).toBe(5);
});

test('initial booking', () => {
const firstBooking = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , 'A1')
expect(firstBooking.names).toBe('Alberto')
expect(firstBooking.emails).toBe('123@gmail.com')
expect(firstBooking.checkins).toBe('4/17/2020')
expect(firstBooking.checkouts).toBe('4/29/2021')
expect(firstBooking.discounts).toBe(2.5)
expect(firstBooking.rooms).toBe('A1')
})

test('initial booking whitout value', () => {
const firstBooking = new Booking()
expect(firstBooking.names).toBe(undefined)
expect(firstBooking.emails).toBe(undefined)
expect(firstBooking.checkins).toBe(undefined)
expect(firstBooking.checkouts).toBe(undefined)
expect(firstBooking.discounts).toBe(undefined)
expect(firstBooking.rooms).toBe(undefined)
})

test('set booking', () => {
const firstBooking = new Booking()
firstBooking.names = 'Alberto'
firstBooking.emails = '123@gmail.com'
firstBooking.checkins = '4/17/2020'
firstBooking.checkouts = '4/29/2021'
firstBooking.discounts = 2.5
firstBooking.rooms = 'A1'
expect(firstBooking.names).toBe('Alberto')
expect(firstBooking.emails).toBe('123@gmail.com')
expect(firstBooking.checkins).toBe('4/17/2020')
expect(firstBooking.checkouts).toBe('4/29/2021')
expect(firstBooking.discounts).toBe(2.5)
expect(firstBooking.rooms).toBe('A1')
})

test('add Booking to Room', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , A1)
    A1.addBooking(Alb)
    expect(A1.bookings).toEqual([Alb])
})


test('remove booking', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , A1)
    A1.addBooking(Alb)
    A1.removeBooking(Alb)
    expect(A1.bookings).toEqual([])
})

test('is occupied', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2020', 2.5 , A1)
    const Car = new Booking('Carlo', '123@gmail.com', '5/17/2020', '5/29/2020', 2.5 , A1)
    A1.addBooking(Alb)
    A1.addBooking(Car)
    expect(A1.isOccupied('4/17/2020')).toBe(true)
    expect(A1.isOccupied('4/23/2020')).toBe(true)
    expect(A1.isOccupied('4/29/2020')).toBe(true)
    expect(A1.isOccupied('5/17/2020')).toBe(true)
    expect(A1.isOccupied('5/19/2020')).toBe(true)
    expect(A1.isOccupied('5/29/2020')).toBe(true)
    expect(A1.isOccupied('5/30/2020')).toBe(false)
    expect(A1.isOccupied('5/29/2021')).toBe(false)
    expect(A1.isOccupied('4/16/2020')).toBe(false)
    expect(A1.isOccupied('4/20/2019')).toBe(false)
})


test('occupancy percentage', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2020', 2.5 , A1)
    const Car = new Booking('Carlo', '123@gmail.com', '5/17/2020', '5/29/2020', 2.5 , A1)
    A1.addBooking(Alb)
    A1.addBooking(Car)
    expect(A1.occupancyPercentage('4/16/2020', '4/18/2020')).toBe('66%')
    expect(A1.occupancyPercentage('4/17/2020', '4/29/2020')).toBe('100%')
    expect(A1.occupancyPercentage('4/17/2019', '4/29/2019')).toBe('0%')
    expect(A1.occupancyPercentage('4/17/2021', '4/29/2021')).toBe('0%')
    expect(A1.occupancyPercentage()).toBe('error in date')
})

test ('available rooms', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const A2 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2020', 2.5 , A1)
    const Car = new Booking('Carlo', '123@gmail.com', '5/17/2020', '5/29/2020', 2.5 , A1)
    A1.addBooking(Alb)
    A1.addBooking(Car)
    expect(Room.availableRooms([A1, A2], '4/17/2020', '4/17/2030')).toEqual([A2])
    expect(Room.availableRooms([A1, A2], '4/17/2000', '4/17/2030')).toEqual([A2])
    expect(Room.availableRooms([A1, A2], '4/17/2000', '4/16/2020')).toEqual([A1, A2])
    expect(Room.availableRooms([A1, A2], '4/17/2021', '4/16/2028')).toEqual([A1, A2])
    expect(Room.availableRooms([A1, A2], '5/17/2020', '6/16/2020')).toEqual([A2])
})