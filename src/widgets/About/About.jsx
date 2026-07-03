import { Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getAssetHref } from '@/shared/lib/routing';
import { Button } from '@/shared/ui/Button';

import './About.scss';

const stats = [
  { value: '12+', label: 'лет на рынке' },
  { value: '250+', label: 'построенных домов' },
  { value: '98%', label: 'довольных клиентов' },
];

export const About = () => {
  const [videoButtonTransform, setVideoButtonTransform] = useState('translateX(-50%) translateY(0rem)');
  const videoReference = useRef(null);
  const videoButtonReference = useRef(null);

  const resetVideoButtonPosition = useCallback(() => {
    setVideoButtonTransform('translateX(-50%) translateY(0rem)');
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType === 'touch' || !videoButtonReference.current) {
      return;
    }

    const videoElementRectangle = event.currentTarget.getBoundingClientRect();
    const videoButtonRectangle = videoButtonReference.current.getBoundingClientRect();
    const buttonStyles = getComputedStyle(videoButtonReference.current);
    const bottomOffset = parseFloat(buttonStyles.bottom) || 0;
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const staticButtonCenter = {
      x: videoElementRectangle.width / 2,
      y: videoElementRectangle.height - bottomOffset - videoButtonRectangle.height / 2,
    };
    const pointerOffsetInlineRem = (event.clientX - videoElementRectangle.left - staticButtonCenter.x) / rootFontSize;
    const pointerOffsetBlockRem = (event.clientY - videoElementRectangle.top - staticButtonCenter.y) / rootFontSize;

    setVideoButtonTransform(
      `translateX(calc(-50% + ${pointerOffsetInlineRem}rem)) translateY(${pointerOffsetBlockRem}rem)`,
    );
  }, []);

  const handlePointerLeave = resetVideoButtonPosition;

  useEffect(() => {
    const handleWindowPointerMove = (event) => {
      if (!videoReference.current) {
        return;
      }

      const videoElementRectangle = videoReference.current.getBoundingClientRect();
      const isOutside =
        event.clientX < videoElementRectangle.left ||
        event.clientX > videoElementRectangle.right ||
        event.clientY < videoElementRectangle.top ||
        event.clientY > videoElementRectangle.bottom;

      if (isOutside) {
        resetVideoButtonPosition();
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('mousemove', handleWindowPointerMove);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('mousemove', handleWindowPointerMove);
    };
  }, [resetVideoButtonPosition]);

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__inner container">
        <div className="about__content">
          <p className="title title--small">О компании</p>
          <h2 className="about__title title title--medium" id="about-title">
            Надежный партнер в строительстве
          </h2>
          <p className="about__description">
            Мы — команда профессионалов с многолетним опытом в строительстве частных домов
            и коттеджей. Реализуем проекты любой сложности — от идеи до готового дома.
          </p>
          <ul className="about__stats">
            {stats.map((item) => (
              <li className="about__stat" key={item.label}>
                <strong className="about__stat-value">{item.value}</strong>
                <span className="about__stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
          <Button className="about__link" href="#feedback" variant="dark">
            Подробнее о компании
          </Button>
        </div>

        <div
          className="about__video"
          ref={videoReference}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onMouseLeave={handlePointerLeave}
        >
          <img
            className="about__image"
            src={getAssetHref('/images/about/about-preview.webp')}
            decoding="async"
            loading="lazy"
            width="900"
            height="331"
            alt="Современный дом с гаражом и панорамными окнами"
          />
          <button
            ref={videoButtonReference}
            className="about__video-button"
            type="button"
            style={{ transform: videoButtonTransform }}
          >
            <span className="about__video-icon">
              <Play size={22} fill="currentColor" aria-hidden="true" />
            </span>
            <span>Смотреть видео о компании</span>
          </button>
        </div>
      </div>
    </section>
  );
};
