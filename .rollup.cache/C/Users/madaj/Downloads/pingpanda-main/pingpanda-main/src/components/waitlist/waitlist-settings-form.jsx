'use client';
import { __awaiter, __generator } from "tslib";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
// Define the form schema using Zod
var waitlistFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    slug: z
        .string()
        .min(1, 'Slug is required')
        .max(50)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.'),
    description: z.string().max(500).optional(),
});
export function WaitlistSettingsForm(_a) {
    var waitlist = _a.waitlist;
    var router = useRouter();
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var form = useForm({
        resolver: zodResolver(waitlistFormSchema),
        defaultValues: {
            name: waitlist.name,
            slug: waitlist.slug,
            description: waitlist.description || '',
        },
    });
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlist.id), {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to update waitlist');
                        }
                        // Refresh the page to show updated data
                        router.refresh();
                        toast({
                            title: 'Success',
                            description: 'Waitlist updated successfully',
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error updating waitlist:', error_1);
                        toast({
                            title: 'Error',
                            description: 'Failed to update waitlist. Please try again.',
                            variant: 'destructive',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Waitlist Name
          </label>
          <Input id="name" placeholder="Enter waitlist name" {...form.register('name')} disabled={isLoading}/>
          {form.formState.errors.name && (<p className="text-sm text-red-500">{form.formState.errors.name.message}</p>)}
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium leading-none">
            Slug
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
              waitlistnow.app/waitlist/
            </span>
            <Input id="slug" className="rounded-l-none" placeholder="your-waitlist" {...form.register('slug')} disabled={isLoading}/>
          </div>
          {form.formState.errors.slug && (<p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>)}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium leading-none">
          Description
        </label>
        <Textarea id="description" placeholder="Enter a brief description of your waitlist" className="min-h-[80px]" {...form.register('description')} disabled={isLoading}/>
        {form.formState.errors.description && (<p className="text-sm text-red-500">{form.formState.errors.description.message}</p>)}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>);
}
//# sourceMappingURL=waitlist-settings-form.jsx.map