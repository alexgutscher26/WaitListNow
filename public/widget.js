/**
 * Constructs a React element-like object with specified properties and key.
 *
 * This function processes the input parameters to create an object that mimics
 * a React element. It handles default values, renames keys, and ensures proper
 * formatting of the `ref` property. The function also checks for the presence
 * of a 'key' in the input properties and adjusts accordingly.
 *
 * @param {any} e - The type of the element.
 * @param {Object} n - An object containing key-value pairs representing element properties.
 * @param {any} r - A value that may be used as an alternative key or directly assigned to `ref`.
 */
/**
 * Initializes and exports various scheduling and priority management functions.
 *
 * This function sets up a module that provides functionalities to schedule callbacks with different priorities,
 * manage idle tasks, and control the frame rate. It includes mechanisms for handling timing, prioritizing tasks,
 * and executing them in an optimized manner based on their expiration times and priority levels.
 *
 * @returns The exports object containing various scheduling and priority functions.
 */
/**
 * Maintains a max-heap property by adding an element to the heap and adjusting positions accordingly.
 *
 * This function inserts a new element into a max-heap represented as an array. It ensures that the
 * max-heap property is maintained after insertion. The process involves comparing the newly added element
 * with its parent and swapping them if necessary, repeating this until the max-heap property holds.
 *
 * @param {Array} e - The array representing the max-heap.
 * @param {*} t - The element to be inserted into the heap.
 */
/**
 * Returns the first element of an array or null if the array is empty.
 */
/**
 * Adjusts an array to ensure its first element is greater than or equal to its last element,
 * rearranging elements as necessary.
 *
 * This function checks if the first and last elements of the array are equal. If they are not,
 * it swaps the first element with the last and then iteratively rearranges elements in a way
 * that maintains the condition using a comparison function `l`.
 *
 * @param e - An array of elements to be adjusted.
 * @returns The original first element of the array, or null if the array is empty.
 */
/**
 * Compares two objects based on their sortIndex and id properties.
 */
/**
 * Iterates through a linked list of tasks, executing callbacks and re-sorting as needed.
 *
 * This function processes each task in the queue. If a task's callback is null, it removes the task.
 * If a task's start time is greater than the current time, it breaks out of the loop.
 * Otherwise, it executes the callback, updates the task's sort index based on its expiration time,
 * and re-inserts the task into the queue. The process continues until all tasks are processed or
 * a task with a future start time is encountered.
 */
/**
 * Updates state based on input event and schedules a function if conditions are met.
 *
 * This function checks various conditions related to events and timers, updating internal flags
 * and potentially scheduling additional tasks or logging errors. It leverages helper functions
 * `w`, `n`, `L`, `S`, and `x` to perform these operations.
 */
/**
 * Checks if condition related to g, e.unstable_now(), C, and E is met.
 */
/**
 * Function N performs a series of operations based on various conditions and states.
 *
 * It initializes several flags and variables, then enters a loop to process tasks
 * based on their expiration times and priorities. If a task's callback is a function,
 * it executes the callback and updates the state accordingly. The function handles
 * different states and ensures proper cleanup and flag management.
 *
 * @param x - A boolean indicating whether certain operations should be performed.
 */
/**
 * Executes a function `t` with the current time using `e.unstable_now()` after a delay `n`.
 */
/**
 * Initializes and exports React components and related utilities.
 *
 * This function sets up various React symbols, classes, and functions that form the core of the React library,
 * including components like `Component`, `PureComponent`, and `Fragment`, as well as utility methods like
 * `createElement`, `cloneElement`, and `createContext`. It also defines hooks such as `useState` and `useEffect`.
 *
 * The function constructs a comprehensive set of React functionalities, managing state updates, rendering,
 * context handling, and more. It ensures that all components and utilities are properly initialized and
 * accessible for use in React applications.
 */
/**
 * Initializes a new instance of a class with props, context, refs, and updater.
 */
/**
 * Function y does nothing.
 */
/**
 * Initializes a new instance with props, context, refs, and updater.
 */
/**
 * Creates a React element with given props and ref.
 */
/**
 * Checks if the given object is of React element type.
 */
/**
 * Generates a unique key string based on input object or number.
 *
 * This function checks if the input `e` is an object with a non-null key property.
 * If true, it constructs a string by replacing '=' and ':' characters in the key
 * with '=0' and '=2', respectively, and prefixes the result with '$'.
 * If `e` is not an object or does not have a valid key, it converts the input `t`
 * to a base-36 string representation.
 *
 * @param {Object|null} e - The input object that may contain a 'key' property.
 * @param {*} t - A fallback value used if `e` is not an object or lacks a valid key.
 */
/**
 * Function N performs a specific task.
 */
/**
 * Processes and renders React components or elements based on input parameters.
 *
 * This function handles various types of inputs including objects, arrays, and promises.
 * It recursively processes each element, generating a unique key for each and appending it to the result array.
 * If the input is a promise, it waits for its resolution and processes the resolved value.
 *
 * @param n - The input to process, which can be an object, array, promise, or other types.
 * @param r - An array to accumulate the processed components or elements.
 * @param l - A string representing the current path in the component tree.
 * @param a - A string used as a prefix for keys.
 * @param o - A function to process each element before rendering.
 * @returns The number of elements processed and added to the result array.
 * @throws Error If an object is encountered that is not valid as a React child.
 */
/**
 * Processes an input and applies a transformation function to each element.
 */
/**
 * Handles asynchronous processing and updates the status of an entity.
 *
 * This function processes an entity's result asynchronously. It checks the current status,
 * updates it based on the promise resolution or rejection, and throws the error if the status is not valid.
 *
 * @param e - An entity object with properties `_status` and `_result`.
 */
/**
 * Function A does nothing.
 */
/**
 * Initializes and returns a module export, setting it to 1 if not already set.
 */
/**
 * Initializes various React internal functionalities and exports them under the `x` object.
 *
 * This function sets up methods for creating portals, flushing sync updates, preconnecting to resources,
 * prefetching DNS, preinitializing styles and scripts, preloading resources, and managing form states.
 * It also defines error handling mechanisms and utility functions like `t` for generating error messages.
 *
 * @returns An object containing various React internal functionalities.
 */
/**
 * Constructs a URL with error details and returns a message with the URL.
 */
/**
 * Function n performs a specific task.
 */
/**
 * Determines if a given value should be used as credentials.
 */
/**
 * Initializes a module and sets up React DevTools hooks if available.
 *
 * The function checks if `v` is truthy, returning `S.exports` immediately if so.
 * Otherwise, it initializes `v` to 1, defines an inner function `e`, and attempts
 * to register the `checkDCE` hook with React DevTools. If this fails, it logs the error.
 * Finally, it assigns the result of `_()` to `S.exports` and returns `S.exports`.
 */
/**
 * This module provides the implementation of ReactDOM, which is responsible for rendering React components into the DOM.
 */
/**
 * Constructs a URL to a React error page with optional arguments.
 */
/**
 * Checks if a given node is an element, document, or document fragment.
 */
/**
 * Traverses a tree-like structure to find the nearest parent node with a specific tag.
 *
 * The function iterates through a linked list of nodes represented by the `alternate` and `return`
 * properties, looking for the first node with a tag value of 3. It handles both cases where the
 * initial node has an `alternate` property and where it does not.
 *
 * @param {Object} e - The starting node in the tree-like structure.
 * @returns {Object|null} - The nearest parent node with a tag value of 3, or null if no such node is found.
 */
/**
 * Checks if a given element has a memoized state and returns it if available.
 *
 * This function examines an element's tag and memoized state. If the element's tag is 13,
 * it retrieves the memoized state, considering both the current and alternate states of the element.
 * If a valid memoized state is found and it contains a dehydrated property, that property is returned.
 * Otherwise, the function returns null.
 *
 * @param {Object} e - The element to check for memoized state.
 */
/**
 * Throws an error if the input is not equal to its processed form.
 */
/**
 * Recursively searches through a tree structure to find and return a specific node based on its tag value.
 *
 * This function starts from a given node `e` and checks if its tag matches certain predefined values (5, 26, 27, or 6).
 * If a match is found, it returns the node. Otherwise, it traverses through the child nodes and their siblings
 * recursively until it finds a matching node or exhausts all possibilities.
 *
 * @param {Object} e - The starting node in the tree structure to search from.
 */
/**
 * Determines if a given value is an iterable object.
 *
 * This function checks if the input `e` is either null or not an object, returning null in such cases.
 * If `e` is an object, it further checks for the presence of an iterator method (either via `L` or `@@iterator` symbol).
 * If an iterator method is found and it's a function, it returns this function; otherwise, it returns null.
 *
 * @param {any} e - The input value to check for iterability.
 */
/**
 * Determine the display name of a React element or component.
 *
 * This function checks the type of the input and returns its display name based on various conditions.
 * It handles different types such as functions, strings, and objects with specific $$typeof properties.
 * If the input is null or does not match any known types, it returns null.
 *
 * @param e - The React element or component to evaluate.
 * @returns The display name of the element or component, or null if none can be determined.
 */
/**
 * Wraps the input in an object with a 'current' property.
 */
/**
 * Updates the current element and decrements the index U.
 */
/**
 * Increments U and assigns e.current to j[U], then updates e.current with t.
 */
/**
 * Process and set namespace URI based on the given element and type.
 *
 * This function handles different node types and sets the appropriate namespace URI.
 * It uses helper functions V and $ to manipulate and store the values.
 *
 * @param e - An identifier or element for which the namespace is being determined.
 * @param t - The target node from which information is extracted.
 */
/**
 * Executes jQuery functions on elements W, B, and q.
 */
/**
 * Updates memoized state and context if necessary.
 */
/**
 * Updates current element states and resets related values if conditions match.
 */
/**
 * Sets strict mode for a given event if conditions are met.
 *
 * This function checks if `ce` is a function and calls it with the event `e`.
 * If `pe` exists and has a method `setStrictMode`, it attempts to set the strict mode
 * using `fe` and `e`. Catches any exceptions that occur during this process.
 */
/**
 * Processes an input integer to determine a specific output based on bitwise operations.
 *
 * The function first checks if the lower 5 bits of the input are non-zero and returns them if true.
 * Otherwise, it examines the position of the lowest set bit in the input and applies different logic
 * based on its position. For certain bit positions, it performs additional bitwise AND operations with
 * specific masks before returning the result.
 *
 * @param e - The input integer to be processed.
 * @returns The result of the bitwise operations applied to the input.
 */
/**
 * Determines the next lane to work on based on pending, suspended, and pinging lanes.
 *
 * The function evaluates multiple conditions and bit manipulations to decide which lane to process next,
 * considering pending, suspended, and pinging lanes. It also takes into account warm lanes and a flag `n`.
 *
 * @param e - An object containing various lane states (pendingLanes, suspendedLanes, pingedLanes, warmLanes).
 * @param t - The current lane being processed.
 * @param n - A boolean flag indicating certain conditions to be checked.
 * @returns The next lane to work on, or 0 if no suitable lane is found.
 */
/**
 * Checks if there are no pending lanes that are not suspended or pinged.
 */
/**
 * Determine a modified value based on an input flag and a base number.
 *
 * This function evaluates a numeric flag against predefined cases. If the flag matches one of the specified cases,
 * it adds a fixed value to the base number and returns the result. For other cases, it returns -1.
 *
 * The cases are grouped into two categories:
 * 1. Low values: 1, 2, 4, 8, 64
 * 2. High values: 16, 32, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152
 *
 * @param e - A numeric flag to determine the case.
 * @param t - The base number to which a fixed value will be added if a matching case is found.
 * @returns The modified number if a case matches; otherwise, -1.
 */
/**
 * Updates and returns a bitmask value.
 */
/**
 * Updates and returns a value based on bitwise operations.
 */
/**
 * Creates an array of length 31, filling it with the provided element.
 */
/**
 * Updates pending lanes and resets other lanes if the lane is not a specific value.
 */
/**
 * Updates pending and suspended lanes, sets entangled lanes, and modifies entanglements.
 */
/**
 * Updates entangled lanes and handles dependencies between them.
 */
/**
 * Maps a given numeric value to a specific output based on predefined cases.
 *
 * This function uses a switch statement to match the input value against several cases,
 * transforming it into another value according to the following rules:
 * - Values 2, 8, and 32 are mapped to 1.
 * - Powers of 2 from 256 up to 4194304 are mapped to 128.
 * - The value 268435456 is mapped to 134217728.
 * - All other values default to 0.
 *
 * @param e - A numeric input value to be transformed.
 * @returns The transformed numeric value based on the mapping rules.
 */
/**
 * Determines a specific value based on bitwise operations.
 */
/**
 * Determines an event-related value based on F.p and window.event.
 */
/**
 * Deletes specific properties from an object.
 */
/**
 * Searches for a node in the DOM hierarchy starting from a given element.
 *
 * This function traverses up the DOM tree from the provided element, checking each parent node for a specific property (`Re` or `Me`). It then examines the node's children and its alternate node's children to find a non-null child. If found, it returns that child; otherwise, it continues searching until the top of the DOM tree is reached.
 *
 * @param e - The starting element from which to begin the search.
 * @returns The first non-null child node found during the traversal, or null if no such node exists.
 */
/**
 * Retrieves a specific element from an input object based on predefined conditions.
 *
 * The function checks if the input `e` has a property defined by `Re`. If not, it falls back to using `Me`.
 * It then examines the `tag` property of the resulting object to determine if it matches any of the specified values (5, 6, 13, 26, 27, or 3).
 * If a match is found, the function returns the object; otherwise, it returns null.
 *
 * @param e - The input object that may contain properties `Re` and `Me`.
 * @returns The object if its `tag` property matches one of the specified values, or null if no match is found.
 */
/**
 * Retrieves the state node from a given element if it matches specific tag types.
 *
 * This function checks if the element's tag is one of 5, 26, 27, or 6. If it matches,
 * the function returns the `stateNode` of the element. Otherwise, it throws an error
 * with a message indicating that the element type is not supported.
 *
 * @param {Object} e - The element object containing the tag and stateNode properties.
 */
/**
 * Retrieves or initializes a cache object from the provided element.
 */
/**
 * Sets a property on the given object to true.
 */
/**
 * Calls Xe function with two arguments: e and t, then with e + "Capture" and t.
 */
/**
 * Updates the map with a key and its associated values, adding each value to a set.
 */
/**
 * Modifies an element's attribute based on the provided value.
 *
 * This function checks if the attribute is in a list of known attributes or if it matches certain patterns.
 * If the value is null, the attribute is removed. For undefined, function, and symbol types, the attribute is also removed.
 * For boolean types, it checks if the attribute starts with 'data-' or 'aria-' and removes it if not.
 * Otherwise, it sets the attribute to the string representation of the value.
 *
 * @param e - The element whose attribute is being modified.
 * @param t - The name of the attribute to modify.
 * @param n - The new value for the attribute.
 */
/**
 * Sets or removes an attribute on a given element based on the provided value.
 *
 * This function checks the type of the `value` parameter and performs different actions:
 * - If `value` is `null`, it removes the attribute from the element.
 * - For `undefined`, `function`, `symbol`, or `boolean` types, it also removes the attribute.
 * - Otherwise, it sets the attribute to the string representation of the `value`.
 *
 * @param {Element} e - The target DOM element.
 * @param {string} t - The name of the attribute to set or remove.
 * @param {*} n - The value to set as an attribute, or null/undefined/function/symbol/boolean to remove it.
 */
/**
 * Sets or removes an attribute on a given element based on the provided value.
 *
 * This function checks if the value `r` is null, undefined, a function, a symbol,
 * or a boolean. If any of these conditions are true, it removes the attribute
 * specified by `n` from the element `e`. Otherwise, it sets the attribute with
 * the namespace `t` and converts the value `r` to a string.
 *
 * @param {Element} e - The target DOM element.
 * @param {string|null} t - The namespace of the attribute or null if none.
 * @param {string} n - The name of the attribute.
 * @param {*} r - The value to set for the attribute, which determines whether
 *                the attribute should be added or removed.
 */
/**
 * Constructs an error message string with additional context information.
 *
 * This function checks if the global variable `Ze` is undefined and attempts to initialize it by throwing
 * an error and capturing its stack trace. It then extracts a prefix from the stack trace, stores it in `Ze`,
 * and determines a suffix based on the presence of specific patterns in the stack trace. Finally, it returns
 * a formatted string combining the prefix, the original error message (`e`), and the suffix.
 */
/**
 * Determines the component frame root from an error stack trace.
 *
 * This function attempts to identify the root of a component frame by comparing two error stacks.
 * It prepares an error, captures its stack trace, and then compares it with another provided stack trace.
 * The function is designed to handle complex scenarios involving different environments and stack trace formats.
 *
 * @param e - The first error object or a value that can be used to generate a stack trace.
 * @param t - A boolean flag indicating whether a specific context should be considered.
 * @returns A string representing the component frame root or an empty string if not found.
 */
/**
 * Determines the type or label of a given element based on its tag and other properties.
 *
 * This function uses a switch statement to map specific tags to their corresponding labels or types.
 * It handles various cases, including special treatments for lazy components, suspense, suspense lists,
 * and activity elements. For certain tags, it calls `ot` with the type or a string literal.
 * For others, it calls `ut` with the type or render function of the element.
 *
 * @param e - An object representing an element with properties like tag, type, and render.
 * @returns A string label or type based on the input element's tag and other properties.
 */
/**
 * Generates a concatenated string by repeatedly calling `st` on the input `e` until it returns null or undefined.
 *
 * This function attempts to generate a stack trace-like string by iteratively applying the `st` function to the input `e`
 * and appending its result to the output string `t`. The loop continues until `e.return` is null or undefined. If an error
 * occurs during this process, it catches the exception and returns an error message along with the stack trace.
 *
 * @param {any} e - The initial input to be processed by the `st` function.
 * @returns {string} - A concatenated string of results from `st(e)` or an error message if an exception occurs.
 */
/**
 * Determine the type of the input and return it, otherwise return an empty string.
 *
 * This function checks the type of the input using the `typeof` operator and returns the input itself
 * if its type is one of 'bigint', 'boolean', 'number', 'string', 'undefined', or 'object'.
 * If the type does not match any of these, it returns an empty string.
 *
 * @param e - The input value whose type needs to be determined.
 * @returns The input value itself if its type is one of the specified types; otherwise, an empty string.
 */
/**
 * Checks if the element is an input of type checkbox or radio.
 */
/**
 * Initializes a value tracker for an element if it doesn't already exist.
 *
 * This function checks if the element has a _valueTracker property. If not, it sets up a descriptor for either 'checked' or 'value' based on the element type.
 * It then tracks changes to this property using getters and setters, allowing retrieval and setting of the value while maintaining the original behavior.
 *
 * @param e - The DOM element to track.
 */
/**
 * Checks if the value of an element has changed and updates its tracker.
 *
 * This function first checks if the provided element `e` is truthy. If not, it returns false.
 * It then retrieves the value tracker associated with the element. If no tracker exists,
 * it returns true indicating no change.
 * The function determines the new value based on whether the element is checked (for checkboxes)
 * or simply by taking its value. If this new value differs from the tracked value, it updates
 * the tracker and returns true to indicate a change; otherwise, it returns false.
 *
 * @param {HTMLElement} e - The HTML element to check and update.
 */
/**
 * Attempts to retrieve the currently active element within a given context.
 *
 * This function first checks if the provided context `e` is valid, defaulting to the document if undefined.
 * It then tries to return the `activeElement` of the context. If an error occurs during this process,
 * it falls back to returning the body of the context.
 *
 * @param {Document|HTMLElement|null} e - The context from which to retrieve the active element.
 * @returns {HTMLElement|null} - The active element or the body if an error occurs or no active element is found.
 */
/**
 * Replaces characters in a string with their hexadecimal escape sequences.
 */
/**
 * Updates the attributes of an element based on various input parameters.
 *
 * This function sets or removes attributes such as `name`, `type`, `value`,
 * and `defaultChecked` on a given element (`e`). It handles different types
 * of values and conditions to ensure the element is updated correctly.
 *
 * @param e - The DOM element to be updated.
 * @param t - A value that determines the `value` attribute if applicable.
 * @param n - Another value that can set the `value` attribute.
 * @param r - A value that can remove the `value` attribute if true.
 * @param l - A value that sets or removes the `checked` attribute.
 * @param a - A value that determines the `defaultChecked` attribute.
 * @param o - A value that determines the `type` attribute if applicable.
 * @param i - A value that sets the `name` attribute if applicable.
 */
