'use client';
import React, { useState } from 'react';
import RoomAllocation from '@/components/RoomAllocation';

export default function Home() {
  const guest = { adult: 7, child: 3 };
  const rooms = [
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
  ];

  return (
    <main className="flex items-center justify-center h-full">
      <RoomAllocation
        guest={guest}
        rooms={rooms}
        onChange={(result) => console.log(result)}
      />
    </main>
  );
}
