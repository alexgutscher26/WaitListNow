import { __assign } from "tslib";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChromePicker } from 'react-color';
var FONT_FAMILIES = [
    { value: 'sans', label: 'Sans' },
    { value: 'serif', label: 'Serif' },
    { value: 'mono', label: 'Monospace' },
    { value: 'inter', label: 'Inter' },
    { value: 'poppins', label: 'Poppins' },
];
var BUTTON_VARIANTS = [
    { value: 'default', label: 'Solid' },
    { value: 'outline', label: 'Outline' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'link', label: 'Link' },
];
var BORDER_RADII = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'full', label: 'Full' },
];
export function AppearanceSection(_a) {
    var formData = _a.formData, onStyleChange = _a.onStyleChange, getBorderRadius = _a.getBorderRadius;
    var _b = useState('colors'), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState({ open: false, color: '#000000', name: '' }), colorPicker = _c[0], setColorPicker = _c[1];
    var handleColorChange = function (name, color) {
        onStyleChange(name, color);
        setColorPicker(function (prev) { return (__assign(__assign({}, prev), { color: color })); });
    };
    var openColorPicker = function (name, color) {
        setColorPicker({
            open: true,
            color: formData.style[name] || color,
            name: name,
        });
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how your waitlist form looks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="button">Button</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="mt-1 flex items-center">
                    <div className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer mr-3" style={{ backgroundColor: formData.style.primaryColor }} onClick={function () { return openColorPicker('primaryColor', '#3b82f6'); }}/>
                    <Input value={formData.style.primaryColor} onChange={function (e) { return onStyleChange('primaryColor', e.target.value); }} className="flex-1"/>
                  </div>
                </div>

                <div>
                  <Label>Background Color</Label>
                  <div className="mt-1 flex items-center">
                    <div className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer mr-3" style={{ backgroundColor: formData.style.backgroundColor }} onClick={function () { return openColorPicker('backgroundColor', '#ffffff'); }}/>
                    <Input value={formData.style.backgroundColor} onChange={function (e) { return onStyleChange('backgroundColor', e.target.value); }} className="flex-1"/>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Text Color</Label>
                  <div className="mt-1 flex items-center">
                    <div className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer mr-3" style={{ backgroundColor: formData.style.textColor }} onClick={function () { return openColorPicker('textColor', '#1f2937'); }}/>
                    <Input value={formData.style.textColor} onChange={function (e) { return onStyleChange('textColor', e.target.value); }} className="flex-1"/>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="button" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Button Text</Label>
                  <Input value={formData.style.buttonText} onChange={function (e) { return onStyleChange('buttonText', e.target.value); }} placeholder="e.g., Join Waitlist"/>
                </div>

                <div>
                  <Label>Button Color</Label>
                  <div className="mt-1 flex items-center">
                    <div className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer mr-3" style={{ backgroundColor: formData.style.buttonColor }} onClick={function () { return openColorPicker('buttonColor', formData.style.primaryColor); }}/>
                    <Input value={formData.style.buttonColor} onChange={function (e) { return onStyleChange('buttonColor', e.target.value); }} className="flex-1"/>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Button Text Color</Label>
                  <div className="mt-1 flex items-center">
                    <div className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer mr-3" style={{ backgroundColor: formData.style.buttonTextColor }} onClick={function () { return openColorPicker('buttonTextColor', '#ffffff'); }}/>
                    <Input value={formData.style.buttonTextColor} onChange={function (e) { return onStyleChange('buttonTextColor', e.target.value); }} className="flex-1"/>
                  </div>
                </div>

                <div>
                  <Label>Button Style</Label>
                  <Select value={formData.style.buttonVariant} onValueChange={function (value) { return onStyleChange('buttonVariant', value); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select button style"/>
                    </SelectTrigger>
                    <SelectContent>
                      {BUTTON_VARIANTS.map(function (variant) { return (<SelectItem key={variant.value} value={variant.value}>
                          {variant.label}
                        </SelectItem>); })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Button Rounded</Label>
                  <Select value={formData.style.buttonRounded} onValueChange={function (value) {
            return onStyleChange('buttonRounded', value);
        }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select border radius"/>
                    </SelectTrigger>
                    <SelectContent>
                      {BORDER_RADII.map(function (radius) { return (<SelectItem key={radius.value} value={radius.value}>
                          {radius.label}
                        </SelectItem>); })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Form Layout</Label>
                  <Select value={formData.style.formLayout} onValueChange={function (value) { return onStyleChange('formLayout', value); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stacked">Stacked</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Show Labels</Label>
                  <div className="mt-2 flex items-center">
                    <input type="checkbox" id="show-labels" checked={formData.style.showLabels} onChange={function (e) { return onStyleChange('showLabels', e.target.checked); }} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="show-labels" className="ml-2 block text-sm text-gray-700">
                      Show field labels
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Form Padding</Label>
                  <div className="mt-2">
                    <Slider value={[parseInt(formData.style.padding) || 6]} min={0} max={12} step={1} onValueChange={function (_a) {
        var value = _a[0];
        return onStyleChange('padding', value.toString());
    }} className="w-full"/>
                    <div className="mt-2 text-sm text-gray-500">
                      {formData.style.padding} ({parseInt(formData.style.padding) * 4}px)
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Box Shadow</Label>
                  <Select value={formData.style.boxShadow} onValueChange={function (value) { return onStyleChange('boxShadow', value); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shadow"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Font Family</Label>
                  <Select value={formData.style.fontFamily} onValueChange={function (value) { return onStyleChange('fontFamily', value); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font family"/>
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_FAMILIES.map(function (font) { return (<SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>); })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Border Radius</Label>
                  <Select value={formData.style.borderRadius} onValueChange={function (value) { return onStyleChange('borderRadius', value); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select border radius"/>
                    </SelectTrigger>
                    <SelectContent>
                      {['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'].map(function (radius) { return (<SelectItem key={radius} value={radius}>
                          {radius.charAt(0).toUpperCase() + radius.slice(1)}
                        </SelectItem>); })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Color Picker Modal */}
      {colorPicker.open && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <ChromePicker color={colorPicker.color} onChange={function (color) { return handleColorChange(colorPicker.name, color.hex); }}/>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={function () { return setColorPicker(function (prev) { return (__assign(__assign({}, prev), { open: false })); }); }}>
                Cancel
              </Button>
              <Button onClick={function () {
                onStyleChange(colorPicker.name, colorPicker.color);
                setColorPicker(function (prev) { return (__assign(__assign({}, prev), { open: false })); });
            }}>
                Apply
              </Button>
            </div>
          </div>
        </div>)}
    </Card>);
}
//# sourceMappingURL=appearance-section.jsx.map