/**
 * Updates the properties of an HTML element based on various input parameters.
 *
 * This function modifies the type, value, default value, checked state, and name of the given element.
 * It handles different types of inputs and ensures that the element's properties are updated correctly.
 *
 * @param e - The target HTML element to update.
 * @param t - A parameter that can be a string or null, used to set the element's value and default value.
 * @param n - A parameter that can be a string or null, used in conjunction with `t` to set the element's value and default value.
 * @param r - A parameter that determines whether the element should be checked. Can be a function, symbol, boolean, or truthy value.
 * @param l - A fallback parameter for `r` if `r` is not provided.
 * @param a - The type of the input element, which can be a string, function, symbol, or boolean.
 * @param o - The name attribute of the input element, which can be a string, function, symbol, or boolean.
 * @param i - A boolean indicating whether to force the checked state of the element.
 */
/**
 * Updates the default value of an element if it's a number or doesn't match the given value.
 */
/**
 * Updates the selection state of options in a select element based on provided conditions.
 *
 * This function processes an array of option elements (`e`) and updates their `selected` and `defaultSelected` properties.
 * If a mapping object (`t`) is provided, it uses this to determine the selected state of each option. Otherwise, it selects
 * an option based on its value matching a given string (`n`). It also handles disabling options and setting defaults.
 *
 * @param e - An array of option elements.
 * @param t - A mapping object or boolean indicating whether to use a custom selection logic.
 * @param n - An array of values or a single value string used for selection.
 * @param r - A boolean flag to determine if the default selected state should be set.
 */
/**
 * Updates the value and default value of an element based on provided parameters.
 *
 * This function checks if the `t` parameter is not null and updates the `value`
 * property of the `e` object to the string representation of `dt(t)`. If `n` is provided,
 * it sets the `defaultValue` of `e` to the string representation of `dt(n)` or an empty
 * string if `n` is null. If `n` is not provided, it resets the `defaultValue` of `e`.
 */
/**
 * Sets default value and text content for an element based on given parameters.
 *
 * This function handles setting a default value for an element, ensuring that if specific conditions are met,
 * it updates the text content accordingly. It also checks for various null or invalid states and throws errors
 * when necessary.
 *
 * @param e - The element to be processed.
 * @param t - A parameter that could represent a default value or related object.
 * @param n - Another parameter that might influence the default value setting.
 * @param l - An optional array of parameters used in determining the default value.
 */
/**
 * Sets the text content of an element if it meets specific conditions.
 *
 * This function checks if the provided element has a single child node that is a text node.
 * If so, it updates the value of that text node to the new text. Otherwise, it sets the
 * text content of the entire element to the new text.
 *
 * @param {Node} e - The DOM element whose text content needs to be updated.
 * @param {string} t - The new text content to set for the element or its text node.
 */
/**
 * Sets a property on an element, handling different types and prefixes.
 *
 * This function determines whether to use setProperty or direct assignment based on the prefix of the property name.
 * It also handles special cases like boolean, float, and number properties, ensuring correct assignment.
 *
 * @param e - The target DOM element where the property will be set.
 * @param t - The name of the property to be set.
 * @param n - The value to be assigned to the property. Can be a string or number.
 */
/**
 * Applies styles to an element's style property, optionally removing existing styles.
 *
 * This function checks if the provided `t` is a non-null object. If `n` is present,
 * it removes properties from `e.style` that are not in `t`. Then, it applies all properties
 * from `t` to `e.style`, using `Ct` for setting style values.
 *
 * @param e - The target element whose style will be modified.
 * @param t - An object containing the styles to apply or remove.
 * @param n - An optional object representing the previous styles to compare against.
 */
/**
 * Determines if a given string is a valid HTML namespace.
 *
 * This function checks if the input string contains a hyphen and then evaluates it against a list of known non-namespace strings.
 * If the string matches any of these exceptions, it returns false; otherwise, it returns true.
 *
 * @param e - The string to be checked for namespace validity.
 * @returns A boolean indicating whether the string is a valid HTML namespace.
 */
/**
 * Tests if the input string is a JavaScript URL and blocks it if true.
 */
/**
 * Retrieves the parent element of a given event target or window object.
 *
 * This function determines the target element from an event and, if it has a corresponding use element,
 * updates the target to that use element. If the target is a text node (nodeType 3), it returns its parent element.
 * Otherwise, it returns the target itself.
 *
 * @param {Event|Window} e - The event object or window object from which to determine the target element.
 * @returns {Node|null} - The parent element of the target, or null if no valid target is found.
 */
/**
 * Handles updates to form elements and synchronizes their state.
 *
 * This function processes different types of form elements (input, textarea, select)
 * and updates their state accordingly. It also handles special cases like radio buttons
 * where it ensures that only one radio button with the same name is selected within a form.
 *
 * @param e - The element to be processed.
 */
/**
 * Executes a function with optional parameters, handling potential errors and resetting global flags.
 *
 * This function first checks if `Ft` is true, in which case it directly calls `e(t, n)`.
 * If `Ft` is false, it sets `Ft` to true and attempts to execute `e(t)`.
 * After execution, regardless of success or failure, it resets `Ft` to false.
 * It also checks if `Rt` or `Dt` are not null, in which case it processes these variables,
 * resetting them to null after processing. If any errors occur during execution, they are caught
 * and handled within the `finally` block.
 *
 * @param {Function} e - The function to be executed.
 * @param {*} t - The first argument passed to the function `e`.
 * @param {*} n - The second argument passed to the function `e`, if applicable.
 */
/**
 * Retrieves and validates a handler function from the component's state based on the provided event type.
 *
 * This function first checks if the component's state node exists, then retrieves an event handler map.
 * If the event type is one of the mouse events (onClick, onClickCapture, etc.), it additionally checks
 * if the element is disabled or not a form-related element. It then validates the retrieved handler to ensure
 * it is a function and throws an error if not.
 *
 * @param e - The event object containing type information.
 * @param t - The event type string.
 * @returns The validated event handler function, or null if not applicable.
 */
/**
 * Compares and extracts a substring from a global variable based on comparison with another string.
 *
 * This function checks if `Bt` is already set and returns it immediately if true. Otherwise, it iterates over
 * the characters of `Wt` to find the longest common prefix and suffix between `Wt` and `Vt.value` or
 * `Vt.textContent`. It then slices `Wt` accordingly and assigns the result back to `Bt`.
 *
 * @returns {string} The sliced substring from `Wt`.
 */
/**
 * Determines the key code or character code from a keyboard event.
 *
 * The function first checks if the 'charCode' property is present in the event object.
 * If 'charCode' is 0 and the 'keyCode' is 13 (Enter), it sets 'e' to 13.
 * Otherwise, it assigns the 'keyCode' to 'e'.
 * It then ensures that 'e' is set to 13 if it was originally 10 (Line Feed).
 * Finally, it returns 'e' if it is within the range of space (32) or Enter (13), otherwise returns 0.
 *
 * @param {KeyboardEvent} e - The keyboard event object containing key code information.
 */
/**
 * Returns true.
 */
/**
 * Returns false.
 */
/**
 * Initializes a synthetic event object based on provided parameters and native event.
 *
 * This function constructs a synthetic event by copying properties from a native event
 * and additional parameters. It also sets up methods to handle default prevention and
 * propagation stopping of the event.
 *
 * @param {Object} e - An object containing properties to be copied onto the synthetic event.
 * @returns {SyntheticEvent} A synthetic event object with methods for preventing default actions and stopping propagation.
 */
/**
 * Initializes a synthetic event object with properties from a native event.
 *
 * This function assigns various properties to the synthetic event, including
 * the React name, target instance, type, native event, target, and current target.
 * It also sets up methods for checking default prevention and propagation stopping.
 */
/**
 * Checks if a modifier key or specific event state is active.
 */
/**
 * Calls and returns the result of function `hn`.
 */
/**
 * Determine if a specific event and key combination should be processed.
 *
 * This function checks the event type and associated key code to decide whether
 * further processing is necessary. It handles different events like "keyup",
 * "keydown", "keypress", "mousedown", and "focusout".
 *
 * @param {string} e - The type of the event (e.g., "keyup", "keydown").
 * @param {KeyboardEvent} t - The keyboard event object containing key information.
 * @returns {boolean} - Returns true if the event should be processed, false otherwise.
 */
/**
 * Retrieves data from an event detail object if it exists.
 */
/**
 * Checks if the element is an input or textarea and has a specific type.
 */
/**
 * Updates event listeners based on provided parameters.
 */
/**
 * Calls the Ic function with the given element and a default value of 0.
 */
/**
 * Checks if a condition is met and returns the input if true.
 */
/**
 * Returns the second argument if the first is "change".
 */
/**
 * Detaches the "onpropertychange" event from Mn and clears related variables.
 */
/**
 * Handles a property change event for "value" and processes related data.
 */
/**
 * Handles focusin and focusout events, attaches a property change event listener on focusin.
 */
/**
 * Handles specific event types by invoking another function.
 *
 * This function checks if the input event type is either 'selectionchange', 'keyup', or 'keydown'.
 * If it matches any of these, it calls the `jn` function with the result of `Fn`.
 */
/**
 * Handles click event by delegating to jn function.
 */
/**
 * Handles 'input' and 'change' events by calling the jn function with the given target.
 */
/**
 * Checks if two objects are deeply equal.
 *
 * This function first checks if the inputs are strictly equal using Xn.
 * If not, it verifies that both inputs are non-null objects and have the same number of keys.
 * It then iterates over the keys of the first object and recursively checks if each key exists in the second object
 * and if their corresponding values are deeply equal using Xn.
 *
 * @param e - The first object to compare.
 * @param t - The second object to compare.
 * @returns True if the two objects are deeply equal, otherwise false.
 */
/**
 * Traverses down the DOM tree to find and return the deepest child node of a given element.
 */
/**
 * Finds a specific position within a given node and returns the character at that position.
 *
 * This function traverses through the nodes starting from the given element, calculating the position
 * of characters within text nodes until it finds the specified offset. It uses the Jn function to get
 * the next character node and iterates through sibling nodes if necessary.
 *
 * @param e - The starting node or element.
 * @param t - The target character position within the text content.
 * @returns An object containing the node and the offset relative to that node, or undefined if not found.
 */
/**
 * Determines if one node contains another node.
 *
 * This function checks if node `e` is an ancestor of node `t`, or if they are the same node.
 * It handles different types of nodes and uses appropriate methods to determine containment.
 *
 * @param e - The parent node or potential ancestor node.
 * @param t - The child node or potential descendant node.
 * @returns A boolean indicating whether node `e` contains node `t`.
 */
/**
 * Traverses through nested iframes to find a non-iframe element starting from a given element or window.
 *
 * The function iterates over the document's default view, checking each iframe's content window.
 * It continues this process until it finds an element that is not an HTMLIFrameElement or encounters
 * issues accessing the iframe's location. This traversal is useful for handling cross-origin iframes
 * and ensuring scripts run in a non-iframe context.
 *
 * @param {Window|HTMLElement|null} e - The starting element or window to begin the traversal from.
 *                                      If null, the current window is used.
 */
/**
 * Determines if an element is considered "editable".
 *
 * This function checks if the given element is either an input field of certain types,
 * a textarea, or has its `contentEditable` attribute set to true. It returns true if any
 * of these conditions are met.
 *
 * @param e - The DOM element to check.
 * @returns A boolean indicating whether the element is editable.
 */
/**
 * Handles selection events and updates internal state accordingly.
 *
 * This function determines the document or node context, retrieves the current selection,
 * and processes it to update the `ir` variable with either a range object or a selection object.
 * It also checks for listeners attached to the "onSelect" event and triggers them if necessary.
 *
 * @param e - An array where event objects will be pushed.
 * @param t - The current target element.
 * @param n - The node context in which the selection is made.
 */
/**
 * Creates an object with vendor-prefixed properties based on input strings.
 */
/**
 * Retrieves or constructs a value based on the input key and predefined mappings.
 *
 * This function checks if the key exists in the `fr` object and returns its value if present.
 * If the key is not found in `fr`, it verifies the presence of the key in `dr`. If the key exists
 * in `dr`, it iterates over the properties of the corresponding value, checking for their existence
 * in `pr`. If a matching property is found, it sets and returns the corresponding value from `dr`.
 * If no match is found or if the key does not exist in `dr`, it simply returns the input key.
 *
 * @param {string} e - The key to be used for retrieval or construction of the value.
 */
/**
 * Sets a value in Sr and updates Ye with the key-value pair.
 */
/**
 * Caches and retrieves metadata for an object.
 *
 * This function checks if the input `e` is an object. If it is, it attempts to retrieve cached metadata using a WeakMap (`Er`).
 * If metadata exists in the cache, it returns the cached data. Otherwise, it creates new metadata with the provided source `t`,
 * generates a stack trace using `ct(t)`, caches this new metadata, and then returns it.
 * If `e` is not an object, it directly returns an object containing the value of `e`, the source `t`, and a generated stack trace.
 */
/**
 * Iterates through an array, processing elements and updating their states.
 *
 * This function iterates over an array `zr`, nullifying processed elements,
 * and rearranges pending items in a linked list structure. It also calls `Rr`
 * to handle non-zero values of `a`.
 */
/**
 * Updates state arrays and flags based on provided parameters.
 */
/**
 * Executes a function and returns its result.
 */
/**
 * Executes Lr with null parameters and returns Dr result.
 */
/**
 * Updates lanes and alternate lanes, and manages hidden updates for a fiber node.
 *
 * This function propagates lane changes up the fiber tree from the given fiber node (e).
 * It also handles special logic for suspense boundary nodes and updates their hidden state accordingly.
 *
 * @param e - The current fiber node to update.
 * @param t - An optional update object that may need to be managed in hidden states.
 * @param n - The lane value to set or update.
 * @returns Returns the state node of the fiber if it is a class component, otherwise null.
 */
/**
 * Processes an entity and returns its state node if the entity's tag is 3.
 *
 * This function checks if a global variable `Rs` exceeds 50, resetting it to 0 and throwing an error if true.
 * It then iterates through the return chain of the entity until reaching a null return value.
 * Finally, it returns the state node of the entity if its tag is 3; otherwise, it returns null.
 *
 * @param {Object} e - The entity object to process.
 */
/**
 * Constructs a new Fr instance with initial properties set to null or default values.
 */
/**
 * Creates and returns a new instance of Fr with the provided arguments.
 */
/**
 * Checks if the input is a React component prototype.
 */
/**
 * Updates or creates a fiber node with new props and alternate state.
 */
/**
 * Updates a fiber node with properties from its alternate or resets it if no alternate exists.
 */
/**
 * Processes and creates a React element based on various input types and conditions.
 *
 * This function handles different types of inputs including functions, strings, objects,
 * and other primitives to determine the type of React element to create. It applies
 * specific logic for certain element types like meta, title, style, link, script, and more.
 * Depending on the input, it sets various properties and flags on the resulting element.
 *
 * @param e - The main input which can be a function, string, object, or other type.
 * @param t - Additional parameter typically related to context or configuration.
 * @param n - Another parameter that could be related to props or attributes.
 * @param l - A reference that might be set based on the input type.
 * @param a - An accumulator or flags parameter used in various conditions.
 * @param o - Parameter indicating lanes or priority levels for rendering.
 * @returns A React element with properties and flags set based on the input.
 */
/**
 * Updates the lanes property of an object and returns it.
 */
/**
 * Updates the lanes property of an object and returns it.
 */
/**
 * Updates a fiber node with new children and state information.
 */
/**
 * Updates queue with new key and value.
 */
/**
 * Updates global variables and performs bitwise operations based on input parameters.
 */
/**
 * Handles return logic by processing and updating event state.
 */
/**
 * Handles cases where e matches Gr or Zr, updating related arrays and variables accordingly.
 */
/**
 * Throws an error after calling two functions with specific parameters.
 */
/**
 * Updates the state node and handles various DOM event listeners based on the element type.
 *
 * This function processes different types of elements to attach specific event listeners or handle hydration logic.
 * It updates the state node with new properties and checks for hydration mismatches, triggering appropriate events.
 *
 * @param e - The React fiber node containing stateNode, type, and memoizedProps.
 */
/**
 * Processes a series of operations based on the tag value of the input object.
 *
 * This function iterates through the return properties of the input object `e`.
 * Depending on the tag value, it either sets a flag `sl` to true or false and then exits the loop.
 * The possible tag values that cause an exit are 5, 13, 27, and 3.
 *
 * @param e - An object with a return property containing a series of operations.
 */
/**
 * Processes a React element during reconciliation.
 *
 * This function handles various checks and updates based on the element's tag, type,
 * and state. It manages hydration, dehydration, and side effects like focus restoration.
 *
 * @param e - The React element to process.
 * @returns A boolean indicating whether the processing was successful.
 */
/**
 * Resets global variables to null and a boolean flag to false.
 */
/**
 * Returns and resets the value of `ul`, merging it with `ks` if necessary.
 */
/**
 * Adds an element to the array `ul`, initializing it if necessary.
 */
/**
 * Updates the current value of a target element and performs an action on it.
 */
/**
 * Updates the current value of e to yl.current and calls $(yl).
 */
/**
 * Traverses the fiber tree upwards from a given node, updating child lanes.
 *
 * This function iterates through the fiber nodes starting from `e` until it reaches the root or the specified node `n`.
 * During traversal, it updates the `childLanes` of each node to include the lanes specified by `t`.
 * If an alternate node exists (`r`), it also updates its `childLanes` if necessary.
 */
/**
 * Updates lanes and alternate lanes for contexts in a Fiber tree.
 *
 * This function iterates through a Fiber node and its children, updating the lanes
 * based on context matches. It also handles special cases for specific tag types.
 *
 * @param e - The current Fiber node.
 * @param t - An array of context values to match against.
 * @param n - The lane value to update.
 * @param l - A boolean indicating whether to reset the child pointer.
 */
/**
 * Processes a fiber node and its children to determine if any components need to be updated.
 *
 * This function traverses the fiber tree starting from the given fiber node `t`. It checks various flags and conditions,
 * such as whether the fiber has an alternate node, if it's a specific tag type, or if its memoized state has changed.
 * If certain conditions are met, it adds components to the `e` array. Finally, it updates flags on the fiber node.
 *
 * @param e - An array that may hold component types that need updating.
 * @param t - The current fiber node being processed.
 * @param n - A parameter that is passed to another function but not used within this scope.
 * @param l - Another parameter passed to a dependent function, not detailed here.
 */
/**
 * Checks if any context in the linked list has a different current value than memoized value.
 */
/**
 * Updates global variables and resets context dependencies.
 */
/**
 * Calls Tl with vl and e as arguments.
 */
/**
 * Initializes and returns the result of a function call with given parameters.
 */
/**
 * Updates context and memoized value for a given effect hook.
 */
/**
 * Creates and returns an object with a controller, data map, and ref count.
 */
/**
 * Decreases the reference count of an object and aborts its controller if the count reaches zero.
 */
/**
 * Decrements Il and processes Fl if it's not null.
 *
 * This function checks if Il has reached zero and Fl is not null. If so, it sets the status of Ul to "fulfilled"
 * (if Ul is not null), then iterates over each element in Fl, executing the function stored in each element.
 */
/**
 * Retrieves the current value or fallbacks to pooled cache if null.
 */
/**
 * Updates the pool associated with the given element or current context if no element is provided.
 */
/**
 * Retrieves the current pool and its parent if available.
 */
/**
 * Checks if the status of an object is 'fulfilled' or 'rejected'.
 */
/**
 * No-op function.
 */
/**
 * Handles the status of a promise-like object and manages its resolution or rejection.
 *
 * This function checks the status of a given promise-like object `t`. If it's undefined,
 * it pushes a new value `t` into the array `e`. If the current status is "fulfilled", it returns
 * the value. If "rejected", it throws an error after processing the reason with `na`.
 * For other statuses, it ensures the promise is pending and sets up its resolution and rejection handlers.
 *
 * @param e - An array to manage promise states or results.
 * @param t - A promise-like object whose status needs to be handled.
 * @param n - Index in array `e` where the promise state is stored or will be stored.
 */
/**
 * Resets and returns the current value of `ea`, throwing an error if it is null.
 */
/**
 * Throws an error if the input matches specific constants.
 */
/**
 * Initializes the update queue for a fiber node.
 */
/**
 * Updates the updateQueue of an object if it hasn't been updated yet.
 */
/**
 * Creates an object with specified lane and default values for other properties.
 */
/**
 * Updates the update queue of a given element and returns the updated state.
 *
 * This function checks if the update queue is null and returns null if so. Otherwise, it processes the pending updates,
 * modifies the linked list of updates, and applies the changes to the element's state. If certain conditions are met,
 * it calls additional helper functions like Dr and Rr to finalize the update.
 *
 * @param e - The element whose update queue needs to be updated.
 * @param t - The current update object being processed.
 * @param n - Additional data required for processing updates.
 */
