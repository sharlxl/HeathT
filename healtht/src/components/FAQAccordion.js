import React, { useState } from "react";
import AccordionLayout from "./AccordionLayout";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-auto flex flex-col justify-center items-center">
      <AccordionLayout
        title="Random Fact 1"
        index={1}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        Your eyes blink around 20 times a minute. <br />
        <br />
        <br />
        And now i have made you conscious about your eyes blinking :D
      </AccordionLayout>
      <AccordionLayout
        title="Random Fact 2"
        index={2}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        We make about 1 to 1.6 litres of saliva a day.
      </AccordionLayout>
      <AccordionLayout
        title="Random Fact 3"
        index={3}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        There are more bacteria in your mouth than there are people in the
        world.
      </AccordionLayout>

      <AccordionLayout
        title="External Links"
        index={4}
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
