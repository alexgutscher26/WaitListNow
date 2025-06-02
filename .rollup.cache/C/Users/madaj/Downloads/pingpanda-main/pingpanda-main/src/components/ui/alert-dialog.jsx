'use client';
import { __rest } from "tslib";
import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (<AlertDialogPrimitive.Portal {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {children}
    </div>
  </AlertDialogPrimitive.Portal>);
};
AlertDialogPortal.displayName = 'AlertDialogPortal';
var AlertDialogOverlay = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in', className)} {...props} ref={ref}/>);
});
AlertDialogOverlay.displayName = 'AlertDialogOverlay';
var AlertDialogContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content ref={ref} className={cn('fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg sm:rounded-lg md:w-full', 'animate-in fade-in-90 slide-in-from-bottom-10 sm:zoom-in-90 sm:slide-in-from-bottom-0', className)} {...props}/>
  </AlertDialogPortal>);
});
AlertDialogContent.displayName = 'AlertDialogContent';
var AlertDialogHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props}/>);
};
AlertDialogHeader.displayName = 'AlertDialogHeader';
var AlertDialogFooter = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props}/>);
};
AlertDialogFooter.displayName = 'AlertDialogFooter';
var AlertDialogTitle = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPrimitive.Title ref={ref} className={cn('text-lg font-semibold', className)} {...props}/>);
});
AlertDialogTitle.displayName = 'AlertDialogTitle';
var AlertDialogDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}/>);
});
AlertDialogDescription.displayName = 'AlertDialogDescription';
var AlertDialogAction = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props}/>);
});
AlertDialogAction.displayName = 'AlertDialogAction';
var AlertDialogCancel = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} {...props}/>);
});
AlertDialogCancel.displayName = 'AlertDialogCancel';
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };
//# sourceMappingURL=alert-dialog.jsx.map