/**
 * Updates lanes and pending lanes based on shared queue flags.
 */
/**
 * Updates the update queue of a fiber node with a new base update.
 * If the alternate fiber has the same update queue, it merges the updates from both queues.
 * Otherwise, it sets the new update as the first and last base update.
 *
 * @param {Object} e - The current fiber node.
 * @param {Object} t - The new base update to be added.
 */
/**
 * Throws an error if `ca` is true and `Ul` is not null.
 */
/**
 * Processes updates for a given fiber node and applies them to its state.
 *
 * This function handles complex update logic, including prioritizing updates,
 * applying payloads, and managing callbacks. It also updates the fiber's alternate
 * node if necessary. The function iterates through the update queue, processes
 * each update based on its tag (e.g., functional or object payload), and updates
 * the base state accordingly.
 *
 * @param e - The current fiber node being processed.
 * @param t - The action type for the update (not detailed in comments).
 * @param n - The alternate fiber node of `e` (not detailed in comments).
 * @param r - A bitmask representing lanes (not detailed in comments).
 */
/**
 * Calls a function with a given context.
 */
/**
 * Calls `pa` on each callback in `e.callbacks` and clears the callbacks array.
 */
/**
 * Updates global state with provided values and combines base lanes.
 */
/**
 * Updates two variables using a helper function V.
 */
/**
 * Updates the current state and performs operations on ha and ga.
 */
/**
 * Throws an error with a specific message.
 */
/**
 * Checks if all elements in array `e` match corresponding elements in array `t`.
 *
 * This function iterates over both arrays up to the length of the shorter one,
 * comparing each pair of elements using the `Xn` function. If any pair does not match,
 * the function returns `false`. If all pairs match, it returns `true`.
 *
 * @param {Array} e - The first array to compare.
 * @param {Array} t - The second array to compare.
 */
/**
 * Processes and updates component state based on provided parameters.
 */
/**
 * Updates global state flags and checks dependencies for initialization.
 *
 * This function sets several global variables to null or default values and checks if the provided entity has any dependencies.
 * If an entity is provided, it validates those dependencies. If the dependency check passes, a global flag `Pi` is set to true.
 * Throws an error if certain conditions related to global state are met.
 *
 * @param {any} e - The entity whose dependencies need to be checked and initialized.
 */
/**
 * Executes a task repeatedly until a condition is met or an error occurs.
 *
 * This function manages updates and effects within a loop, handling potential errors
 * if the maximum iteration count (25) is reached. It resets various state variables
 * on each iteration and processes the update queue if it exists.
 *
 * @param {Object} e - The main object containing the updateQueue.
 * @param {Function} t - A function to execute within the loop.
 * @param {*} n - A parameter passed to the function `t`.
 * @param {*} l - Another parameter passed to the function `t`.
 */
/**
 * Updates and returns a memoized state value.
 */
/**
 * Sets a flag and returns its previous state.
 */
/**
 * Updates target object's queue and flags based on source object.
 */
/**
 * Resets state and queue values to their initial states.
 */
/**
 * Initializes and returns a new state object, linking it in a queue if necessary.
 */
/**
 * Updates and returns the current work-in-progress fiber in a React reconciliation context.
 *
 * This function manages the state of alternate fibers, ensuring that the current memoized states are correctly updated and linked.
 * It handles cases where there are no more states to process by throwing specific errors based on the context of the reconciliation.
 *
 * @returns The updated work-in-progress fiber with the latest memoized state.
 * @throws Error If there are no more fibers to process and an alternate fiber is missing, or if an invariant fails during processing.
 */
/**
 * Increments a global counter and processes an input with a series of internal functions.
 *
 * This function manages a global counter `Na`, increments it, and initializes an array `Pa` if necessary.
 * It then processes the input `e` using the function `Jl`, passing in `Pa`, `e`, and the current value of `Na`.
 * After processing, it checks and updates the memoized state of another internal structure `t`.
 *
 * @param {any} e - The input to be processed.
 */
/**
 * Determines the type of a given value and processes it accordingly.
 *
 * This function checks if the input is an object and then determines its nature:
 * - If the object has a `then` method, it assumes it's a promise and returns the result of `$a(e)`.
 * - If the object has a `$$typeof` property matching `S`, it processes it using `Nl(e)`.
 * If the input is neither an object nor meets the above conditions, it throws an error.
 *
 * @param {any} e - The value to be processed.
 */
/**
 * Initializes or retrieves a memoized array of objects.
 *
 * This function checks if there is an existing memoization cache in the update queue. If not, it initializes one by creating a new cache object with an empty data array and index set to 0. It then returns a new array of objects based on the input size `e`, filling each element with `T`. The function also increments the index in the memoization cache.
 *
 * @param e - The size of the array to be initialized or retrieved.
 * @returns An array of objects with length `e`.
 */
/**
 * Checks if the second argument is a function and calls it with the first argument, otherwise returns the second argument.
 */
/**
 * Calls the function Qa with arguments Ha(), Sa, and e.
 */
/**
 * Updates the queue and state of a React component based on actions and lanes.
 *
 * This function processes the action queue, updates the base state, and handles
 * eager state transitions. It also checks for render lane mismatches and throws
 * an error if necessary.
 *
 * @param e - The fiber object representing the current component.
 * @param t - The alternate fiber object for comparison.
 * @param n - The reducer function used to update the state.
 * @returns A tuple containing the memoized state and the dispatch function.
 */
/**
 * Updates the state of a React component by processing pending actions and dispatching new actions.
 *
 * This function retrieves the current queue from the execution context, processes any pending actions,
 * updates the memoized state accordingly, and returns the updated state along with the dispatch function.
 * If there are no pending actions, it simply returns the current memoized state and the dispatch function.
 */
/**
 * Executes a function with memoization and lifecycle management.
 *
 * This function handles the execution of a provided function `t` with memoization logic,
 * updating the state if necessary, and managing lifecycle events such as creation and destruction.
 * It also checks for specific flags and conditions to determine the flow of execution.
 *
 * @param e - An unknown parameter that may be used within the function `t`.
 * @param t - A function to execute, which returns a value that may be memoized.
 * @param n - An optional function or value that can be provided for additional processing.
 * @returns The result of executing the function `t` with memoization and lifecycle management applied.
 */
/**
 * Updates the update queue with a new store entry.
 */
/**
 * Updates a target object with new value and snapshot, then checks and processes if it's valid.
 */
/**
 * Executes a function if a condition is met.
 */
/**
 * Checks if a snapshot is different from the current value.
 */
/**
 * Processes an input and checks its validity.
 */
/**
 * Updates memoized state and queue with provided value or function result.
 */
/**
 * Updates base state and processes an event with optional custom action.
 */
/**
 * Handles a transition event and manages its lifecycle.
 *
 * This function processes an action, creates a transition object,
 * and updates the pending state of the provided context. It also
 * handles the listeners attached to the transition object.
 *
 * @param {Object} e - The initial event or context object.
 * @param {Object} t - The target object containing action and pending properties.
 * @param {Function} n - A function to update the isTransition state.
 * @param {Function} l - A callback function to process the transition object.
 * @param {*} a - Payload associated with the action.
 */
/**
 * Handles state transitions and actions based on input parameters.
 * The function checks if the action is a transition and processes it accordingly.
 * It manages the current state, applies the payload to the state, and handles any exceptions.
 *
 * @param {Object} e - The context object containing the current state.
 * @param {Object} t - The action object with details about the action to be performed.
 */
/**
 * Handles asynchronous operations based on the type of the third parameter.
 *
 * This function checks if the third parameter `n` is a promise-like object.
 * If it is, it attaches success and error handlers to the promise using `then`.
 * The success handler calls `oo(e, t, n)`, and the error handler calls `io(e, t, n)`.
 * If `n` is not a promise-like object, it directly calls `oo(e, t, n)`.
 *
 * @param {any} e - First parameter passed to the function.
 * @param {any} t - Second parameter passed to the function.
 * @param {any} n - Third parameter that could be a promise or any other type.
 */
/**
 * Updates a task's status to fulfilled and processes pending tasks.
 */
/**
 * Handles pending promises by rejecting them and resetting the action.
 */
/**
 * Iterates over and calls each listener in the provided event object.
 */
/**
 * Returns the second argument passed to the function.
 */
/**
 * Updates the form state based on given parameters and returns various objects related to the updated state.
 *
 * This function checks if `il` is true, then processes the form state if it exists. It handles different cases involving nodes,
 * updates dispatch functions, and binds actions to handlers. Finally, it returns an object containing the updated state
 * and dispatch methods.
 *
 * @param e - The event or action that triggers the state update.
 * @param t - An initial value or null, used to set the base state if conditions are met.
 * @returns An array containing the final state, a dispatch function, and a boolean flag.
 */
/**
 * Calls the po function with Ha, Sa, and e as arguments.
 */
/**
 * Handles the processing of a promise or value and updates the component state.
 *
 * This function checks if the input is a promise, processes it accordingly,
 * and then updates the component's memoized state and dispatches actions.
 * It also handles potential errors during promise resolution.
 *
 * @param e - The first parameter (details depend on context).
 * @param t - The second parameter, which may be a promise or value.
 * @param n - The third parameter, used for updating the component's memoized state.
 * @returns An array containing the processed result and dispatch function.
 */
/**
 * Sets the action property of an object.
 */
/**
 * Handles state updates and returns memoized state and dispatch function.
 */
/**
 * Updates the update queue with a new effect and returns it.
 */
/**
 * Retrieves the memoized state from the Ha function.
 */
/**
 * Updates flags, memoizes state, and sets up a resource.
 */
/**
 * Updates the memoized state of a component based on the provided flags and dependencies.
 *
 * The function checks if there are any previous dependencies (`Sa`). If both `Sa` and `r`
 * (current dependencies) are not null and the current dependencies match the previous ones,
 * it updates the memoized state with the new flags, instance, context, and dependencies.
 * Otherwise, it sets a flag in `ka.flags` and updates the memoized state similarly.
 *
 * @param {number} e - Flags indicating the type of update.
 * @param {any} t - The new state to be memoized.
 * @param {any} n - Context associated with the component.
 * @param {any} r - Current dependencies for the memoized state.
 */
/**
 * Calls yo with specific arguments.
 */
/**
 * Calls vo with specific arguments.
 */
/**
 * Calls `vo` with specific arguments.
 */
/**
 * Calls the function `vo` with specific arguments.
 */
/**
 * Conditionally executes a function and manages its lifecycle based on the provided arguments.
 *
 * This function checks if the second argument is a function. If so, it invokes the first argument,
 * passes the result to the second argument, and returns a cleanup function that either calls or resets
 * the second argument based on its type. If the second argument is not null, it executes the first argument,
 * assigns the result to `current` in the second argument's object, and returns a cleanup function that sets
 * `current` to null.
 *
 * @param {Function} e - The primary function to execute.
 * @param {Function|null|Object} t - A function to process the result of `e`, or an object with a `current` property.
 */
/**
 * Calls `vo` with specific arguments and updates `n`.
 */
/**
 * Initializes a new instance of the Co class.
 */
/**
 * Updates memoized state and returns the new or existing value based on a condition.
 */
/**
 * Updates and memoizes the state based on a given function and dependency.
 *
 * This function checks if the dependency (`t`) has changed compared to the last memoized value.
 * If it hasn't changed, it returns the previously memoized state. Otherwise, it updates the state
 * by calling the provided function (`e`), optionally logging a message if `Ca` is true, and then
 * memoizes the new state and dependency.
 *
 * @param {Function} e - The function to generate or update the state.
 * @param {*} t - The dependency that determines whether to recompute the state.
 */
/**
 * Updates memoized state or sets a new lane and flags.
 */
/**
 * Determines the memoized state based on provided parameters and conditions.
 *
 * The function checks if the current node should be updated based on the given parameters.
 * If the node is valid, it updates the memoized state; otherwise, it sets a flag and returns null.
 * Depending on certain flags, it may also perform additional operations like setting lanes or marking states.
 */
/**
 * Handles asynchronous operations and updates the state based on the result.
 *
 * This function sets up a temporary priority level, processes an event, and manages promises or synchronous operations.
 * It updates the state based on the outcome of these operations and handles any exceptions that occur during processing.
 *
 * @param e - The event to process.
 * @param t - A flag indicating whether to suppress certain behaviors.
 * @param n - Additional data related to the event.
 * @param r - Callback or function to be executed with the result.
 * @param l - Function that returns a promise or a value.
 */
/**
 * Function Oo performs a basic operation.
 */
/**
 * Handles the processing of a specific tag and executes a callback with validation.
 *
 * This function checks if the provided element's tag is 5, throws an error if not,
 * retrieves the queue from the element, and then calls another function with necessary parameters.
 * It also handles a condition based on the presence of 'n' to either use a default function or the provided callback.
 */
/**
 * Initializes memoized state for a component.
 */
/**
 * Executes a function with given parameters.
 */
/**
 * Calls and returns the result of function Nl with argument Yd.
 */
/**
 * Retrieves the memoized state from the Ha function.
 */
/**
 * Returns the memoized state from the Ha function.
 */
/**
 * Iterates through a series of operations based on the return value's tag and processes them accordingly.
 *
 * The function traverses through a chain of returns, processing each step based on its tag (24 or 3).
 * It uses helper functions like `Ms`, `ia`, `oa`, `Is`, and `ua` to handle different stages of processing.
 * If the return value is not null after processing, it updates the cache and continues with the next iteration.
 *
 * @param {Object} e - The initial context object containing the return chain.
 */
/**
 * Processes an event with a given action and context, updating internal state if necessary.
 */
/**
 * Calls $o with e, t, n, and the result of Ms().
 */
/**
 * Processes a lane update for a fiber node and determines if further processing is needed.
 *
 * This function checks if the current lane is already being processed. If not, it either processes an eager state update or schedules a regular update.
 * It handles cases where the fiber has no lanes assigned and where there are alternate fibers to consider.
 * The function updates the lane state and may trigger additional operations based on the outcome of these checks.
 *
 * @param e - The current fiber node.
 * @param t - The fiber's update queue.
 * @param n - The action or payload for the update.
 * @param r - The lane to process.
 * @returns A boolean indicating whether further processing is needed.
 */
/**
 * Initializes and processes a lane configuration based on given parameters.
 *
 * This function sets up a lane object with default values and checks conditions
 * related to eager state processing. If certain conditions are met, it throws an
 * error or proceeds with further processing using other functions like `Or` and `Is`.
 */
/**
 * Checks if an element is equal to ka or its alternate is ka.
 */
/**
 * Updates the pending tasks list by adding a new task to the queue.
 */
/**
 * Updates lanes and pending lanes based on flags.
 */
/**
 * Increments the global counter and logs an event with the given data.
 */
/**
 * Sets the ref of an element based on the provided props.
 */
/**
 * Throws an error if the input type does not match expected conditions.
 *
 * This function checks if the second argument `t` is of a specific React element type.
 * If it is, an error is thrown with a message indicating that the operation cannot be performed.
 * Otherwise, it throws another error describing the type of the second argument.
 *
 * @param {Error} e - The initial error object or message to be used in the final error.
 * @param {*} t - The value to be checked against specific conditions.
 */
/**
 * Initializes an object with its payload.
 */
/**
 * This function appears to be part of a larger React reconciliation process, managing the creation and updating of DOM elements based on virtual DOM nodes (fibers).
 *
 * The primary logic involves:
 * - Handling different types of updates (insertions, deletions, reconciliations) for various fiber types.
 * - Reusing existing fibers when possible to optimize rendering performance.
 * - Managing children reconciliation for components that can have multiple children.
 * - Dealing with specific types like fragments, portals, and suspense boundaries.
 *
 * The function is highly complex due to its extensive handling of different scenarios in the React rendering pipeline.
 *
 * @param e - The current fiber node being processed.
 * @returns The updated fiber node after processing all reconciliations.
 */
/**
 * Updates deletions array and flags in object if condition is met.
 */
/**
 * Iterates through a linked list, applying a function to each node.
 */
/**
 * Constructs a map from a linked list structure.
 */
/**
 * Updates and returns an element with index set to 0 and sibling set to null.
 */
/**
 * Updates index and flags of a node based on conditions.
 */
/**
 * Modifies the flags of a node if it has no alternate and certain conditions are met.
 */
/**
 * Updates the return value of the given node if it meets specific conditions.
 */
/**
 * Determines how to render a component based on its type and properties.
 *
 * This function checks if the component type matches a specific condition (`h`).
 * If it does, it delegates rendering to another function `d`. Otherwise, it
 * creates or reuses an element instance. It ensures that the element's return
 * reference is set to the parent element (`e`).
 */
/**
 * Updates or creates a host fiber based on the provided parameters.
 *
 * The function checks if the current fiber (`t`) is null, has a tag other than 4,
 * or does not match the container and implementation of the new fiber (`n`).
 * If any condition fails, it creates a new fiber using `Br` and assigns its return to `e`.
 * Otherwise, it updates the current fiber by calling `a` on its children and assigns its return to `e`.
 *
 * @param {Object} e - The parent fiber.
 * @param {Object|null} t - The current host fiber.
 * @param {Object} n - The new fiber configuration.
 * @param {number} r - The mode of the fiber.
 */
/**
 * Updates the return value of t to e and returns it.
 */
/**
 * Handles rendering of different types of elements in a virtual DOM environment.
 *
 * This function processes various types of inputs, including strings, numbers, bigints,
 * objects, functions, and promises. It uses different helper functions to handle each type
 * appropriately and ensures the element is correctly linked back to its parent in the DOM hierarchy.
 *
 * @param e - The current execution context or parent component.
 * @param t - The element to be rendered, which can be a string, number, bigint, object, function, or promise.
 * @param n - Additional rendering options or context.
 * @returns The processed element ready for rendering.
 */
/**
 * Processes an input value and returns a specific output based on its type and content.
 *
 * This function handles different types of inputs including strings, numbers, bigints, objects,
 * promises, and React elements. It checks the type of the input and processes it accordingly,
 * potentially returning null or further processing the input with other functions like `u`, `s`,
 * `c`, `d`, or `Jo`.
 *
 * @param e - The first parameter, its purpose is not clear from the provided code.
 * @param t - An object containing a key property, used for comparison and identification.
 * @param n - The input value to be processed. Can be a string, number, bigint, object, promise, or React element.
 * @param r - The fourth parameter, its purpose is not clear from the provided code.
 * @returns The result of processing the input value `n`, which can be null or further processed by other functions.
 */
/**
 * Handles various types of inputs and processes them accordingly.
 *
 * This function checks the type of the input `r` and performs different actions based on its type.
 * It handles strings, numbers, bigints, objects with specific $$typeof properties, functions,
 * and promise-like objects. For unknown types, it calls `ti(t, r)`.
 *
 * @param e - First parameter, likely an object or context holder.
 * @param t - Second parameter, also likely an object or context holder.
 * @param n - Third parameter, possibly a key or identifier for the input `r`.
 * @param r - Fourth parameter, the input to be processed, which can be of various types.
 * @param l - Fifth parameter, additional context or options.
 * @returns The result of processing the input `r`, or null if no specific handling is applied.
 */
/**
 * Handles complex rendering logic based on input parameters and context.
 *
 * This function manages various types of child components, updates the reconciliation process,
 * and handles asynchronous operations like Promises and lazy-loaded components.
 * It also deals with different modes and states of components during rendering.
 *
 * @param u - The parent fiber or node in the React tree.
 * @param s - The sibling fiber or node in the React tree.
 * @param c - The child component or element to be processed.
 * @param d - Additional data or context related to rendering.
 * @returns The updated fiber or node after processing the child component.
 */
/**
 * Updates UI state based on event and alternate data.
 *
 * This function updates the UI by setting flags and states related to rendering
 * components. It checks if certain conditions are met before updating global variables.
 *
 * @param {Object} e - Event object containing alternate data and other properties.
 */
/**
 * Handles specific logic based on the tag value of the input element.
 *
 * This function checks if the `tag` property of the input `e` is equal to 22.
 * If true, it updates the current state using helper functions `V` and then checks
 * if `ii` is null. If `ii` is null and `alternate` of `e` has a non-null
 * `memoizedState`, it assigns `e` to `ii`.
 * If the tag is not 22, it calls another function `ci()`.
 */
/**
 * Updates values for variables fi and oi using their current properties.
 */
/**
 * Handles DOM manipulation and state update based on event.
 */
/**
 * Traverses a fiber tree to find a specific node based on its tag and properties.
 *
 * This function iterates through the fiber nodes starting from the given root `e`.
 * It checks each node's tag and memoizedState, returning the node if certain conditions are met.
 * If it reaches the end of a branch or completes a full cycle without finding a match, it returns null.
 *
 * @param e - The root fiber node to start traversal from.
 * @returns The found fiber node or null if no matching node is found.
 */
