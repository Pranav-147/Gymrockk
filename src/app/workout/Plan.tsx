interface WorkoutDay {
    name: string;
    activities: string[];
  }
  
  export default function WorkoutSchedule({ rawWorkoutString }: { rawWorkoutString: string }) {
    const parseWorkoutString = (input: string): WorkoutDay[] => {
      const days: WorkoutDay[] = [];
      let currentDay: string | null = null;
      let currentActivities: string[] = [];
      
      const lines = input.split('\n').map(line => line.trim());
      
      lines.forEach(line => {
        if (line.endsWith(':')) {
          if (currentDay) {
            days.push({
              name: currentDay,
              activities: [...currentActivities]
            });
          }
          currentDay = line.slice(0, -1);
          currentActivities = [];
        }
        else if (line.startsWith('-')) {
          currentActivities.push(line.slice(1).trim());
        }
      });
      
      if (currentDay) {
        days.push({
          name: currentDay,
          activities: [...currentActivities]
        });
      }
      return days;
    };
  
    const workoutDays = parseWorkoutString(rawWorkoutString);
  
    return (
      <div className="container p-4">
        <h2 className="text-4xl mb-6 mx-auto md:text-6xl text-center tracking-tighter">
          Weekly{' '}
          <span className="italic font-sans text-transparent bg-clip-text bg-[radial-gradient(circle_at_top_right,#eb5d0f,orange)]">
            Workout
          </span>{' '}
          Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {workoutDays.map((day) => (
            day.name === "Response" ? null : (
              <div 
                key={day.name} 
                className="flex flex-col rounded-lg"
              >
                <div className="border border-orange-500 rounded-lg px-4 py-3">
                  <h2 className="text-xl font-semibold">
                    {day.name}
                  </h2>
                </div>
                <div className="flex-grow p-4 border border-orange-500 rounded-lg">
                  <ul className="space-y-2">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="text-sm">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  }