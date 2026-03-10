import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeletonCard = () => {
  return (
    <Card className="w-full max-w-xs">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  );
};

export const ProductCardSkeleton = ({ count = 8 }) => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-4 gap-6 mt-6">
        {Array.from({ length: count }).map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

interface SkeletonProps {
  count?: number;
  children: React.ReactNode;
  className?: string;
}

export const ToppingSkeletonCard = () => {
  return (
    <Card className="w-[140px] h-[170px]">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  );
};

export const SkeletonWrapper = ({
  count = 4,
  children,
  className,
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center sm:justify-start",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-shrink-0">
          {children}
        </div>
      ))}
    </div>
  );
};
