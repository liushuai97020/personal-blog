import { useState, useEffect } from 'react';
import styles from './CalendarWidget.module.scss';
// import { motion } from 'framer-motion'; // Unused for now

const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const [viewDate, setViewDate] = useState(new Date());

    const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

    const changeMonth = (offset: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const isToday = (d: number) => {
        const today = new Date();
        return d === today.getDate() && 
               viewDate.getMonth() === today.getMonth() && 
               viewDate.getFullYear() === today.getFullYear();
    };

    const renderDays = () => {
        const totalDays = daysInMonth(viewDate);
        const startDay = firstDayOfMonth(viewDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className={styles.dayEmpty} />);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <div 
                    key={i} 
                    className={`${styles.day} ${isToday(i) ? styles.today : ''}`}
                    onClick={() => console.log(`Clicked ${i}`)}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.header}>
                <button onClick={() => changeMonth(-1)} className={styles.navBtn}>&lt;</button>
                <span className={styles.currentMonth}>
                    {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                </span>
                <button onClick={() => changeMonth(1)} className={styles.navBtn}>&gt;</button>
            </div>
            <div className={styles.weekDays}>
                <span>Sn</span><span>Mn</span><span>Tu</span><span>Wd</span><span>Th</span><span>Fr</span><span>St</span>
            </div>
            <div className={styles.daysGrid}>
                {renderDays()}
            </div>
            <div className={styles.timeDisplay}>
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default CalendarWidget;