/**
 * Updates memoized state and base state if lanes are zero.
 */
/**
 * Determines if a component should update based on its state and props.
 *
 * This function checks if the `shouldComponentUpdate` method is defined on the component's instance.
 * If it is, it calls that method with the next props and state. Otherwise, it decides based on whether
 * the component is a pure React component and whether there are changes in the props or state.
 *
 * @param {Object} e - The component instance or its state node.
 * @param {Function} t - The component constructor function.
 * @param {Object} n - Current state of the component.
 * @param {Object} r - Next state of the component.
 * @param {Object} l - Current props of the component.
 * @param {Object} a - Next props of the component.
 * @param {Object} o - Context object for the component.
 */
/**
 * Handles receiving new props, updating state if necessary.
 */
/**
 * Merges default props with provided props, excluding the 'ref' property from the latter.
 *
 * This function takes two objects: `e` and `t`. It first checks if the object `t`
 * contains a 'ref' property. If it does, it creates a new object `n` that excludes
 * the 'ref' property from `t`. Then, it merges default props from `e.defaultProps`
 * into `n`, ensuring that any properties in `e.defaultProps` that are not present
 * in `n` are added to `n`.
 *
 * @param {Object} e - The object containing default props under the 'defaultProps' key.
 * @param {Object} t - The initial set of props to be merged with default props.
 */
/**
 * Calls the vi function with the given argument.
 */
/**
 * Logs an error message to the console.
 */
/**
 * Calls the function vi with the argument e.
 */
/**
 * Handles uncaught errors by invoking a callback and catching exceptions to rethrow them later.
 */
/**
 * Handles an error caught during execution by invoking a callback and rethrowing it asynchronously.
 *
 * This function attempts to call `onCaughtError` with the provided error details. If an exception occurs during this process,
 * it catches the error and schedules it to be thrown again using `setTimeout`. The function leverages parameters to determine
 * if an error boundary is present and includes relevant stack information in the callback.
 *
 * @param {Function} e - A function used to handle caught errors, expecting two arguments: the error value and details.
 * @param {*} t - An object containing component metadata, used to identify if an error boundary exists.
 * @param {Object} n - An object representing the error context, including `value` for the error itself and `stack` for stack trace information.
 */
/**
 * Creates and configures a callback action with specified parameters.
 */
/**
 * Assigns a tag to the input object and returns it.
 */
/**
 * Updates the error handling callbacks in the provided context object based on the component's lifecycle methods.
 *
 * This function checks if there is a `getDerivedStateFromError` method defined and updates the payload
 * to call this method with the current error value. It also sets up a callback to invoke `_i` with the
 * current context, node, and render state. If the component has a `componentDidCatch` method, it adds
 * additional logic to handle the error and update the error boundaries.
 *
 * @param {Object} e - The event object containing payload and callback properties.
 * @param {Object} t - The context object representing the current rendering context.
 * @param {Object} n - The node object associated with the component.
 * @param {Object} r - The render state object containing the error value and stack.
 */
/**
 * Sets the child of a node based on a condition.
 */
/**
 * Handles rendering and updating a component based on provided parameters.
 *
 * This function manages the rendering process of a component by first checking if a reference is present in the props.
 * It then updates or creates necessary references, processes the flags for the component,
 * and either initiates rendering or skips it based on certain conditions.
 *
 * @param {any} e - The element to be rendered.
 * @param {any} t - The target node where the element should be mounted.
 * @param {any} n - An object containing render properties.
 * @param {any} r - Props for the component, which may include a 'ref' property.
 * @param {any} l - Additional context or configuration options.
 */
/**
 * Handles rendering and comparison of React elements based on props and context.
 *
 * This function checks if the element is null and initializes it accordingly. If the element is not null, it compares
 * the current props with the new props using a custom or default comparator. If they are different, it updates the element.
 * It also manages the reference and flags for the React element.
 *
 * @param e - The current React Fiber node.
 * @param t - The parent React Fiber node.
 * @param n - The new React element to be rendered.
 * @param r - The new props of the element.
 * @param l - The context in which the element is being rendered.
 * @returns The updated or initialized React Fiber node.
 */
/**
 * Updates the component instance with new props and lanes, handling memoization and ref updates.
 * Compares current props with new props, updates flags, and delegates further processing if needed.
 *
 * @param {Object} e - The current component instance.
 * @param {Object} t - The update payload containing new props and other metadata.
 * @param {number} n - The render lane.
 * @param {Object} r - The new props to be applied.
 * @param {Object} l - The fiber root of the current update.
 */
/**
 * Handles reconciliation of a component's children and updates its state.
 *
 * This function processes the children of a given fiber node, updates their lanes,
 * and manages the memoized state. It handles different modes such as "hidden" and
 * performs operations like cache management and state initialization based on the
 * current context and flags.
 *
 * @param e - The current fiber node being processed.
 * @param t - The work-in-progress fiber node.
 * @param n - The lanes representing the update priority.
 * @returns The updated child fiber node after processing.
 */
/**
 * Initializes a dependency injection context and updates memoized state.
 */
/**
 * Updates the flags of a VNode based on its reference and the current element.
 * If the new reference is null, it checks if the existing element has a non-null reference
 * and updates the flags accordingly. Otherwise, it validates the reference type,
 * compares it with the existing element's reference, and updates the flags if they differ.
 *
 * @param {Object|null} e - The current element or null.
 * @param {Object} t - The VNode object containing reference and flags properties.
 */
/**
 * Processes input data and returns a result based on certain conditions and operations.
 *
 * This function performs several key steps including validating input parameters,
 * processing data with helper functions, setting flags, and returning either the processed child
 * or performing additional operations if specific conditions are met. It leverages multiple
 * utility functions to achieve its goal and handles edge cases such as null inputs.
 */
/**
 * Updates a component and its children, handling various lifecycle methods and state updates.
 *
 * This function performs several key operations:
 * - It initializes or updates the update queue for the component.
 * - It prepares the new child elements by reconciling them with the current ones.
 * - It processes context changes if necessary.
 * - It calls lifecycle methods like `componentDidMount` or `componentDidUpdate`.
 * - Finally, it either returns the updated component's child or performs additional updates based on the component's state.
 *
 * @param {Object} e - The current instance of the component being updated.
 * @param {Object} t - The fiber representing the component.
 * @param {Array} n - The new child elements to be reconciled.
 * @param {Object} r - Additional rendering context or options.
 * @param {Object} l - The lanes or priority levels for updating the component.
 * @param {Object} a - Flags indicating additional behaviors during the update process.
 */
/**
 * Handles the reconciliation and update of a React component instance.
 *
 * This function manages the lifecycle of a React component, including state updates, context handling,
 * and invoking lifecycle methods like `componentDidMount`, `componentDidUpdate`, etc. It also processes
 * props and state changes, and determines whether to re-render the component or skip it based on the
 * current state and props.
 *
 * @param e - The fiber node representing the current component instance.
 * @param t - The alternate fiber node used for reconciliation.
 * @param n - The React component class or function.
 * @param r - The initial props passed to the component.
 * @param l - The render lanes context.
 * @returns The updated state of the component instance.
 */
/**
 * Initializes UI components and returns the child element.
 */
/**
 * Creates an object with baseLanes and cachePool properties.
 */
/**
 * Calculates the child lanes for a given element, considering suspense context.
 */
/**
 * Handles the reconciliation of a fiber node and its children during rendering.
 *
 * This function processes the props, flags, and state of a fiber node to determine how to update or create child fibers.
 * It handles various scenarios such as hydration, suspense, error boundaries, and context propagation.
 *
 * @param e - The current fiber node being processed.
 * @param t - The work-in-progress fiber node that will be updated.
 * @param n - The render lanes indicating which parts of the tree need to be updated.
 */
/**
 * Sets up and returns a child component with specified mode.
 */
/**
 * Initializes and returns an element with specific properties.
 */
/**
 * Updates a component's child and state, then returns the updated child.
 */
/**
 * Updates lanes and propagates changes to the return fiber.
 */
/**
 * Updates the memoized state of a component.
 */
/**
 * Handles the reconciliation process for a fiber node in a React component tree.
 *
 * This function processes the child nodes of the given fiber, updates their states,
 * and manages the reveal order based on the specified strategy (forwards, backwards, or together).
 *
 * @param e - The current fiber node being processed.
 * @param t - The work-in-progress fiber node.
 * @param n - An instance of ReactNoopUpdateQueue.
 */
/**
 * Updates a fiber's child and dependencies based on the given parameters.
 *
 * This function handles updating the child lanes, setting dependencies, and ensuring consistency in the fiber tree structure.
 * It processes the child fibers recursively and updates their props.
 *
 * @param e - The current fiber node.
 * @param t - An object containing various properties such as dependencies and lanes.
 * @param n - A bitmask representing the lanes to be processed.
 * @returns The updated child fiber node, or null if no child is present or further processing is needed.
 * @throws Error If there is an inconsistency in the sibling structure of the fibers.
 */
/**
 * Checks if lanes match or dependencies are valid.
 */
/**
 * The Ji function processes a React fiber and its associated properties to update the fiber's state and perform necessary operations based on the fiber's type.
 *
 * It handles various types of fibers such as HostRoot, FunctionComponent, ClassComponent, etc., performing actions like mounting, updating, or hydrating components. The function also manages lanes for concurrent updates and handles exceptions related to invalid component types.
 *
 * @param e - The current fiber node being processed.
 * @param t - The work-in-progress fiber that may need updating.
 * @param n - The render lanes indicating the priority levels of the update.
 * @returns The updated fiber node after processing.
 */
/**
 * Sets a flag in the provided object.
 */
/**
 * Updates the flags of an element based on its type and loading state.
 *
 * If the element's type is not 'stylesheet' or if it has a specific loading state, it clears a flag.
 * Otherwise, it sets a specific flag. It also checks for certain conditions related to `is` and `oi.current`,
 * throwing an error if they do not meet the criteria.
 *
 * @param e - The element whose flags are being updated.
 * @param t - The type and state information of the element.
 */
/**
 * Updates flags and lanes based on given conditions.
 */
/**
 * Adjusts the tail pointers of a fiber's alternate structure based on the tail mode.
 *
 * This function modifies the tail pointers of the fiber to ensure that the correct nodes are marked as tails
 * according to the specified tail mode ("hidden" or "collapsed"). It traverses the sibling chain and updates
 * the pointers accordingly, potentially nullifying some sibling references.
 *
 * @param e - The fiber object containing tail information and structure.
 * @param t - The current node in the fiber's alternate structure.
 */
/**
 * Updates subtree flags and child lanes for a given fiber node.
 * Iterates through the children of the node, accumulating their lanes and subtree flags.
 * If the alternate child is present, it performs additional checks on subtree flags.
 *
 * @param {Object} e - The fiber node to update.
 * @returns {boolean} - True if the alternate child's child matches the current child, otherwise false.
 */
/**
 * Handles the reconciliation and update of a fiber node based on its tag and props.
 *
 * This function processes different types of fiber nodes (e.g., host components, class components)
 * to ensure they are correctly updated or created in the React component tree. It handles various
 * lifecycle methods, context updates, and error handling during the reconciliation process.
 *
 * @param e - The current fiber node being processed.
 * @param t - The alternate fiber node (previous state).
 * @param n - Additional data related to the update process.
 * @returns Null indicating the completion of the reconciliation step for the given fiber node.
 */
/**
 * Handles different cases based on the tag of the input object and updates its flags accordingly.
 *
 * This function processes an object 't' by examining its 'tag' property and performing various operations
 * such as updating flags, calling other functions, and throwing errors under specific conditions.
 *
 * @param e - The first parameter, used in flag calculations and comparisons.
 * @param t - An object with properties 'tag', 'flags', 'memoizedState', 'alternate', 'type'.
 * @returns The modified object 't' if certain conditions are met; otherwise, null.
 * @throws Error If the input object's 'alternate' is null and a specific condition is satisfied.
 */
/**
 * Handles different operations based on the tag of the provided object.
 *
 * This function processes various types of tags and performs corresponding actions,
 * such as calling other functions, setting flags, and executing specific logic blocks.
 *
 * @param e - An optional parameter that may be used in certain cases.
 * @param t - An object containing a 'tag' property which determines the operation to perform.
 */
/**
 * Updates effects in a fiber's update queue based on the provided bitmask.
 *
 * This function iterates through the effect list of the given fiber's update queue,
 * checking if each effect's tag matches the provided bitmask. If a match is found,
 * it executes the effect's creation function and stores the result as the effect's
 * instance for potential cleanup later. If an error occurs during this process, it
 * calls the `fc` function to handle the error.
 *
 * @param {number} e - A bitmask representing the type of effects to update.
 * @param {Object} t - The fiber containing the update queue to process.
 */
/**
 * Processes and cleans up effects in a React component's update queue.
 *
 * Iterates through the effect list, invoking destroy functions for effects that match the specified tag.
 * Handles exceptions during cleanup by calling fc with the current fiber and error.
 *
 * @param e - The tag used to identify which effects to process.
 * @param t - The fiber containing the update queue.
 * @param n - The next context for error handling.
 */
/**
 * Updates the component's queue and handles any exceptions.
 */
/**
 * Updates component properties and state, then calls componentWillUnmount if it exists.
 */
/**
 * Updates a reference in a React-like component based on its tag and state node.
 *
 * This function checks if the provided reference is not null. If it's not,
 * it determines the appropriate action based on the component's tag. For certain tags,
 * it extracts the state node from the component and assigns it to the reference.
 * If the reference is a function, it calls the function with the state node; otherwise,
 * it sets the current property of the reference to the state node. Any exceptions are caught
 * and passed to the `fc` function along with the component and error details.
 *
 * @param e - The component instance or configuration object containing ref, tag, and stateNode.
 * @param t - An additional parameter that is passed to the `fc` function in case of an error.
 */
/**
 * Cleans up references in a component's lifecycle.
 *
 * This function handles cleanup tasks for component references, ensuring that any attached functions are executed safely.
 * It also resets reference values to null and logs errors if the cleanup process fails.
 *
 * @param {Object} e - The component instance or context object containing reference and cleanup information.
 * @param {any} t - Additional context or data passed to the cleanup function, typically used for error logging.
 */
/**
 * Handles side effects after updating a component based on its type and props.
 *
 * This function checks the type of the component and performs specific actions:
 * - For 'button', 'input', 'select', and 'textarea' types, it focuses the element if autoFocus is set.
 * - For 'img' types, it sets the source or srcset attribute based on the presence of these props.
 *
 * @param e - An object containing information about the component update.
 */
/**
 * Updates the properties of a DOM element based on the provided new and old props.
 *
 * This function handles different HTML elements (like input, select, textarea, etc.)
 * and updates their attributes, values, and other properties accordingly. It also
 * manages side effects such as event handling and error checking for certain
 * properties like `dangerouslySetInnerHTML`.
 *
 * @param {Object} e - The element to update.
 * @param {string} t - The type of the element.
 * @param {Object} n - The new props to apply.
 * @param {Object} t - The old props to compare against.
 */
/**
 * Checks if a given element tag matches specific criteria.
 *
 * This function evaluates whether the provided element's tag is one of several predefined values,
 * or if it matches additional conditions related to its type and tag.
 *
 * @param {Object} e - The element object containing properties `tag` and `type`.
 */
/**
 * Traverses a React fiber tree to find and return the next fiber that meets certain conditions.
 *
 * This function uses a loop to navigate through the fiber nodes, checking conditions related to tags, flags,
 * and children. It continues traversing until it finds a node that matches the criteria or reaches the end
 * of the fiber structure. If no matching node is found, it returns null.
 *
 * @param e - The initial fiber node from which traversal begins.
 * @returns The next fiber node that meets the specified conditions, or null if none is found.
 */
/**
 * Recursively processes and appends or inserts a React element into the DOM.
 *
 * This function handles different types of React elements based on their tag type.
 * It appends or inserts the element before a specified target node, and recursively processes child elements.
 * Special handling is done for specific tag types like 5, 6, and 27.
 *
 * @param e - The current React element to process.
 * @param t - The target node where the element will be appended or inserted.
 * @param n - The container node where the root React component is attached.
 */
/**
 * Recursively processes child nodes of a given element and appends or inserts them into a target node.
 *
 * This function traverses the child nodes of an element, handling different types of nodes based on their tags.
 * It appends or inserts each child node into the specified target node. For certain node types (5 and 6),
 * it directly uses the stateNode as the element to be inserted. For other types, it recursively processes
 * child nodes until all siblings are handled.
 *
 * @param {Object} e - The current element being processed.
 * @param {Node|null} t - The reference node for insertion (null if appending).
 * @param {Node} n - The target node where children will be appended or inserted.
 */
/**
 * Updates a component's state node and attributes based on its type, memoized props, and error handling.
 */
/**
 * Handles various lifecycle and state management tasks for a component based on its tag.
 *
 * This function processes different component types and their states, performing actions like calling lifecycle methods,
 * updating queues, and handling rehydration logic. It handles cases where the component's state or props have changed,
 * and it manages specific flags that control additional operations.
 *
 * @param e - The fiber node representing the component.
 * @param t - The alternate fiber node, typically used to compare current and previous states.
 * @param n - An object containing flags and other properties relevant to the component's state and behavior.
 */
/**
 * Resets a fiber node and its alternate, clearing various properties.
 */
/**
 * Iterates through child nodes and applies Lu function.
 */
/**
 * Handles the unmounting of a Fiber node from the React reconciliation process.
 *
 * This function processes various types of Fiber nodes, performing actions such as removing DOM elements,
 * calling lifecycle methods, and cleaning up resources based on the node's type. It handles different
 * cases like HostComponent, ClassComponent, TextComponent, etc., and interacts with global state variables
 * like `Su`, `Nu`, and `Pu` to manage the unmounting process.
 *
 * @param e - The current Fiber node being processed.
 * @param t - The alternate Fiber node, used for comparison during reconciliation.
 * @param n - The Fiber node that is being unmounted.
 */
/**
 * Handles memoization and dehydration state checks for a given fiber node.
 * This function updates the memoizedState of the current fiber node if it is null,
 * by copying it from its alternate node's memoizedState, and then processes any dehydrated state.
 *
 * @param {Object} e - The current fiber node being processed.
 * @param {Object} t - The target fiber node where memoizedState might be updated.
 */
/**
 * Manages and caches promise handlers based on the tag of the input element.
 *
 * This function processes an element to determine its state node or retry cache,
 * then iterates over a list of tasks, binding a callback to each task and adding it
 * to the set if not already present. Each task is then handled with the bound callback.
 *
 * @param e - The input element whose tag determines processing logic.
 * @param t - An array of tasks to be processed and managed.
 */
/**
 * Processes deletions in a fiber tree and updates the state accordingly.
 *
 * This function iterates over each deletion in the provided `t.deletions` array,
 * traverses up the fiber tree to find the appropriate node, and performs necessary
 * operations such as calling `Lu` and updating return pointers. It handles different
 * types of nodes based on their tags and throws an error if no suitable node is found.
 *
 * @param e - The current fiber being processed.
 * @param t - The fiber root containing the deletions array and subtree flags.
 */
/**
 * Handles various operations based on the tag of the element and its flags.
 *
 * This function processes different types of elements (e.g., titles, links, meta tags)
 * and updates their states accordingly. It also manages side effects like updating
 * styles and text content, and handles potential exceptions during these operations.
 *
 * @param e - The element to process.
 * @param t - The container or context information for the element.
 */
/**
 * Updates the state and flags of a component based on its type and lifecycle.
 *
 * The function handles different types of components (like HostComponent, ClassComponent) by updating their states,
 * flags, and containers accordingly. It also manages error handling during this process.
 *
 * @param e - An object containing component metadata and state information.
 */
/**
 * Recursively traverses and processes child nodes of a given element.
 *
 * This function checks if an element has subtree flags set, then iterates through its children.
 * For each child, it recursively calls itself, resets the state node if the child is a host component with specific flags set,
 * and continues to process the sibling nodes.
 */
/**
 * Iterates through child nodes and calls Cu with specific parameters if subtreeFlags condition is met.
 */
/**
 * Recursively processes child nodes of a given node in a tree structure.
 *
 * This function iterates through each child of the input node, performs specific actions based on the tag type,
 * and recursively processes further children or sibling nodes. The actions include invoking lifecycle methods,
 * handling component unmounting, and updating state nodes.
 *
 * @param {Object} e - The starting node from which to begin processing its children.
 */
