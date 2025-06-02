import { Procedure } from './procedure';
var baseProcedure = new Procedure();
/**
 * A helper to easily define middlewares and new procedures
 */
export var j = {
    middleware: function (fn) {
        return fn;
    },
    procedure: baseProcedure,
};
//# sourceMappingURL=j.js.map