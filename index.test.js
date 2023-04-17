const Room = require('./index')

test('test initial Room whitout value', () => {
    const fisrtRoom = new Room();
    expect(fisrtRoom.name).toBe('no name');
    expect(fisrtRoom.booking).toEqual({ startDate: '0/0/0', endDate: '0/0/0' });
    expect(fisrtRoom.rate).toBe(0);
    expect(fisrtRoom.discount).toBe(0);
});


test('test initial Room whit value', () => {
    const fisrtRoom = new Room('A1', [1 - 2 - 3], 10.63, 10);
    expect(fisrtRoom.name).toBe('A1');
    expect(fisrtRoom.booking).toEqual([1 - 2 - 3]);
    expect(fisrtRoom.rate).toBe(10.63);
    expect(fisrtRoom.discount).toBe(10);
});




test('test set Room props', () => {
    const fisrtRoom = new Room('A1', { startDate: '0/0/0', endDate: '0/0/0' }, 10.63, 10);
    fisrtRoom.name = 'A2';
    fisrtRoom.endDate = '1';
    fisrtRoom.startDate = '1';
    fisrtRoom.rate = 5.30;
    fisrtRoom.discount = 5;
    expect(fisrtRoom.name).toBe('A2');
    expect(fisrtRoom.booking).toEqual({ endDate: '1', startDate: '1' });
    expect(fisrtRoom.rate).toBe(5.30);
    expect(fisrtRoom.discount).toBe(5);
});

test('test available Room', () => {
    const fisrtRoom = new Room('A1', { startDate: '4/17/2023', endDate: '4/20/2023' }, 10.63, 10);
    expect(fisrtRoom.isOccupied('4/19/2023')).toBeTruthy()
    expect(fisrtRoom.isOccupied('4/17/2023')).toBeTruthy()
    expect(fisrtRoom.isOccupied('4/20/2023')).toBeTruthy()
    expect(fisrtRoom.isOccupied('4/24/2023')).toBeFalsy()
    expect(fisrtRoom.isOccupied('5/20/2023')).toBeFalsy()
    expect(fisrtRoom.isOccupied('4/19/2020')).toBeFalsy()
});

