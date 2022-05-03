import React, { useState } from "react";
import AccordionLayout from "./AccordionLayout";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-auto flex flex-col justify-center items-center">
      <AccordionLayout
        title="Accordion 1"
        index={1}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        Accordion 1 Content
      </AccordionLayout>

      <AccordionLayout
        title="External Links"
        index={2}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <ul>
          <li>
            <a href="https://www.healthhub.sg/">HealthHub</a>
          </li>
          <li>
            <a href="https://www.healthhub.sg/a-z/b?cat=support-groups-and-others&r=48690">
              Support Groups
            </a>
          </li>
          <li>
            <a href="https://www.healthhub.sg/live-healthy?category=Chronic-Illnesses">
              Health Articles
            </a>
          </li>
        </ul>
      </AccordionLayout>
    </div>
  );
};

export default FAQAccordion;
