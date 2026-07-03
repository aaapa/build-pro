import { useEffect, useRef, useState } from 'react';

import { SvgIcon } from '@/shared/ui/SvgIcon';
import IMask from 'imask';

import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FloatingField } from '@/shared/ui/FloatingField';
import { getAssetHref } from '@/shared/lib/routing';

import './Contacts.scss';

const yandexMapsScriptIdentifier = 'yandex-maps-script';
const yandexMapsScriptAddress = 'https://api-maps.yandex.ru/2.1/?apikey=093aa711-af23-4025-845b-4d5273cbf527&lang=ru_RU';
const yandexMapsOfficeHref = 'https://yandex.ru/maps/-/CTefNT9K';
const officeAddress = 'Москва, улица Строителей, 15, офис 305';
const fallbackOfficeCoordinates = [55.6858, 37.5345];

const contactCards = [
  {
    title: 'Телефон',
    value: '+7 (495) 123-45-67',
    text: 'Пн–Вс: 9:00 – 20:00',
    href: 'tel:+74951234567',
    Icon: 'phone',
  },
  {
    title: 'E-mail',
    value: 'info@buildpro.ru',
    text: 'Ответим в течение 15 минут',
    href: 'mailto:info@buildpro.ru',
    Icon: 'mail',
  },
  {
    title: 'Адрес офиса',
    value: 'г. Москва, ул. Строителей, 15, офис 305',
    text: 'Пн–Пт: 9:00 – 18:00',
    href: yandexMapsOfficeHref,
    Icon: 'map-pin',
  },
  {
    title: 'Онлайн-заявка',
    value: 'Оставьте заявку на сайте в любое время',
    text: 'Мы свяжемся с вами',
    Icon: 'calendar-days',
  },
];

const officeBenefits = [
  {
    title: 'Удобное расположение',
    text: '5 минут от метро Университет и удобный подъезд на автомобиле',
    Icon: 'car',
  },
  {
    title: 'Парковка',
    text: 'Бесплатная парковка для наших клиентов',
    Icon: 'parking-circle',
  },
  {
    title: 'Комфортная зона',
    text: 'Уютная переговорная и вкусный кофе',
    Icon: 'coffee',
  },
  {
    title: 'Индивидуальный подход',
    text: 'Персональный менеджер для вашего проекта',
    Icon: 'users-round',
  },
];

const loadYandexMapsScript = () => {
  if (window.ymaps) {
    return Promise.resolve(window.ymaps);
  }

  const existingScriptElement = document.getElementById(yandexMapsScriptIdentifier);
  if (existingScriptElement) {
    return new Promise((resolveScriptLoading, rejectScriptLoading) => {
      if (existingScriptElement.dataset.status === 'loaded') {
        resolveScriptLoading(window.ymaps);
        return;
      }

      existingScriptElement.addEventListener('load', () => resolveScriptLoading(window.ymaps), { once: true });
      existingScriptElement.addEventListener('error', rejectScriptLoading, { once: true });
    });
  }

  return new Promise((resolveScriptLoading, rejectScriptLoading) => {
    const scriptElement = document.createElement('script');
    scriptElement.id = yandexMapsScriptIdentifier;
    scriptElement.src = yandexMapsScriptAddress;
    scriptElement.async = true;

    scriptElement.addEventListener('load', () => {
      scriptElement.dataset.status = 'loaded';
      resolveScriptLoading(window.ymaps);
    }, { once: true });

    scriptElement.addEventListener('error', (event) => {
      scriptElement.dataset.status = 'error';
      rejectScriptLoading(event);
    }, { once: true });

    document.head.append(scriptElement);
  });
};

const waitForYandexMapsReady = (yandexMaps) => {
  return new Promise((resolveYandexMapsReady) => {
    yandexMaps.ready(resolveYandexMapsReady);
  });
};

const ContactsMap = () => {
  const mapElementReference = useRef(null);
  const [isMapUnavailable, setIsMapUnavailable] = useState(false);

  useEffect(() => {
    let isContactsMapMounted = true;
    let mapInstance = null;

    const initializeContactsMap = async () => {
      try {
        const yandexMaps = await loadYandexMapsScript();
        await waitForYandexMapsReady(yandexMaps);

        if (!isContactsMapMounted || !mapElementReference.current) {
          return;
        }

        let officeCoordinates = fallbackOfficeCoordinates;

        try {
          const geocodeResult = await yandexMaps.geocode(officeAddress);
          const firstGeoObject = geocodeResult.geoObjects.get(0);
          const foundCoordinates = firstGeoObject?.geometry?.getCoordinates();

          if (Array.isArray(foundCoordinates) && foundCoordinates.length === 2) {
            officeCoordinates = foundCoordinates;
          }
        } catch {
          officeCoordinates = fallbackOfficeCoordinates;
        }

        mapInstance = new yandexMaps.Map(mapElementReference.current, {
          center: officeCoordinates,
          zoom: 16,
          controls: [],
        }, {
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        });

        const officePlacemarkSpriteHref = getAssetHref('/icons/sprite.svg#map-marker');
        const officePlacemarkLayout = yandexMaps.templateLayoutFactory.createClass(`
          <svg class="contacts__map-placemark" width="52" height="64" viewBox="0 0 52 64" aria-hidden="true" focusable="false">
            <use href="${officePlacemarkSpriteHref}"></use>
          </svg>
        `);

        const officePlacemark = new yandexMaps.Placemark(officeCoordinates, {
          hintContent: 'BuildPro',
          balloonContentHeader: 'BuildPro',
          balloonContentBody: officeAddress,
        }, {
          iconLayout: officePlacemarkLayout,
          iconOffset: [-26, -61],
          iconShape: {
            type: 'Rectangle',
            coordinates: [[-26, -61], [26, 3]],
          },
        });

        mapInstance.geoObjects.add(officePlacemark);
      } catch {
        if (isContactsMapMounted) {
          setIsMapUnavailable(true);
        }
      }
    };

    initializeContactsMap();

    return () => {
      isContactsMapMounted = false;
      mapInstance?.destroy();
    };
  }, []);

  return (
    <div className="contacts__map-wrapper">
      <h3 className="visually-hidden" id="contacts-map-title">
        Карта расположения офиса BuildPro
      </h3>
      <p className="visually-hidden" id="contacts-map-description">
        Офис находится по адресу: Москва, улица Строителей, 15, офис 305.
      </p>
      <div
        className="contacts__map"
        ref={mapElementReference}
        role="region"
        aria-labelledby="contacts-map-title"
        aria-describedby="contacts-map-description"
      />
      {isMapUnavailable && (
        <p className="contacts__map-status">
          Карта временно недоступна. Адрес офиса: {officeAddress}.
        </p>
      )}
    </div>
  );
};

