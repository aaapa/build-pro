import { SvgIcon } from '@/shared/ui/SvgIcon';

import './Process.scss';

const processSteps = [
  { title: 'Заявка', text: 'Вы оставляете заявку на сайте или по телефону', Icon: 'phone-call' },
  { title: 'Консультация', text: 'Мы обсуждаем ваш проект и рассчитываем стоимость', Icon: 'message-circle' },
  { title: 'Договор', text: 'Заключаем договор и приступаем к работе', Icon: 'file-signature' },
  { title: 'Строительство', text: 'Выполняем работы строго по плану и срокам', Icon: 'hammer' },
  { title: 'Сдача объекта', text: 'Сдаем готовый дом и сопровождаем проект', Icon: 'clipboard-check' },
];

export const Process = ({ eyebrow, isArrows = false, lead, title }) => {
  return (
    <section className={`process${isArrows ? ' process--arrows' : ''}`} id="process" aria-labelledby="process-title">
      <div className="process__inner container">
        <div className="process__heading">
          <div className="process__title-group">
            {eyebrow && <p className="title title--small">{eyebrow}</p>}
            <h2 className="process__title title title--medium" id="process-title">
              {title}
            </h2>
          </div>
          {lead && <p className="process__lead">{lead}</p>}
        </div>
        <ol className="process__list">
          {processSteps.map(({ title: stepTitle, text, Icon }) => (
            <li className="process__item" key={stepTitle}>
              <span className="process__icon-wrapper">
                <SvgIcon name={Icon} className="process__icon" size={30} strokeWidth={1.6} />
              </span>
              <h3 className="process__item-title">{stepTitle}</h3>
              <p className="process__text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
