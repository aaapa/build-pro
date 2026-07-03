import { SvgIcon } from '@/shared/ui/SvgIcon';

import { getAssetHref } from '@/shared/lib/routing';

import './Stages.scss';

const stageItems = [
  {
    number: '01',
    title: 'Заявка и консультация',
    text: 'Вы оставляете заявку на сайте или звоните нам. Мы консультируем вас и обсуждаем ваши пожелания.',
    image: '/images/stages/stages-step-1.webp',
    alt: 'Обсуждение проекта дома за столом с чертежами',
    Icon: 'message-circle',
  },
  {
    number: '02',
    title: 'Проектирование',
    text: 'Разрабатываем индивидуальный проект дома, учитывая все ваши требования и особенности участка.',
    image: '/images/stages/stages-step-2.webp',
    alt: 'Архитектурные чертежи с ручкой и рулонами планов',
    Icon: 'clipboard-check',
  },
  {
    number: '03',
    title: 'Договор и смета',
    text: 'Составляем смету и заключаем договор с фиксированными сроками и стоимостью. Никаких скрытых платежей.',
    image: '/images/stages/stages-step-3.webp',
    alt: 'Подписание договора на строительство дома',
    Icon: 'file-signature',
  },
  {
    number: '04',
    title: 'Строительство',
    text: 'Выполняем все строительные работы строго по проекту и в соответствии с нормами и стандартами.',
    image: '/images/stages/stages-step-4.webp',
    alt: 'Современный дом в процессе строительства со строительными лесами',
    Icon: 'hammer',
  },
  {
    number: '05',
    title: 'Сдача объекта',
    text: 'Проводим финальную проверку и сдаем вам готовый дом. Вы получаете гарантию на все выполненные работы.',
    image: '/images/stages/stages-step-5.webp',
    alt: 'Готовый современный дом с ландшафтным участком вечером',
    Icon: 'home',
  },
];

const stageBenefits = [
  {
    title: 'Гарантия качества',
    text: 'Гарантия на все виды работ до 10 лет',
    Icon: 'shield-check',
  },
  {
    title: 'Соблюдение сроков',
    text: 'Строгое соблюдение сроков, указанных в договоре',
    Icon: 'calendar-check',
  },
  {
    title: 'Фиксированная стоимость',
    text: 'Стоимость не меняется в процессе строительства',
    Icon: 'coins',
  },
  {
    title: 'Личный менеджер',
    text: 'Сопровождение на всех этапах строительства',
    Icon: 'user-check',
  },
];

export const Stages = () => {
  return (
    <section className="stages" id="stages-process" aria-labelledby="stages-process-title">
      <div className="stages__inner container">
        <div className="stages__heading">
          <h2 className="stages__title title title--medium" id="stages-process-title">
            Как мы работаем
          </h2>
          <p className="stages__lead">
            Мы ценим ваше время и комфорт, поэтому выстроили процесс строительства так, чтобы каждый этап был понятен и предсказуем.
          </p>
        </div>

        <ol className="stages__list">
          {stageItems.map(({ alt, Icon, image, number, text, title }) => (
            <li className="stages__item" key={number}>
              <span className="stages__number">{number}</span>
              <span className="stages__icon-wrapper">
                <SvgIcon name={Icon} className="stages__icon" size={34} strokeWidth={1.55} />
              </span>
              <div className="stages__content">
                <h3 className="stages__item-title">{title}</h3>
                <p className="stages__text">{text}</p>
              </div>
              <img
                className="stages__image"
                src={getAssetHref(image)}
                width="420"
                height="150"
                decoding="async"
                loading="lazy"
                alt={alt}
              />
            </li>
          ))}
        </ol>

        <section className="stages__result" aria-labelledby="stages-result-title">
          <h3 className="stages__result-title title title--medium" id="stages-result-title">
            Что вы получаете
          </h3>
          <ul className="stages__benefits">
            {stageBenefits.map(({ Icon, text, title }) => (
              <li className="stages__benefit" key={title}>
                <SvgIcon name={Icon} className="stages__benefit-icon" size={32} strokeWidth={1.55} />
                <h4 className="stages__benefit-title">{title}</h4>
                <p className="stages__benefit-text">{text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
