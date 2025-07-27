import { InfoIcon } from "lucide-react";

const TipCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex rounded-md items-start gap-3 p-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 border sh">
      <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
        <InfoIcon />
      </div>

      <div className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
        {children}
      </div>
    </div>
  );
};

export default TipCard;
