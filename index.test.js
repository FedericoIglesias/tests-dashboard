const {Room, Booking} = require('./index')




test('test initial Room whitout value', () => {
    const fisrtRoom = new Room();
    expect(fisrtRoom.name).toBe('no name');
    expect(fisrtRoom.booking).toEqual([]);
    expect(fisrtRoom.rate).toBe(0);
    expect(fisrtRoom.discount).toBe(0);
});

test('test initial Room whit value', () => {
    const fisrtRoom = new Room('A1', 'a', 10.63, 10);
    expect(fisrtRoom.name).toBe('A1');
    expect(fisrtRoom.booking).toEqual(['a']);
    expect(fisrtRoom.rate).toBe(10.63);
    expect(fisrtRoom.discount).toBe(10);
});

test('test set Room props', () => {
    const fisrtRoom = new Room('A1', 'a', 10.63, 10);
    fisrtRoom.name = 'A2';
    fisrtRoom.rate = 5.30;
    fisrtRoom.discount = 5;
    fisrtRoom.addBooking('b')
    expect(fisrtRoom.name).toBe('A2');
    expect(fisrtRoom.booking).toEqual(['a', 'b']);
    expect(fisrtRoom.rate).toBe(5.30);
    expect(fisrtRoom.discount).toBe(5);
});

test('initial booking', () => {
const firstBooking = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , 'A1')
expect(firstBooking.name).toBe('Alberto')
expect(firstBooking.email).toBe('123@gmail.com')
expect(firstBooking.checkin).toBe('4/17/2020')
expect(firstBooking.checkout).toBe('4/29/2021')
expect(firstBooking.discount).toBe(2.5)
expect(firstBooking.room).toBe('A1')
})

test('initial booking whitout value', () => {
const firstBooking = new Booking()
expect(firstBooking.name).toBe(undefined)
expect(firstBooking.email).toBe(undefined)
expect(firstBooking.checkin).toBe(undefined)
expect(firstBooking.checkout).toBe(undefined)
expect(firstBooking.discount).toBe(undefined)
expect(firstBooking.room).toBe(undefined)
})

test('set booking', () => {
const firstBooking = new Booking()
firstBooking.name = 'Alberto'
firstBooking.email = '123@gmail.com'
firstBooking.checkin = '4/17/2020'
firstBooking.checkout = '4/29/2021'
firstBooking.discount = 2.5
firstBooking.room = 'A1'
expect(firstBooking.name).toBe('Alberto')
expect(firstBooking.email).toBe('123@gmail.com')
expect(firstBooking.checkin).toBe('4/17/2020')
expect(firstBooking.checkout).toBe('4/29/2021')
expect(firstBooking.discount).toBe(2.5)
expect(firstBooking.room).toBe('A1')
})

test('add Booking to Room', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , A1)
    A1.addBooking(Alb)
    expect(A1.booking).toEqual([Alb])
})


test('remove booking', () => {
    const A1 = new Room('A1', [], 10.63, 10);
    const Alb = new Booking('Alberto', '123@gmail.com', '4/17/2020', '4/29/2021', 2.5 , A1)
    A1.addBooking(Alb)
    A1.removeBooking(Alb)
    expect(A1.booking).toEqual([])
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