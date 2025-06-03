'use client';
import { __assign, __awaiter, __generator } from "tslib";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import styles from './waitlist-widget.module.css';
export function WaitlistWidget(_a) {
    var _this = this;
    var waitlistId = _a.waitlistId, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    var _d = useState(''), email = _d[0], setEmail = _d[1];
    var _e = useState(''), name = _e[0], setName = _e[1];
    var _f = useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var toast = useToast().toast;
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!email) {
                        toast({
                            title: 'Error',
                            description: 'Email is required',
                            variant: 'destructive',
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId, "/subscribers"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: email, name: name }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.message || 'Failed to join waitlist');
                    }
                    toast({
                        title: 'Success!',
                        description: 'You have been added to the waitlist',
                    });
                    setEmail('');
                    setName('');
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    toast({
                        title: 'Error',
                        description: error_1 instanceof Error ? error_1.message : 'Failed to join waitlist',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Apply default styles
    var _g = style || {}, _h = _g.buttonText, buttonText = _h === void 0 ? 'Join Waitlist' : _h, _j = _g.buttonColor, buttonColor = _j === void 0 ? '' : _j, _k = _g.buttonTextColor, buttonTextColor = _k === void 0 ? '' : _k, _l = _g.backgroundColor, backgroundColor = _l === void 0 ? '' : _l, _m = _g.textColor, textColor = _m === void 0 ? '' : _m, _o = _g.borderRadius, borderRadius = _o === void 0 ? 8 : _o, _p = _g.fontFamily, fontFamily = _p === void 0 ? '' : _p, _q = _g.showLabels, showLabels = _q === void 0 ? true : _q, _r = _g.formLayout, formLayout = _r === void 0 ? 'stacked' : _r;
    // Generate CSS variables for dynamic styling
    var cssVariables = __assign(__assign(__assign(__assign(__assign(__assign({}, (buttonColor && { '--button-bg': buttonColor })), (buttonTextColor && { '--button-text': buttonTextColor })), (textColor && { '--text-color': textColor })), (backgroundColor && { '--bg-color': backgroundColor })), (fontFamily && { '--font-family': fontFamily })), (borderRadius && { '--border-radius': "".concat(borderRadius, "px") }));
    return (<div className={cn(styles['waitlist-widget'], formLayout === 'inline'
            ? styles['waitlist-widget--inline']
            : styles['waitlist-widget--stacked'], !showLabels && styles['waitlist-widget--no-labels'], className)} style={cssVariables}>
      <form onSubmit={handleSubmit} className={styles['waitlist-widget__form']}>
        <div className={styles['waitlist-widget__field']}>
          {showLabels && (<Label htmlFor="name" className={styles['waitlist-widget__label']}>
              Name (Optional)
            </Label>)}
          <Input id="name" type="text" placeholder="Your name" value={name} onChange={function (e) { return setName(e.target.value); }} disabled={isLoading} className={styles['waitlist-widget__input']}/>
        </div>

        <div className={styles['waitlist-widget__field']}>
          {showLabels && (<Label htmlFor="email" className={styles['waitlist-widget__label']}>
              Email *
            </Label>)}
          <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={function (e) { return setEmail(e.target.value); }} required disabled={isLoading} className={styles['waitlist-widget__input']}/>
        </div>

        <Button type="submit" disabled={isLoading} className={styles['waitlist-widget__button']}>
          {isLoading ? 'Joining...' : buttonText}
        </Button>
      </form>
    </div>);
}
//# sourceMappingURL=waitlist-widget.jsx.map