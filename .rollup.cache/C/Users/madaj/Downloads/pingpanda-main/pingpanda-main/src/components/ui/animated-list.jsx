'use client';
import { __spreadArray } from "tslib";
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
export var AnimatedList = React.memo(function (_a) {
    var className = _a.className, children = _a.children, _b = _a.delay, delay = _b === void 0 ? 1000 : _b;
    var _c = useState([]), messages = _c[0], setMessages = _c[1];
    var childrenArray = React.Children.toArray(children);
    useEffect(function () {
        var interval = setInterval(function () {
            if (messages.length < childrenArray.length) {
                setMessages(function (prev) { return __spreadArray([childrenArray[messages.length]], prev, true); });
            }
            else {
                clearInterval(interval);
            }
        }, delay);
        return function () { return clearInterval(interval); };
    }, [childrenArray, delay, messages.length]);
    return (<div className={"flex flex-col-reverse items-center gap-4 ".concat(className)}>
        <AnimatePresence>
          {messages.map(function (item) { return (<AnimatedListItem key={item.key}>{item}</AnimatedListItem>); })}
        </AnimatePresence>
      </div>);
});
AnimatedList.displayName = 'AnimatedList';
/**
 * Renders an animated list item using Framer Motion.
 */
export function AnimatedListItem(_a) {
    var children = _a.children;
    var animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: 'spring', stiffness: 350, damping: 40 },
    };
    return (<motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>);
}
//# sourceMappingURL=animated-list.jsx.map