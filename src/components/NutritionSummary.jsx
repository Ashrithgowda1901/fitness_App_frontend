const NutritionSummary = ({ entries, totalCalories, totalProtein }) => {
    return (
      <div
        className="
          bg-neutral-900
          border border-neutral-800
          rounded-xl
          p-4
        "
      >
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 text-white">
          Nutrition Summary
        </h2>
  
        {/* Totals Section */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">Calories</p>
            <p className="text-white text-xl font-bold">
              {totalCalories} kcal
            </p>
          </div>
  
          <div>
            <p className="text-gray-400 text-sm">Protein</p>
            <p className="text-white text-xl font-bold">
              {totalProtein} g
            </p>
          </div>
        </div>
  
        {/* Divider */}
        <div className="border-t border-neutral-800 my-3"></div>
  
        {/* Food Entries */}
        {entries && entries.length > 0 ? (
          <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-300">
                  {entry.foodName}
                </span>
                <span className="text-gray-500">
                  {entry.quantityGrams}g
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No food logged for this day
          </p>
        )}
      </div>
    );
  };
  
  export default NutritionSummary;
  