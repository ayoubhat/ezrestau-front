import SectionLayout from "../Section";

type Schedule = {
  day: string;
  hours: string;
};

const WorkingHours = ({
  openingHours,
  title,
}: {
  openingHours: Schedule[];
  title: string;
}) => {
  const today = new Date().getDay();
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const todayName = dayNames[today];

  const hoursWithToday = openingHours.map((schedule) => ({
    ...schedule,
    isToday: schedule.day === todayName,
  }));

  return (
    <SectionLayout title={title}>
      <div className="w-full min-w-lg space-y-1">
        {hoursWithToday.map((schedule, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-2 px-4 rounded-lg transition-all duration-200 ${
              schedule.isToday
                ? "bg-amber-500 text-primary-foreground"
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              {schedule.isToday && (
                <div className="w-2 h-2 bg-current rounded-full"></div>
              )}
              <span
                className={`font-medium ${
                  schedule.isToday
                    ? "text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {schedule.day}
                {schedule.isToday && (
                  <span className="ml-2 text-sm opacity-80">
                    (Aujourd&apos;hui)
                  </span>
                )}
              </span>
            </div>
            <span
              className={`font-mono text-sm ${
                schedule.isToday
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default WorkingHours;