/**
 * Recursively processes child nodes of a given fiber node in a React reconciliation context.
 *
 * This function traverses through each child node of the provided fiber, handling different types of components
 * such as class components, functional components, and host elements. It performs lifecycle methods invocation,
 * updates state queues, and handles error boundaries if necessary. The function also manages effects and context
 * propagation based on specific flags and states.
 *
 * @param e - The current fiber node being processed.
 * @param t - The child fiber node of the current fiber.
 * @param n - A boolean indicating whether subtree flags should be considered for certain operations.
 */
/**
 * Updates cache pool references between two components.
 * Transfers ref count from old component's cache pool to new component's cache pool if they differ.
 *
 * @param {Object} e - The old component instance.
 * @param {Object} t - The new component instance.
 */
/**
 * Updates cache reference and increments refCount if necessary.
 */
/**
 * Processes child nodes of a tree if subtree flags indicate it.
 */
/**
 * Handles the processing of various types of nodes based on their tags and flags.
 *
 * This function processes different node types by calling `Wu` for most cases,
 * with additional logic depending on the node's tag and flags. It handles
 * specific actions like updating cache, invoking lifecycle methods, and managing
 * visibility states.
 *
 * @param e - The current fiber node being processed.
 * @param t - The alternate fiber node or null.
 * @param n - The parent component instance or context.
 * @param r - Additional rendering information or options.
 */
/**
 * Recursively traverses and processes child nodes of a given tree node.
 *
 * This function iterates through each child node of the provided parent node (t),
 * processing them based on their tag type. It handles different types of tags
 * like 0, 11, 15, 23, 22, 24, and others by calling appropriate helper functions
 * like `qu` and updating visibility flags as needed.
 *
 * @param e - The parent node's environment or context.
 * @param t - The current parent node to process.
 * @param n - Additional parameter passed to helper functions.
 * @param r - Another additional parameter passed to helper functions.
 * @param l - A boolean flag indicating if subtree flags should be processed.
 */
/**
 * Recursively traverses and processes child nodes of a given tree node.
 *
 * This function iterates over each child node of the input node, processing them based on their tag type.
 * It handles specific cases where certain flags are set, such as calling `$u` or `Vu` functions accordingly.
 *
 * @param e - The parent node context.
 * @param t - The current tree node being processed.
 */
/**
 * Processes child nodes if subtree flags indicate so.
 */
/**
 * Handles updates for a specific element based on its tag and state.
 *
 * The function processes different tags (26, 5, 3, 4, 22) to perform various operations such as updating stylesheets,
 * handling preloads, and managing loading states. It also manages the lifecycle of DOM elements and updates flags accordingly.
 *
 * @param e - An object representing the element with properties like tag, memoizedState, memoizedProps, stateNode, alternate, etc.
 */
/**
 * Resets sibling and child properties of elements in a linked list structure.
 */
/**
 * Processes a node and its children based on specific flags and subtree conditions.
 *
 * This function checks if certain flags are set in the input node and performs
 * deletion operations if required. It also processes the subtree of the node
 * recursively.
 *
 * @param {Object} e - The node to process, containing properties like `flags`,
 *                    `subtreeFlags`, `deletions`, `child`, and `sibling`.
 */
/**
 * Processes a node based on its tag and flags.
 *
 * The function handles different cases for various tags and modifies the node's state accordingly.
 * It also checks visibility flags and calls specific functions like Zu, su, and es based on conditions.
 *
 * @param e - A node object with properties including `tag`, `flags`, `memoizedState`, `stateNode`, and `return`.
 */
/**
 * Recursively processes a fiber node and its children.
 *
 * This function handles different types of fiber nodes, including deletions,
 * visibility changes, and recursive processing of child nodes. It updates the
 * state and flags of the nodes accordingly.
 *
 * @param e - The current fiber node to process.
 */
/**
 * Traverses and processes nodes in a tree structure based on their tags and memoized states.
 *
 * The function iterates over a linked list of nodes (`Eu`) and performs actions based on the node's tag.
 * It handles different cases such as updating cache pools, managing cache references, and cleaning up nodes.
 * The traversal continues until all child nodes are processed.
 *
 * @param e - The starting node in the traversal.
 * @param t - An additional parameter used in the processing of certain tags.
 */
/**
 * Evaluates and returns a value based on specific conditions involving bitwise operations and null checks.
 *
 * The function first checks if `ls` is true (using bitwise AND with 2) and if `is` is not zero.
 * If both conditions are met, it returns the bitwise AND of `is` and its negation (`-is`).
 * If `M.T` is not null, it then checks if `jl` is not zero; if so, it returns `jl`, otherwise it calls `Lc()`.
 * If none of the above conditions are met, it returns the result of calling `Oe()`.
 */
/**
 * Initializes a flag and returns a value based on certain conditions.
 *
 * This function checks if `ys` is zero and sets it to a specific value based on bitwise operations and conditional checks involving `is`, `il`, and `_e()`.
 * It then retrieves the current object from `oi`, updates its flags if it exists, and returns the value of `ys`.
 */
/**
 * Performs a series of operations on an element based on various flags and conditions.
 *
 * This function checks if the element is valid and whether certain flags are set or cleared. It updates
 * state variables, triggers commit events, and processes pending changes based on the context provided.
 *
 * @param e - The element to be processed.
 * @param t - A flag that might be used for conditional logic (not utilized in the function).
 * @param n - Another flag indicating a specific state or action.
 */
/**
 * Executes a complex reconciliation process for a React fiber node.
 *
 * This function handles various stages of the reconciliation process, including error handling,
 * state updates, and scheduling tasks based on different lanes and flags. It manages the execution
 * context by updating global variables and flags, and it ensures that the work loop continues until
 * all pending lanes are processed or an interruption occurs.
 *
 * @param e - The React fiber node to process.
 * @param t - Lanes representing the current work in progress.
 * @param n - A boolean indicating whether the context should be reset after processing.
 * @returns void
 * @throws Error If there is a critical error during reconciliation or if certain conditions are not met.
 */
/**
 * Initializes a component with various configuration options and stylesheets.
 *
 * This function sets up a timeout handle, checks subtree flags, and processes stylesheets.
 * If necessary, it schedules a pending commit and cancels any existing ones.
 * It then calls the lifecycle method `lc` to update the component state.
 *
 * @param e - Component instance or context object.
 * @param t - Configuration object for the component.
 * @param n - Additional configuration parameters.
 * @param l - Another set of configuration parameters.
 * @param a - Further configuration options.
 * @param o - Component reference or identifier.
 * @param i - Callback function for state updates.
 * @param u - Internal state of the component.
 * @param s - Configuration flags or settings.
 * @param c - Flag indicating whether to suppress certain actions.
 * @param d - Additional parameters or data.
 * @param f - Subtree configuration flags.
 * @param p - More configuration options.
 * @param m - Final set of configuration parameters.
 */
/**
 * Checks if a fiber tree is complete and consistent with its snapshot values.
 *
 * This function traverses the fiber tree starting from the given root fiber `e`.
 * It checks each fiber's updateQueue and its stores against their snapshots.
 * If any snapshot check fails or encounters an error, it returns false.
 * The traversal continues until all branches are checked or a complete and consistent state is confirmed.
 *
 * @param e - The root fiber to start the consistency check from.
 * @returns A boolean indicating whether the fiber tree is complete and consistent with its snapshots.
 */
/**
 * Updates lanes and expiration times based on given parameters.
 */
/**
 * Checks a condition involving bitwise operations and function calls.
 */
/**
 * Handles cleanup and state resetting for a WebSocket-like structure.
 */
/**
 * Manages and updates various states and handles in a React component update process.
 *
 * This function processes timeout handling, cancellation of pending commits,
 * state synchronization, lane management, and flag manipulation based on the input parameters.
 * It ensures that the component's internal state is correctly updated and that any necessary
 * cleanup or re-scheduling is performed.
 */
/**
 * Updates the state based on the provided key and value.
 *
 * This function handles different types of input values for updating an element's state.
 * It sets global variables like `ka`, `M.H`, and `us` based on the input type.
 * If the input is a promise, it sets a specific flag. Otherwise, it initializes
 * other flags and calls a helper function to update the element's current state.
 *
 * @param {any} e - The element or context to be updated.
 * @param {any} t - The value used for updating the element's state.
 */
/**
 * Restores or saves the current state of `M.H`.
 */
/**
 * Saves the current value of M.A and returns it, then resets M.A to ns.
 */
/**
 * Updates the state based on various conditions and flags.
 *
 * This function checks several bitwise operations and conditions involving global variables
 * `is`, `oi`, `ds`, `hs`, `gs`, `as`, and `ys`. It updates the state of `ms` and `ds`,
 * and potentially calls `$s` with specific arguments if certain conditions are met.
 */
/**
 * Handles state transitions and error management during execution of a command.
 *
 * This function manages the state of a command by handling different states based on the `us` value,
 * updating global variables, and executing necessary cleanup or error handling routines. It also manages
 * shell suspension counters and resets certain global states if no operation is ongoing.
 *
 * @param e - An object representing the execution context or environment.
 * @param t - A boolean flag indicating whether to perform additional operations.
 * @param n - A boolean flag that determines whether to exit after processing.
 * @returns The final state of the `ms` variable after processing all states.
 */
/**
 * Iterates while os is not null, calling Js with os as argument.
 */
/**
 * Continuously processes elements from os using Js until os is null or te is true.
 */
/**
 * Updates memoized props and processes pending state for the given element.
 */
/**
 * Updates the element's state based on its tag and pending properties.
 *
 * This function handles different types of elements by switching on their tags,
 * updating their alternate props, and potentially re-rendering or initializing them.
 * It also sets up memoized props and cleans up null elements.
 *
 * @param e - The element to be updated.
 */
/**
 * Handles error boundaries and updates component states in a React-like framework.
 *
 * This function processes errors, updates component flags, and manages lanes for rendering.
 * It checks conditions related to component types, flags, and lifecycle methods like getDerivedStateFromError and componentDidCatch.
 * If an error occurs, it logs the error and updates the component state accordingly.
 * It also handles transitions and retry queues for asynchronous operations.
 *
 * @param e - The current fiber node.
 * @param t - The thrown value or error.
 * @param n - The lanes to process.
 * @param l - The event time.
 */
/**
 * Iterates through a linked list of nodes, processing each one based on its flags and state.
 *
 * The function processes nodes by checking their flags and performing specific actions like calling `rc` with `cs`
 * if the flag 32768 is set. It also handles transitions between nodes, updating pointers and conditions until
 * a certain stopping condition is met or all nodes have been processed.
 */
/**
 * Iterates through a fiber tree to find and return a specific alternate node or null if none is found.
 * Updates flags of nodes during traversal and sets global variables `ms` and `os`.
 *
 * @param e - The current fiber node being processed.
 * @param t - A boolean flag indicating whether the iteration should stop after processing the first node.
 */
/**
 * Updates the internal state of a React component and handles various lifecycle events.
 *
 * This function manages the pending commit, processes updates, and handles errors.
 * It updates lanes, suspends components, and resets certain flags and counters.
 * The function also ensures that the DOM is in sync with the updated component state.
 *
 * @param e - The current fiber node.
 * @param t - The next fiber node to be processed.
 * @param n - Lanes representing the priority levels of updates.
 * @param l - A set of flags indicating various states and actions.
 * @param a - Additional lanes for processing.
 * @param o - The root fiber node.
 * @param i - Flags related to error recovery.
 * @param u - Expiration times for different lanes.
 * @param s - Hidden updates for specific lanes.
 */
/**
 * Handles the logic based on a condition and updates various global variables.
 *
 * This function checks if `zs` is equal to 1, then sets it to 0. It performs operations involving
 * flags, subtreeFlags, and focused elements. It also manages selection ranges and scrolling positions,
 * focusing on specific DOM elements. The function includes complex logic for handling selections
 * and ensuring proper state management.
 *
 * @returns void
 */
/**
 * Resets a counter and updates rendering flags based on certain conditions.
 *
 * This function checks if `zs` equals 2, then resets it to 0. It retrieves values from variables `e`, `t`, and `n`,
 * and determines if specific flags are set in `t.flags`. Depending on these conditions, it temporarily adjusts
 * rendering settings, invokes `Cu` with relevant parameters, and restores the original settings afterward.
 * Finally, it sets `zs` to 3.
 */
/**
 * Updates internal state and performs various operations based on the value of `zs`.
 *
 * This function checks if `zs` is 4 or 3, sets `zs` to 0, and calls `ne()`. It then processes pending lanes,
 * updates fiber root states, and handles recoverable errors. Finally, it manages subtree flags, clears
 * certain variables, and increments counters based on specific conditions.
 *
 * @returns void
 */
/**
 * Updates pooled cache lanes and clears the cache if necessary.
 */
/**
 * Executes a sequence of operations without returning any value.
 */
/**
 * Executes a series of operations to process and validate fiber root data.
 *
 * This function checks if the `zs` variable is equal to 5, returning false if not.
 * It then saves the current state of `Ns` and `Ls`, resetting `Ls` to 0.
 * The function calculates the length of `Ts`, updates global variables `F.p` and `M.T`,
 * and handles potential errors during the process.
 *
 * @returns A boolean indicating whether the operations were successful.
 * @throws Error If there is an issue with processing the fiber root or if `zs` is not equal to 5.
 */
/**
 * Updates a component and its state based on given parameters.
 */
/**
 * Handles error boundaries and updates component state based on error handling lifecycle methods.
 *
 * This function checks if the current node or its parent nodes have specific tags and handle errors accordingly.
 * If a node with tag 3 is found, it calls `dc` to process the error. For nodes with tag 1, it checks for error boundaries
 * by looking for `getDerivedStateFromError` or `componentDidCatch` methods, updates the state, and processes the error.
 *
 * @param e - The current node being processed.
 * @param t - The parent node of the current node.
 * @param n - Additional context or state information.
 */
/**
 * Processes a ping operation and updates the cache.
 */
/**
 * Update the ping cache and lane states based on given parameters.
 *
 * This function clears a specific entry from the ping cache, updates the pinged lanes,
 * adjusts the warm lanes, and checks conditions to update internal flags and state variables.
 * It also calls another function _c with the provided instance.
 *
 * @param e - An object containing cache and lane information.
 * @param t - A key used to identify an entry in the ping cache.
 * @param n - A bitmask representing lanes.
 */
/**
 * Initializes or updates an element based on given parameters.
 */
/**
 * Updates a component's lane based on its memoized state and calls hc with the updated lane.
 */
/**
 * Handles the removal of a retry entry from various state nodes based on the element's tag.
 *
 * This function checks the element's tag to determine which state node or cache to update.
 * It then removes the specified item from that state node or cache and calls hc with the element and lane.
 *
 * @param e - The element object containing information about the component.
 * @param t - The retry entry to be removed.
 */
/**
 * Updates the linked list and triggers a processing function based on conditions.
 *
 * This function checks if the input `e` is not equal to `vc` and if its `next`
 * property is null. If both conditions are true, it either initializes the linked
 * list with `e` or appends `e` to the end of the list. It then sets a flag `kc`
 * to true and checks if `wc` is false, in which case it sets `wc` to true and
 * schedules a task using `pd`. The task conditionally calls either `J(ae, Cc)` or
 * `zc()` based on the value of `ls`.
 */
/**
 * Process pending lanes and updates for a given Fiber node.
 *
 * This function iterates over the pending lanes and suspended lanes of the current Fiber node,
 * determining which lanes need to be processed. It processes these lanes by calling Tc with the appropriate flags.
 * The loop continues until no more lanes are left to process.
 *
 * @param e - The lane number or a bitmask representing different types of work.
 * @param t - A parameter that is not used within the function (possibly intended for future use).
 */
/**
 * Calls the zc function.
 */
/**
 * Processes a sequence of elements and updates flags based on certain conditions.
 *
 * This function initializes several variables, checks for a specific event type,
 * iterates through a linked list structure, and updates global flags and states accordingly.
 * It handles different cases based on the state of `e` and the bitmask `a`.
 *
 * @returns void
 */
/**
 * Manages and updates the lanes and priorities in a work loop based on expiration times and pending tasks.
 *
 * This function iterates over lanes, updating their expiration states and handling callbacks based on priority levels.
 * It checks for suspended and pinged lanes, updates expired lanes, and sets up new callback nodes if necessary.
 *
 * @param e - An object containing various properties related to the work loop state.
 * @param t - A timestamp used for determining expiration times.
 * @returns The updated callback priority or null if no further processing is needed.
 */
/**
 * Processes a callback node based on various conditions and priorities.
 *
 * This function checks if certain conditions are met (like `zs` being 0 or 5) to determine if the callback should be processed.
 * It also ensures that the callback node is not changed during execution. If the priority calculation returns 0, it returns null.
 * Otherwise, it updates the callback state and potentially binds a new function for further processing.
 *
 * @param e - An object containing callback information.
 * @param t - A parameter passed to `js` function, likely related to timing or scheduling.
 * @returns Either null or a bound function for further processing.
 */
/**
 * Handles processing if conditions are met.
 */
/**
 * Returns the value of xc, initializing it with _e if it's currently 0.
 */
/**
 * Determines the appropriate value based on the input type.
 *
 * This function checks if the input is null, undefined, a symbol, or a boolean,
 * returning null in those cases. If the input is a function, it returns the function itself.
 * Otherwise, it converts the input to a string and returns it.
 *
 * @param {any} e - The input value to be processed.
 */
/**
 * Creates a temporary input element, appends it to the form, and returns a FormData object.
 */
/**
 * Processes a list of event objects by invoking their listeners in sequence or reverse, based on a flag.
 *
 * This function iterates over an array of event objects. For each event, it processes its listeners either forward or backward,
 * depending on the provided flag. It stops processing further listeners for an event if propagation is stopped.
 * If any listener throws an error, it catches and logs the error using `vi`.
 *
 * @param e - An array of event objects, where each object contains an 'event' property and a 'listeners' array.
 * @param t - A bitmask flag; when the second bit (value 4) is set, listeners are processed in reverse order.
 */
/**
 * Adds a bubble event to the target object if not already present.
 */
/**
 * Updates a component with specified flags and options.
 */
/**
 * Marks an element or document as processed and updates related events.
 *
 * This function checks if the given element or its owner document has already been processed.
 * If not, it marks them as processed and triggers update functions for various event types except "selectionchange".
 * Additionally, it ensures that the "selectionchange" event is updated for the document.
 *
 * @param {Element} e - The target element to process.
 */
/**
 * Binds an event listener to an element based on the provided parameters.
 *
 * This function determines the appropriate listener function based on the type of event (`t`).
 * It then binds the necessary parameters to this listener and adds it to the target element (`e`).
 * Depending on the event type, it sets up the event listener with specific options such as capture phase and passive behavior.
 *
 * @param e - The target element to which the event listener will be added.
 * @param t - The type of event for which the listener is being set.
 * @param n - Additional parameters to be bound to the listener function.
 * @param r - A flag indicating whether to use capture phase and passive behavior.
 */
/**
 * Handles event delegation and dispatches events to appropriate listeners.
 *
 * This function manages complex event handling logic, including event propagation,
 * target validation, and listener invocation. It processes various DOM events and
 * ensures that events are dispatched correctly based on the event type and context.
 *
 * @param e - The event type or name.
 * @param t - Flags or options for event processing.
 * @param n - The event object containing details about the event.
 * @param r - The current fiber node in the React reconciliation process.
 * @param l - Additional data or configuration related to the event context.
 */
/**
 * Creates an object representing an event context.
 */
/**
 * Traverses up the React fiber tree to find and collect nodes based on capture names.
 *
 * This function iterates through the fiber nodes starting from a given node `e`.
 * It checks if the current node is of type 5, 26, or 27. If so, it attempts to find
 * a capture with the name `t` and another capture with the suffix "Capture". If found,
 * it adds these captures to the result array `r`. The function continues this process
 * until it reaches a node of type 3 or null.
 *
 * @param e - The starting fiber node.
 * @param t - The base name used for finding specific captures.
 * @returns An array of captured nodes based on the specified criteria.
 */
/**
 * Traverses a linked list to find a specific node tag.
 *
 * This function iterates through a linked list represented by nodes, starting from the given node `e`.
 * It continues moving backwards (using `return`) until it finds a node with a tag of 5 or 27. If such a node is found,
 * it returns that node; otherwise, it returns null.
 *
 * @param {Object} e - The initial node to start traversal from.
 * @returns {Object|null} - The node with a tag of 5 or 27, or null if no such node is found.
 */
/**
 * Processes a React fiber tree to gather listeners for an event.
 *
 * This function traverses the React fiber tree from a given node up to its root,
 * collecting listeners associated with a specific event name. It handles different
 * types of fiber nodes and skips certain tags. If listeners are found, they are added
 * to the provided event list.
 *
 * @param e - The list to store event listener objects.
 * @param t - The React synthetic event object.
 * @param n - The current fiber node in the traversal.
 * @param r - The alternate fiber node used for comparison.
 * @param l - A flag indicating whether to process listeners in reverse order.
 */
