
const DashboardCard = ({ card, view, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        view === "card"
          ? "p-4"
          : view === "grid"
          ? "p-4"
          : "p-3 flex items-center justify-between"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">
            {card.title}
          </p>

          <p className="text-xl font-medium text-gray-900 leading-tight break-words">
            {card.value}
          </p>
        </div>

        <div className="p-2 rounded-lg bg-indigo-50 flex items-center justify-center min-w-[44px] h-[44px]">
          {card.icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
