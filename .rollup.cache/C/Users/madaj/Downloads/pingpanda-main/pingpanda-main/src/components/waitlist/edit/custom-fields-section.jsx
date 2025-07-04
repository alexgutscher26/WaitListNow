import { __assign } from "tslib";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function SortableItem(_a) {
    var id = _a.id, children = _a.children, onRemove = _a.onRemove;
    var _b = useSortable({
        id: id,
    }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition, isDragging = _b.isDragging;
    var style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
    };
    return (<div ref={setNoderef} style={style} className="relative group bg-white p-4 rounded-lg border border-gray-200 mb-2 hover:shadow-md transition-shadow">
      <button type="button" {...attributes} {...listeners} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-move">
        <GripVertical className="h-4 w-4"/>
      </button>

      <div className="pl-8 pr-10">{children}</div>

      <button type="button" onClick={onRemove} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <X className="h-4 w-4"/>
      </button>
    </div>);
}
export function CustomFieldsSection(_a) {
    var _b;
    var formData = _a.formData, onAddField = _a.onAddField, onUpdateField = _a.onUpdateField, onRemoveField = _a.onRemoveField, onReorderFields = _a.onReorderFields;
    var _c = useState({
        name: '',
        type: 'text',
        required: false,
        placeholder: '',
    }), newField = _c[0], setNewField = _c[1];
    var _d = useState(false), showAddField = _d[0], setShowAddField = _d[1];
    var handleAddField = function () {
        var _a;
        if (!newField.name.trim())
            return;
        onAddField(__assign(__assign({}, newField), { name: newField.name.trim(), placeholder: ((_a = newField.placeholder) === null || _a === void 0 ? void 0 : _a.trim()) || '' }));
        setNewField({
            name: '',
            type: 'text',
            required: false,
            placeholder: '',
        });
        setShowAddField(false);
    };
    var handleUpdateField = function (id, field, value) {
        var _a;
        onUpdateField(id, (_a = {}, _a[field] = value, _a));
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
        <CardDescription>
          Add custom fields to collect additional information from users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {formData.customFields.length > 0 ? (<div className="space-y-2">
              {formData.customFields.map(function (field, index) {
                var _a;
                return (<SortableItem key={field.id} id={field.id} onRemove={function () { return onRemoveField(field.id); }}>
                  <div className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-5">
                      <Label htmlFor={"field-name-".concat(field.id)}>Field Name</Label>
                      <Input id={"field-name-".concat(field.id)} value={field.name} onChange={function (e) { return handleUpdateField(field.id, 'name', e.target.value); }} placeholder="e.g., Company Name"/>
                    </div>

                    <div className="col-span-3">
                      <Label htmlFor={"field-type-".concat(field.id)}>Type</Label>
                      <Select value={field.type} onValueChange={function (value) {
                        return handleUpdateField(field.id, 'type', value);
                    }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="url">URL</SelectItem>
                          <SelectItem value="tel">Phone</SelectItem>
                          <SelectItem value="textarea">Text Area</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <Label htmlFor={"field-placeholder-".concat(field.id)}>
                        Placeholder (optional)
                      </Label>
                      <Input id={"field-placeholder-".concat(field.id)} value={field.placeholder || ''} onChange={function (e) { return handleUpdateField(field.id, 'placeholder', e.target.value); }} placeholder="e.g., Enter your company"/>
                    </div>

                    <div className="col-span-1 flex items-end h-10">
                      <div className="flex items-center space-x-2">
                        <input id={"field-required-".concat(field.id)} type="checkbox" checked={field.required} onChange={function (e) {
                        return handleUpdateField(field.id, 'required', e.target.checked);
                    }} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <Label htmlFor={"field-required-".concat(field.id)} className="text-sm">
                          Required
                        </Label>
                      </div>
                    </div>
                  </div>

                  {field.type === 'select' && (<div className="mt-3">
                      <Label>Options (one per line)</Label>
                      <textarea value={((_a = field.options) === null || _a === void 0 ? void 0 : _a.join('\n')) || ''} onChange={function (e) {
                            var options = e.target.value.split('\n').filter(Boolean);
                            handleUpdateField(field.id, 'options', options);
                        }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" rows={3} placeholder="Option 1\nOption 2\nOption 3"/>
                    </div>)}
                </SortableItem>);
            })}
            </div>) : (<div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">No custom fields added yet.</p>
            </div>)}

          {showAddField ? (<div className="mt-6 p-4 border border-dashed rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Add New Field</h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <Label htmlFor="new-field-name">Field Name *</Label>
                  <Input id="new-field-name" value={newField.name} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { name: e.target.value })); }} placeholder="e.g., Company Name"/>
                </div>

                <div className="col-span-3">
                  <Label htmlFor="new-field-type">Type</Label>
                  <Select value={newField.type} onValueChange={function (value) {
                return setNewField(__assign(__assign({}, newField), { type: value }));
            }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="tel">Phone</SelectItem>
                      <SelectItem value="textarea">Text Area</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <Label htmlFor="new-field-placeholder">Placeholder (optional)</Label>
                  <Input id="new-field-placeholder" value={newField.placeholder || ''} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { placeholder: e.target.value })); }} placeholder="e.g., Enter your company"/>
                </div>

                <div className="col-span-1 flex items-end">
                  <div className="flex items-center space-x-2">
                    <input id="new-field-required" type="checkbox" checked={newField.required} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { required: e.target.checked })); }} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <Label htmlFor="new-field-required" className="text-sm">
                      Required
                    </Label>
                  </div>
                </div>
              </div>

              {newField.type === 'select' && (<div className="mt-3">
                  <Label>Options (one per line)</Label>
                  <textarea value={((_b = newField.options) === null || _b === void 0 ? void 0 : _b.join('\n')) || ''} onChange={function (e) {
                    var options = e.target.value.split('\n').filter(Boolean);
                    setNewField(__assign(__assign({}, newField), { options: options }));
                }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" rows={3} placeholder="Option 1\nOption 2\nOption 3"/>
                </div>)}

              <div className="mt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={function () { return setShowAddField(false); }}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddField} disabled={!newField.name.trim()}>
                  Add Field
                </Button>
              </div>
            </div>) : (<div className="mt-4">
              <Button type="button" variant="outline" onClick={function () { return setShowAddField(true); }} className="gap-2">
                <Plus className="h-4 w-4"/>
                Add Custom Field
              </Button>
            </div>)}
        </div>
      </CardContent>
    </Card>);
}
//# sourceMappingURL=custom-fields-section.jsx.map