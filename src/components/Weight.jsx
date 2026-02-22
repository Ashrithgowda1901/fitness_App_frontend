const Weight = ({ weightData }) => {
      return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <h1 className="text-white text-lg font-semibold mt-1">Weight</h1>
  
        <p className="text-white text-xl font-semibold mt-1">
          {weightData === null ? "Not added" : `${weightData.weight} kg`}
        </p>
      </div>
    );
  };
  
  export default Weight;
  