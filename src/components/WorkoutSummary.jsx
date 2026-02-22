const WorkoutSummary=({workoutData})=>{
    return(
        <div className=" bg-neutral-900 border border-neutral-800
            rounded-xl  p-4">
                <h2 className="text-lg font-semibold mb-4 text-white">
          Workout Summary
        </h2>
           {workoutData && workoutData.length > 0?(workoutData.map(element => (
                   <div key={element._id} >
                    <p>{element.exerciseName}</p>
                    <p>
                        {element.sets} × {element.reps}
                        {element.weight && ` | ${element.weight} kg`}
                    </p>
                   </div>
                ))):(<div > <h1 className="text-white text-lg font-semibold mt-1"> No data to display</h1></div>)}          
        </div>
    )
}
export default WorkoutSummary