/**
 * Replaces certain patterns in a string with newline and empty strings respectively.
 */
/**
 * Compares two values after applying a transformation function Xc to them.
 */
/**
 * Placeholder function with no implementation.
 */
/**
 * Sets an attribute or property on a DOM element based on the given parameters.
 *
 * This function handles various types of attributes and properties, including special cases like `style`, `data`, and event handlers.
 * It also manages boolean attributes and ensures that certain attributes are set correctly for specific HTML elements.
 *
 * @param e - The target DOM element to modify.
 * @param t - The tag name or type of the element.
 * @param n - The attribute or property name to set.
 * @param l - The value to assign to the attribute or property.
 * @param a - Additional options for certain attributes (e.g., form-related attributes).
 * @param o - An optional callback function.
 */
/**
 * Handles setting properties on an element based on the provided namespace, property name, and value.
 *
 * This function processes various HTML attributes and event listeners, updating the DOM accordingly.
 * It handles special cases like `style`, `dangerouslySetInnerHTML`, and children content.
 * For other properties, it either sets them directly on the element or adds/removes event listeners.
 *
 * @param e - The target element to modify.
 * @param t - The namespace for the property (e.g., 'react', 'html').
 * @param n - The name of the property to set.
 * @param l - The value of the property.
 * @param a - An object containing additional attributes or metadata about the element.
 * @param o - A reference to the previous handler function, used for event listener management.
 */
/**
 * Handles setting properties and attributes on a DOM element based on its type.
 *
 * This function processes different HTML elements and sets their attributes and properties accordingly.
 * It handles specific elements like `input`, `select`, `textarea`, and others with unique attribute handling rules.
 * For elements like `img` and `iframe`, it attaches event listeners for load and error events.
 *
 * @param e - The DOM element to modify.
 * @param t - The type of the DOM element.
 * @param n - An object containing properties and attributes to set on the element.
 */
/**
 * Returns the element if it's a document node, otherwise returns its owner document.
 */
/**
 * Determines the namespace identifier for a given URI.
 *
 * This function checks the input URI against known namespaces and returns a corresponding integer value.
 * If the URI matches the SVG namespace, it returns 1; if it matches the MathML namespace, it returns 2.
 * For any other URI, it defaults to returning 0.
 *
 * @param {string} e - The URI string to be checked against known namespaces.
 */
/**
 * Determines an identifier based on input parameters e and t.
 *
 * This function checks if e is 0 and returns a specific value based on the value of t.
 * If e is 1 and t is "foreignObject", it returns 0. Otherwise, it returns 1.
 *
 * @param {number} e - A numeric value used for conditional checks.
 * @param {string} t - A string value used for conditional checks.
 * @returns {number} - An identifier determined by the input values.
 */
/**
 * Determines if a given element should be treated as a textarea or has specific children types.
 *
 * This function checks if the element type is 'textarea' or 'noscript', or if the children of the element are
 * of type string, number, bigint, or if the dangerouslySetInnerHTML property is an object with a non-null __html property.
 *
 * @param {string} e - The type of the HTML element.
 * @param {Object} t - An object containing properties related to the element's children and dangerouslySetInnerHTML.
 */
/**
 * Schedules an error to be thrown after a timeout.
 */
/**
 * Checks if the input string is "head".
 */
/**
 * Removes a node and its related nodes from the DOM based on specific conditions.
 *
 * This function iterates through sibling nodes, removes them if they match certain criteria,
 * and updates counters and flags accordingly. It handles special cases like script, style, and link tags.
 *
 * @param e - The parent element from which nodes will be removed.
 * @param t - The initial node to process.
 */
/**
 * Recursively processes and removes certain child nodes from a given element.
 *
 * This function iterates over each child of the provided element, removing nodes that are not HTML, HEAD,
 * BODY, SCRIPT, STYLE, or LINK (with rel="stylesheet"). It also recursively calls itself on HTML, HEAD,
 * and BODY elements to process their children.
 *
 * @param e - The parent element whose children will be processed.
 */
/**
 * Checks if the event data is "$!" or if it's "$?" and the document is complete.
 */
/**
 * Traverses sibling nodes to find a specific node or condition.
 *
 * This function iterates over sibling nodes starting from the given element `e`.
 * It breaks if it finds an element node (nodeType 1) or text node (nodeType 3).
 * For comment nodes (nodeType 8), it checks specific data values and may break or return null based on these conditions.
 *
 * @param e - The starting sibling node to evaluate.
 * @returns The found node that meets the conditions, or null if no such node is found.
 */
/**
 * Searches for a specific sibling element in the DOM tree based on node type and content.
 *
 * This function iterates through the previous siblings of the given element, looking for
 * comment nodes with specific data values ("$", "$!", "$?", or "/$"). It maintains a counter
 * (`t`) to track the depth of nested conditions. If it finds a matching comment node at
 * the top level (counter `t` is 0), it returns that node. Otherwise, it continues searching.
 *
 * @param {Node} e - The starting element whose previous siblings will be searched.
 * @returns {Node|null} - The matched comment node or null if no match is found.
 */
/**
 * Retrieves a specific element from the document based on the given type.
 *
 * This function first calls `ad(n)` to initialize or retrieve the document object (`t`).
 * It then checks the value of `e` and returns the corresponding element:
 * - If `e` is "html", it returns the document's root element (`t.documentElement`).
 * - If `e` is "head", it returns the head element of the document (`t.head`).
 * - If `e` is "body", it returns the body element of the document (`t.body`).
 *
 * @param e - The type of element to retrieve ("html", "head", or "body").
 * @param t - The document object, initially undefined and set by calling `ad(n)`.
 * @param n - A parameter passed to the function `ad`, used to initialize or retrieve the document.
 * @returns The requested DOM element.
 * @throws Error If the requested element type is not supported or if the corresponding element is not found.
 */
/**
 * Removes all attributes from an element and then calls $e on it.
 */
/**
 * Retrieves the root node of an element, or the document if the element is a document.
 */
/**
 * Adds a link element to the document's head if it doesn't already exist.
 *
 * This function checks if a link with the specified attributes already exists in the document.
 * If it does not, it creates a new link element with the given relationship (`rel`), href, and optional cross-origin attribute,
 * then appends it to the document's head. It uses utility functions like `Nd`, `bt`, `Ed.has`, `nd`, and `Qe` to achieve this.
 *
 * @param {string} e - The rel attribute for the link element.
 * @param {string} t - The href attribute for the link element.
 * @param {string|null} n - The optional cross-origin attribute for the link element.
 */
/**
 * Handles different types of asset loading and processing based on input parameters.
 *
 * This function processes various types of assets such as styles, links, and scripts. It checks the type of asset,
 * validates input properties, and manages hoisting and preloading of resources. The function throws errors for invalid inputs
 * or conflicting states.
 *
 * @param e - The type of asset to process ('meta', 'title', 'style', 'link', 'script').
 * @param t - A boolean indicating if the asset is hoisted or a reference to an element.
 * @param n - An object containing properties like href, rel, precedence, async, src, etc., depending on the asset type.
 * @param l - A reference to another asset instance or null.
 * @returns An object representing the processed asset or null if certain conditions are met.
 * @throws Error If required parameters are missing or in an invalid state.
 */
/**
 * Generates an href attribute with a value based on the input.
 */
/**
 * Constructs a CSS selector for a link element with a specific rel attribute value.
 */
/**
 * Modifies an object by setting a "data-precedence" attribute and nullifying the precedence property.
 */
/**
 * Returns a string in the format '[src="{base64EncodedInput}"]'.
 */
/**
 * Appends a string to "script[async]" and returns the result.
 */
/**
 * Handles the creation and management of different types of media elements in a document.
 *
 * This function processes elements based on their type, such as 'style', 'stylesheet', 'script', or 'void'.
 * It checks if an instance already exists, creates new ones if necessary, and appends them to the document.
 * The function also handles loading states for stylesheets and ensures that script elements are executed correctly.
 *
 * @param e - The target element where the media will be appended or managed.
 * @param t - An object containing metadata about the media type, instance state, and loading flags.
 * @param n - Details of the media to be processed (e.g., href, src, precedence).
 * @returns The created or existing media instance.
 * @throws Error If an unsupported media type is encountered.
 */
/**
 * Inserts an element into a DOM node based on specified precedence rules.
 *
 * This function searches through all `link[rel="stylesheet"][data-precedence]` and `style[data-precedence]`
 * elements within the given DOM node to find the appropriate insertion point. It inserts the provided
 * element either before the first such element that matches the specified precedence or at the beginning
 * of the head or body section if no matching element is found.
 *
 * @param {Node} e - The element to be inserted.
 * @param {string} t - The precedence value to match against `data-precedence` attributes.
 * @param {Node} n - The DOM node within which to perform the search and insertion.
 */
/**
 * Copies optional properties from source to target element.
 */
/**
 * Copies properties from source to target if they are null or undefined.
 */
/**
 * Retrieves elements from a given node based on tag name and attribute value.
 *
 * This function first checks if a global map `Ud` exists, creating it if necessary.
 * It then retrieves or creates a map for the specified namespace within `Ud`.
 * If the element has already been processed under this key, it returns the cached result.
 * Otherwise, it iterates over all elements with the given tag name, filtering out unwanted elements,
 * and groups them by a computed key based on the attribute value. The results are stored in the map.
 *
 * @param e - The tag name of the elements to retrieve.
 * @param t - The attribute name used for grouping elements.
 * @param n - The parent node from which to start searching for elements.
 * @returns A map where keys are computed based on the attribute value and values are arrays of matching elements.
 */
/**
 * Inserts a node before a specified target element in the document's head.
 */
/**
 * Checks if a stylesheet is fully loaded or if it's not a stylesheet.
 */
/**
 * Represents a class or object.
 */
/**
 * Decrements count and processes stylesheets or unsuspend callback if count reaches zero.
 */
/**
 * Updates stylesheets and processes elements if unsuspend is not null.
 */
/**
 * Handles the loading and management of resources based on their precedence.
 *
 * This function checks if the loading state allows further operations, retrieves or initializes a map for managing resources,
 * iterates over existing link and style elements to set up precedence mappings, updates the map with new resources,
 * sets up event listeners for load and error events, and inserts the resource into the DOM at the correct position.
 *
 * @param e - The parent element where resources will be managed or inserted.
 * @param t - An object containing an instance and a state property with a loading flag.
 */
/**
 * Initializes a new instance of Xd with provided parameters.
 */
/**
 * Initializes a Zd instance and configures its state.
 */
/**
 * Sets or returns a value based on the input parameter.
 */
/**
 * Processes a set of parameters and updates context and callback properties.
 *
 * This function performs several operations: it initializes a context, sets up a payload,
 * assigns a callback if provided, and then processes the request using another function.
 * The processing involves checking conditions and making asynchronous calls.
 */
/**
 * Updates the retry lane of a given state object if necessary.
 *
 * The function checks if the provided state object has a non-null memoizedState and a dehydrated property.
 * If both conditions are met, it compares the current retryLane with the provided lane value 't'.
 * It updates the retryLane to be the maximum of its current value and 't', unless the retryLane is already zero or greater than 't'.
 *
 * @param {Object} e - The state object containing memoizedState and dehydrated properties.
 * @param {number} t - The lane value to compare against the current retryLane.
 */
/**
 * Calls `tf` with the given arguments and, if `e.alternate` exists, calls `tf` again with `e.alternate`.
 */
/**
 * Handles processing for elements with a specific tag.
 */
/**
 * Sets temporary values and calls uf function within a try-finally block.
 */
/**
 * Resets module state and executes a function with given parameters.
 */
/**
 * Handles various event types and updates component states accordingly.
 *
 * This function processes different events like focusin, dragenter, mouseover,
 * pointerover, and gotpointercapture. It manages state updates, dehydration checks,
 * and propagation control based on the event type and target element.
 *
 * @param e - The event object.
 * @param t - Event flags or types.
 * @param n - Additional parameters related to the event handling.
 * @param r - Target element reference.
 */
/**
 * Applies transformation and returns result.
 */
/**
 * Updates the current context with a new value and returns it if valid.
 *
 * This function processes an input `e`, validates it using `Ve`, retrieves its associated context,
 * and checks various conditions related to the tag of the context. If the conditions are met, it updates
 * the global variable `cf` and returns the processed value.
 *
 * @param e - The input value to be processed.
 * @returns The updated context value if valid, otherwise null.
 */
/**
 * Determine a numeric value based on the input event type and additional conditions.
 *
 * This function uses a switch statement to return specific values based on the input event type.
 * For certain events, it further checks additional conditions using another switch statement involving `le()`.
 *
 * @param e - The event type as a string.
 * @returns A numeric value corresponding to the event type and conditions.
 */
/**
 * Handles event management for pointer and focus-related events.
 *
 * This function processes different types of events such as focus, drag, mouse, and pointer events.
 * It updates internal state variables or sets based on the event type and target.
 *
 * @param {string} e - The event type (e.g., "focusin", "dragenter").
 * @param {Event} t - The event object containing additional information like pointer ID.
 */
/**
 * Updates or initializes an event object with given parameters.
 *
 * This function checks if the provided event is null or if its nativeEvent does not match the current one.
 * If either condition is true, it creates a new event object with the specified properties and processes the target container.
 * Otherwise, it updates the eventSystemFlags of the existing event and ensures the target container is included in the targetContainers array.
 *
 * @param {Object|null} e - The event object to update or initialize.
 * @param {*} t - A parameter used for determining the blockedOn state of the event.
 * @param {string} n - The name of the DOM event.
 * @param {number} r - Flags indicating the event system configuration.
 * @param {*} l - The target container associated with the event.
 * @param {*} a - The native event object.
 */
/**
 * Handles event processing and updates blockedOn state based on target element and its attributes.
 *
 * This function processes an event to determine if it should block further execution based on the target element's properties and nested components. It checks for specific tags and states, updating the `blockedOn` property of the event context accordingly.
 *
 * @param e - The event object containing details about the triggered event.
 */
/**
 * Checks if an event should be blocked and dispatches synthetic events.
 *
 * This function first checks if the event is already blocked on another element.
 * If not, it iterates through the target containers of the event, creating and dispatching
 * synthetic versions of the native event. It updates the `blockedOn` property based on the
 * outcome of these operations.
 *
 * @param {Object} e - The event object containing details about the event to be processed.
 */
/**
 * Deletes a key from a set if a condition is met.
 */
/**
 * Clears certain global state variables and resets associated collections.
 *
 * This function sets `pf` to false, nullifies and disposes of `mf`, `hf`, and `gf`
 * if they are not already null, and then iterates over the collections `bf` and `yf`,
 * applying the `Ef` function to each element.
 */
/**
 * Updates the blocked state of a task and schedules a callback if needed.
 */
/**
 * Updates the pending state and schedules a callback to process tasks.
 *
 * This function checks if the input array `t` is different from the current `Nf`.
 * If it is, it sets `Nf` to the new value and schedules a callback using `unstable_scheduleCallback`.
 * The callback processes each task in the array by checking types and updating states accordingly.
 *
 * @param t - An array of tasks to be processed.
 */
/**
 * Processes form-related tasks and updates the DOM based on the given element.
 *
 * This function handles multiple operations including:
 * - Checking and processing form elements associated with the input element.
 * - Unblocking dependent elements if they are blocked by the input element.
 * - Replaying form actions for elements that have pending actions.
 * - Updating form fields and their corresponding event listeners.
 *
 * @param e - The target element related to the form operations.
 */
/**
 * Calls the function zf with parameters t and e.
 */
/**
 * Initializes a new instance with the provided internal root element.
 */
/**
 * Initializes a new instance with the provided internal root.
 * @param {any} e - The internal root element.
 */
/**
 * Creates a new object containing properties from the source object that are not present in the exclusion array.
 *
 * This function iterates over the properties of the source object `e` and adds them to a new object `n`
 * if they are not listed in the `t` array. It also checks for non-enumerable symbols and includes those
 * that are not excluded.
 *
 * @param {Object} e - The source object from which properties will be selected.
 * @param {Array} t - An array of property names to exclude from the resulting object.
 * @returns {Object} A new object containing only the non-excluded properties from `e`.
 */
/**
 * Constructs and returns a Promise that wraps an iterator, handling its resolution and rejection.
 *
 * This function creates a Promise that iterates over a generator function `r`, applying arguments `t` to it.
 * It processes the results of the iterator, resolving with the final value if successful or rejecting with any errors encountered.
 * The iterator's `next()` method is called initially, and subsequent calls are made based on the resolution or rejection of promises yielded by the iterator.
 *
 * @param {Object} e - The context object to bind the generator function `r` to.
 * @param {Array} t - Arguments to pass to the generator function `r`.
 * @param {Function} n - Optional Promise constructor (defaults to the global Promise).
 */
/**
 * Processes an event and handles any exceptions.
 */
/**
 * Handles an error by throwing or catching it.
 */
/**
 * Handles asynchronous operations based on the input's done status.
 */
/**
 * A generator function that handles complex stateful operations with multiple branching conditions and error handling.
 *
 * This function manages a series of labeled blocks, each potentially throwing or returning different values based on the execution path.
 * It uses an internal state object to track labels, sent values, try-catch blocks, and operation stacks.
 * The generator can handle asynchronous operations through its `next`, `throw`, and `return` methods.
 *
 * @param e - The context in which the generator is executed, typically 'this'.
 * @param t - The function that processes each block of the generator's logic.
 * @returns An iterator object with methods to control the execution of the generator.
 */
/**
 * Creates a generator function that manages the execution of an asynchronous operation.
 *
 * The function returns a closure that handles different states and operations within a generator,
 * managing control flow, exceptions, and state transitions based on the input parameters.
 *
 * @param i - An initial parameter or identifier used within the generator context.
 * @returns A nested function that takes two parameters (u, i) and manages the generator's execution.
 */
/**
 * Concatenates elements from an array or arguments list to a target array.
 *
 * This function iterates over the provided array `t` and constructs a new array `r`
 * containing all elements from `t`. If the third parameter `n` is true or if only two
 * arguments are provided, it ensures that elements from `t` are copied into `r`.
 * Finally, it concatenates `r` with the target array `e` and returns the result.
 *
 * @param {Array} e - The target array to which elements will be concatenated.
 * @param {Array|Arguments} t - The source array or arguments list from which elements are taken.
 * @param {boolean} [n] - A flag indicating whether to include all elements from `t`.
 */
/**
 * Calls a function with a given argument or sets a current value if the argument is not a function.
 */
/**
 * Wraps a component and handles children rendering based on specific conditions.
 * The function uses React.forwardRef to create a ref-forwarding component.
 * It processes children elements, identifies a specific child (`i`), and manipulates its props.
 * If the identified child has multiple children, it clones them; otherwise, it sets them to null.
 * Finally, it returns a JSX element with the processed children and forwarded ref.
 *
 * @param {string} e - The display name for the component.
 */
/**
 * Wraps a component with additional props and refs, cloning it if necessary.
 *
 * This function uses forwardRef to handle ref forwarding and clones the child element if it's valid.
 * It merges props from the parent and child components, handling special cases like event handlers,
 * styles, and class names. If there are multiple children, it returns only the first one.
 *
 * @param e - The component or function to wrap.
 * @returns A new component that clones the input with enhanced props and refs.
 */
/**
 * Checks if the provided element is a valid React element with a specific radix ID.
 */
/**
 * Converts a given input into a string representation.
 *
 * This function recursively processes different types of inputs:
 * - If the input is a string or number, it directly appends to the result string.
 * - If the input is an array, it iterates over its elements and recursively converts each element to a string.
 * - If the input is an object, it iterates over its keys and appends the keys to the result string.
 *
 * @param e - The input which can be a string, number, array, or object.
 * @returns A string representation of the input.
 */
/**
 * Concatenates string representations of non-falsy arguments using a helper function U.
 *
 * The function iterates over all arguments, applies the helper function U to each,
 * and concatenates their string results with spaces in between. If an argument or its
 * transformation result is falsy, it is skipped.
 */
/**
 * Converts a value to a string representation.
 */
/**
 * Generates a function that processes class variants and returns a string of classes.
 *
 * This function maps over the provided variants, default variants, and compound variants to determine the final set of classes.
 * It also handles conditional logic for conflicting class groups and modifiers.
 *
 * @param H - An object containing configuration for class processing.
 * @returns A function that takes an object of variant values and returns a string of classes.
 */
/**
 * Function B processes and constructs class names based on given variants, default variants,
 * compound variants, and configuration settings.
 *
 * The function maps input parameters to their respective classes and handles conditional logic for
 * applying default and compound variants. It utilizes helper functions like $, V, and K to manage
 * the transformation of input data into a final class string.
 */
