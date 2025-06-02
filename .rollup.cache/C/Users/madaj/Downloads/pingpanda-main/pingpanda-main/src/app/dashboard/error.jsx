'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
/**
 * Displays an error message and a retry button.
 */
export default function Error(_a) {
    var error = _a.error, reset = _a.reset;
    useEffect(function () {
        console.error(error);
    }, [error]);
    return (<div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={function () { return reset(); }} variant="outline">
        Try again
      </Button>
    </div>);
}
//# sourceMappingURL=error.jsx.map