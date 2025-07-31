import { OpeningHours } from "@/types";
import SectionLayout from "../Section";

const WorkingHours = ({
  openingHours,
  title,
}: {
  openingHours: OpeningHours;
  title: string;
}) => {
  const dayOrder = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ] as const;
  const todayDay = dayOrder[new Date().getDay()];

  return (
    <SectionLayout title={title}>
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-center items-center w-full sm:max-w-md space-y-1">
          {dayOrder.map((day) => {
            const slots = openingHours[day] || [];
            const isToday = day === todayDay;
            return (
              <div
                key={day}
                className={`w-full flex items-center justify-between py-2 px-2 rounded-lg transition-all duration-200 ${
                  isToday
                    ? "bg-amber-500 text-primary-foreground"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isToday && (
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                  )}
                  <span
                    className={`flex flex-row font-medium text-sm sm:text-md ${
                      isToday ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                    {isToday && (
                      <span className="hidden sm:flex ml-2 text-sm opacity-80">
                        (Aujourd&apos;hui)
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`font-mono text-sm sm:text-md ${
                    isToday
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {slots.length === 0
                    ? "Fermé"
                    : slots
                        .map((slot) => `${slot.open} - ${slot.close}`)
                        .join(" • ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
};

export default WorkingHours;
