import { __assign } from "tslib";
import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
export function WaitlistPreview(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
    var formData = _a.formData;
    // Helper function to get border radius value based on buttonRounded option
    var getBorderRadius = function (size) {
        if (size === void 0) { size = 'md'; }
        var radiusMap = {
            none: '0px',
            sm: '0.25rem',
            md: '0.375rem',
            lg: '0.5rem',
            full: '9999px',
        };
        return radiusMap[size] || '0.375rem';
    };
    // Determine form layout classes
    var formLayoutClass = ((_b = formData.style) === null || _b === void 0 ? void 0 : _b.formLayout) === 'inline' ? 'flex flex-wrap gap-4 items-end' : 'space-y-4';
    // Determine if we should show field labels
    var showLabels = ((_c = formData.style) === null || _c === void 0 ? void 0 : _c.showLabels) !== false; // Default to true if not specified
    // Set CSS variables for primary color
    var style = {
        '--primary': ((_d = formData.style) === null || _d === void 0 ? void 0 : _d.primaryColor) || '#3b82f6',
        '--primary-foreground': ((_e = formData.style) === null || _e === void 0 ? void 0 : _e.buttonTextColor) || '#ffffff',
    };
    var getBoxShadow = function (size) {
        switch (size) {
            case 'sm':
                return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            case 'md':
                return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            case 'lg':
                return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            case 'xl':
                return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            default:
                return 'none';
        }
    };
    var getFontFamily = function (font) {
        var fonts = {
            sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            inter: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
            poppins: '"Poppins", ui-sans-serif, system-ui, -apple-system, sans-serif',
        };
        return fonts[font] || fonts.sans;
    };
    var containerStyle = useMemo(function () { return ({
        backgroundColor: formData.style.backgroundColor,
        color: formData.style.textColor,
        fontFamily: getFontFamily(formData.style.fontFamily),
        boxShadow: getBoxShadow(formData.style.boxShadow),
        borderRadius: getBorderRadius(formData.style.borderRadius),
        padding: "".concat(parseInt(formData.style.padding) * 0.5, "rem"),
    }); }, [formData.style]);
    var buttonStyle = useMemo(function () { return ({
        backgroundColor: formData.style.buttonColor,
        color: formData.style.buttonTextColor,
        borderRadius: getBorderRadius(formData.style.buttonRounded),
    }); }, [formData.style]);
    var renderField = function (field) {
        var _a;
        var commonProps = {
            key: field.id,
            id: "field-".concat(field.id),
            name: field.name.toLowerCase().replace(/\s+/g, '-'),
            placeholder: field.placeholder || "Enter your ".concat(field.name.toLowerCase()),
            required: field.required,
            className: 'w-full mt-1',
            style: {
                borderRadius: getBorderRadius(formData.style.borderRadius),
                padding: '0.5rem 0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: formData.style.backgroundColor === formData.style.textColor
                    ? '#ffffff'
                    : formData.style.backgroundColor,
                color: formData.style.textColor,
            },
        };
        switch (field.type) {
            case 'email':
                return (<Input type="email" {...commonProps}/>);
            case 'number':
                return (<Input type="number" {...commonProps}/>);
            case 'url':
                return (<Input type="url" {...commonProps}/>);
            case 'tel':
                return (<Input type="tel" {...commonProps}/>);
            case 'textarea':
                return (<textarea {...commonProps} rows={3}/>);
            case 'select':
                return (<select {...commonProps}>
            <option value="">Select {field.name.toLowerCase()}</option>
            {(_a = field.options) === null || _a === void 0 ? void 0 : _a.map(function (option, i) { return (<option key={i} value={option}>
                {option}
              </option>); })}
          </select>);
            default:
                return (<Input type="text" {...commonProps}/>);
        }
    };
    return (<div className="min-h-screen flex items-center justify-center p-6" style={__assign(__assign({}, style), { backgroundColor: ((_f = formData.style) === null || _f === void 0 ? void 0 : _f.backgroundColor) || '#f3f4f6', fontFamily: ((_g = formData.style) === null || _g === void 0 ? void 0 : _g.fontFamily) || 'Inter, sans-serif' })}>
      <div className="w-full max-w-md">
        {/* Browser-style header */}
        <div className="bg-gray-200 rounded-t-xl px-4 py-3 flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"/>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"/>
            <div className="w-3 h-3 bg-green-500 rounded-full"/>
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-700 text-sm font-normal">waitlist.yourdomain.com</span>
          </div>
        </div>

        {/* Main content card */}
        <div className="rounded-b-xl shadow-lg overflow-hidden transition-colors duration-200" style={{
            backgroundColor: ((_h = formData.style) === null || _h === void 0 ? void 0 : _h.backgroundColor) || '#ffffff',
            color: ((_j = formData.style) === null || _j === void 0 ? void 0 : _j.textColor) || '#1f2937',
        }}>
          <div className="px-12 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 leading-tight" style={{
            color: ((_k = formData.style) === null || _k === void 0 ? void 0 : _k.textColor) || '#111827',
        }}>
              {formData.name || 'Join the Waitlist'}
            </h1>

            {formData.description ? (<p className="text-lg mb-12 leading-relaxed font-normal" style={{
                color: ((_l = formData.style) === null || _l === void 0 ? void 0 : _l.textColor) ? "".concat(formData.style.textColor, "CC") : '#4b5563',
            }}>
                {formData.description}
              </p>) : (<p className="text-lg mb-12 leading-relaxed font-normal" style={{
                color: ((_m = formData.style) === null || _m === void 0 ? void 0 : _m.textColor) ? "".concat(formData.style.textColor, "CC") : '#4b5563',
            }}>
                Be the first to know when we launch. Early adopters get exclusive perks!
              </p>)}

            <div className={"mb-8 ".concat(formLayoutClass)}>
              {/* Email input */}
              <div className={((_o = formData.style) === null || _o === void 0 ? void 0 : _o.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                {showLabels && (<label htmlFor="email" className="block text-left mb-2 text-sm font-medium" style={{
                color: ((_p = formData.style) === null || _p === void 0 ? void 0 : _p.textColor) || '#374151',
            }}>
                    Email Address
                  </label>)}
                <div className="relative">
                  <input id="email" type="email" placeholder="Enter your email" className={'w-full px-6 py-4 border rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal'} style={{
            backgroundColor: ((_q = formData.style) === null || _q === void 0 ? void 0 : _q.backgroundColor) === ((_r = formData.style) === null || _r === void 0 ? void 0 : _r.textColor)
                ? '#ffffff'
                : ((_s = formData.style) === null || _s === void 0 ? void 0 : _s.backgroundColor) || '#ffffff',
            color: ((_t = formData.style) === null || _t === void 0 ? void 0 : _t.textColor) || '#1f2937',
            borderColor: ((_u = formData.style) === null || _u === void 0 ? void 0 : _u.primaryColor)
                ? "".concat(formData.style.primaryColor, "40")
                : '#e5e7eb',
            borderWidth: '1px',
            borderRadius: ((_v = formData.style) === null || _v === void 0 ? void 0 : _v.buttonRounded)
                ? getBorderRadius(formData.style.buttonRounded)
                : '0.5rem',
            '--tw-ring-color': ((_w = formData.style) === null || _w === void 0 ? void 0 : _w.primaryColor) || '#3b82f6',
            '--tw-ring-opacity': '0.2',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            '--tw-ring-offset-width': '0px',
            '--tw-ring-offset-color': '#fff',
        }}/>
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <span className="text-xl">🎯</span>
                  </div>
                </div>
              </div>

              {/* Custom fields */}
              {formData.customFields.map(function (field) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return (<div key={field.id} className={((_a = formData.style) === null || _a === void 0 ? void 0 : _a.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                  {showLabels && (<label htmlFor={field.id} className="block text-left mb-2 text-sm font-medium" style={{
                        color: ((_b = formData.style) === null || _b === void 0 ? void 0 : _b.textColor) || '#374151',
                    }}>
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>)}
                  <input id={field.id} type={field.type === 'email' ? 'email' : 'text'} placeholder={field.placeholder || "Enter your ".concat(field.name.toLowerCase())} className={'w-full px-6 py-4 border rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal'} style={{
                    backgroundColor: ((_c = formData.style) === null || _c === void 0 ? void 0 : _c.backgroundColor) === ((_d = formData.style) === null || _d === void 0 ? void 0 : _d.textColor)
                        ? '#ffffff'
                        : ((_e = formData.style) === null || _e === void 0 ? void 0 : _e.backgroundColor) || '#ffffff',
                    color: ((_f = formData.style) === null || _f === void 0 ? void 0 : _f.textColor) || '#1f2937',
                    borderColor: ((_g = formData.style) === null || _g === void 0 ? void 0 : _g.primaryColor)
                        ? "".concat(formData.style.primaryColor, "40")
                        : '#e5e7eb',
                    borderWidth: '1px',
                    borderRadius: ((_h = formData.style) === null || _h === void 0 ? void 0 : _h.buttonRounded)
                        ? getBorderRadius(formData.style.buttonRounded)
                        : '0.5rem',
                    '--tw-ring-color': ((_j = formData.style) === null || _j === void 0 ? void 0 : _j.primaryColor) || '#3b82f6',
                    '--tw-ring-opacity': '0.2',
                    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                    '--tw-ring-offset-width': '0px',
                    '--tw-ring-offset-color': '#fff',
                }}/>
                </div>);
        })}

              {/* Submit button */}
              <div className={((_x = formData.style) === null || _x === void 0 ? void 0 : _x.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                <button type="button" className={'w-full px-8 py-4 text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'} style={{
            backgroundColor: ((_y = formData.style) === null || _y === void 0 ? void 0 : _y.buttonColor) || ((_z = formData.style) === null || _z === void 0 ? void 0 : _z.primaryColor) || '#3b82f6',
            color: ((_0 = formData.style) === null || _0 === void 0 ? void 0 : _0.buttonTextColor) || '#ffffff',
            borderRadius: ((_1 = formData.style) === null || _1 === void 0 ? void 0 : _1.buttonRounded)
                ? getBorderRadius(formData.style.buttonRounded)
                : '0.5rem',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            '--tw-ring-color': ((_2 = formData.style) === null || _2 === void 0 ? void 0 : _2.primaryColor)
                ? "".concat(formData.style.primaryColor, "80")
                : '#3b82f6',
            '--tw-ring-offset-width': '2px',
            '--tw-ring-offset-color': ((_3 = formData.style) === null || _3 === void 0 ? void 0 : _3.backgroundColor) || '#ffffff',
            '--tw-ring-opacity': '0.5',
        }}>
                  {((_4 = formData.style) === null || _4 === void 0 ? void 0 : _4.buttonText) || 'Join the Waitlist'}
                </button>
              </div>
            </div>

            {/* Additional information */}
            {(((_5 = formData.settings) === null || _5 === void 0 ? void 0 : _5.maxSignups) || ((_6 = formData.settings) === null || _6 === void 0 ? void 0 : _6.emailVerification)) && (<div className="text-sm text-gray-500 space-y-2">
                {((_7 = formData.settings) === null || _7 === void 0 ? void 0 : _7.maxSignups) && (<p>Spots remaining: {formData.settings.maxSignups}</p>)}
                {((_8 = formData.settings) === null || _8 === void 0 ? void 0 : _8.emailVerification) && (<p className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Email verification required</span>
                  </p>)}
              </div>)}

            {/* Branding */}
            {((_9 = formData.settings) === null || _9 === void 0 ? void 0 : _9.showBranding) !== false && (<div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Powered by <span className="font-medium">WaitlistNow</span>
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=waitlist-preview.jsx.map