import React from "react";
import styled from "styled-components";
import { faqsOptions } from "../../helpers";
import { v4 } from "uuid";

const FAQQuestion: React.FC<{ question: string; index: number }> = ({
  question,
  index,
}) => {
  return (
    <div className="flex tablet:justify-center tablet:text-center tablet:w-[80%] tablet:mx-auto gap-x-3 text-slate-700 font-mediumFont text-xl sm:text-2xl">
      <span>{index}. </span>
      <h3>{question}</h3>
    </div>
  );
};

const FAQAnswer: React.FC<{ answer: string }> = ({ answer }) => {
  return (
    <div className="text-slate-500 font-regularFont text-base tablet:text-center sm:text-2xl">
      {answer}
    </div>
  );
};

const ContactFaqs = () => {
  return (
    <StyledFAQs className="mx-auto w-full my-16">
      <div className="my-8 flex justify-center items-center">
        <h1 className="capitalize font-boldFont text-3xl sm:text-4xl">
          frequently asked questions
        </h1>
      </div>
      <div>
        {faqsOptions.map(({ question, answer }, index) => (
          <div key={v4()} className="flex flex-col gap-y-2 my-6">
            <FAQQuestion question={question} index={index + 1} />
            <FAQAnswer answer={answer} />
          </div>
        ))}
      </div>
    </StyledFAQs>
  );
};

export default ContactFaqs;

const StyledFAQs = styled.div``;