/**
 * Determines the class group ID based on the provided configuration and input values.
 *
 * This function traverses a tree-like structure built from class groups and validators,
 * matching the input parts against defined rules to find a corresponding class group ID.
 * If no match is found, it returns a default or arbitrary class group ID based on certain conditions.
 *
 * @param e - An array of strings representing the class parts.
 * @param t - A configuration object containing class groups and validation logic.
 * @returns The determined class group ID or undefined if no matching rule is found.
 */
/**
 * Processes and applies class variants based on provided configuration and input data.
 * The function maps input properties to corresponding class variations, handles compound variants,
 * and ensures that conflicting class groups are managed correctly.
 *
 * @param e - The base element or configuration object for class processing.
 * @param t - An optional configuration object containing variant definitions and default values.
 */
/**
 * Checks if a value is truthy or falsy and returns its string representation.
 */
/**
 * Processes and constructs class names based on various configuration options.
 * This function handles different types of variants, default variants, compound variants,
 * and conflicting class groups to generate a final class string.
 *
 * The function uses helper functions like `K`, `Y`, `X`, and `Z` to build a tree structure
 * for efficient class name lookups. It also utilizes caching through the `J` function to store
 * frequently accessed data.
 *
 * @param {string} e - The base element or component name.
 * @returns {Function} A function that takes configuration options and returns a constructed class string.
 */
/**
 * Converts a value to a string or returns '0' if the value is zero.
 */
/**
 * Converts a value to a string or handles specific cases like boolean and zero.
 */
/**
 * Constructs a class variant function that applies conditional classes based on component props and variants configuration.
 *
 * This function processes an object of variants and default variants, mapping them to their corresponding values based on the provided props.
 * It also handles compound variants, which are applied if multiple conditions are met simultaneously. The resulting class names
 * are then passed to a utility function `V` for further processing.
 *
 * @param {string} e - The base class name or identifier.
 * @param {Object} t - Configuration object containing variants and defaultVariants.
 * @returns {Function} A higher-order function that accepts props and returns the computed class names.
 */
/**
 * Updates a map with a key-value pair and handles overflow by resetting counters.
 */
/**
 * Parses a class name string into an object containing modifiers, important modifier status, base class name, and potential postfix modifier position.
 *
 * This function first normalizes the input class name by splitting it into segments based on certain delimiters and conditions. It then processes each segment to determine if it's a modifier or part of the base class name. It also checks for the presence of an important modifier and handles experimental parsing if specified.
 *
 * @param e - The class name string to be parsed.
 * @returns An object containing:
 *   - `modifiers`: Array of modifiers extracted from the class name.
 *   - `hasImportantModifier`: Boolean indicating if the class name has an important modifier.
 *   - `baseClassName`: The base class name without any modifiers.
 *   - `maybePostfixModifierPosition`: Optional position of a potential postfix modifier.
 */
/**
 * Parses a string to extract modifiers and determine class name details.
 *
 * This function iterates through the input string, identifying sections enclosed in brackets and parentheses,
 * as well as colons and slashes to categorize them into modifiers and other parts of the string. It returns an object
 * containing the extracted modifiers, whether there's an 'important' modifier, the base class name, and a position
 * for a possible postfix modifier.
 *
 * @param e - The input string to be parsed.
 * @returns An object with properties `modifiers`, `hasImportantModifier`, `baseClassName`, and `maybePostfixModifierPosition`.
 */
/**
 * Processes and returns a string based on input type and value.
 */
/**
 * Constructs a class name string based on provided variants and default variants.
 *
 * This function maps the input object's properties to corresponding variant classes,
 * applies compound variants, and returns a constructed class name using the helper function `V`.
 * It also handles cases where certain properties are null or undefined by utilizing default variants.
 *
 * @param e - The base class name or configuration object.
 * @param t - An object containing variant mappings, default variants, and compound variants.
 */
/**
 * Concatenates string representations of arguments that are truthy and have a valid `ae` conversion.
 *
 * This function iterates over all provided arguments, applies a transformation using the `ae` function,
 * and concatenates the results into a single string. Only arguments that are truthy and can be converted
 * by `ae` without errors are included in the final result. The concatenated strings are separated by spaces.
 */
/**
 * Recursively flattens and joins an array of strings or nested arrays into a single space-separated string.
 *
 * The function checks if the input `e` is a string. If it is, it returns the string directly.
 * Otherwise, it iterates over each element in the array `e`. For each non-falsy element,
 * it recursively calls `ae` and concatenates the results, ensuring that the final
 * output is a single string with elements separated by spaces.
 *
 * @param {string|string[]} e - The input which can be a string or an array of strings/nested arrays.
 */
/**
 * Processes input arguments to generate a transformed string based on specific rules.
 *
 * The function `oe` takes an initial value and a variable number of additional parameters.
 * It uses a helper function `a` to process the input through a series of transformations,
 * including parsing class names, handling modifiers, and managing caching. The final result
 * is cached for future calls with the same input.
 *
 * @param e - The initial value or starting point for processing.
 * @param {...any} t - Additional parameters that define the transformation rules.
 * @returns The processed string after applying all transformations.
 */
/**
 * Processes a class string and returns a processed version of it based on specific rules.
 *
 * This function first checks if there is a cached result for the input string. If not, it processes the input string by:
 * - Splitting the string into tokens using a regular expression.
 * - Iterating over each token in reverse order to handle modifiers and class groups correctly.
 * - Identifying external classes, handling important modifiers, and sorting modifiers.
 * - Constructing a base class name and checking for conflicting class group IDs.
 * - Adding processed tokens to an output array while ensuring uniqueness.
 *
 * @param e - The input class string to be processed.
 * @returns The processed version of the input class string.
 */
/**
 * This is a complex configuration object for defining various CSS class groupings, conflicting class groups,
 * and order-sensitive modifiers used in a utility-first CSS framework or similar system. The structure includes:
 *
 * 1. `classGroups`: An object that maps CSS property categories to their respective classes.
 *    Each category can contain an array of strings representing class names.
 *    Some categories are nested objects, with further subcategories defining more specific classes.
 *
 * 2. `conflictingClassGroups`: An object that defines which CSS class groups conflict with each other.
 *    When these groups are used together in a single element, they might override or negate each other's styles.
 *    Each key is a string representing the main conflicting group, and its value is an array of strings
 *    representing other groups that it conflicts with.
 *
 * 3. `conflictingClassGroupModifiers`: An object that specifies which class group modifiers are in conflict.
 *    This helps in managing situations where multiple modifiers applied to the same class group might cause unexpected styling outcomes.
 *    The keys are the names of the conflicting modifiers, and their values are arrays specifying other modifiers they conflict with.
 *
 * 4. `orderSensitiveModifiers`: An array of strings that lists modifiers whose order is significant.
 *    These modifiers can affect how styles are applied when used in combination with each other.
 *    Special values like "*", "**", "after", "backdrop", etc., might be included to denote broader categories or specific elements where order matters.
 *
 * This configuration object seems to be part of a system that dynamically generates CSS classes and manages their interactions
 * within HTML elements. It's used by tools or libraries such as Tailwind CSS, which allow developers to rapidly create styled components
 * using utility-first CSS principles without having to write repetitive custom styles.
 */
/**
 * Retrieves an element from an array or returns an empty array if the element does not exist.
 */
/**
 * @typedef {Object} TailwindConfig
 * @property {{[key: string]: any}} theme - The theme configuration for Tailwind CSS.
 * @property {{[key: string]: string[]}} conflictingClassGroups - Conflicting class groups in Tailwind CSS.
 * @property {{[key: string]: string[]}} conflictingClassGroupModifiers - Conflicting class group modifiers in Tailwind CSS.
 * @property {string[]} orderSensitiveModifiers - Order-sensitive modifiers in Tailwind CSS.
 */
/**
 * @typedef {Object} ClassGroups
 * @property {string[]} display
 * @property {string[]} overflow
 * @property {string[]} overscroll
 * @property {string[]} position
 * @property {string[]} zindex
 * @property {string[]} flex
 * @property {string[]} grid
 * @property {string[]} gap
 * @property {string[]} p
 * @property {string[]} px
 * @property {string[]} py
 * @property {string[]} m
 * @property {string[]} mx
 * @property {string[]} my
 * @property {string[]} size
 * @property {string[]} text-align
 * @property {string[]} font-size
 * @property {string[]} fvn-normal
 * @property {string[]} line-clamp
 * @property {string[]} rounded
 * @property {string[]} border-spacing
 * @property {string[]} border-w
 * @property {string[]} border-color
 * @property {string[]} translate
 * @property {string[]} scroll-m
 * @property {string[]} scroll-p
 * @property {string[]} touch
 */
/**
 * @typedef {Object} Config
 * @property {{[key: string]: any}} baseStyles - Base styles configuration.
 * @property {{[key: string]: string[]}} conflictingClassGroups - Conflicting class groups configuration.
 * @property {{[key: string]: string[]}} conflictingClassGroupModifiers - Conflicting class group modifiers configuration.
 * @property {string[]} orderSensitiveModifiers - Order sensitive modifiers configuration.
 */
/**
 * Represents a configuration object for styling and class management in a web application.
 * @typedef {Object} StyleConfig
 * @property {Object} theme - An object containing color variables used throughout the application.
 * @property {string[]} prefix - An array of prefixes to be applied to CSS classes.
 * @property {boolean} important - A flag indicating whether important styles should be applied globally.
 * @property {boolean} variantOrderSensitive - A flag indicating if variants should maintain their order.
 * @property {Object} conflictingClassGroups - An object mapping class groups that conflict with each other.
 * @property {Object} conflictingClassGroupModifiers - An object defining modifiers that can conflict within a group.
 * @property {string[]} orderSensitiveModifiers - An array of modifiers whose order is sensitive.
 */
/**
 * A configuration object for Tailwind CSS, including class groups and conflicting class group mappings.
 *
 * @typedef {Object} TailwindConfig
 * @property {Object} classGroups - An object containing the different class groups available in Tailwind CSS.
 * @property {Object} conflictingClassGroups - An object mapping class groups that are mutually exclusive or have conflicts.
 * @property {Object} conflictingClassGroupModifiers - An object specifying modifiers that conflict with each other within certain class groups.
 * @property {Array<string>} orderSensitiveModifiers - An array of modifiers that are sensitive to the order in which they are applied.
 */
/**
 * Configuration object for a CSS utility framework.
 * @typedef {Object} Config
 * @property {string[]} prefix - The prefix used for class names.
 * @property {Object} theme - Theme configuration with default values and responsive settings.
 * @property {Object} extend - Extended utility classes and their configurations.
 * @property {Object} conflictingClassGroups - Groups of classes that conflict with each other.
 * @property {Object} conflictingClassGroupModifiers - Modifiers that cause conflicts within class groups.
 * @property {string[]} orderSensitiveModifiers - List of modifiers that are sensitive to the order of appearance.
 */
/**
 * A configuration object containing various properties related to styling and class management in a web application.
 *
 * @type {Object}
 */
/**
 * This object contains configuration settings and utility functions related to Tailwind CSS class generation,
 * including class group definitions, conflicting class groups, conflicting modifiers, order-sensitive modifiers,
 * default theme values, utility functions, and a set of base classes.
 */
/**
 * @type {Object}
 */
/**
 * @typedef {Object} ClassGroups
 * @property {Object} classGroups - An object representing different CSS class groups and their possible values.
 * @property {Object} conflictingClassGroups - An object mapping class group names to arrays of other class groups that conflict with them.
 * @property {Object} conflictingClassGroupModifiers - An object mapping modifiers to arrays of class group names that they conflict with.
 * @property {Array<string>} orderSensitiveModifiers - An array of modifiers whose order in the class name is significant.
 */
/**
 * This function is used to define the configuration for a set of utility classes and their associated properties.
 * It takes an object with various keys representing different types of configurations, such as defaultClasses, classGroups,
 * conflictingClassGroups, conflictingClassGroupModifiers, orderSensitiveModifiers, and more. Each key has its own
 * purpose and structure, which is outlined below:
 *
 * @param {Object} config - The configuration object containing the following properties:
 * @param {string[]} [config.defaultClasses] - An array of default class names to be applied globally.
 * @param {Object} [config.classGroups] - An object mapping utility classes to their associated CSS properties and values.
 *   Each key is a class name prefix, and each value is an array containing the actual class names and corresponding
 *   property-value pairs. For example:
 *   ```javascript
 *   {
 *     'bg': [['background-color', N()]],
 *     'text': [['color', N()]]
 *   }
 *   ```
 * @param {Object} [config.conflictingClassGroups] - An object mapping utility classes to their conflicting groups.
 *   This helps in resolving conflicts when multiple classes of the same group are applied simultaneously. For example:
 *   ```javascript
 *   {
 *     'overflow': ['overflow-x', 'overflow-y'],
 *     'overscroll': ['overscroll-x', 'overscroll-y']
 *   }
 *   ```
 * @param {Object} [config.conflictingClassGroupModifiers] - An object mapping utility class groups to their conflicting modifiers.
 *   This helps in resolving conflicts when multiple modifiers of the same group are applied simultaneously. For example:
 *   ```javascript
 *   {
 *     'font-size': ['leading']
 *   }
 *   ```
 * @param {string[]} [config.orderSensitiveModifiers] - An array of modifier keys that are order-sensitive.
 *   These modifiers should be applied in a specific order for the utility classes to function correctly. For example:
 *   ```javascript
 *   ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
 *   ```
 */
/**
 * @type {Object}
 */
/**
 * Tailwind CSS configuration object for customizing utility classes and their behavior.
 *
 * @typedef {Object} TailwindConfig
 * @property {Object} theme - Configuration for theme-related properties like colors, fonts, spacing, etc.
 * @property {Object} variants - Configuration for responsive and interactive variations of utility classes.
 * @property {Object} plugins - Array of functions to extend or modify the default configuration.
 * @property {Object} conflictingClassGroups - Mapping of class groups that conflict with each other.
 * @property {Object} conflictingClassGroupModifiers - Mapping of modifiers that conflict within specific class groups.
 * @property {string[]} orderSensitiveModifiers - List of modifiers that are sensitive to their order in the class list.
 */
/**
 * Tailwind Config
 * @type {import('tailwindcss').Config}
 */
/**
 * Represents a Tailwind CSS configuration object.
 *
 * @typedef {Object} TailwindConfig
 * @property {Object} theme - The theme configuration of Tailwind CSS.
 * @property {Object} extend - Extend the default Tailwind theme with custom values.
 * @property {Object} plugins - An array or function returning an array of plugins to use in the Tailwind build.
 * @property {string[]} purge - Paths to all of your template files. They must be glob patterns.
 *
 * @typedef {Object} ThemeConfig
 * @property {Object} screens - Define custom breakpoints for responsive design.
 * @property {Array} colors - Define color palette.
 * @property {Object} spacing - Define spacing scale.
 * @property {Object} borderRadius - Define border-radius utilities.
 * @property {string[]} fontFamily - Define font families.
 *
 * @typedef {Object} Plugin
 * @property {Function} handler - The function to be called when the plugin is invoked.
 * @property {Object} [options] - Optional configuration for the plugin.
 */
/**
 * Tailwind CSS Class Groups Configuration.
 *
 * @typedef {Object} TailwindClassGroups
 * @property {Object} classGroups - Mapping of class groups to their respective classes or subgroups.
 * @property {Object} conflictingClassGroups - Mapping of conflicting class groups that should not be used together.
 * @property {Object} conflictingClassGroupModifiers - Mapping of conflicting class group modifiers.
 * @property {Array<string>} orderSensitiveModifiers - List of order-sensitive modifiers.
 */
/**
 * This code defines a configuration object for class utilities in a UI framework,
 * likely Tailwind CSS or a similar system. The configuration includes various properties:
 *
 * - `prefix`: A string that can be used to prefix all generated classes.
 * - `separator`: A character used to separate base classes and their modifiers.
 * - `mode`: An object that specifies different modes for class generation, such as JIT (Just-In-Time).
 * - `important`: A boolean or a string to indicate if important styles should be applied.
 *
 * The configuration also includes:
 *
 * - `theme`: An object that defines the theme of the UI, including colors, spacing, fonts, and more.
 * - `screens`: Defines breakpoints for responsive design.
 * - `extend`: Allows extending default themes with custom values.
 * - `plugins`: Lists plugins to extend the framework's functionality.
 * - `corePlugins`: Specifies which core plugins are enabled or disabled.
 *
 * Finally, it includes:
 *
 * - `conflictingClassGroups`: A mapping of class groups that cannot coexist on the same element.
 * - `conflictingClassGroupModifiers`: A mapping of modifiers that conflict with each other.
 * - `orderSensitiveModifiers`: Lists modifiers whose order matters when applied to classes.
 */
/**
 * Configuration object for tailwindcss class groups and their properties.
 *
 * @typedef {Object} TailwindConfig
 * @property {Object} conflictingClassGroups - Object mapping class groups to arrays of conflicting classes.
 * @property {Object} conflictingClassGroupModifiers - Object mapping class group modifiers to arrays of conflicting modifiers.
 * @property {string[]} orderSensitiveModifiers - Array of order-sensitive modifiers.
 *
 * @type {TailwindConfig}
 */
/**
 * Configuration object for Tailwind CSS class generation.
 * @typedef {Object} TailwindConfig
 * @property {Object<string, any>} theme - Theme configuration for Tailwind CSS.
 * @property {string[]} darkMode - Dark mode configuration.
 * @property {boolean} future - Future configuration flag.
 * @property {string[]} prefix - Class prefix configuration.
 * @property {string[]} important - Important configuration flag.
 * @property {Object<string, string[]>} separator - Separator configuration.
 * @property {Object<string, any>} plugins - Plugin configuration for Tailwind CSS.
 * @property {Object<string, string[]>} conflictingClassGroups - Conflicting class groups configuration.
 * @property {Object<string, string[]>} conflictingClassGroupModifiers - Conflicting class group modifiers configuration.
 * @property {string[]} orderSensitiveModifiers - Order sensitive modifiers configuration.
 */
/**
 * This code snippet defines a configuration object for Tailwind CSS utility classes, including class groups, conflicting class groups,
 * conflicting class group modifiers, and order-sensitive modifiers.
 *
 * @type {Object}
 */
/**
 * This is a JavaScript object that contains configuration settings for a CSS framework or utility library.
 *
 * @typedef {Object} ConfigSettings
 *
 * @property {Object} theme - An object containing various properties for theming, such as colors and font sizes.
 *
 * @property {Object} breakpoints - An object with named keys representing different screen sizes and their corresponding values in pixels.
 *
 * @property {string[]} prefix - An array of strings that will be used to create the class names for utility classes.
 *
 * @property {boolean} respectPrefixIndex - A boolean indicating whether or not to take into account the index of prefixes when generating class names.
 *
 * @property {Object} conflictingClassGroups - An object where each key is a name of a class group, and its value is an array of other class groups that are in conflict with it.
 *
 * @property {Object} conflictingClassGroupModifiers - Similar to conflictingClassGroups, but for modifiers applied to class groups.
 *
 * @property {string[]} orderSensitiveModifiers - An array of strings representing modifiers whose order matters when generating CSS rules.
 */
/**
 * Tailwind CSS utility classes configuration.
 * This object defines various class groups, their corresponding utilities, and conflicting relationships between them.
 *
 * @type {Object}
 */
/**
 * This JavaScript code defines a configuration object for Tailwind CSS, which includes:
 *
 * 1. `prefix` (string): The prefix to be used for all generated utility classes. It is set to an empty string ('').
 *
 * 2. `important` (boolean): A flag indicating whether the '!' modifier should be applied globally to all utility classes. It is set to false.
 *
 * 3. `separator` (string): The separator character to be used between variants and base classes. It is set to ':'.
 *
 * 4. `darkMode` (array|string): An array of media queries or a string specifying the mode for dark theme support. In this case, it is an empty array ([]), indicating that no specific dark mode support is configured.
 *
 * 5. `content` (array): An array of file paths and globs to specify which files should be scanned for Tailwind CSS class usage. Currently, it includes the main JavaScript entry point './src/index.js' and all TypeScript files in the 'src' directory ('./src/**/
/**
 * This function is used to configure Tailwind CSS class groups and their conflicting relationships.
 *
 * @typedef {Object} ClassGroupConfig
 * @property {Object} conflictingClassGroups - An object that defines which class groups conflict with each other.
 * @property {Object} conflictingClassGroupModifiers - An object that defines which class group modifiers conflict with each other.
 * @property {Array<string>} orderSensitiveModifiers - An array of modifiers that are sensitive to their order in the class list.
 *
 * @param {ClassGroupConfig} config - The configuration object containing class group settings and conflicts.
 */
