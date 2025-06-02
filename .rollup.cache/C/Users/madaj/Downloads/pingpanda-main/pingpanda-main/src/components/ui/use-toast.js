import { __assign, __rest, __spreadArray } from "tslib";
import * as React from 'react';
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1000000;
var actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
};
var count = 0;
/**
 * Generates a unique ID by incrementing and wrapping around a counter.
 */
function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}
var toastTimeouts = new Map();
/**
 * Adds a toast to the removal queue with a specified delay.
 */
var addToRemoveQueue = function (toastId) {
    if (toastTimeouts.has(toastId)) {
        return;
    }
    var timeout = setTimeout(function () {
        toastTimeouts.delete(toastId);
        dispatch({
            type: 'REMOVE_TOAST',
            toastId: toastId,
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
/**
 * Reducer function for managing toast notifications in the application state.
 *
 * Handles different actions such as adding, updating, dismissing, and removing toasts.
 * Maintains a list of toasts with a limit defined by TOAST_LIMIT.
 * Manages side effects like adding toasts to the removal queue.
 *
 * @param state - The current state containing the list of toasts.
 * @param action - An object describing the action to be performed on the toast state.
 * @returns The updated state after processing the action.
 */
export var reducer = function (state, action) {
    switch (action.type) {
        case 'ADD_TOAST':
            return __assign(__assign({}, state), { toasts: __spreadArray([action.toast], state.toasts, true).slice(0, TOAST_LIMIT) });
        case 'UPDATE_TOAST':
            return __assign(__assign({}, state), { toasts: state.toasts.map(function (t) { return (t.id === action.toast.id ? __assign(__assign({}, t), action.toast) : t); }) });
        case 'DISMISS_TOAST': {
            var toastId_1 = action.toastId;
            // ! Side effects ! - This could be extracted into a dismissToast() action,
            // but I'll keep it here for simplicity
            if (toastId_1) {
                addToRemoveQueue(toastId_1);
            }
            else {
                state.toasts.forEach(function (toast) {
                    addToRemoveQueue(toast.id);
                });
            }
            return __assign(__assign({}, state), { toasts: state.toasts.map(function (t) {
                    return t.id === toastId_1 || toastId_1 === undefined
                        ? __assign(__assign({}, t), { open: false }) : t;
                }) });
        }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return __assign(__assign({}, state), { toasts: [] });
            }
            return __assign(__assign({}, state), { toasts: state.toasts.filter(function (t) { return t.id !== action.toastId; }) });
        default:
            return state;
    }
};
var listeners = [];
var memoryState = { toasts: [] };
/**
 * Updates the memory state with the given action and notifies all registered listeners.
 */
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach(function (listener) {
        listener(memoryState);
    });
}
/**
 * Creates and manages a toast notification with specified properties, providing methods to update and dismiss it.
 */
function toast(_a) {
    var props = __rest(_a, []);
    var id = genId();
    /**
     * Dispatches an action to update a toast with new properties and an ID.
     */
    var update = function (props) {
        return dispatch({
            type: 'UPDATE_TOAST',
            toast: __assign(__assign({}, props), { id: id }),
        });
    };
    /**
     * Dispatches an action to dismiss a toast notification by ID.
     */
    var dismiss = function () { return dispatch({ type: 'DISMISS_TOAST', toastId: id }); };
    dispatch({
        type: 'ADD_TOAST',
        toast: __assign(__assign({}, props), { id: id, open: true, onOpenChange: function (open) {
                if (!open)
                    dismiss();
            } }),
    });
    return {
        id: id,
        dismiss: dismiss,
        update: update,
    };
}
/**
 * Manages and returns toast state, including adding listeners and dismissing toasts.
 */
function useToast() {
    var _a = React.useState(memoryState), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        listeners.push(setState);
        return function () {
            var index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);
    return __assign(__assign({}, state), { toast: toast, dismiss: function (toastId) { return dispatch({ type: 'DISMISS_TOAST', toastId: toastId }); } });
}
export { useToast, toast };
//# sourceMappingURL=use-toast.js.map