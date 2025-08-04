import { Info, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const TipCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Alert className="border-blue-200 bg-blue-50 text-blue-800">
      <Info className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

export default TipCard;
