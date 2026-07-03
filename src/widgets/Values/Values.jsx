import { BadgeCheck, Handshake, Scale, Sparkles } from 'lucide-react';

import './Values.scss';

const values = [
  {
    title: 'Качество',
    text: 'Используем только проверенные материалы и соблюдаем технологии строительства.',
    Icon: BadgeCheck,
  },
  {
    title: 'Ответственность',
    text: 'Берем на себя обязательства и всегда выполняем их в срок.',
    Icon: Handshake,
  },
  {
    title: 'Честность',
    text: 'Прозрачные договоры, фиксированные сметы без скрытых платежей.',
    Icon: Scale,
  },
  {
    title: 'Клиентоориентированность',
    text: 'Учитываем пожелания заказчика и сопровождаем на каждом этапе.',
    Icon: Sparkles,
  },
];

export const Values = () => {
  return (
    <section className="values" id="values" aria-labelledby="values-title">
      <div className="values__inner container">
        <div className="values__heading">
          <p className="title title--small">Наши ценности</p>
          <h2 className="values__title title title--medium" id="values-title">
            Что для нас важно
          </h2>
        </div>

        <ul className="values__list">
          {values.map(({ title, text, Icon }) => (
            <li className="values__item" key={title}>
              <Icon className="values__icon" size={34} strokeWidth={1.55} aria-hidden="true" />
              <h3 className="values__item-title">{title}</h3>
              <p className="values__text">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
