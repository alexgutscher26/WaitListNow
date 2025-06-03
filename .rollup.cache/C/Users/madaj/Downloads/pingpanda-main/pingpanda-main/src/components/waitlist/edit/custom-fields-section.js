import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { ref: setNoderef, style: style, className: "relative group bg-white p-4 rounded-lg border border-gray-200 mb-2 hover:shadow-md transition-shadow", children: [_jsx("button", __assign({ type: "button" }, attributes, listeners, { className: "absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-move", children: _jsx(GripVertical, { className: "h-4 w-4" }) })), _jsx("div", { className: "pl-8 pr-10", children: children }), _jsx("button", { type: "button", onClick: onRemove, className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-4 w-4" }) })] }));
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
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Custom Fields" }), _jsx(CardDescription, { children: "Add custom fields to collect additional information from users." })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "space-y-4", children: [formData.customFields.length > 0 ? (_jsx("div", { className: "space-y-2", children: formData.customFields.map(function (field, index) {
                                var _a;
                                return (_jsxs(SortableItem, { id: field.id, onRemove: function () { return onRemoveField(field.id); }, children: [_jsxs("div", { className: "grid grid-cols-12 gap-4 items-end", children: [_jsxs("div", { className: "col-span-5", children: [_jsx(Label, { htmlFor: "field-name-".concat(field.id), children: "Field Name" }), _jsx(Input, { id: "field-name-".concat(field.id), value: field.name, onChange: function (e) { return handleUpdateField(field.id, 'name', e.target.value); }, placeholder: "e.g., Company Name" })] }), _jsxs("div", { className: "col-span-3", children: [_jsx(Label, { htmlFor: "field-type-".concat(field.id), children: "Type" }), _jsxs(Select, { value: field.type, onValueChange: function (value) {
                                                                return handleUpdateField(field.id, 'type', value);
                                                            }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "text", children: "Text" }), _jsx(SelectItem, { value: "email", children: "Email" }), _jsx(SelectItem, { value: "number", children: "Number" }), _jsx(SelectItem, { value: "url", children: "URL" }), _jsx(SelectItem, { value: "tel", children: "Phone" }), _jsx(SelectItem, { value: "textarea", children: "Text Area" }), _jsx(SelectItem, { value: "select", children: "Select" })] })] })] }), _jsxs("div", { className: "col-span-3", children: [_jsx(Label, { htmlFor: "field-placeholder-".concat(field.id), children: "Placeholder (optional)" }), _jsx(Input, { id: "field-placeholder-".concat(field.id), value: field.placeholder || '', onChange: function (e) { return handleUpdateField(field.id, 'placeholder', e.target.value); }, placeholder: "e.g., Enter your company" })] }), _jsx("div", { className: "col-span-1 flex items-end h-10", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { id: "field-required-".concat(field.id), type: "checkbox", checked: field.required, onChange: function (e) {
                                                                    return handleUpdateField(field.id, 'required', e.target.checked);
                                                                }, className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" }), _jsx(Label, { htmlFor: "field-required-".concat(field.id), className: "text-sm", children: "Required" })] }) })] }), field.type === 'select' && (_jsxs("div", { className: "mt-3", children: [_jsx(Label, { children: "Options (one per line)" }), _jsx("textarea", { value: ((_a = field.options) === null || _a === void 0 ? void 0 : _a.join('\n')) || '', onChange: function (e) {
                                                        var options = e.target.value.split('\n').filter(Boolean);
                                                        handleUpdateField(field.id, 'options', options);
                                                    }, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", rows: 3, placeholder: "Option 1\\nOption 2\\nOption 3" })] }))] }, field.id));
                            }) })) : (_jsx("div", { className: "text-center py-8 border-2 border-dashed rounded-lg", children: _jsx("p", { className: "text-gray-500", children: "No custom fields added yet." }) })), showAddField ? (_jsxs("div", { className: "mt-6 p-4 border border-dashed rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 mb-4", children: "Add New Field" }), _jsxs("div", { className: "grid grid-cols-12 gap-4", children: [_jsxs("div", { className: "col-span-5", children: [_jsx(Label, { htmlFor: "new-field-name", children: "Field Name *" }), _jsx(Input, { id: "new-field-name", value: newField.name, onChange: function (e) { return setNewField(__assign(__assign({}, newField), { name: e.target.value })); }, placeholder: "e.g., Company Name" })] }), _jsxs("div", { className: "col-span-3", children: [_jsx(Label, { htmlFor: "new-field-type", children: "Type" }), _jsxs(Select, { value: newField.type, onValueChange: function (value) {
                                                        return setNewField(__assign(__assign({}, newField), { type: value }));
                                                    }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "text", children: "Text" }), _jsx(SelectItem, { value: "email", children: "Email" }), _jsx(SelectItem, { value: "number", children: "Number" }), _jsx(SelectItem, { value: "url", children: "URL" }), _jsx(SelectItem, { value: "tel", children: "Phone" }), _jsx(SelectItem, { value: "textarea", children: "Text Area" }), _jsx(SelectItem, { value: "select", children: "Select" })] })] })] }), _jsxs("div", { className: "col-span-3", children: [_jsx(Label, { htmlFor: "new-field-placeholder", children: "Placeholder (optional)" }), _jsx(Input, { id: "new-field-placeholder", value: newField.placeholder || '', onChange: function (e) { return setNewField(__assign(__assign({}, newField), { placeholder: e.target.value })); }, placeholder: "e.g., Enter your company" })] }), _jsx("div", { className: "col-span-1 flex items-end", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { id: "new-field-required", type: "checkbox", checked: newField.required, onChange: function (e) { return setNewField(__assign(__assign({}, newField), { required: e.target.checked })); }, className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" }), _jsx(Label, { htmlFor: "new-field-required", className: "text-sm", children: "Required" })] }) })] }), newField.type === 'select' && (_jsxs("div", { className: "mt-3", children: [_jsx(Label, { children: "Options (one per line)" }), _jsx("textarea", { value: ((_b = newField.options) === null || _b === void 0 ? void 0 : _b.join('\n')) || '', onChange: function (e) {
                                                var options = e.target.value.split('\n').filter(Boolean);
                                                setNewField(__assign(__assign({}, newField), { options: options }));
                                            }, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", rows: 3, placeholder: "Option 1\\nOption 2\\nOption 3" })] })), _jsxs("div", { className: "mt-4 flex justify-end space-x-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: function () { return setShowAddField(false); }, children: "Cancel" }), _jsx(Button, { type: "button", onClick: handleAddField, disabled: !newField.name.trim(), children: "Add Field" })] })] })) : (_jsx("div", { className: "mt-4", children: _jsxs(Button, { type: "button", variant: "outline", onClick: function () { return setShowAddField(true); }, className: "gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Custom Field"] }) }))] }) })] }));
}
//# sourceMappingURL=custom-fields-section.js.map