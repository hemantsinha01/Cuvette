import React, { useState } from 'react';
import '../styles/CalendarView.css';

const CalendarView = () => {
  const [currentView, setCurrentView] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 9;
    return {
      time: `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`,
      hour24: hour
    };
  });

  const days = [
    { day: 'SUN', date: '23' },
    { day: 'MON', date: '24' },
    { day: 'TUE', date: '25' },
    { day: 'WED', date: '26' },
    { day: 'THU', date: '27' },
    { day: 'FRI', date: '28' },
    { day: 'SAT', date: '1' }
  ];

  const events = [
    {
      day: 'TUE',
      startTime: '10:00',
      title: 'Meeting-2',
      duration: 60,
      type: 'gray'
    },
    {
      day: 'FRI',
      startTime: '9:00',
      title: 'Meeting',
      duration: 180,
      type: 'blue'
    },
    {
      day: 'FRI',
      startTime: '14:00',
      title: 'Meeting-2',
      duration: 120,
      type: 'purple'
    }
  ];

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const getEventStyle = (event) => {
    const [hours, minutes] = event.startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const startFromTop = ((startMinutes - 9 * 60) / (16 * 60)) * 100;
    const heightPercentage = (event.duration / (16 * 60)) * 100;
    
    const colors = {
      gray: { bg: '#F3F4F6', text: '#111827', border: '#9CA3AF' },
      blue: { bg: '#EFF6FF', text: '#2563EB', border: '#60A5FA' },
      purple: { bg: '#F5F3FF', text: '#6D28D9', border: '#A78BFA' }
    };

    return {
      top: `${startFromTop}%`,
      height: `${heightPercentage}%`,
      backgroundColor: colors[event.type].bg,
      color: colors[event.type].text,
      borderLeft: `2px solid ${colors[event.type].border}`
    };
  };

  const renderCalendarContent = () => {
    switch (currentView) {
      case 'day':
        return (
          <div className="day-view">
            <div className="time-grid">
              <div className="time-labels">
                {timeSlots.map((slot) => (
                  <div key={slot.time} className="time-label">
                    {slot.time}
                  </div>
                ))}
              </div>
              <div className="grid-content">
                <div className="day-column">
                  {events
                    .filter(event => event.day === days[0].day)
                    .map((event, index) => (
                      <div
                        key={index}
                        className="event-item"
                        style={getEventStyle(event)}
                      >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">{event.startTime}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'week':
        return (
          <div className="week-view">
            <div className="days-header">
              {days.map((day) => (
                <div key={day.day} className="day-column">
                  <div className="day-label">{day.day}</div>
                  <div className="date-label">{day.date}</div>
                </div>
              ))}
            </div>
            <div className="time-grid">
              <div className="time-labels">
                {timeSlots.map((slot) => (
                  <div key={slot.time} className="time-label">
                    {slot.time}
                  </div>
                ))}
              </div>
              <div className="grid-content">
                {days.map((day) => (
                  <div key={day.day} className="day-column">
                    {events
                      .filter(event => event.day === day.day)
                      .map((event, index) => (
                        <div
                          key={index}
                          className="event-item"
                          style={getEventStyle(event)}
                        >
                          <div className="event-title">{event.title}</div>
                          <div className="event-time">{event.startTime}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'month':
        return (
          <div className="month-view">
            <div className="month-grid">
              {Array.from({ length: 35 }, (_, i) => {
                const date = i - 5; // Start from previous month's last days
                return (
                  <div key={i} className={`month-day ${date < 1 || date > 31 ? 'other-month' : ''}`}>
                    <div className="date-number">{((date + 31) % 31) + 1}</div>
                    <div className="day-events">
                      {events.map((event, index) => (
                        <div key={index} className="month-event" style={{ backgroundColor: event.type === 'blue' ? '#EFF6FF' : '#F3F4F6' }}>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'year':
        return (
          <div className="year-view">
            <div className="months-grid">
              {Array.from({ length: 12 }, (_, i) => {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                  'July', 'August', 'September', 'October', 'November', 'December'];
                return (
                  <div key={i} className="month-card">
                    <div className="month-name">{monthNames[i]}</div>
                    <div className="mini-month-grid">
                      {Array.from({ length: 31 }, (_, j) => (
                        <div key={j} className="mini-day">{j + 1}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button className="nav-btn">←</button>
          <button className="today-btn">Today</button>
          <button className="nav-btn">→</button>
        </div>

        <div className="view-options">
          <button 
            className={currentView === 'day' ? 'active' : ''} 
            onClick={() => handleViewChange('day')}
          >
            Day
          </button>
          <button 
            className={currentView === 'week' ? 'active' : ''} 
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
          <button 
            className={currentView === 'month' ? 'active' : ''} 
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>
          <button 
            className={currentView === 'year' ? 'active' : ''} 
            onClick={() => handleViewChange('year')}
          >
            Year
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="calendar-grid">
        <div className="timezone-indicator">
          EST GMT-5
        </div>
        {renderCalendarContent()}
      </div>
    </div>
  );
};

export default CalendarView; 