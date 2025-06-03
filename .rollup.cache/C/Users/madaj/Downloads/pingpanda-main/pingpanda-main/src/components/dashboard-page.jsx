'use client';
import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { Heading } from './heading';
import { useRouter } from 'next/navigation';
/**
 * Renders a dashboard page with optional navigation and CTA button.
 */
export var DashboardPage = function (_a) {
    var title = _a.title, description = _a.description, children = _a.children, cta = _a.cta, actions = _a.actions, hideBackButton = _a.hideBackButton;
    var router = useRouter();
    return (<section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-8">
            {hideBackButton ? null : (<Button onClick={function () { return router.push('/dashboard'); }} className="w-fit bg-white" variant="outline">
                <ArrowLeft className="size-4"/>
              </Button>)}

            <div className="flex flex-col">
              <Heading>{title}</Heading>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {actions}
            {cta}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">{children}</div>
    </section>);
};
//# sourceMappingURL=dashboard-page.jsx.map