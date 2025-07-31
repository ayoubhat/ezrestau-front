"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface TimeSlot {
  open: string;
  close: string;
}

interface WorkingHoursInputProps {
  // For opening hours (uses French day names)
  openingHours?: {
    lundi?: TimeSlot[];
    mardi?: TimeSlot[];
    mercredi?: TimeSlot[];
    jeudi?: TimeSlot[];
    vendredi?: TimeSlot[];
    samedi?: TimeSlot[];
    dimanche?: TimeSlot[];
  };
  // For delivery hours (uses English day names)
  deliveryHours?: Record<string, string[]>;
  // Type of hours being managed
  type: "opening" | "delivery";
  // Callbacks for updating the data
  onToggleDay: (day: string, isOpen: boolean) => void;
  onAddTimeSlot: (day: string) => void;
  onRemoveTimeSlot: (day: string, index: number) => void;
  onUpdateTimeSlot: (
    day: string,
    index: number,
    field: "open" | "close",
    value: string
  ) => void;
}

const OPENING_DAYS = [
  { key: "lundi", label: "Lundi" },
  { key: "mardi", label: "Mardi" },
  { key: "mercredi", label: "Mercredi" },
  { key: "jeudi", label: "Jeudi" },
  { key: "vendredi", label: "Vendredi" },
  { key: "samedi", label: "Samedi" },
  { key: "dimanche", label: "Dimanche" },
] as const;

const DELIVERY_DAYS = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
] as const;

const WorkingHoursInput: React.FC<WorkingHoursInputProps> = ({
  openingHours,
  deliveryHours,
  type,
  onToggleDay,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onUpdateTimeSlot,
}) => {
  const days = type === "opening" ? OPENING_DAYS : DELIVERY_DAYS;

  // Helper function to parse time slots for delivery hours
  const parseTimeSlots = (timeStrings: string[]): TimeSlot[] => {
    return timeStrings.map((timeString) => {
      const [open, close] = timeString.split("-");
      return { open, close };
    });
  };

  // Get slots for a specific day
  const getDaySlots = (dayKey: string): TimeSlot[] => {
    if (type === "opening" && openingHours) {
      return openingHours[dayKey as keyof typeof openingHours] || [];
    }
    if (type === "delivery" && deliveryHours) {
      const daySlots = deliveryHours[dayKey];
      return daySlots ? parseTimeSlots(daySlots) : [];
    }
    return [];
  };

  const renderTimeSlotInputs = (dayKey: string, slots: TimeSlot[]) => (
    <div className="space-y-2">
      {slots.map((slot, slotIndex) => (
        <div key={slotIndex} className="space-y-2 sm:space-y-0">
          {/* Mobile layout */}
          <div className="flex items-center gap-2 sm:hidden">
            <Input
              type="time"
              value={slot.open}
              onChange={(e) =>
                onUpdateTimeSlot(dayKey, slotIndex, "open", e.target.value)
              }
              className="flex-1 min-w-0"
            />
            <span className="text-gray-500 text-sm px-1">à</span>
            <Input
              type="time"
              value={slot.close}
              onChange={(e) =>
                onUpdateTimeSlot(dayKey, slotIndex, "close", e.target.value)
              }
              className="flex-1 min-w-0"
            />
            {slots.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTimeSlot(dayKey, slotIndex)}
                className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:flex items-center gap-2">
            <Input
              type="time"
              value={slot.open}
              onChange={(e) =>
                onUpdateTimeSlot(dayKey, slotIndex, "open", e.target.value)
              }
              className="w-[6.5rem]"
            />
            <span className="text-gray-500">à</span>
            <Input
              type="time"
              value={slot.close}
              onChange={(e) =>
                onUpdateTimeSlot(dayKey, slotIndex, "close", e.target.value)
              }
              className="w-[6.5rem]"
            />
            {slots.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTimeSlot(dayKey, slotIndex)}
                className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onAddTimeSlot(dayKey)}
        className="w-full sm:w-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
      >
        <Plus className="h-4 w-4 mr-1" />
        Ajouter une plage horaire
      </Button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border">
      {days.map(({ key, label }, index) => {
        const daySlots = getDaySlots(key);
        const isOpen = daySlots.length > 0;

        return (
          <div
            key={key}
            className={`p-3 sm:p-4 ${
              index !== days.length - 1 ? "border-b" : ""
            }`}
          >
            {/* Mobile layout - stacked vertically */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 text-sm">
                  {label}
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isOpen}
                    onCheckedChange={(checked) => onToggleDay(key, checked)}
                  />
                  {!isOpen && (
                    <span className="text-gray-500 font-normal text-sm">
                      Fermé
                    </span>
                  )}
                </div>
              </div>

              {isOpen && renderTimeSlotInputs(key, daySlots)}
            </div>

            {/* Desktop layout - horizontal */}
            <div className="hidden sm:flex items-start justify-between">
              <div className="flex items-center gap-4 min-w-[200px]">
                <span className="font-medium text-gray-900 min-w-[80px]">
                  {label}
                </span>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isOpen}
                    onCheckedChange={(checked) => onToggleDay(key, checked)}
                  />
                  <span className="text-gray-500 font-normal">
                    {isOpen ? "" : "Fermé"}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div className="flex-1">
                  {renderTimeSlotInputs(key, daySlots)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkingHoursInput;
