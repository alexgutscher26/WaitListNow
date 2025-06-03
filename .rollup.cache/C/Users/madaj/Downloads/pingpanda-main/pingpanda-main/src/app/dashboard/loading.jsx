import { Skeleton } from '@/components/ui/skeleton';
/**
 * Renders a loading component with skeleton elements.
 */
export default function Loading() {
    return (<div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64"/>
        <Skeleton className="h-10 w-32"/>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(function (i) { return (<Skeleton key={i} className="h-36 rounded-xl"/>); })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[400px] rounded-xl"/>
        <Skeleton className="col-span-3 h-[400px] rounded-xl"/>
      </div>
    </div>);
}
//# sourceMappingURL=loading.jsx.map