function getDefaultRoomAllocation(guest, rooms) {
  const { adult: totalAdults, child: totalChildren } = guest;

  // 按照房間總價排序，總價 = 房間價格 + 成人價格 + 兒童價格
  rooms.sort((a, b) => {
    const costA = a.roomPrice + a.adultPrice + a.childPrice;
    const costB = b.roomPrice + b.adultPrice + b.childPrice;
    return costA - costB;
  });

  let remainingAdults = totalAdults;
  let remainingChildren = totalChildren;
  const result = [];

  for (const room of rooms) {
    if (remainingAdults === 0 && remainingChildren === 0) break;

    const { roomPrice, adultPrice, childPrice, capacity } = room;

    if (remainingAdults === 0) break;

    const maxChildren = Math.min(remainingChildren, capacity - 1);
    const maxAdults = Math.min(remainingAdults, capacity - maxChildren);

    const adultsToAllocate = Math.min(maxAdults, capacity - maxChildren);
    const childrenToAllocate = Math.min(
      maxChildren,
      capacity - adultsToAllocate,
    );

    if (childrenToAllocate > 0 && adultsToAllocate === 0) continue;

    const totalPrice =
      roomPrice +
      adultsToAllocate * adultPrice +
      childrenToAllocate * childPrice;

    result.push({
      adult: adultsToAllocate,
      child: childrenToAllocate,
      price: totalPrice,
      capacity: capacity,
    });

    remainingAdults -= adultsToAllocate;
    remainingChildren -= childrenToAllocate;
  }

  for (const room of rooms) {
    if (remainingAdults === 0) break;

    const { roomPrice, adultPrice, childPrice, capacity } = room;
    const adultsToAllocate = Math.min(remainingAdults, capacity);
    const totalPrice = roomPrice + adultsToAllocate * adultPrice;

    result.push({
      adult: adultsToAllocate,
      child: 0,
      price: totalPrice,
      capacity: capacity,
    });

    remainingAdults -= adultsToAllocate;
  }

  return { allocation: result, remainingAdults, remainingChildren };
}

export default getDefaultRoomAllocation;
