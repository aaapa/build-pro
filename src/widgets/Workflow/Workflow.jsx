import { ClipboardCheck, FileSignature, Hammer, MapPinned, PhoneCall } from 'lucide-react';

import './Workflow.scss';

const workflowSteps = [
  { title: 'Заявка', text: 'Вы оставляете заявку на сайте или по телефону', Icon: PhoneCall },
  { title: 'Консультация', text: 'Мы обсуждаем ваш проект и рассчитываем стоимость', Icon: MapPinned },
  { title: 'Договор', text: 'Заключаем договор и приступаем к работе', Icon: FileSignature },
  { title: 'Строительство', text: 'Выполняем работы строго по плану и срокам', Icon: Hammer },
  { title: 'Сдача объекта', text: 'Сдаем готовый дом и сопровождаем проект', Icon: ClipboardCheck },
];

export const Workflow = () => {
  return (
    <section className="workflow" id="workflow" aria-labelledby="workflow-title">
      <div className="workflow__inner container">
        <p className="title title--small">Этапы работы</p>
        <h2 className="workflow__title title title--medium" id="workflow-title">
          Как мы работаем
        </h2>
        <ol className="workflow__list">
          {workflowSteps.map(({ title, text, Icon }, index) => (
            <li className="workflow__item" key={index}>
              <span className="workflow__icon-wrapper">
                <Icon className="workflow__icon" size={30} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="workflow__item-title">{title}</h3>
              <p className="workflow__text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
