import { useEffect, useState } from "react";

const financialTips = [
  {
    tip: "Spend less than you earn",
    quote:
      "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
  },
  {
    tip: "Invest early and consistently",
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Warren Buffett",
  },
  {
    tip: "Avoid unnecessary debt",
    quote: "Debt is one person's way of using another person's future labor.",
    author: "Doug Casey",
  },
  {
    tip: "Build an emergency fund",
    quote:
      "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.",
    author: "Dave Ramsey",
  },
  {
    tip: "Track your spending and budget",
    quote:
      "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey",
  },
  {
    tip: "Diversify your investments",
    quote: "Don't look for the needle in the haystack. Just buy the haystack.",
    author: "John C. Bogle",
  },
  {
    tip: "Invest in yourself",
    quote: "The best investment you can make is in yourself.",
    author: "Warren Buffett",
  },
  {
    tip: "Think long term",
    quote:
      "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
  },
  {
    tip: "Make your money work for you",
    quote: "Don't work for money; make it work for you.",
    author: "Robert Kiyosaki",
  },
  {
    tip: "Live below your means",
    quote:
      "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus",
  },
];

export const FinancialTips = () => {
  const [showQuote, setShowQuote] = useState(financialTips[0]);
  const { tip, quote, author } = showQuote;

  useEffect(() => {
    setInterval(() => {
      setShowQuote(
        financialTips[Math.floor(Math.random() * financialTips.length)],
      );
    }, 3000);
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100%" }}
    >
      <h3>{tip}</h3>
      <div className="fw-bolder">"{quote}"</div>
      <p> - {author}</p>
    </div>
  );
};
