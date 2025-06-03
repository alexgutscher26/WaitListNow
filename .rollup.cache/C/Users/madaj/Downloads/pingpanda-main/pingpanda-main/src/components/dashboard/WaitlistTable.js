'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, Edit, Link as LinkIcon, Trash } from 'lucide-react';
var WaitlistTable = function (_a) {
    var waitlists = _a.waitlists;
    var handleCopyLink = function (id) {
        navigator.clipboard.writeText("".concat(window.location.origin, "/waitlist/").concat(id));
    };
    // TODO: Implement delete logic
    var handleDelete = function (id) {
        // Placeholder for delete action
        alert('Delete not implemented yet: ' + id);
    };
    return (_jsx("div", { className: "overflow-hidden rounded-lg border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Subscribers" }), _jsx(TableHead, { children: "Created" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: waitlists.map(function (waitlist) { return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-brand-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: waitlist.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [waitlist.subscribers, " subscribers"] })] })] }) }), _jsx(TableCell, { children: _jsx("div", { className: "text-sm text-muted-foreground", children: new Date(waitlist.createdAt).toLocaleDateString() }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "text-xs bg-green-50 text-green-700", children: "Active" }) }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-5 w-5" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: "/dashboard/waitlists/".concat(waitlist.id, "/edit"), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), " Edit"] }) }), _jsxs(DropdownMenuItem, { onClick: function () { return handleCopyLink(waitlist.id); }, children: [_jsx(LinkIcon, { className: "mr-2 h-4 w-4" }), " Copy Link"] }), _jsxs(DropdownMenuItem, { onClick: function () { return handleDelete(waitlist.id); }, className: "text-red-600", children: [_jsx(Trash, { className: "mr-2 h-4 w-4" }), " Delete"] })] })] }) })] }, waitlist.id)); }) })] }) }));
};
export default WaitlistTable;
//# sourceMappingURL=WaitlistTable.js.map