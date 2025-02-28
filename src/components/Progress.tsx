
import { cn } from "@/lib/utils";

interface ProgressProps {
  progress: number;
  className?: string;
}

export const Progress = ({ progress, className }: ProgressProps) => {
  return (
    <div className={cn("relative pt-1", className)}>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs sm:text-sm font-semibold inline-block uppercase tracking-wider text-gray-600">
            Packing Progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs sm:text-sm font-semibold inline-block text-gray-600">
            {progress}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 sm:h-3 text-xs flex rounded-full bg-secondary/50">
        <div
          style={{ width: `${progress}%` }}
          className="transition-all duration-500 ease-out shadow-sm flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
        />
      </div>
    </div>
  );
};