/**
 * This code snippet defines an object that contains various class groups, conflicting class groups,
 * conflicting class group modifiers, and order sensitive modifiers related to CSS utilities or classes.
 *
 * @typedef {Object} ClassGroupUtilities
 * @property {Object} classGroups - An object where each key represents a utility category (e.g., 'font', 'spacing'),
 *   and the value is an array of strings that represent different variations of that utility.
 *
 * @property {Object} conflictingClassGroups - An object defining which utility groups conflict with others,
 *   meaning they cannot be used together. Each key is a group name, and its value is an array of conflicting
 *   group names.
 *
 * @property {Object} conflictingClassGroupModifiers - An object specifying which modifiers should not coexist with certain class groups.
 *   Each key is a modifier (e.g., 'font-size'), and its value is another object whose keys are the group names and values are arrays of
 *   conflicting modifiers for those groups.
 *
 * @property {Array} orderSensitiveModifiers - An array listing specific modifiers whose application depends on their order in relation to other utilities,
 *   represented as strings. The '*' and '**' placeholders suggest any modifier or any modifier twice respectively, while 'after', 'backdrop', etc.,
 *   are named utilities where order is significant.
 *
 * @returns {ClassGroupUtilities} - An object containing the defined utility group configurations.
 */
/**
 * This is a configuration object for Tailwind CSS, defining class groups and their properties.
 * @typedef {Object} TailwindConfig
 * @property {Object} theme - The theme configuration for various properties like colors, spacing, fonts, etc.
 * @property {Object} conflictingClassGroups - Defines which class groups are in conflict with each other.
 * @property {string[]} orderSensitiveModifiers - List of modifiers that are sensitive to the order of classes.
 */
/**
 * This function initializes a configuration object with various properties related to CSS class groups, conflicting class groups,
 * conflicting class group modifiers, and order-sensitive modifiers. The properties include arrays of strings representing different
 * CSS classes or attributes that can be used in styling elements on a webpage.
 *
 * @function initConfig
 * @returns {Object} config - An object containing the initialized configuration with properties for class groups, conflicting class groups,
 *                            conflicting class group modifiers, and order-sensitive modifiers.
 */
/**
 * @typedef {Object} ClassGroupConfig
 * @property {Object} classGroups - A mapping of class group keys to their corresponding CSS properties or values.
 * @property {Object} conflictingClassGroups - A mapping of class groups that conflict with each other, preventing them from being used simultaneously.
 * @property {Object} conflictingClassGroupModifiers - A mapping of modifiers that can cause conflicts within class groups.
 * @property {Array<string>} orderSensitiveModifiers - An array of modifiers whose order is sensitive and cannot be freely rearranged.
 */
/**
 * @typedef {Object} TailwindConfig
 * @property {Object<string, string|number|array|string[]|Object>} theme - The theme configuration for Tailwind CSS.
 * @property {Object<string, string[]>} conflictingClassGroups - Class groups that conflict with each other.
 * @property {Object<string, string[]>} conflictingClassGroupModifiers - Modifiers that conflict within the same class group.
 * @property {string[]} orderSensitiveModifiers - List of modifiers that are order sensitive.
 */
/**
 * Configuration object for a CSS utility framework.
 * @typedef {Object} Config
 * @property {Object} theme - The theme configuration for the utility classes.
 * @property {string} prefix - The prefix to use for all generated utility classes.
 * @property {boolean} important - Whether to add `!important` to all generated styles.
 * @property {string} separator - The separator character used in class names.
 * @property {number} purgeLayersByDefault - The number of layers to purge by default.
 * @property {Array<string>} purgeCSSOnBuild - An array of file paths or glob patterns to use for purging CSS.
 * @property {Object} variants - The variants configuration for the utility classes.
 * @property {boolean} respectPrefix - Whether to respect the prefix in class names.
 * @property {boolean} respectImportant - Whether to respect `!important` in class names.
 * @property {boolean} purgeCSSInDevelopment - Whether to enable purging CSS during development.
 * @property {Object} conflictingClassGroups - The configuration for conflicting class groups.
 * @property {Object} conflictingClassGroupModifiers - The configuration for conflicting class group modifiers.
 * @property {Array<string>} orderSensitiveModifiers - An array of order-sensitive modifiers.
 */
/**
 * Tailwind CSS Configuration
 *
 * This is a configuration object for setting up Tailwind CSS. It includes various properties such as prefix, important,
 * experimental features, purge options, theme settings, plugins, and more.
 *
 * @typedef {Object} TailwindConfig
 * @property {string} [prefix] - A prefix to add to all Tailwind CSS classes.
 * @property {boolean|string} [important] - Whether or not to use the !important rule for generated styles. Can be a boolean or a string (e.g., '!important').
 * @property {Object} experimental - Experimental features that can be enabled or disabled.
 * @property {string[]} purge - A list of files to scan for Tailwind CSS classes and remove unused ones during production builds.
 * @property {Function|Object} theme - An object containing the configuration for different themes, such as colors, spacing, fonts, etc.
 * @property {Array<Function|Object>} plugins - A list of plugins to extend or customize Tailwind CSS functionality.
 * @property {Object} corePlugins - Configuration for enabling or disabling specific core plugins provided by Tailwind CSS.
 * @property {Object} variants - Define custom variants for responsive and stateful classes.
 */
/**
 * Tailwind CSS Configuration Object
 *
 * This object represents the configuration for Tailwind CSS, including class groups,
 * conflicting class groups, conflicting class group modifiers, and order-sensitive modifiers.
 *
 * @type {Object}
 */
/**
 * This module exports a configuration object for class groups and conflicting class groups in a CSS utility framework.
 *
 * @typedef {Object} ClassGroupConfig
 * @property {Object} classGroups - An object defining various class groups with their corresponding values.
 * @property {Object} conflictingClassGroups - An object mapping class groups that are mutually exclusive or conflict with each other.
 * @property {Array<string>} conflictingClassGroupModifiers - An array of modifiers that can create conflicts when used with certain class groups.
 * @property {Array<string>} orderSensitiveModifiers - An array of modifiers that have specific ordering requirements in the final CSS output.
 *
 * @typedef {Object} ClassGroups
 * @description Defines various class groups and their corresponding values for a CSS utility framework.
 * Each property represents a class group, and its value is an array containing either:
 * - Strings representing the possible values for the class (e.g., "auto", "hidden", "block").
 * - Nested objects with properties representing subgroups or modifiers of the main class group.
 *
 * @typedef {Object} ConflictingClassGroups
 * @description Maps class groups that are mutually exclusive or conflict with each other.
 * Each property represents a class group, and its value is an array containing other class groups that it conflicts with.
 *
 * @typedef {Array<string>} ConflictingClassGroupModifiers
 * @description An array of modifiers that can create conflicts when used with certain class groups.
 * These modifiers should not be combined with the specified class groups in the final CSS output.
 *
 * @typedef {Array<string>} OrderSensitiveModifiers
 * @description An array of modifiers that have specific ordering requirements in the final CSS output.
 * These modifiers must appear in a particular order for the desired styling effect to be achieved.
 *
 * @type {ClassGroupConfig}
 */
/**
 * Configuration object for a utility that manages CSS class groups and their conflicts.
 *
 * @typedef {Object} ClassGroupConfig
 * @property {Object} conflictingClassGroups - A mapping of class group names to arrays of other class group names that they conflict with.
 * @property {Object} conflictingClassGroupModifiers - A mapping of modifier types to arrays of class group names that their modifiers conflict with.
 * @property {Array} orderSensitiveModifiers - An array of modifier types that are sensitive to the order in which they are applied.
 */
/**
 * Returns an array of valid position alignment values.
 */
/**
 * Returns an array containing default spacing values.
 */
/**
 * Returns an array of possible values for a property.
 */
/**
 * Defines various configuration options for UI components.
 */
/**
 * Returns an array of valid values for a specific CSS property.
 */
/**
 * Defines and exports various utility functions and constants for styling properties.
 */
/**
 * Initializes various configuration options and utility functions.
 */
/**
 * Defines various utility functions and constants for styling properties.
 */
/**
 * Returns an array of valid display values.
 */
/**
 * Defines and exports various utility functions for generating arrays of design tokens.
 */
/**
 * Initializes and exports various configuration arrays for styling properties.
 */
/**
 * Initializes various configuration options for styling and layout properties.
 */
/**
 * Initializes various utility functions and constants for styling and layout.
 */
/**
 * Defines various utility functions and constants for styling properties.
 */
/**
 * Defines various utility functions for generating style property arrays.
 */
/**
 * Initializes various configuration settings and utility functions.
 */
/**
 * Defines utility functions for various styling and layout properties.
 */
/**
 * Returns a function that retrieves a specific style property from a given string.
 */
/**
 * Initializes various utility functions and constants related to styling properties.
 */
/**
 * Initializes various style utilities and constants.
 */
/**
 * Returns an array of layout size options including 'auto', 'full', and responsive sizes.
 */
/**
 * Collects all arguments into an array and passes it to the Ye function.
 */
/**
 * Updates the state and notifies all observers.
 */
/**
 * Adds a toast notification and provides methods to dismiss or update it.
 */
/**
 * Manages toast state and effect cleanup.
 */
/**
 * Processes a variable number of arguments and returns a processed result using Ye function.
 */
!function(){"use strict";var e,t,n={exports:{}},r={};var l,a,o=(t||(t=1,n.exports=function(){if(e)return r;e=1;var t=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function l(e,n,r){var l=null;if(void 0!==r&&(l=""+r),void 0!==n.key&&(l=""+n.key),"key"in n)for(var a in r={},n)"key"!==a&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:l,ref:void 0!==n?n:null,props:r}}return r.Fragment=n,r.jsx=l,r.jsxs=l,r}()),n.exports),i={exports:{}},u={},s={exports:{}},c={};function d(){return a||(a=1,s.exports=(l||(l=1,function(e){function t(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(!(0<l(a,t)))break e;e[r]=t,e[n]=a,n=r}}function n(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var i=2*(r+1)-1,u=e[i],s=i+1,c=e[s];if(0>l(u,n))s<a&&0>l(c,u)?(e[r]=c,e[s]=n,r=s):(e[r]=u,e[i]=n,r=i);else{if(!(s<a&&0>l(c,n)))break e;e[r]=c,e[s]=n,r=s}}}return t}function l(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(e.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,i=o.now();e.unstable_now=function(){return o.now()-i}}var u=[],s=[],c=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,b="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,v="undefined"!=typeof setImmediate?setImmediate:null;function w(e){for(var l=n(s);null!==l;){if(null===l.callback)r(s);else{if(!(l.startTime<=e))break;r(s),l.sortIndex=l.expirationTime,t(u,l)}l=n(s)}}function k(e){if(h=!1,w(e),!m)if(null!==n(u))m=!0,x||(x=!0,S());else{var t=n(s);null!==t&&L(k,t.startTime-e)}}var S,x=!1,_=-1,E=5,C=-1;function z(){return!(!g&&e.unstable_now()-C<E)}function N(){if(g=!1,x){var t=e.unstable_now();C=t;var l=!0;try{e:{m=!1,h&&(h=!1,y(_),_=-1),p=!0;var a=f;try{t:{for(w(t),d=n(u);null!==d&&!(d.expirationTime>t&&z());){var o=d.callback;if("function"==typeof o){d.callback=null,f=d.priorityLevel;var i=o(d.expirationTime<=t);if(t=e.unstable_now(),"function"==typeof i){d.callback=i,w(t),l=!0;break t}d===n(u)&&r(u),w(t)}else r(u);d=n(u)}if(null!==d)l=!0;else{var c=n(s);null!==c&&L(k,c.startTime-t),l=!1}}break e}finally{d=null,f=a,p=!1}l=void 0}}finally{l?S():x=!1}}}if("function"==typeof v)S=function(){v(N)};else if("undefined"!=typeof MessageChannel){var P=new MessageChannel,T=P.port2;P.port1.onmessage=N,S=function(){T.postMessage(null)}}else S=function(){b(N,0)};function L(t,n){_=b((function(){t(e.unstable_now())}),n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,l,a){var o=e.unstable_now();switch(a="object"==typeof a&&null!==a&&"number"==typeof(a=a.delay)&&0<a?o+a:o,r){case 1:var i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}return r={id:c++,callback:l,priorityLevel:r,startTime:a,expirationTime:i=a+i,sortIndex:-1},a>o?(r.sortIndex=a,t(s,r),null===n(u)&&r===n(s)&&(h?(y(_),_=-1):h=!0,L(k,a-o))):(r.sortIndex=i,t(u,r),m||p||(m=!0,x||(x=!0,S()))),r},e.unstable_shouldYield=z,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}}(c)),c)),s.exports}var f,p,m={exports:{}},h={};function g(){if(f)return h;f=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),o=Symbol.for("react.context"),i=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),s=Symbol.for("react.memo"),c=Symbol.for("react.lazy"),d=Symbol.iterator;var p={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function b(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||p}function y(){}function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||p}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=b.prototype;var w=v.prototype=new y;w.constructor=v,m(w,b.prototype),w.isPureReactComponent=!0;var k=Array.isArray,S={H:null,A:null,T:null,S:null,V:null},x=Object.prototype.hasOwnProperty;function _(t,n,r,l,a,o){return r=o.ref,{$$typeof:e,type:t,key:n,ref:void 0!==r?r:null,props:o}}function E(t){return"object"==typeof t&&null!==t&&t.$$typeof===e}var C=/\/+/g;function z(e,t){return"object"==typeof e&&null!==e&&null!=e.key?(n=""+e.key,r={"=":"=0",":":"=2"},"$"+n.replace(/[=:]/g,(function(e){return r[e]}))):t.toString(36);var n,r}function N(){}function P(n,r,l,a,o){var i=typeof n;"undefined"!==i&&"boolean"!==i||(n=null);var u,s,f=!1;if(null===n)f=!0;else switch(i){case"bigint":case"string":case"number":f=!0;break;case"object":switch(n.$$typeof){case e:case t:f=!0;break;case c:return P((f=n._init)(n._payload),r,l,a,o)}}if(f)return o=o(n),f=""===a?"."+z(n,0):a,k(o)?(l="",null!=f&&(l=f.replace(C,"$&/")+"/"),P(o,r,l,"",(function(e){return e}))):null!=o&&(E(o)&&(u=o,s=l+(null==o.key||n&&n.key===o.key?"":(""+o.key).replace(C,"$&/")+"/")+f,o=_(u.type,s,void 0,0,0,u.props)),r.push(o)),1;f=0;var p,m=""===a?".":a+":";if(k(n))for(var h=0;h<n.length;h++)f+=P(a=n[h],r,l,i=m+z(a,h),o);else if("function"==typeof(h=null===(p=n)||"object"!=typeof p?null:"function"==typeof(p=d&&p[d]||p["@@iterator"])?p:null))for(n=h.call(n),h=0;!(a=n.next()).done;)f+=P(a=a.value,r,l,i=m+z(a,h++),o);else if("object"===i){if("function"==typeof n.then)return P(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"==typeof e.status?e.then(N,N):(e.status="pending",e.then((function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)}),(function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)}))),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(n),r,l,a,o);throw r=String(n),Error("Objects are not valid as a React child (found: "+("[object Object]"===r?"object with keys {"+Object.keys(n).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.")}return f}function T(e,t,n){if(null==e)return e;var r=[],l=0;return P(e,r,"","",(function(e){return t.call(n,e,l++)})),r}function L(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var O="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("function"==typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function A(){}return h.Children={map:T,forEach:function(e,t,n){T(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return T(e,(function(){t++})),t},toArray:function(e){return T(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},h.Component=b,h.Fragment=n,h.Profiler=l,h.PureComponent=v,h.StrictMode=r,h.Suspense=u,h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,h.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},h.cache=function(e){return function(){return e.apply(null,arguments)}},h.cloneElement=function(e,t,n){if(null==e)throw Error("The argument must be a React element, but you passed "+e+".");var r=m({},e.props),l=e.key;if(null!=t)for(a in void 0!==t.ref&&void 0,void 0!==t.key&&(l=""+t.key),t)!x.call(t,a)||"key"===a||"__self"===a||"__source"===a||"ref"===a&&void 0===t.ref||(r[a]=t[a]);var a=arguments.length-2;if(1===a)r.children=n;else if(1<a){for(var o=Array(a),i=0;i<a;i++)o[i]=arguments[i+2];r.children=o}return _(e.type,l,void 0,0,0,r)},h.createContext=function(e){return(e={$$typeof:o,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:a,_context:e},e},h.createElement=function(e,t,n){var r,l={},a=null;if(null!=t)for(r in void 0!==t.key&&(a=""+t.key),t)x.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(l[r]=t[r]);var o=arguments.length-2;if(1===o)l.children=n;else if(1<o){for(var i=Array(o),u=0;u<o;u++)i[u]=arguments[u+2];l.children=i}if(e&&e.defaultProps)for(r in o=e.defaultProps)void 0===l[r]&&(l[r]=o[r]);return _(e,a,void 0,0,0,l)},h.createRef=function(){return{current:null}},h.forwardRef=function(e){return{$$typeof:i,render:e}},h.isValidElement=E,h.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:L}},h.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},h.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),l=S.S;null!==l&&l(n,r),"object"==typeof r&&null!==r&&"function"==typeof r.then&&r.then(A,O)}catch(e){O(e)}finally{S.T=t}},h.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},h.use=function(e){return S.H.use(e)},h.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},h.useCallback=function(e,t){return S.H.useCallback(e,t)},h.useContext=function(e){return S.H.useContext(e)},h.useDebugValue=function(){},h.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},h.useEffect=function(e,t,n){var r=S.H;if("function"==typeof n)throw Error("useEffect CRUD overload is not enabled in this build of React.");return r.useEffect(e,t)},h.useId=function(){return S.H.useId()},h.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},h.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},h.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},h.useMemo=function(e,t){return S.H.useMemo(e,t)},h.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},h.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},h.useRef=function(e){return S.H.useRef(e)},h.useState=function(e){return S.H.useState(e)},h.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},h.useTransition=function(){return S.H.useTransition()},h.version="19.1.0",h}function b(){return p||(p=1,m.exports=g()),m.exports}var y,v,w,k,S={exports:{}},x={};function _(){if(y)return x;y=1;var e=b();function t(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var r={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");var a=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function o(e,t){return"font"===e?"":"string"==typeof t?"use-credentials"===t?t:"":void 0}return x.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,x.createPortal=function(e,n){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!n||1!==n.nodeType&&9!==n.nodeType&&11!==n.nodeType)throw Error(t(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:l,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,n,null,r)},x.flushSync=function(e){var t=a.T,n=r.p;try{if(a.T=null,r.p=2,e)return e()}finally{a.T=t,r.p=n,r.d.f()}},x.preconnect=function(e,t){"string"==typeof e&&(t?t="string"==typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,r.d.C(e,t))},x.prefetchDNS=function(e){"string"==typeof e&&r.d.D(e)},x.preinit=function(e,t){if("string"==typeof e&&t&&"string"==typeof t.as){var n=t.as,l=o(n,t.crossOrigin),a="string"==typeof t.integrity?t.integrity:void 0,i="string"==typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?r.d.S(e,"string"==typeof t.precedence?t.precedence:void 0,{crossOrigin:l,integrity:a,fetchPriority:i}):"script"===n&&r.d.X(e,{crossOrigin:l,integrity:a,fetchPriority:i,nonce:"string"==typeof t.nonce?t.nonce:void 0})}},x.preinitModule=function(e,t){if("string"==typeof e)if("object"==typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=o(t.as,t.crossOrigin);r.d.M(e,{crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0})}}else null==t&&r.d.M(e)},x.preload=function(e,t){if("string"==typeof e&&"object"==typeof t&&null!==t&&"string"==typeof t.as){var n=t.as,l=o(n,t.crossOrigin);r.d.L(e,n,{crossOrigin:l,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0,type:"string"==typeof t.type?t.type:void 0,fetchPriority:"string"==typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"==typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"==typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"==typeof t.imageSizes?t.imageSizes:void 0,media:"string"==typeof t.media?t.media:void 0})}},x.preloadModule=function(e,t){if("string"==typeof e)if(t){var n=o(t.as,t.crossOrigin);r.d.m(e,{as:"string"==typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0})}else r.d.m(e)},x.requestFormReset=function(e){r.d.r(e)},x.unstable_batchedUpdates=function(e,t){return e(t)},x.useFormState=function(e,t,n){return a.H.useFormState(e,t,n)},x.useFormStatus=function(){return a.H.useHostTransitionStatus()},x.version="19.1.0",x}function E(){if(v)return S.exports;return v=1,function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),S.exports=_(),S.exports}
//# sourceMappingURL=widget.js.map
