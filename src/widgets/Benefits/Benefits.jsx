import { CalendarCheck, KeyRound, PackageCheck, ShieldCheck } from 'lucide-react';

import './Benefits.scss';

const benefits = [
  { title: 'Гарантия 10 лет', text: 'Уверенность в качестве на долгие годы', Icon: ShieldCheck },
  { title: 'Соблюдаем сроки', text: 'Строим точно в срок по договору', Icon: CalendarCheck },
  { title: 'Качественные материалы', text: 'Работаем только с проверенными поставщиками', Icon: PackageCheck },
  { title: 'Строим под ключ', text: 'От проекта до сдачи готового дома', Icon: KeyRound },
];

export const Benefits = () => {
  return (
    <section className="benefits" id="benefits" aria-labelledby="benefits-title">
      <div className="benefits__inner container">
        <h2 className="benefits__section-title visually-hidden" id="benefits-title">
          Преимущества BuildPro
        </h2>
        <ul className="benefits__list">
          {benefits.map(({ title, text, Icon }) => (
            <li className="benefits__item" key={title}>
              <Icon className="benefits__icon" size={34} strokeWidth={1.7} aria-hidden="true" />
              <div className="benefits__content">
                <h3 className="benefits__title">{title}</h3>
                <p className="benefits__text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
