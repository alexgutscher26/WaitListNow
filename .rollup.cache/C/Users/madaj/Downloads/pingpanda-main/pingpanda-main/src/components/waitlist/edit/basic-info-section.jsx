import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
export function BasicInfoSection(_a) {
    var formData = _a.formData, onChange = _a.onChange, errors = _a.errors;
    return (<Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Set up the basic details for your waitlist.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Waitlist Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={onChange} placeholder="e.g., Early Access" className={(errors === null || errors === void 0 ? void 0 : errors.name) ? 'border-red-500' : ''}/>
          {(errors === null || errors === void 0 ? void 0 : errors.name) && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={onChange} placeholder="Tell people what they're signing up for" className="min-h-[100px]"/>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input id="websiteUrl" name="websiteUrl" type="url" value={formData.websiteUrl} onChange={onChange} placeholder="https://yourapp.com" className={(errors === null || errors === void 0 ? void 0 : errors.websiteUrl) ? 'border-red-500' : ''}/>
          {(errors === null || errors === void 0 ? void 0 : errors.websiteUrl) && <p className="text-sm text-red-500">{errors.websiteUrl}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="redirectUrl">Thank You Page URL</Label>
          <Input id="redirectUrl" name="redirectUrl" type="url" value={formData.redirectUrl} onChange={onChange} placeholder="https://yourapp.com/thank-you" className={(errors === null || errors === void 0 ? void 0 : errors.redirectUrl) ? 'border-red-500' : ''}/>
          <p className="text-sm text-muted-foreground">
            Where should we redirect users after they sign up?
          </p>
          {(errors === null || errors === void 0 ? void 0 : errors.redirectUrl) && <p className="text-sm text-red-500">{errors.redirectUrl}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL (optional)</Label>
          <Input id="logoUrl" name="logoUrl" type="url" value={formData.logoUrl} onChange={onChange} placeholder="https://yourapp.com/logo.png"/>
          <p className="text-sm text-muted-foreground">
            Display your logo at the top of the waitlist form
          </p>
        </div>
      </CardContent>
    </Card>);
}
//# sourceMappingURL=basic-info-section.jsx.map