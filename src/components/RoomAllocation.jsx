import React, { useState, useEffect } from 'react';
import getDefaultRoomAllocation from '@/lib/getDefaultRoomAllocation';
import CustomInputNumber from '@/components/CustomInputNumber';

function RoomAllocation({ guest, rooms, onChange }) {
  const [adults, setAdults] = useState(guest.adult);
  const [children, setChildren] = useState(guest.child);
  const [allocation, setAllocation] = useState([]);
  const [remainingAdults, setRemainingAdults] = useState(guest.adult);
  const [remainingChildren, setRemainingChildren] = useState(guest.child);

  useEffect(() => {
    const { allocation, remainingAdults, remainingChildren } =
      getDefaultRoomAllocation(guest, rooms);

    setAllocation(allocation);
    setRemainingAdults(remainingAdults);
    setRemainingChildren(remainingChildren);
    onChange(allocation);
  }, [adults, children, rooms, onChange]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const intValue = Number(value);
    const [type, index] = name.split('-');
    const updatedAllocation = [...allocation];

    console.log(`OnChange event - name: ${name}, value: ${value}`);

    if (type === 'adults') {
      const newTotal = intValue + updatedAllocation[index].child;
      if (
        newTotal <= updatedAllocation[index].capacity &&
        intValue >= (updatedAllocation[index].child > 0 ? 1 : 0)
      ) {
        updatedAllocation[index].adult = intValue;
        setAdults(adults - allocation[index].adult + intValue);
      }
    } else if (type === 'children') {
      const newTotal = intValue + updatedAllocation[index].adult;
      if (newTotal <= updatedAllocation[index].capacity) {
        updatedAllocation[index].child = intValue;
        setChildren(children - allocation[index].child + intValue);
      }
    }

    setAllocation(updatedAllocation);
    updateRemainingCounts(updatedAllocation);
  };

  const updateRemainingCounts = (updatedAllocation) => {
    let remainingAdults = guest.adult;
    let remainingChildren = guest.child;

    updatedAllocation.forEach((room) => {
      remainingAdults -= room.adult;
      remainingChildren -= room.child;
    });

    setRemainingAdults(remainingAdults);
    setRemainingChildren(remainingChildren);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    console.log(`Blur event - name: ${name}, value: ${value}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-2/3">
      <div>
        <div className="bg-message-blue rounded-lg p-4 border border-gray-300">
          尚未分配人數：{remainingAdults} 位大人，{remainingChildren} 位小孩 /{' '}
          {allocation.length} 房
        </div>
      </div>
      <div>
        <ul>
          {allocation.map((room, index) => (
            <li key={index} className="room">
              <h3 className="mb-2 mt-4 font-bold">房間 {index + 1}</h3>
              <div className="flex justify-between items-start mb-4 flex-wrap">
                <div className="flex-1 mb-2">
                  <div>大人</div>
                  <div className="text-sm text-gray-500">年齡 20+</div>
                </div>
                <CustomInputNumber
                  min={room.child > 0 ? 1 : 0}
                  max={Math.min(
                    room.capacity - room.child,
                    remainingAdults + room.adult,
                  )}
                  step={1}
                  name={`adults-${index}`}
                  value={room.adult}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={false}
                  hasChildren={room.child > 0}
                  remainingAdults={remainingAdults}
                  remainingChildren={remainingChildren}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <div className="mb-2">
                  <div>小孩</div>
                </div>
                <CustomInputNumber
                  min={0}
                  max={Math.min(
                    room.capacity - room.adult,
                    remainingChildren + room.child,
                  )}
                  step={1}
                  name={`children-${index}`}
                  value={room.child}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={false}
                  hasAdults={room.adult > 0}
                  remainingAdults={remainingAdults}
                  remainingChildren={remainingChildren}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="mt-4">
        <h2 className="font-bold text-2xl mb-4">Result</h2>
        <ul>
          {allocation.map((room, index) => (
            <li key={index} className="flex items-center">
              <h3 className="m-0 font-bold">房間 {index + 1}</h3>
              <div className="ml-4">價格: {room.price}</div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default RoomAllocation;
