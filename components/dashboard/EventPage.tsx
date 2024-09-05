"use client";

import React, { useState, useEffect } from 'react';
import EventCard from '@/components/EditEvent/EditEventForm';
import { getEvents } from '@/actions/events.actions';
import { eventModel } from '@/types/event.type';

export default function EventsPage() {
  const [events, setEvents] = useState<eventModel[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    }
    fetchEvents();
  }, []);

  const handleDelete = (deletedId: string) => {
    setEvents(events.filter(event => event.id !== deletedId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}