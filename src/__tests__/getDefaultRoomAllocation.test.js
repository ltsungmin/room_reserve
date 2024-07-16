import getDefaultRoomAllocation from '../lib/getDefaultRoomAllocation';

describe('getDefaultRoomAllocation', () => {
  test('Test case 1: guest = { adult: 4, child: 2 }, rooms = [{ roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 }, { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 }]', () => {
    const guest = { adult: 4, child: 2 };
    const rooms = [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    ];
    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual({
      allocation: [
        { adult: 2, child: 2, price: 1600, capacity: 4 },
        { adult: 2, child: 0, price: 1000, capacity: 4 },
      ],
      remainingAdults: 0,
      remainingChildren: 0,
    });
  });

  test('Test case 2: guest = { adult: 7, child: 3 }, rooms = [{ roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 }, { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 }, { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 }, { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 }]', () => {
    const guest = { adult: 7, child: 3 };
    const rooms = [
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
    ];
    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual({
      allocation: [
        { adult: 3, child: 3, price: 2900, capacity: 4 },
        { adult: 4, child: 0, price: 2800, capacity: 4 },
        { adult: 0, child: 0, price: 0, capacity: 2 },
        { adult: 0, child: 0, price: 0, capacity: 2 },
      ],
      remainingAdults: 0,
      remainingChildren: 0,
    });
  });

  test('Test case 3: guest = { adult: 16, child: 0 }, rooms = [{ roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 }, { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 }, { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 }, { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 }]', () => {
    const guest = { adult: 16, child: 0 };
    const rooms = [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ];
    const result = getDefaultRoomAllocation(guest, rooms);
    expect(result).toEqual({
      allocation: [
        { adult: 4, child: 0, price: 2500, capacity: 4 },
        { adult: 4, child: 0, price: 2500, capacity: 4 },
        { adult: 8, child: 0, price: 4000, capacity: 8 },
        { adult: 0, child: 0, price: 0, capacity: 2 },
      ],
      remainingAdults: 0,
      remainingChildren: 0,
    });
  });
});
