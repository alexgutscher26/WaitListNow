import { __assign, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils';
var Table = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", { className: "relative w-full overflow-auto", children: _jsx("table", __assign({ ref: ref, className: cn('w-full caption-bottom text-sm', className) }, props)) }));
});
Table.displayName = 'Table';
var TableHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("thead", __assign({ ref: ref, className: cn('[&_tr]:border-b', className) }, props)));
});
TableHeader.displayName = 'TableHeader';
var TableBody = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tbody", __assign({ ref: ref, className: cn('[&_tr:last-child]:border-0', className) }, props)));
});
TableBody.displayName = 'TableBody';
var TableFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tfoot", __assign({ ref: ref, className: cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className) }, props)));
});
TableFooter.displayName = 'TableFooter';
var TableRow = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tr", __assign({ ref: ref, className: cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className) }, props)));
});
TableRow.displayName = 'TableRow';
var TableHead = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("th", __assign({ ref: ref, className: cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className) }, props)));
});
TableHead.displayName = 'TableHead';
var TableCell = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("td", __assign({ ref: ref, className: cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className) }, props)));
});
TableCell.displayName = 'TableCell';
var TableCaption = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("caption", __assign({ ref: ref, className: cn('mt-4 text-sm text-muted-foreground', className) }, props)));
});
TableCaption.displayName = 'TableCaption';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
//# sourceMappingURL=table.js.map