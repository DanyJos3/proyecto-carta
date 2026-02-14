import { useState, useEffect } from 'react';
import './DaysCounter.css';

const START_DATE = '2024-02-12';

export default function DaysCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const startDate = new Date(START_DATE);

    function calculateDays() {
      const today = new Date();
      const diffTime = today.getTime() - startDate.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    // Actualizar los días al montar el componente
    setDays(calculateDays());

    const handleGiftOpened = () => {
      let current = 0;
      const target = calculateDays();
      const step = Math.max(1, Math.floor(target / 60));
      const duration = 2000;
      const stepTime = duration / (target / step);

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setDays(target);
          clearInterval(timer);
        } else {
          setDays(current);
        }
      }, stepTime);
    };

    window.addEventListener('gift-opened', handleGiftOpened);

    return () => {
      window.removeEventListener('gift-opened', handleGiftOpened);
    };
  }, []);

  return (
    <section className="days-section" id="days-counter">
      <h2 className="section-title">Días contigo</h2>
      <div className="days-display">
        <span className="days-number">{days.toLocaleString('es')}</span>
        <span className="days-label">días juntos</span>
      </div>
      <p className="days-since">Desde que empezó nuestra historia</p>
    </section>
  );
}
