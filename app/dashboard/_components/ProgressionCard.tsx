import { CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Section = {
  key: string;
  name: string;
  path?: string;
};

type Progress = {
  percentage: number;
  completed: Section[];
  missing: Section[];
};

const ProgressionCard = ({ progress }: { progress: Progress }) => {
 
  return (
    <div className="bg-white rounded-lg border">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Progression</span>
            <span className="text-lg font-bold text-blue-600">
              {progress.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {progress.completed?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-700">
              Complétées ({progress.completed.length})
            </h4>
            <div className="space-y-1">
              {progress.completed.map((section) => (
                <div
                  key={section.key}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="h-4 w-4 text-green-700" />
                  <span>{section.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {progress.missing?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-orange-700">
              À compléter ({progress.missing.length})
            </h4>
            <div className="space-y-2">
              {progress.missing.map((section) => (
                <div
                  key={section.key}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Circle className="h-4 w-4 text-orange-700" />
                    <Link href={section.path || "#"} className="underline">
                      <span>{section.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default ProgressionCard;
