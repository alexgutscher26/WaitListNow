import { __rest } from "tslib";
import * as React from 'react';
import { cn } from '@/utils';
var Table = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}/>
    </div>);
});
Table.displayName = 'Table';
var TableHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props}/>);
});
TableHeader.displayName = 'TableHeader';
var TableBody = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}/>);
});
TableBody.displayName = 'TableBody';
var TableFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props}/>);
});
TableFooter.displayName = 'TableFooter';
var TableRow = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tr ref={ref} className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} {...props}/>);
});
TableRow.displayName = 'TableRow';
var TableHead = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<th ref={ref} className={cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)} {...props}/>);
});
TableHead.displayName = 'TableHead';
var TableCell = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<td ref={ref} className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)} {...props}/>);
});
TableCell.displayName = 'TableCell';
var TableCaption = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props}/>);
});
TableCaption.displayName = 'TableCaption';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
//# sourceMappingURL=table.jsx.map