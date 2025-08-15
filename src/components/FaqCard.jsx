// src/components/FaqCard.jsx
const FaqCard = ({ question, children }) => (
  <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-primary/10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
    <h3 className="text-xl font-semibold mb-3 text-primary">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
);

export default FaqCard;
