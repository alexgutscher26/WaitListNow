'use client';
import { __rest } from "tslib";
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
/**
 * Renders a toaster component displaying toast messages.
 */
export function Toaster() {
    var toasts = useToast().toasts;
    var theme = useTheme().theme;
    return (<ToastProvider>
      {toasts.map(function (_a) {
            var id = _a.id, title = _a.title, description = _a.description, action = _a.action, props = __rest(_a, ["id", "title", "description", "action"]);
            return (<Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <div className="font-medium">{title}</div>}
              {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
            {action}
          </Toast>);
        })}
      <ToastViewport />
    </ToastProvider>);
}
//# sourceMappingURL=toaster.jsx.map