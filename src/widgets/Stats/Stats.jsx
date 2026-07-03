import { Award, Home, ShieldCheck, UsersRound } from 'lucide-react';

import './Stats.scss';

const statsItems = [
  { value: '250+', text: 'построенных домов', Icon: Home },
  { value: '12+', text: 'лет на рынке', Icon: ShieldCheck },
  { value: '98%', text: 'довольных клиентов', Icon: UsersRound },
  { value: '10 лет', text: 'гарантия на работы', Icon: Award },
];

export const Stats = () => {
  return (
    <section className="stats" id="stats" aria-labelledby="stats-title">
      <div className="stats__inner container">
        <h2 className="visually-hidden" id="stats-title">
          Статистика компании
        </h2>
        <ul className="stats__list">
          {statsItems.map(({ value, text, Icon }) => (
            <li className="stats__item" key={text}>
              <span className="stats__icon-wrapper">
                <Icon className="stats__icon" size={30} strokeWidth={1.55} aria-hidden="true" />
              </span>
              <strong className="stats__value">{value}</strong>
              <span className="stats__text">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
