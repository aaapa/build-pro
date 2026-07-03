import { SvgIcon } from '@/shared/ui/SvgIcon';

import './Advantages.scss';

const advantages = [
  {
    title: 'Опыт и компетенции',
    text: 'Более 12 лет на рынке и сотни успешных проектов',
    Icon: 'award',
  },
  {
    title: 'Фиксированная цена',
    text: 'Цена в договоре не меняется и прозрачный расчет',
    Icon: 'coins',
  },
  {
    title: 'Контроль качества',
    text: 'Технический надзор на всех этапах строительства',
    Icon: 'shield-check',
  },
  {
    title: 'Гарантия и сервис',
    text: 'Гарантии до 10 лет и постгарантийное обслуживание',
    Icon: 'badge-check',
  },
  {
    title: 'Индивидуальный подход',
    text: 'Учитываем ваши пожелания и особенности участка',
    Icon: 'user-check',
  },
];

export const Advantages = () => {
  return (
    <section className="advantages" id="advantages" aria-labelledby="advantages-title">
      <div className="advantages__inner container">
        <h2 className="advantages__title title title--medium" id="advantages-title">
          Почему выбирают нас
        </h2>
        <ul className="advantages__list">
          {advantages.map(({ title, text, Icon }) => (
            <li className="advantages__item" key={title}>
              <SvgIcon name={Icon} className="advantages__icon" size={28} strokeWidth={1.55} />
              <div className="advantages__content">
                <h3 className="advantages__item-title">{title}</h3>
                <p className="advantages__text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
