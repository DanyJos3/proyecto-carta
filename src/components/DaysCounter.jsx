import { useState, useEffect } from 'react';
import './DaysCounter.css';

const START_DATE = '2024-11-29';

export default function DaysCounter() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateTimeCounter = () => {
    const startDate = new Date(START_DATE);
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();

    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const totalMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    setDays(totalDays);
    setHours(totalHours);
    setMinutes(totalMinutes);
    setSeconds(totalSeconds);
  };

  useEffect(() => {
    // Actualizar al montar el componente
    updateTimeCounter();

    // Actualizar cada segundo
    const interval = setInterval(updateTimeCounter, 1000);

    const handleGiftOpened = () => {
      let currentDays = 0;
      const targetDays = Math.floor((new Date().getTime() - new Date(START_DATE).getTime()) / (1000 * 60 * 60 * 24));
      const step = Math.max(1, Math.floor(targetDays / 60));
      const duration = 2000;
      const stepTime = duration / (targetDays / step);

      const timer = setInterval(() => {
        currentDays += step;
        if (currentDays >= targetDays) {
          updateTimeCounter();
          clearInterval(timer);
        } else {
          setDays(currentDays);
        }
      }, stepTime);
    };

    window.addEventListener('gift-opened', handleGiftOpened);

    return () => {
      clearInterval(interval);
      window.removeEventListener('gift-opened', handleGiftOpened);
    };
  }, []);

  const padZero = (num) => String(num).padStart(2, '0');

  return (
    <section className="days-section" id="days-counter">
      <h2 className="section-title">Tiempo contigo</h2>
      <div className="days-display">
        <div className="time-counter">
          <div className="time-unit">
            <span className="time-number">{days.toLocaleString('es')}</span>
            <span className="time-unit-label">días</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-unit">
            <span className="time-number">{padZero(hours)}</span>
            <span className="time-unit-label">horas</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-unit">
            <span className="time-number">{padZero(minutes)}</span>
            <span className="time-unit-label">min</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-unit">
            <span className="time-number">{padZero(seconds)}</span>
            <span className="time-unit-label">seg</span>
          </div>
        </div>
        <span className="days-label">juntos</span>
      </div>
      <p className="days-since">Desde que empezó nuestra historia</p>
    </section>
  );
}
