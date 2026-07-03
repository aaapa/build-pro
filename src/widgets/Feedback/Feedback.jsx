import { useEffect, useRef, useState } from 'react';

import { SvgIcon } from '@/shared/ui/SvgIcon';
import IMask from 'imask';

import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FloatingField } from '@/shared/ui/FloatingField';
import { getAssetHref } from '@/shared/lib/routing';

import './Feedback.scss';

const defaultFeedbackTitle = 'Рассчитаем стоимость вашего будущего дома';
const defaultFeedbackDescription = 'Оставьте заявку — и мы подготовим персональное предложение в течение 24 часов';
const defaultFeedbackBackgroundImage = '/images/feedback/feedback-background.webp';

export const Feedback = ({
  backgroundImage = defaultFeedbackBackgroundImage,
  description = defaultFeedbackDescription,
  hasAgreement = true,
  isAgreementChecked = true,
  title = defaultFeedbackTitle,
}) => {
  const [name, setName] = useState('');
  const phoneInputReference = useRef(null);

  useEffect(() => {
    const phoneInputElement = phoneInputReference.current;
    if (!phoneInputElement) return;

    const mask = IMask(phoneInputElement, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
      placeholderChar: '_',
    });

    return () => mask.destroy();
  }, []);

  const handleNameInput = (event) => {
    const filteredName = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
    setName(filteredName);
  };

  return (
    <section
      className="feedback"
      id="feedback"
      style={{ '--feedback-background-image': `url("${getAssetHref(backgroundImage)}")` }}
      aria-labelledby="feedback-title"
    >
      <div className="feedback__inner container">
        <div className="feedback__content">
          <h2 className="feedback__title title title--large" id="feedback-title">
            {title}
          </h2>
          <p className="feedback__description">{description}</p>
          <form className="feedback__form" onSubmit={(event) => event.preventDefault()}>
            <div className="feedback__fields">
              <FloatingField
                className="feedback__field"
                controlClassName="feedback__input"
                id="feedback-name"
                name="feedback_name_input"
                label="Ваше имя"
                description="Введите ваше имя"
                type="text"
                variant="dark"
                autoComplete="name"
                value={name}
                onInput={handleNameInput}
                required
              />

              <FloatingField
                ref={phoneInputReference}
                className="feedback__field"
                controlClassName="feedback__input"
                id="feedback-phone"
                name="feedback_phone_input"
                label="Телефон"
                description="Введите номер телефона"
                type="tel"
                variant="dark"
                inputMode="tel"
                autoComplete="tel"
                required
              />

              <Button className="feedback__submit" type="submit" variant="main">
                Отправить заявку
                <SvgIcon name="send" size={16} />
              </Button>
            </div>

            {hasAgreement && (
              <Checkbox
                className="feedback__agreement"
                name="feedback_privacy_input"
                aria-required="true"
                required
                defaultChecked={isAgreementChecked}
              >
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="#privacy">политикой конфиденциальности</a>
              </Checkbox>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
