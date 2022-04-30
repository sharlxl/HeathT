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
        title="Accordion 2"
        index={2}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        Accordion 2 Content
      </AccordionLayout>
    </div>
  );
};

export default FAQAccordion;