export const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const phoneInputReference = useRef(null);

  useEffect(() => {
    const phoneInputElement = phoneInputReference.current;
    if (!phoneInputElement) return;

    const phoneMask = IMask(phoneInputElement, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
      placeholderChar: '_',
    });

    return () => phoneMask.destroy();
  }, []);

  const handleNameInput = (event) => {
    const filteredName = event.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
    setName(filteredName);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  };

  return (
    <section className="contacts" id="contacts-content" aria-labelledby="contacts-content-title">
      <div className="contacts__inner container">
        <h2 className="visually-hidden" id="contacts-content-title">
          Контактная информация BuildPro
        </h2>

        <ul className="contacts__cards">
          {contactCards.map(({ href, Icon, text, title, value }) => (
            <li className="contacts__card" key={title}>
              <span className="contacts__icon-wrapper">
                <SvgIcon name={Icon} className="contacts__icon" size={25} strokeWidth={1.6} />
              </span>
              <div className="contacts__card-content">
                <h3 className="contacts__card-title">{title}</h3>
                {href ? (
                  <a className="contacts__card-value" href={href}>
                    {value}
                  </a>
                ) : (
                  <p className="contacts__card-value">{value}</p>
                )}
                <p className="contacts__card-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="contacts__body">
          <ContactsMap />

          <section className="contacts__form-card" aria-labelledby="contacts-form-title">
            <h2 className="contacts__form-title title title--medium" id="contacts-form-title">
              Напишите нам
            </h2>
            <p className="contacts__form-text">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>

            <form className="contacts__form" onSubmit={(event) => event.preventDefault()}>
              <FloatingField
                className="contacts__field contacts__field--wide"
                controlClassName="contacts__input"
                id="contacts-name"
                name="contacts_name_input"
                label="Ваше имя"
                description="Введите ваше имя"
                type="text"
                autoComplete="name"
                value={name}
                onInput={handleNameInput}
                required
              />
              <FloatingField
                ref={phoneInputReference}
                className="contacts__field"
                controlClassName="contacts__input"
                id="contacts-phone"
                name="contacts_phone_input"
                label="Телефон"
                description="Введите номер телефона"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
              />
              <FloatingField
                className="contacts__field"
                controlClassName="contacts__input"
                id="contacts-email"
                name="contacts_email_input"
                label="E-mail"
                description="Введите адрес электронной почты"
                type="email"
                autoComplete="email"
                value={email}
                onInput={handleEmailInput}
                required
              />
              <FloatingField
                className="contacts__field contacts__field--wide"
                controlClassName="contacts__input"
                id="contacts-message"
                name="contacts_message_input"
                label="Сообщение"
                description="Введите сообщение"
                isTextarea
                value={message}
                onInput={handleMessageInput}
                required
              />

              <Checkbox
                className="contacts__checkbox"
                name="contacts_privacy_input"
                aria-required="true"
                required
              >
                Я согласен на <a href="#privacy">обработку персональных данных</a>
              </Checkbox>

              <Button className="contacts__submit" type="submit" variant="main">
                Отправить сообщение
                <SvgIcon name="send" size={16} />
              </Button>
            </form>
          </section>
        </div>

        <section className="contacts__visit" aria-labelledby="contacts-visit-title">
          <h2 className="contacts__visit-title title title--medium" id="contacts-visit-title">
            Приезжайте к нам в офис
          </h2>
          <p className="contacts__visit-text">
            Будем рады видеть вас в нашем офисе. Обсудим ваш проект и предложим лучшее решение.
          </p>
          <ul className="contacts__benefits">
            {officeBenefits.map(({ Icon, text, title }) => (
              <li className="contacts__benefit" key={title}>
                <SvgIcon name={Icon} className="contacts__benefit-icon" size={32} strokeWidth={1.55} />
                <h3 className="contacts__benefit-title">{title}</h3>
                <p className="contacts__benefit-text">{text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
