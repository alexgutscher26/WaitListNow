!(function () {
  'use strict';
  var e,
    t,
    n = { exports: {} },
    r = {};
  var l,
    a,
    o =
      (t ||
        ((t = 1),
        (n.exports = (function () {
          if (e) return r;
          e = 1;
          var t = Symbol.for('react.transitional.element'),
            n = Symbol.for('react.fragment');
          function l(e, n, r) {
            var l = null;
            if (
              (void 0 !== r && (l = String(r)), void 0 !== n.key && (l = String(n.key)), 'key' in n)
            )
              for (var a in ((r = {}), n)) 'key' !== a && (r[a] = n[a]);
            else r = n;
            return (
              (n = r.ref), { $$typeof: t, type: e, key: l, ref: void 0 !== n ? n : null, props: r }
            );
          }
          return (r.Fragment = n), (r.jsx = l), (r.jsxs = l), r;
        })())),
      n.exports),
    i = { exports: {} },
    u = {},
    s = { exports: {} },
    c = {};
  function d() {
    return (
      a ||
        ((a = 1),
        (s.exports =
          (l ||
            ((l = 1),
            (function (e) {
              function t(e, t) {
                var n = e.length;
                e.push(t);
                e: for (; 0 < n; ) {
                  var r = (n - 1) >>> 1,
                    a = e[r];
                  if (!(0 < l(a, t))) break e;
                  (e[r] = t), (e[n] = a), (n = r);
                }
              }
              function n(e) {
                return 0 === e.length ? null : e[0];
              }
              function r(e) {
                if (0 === e.length) return null;
                var t = e[0],
                  n = e.pop();
                if (n !== t) {
                  e[0] = n;
                  e: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
                    var i = 2 * (r + 1) - 1,
                      u = e[i],
                      s = i + 1,
                      c = e[s];
                    if (0 > l(u, n))
                      s < a && 0 > l(c, u)
                        ? ((e[r] = c), (e[s] = n), (r = s))
                        : ((e[r] = u), (e[i] = n), (r = i));
                    else {
                      if (!(s < a && 0 > l(c, n))) break e;
                      (e[r] = c), (e[s] = n), (r = s);
                    }
                  }
                }
                return t;
              }
              function l(e, t) {
                var n = e.sortIndex - t.sortIndex;
                return 0 !== n ? n : e.id - t.id;
              }
              if (
                ((e.unstable_now = void 0),
                'object' == typeof performance && 'function' == typeof performance.now)
              ) {
                var a = performance;
                e.unstable_now = function () {
                  return a.now();
                };
              } else {
                var o = Date,
                  i = o.now();
                e.unstable_now = function () {
                  return o.now() - i;
                };
              }
              var u = [],
                s = [],
                c = 1,
                d = null,
                f = 3,
                p = !1,
                m = !1,
                h = !1,
                g = !1,
                b = 'function' == typeof setTimeout ? setTimeout : null,
                y = 'function' == typeof clearTimeout ? clearTimeout : null,
                v = 'undefined' != typeof setImmediate ? setImmediate : null;
              function w(e) {
                for (var l = n(s); null !== l; ) {
                  if (null === l.callback) r(s);
                  else {
                    if (!(l.startTime <= e)) break;
                    r(s), (l.sortIndex = l.expirationTime), t(u, l);
                  }
                  l = n(s);
                }
              }
              function k(e) {
                if (((h = !1), w(e), !m))
                  if (null !== n(u)) (m = !0), x || ((x = !0), S());
                  else {
                    var t = n(s);
                    null !== t && L(k, t.startTime - e);
                  }
              }
              var S,
                x = !1,
                _ = -1,
                E = 5,
                C = -1;
              function z() {
                return !(!g && e.unstable_now() - C < E);
              }
              function N() {
                if (((g = !1), x)) {
                  var t = e.unstable_now();
                  C = t;
                  var l = !0;
                  try {
                    e: {
                      (m = !1), h && ((h = !1), y(_), (_ = -1)), (p = !0);
                      var a = f;
                      try {
                        t: {
                          for (w(t), d = n(u); null !== d && !(d.expirationTime > t && z()); ) {
                            var o = d.callback;
                            if ('function' == typeof o) {
                              (d.callback = null), (f = d.priorityLevel);
                              var i = o(d.expirationTime <= t);
                              if (((t = e.unstable_now()), 'function' == typeof i)) {
                                (d.callback = i), w(t), (l = !0);
                                break t;
                              }
                              d === n(u) && r(u), w(t);
                            } else r(u);
                            d = n(u);
                          }
                          if (null !== d) l = !0;
                          else {
                            var c = n(s);
                            null !== c && L(k, c.startTime - t), (l = !1);
                          }
                        }
                        break e;
                      } finally {
                        (d = null), (f = a), (p = !1);
                      }
                      l = void 0;
                    }
                  } finally {
                    l ? S() : (x = !1);
                  }
                }
              }
              if ('function' == typeof v)
                S = function () {
                  v(N);
                };
              else if ('undefined' != typeof MessageChannel) {
                var P = new MessageChannel(),
                  T = P.port2;
                (P.port1.onmessage = N),
                  (S = function () {
                    T.postMessage(null);
                  });
              } else
                S = function () {
                  b(N, 0);
                };
              function L(t, n) {
                _ = b(function () {
                  t(e.unstable_now());
                }, n);
              }
              (e.unstable_IdlePriority = 5),
                (e.unstable_ImmediatePriority = 1),
                (e.unstable_LowPriority = 4),
                (e.unstable_NormalPriority = 3),
                (e.unstable_Profiling = null),
                (e.unstable_UserBlockingPriority = 2),
                (e.unstable_cancelCallback = function (e) {
                  e.callback = null;
                }),
                (e.unstable_forceFrameRate = function (e) {
                  0 > e || 125 < e
                    ? console.error(
                        'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                      )
                    : (E = 0 < e ? Math.floor(1e3 / e) : 5);
                }),
                (e.unstable_getCurrentPriorityLevel = function () {
                  return f;
                }),
                (e.unstable_next = function (e) {
                  switch (f) {
                    case 1:
                    case 2:
                    case 3:
                      var t = 3;
                      break;
                    default:
                      t = f;
                  }
                  var n = f;
                  f = t;
                  try {
                    return e();
                  } finally {
                    f = n;
                  }
                }),
                (e.unstable_requestPaint = function () {
                  g = !0;
                }),
                (e.unstable_runWithPriority = function (e, t) {
                  switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                      break;
                    default:
                      e = 3;
                  }
                  var n = f;
                  f = e;
                  try {
                    return t();
                  } finally {
                    f = n;
                  }
                }),
                (e.unstable_scheduleCallback = function (r, l, a) {
                  var o = e.unstable_now();
                  switch (
                    ((a =
                      'object' == typeof a &&
                      null !== a &&
                      'number' == typeof (a = a.delay) &&
                      0 < a
                        ? o + a
                        : o),
                    r)
                  ) {
                    case 1:
                      var i = -1;
                      break;
                    case 2:
                      i = 250;
                      break;
                    case 5:
                      i = 1073741823;
                      break;
                    case 4:
                      i = 1e4;
                      break;
                    default:
                      i = 5e3;
                  }
                  return (
                    (r = {
                      id: c++,
                      callback: l,
                      priorityLevel: r,
                      startTime: a,
                      expirationTime: (i = a + i),
                      sortIndex: -1,
                    }),
                    a > o
                      ? ((r.sortIndex = a),
                        t(s, r),
                        null === n(u) &&
                          r === n(s) &&
                          (h ? (y(_), (_ = -1)) : (h = !0), L(k, a - o)))
                      : ((r.sortIndex = i), t(u, r), m || p || ((m = !0), x || ((x = !0), S()))),
                    r
                  );
                }),
                (e.unstable_shouldYield = z),
                (e.unstable_wrapCallback = function (e) {
                  var t = f;
                  return function () {
                    var n = f;
                    f = t;
                    try {
                      return e.apply(this, arguments);
                    } finally {
                      f = n;
                    }
                  };
                });
            })(c)),
          c))),
      s.exports
    );
  }
  var f,
    p,
    m = { exports: {} },
    h = {};
  function g() {
    if (f) return h;
    f = 1;
    var e = Symbol.for('react.transitional.element'),
      t = Symbol.for('react.portal'),
      n = Symbol.for('react.fragment'),
      r = Symbol.for('react.strict_mode'),
      l = Symbol.for('react.profiler'),
      a = Symbol.for('react.consumer'),
      o = Symbol.for('react.context'),
      i = Symbol.for('react.forward_ref'),
      u = Symbol.for('react.suspense'),
      s = Symbol.for('react.memo'),
      c = Symbol.for('react.lazy'),
      d = Symbol.iterator;
    var p = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      m = Object.assign,
      g = {};
    function b(e, t, n) {
      (this.props = e), (this.context = t), (this.refs = g), (this.updater = n || p);
    }
    function y() {}
    function v(e, t, n) {
      (this.props = e), (this.context = t), (this.refs = g), (this.updater = n || p);
    }
    (b.prototype.isReactComponent = {}),
      (b.prototype.setState = function (e, t) {
        if ('object' != typeof e && 'function' != typeof e && null != e)
          throw Error(
            'takes an object of state variables to update or a function which returns an object of state variables.',
          );
        this.updater.enqueueSetState(this, e, t, 'setState');
      }),
      (b.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
      }),
      (y.prototype = b.prototype);
    var w = (v.prototype = new y());
    (w.constructor = v), m(w, b.prototype), (w.isPureReactComponent = !0);
    var k = Array.isArray,
      S = { H: null, A: null, T: null, S: null, V: null },
      x = Object.prototype.hasOwnProperty;
    function _(t, n, r, l, a, o) {
      return (r = o.ref), { $$typeof: e, type: t, key: n, ref: void 0 !== r ? r : null, props: o };
    }
    function E(t) {
      return 'object' == typeof t && null !== t && t.$$typeof === e;
    }
    var C = /\/+/g;
    function z(e, t) {
      return 'object' == typeof e && null !== e && null != e.key
        ? ((n = String(e.key)),
          (r = { '=': '=0', ':': '=2' }),
          '$' +
            n.replace(/[=:]/g, function (e) {
              return r[e];
            }))
        : t.toString(36);
      var n, r;
    }
    function N() {}
    function P(n, r, l, a, o) {
      var i = typeof n;
      ('undefined' !== i && 'boolean' !== i) || (n = null);
      var u,
        s,
        f = !1;
      if (null === n) f = !0;
      else
        switch (i) {
          case 'bigint':
          case 'string':
          case 'number':
            f = !0;
            break;
          case 'object':
            switch (n.$$typeof) {
              case e:
              case t:
                f = !0;
                break;
              case c:
                return P((f = n._init)(n._payload), r, l, a, o);
            }
        }
      if (f)
        return (
          (o = o(n)),
          (f = '' === a ? '.' + z(n, 0) : a),
          k(o)
            ? ((l = ''),
              null != f && (l = f.replace(C, '$&/') + '/'),
              P(o, r, l, '', function (e) {
                return e;
              }))
            : null != o &&
              (E(o) &&
                ((u = o),
                (s =
                  l +
                  (null == o.key || (n && n.key === o.key)
                    ? ''
                    : String(o.key).replace(C, '$&/') + '/') +
                  f),
                (o = _(u.type, s, void 0, 0, 0, u.props))),
              r.push(o)),
          1
        );
      f = 0;
      var p,
        m = '' === a ? '.' : a + ':';
      if (k(n)) for (var h = 0; h < n.length; h++) f += P((a = n[h]), r, l, (i = m + z(a, h)), o);
      else if (
        'function' ==
        typeof (h =
          null === (p = n) || 'object' != typeof p
            ? null
            : 'function' == typeof (p = (d && p[d]) || p['@@iterator'])
              ? p
              : null)
      )
        for (n = h.call(n), h = 0; !(a = n.next()).done; )
          f += P((a = a.value), r, l, (i = m + z(a, h++)), o);
      else if ('object' === i) {
        if ('function' == typeof n.then)
          return P(
            (function (e) {
              switch (e.status) {
                case 'fulfilled':
                  return e.value;
                case 'rejected':
                  throw e.reason;
                default:
                  switch (
                    ('string' == typeof e.status
                      ? e.then(N, N)
                      : ((e.status = 'pending'),
                        e.then(
                          function (t) {
                            'pending' === e.status && ((e.status = 'fulfilled'), (e.value = t));
                          },
                          function (t) {
                            'pending' === e.status && ((e.status = 'rejected'), (e.reason = t));
                          },
                        )),
                    e.status)
                  ) {
                    case 'fulfilled':
                      return e.value;
                    case 'rejected':
                      throw e.reason;
                  }
              }
              throw e;
            })(n),
            r,
            l,
            a,
            o,
          );
        throw (
          ((r = String(n)),
          Error(
            'Objects are not valid as a React child (found: ' +
              ('[object Object]' === r
                ? 'object with keys {' + Object.keys(n).join(', ') + '}'
                : r) +
              '). If you meant to render a collection of children, use an array instead.',
          ))
        );
      }
      return f;
    }
    function T(e, t, n) {
      if (null == e) return e;
      var r = [],
        l = 0;
      return (
        P(e, r, '', '', function (e) {
          return t.call(n, e, l++);
        }),
        r
      );
    }
    function L(e) {
      if (-1 === e._status) {
        var t = e._result;
        (t = t()).then(
          function (t) {
            (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
          },
          function (t) {
            (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
          },
        ),
          -1 === e._status && ((e._status = 0), (e._result = t));
      }
      if (1 === e._status) return e._result.default;
      throw e._result;
    }
    var O =
      'function' == typeof reportError
        ? reportError
        : function (e) {
            if ('object' == typeof window && 'function' == typeof window.ErrorEvent) {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  'object' == typeof e && null !== e && 'string' == typeof e.message
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if ('function' == typeof process.emit)
              return void process.emit('uncaughtException', e);
            console.error(e);
          };
    function A() {}
    return (
      (h.Children = {
        map: T,
        forEach: function (e, t, n) {
          T(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            T(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            T(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!E(e))
            throw Error('React.Children.only expected to receive a single React element child.');
          return e;
        },
      }),
      (h.Component = b),
      (h.Fragment = n),
      (h.Profiler = l),
      (h.PureComponent = v),
      (h.StrictMode = r),
      (h.Suspense = u),
      (h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S),
      (h.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return S.H.useMemoCache(e);
        },
      }),
      (h.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (h.cloneElement = function (e, t, n) {
        if (null == e)
          throw Error('The argument must be a React element, but you passed ' + e + '.');
        var r = m({}, e.props),
          l = e.key;
        if (null != t)
          for (a in (void 0 !== t.ref && void 0, void 0 !== t.key && (l = String(t.key)), t))
            !x.call(t, a) ||
              'key' === a ||
              '__self' === a ||
              '__source' === a ||
              ('ref' === a && void 0 === t.ref) ||
              (r[a] = t[a]);
        var a = arguments.length - 2;
        if (1 === a) r.children = n;
        else if (1 < a) {
          for (var o = Array(a), i = 0; i < a; i++) o[i] = arguments[i + 2];
          r.children = o;
        }
        return _(e.type, l, void 0, 0, 0, r);
      }),
      (h.createContext = function (e) {
        return (
          ((e = {
            $$typeof: o,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = e),
          (e.Consumer = { $$typeof: a, _context: e }),
          e
        );
      }),
      (h.createElement = function (e, t, n) {
        var r,
          l = {},
          a = null;
        if (null != t)
          for (r in (void 0 !== t.key && (a = String(t.key)), t))
            x.call(t, r) && 'key' !== r && '__self' !== r && '__source' !== r && (l[r] = t[r]);
        var o = arguments.length - 2;
        if (1 === o) l.children = n;
        else if (1 < o) {
          for (var i = Array(o), u = 0; u < o; u++) i[u] = arguments[u + 2];
          l.children = i;
        }
        if (e?.defaultProps) for (r in (o = e.defaultProps)) void 0 === l[r] && (l[r] = o[r]);
        return _(e, a, void 0, 0, 0, l);
      }),
      (h.createRef = function () {
        return { current: null };
      }),
      (h.forwardRef = function (e) {
        return { $$typeof: i, render: e };
      }),
      (h.isValidElement = E),
      (h.lazy = function (e) {
        return { $$typeof: c, _payload: { _status: -1, _result: e }, _init: L };
      }),
      (h.memo = function (e, t) {
        return { $$typeof: s, type: e, compare: void 0 === t ? null : t };
      }),
      (h.startTransition = function (e) {
        var t = S.T,
          n = {};
        S.T = n;
        try {
          var r = e(),
            l = S.S;
          null !== l && l(n, r),
            'object' == typeof r && null !== r && 'function' == typeof r.then && r.then(A, O);
        } catch (e) {
          O(e);
        } finally {
          S.T = t;
        }
      }),
      (h.unstable_useCacheRefresh = function () {
        return S.H.useCacheRefresh();
      }),
      (h.use = function (e) {
        return S.H.use(e);
      }),
      (h.useActionState = function (e, t, n) {
        return S.H.useActionState(e, t, n);
      }),
      (h.useCallback = function (e, t) {
        return S.H.useCallback(e, t);
      }),
      (h.useContext = function (e) {
        return S.H.useContext(e);
      }),
      (h.useDebugValue = function () {}),
      (h.useDeferredValue = function (e, t) {
        return S.H.useDeferredValue(e, t);
      }),
      (h.useEffect = function (e, t, n) {
        var r = S.H;
        if ('function' == typeof n)
          throw Error('useEffect CRUD overload is not enabled in this build of React.');
        return r.useEffect(e, t);
      }),
      (h.useId = function () {
        return S.H.useId();
      }),
      (h.useImperativeHandle = function (e, t, n) {
        return S.H.useImperativeHandle(e, t, n);
      }),
      (h.useInsertionEffect = function (e, t) {
        return S.H.useInsertionEffect(e, t);
      }),
      (h.useLayoutEffect = function (e, t) {
        return S.H.useLayoutEffect(e, t);
      }),
      (h.useMemo = function (e, t) {
        return S.H.useMemo(e, t);
      }),
      (h.useOptimistic = function (e, t) {
        return S.H.useOptimistic(e, t);
      }),
      (h.useReducer = function (e, t, n) {
        return S.H.useReducer(e, t, n);
      }),
      (h.useRef = function (e) {
        return S.H.useRef(e);
      }),
      (h.useState = function (e) {
        return S.H.useState(e);
      }),
      (h.useSyncExternalStore = function (e, t, n) {
        return S.H.useSyncExternalStore(e, t, n);
      }),
      (h.useTransition = function () {
        return S.H.useTransition();
      }),
      (h.version = '19.1.0'),
      h
    );
  }
  function b() {
    return p || ((p = 1), (m.exports = g())), m.exports;
  }
  var y,
    v,
    w,
    k,
    S = { exports: {} },
    x = {};
  function _() {
    if (y) return x;
    y = 1;
    var e = b();
    function t(e) {
      var t = 'https://react.dev/errors/' + e;
      if (1 < arguments.length) {
        t += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += '&args[]=' + encodeURIComponent(arguments[n]);
      }
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function n() {}
    var r = {
        d: {
          f: n,
          r: function () {
            throw Error(t(522));
          },
          D: n,
          C: n,
          L: n,
          m: n,
          X: n,
          S: n,
          M: n,
        },
        p: 0,
        findDOMNode: null,
      },
      l = Symbol.for('react.portal');
    var a = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function o(e, t) {
      return 'font' === e ? '' : 'string' == typeof t ? ('use-credentials' === t ? t : '') : void 0;
    }
    return (
      (x.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
      (x.createPortal = function (e, n) {
        var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!n || (1 !== n.nodeType && 9 !== n.nodeType && 11 !== n.nodeType)) throw Error(t(299));
        return (function (e, t, n) {
          var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
          return {
            $$typeof: l,
            key: null == r ? null : String(r),
            children: e,
            containerInfo: t,
            implementation: n,
          };
        })(e, n, null, r);
      }),
      (x.flushSync = function (e) {
        var t = a.T,
          n = r.p;
        try {
          if (((a.T = null), (r.p = 2), e)) return e();
        } finally {
          (a.T = t), (r.p = n), r.d.f();
        }
      }),
      (x.preconnect = function (e, t) {
        'string' == typeof e &&
          (t
            ? (t =
                'string' == typeof (t = t.crossOrigin)
                  ? 'use-credentials' === t
                    ? t
                    : ''
                  : void 0)
            : (t = null),
          r.d.C(e, t));
      }),
      (x.prefetchDNS = function (e) {
        'string' == typeof e && r.d.D(e);
      }),
      (x.preinit = function (e, t) {
        if ('string' == typeof e && t && 'string' == typeof t.as) {
          var n = t.as,
            l = o(n, t.crossOrigin),
            a = 'string' == typeof t.integrity ? t.integrity : void 0,
            i = 'string' == typeof t.fetchPriority ? t.fetchPriority : void 0;
          'style' === n
            ? r.d.S(e, 'string' == typeof t.precedence ? t.precedence : void 0, {
                crossOrigin: l,
                integrity: a,
                fetchPriority: i,
              })
            : 'script' === n &&
              r.d.X(e, {
                crossOrigin: l,
                integrity: a,
                fetchPriority: i,
                nonce: 'string' == typeof t.nonce ? t.nonce : void 0,
              });
        }
      }),
      (x.preinitModule = function (e, t) {
        if ('string' == typeof e)
          if ('object' == typeof t && null !== t) {
            if (null == t.as || 'script' === t.as) {
              var n = o(t.as, t.crossOrigin);
              r.d.M(e, {
                crossOrigin: n,
                integrity: 'string' == typeof t.integrity ? t.integrity : void 0,
                nonce: 'string' == typeof t.nonce ? t.nonce : void 0,
              });
            }
          } else null == t && r.d.M(e);
      }),
      (x.preload = function (e, t) {
        if ('string' == typeof e && 'object' == typeof t && null !== t && 'string' == typeof t.as) {
          var n = t.as,
            l = o(n, t.crossOrigin);
          r.d.L(e, n, {
            crossOrigin: l,
            integrity: 'string' == typeof t.integrity ? t.integrity : void 0,
            nonce: 'string' == typeof t.nonce ? t.nonce : void 0,
            type: 'string' == typeof t.type ? t.type : void 0,
            fetchPriority: 'string' == typeof t.fetchPriority ? t.fetchPriority : void 0,
            referrerPolicy: 'string' == typeof t.referrerPolicy ? t.referrerPolicy : void 0,
            imageSrcSet: 'string' == typeof t.imageSrcSet ? t.imageSrcSet : void 0,
            imageSizes: 'string' == typeof t.imageSizes ? t.imageSizes : void 0,
            media: 'string' == typeof t.media ? t.media : void 0,
          });
        }
      }),
      (x.preloadModule = function (e, t) {
        if ('string' == typeof e)
          if (t) {
            var n = o(t.as, t.crossOrigin);
            r.d.m(e, {
              as: 'string' == typeof t.as && 'script' !== t.as ? t.as : void 0,
              crossOrigin: n,
              integrity: 'string' == typeof t.integrity ? t.integrity : void 0,
            });
          } else r.d.m(e);
      }),
      (x.requestFormReset = function (e) {
        r.d.r(e);
      }),
      (x.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (x.useFormState = function (e, t, n) {
        return a.H.useFormState(e, t, n);
      }),
      (x.useFormStatus = function () {
        return a.H.useHostTransitionStatus();
      }),
      (x.version = '19.1.0'),
      x
    );
  }
  function E() {
    if (v) return S.exports;
    return (
      (v = 1),
      (function e() {
        if (
          'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
          } catch (e) {
            console.error(e);
          }
      })(),
      (S.exports = _()),
      S.exports
    );
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ function C() {
    if (w) return u;
    w = 1;
    var e = d(),
      t = b(),
      n = E();
    function r(e) {
      var t = 'https://react.dev/errors/' + e;
      if (1 < arguments.length) {
        t += '?args[]=' + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += '&args[]=' + encodeURIComponent(arguments[n]);
      }
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    function l(e) {
      return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
    }
    function a(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do {
          Boolean(4098 & (t = e).flags) && (n = t.return), (e = t.return);
        } while (e);
      }
      return 3 === t.tag ? n : null;
    }
    function o(e) {
      if (13 === e.tag) {
        var t = e.memoizedState;
        if ((null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t))
          return t.dehydrated;
      }
      return null;
    }
    function i(e) {
      if (a(e) !== e) throw Error(r(188));
    }
    function s(e) {
      var t = e.tag;
      if (5 === t || 26 === t || 27 === t || 6 === t) return e;
      for (e = e.child; null !== e; ) {
        if (null !== (t = s(e))) return t;
        e = e.sibling;
      }
      return null;
    }
    var c = Object.assign,
      f = Symbol.for('react.element'),
      p = Symbol.for('react.transitional.element'),
      m = Symbol.for('react.portal'),
      h = Symbol.for('react.fragment'),
      g = Symbol.for('react.strict_mode'),
      y = Symbol.for('react.profiler'),
      v = Symbol.for('react.provider'),
      k = Symbol.for('react.consumer'),
      S = Symbol.for('react.context'),
      x = Symbol.for('react.forward_ref'),
      _ = Symbol.for('react.suspense'),
      C = Symbol.for('react.suspense_list'),
      z = Symbol.for('react.memo'),
      N = Symbol.for('react.lazy'),
      P = Symbol.for('react.activity'),
      T = Symbol.for('react.memo_cache_sentinel'),
      L = Symbol.iterator;
    function O(e) {
      return null === e || 'object' != typeof e
        ? null
        : 'function' == typeof (e = (L && e[L]) || e['@@iterator'])
          ? e
          : null;
    }
    var A = Symbol.for('react.client.reference');
    function R(e) {
      if (null == e) return null;
      if ('function' == typeof e) return e.$$typeof === A ? null : e.displayName || e.name || null;
      if ('string' == typeof e) return e;
      switch (e) {
        case h:
          return 'Fragment';
        case y:
          return 'Profiler';
        case g:
          return 'StrictMode';
        case _:
          return 'Suspense';
        case C:
          return 'SuspenseList';
        case P:
          return 'Activity';
      }
      if ('object' == typeof e)
        switch (e.$$typeof) {
          case m:
            return 'Portal';
          case S:
            return (e.displayName || 'Context') + '.Provider';
          case k:
            return (e._context.displayName || 'Context') + '.Consumer';
          case x:
            var t = e.render;
            return (
              (e = e.displayName) ||
                (e =
                  '' !== (e = t.displayName || t.name || '')
                    ? 'ForwardRef(' + e + ')'
                    : 'ForwardRef'),
              e
            );
          case z:
            return null !== (t = e.displayName || null) ? t : R(e.type) || 'Memo';
          case N:
            (t = e._payload), (e = e._init);
            try {
              return R(e(t));
            } catch (e) {}
        }
      return null;
    }
    var D = Array.isArray,
      M = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      F = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      I = { pending: !1, data: null, method: null, action: null },
      j = [],
      U = -1;
    function H(e) {
      return { current: e };
    }
    function $(e) {
      0 > U || ((e.current = j[U]), (j[U] = null), U--);
    }
    function V(e, t) {
      U++, (j[U] = e.current), (e.current = t);
    }
    var W = H(null),
      B = H(null),
      q = H(null),
      Q = H(null);
    function G(e, t) {
      switch ((V(q, t), V(B, e), V(W, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? od(e) : 0;
          break;
        default:
          if (((e = t.tagName), (t = t.namespaceURI))) e = id((t = od(t)), e);
          else
            switch (e) {
              case 'svg':
                e = 1;
                break;
              case 'math':
                e = 2;
                break;
              default:
                e = 0;
            }
      }
      $(W), V(W, e);
    }
    function K() {
      $(W), $(B), $(q);
    }
    function Y(e) {
      null !== e.memoizedState && V(Q, e);
      var t = W.current,
        n = id(t, e.type);
      t !== n && (V(B, e), V(W, n));
    }
    function X(e) {
      B.current === e && ($(W), $(B)), Q.current === e && ($(Q), (Yd._currentValue = I));
    }
    var Z = Object.prototype.hasOwnProperty,
      J = e.unstable_scheduleCallback,
      ee = e.unstable_cancelCallback,
      te = e.unstable_shouldYield,
      ne = e.unstable_requestPaint,
      re = e.unstable_now,
      le = e.unstable_getCurrentPriorityLevel,
      ae = e.unstable_ImmediatePriority,
      oe = e.unstable_UserBlockingPriority,
      ie = e.unstable_NormalPriority,
      ue = e.unstable_LowPriority,
      se = e.unstable_IdlePriority,
      ce = e.log,
      de = e.unstable_setDisableYieldValue,
      fe = null,
      pe = null;
    function me(e) {
      if (('function' == typeof ce && de(e), pe && 'function' == typeof pe.setStrictMode))
        try {
          pe.setStrictMode(fe, e);
        } catch (e) {}
    }
    var he = Math.clz32
        ? Math.clz32
        : function (e) {
            return 0 === (e >>>= 0) ? 32 : (31 - ((ge(e) / be) | 0)) | 0;
          },
      ge = Math.log,
      be = Math.LN2;
    var ye = 256,
      ve = 4194304;
    function we(e) {
      var t = 42 & e;
      if (0 !== t) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return 4194048 & e;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return 62914560 & e;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return e;
      }
    }
    function ke(e, t, n) {
      var r = e.pendingLanes;
      if (0 === r) return 0;
      var l = 0,
        a = e.suspendedLanes,
        o = e.pingedLanes;
      e = e.warmLanes;
      var i = 134217727 & r;
      return (
        0 !== i
          ? 0 !== (r = i & ~a)
            ? (l = we(r))
            : 0 !== (o &= i)
              ? (l = we(o))
              : n || (0 !== (n = i & ~e) && (l = we(n)))
          : 0 !== (i = r & ~a)
            ? (l = we(i))
            : 0 !== o
              ? (l = we(o))
              : n || (0 !== (n = r & ~e) && (l = we(n))),
        0 === l
          ? 0
          : 0 !== t &&
              t !== l &&
              0 === (t & a) &&
              ((a = l & -l) >= (n = t & -t) || (32 === a && 4194048 & n))
            ? t
            : l
      );
    }
    function Se(e, t) {
      return 0 === (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t);
    }
    function xe(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        default:
          return -1;
      }
    }
    function _e() {
      var e = ye;
      return !(4194048 & (ye <<= 1)) && (ye = 256), e;
    }
    function Ee() {
      var e = ve;
      return !(62914560 & (ve <<= 1)) && (ve = 4194304), e;
    }
    function Ce(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function ze(e, t) {
      (e.pendingLanes |= t),
        268435456 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
    }
    function Ne(e, t, n) {
      (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
      var r = 31 - he(t);
      (e.entangledLanes |= t),
        (e.entanglements[r] = 1073741824 | e.entanglements[r] | (4194090 & n));
    }
    function Pe(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - he(n),
          l = 1 << r;
        (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
      }
    }
    function Te(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Le(e) {
      return 2 < (e &= -e) ? (8 < e ? (134217727 & e ? 32 : 268435456) : 8) : 2;
    }
    function Oe() {
      var e = F.p;
      return 0 !== e ? e : void 0 === (e = window.event) ? 32 : ff(e.type);
    }
    var Ae = Math.random().toString(36).slice(2),
      Re = '__reactFiber$' + Ae,
      De = '__reactProps$' + Ae,
      Me = '__reactContainer$' + Ae,
      Fe = '__reactEvents$' + Ae,
      Ie = '__reactListeners$' + Ae,
      je = '__reactHandles$' + Ae,
      Ue = '__reactResources$' + Ae,
      He = '__reactMarker$' + Ae;
    function $e(e) {
      delete e[Re], delete e[De], delete e[Fe], delete e[Ie], delete e[je];
    }
    function Ve(e) {
      var t = e[Re];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Me] || n[Re])) {
          if (((n = t.alternate), null !== t.child || (null !== n && null !== n.child)))
            for (e = kd(e); null !== e; ) {
              if ((n = e[Re])) return n;
              e = kd(e);
            }
          return t;
        }
        n = (e = n).parentNode;
      }
      return null;
    }
    function We(e) {
      if ((e = e[Re] || e[Me])) {
        var t = e.tag;
        if (5 === t || 6 === t || 13 === t || 26 === t || 27 === t || 3 === t) return e;
      }
      return null;
    }
    function Be(e) {
      var t = e.tag;
      if (5 === t || 26 === t || 27 === t || 6 === t) return e.stateNode;
      throw Error(r(33));
    }
    function qe(e) {
      var t = e[Ue];
      return t || (t = e[Ue] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t;
    }
    function Qe(e) {
      e[He] = !0;
    }
    var Ge = new Set(),
      Ke = {};
    function Ye(e, t) {
      Xe(e, t), Xe(e + 'Capture', t);
    }
    function Xe(e, t) {
      for (Ke[e] = t, e = 0; e < t.length; e++) Ge.add(t[e]);
    }
    var Ze,
      Je,
      et = RegExp(
        '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
      ),
      tt = {},
      nt = {};
    function rt(e, t, n) {
      if (
        ((l = t),
        Z.call(nt, l) || (!Z.call(tt, l) && (et.test(l) ? (nt[l] = !0) : ((tt[l] = !0), 0))))
      )
        if (null === n) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case 'undefined':
            case 'function':
            case 'symbol':
              return void e.removeAttribute(t);
            case 'boolean':
              var r = t.toLowerCase().slice(0, 5);
              if ('data-' !== r && 'aria-' !== r) return void e.removeAttribute(t);
          }
          e.setAttribute(t, String(n));
        }
      var l;
    }
    function lt(e, t, n) {
      if (null === n) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            return void e.removeAttribute(t);
        }
        e.setAttribute(t, String(n));
      }
    }
    function at(e, t, n, r) {
      if (null === r) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case 'undefined':
          case 'function':
          case 'symbol':
          case 'boolean':
            return void e.removeAttribute(n);
        }
        e.setAttributeNS(t, n, String(r));
      }
    }
    function ot(e) {
      if (void 0 === Ze)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          (Ze = t?.[1] || ''),
            (Je =
              -1 < e.stack.indexOf('\n    at')
                ? ' (<anonymous>)'
                : -1 < e.stack.indexOf('@')
                  ? '@unknown:0:0'
                  : '');
        }
      return '\n' + Ze + e + Je;
    }
    var it = !1;
    function ut(e, t) {
      if (!e || it) return '';
      it = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(n.prototype, 'props', {
                    set: function () {
                      throw Error();
                    },
                  }),
                  'object' == typeof Reflect && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], n);
                } else {
                  try {
                    n.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(n.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                (n = e()) && 'function' == typeof n.catch && n.catch(function () {});
              }
            } catch (e) {
              if (e && r && 'string' == typeof e.stack) return [e.stack, r.stack];
            }
            return [null, null];
          },
        };
        r.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
        var l = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, 'name');
        l?.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, 'name', {
            value: 'DetermineComponentFrameRoot',
          });
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          i = a[1];
        if (o && i) {
          var u = o.split('\n'),
            s = i.split('\n');
          for (l = r = 0; r < u.length && !u[r].includes('DetermineComponentFrameRoot'); ) r++;
          for (; l < s.length && !s[l].includes('DetermineComponentFrameRoot'); ) l++;
          if (r === u.length || l === s.length)
            for (r = u.length - 1, l = s.length - 1; 1 <= r && 0 <= l && u[r] !== s[l]; ) l--;
          for (; 1 <= r && 0 <= l; r--, l--)
            if (u[r] !== s[l]) {
              if (1 !== r || 1 !== l)
                do {
                  if ((r--, 0 > --l || u[r] !== s[l])) {
                    var c = '\n' + u[r].replace(' at new ', ' at ');
                    return (
                      e.displayName &&
                        c.includes('<anonymous>') &&
                        (c = c.replace('<anonymous>', e.displayName)),
                      c
                    );
                  }
                } while (1 <= r && 0 <= l);
              break;
            }
        }
      } finally {
        (it = !1), (Error.prepareStackTrace = n);
      }
      return (n = e ? e.displayName || e.name : '') ? ot(n) : '';
    }
    function st(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return ot(e.type);
        case 16:
          return ot('Lazy');
        case 13:
          return ot('Suspense');
        case 19:
          return ot('SuspenseList');
        case 0:
        case 15:
          return ut(e.type, !1);
        case 11:
          return ut(e.type.render, !1);
        case 1:
          return ut(e.type, !0);
        case 31:
          return ot('Activity');
        default:
          return '';
      }
    }
    function ct(e) {
      try {
        var t = '';
        do {
          (t += st(e)), (e = e.return);
        } while (e);
        return t;
      } catch (e) {
        return '\nError generating stack: ' + e.message + '\n' + e.stack;
      }
    }
    function dt(e) {
      switch (typeof e) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
        case 'object':
          return e;
        default:
          return '';
      }
    }
    function ft(e) {
      var t = e.type;
      return (e = e.nodeName) && 'input' === e.toLowerCase() && ('checkbox' === t || 'radio' === t);
    }
    function pt(e) {
      e._valueTracker ||
        (e._valueTracker = (function (e) {
          var t = ft(e) ? 'checked' : 'value',
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = String(e[t]);
          if (
            !e.hasOwnProperty(t) &&
            void 0 !== n &&
            'function' == typeof n.get &&
            'function' == typeof n.set
          ) {
            var l = n.get,
              a = n.set;
            return (
              Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                  return l.call(this);
                },
                set: function (e) {
                  (r = String(e)), a.call(this, e);
                },
              }),
              Object.defineProperty(e, t, { enumerable: n.enumerable }),
              {
                getValue: function () {
                  return r;
                },
                setValue: function (e) {
                  r = String(e);
                },
                stopTracking: function () {
                  (e._valueTracker = null), delete e[t];
                },
              }
            );
          }
        })(e));
    }
    function mt(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = '';
      return (
        e && (r = ft(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r) !== n && (t.setValue(e), !0)
      );
    }
    function ht(e) {
      if (void 0 === (e = e || ('undefined' != typeof document ? document : void 0))) return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    var gt = /[\n"\\]/g;
    function bt(e) {
      return e.replace(gt, function (e) {
        return '\\' + e.charCodeAt(0).toString(16) + ' ';
      });
    }
    function yt(e, t, n, r, l, a, o, i) {
      (e.name = ''),
        null != o && 'function' != typeof o && 'symbol' != typeof o && 'boolean' != typeof o
          ? (e.type = o)
          : e.removeAttribute('type'),
        null != t
          ? 'number' === o
            ? ((0 === t && '' === e.value) || e.value != t) && (e.value = String(dt(t)))
            : e.value !== String(dt(t)) && (e.value = String(dt(t)))
          : ('submit' !== o && 'reset' !== o) || e.removeAttribute('value'),
        null != t
          ? wt(e, o, dt(t))
          : null != n
            ? wt(e, o, dt(n))
            : null != r && e.removeAttribute('value'),
        null == l && null != a && (e.defaultChecked = Boolean(a)),
        null != l && (e.checked = l && 'function' != typeof l && 'symbol' != typeof l),
        null != i && 'function' != typeof i && 'symbol' != typeof i && 'boolean' != typeof i
          ? (e.name = String(dt(i)))
          : e.removeAttribute('name');
    }
    function vt(e, t, n, r, l, a, o, i) {
      if (
        (null != a &&
          'function' != typeof a &&
          'symbol' != typeof a &&
          'boolean' != typeof a &&
          (e.type = a),
        null != t || null != n)
      ) {
        if (('submit' === a || 'reset' === a) && null == t) return;
        (n = null != n ? String(dt(n)) : ''),
          (t = null != t ? String(dt(t)) : n),
          i || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      (r = 'function' != typeof (r = null != r ? r : l) && 'symbol' != typeof r && Boolean(r)),
        (e.checked = i ? e.checked : Boolean(r)),
        (e.defaultChecked = Boolean(r)),
        null != o &&
          'function' != typeof o &&
          'symbol' != typeof o &&
          'boolean' != typeof o &&
          (e.name = o);
    }
    function wt(e, t, n) {
      ('number' === t && ht(e.ownerDocument) === e) ||
        e.defaultValue === String(n) ||
        (e.defaultValue = String(n));
    }
    function kt(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
        for (n = 0; n < e.length; n++)
          (l = t.hasOwnProperty('$' + e[n].value)),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0);
      } else {
        for (n = String(dt(n)), t = null, l = 0; l < e.length; l++) {
          if (e[l].value === n)
            return (e[l].selected = !0), void (r && (e[l].defaultSelected = !0));
          null !== t || e[l].disabled || (t = e[l]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function St(e, t, n) {
      null == t || ((t = String(dt(t))) !== e.value && (e.value = t), null != n)
        ? (e.defaultValue = null != n ? String(dt(n)) : '')
        : e.defaultValue !== t && (e.defaultValue = t);
    }
    function xt(e, t, n, l) {
      if (null == t) {
        if (null != l) {
          if (null != n) throw Error(r(92));
          if (D(l)) {
            if (1 < l.length) throw Error(r(93));
            l = l[0];
          }
          n = l;
        }
        null == n && (n = ''), (t = n);
      }
      (n = dt(t)),
        (e.defaultValue = n),
        (l = e.textContent) === n && '' !== l && null !== l && (e.value = l);
    }
    function _t(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    var Et = new Set(
      'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
        ' ',
      ),
    );
    function Ct(e, t, n) {
      var r = 0 === t.indexOf('--');
      null == n || 'boolean' == typeof n || '' === n
        ? r
          ? e.setProperty(t, '')
          : 'float' === t
            ? (e.cssFloat = '')
            : (e[t] = '')
        : r
          ? e.setProperty(t, n)
          : 'number' != typeof n || 0 === n || Et.has(t)
            ? 'float' === t
              ? (e.cssFloat = n)
              : (e[t] = String(n).trim())
            : (e[t] = n + 'px');
    }
    function zt(e, t, n) {
      if (null != t && 'object' != typeof t) throw Error(r(62));
      if (((e = e.style), null != n)) {
        for (var l in n)
          !n.hasOwnProperty(l) ||
            (null != t && t.hasOwnProperty(l)) ||
            (0 === l.indexOf('--')
              ? e.setProperty(l, '')
              : 'float' === l
                ? (e.cssFloat = '')
                : (e[l] = ''));
        for (var a in t) (l = t[a]), t.hasOwnProperty(a) && n[a] !== l && Ct(e, a, l);
      } else for (var o in t) t.hasOwnProperty(o) && Ct(e, o, t[o]);
    }
    function Nt(e) {
      if (-1 === e.indexOf('-')) return !1;
      switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    var Pt = new Map([
        ['acceptCharset', 'accept-charset'],
        ['htmlFor', 'for'],
        ['httpEquiv', 'http-equiv'],
        ['crossOrigin', 'crossorigin'],
        ['accentHeight', 'accent-height'],
        ['alignmentBaseline', 'alignment-baseline'],
        ['arabicForm', 'arabic-form'],
        ['baselineShift', 'baseline-shift'],
        ['capHeight', 'cap-height'],
        ['clipPath', 'clip-path'],
        ['clipRule', 'clip-rule'],
        ['colorInterpolation', 'color-interpolation'],
        ['colorInterpolationFilters', 'color-interpolation-filters'],
        ['colorProfile', 'color-profile'],
        ['colorRendering', 'color-rendering'],
        ['dominantBaseline', 'dominant-baseline'],
        ['enableBackground', 'enable-background'],
        ['fillOpacity', 'fill-opacity'],
        ['fillRule', 'fill-rule'],
        ['floodColor', 'flood-color'],
        ['floodOpacity', 'flood-opacity'],
        ['fontFamily', 'font-family'],
        ['fontSize', 'font-size'],
        ['fontSizeAdjust', 'font-size-adjust'],
        ['fontStretch', 'font-stretch'],
        ['fontStyle', 'font-style'],
        ['fontVariant', 'font-variant'],
        ['fontWeight', 'font-weight'],
        ['glyphName', 'glyph-name'],
        ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
        ['glyphOrientationVertical', 'glyph-orientation-vertical'],
        ['horizAdvX', 'horiz-adv-x'],
        ['horizOriginX', 'horiz-origin-x'],
        ['imageRendering', 'image-rendering'],
        ['letterSpacing', 'letter-spacing'],
        ['lightingColor', 'lighting-color'],
        ['markerEnd', 'marker-end'],
        ['markerMid', 'marker-mid'],
        ['markerStart', 'marker-start'],
        ['overlinePosition', 'overline-position'],
        ['overlineThickness', 'overline-thickness'],
        ['paintOrder', 'paint-order'],
        ['panose-1', 'panose-1'],
        ['pointerEvents', 'pointer-events'],
        ['renderingIntent', 'rendering-intent'],
        ['shapeRendering', 'shape-rendering'],
        ['stopColor', 'stop-color'],
        ['stopOpacity', 'stop-opacity'],
        ['strikethroughPosition', 'strikethrough-position'],
        ['strikethroughThickness', 'strikethrough-thickness'],
        ['strokeDasharray', 'stroke-dasharray'],
        ['strokeDashoffset', 'stroke-dashoffset'],
        ['strokeLinecap', 'stroke-linecap'],
        ['strokeLinejoin', 'stroke-linejoin'],
        ['strokeMiterlimit', 'stroke-miterlimit'],
        ['strokeOpacity', 'stroke-opacity'],
        ['strokeWidth', 'stroke-width'],
        ['textAnchor', 'text-anchor'],
        ['textDecoration', 'text-decoration'],
        ['textRendering', 'text-rendering'],
        ['transformOrigin', 'transform-origin'],
        ['underlinePosition', 'underline-position'],
        ['underlineThickness', 'underline-thickness'],
        ['unicodeBidi', 'unicode-bidi'],
        ['unicodeRange', 'unicode-range'],
        ['unitsPerEm', 'units-per-em'],
        ['vAlphabetic', 'v-alphabetic'],
        ['vHanging', 'v-hanging'],
        ['vIdeographic', 'v-ideographic'],
        ['vMathematical', 'v-mathematical'],
        ['vectorEffect', 'vector-effect'],
        ['vertAdvY', 'vert-adv-y'],
        ['vertOriginX', 'vert-origin-x'],
        ['vertOriginY', 'vert-origin-y'],
        ['wordSpacing', 'word-spacing'],
        ['writingMode', 'writing-mode'],
        ['xmlnsXlink', 'xmlns:xlink'],
        ['xHeight', 'x-height'],
      ]),
      Tt =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Lt(e) {
      return Tt.test(String(e))
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : e;
    }
    var Ot = null;
    function At(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    var Rt = null,
      Dt = null;
    function Mt(e) {
      var t = We(e);
      if (t && (e = t.stateNode)) {
        var n = e[De] || null;
        e: switch (((e = t.stateNode), t.type)) {
          case 'input':
            if (
              (yt(
                e,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              ),
              (t = n.name),
              'radio' === n.type && null != t)
            ) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll('input[name="' + bt(String(t)) + '"][type="radio"]'), t = 0;
                t < n.length;
                t++
              ) {
                var l = n[t];
                if (l !== e && l.form === e.form) {
                  var a = l[De] || null;
                  if (!a) throw Error(r(90));
                  yt(
                    l,
                    a.value,
                    a.defaultValue,
                    a.defaultValue,
                    a.checked,
                    a.defaultChecked,
                    a.type,
                    a.name,
                  );
                }
              }
              for (t = 0; t < n.length; t++) (l = n[t]).form === e.form && mt(l);
            }
            break e;
          case 'textarea':
            St(e, n.value, n.defaultValue);
            break e;
          case 'select':
            null != (t = n.value) && kt(e, Boolean(n.multiple), t, !1);
        }
      }
    }
    var Ft = !1;
    function It(e, t, n) {
      if (Ft) return e(t, n);
      Ft = !0;
      try {
        return e(t);
      } finally {
        if (
          ((Ft = !1),
          (null !== Rt || null !== Dt) &&
            (Vs(), Rt && ((t = Rt), (e = Dt), (Dt = Rt = null), Mt(t), e)))
        )
          for (t = 0; t < e.length; t++) Mt(e[t]);
      }
    }
    function jt(e, t) {
      var n = e.stateNode;
      if (null === n) return null;
      var l = n[De] || null;
      if (null === l) return null;
      n = l[t];
      e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
          (l = !l.disabled) ||
            (l = !(
              'button' === (e = e.type) ||
              'input' === e ||
              'select' === e ||
              'textarea' === e
            )),
            (e = !l);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && 'function' != typeof n) throw Error(r(231, t, typeof n));
      return n;
    }
    var Ut = !(
        'undefined' == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      ),
      Ht = !1;
    if (Ut)
      try {
        var $t = {};
        Object.defineProperty($t, 'passive', {
          get: function () {
            Ht = !0;
          },
        }),
          window.addEventListener('test', $t, $t),
          window.removeEventListener('test', $t, $t);
      } catch (e) {
        Ht = !1;
      }
    var Vt = null,
      Wt = null,
      Bt = null;
    function qt() {
      if (Bt) return Bt;
      var e,
        t,
        n = Wt,
        r = n.length,
        l = 'value' in Vt ? Vt.value : Vt.textContent,
        a = l.length;
      for (e = 0; e < r && n[e] === l[e]; e++);
      var o = r - e;
      for (t = 1; t <= o && n[r - t] === l[a - t]; t++);
      return (Bt = l.slice(e, 1 < t ? 1 - t : void 0));
    }
    function Qt(e) {
      var t = e.keyCode;
      return (
        'charCode' in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    function Gt() {
      return !0;
    }
    function Kt() {
      return !1;
    }
    function Yt(e) {
      function t(t, n, r, l, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = l),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(l) : l[o]));
        return (
          (this.isDefaultPrevented = (
            null != l.defaultPrevented ? l.defaultPrevented : !1 === l.returnValue
          )
            ? Gt
            : Kt),
          (this.isPropagationStopped = Kt),
          this
        );
      }
      return (
        c(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : 'unknown' != typeof e.returnValue && (e.returnValue = !1),
              (this.isDefaultPrevented = Gt));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : 'unknown' != typeof e.cancelBubble && (e.cancelBubble = !0),
              (this.isPropagationStopped = Gt));
          },
          persist: function () {},
          isPersistent: Gt,
        }),
        t
      );
    }
    var Xt,
      Zt,
      Jt,
      en = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      tn = Yt(en),
      nn = c({}, en, { view: 0, detail: 0 }),
      rn = Yt(nn),
      ln = c({}, nn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: gn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return void 0 === e.relatedTarget
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return 'movementX' in e
            ? e.movementX
            : (e !== Jt &&
                (Jt && 'mousemove' === e.type
                  ? ((Xt = e.screenX - Jt.screenX), (Zt = e.screenY - Jt.screenY))
                  : (Zt = Xt = 0),
                (Jt = e)),
              Xt);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : Zt;
        },
      }),
      an = Yt(ln),
      on = Yt(c({}, ln, { dataTransfer: 0 })),
      un = Yt(c({}, nn, { relatedTarget: 0 })),
      sn = Yt(c({}, en, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
      cn = Yt(
        c({}, en, {
          clipboardData: function (e) {
            return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
          },
        }),
      ),
      dn = Yt(c({}, en, { data: 0 })),
      fn = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      pn = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowRight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      mn = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
    function hn(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : Boolean((e = mn[e])) && Boolean(t[e]);
    }
    function gn() {
      return hn;
    }
    var bn = Yt(
        c({}, nn, {
          key: function (e) {
            if (e.key) {
              var t = fn[e.key] || e.key;
              if ('Unidentified' !== t) return t;
            }
            return 'keypress' === e.type
              ? 13 === (e = Qt(e))
                ? 'Enter'
                : String.fromCharCode(e)
              : 'keydown' === e.type || 'keyup' === e.type
                ? pn[e.keyCode] || 'Unidentified'
                : '';
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: gn,
          charCode: function (e) {
            return 'keypress' === e.type ? Qt(e) : 0;
          },
          keyCode: function (e) {
            return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
          },
          which: function (e) {
            return 'keypress' === e.type
              ? Qt(e)
              : 'keydown' === e.type || 'keyup' === e.type
                ? e.keyCode
                : 0;
          },
        }),
      ),
      yn = Yt(
        c({}, ln, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      vn = Yt(
        c({}, nn, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: gn,
        }),
      ),
      wn = Yt(c({}, en, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      kn = Yt(
        c({}, ln, {
          deltaX: function (e) {
            return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
          },
          deltaY: function (e) {
            return 'deltaY' in e
              ? e.deltaY
              : 'wheelDeltaY' in e
                ? -e.wheelDeltaY
                : 'wheelDelta' in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      Sn = Yt(c({}, en, { newState: 0, oldState: 0 })),
      xn = [9, 13, 27, 32],
      _n = Ut && 'CompositionEvent' in window,
      En = null;
    Ut && 'documentMode' in document && (En = document.documentMode);
    var Cn = Ut && 'TextEvent' in window && !En,
      zn = Ut && (!_n || (En && 8 < En && 11 >= En)),
      Nn = String.fromCharCode(32),
      Pn = !1;
    function Tn(e, t) {
      switch (e) {
        case 'keyup':
          return -1 !== xn.indexOf(t.keyCode);
        case 'keydown':
          return 229 !== t.keyCode;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
          return !0;
        default:
          return !1;
      }
    }
    function Ln(e) {
      return 'object' == typeof (e = e.detail) && 'data' in e ? e.data : null;
    }
    var On = !1;
    var An = {
      color: !0,
      date: !0,
      datetime: !0,
      'datetime-local': !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function Rn(e) {}
    function Dn(e, t, n, r) {
      Rt ? (Dt ? Dt.push(r) : (Dt = [r])) : (Rt = r),
        0 < (t = qc(t, 'onChange')).length &&
          ((n = new tn('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }));
    }
    var Mn = null,
      Fn = null;
    function In(e) {
      Ic(e, 0);
    }
    function jn(e) {
      if (mt(Be(e))) return e;
    }
    function Un(e, t) {
      if ('change' === e) return t;
    }
    var Hn = !1;
    if (Ut) {
      var $n;
      if (Ut) {
        var Vn = 'oninput' in document;
        if (!Vn) {
          var Wn = document.createElement('div');
          Wn.setAttribute('oninput', 'return;'), (Vn = 'function' == typeof Wn.oninput);
        }
        $n = Vn;
      } else $n = !1;
      Hn = $n && (!document.documentMode || 9 < document.documentMode);
    }
    function Bn() {
      Mn && (Mn.detachEvent('onpropertychange', qn), (Fn = Mn = null));
    }
    function qn(e) {
      if ('value' === e.propertyName && jn(Fn)) {
        var t = [];
        Dn(t, Fn, e, At(e)), It(In, t);
      }
    }
    function Qn(e, t, n) {
      'focusin' === e
        ? (Bn(), (Fn = n), (Mn = t).attachEvent('onpropertychange', qn))
        : 'focusout' === e && Bn();
    }
    function Gn(e) {
      if ('selectionchange' === e || 'keyup' === e || 'keydown' === e) return jn(Fn);
    }
    function Kn(e, t) {
      if ('click' === e) return jn(t);
    }
    function Yn(e, t) {
      if ('input' === e || 'change' === e) return jn(t);
    }
    var Xn =
      'function' == typeof Object.is
        ? Object.is
        : function (e, t) {
            return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
          };
    function Zn(e, t) {
      if (Xn(e, t)) return !0;
      if ('object' != typeof e || null === e || 'object' != typeof t || null === t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!Z.call(t, l) || !Xn(e[l], t[l])) return !1;
      }
      return !0;
    }
    function Jn(e) {
      for (; e?.firstChild; ) e = e.firstChild;
      return e;
    }
    function er(e, t) {
      var n,
        r = Jn(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = e + r.textContent.length), e <= t && n >= t)) return { node: r, offset: t - e };
          e = n;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = Jn(r);
      }
    }
    function tr(e, t) {
      return (
        !(!e || !t) &&
        (e === t ||
          ((!e || 3 !== e.nodeType) &&
            (t && 3 === t.nodeType
              ? tr(e, t.parentNode)
              : 'contains' in e
                ? e.contains(t)
                : Boolean(e.compareDocumentPosition) &&
                  Boolean(16 & e.compareDocumentPosition(t)))))
      );
    }
    function nr(e) {
      for (
        var t = ht(
          (e =
            null != e && null != e.ownerDocument && null != e.ownerDocument.defaultView
              ? e.ownerDocument.defaultView
              : window).document,
        );
        t instanceof e.HTMLIFrameElement;

      ) {
        try {
          var n = 'string' == typeof t.contentWindow.location.href;
        } catch (e) {
          n = !1;
        }
        if (!n) break;
        t = ht((e = t.contentWindow).document);
      }
      return t;
    }
    function rr(e) {
      var t = e?.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (('input' === t &&
          ('text' === e.type ||
            'search' === e.type ||
            'tel' === e.type ||
            'url' === e.type ||
            'password' === e.type)) ||
          'textarea' === t ||
          'true' === e.contentEditable)
      );
    }
    var lr = Ut && 'documentMode' in document && 11 >= document.documentMode,
      ar = null,
      or = null,
      ir = null,
      ur = !1;
    function sr(e, t, n) {
      var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
      ur ||
        null == ar ||
        ar !== ht(r) ||
        ('selectionStart' in (r = ar) && rr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : (r = {
              anchorNode: (r = (r.ownerDocument?.defaultView || window).getSelection()).anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            }),
        (ir && Zn(ir, r)) ||
          ((ir = r),
          0 < (r = qc(or, 'onSelect')).length &&
            ((t = new tn('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = ar))));
    }
    function cr(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var dr = {
        animationend: cr('Animation', 'AnimationEnd'),
        animationiteration: cr('Animation', 'AnimationIteration'),
        animationstart: cr('Animation', 'AnimationStart'),
        transitionrun: cr('Transition', 'TransitionRun'),
        transitionstart: cr('Transition', 'TransitionStart'),
        transitioncancel: cr('Transition', 'TransitionCancel'),
        transitionend: cr('Transition', 'TransitionEnd'),
      },
      fr = {},
      pr = {};
    function mr(e) {
      if (fr[e]) return fr[e];
      if (!dr[e]) return e;
      var t,
        n = dr[e];
      for (t in n) if (n.hasOwnProperty(t) && t in pr) return (fr[e] = n[t]);
      return e;
    }
    Ut &&
      ((pr = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete dr.animationend.animation,
        delete dr.animationiteration.animation,
        delete dr.animationstart.animation),
      'TransitionEvent' in window || delete dr.transitionend.transition);
    var hr = mr('animationend'),
      gr = mr('animationiteration'),
      br = mr('animationstart'),
      yr = mr('transitionrun'),
      vr = mr('transitionstart'),
      wr = mr('transitioncancel'),
      kr = mr('transitionend'),
      Sr = new Map(),
      xr =
        'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
          ' ',
        );
    function _r(e, t) {
      Sr.set(e, t), Ye(t, [e]);
    }
    xr.push('scrollEnd');
    var Er = new WeakMap();
    function Cr(e, t) {
      if ('object' == typeof e && null !== e) {
        var n = Er.get(e);
        return void 0 !== n ? n : ((t = { value: e, source: t, stack: ct(t) }), Er.set(e, t), t);
      }
      return { value: e, source: t, stack: ct(t) };
    }
    var zr = [],
      Nr = 0,
      Pr = 0;
    function Tr() {
      for (var e = Nr, t = (Pr = Nr = 0); t < e; ) {
        var n = zr[t];
        zr[t++] = null;
        var r = zr[t];
        zr[t++] = null;
        var l = zr[t];
        zr[t++] = null;
        var a = zr[t];
        if (((zr[t++] = null), null !== r && null !== l)) {
          var o = r.pending;
          null === o ? (l.next = l) : ((l.next = o.next), (o.next = l)), (r.pending = l);
        }
        0 !== a && Rr(n, l, a);
      }
    }
    function Lr(e, t, n, r) {
      (zr[Nr++] = e),
        (zr[Nr++] = t),
        (zr[Nr++] = n),
        (zr[Nr++] = r),
        (Pr |= r),
        (e.lanes |= r),
        null !== (e = e.alternate) && (e.lanes |= r);
    }
    function Or(e, t, n, r) {
      return Lr(e, t, n, r), Dr(e);
    }
    function Ar(e, t) {
      return Lr(e, null, null, t), Dr(e);
    }
    function Rr(e, t, n) {
      e.lanes |= n;
      var r = e.alternate;
      null !== r && (r.lanes |= n);
      for (var l = !1, a = e.return; null !== a; )
        (a.childLanes |= n),
          null !== (r = a.alternate) && (r.childLanes |= n),
          22 === a.tag && (null === (e = a.stateNode) || 1 & e._visibility || (l = !0)),
          (e = a),
          (a = a.return);
      return 3 === e.tag
        ? ((a = e.stateNode),
          l &&
            null !== t &&
            ((l = 31 - he(n)),
            null === (r = (e = a.hiddenUpdates)[l]) ? (e[l] = [t]) : r.push(t),
            (t.lane = 536870912 | n)),
          a)
        : null;
    }
    function Dr(e) {
      if (50 < Rs) throw ((Rs = 0), (Ds = null), Error(r(185)));
      for (var t = e.return; null !== t; ) t = (e = t).return;
      return 3 === e.tag ? e.stateNode : null;
    }
    var Mr = {};
    function Fr(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function Ir(e, t, n, r) {
      return new Fr(e, t, n, r);
    }
    function jr(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function Ur(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? (((n = Ir(e.tag, t, e.key, e.mode)).elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = 65011712 & e.flags),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        (n.refCleanup = e.refCleanup),
        n
      );
    }
    function Hr(e, t) {
      e.flags &= 65011714;
      var n = e.alternate;
      return (
        null === n
          ? ((e.childLanes = 0),
            (e.lanes = t),
            (e.child = null),
            (e.subtreeFlags = 0),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.dependencies = null),
            (e.stateNode = null))
          : ((e.childLanes = n.childLanes),
            (e.lanes = n.lanes),
            (e.child = n.child),
            (e.subtreeFlags = 0),
            (e.deletions = null),
            (e.memoizedProps = n.memoizedProps),
            (e.memoizedState = n.memoizedState),
            (e.updateQueue = n.updateQueue),
            (e.type = n.type),
            (t = n.dependencies),
            (e.dependencies =
              null === t ? null : { lanes: t.lanes, firstContext: t.firstContext })),
        e
      );
    }
    function $r(e, t, n, l, a, o) {
      var i = 0;
      if (((l = e), 'function' == typeof e)) jr(e) && (i = 1);
      else if ('string' == typeof e)
        i = (function (e, t, n) {
          if (1 === n || null != t.itemProp) return !1;
          switch (e) {
            case 'meta':
            case 'title':
              return !0;
            case 'style':
              if ('string' != typeof t.precedence || 'string' != typeof t.href || '' === t.href)
                break;
              return !0;
            case 'link':
              if (
                'string' != typeof t.rel ||
                'string' != typeof t.href ||
                '' === t.href ||
                t.onLoad ||
                t.onError
              )
                break;
              return (
                'stylesheet' !== t.rel ||
                ((e = t.disabled), 'string' == typeof t.precedence && null == e)
              );
            case 'script':
              if (
                t.async &&
                'function' != typeof t.async &&
                'symbol' != typeof t.async &&
                !t.onLoad &&
                !t.onError &&
                t.src &&
                'string' == typeof t.src
              )
                return !0;
          }
          return !1;
        })(e, n, W.current)
          ? 26
          : 'html' === e || 'head' === e || 'body' === e
            ? 27
            : 5;
      else
        e: switch (e) {
          case P:
            return ((e = Ir(31, n, t, a)).elementType = P), (e.lanes = o), e;
          case h:
            return Vr(n.children, a, o, t);
          case g:
            (i = 8), (a |= 24);
            break;
          case y:
            return ((e = Ir(12, n, t, 2 | a)).elementType = y), (e.lanes = o), e;
          case _:
            return ((e = Ir(13, n, t, a)).elementType = _), (e.lanes = o), e;
          case C:
            return ((e = Ir(19, n, t, a)).elementType = C), (e.lanes = o), e;
          default:
            if ('object' == typeof e && null !== e)
              switch (e.$$typeof) {
                case v:
                case S:
                  i = 10;
                  break e;
                case k:
                  i = 9;
                  break e;
                case x:
                  i = 11;
                  break e;
                case z:
                  i = 14;
                  break e;
                case N:
                  (i = 16), (l = null);
                  break e;
              }
            (i = 29), (n = Error(r(130, null === e ? 'null' : typeof e, ''))), (l = null);
        }
      return ((t = Ir(i, n, t, a)).elementType = e), (t.type = l), (t.lanes = o), t;
    }
    function Vr(e, t, n, r) {
      return ((e = Ir(7, e, r, t)).lanes = n), e;
    }
    function Wr(e, t, n) {
      return ((e = Ir(6, e, null, t)).lanes = n), e;
    }
    function Br(e, t, n) {
      return (
        ((t = Ir(4, null !== e.children ? e.children : [], e.key, t)).lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    var qr = [],
      Qr = 0,
      Gr = null,
      Kr = 0,
      Yr = [],
      Xr = 0,
      Zr = null,
      Jr = 1,
      el = '';
    function tl(e, t) {
      (qr[Qr++] = Kr), (qr[Qr++] = Gr), (Gr = e), (Kr = t);
    }
    function nl(e, t, n) {
      (Yr[Xr++] = Jr), (Yr[Xr++] = el), (Yr[Xr++] = Zr), (Zr = e);
      var r = Jr;
      e = el;
      var l = 32 - he(r) - 1;
      (r &= ~(1 << l)), (n += 1);
      var a = 32 - he(t) + l;
      if (30 < a) {
        var o = l - (l % 5);
        (a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (l -= o),
          (Jr = (1 << (32 - he(t) + l)) | (n << l) | r),
          (el = a + e);
      } else (Jr = (1 << a) | (n << l) | r), (el = e);
    }
    function rl(e) {
      null !== e.return && (tl(e, 1), nl(e, 1, 0));
    }
    function ll(e) {
      for (; e === Gr; ) (Gr = qr[--Qr]), (qr[Qr] = null), (Kr = qr[--Qr]), (qr[Qr] = null);
      for (; e === Zr; )
        (Zr = Yr[--Xr]),
          (Yr[Xr] = null),
          (el = Yr[--Xr]),
          (Yr[Xr] = null),
          (Jr = Yr[--Xr]),
          (Yr[Xr] = null);
    }
    var al = null,
      ol = null,
      il = !1,
      ul = null,
      sl = !1,
      cl = Error(r(519));
    function dl(e) {
      throw (bl(Cr(Error(r(418, '')), e)), cl);
    }
    function fl(e) {
      var t = e.stateNode,
        n = e.type,
        r = e.memoizedProps;
      switch (((t[Re] = e), (t[De] = r), n)) {
        case 'dialog':
          jc('cancel', t), jc('close', t);
          break;
        case 'iframe':
        case 'object':
        case 'embed':
          jc('load', t);
          break;
        case 'video':
        case 'audio':
          for (n = 0; n < Mc.length; n++) jc(Mc[n], t);
          break;
        case 'source':
          jc('error', t);
          break;
        case 'img':
        case 'image':
        case 'link':
          jc('error', t), jc('load', t);
          break;
        case 'details':
          jc('toggle', t);
          break;
        case 'input':
          jc('invalid', t),
            vt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0),
            pt(t);
          break;
        case 'select':
          jc('invalid', t);
          break;
        case 'textarea':
          jc('invalid', t), xt(t, r.value, r.defaultValue, r.children), pt(t);
      }
      ('string' != typeof (n = r.children) && 'number' != typeof n && 'bigint' != typeof n) ||
      t.textContent === String(n) ||
      !0 === r.suppressHydrationWarning ||
      Zc(t.textContent, n)
        ? (null != r.popover && (jc('beforetoggle', t), jc('toggle', t)),
          null != r.onScroll && jc('scroll', t),
          null != r.onScrollEnd && jc('scrollend', t),
          null != r.onClick && (t.onclick = Jc),
          (t = !0))
        : (t = !1),
        t || dl(e);
    }
    function pl(e) {
      for (al = e.return; al; )
        switch (al.tag) {
          case 5:
          case 13:
            return void (sl = !1);
          case 27:
          case 3:
            return void (sl = !0);
          default:
            al = al.return;
        }
    }
    function ml(e) {
      if (e !== al) return !1;
      if (!il) return pl(e), (il = !0), !1;
      var t,
        n = e.tag;
      if (
        ((t = 3 !== n && 27 !== n) &&
          ((t = 5 === n) &&
            (t = !('form' !== (t = e.type) && 'button' !== t) || ud(e.type, e.memoizedProps)),
          (t = !t)),
        t && ol && dl(e),
        pl(e),
        13 === n)
      ) {
        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(r(317));
        e: {
          for (e = e.nextSibling, n = 0; e; ) {
            if (8 === e.nodeType)
              if ('/$' === (t = e.data)) {
                if (0 === n) {
                  ol = vd(e.nextSibling);
                  break e;
                }
                n--;
              } else ('$' !== t && '$!' !== t && '$?' !== t) || n++;
            e = e.nextSibling;
          }
          ol = null;
        }
      } else
        27 === n
          ? ((n = ol), hd(e.type) ? ((e = wd), (wd = null), (ol = e)) : (ol = n))
          : (ol = al ? vd(e.stateNode.nextSibling) : null);
      return !0;
    }
    function hl() {
      (ol = al = null), (il = !1);
    }
    function gl() {
      var e = ul;
      return null !== e && (null === ks ? (ks = e) : ks.push.apply(ks, e), (ul = null)), e;
    }
    function bl(e) {
      null === ul ? (ul = [e]) : ul.push(e);
    }
    var yl = H(null),
      vl = null,
      wl = null;
    function kl(e, t, n) {
      V(yl, t._currentValue), (t._currentValue = n);
    }
    function Sl(e) {
      (e._currentValue = yl.current), $(yl);
    }
    function xl(e, t, n) {
      for (; null !== e; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) !== t
            ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
            : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function _l(e, t, n, l) {
      var a = e.child;
      for (null !== a && (a.return = e); null !== a; ) {
        var o = a.dependencies;
        if (null !== o) {
          var i = a.child;
          o = o.firstContext;
          e: for (; null !== o; ) {
            var u = o;
            o = a;
            for (var s = 0; s < t.length; s++)
              if (u.context === t[s]) {
                (o.lanes |= n),
                  null !== (u = o.alternate) && (u.lanes |= n),
                  xl(o.return, n, e),
                  l || (i = null);
                break e;
              }
            o = u.next;
          }
        } else if (18 === a.tag) {
          if (null === (i = a.return)) throw Error(r(341));
          (i.lanes |= n), null !== (o = i.alternate) && (o.lanes |= n), xl(i, n, e), (i = null);
        } else i = a.child;
        if (null !== i) i.return = a;
        else
          for (i = a; null !== i; ) {
            if (i === e) {
              i = null;
              break;
            }
            if (null !== (a = i.sibling)) {
              (a.return = i.return), (i = a);
              break;
            }
            i = i.return;
          }
        a = i;
      }
    }
    function El(e, t, n, l) {
      e = null;
      for (var a = t, o = !1; null !== a; ) {
        if (!o)
          if (524288 & a.flags) o = !0;
          else if (262144 & a.flags) break;
        if (10 === a.tag) {
          var i = a.alternate;
          if (null === i) throw Error(r(387));
          if (null !== (i = i.memoizedProps)) {
            var u = a.type;
            Xn(a.pendingProps.value, i.value) || (null !== e ? e.push(u) : (e = [u]));
          }
        } else if (a === Q.current) {
          if (null === (i = a.alternate)) throw Error(r(387));
          i.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
            (null !== e ? e.push(Yd) : (e = [Yd]));
        }
        a = a.return;
      }
      null !== e && _l(t, e, n, l), (t.flags |= 262144);
    }
    function Cl(e) {
      for (e = e.firstContext; null !== e; ) {
        if (!Xn(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function zl(e) {
      (vl = e), (wl = null), null !== (e = e.dependencies) && (e.firstContext = null);
    }
    function Nl(e) {
      return Tl(vl, e);
    }
    function Pl(e, t) {
      return null === vl && zl(e), Tl(e, t);
    }
    function Tl(e, t) {
      var n = t._currentValue;
      if (((t = { context: t, memoizedValue: n, next: null }), null === wl)) {
        if (null === e) throw Error(r(308));
        (wl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288);
      } else wl = wl.next = t;
      return n;
    }
    var Ll =
        'undefined' != typeof AbortController
          ? AbortController
          : function () {
              var e = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (t, n) {
                    e.push(n);
                  },
                });
              this.abort = function () {
                (t.aborted = !0),
                  e.forEach(function (e) {
                    return e();
                  });
              };
            },
      Ol = e.unstable_scheduleCallback,
      Al = e.unstable_NormalPriority,
      Rl = {
        $$typeof: S,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function Dl() {
      return { controller: new Ll(), data: new Map(), refCount: 0 };
    }
    function Ml(e) {
      e.refCount--,
        0 === e.refCount &&
          Ol(Al, function () {
            e.controller.abort();
          });
    }
    var Fl = null,
      Il = 0,
      jl = 0,
      Ul = null;
    function Hl() {
      if (0 === --Il && null !== Fl) {
        null !== Ul && (Ul.status = 'fulfilled');
        var e = Fl;
        (Fl = null), (jl = 0), (Ul = null);
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    var $l = M.S;
    M.S = function (e, t) {
      'object' == typeof t &&
        null !== t &&
        'function' == typeof t.then &&
        (function (e, t) {
          if (null === Fl) {
            var n = (Fl = []);
            (Il = 0),
              (jl = Lc()),
              (Ul = {
                status: 'pending',
                value: void 0,
                then: function (e) {
                  n.push(e);
                },
              });
          }
          Il++, t.then(Hl, Hl);
        })(0, t),
        null !== $l && $l(e, t);
    };
    var Vl = H(null);
    function Wl() {
      var e = Vl.current;
      return null !== e ? e : as.pooledCache;
    }
    function Bl(e, t) {
      V(Vl, null === t ? Vl.current : t.pool);
    }
    function ql() {
      var e = Wl();
      return null === e ? null : { parent: Rl._currentValue, pool: e };
    }
    var Ql = Error(r(460)),
      Gl = Error(r(474)),
      Kl = Error(r(542)),
      Yl = { then: function () {} };
    function Xl(e) {
      return 'fulfilled' === (e = e.status) || 'rejected' === e;
    }
    function Zl() {}
    function Jl(e, t, n) {
      switch (
        (void 0 === (n = e[n]) ? e.push(t) : n !== t && (t.then(Zl, Zl), (t = n)), t.status)
      ) {
        case 'fulfilled':
          return t.value;
        case 'rejected':
          throw (na((e = t.reason)), e);
        default:
          if ('string' == typeof t.status) t.then(Zl, Zl);
          else {
            if (null !== (e = as) && 100 < e.shellSuspendCounter) throw Error(r(482));
            ((e = t).status = 'pending'),
              e.then(
                function (e) {
                  if ('pending' === t.status) {
                    var n = t;
                    (n.status = 'fulfilled'), (n.value = e);
                  }
                },
                function (e) {
                  if ('pending' === t.status) {
                    var n = t;
                    (n.status = 'rejected'), (n.reason = e);
                  }
                },
              );
          }
          switch (t.status) {
            case 'fulfilled':
              return t.value;
            case 'rejected':
              throw (na((e = t.reason)), e);
          }
          throw ((ea = t), Ql);
      }
    }
    var ea = null;
    function ta() {
      if (null === ea) throw Error(r(459));
      var e = ea;
      return (ea = null), e;
    }
    function na(e) {
      if (e === Ql || e === Kl) throw Error(r(483));
    }
    var ra = !1;
    function la(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function aa(e, t) {
      (e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null,
          });
    }
    function oa(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function ia(e, t, n) {
      var r = e.updateQueue;
      if (null === r) return null;
      if (((r = r.shared), 2 & ls)) {
        var l = r.pending;
        return (
          null === l ? (t.next = t) : ((t.next = l.next), (l.next = t)),
          (r.pending = t),
          (t = Dr(e)),
          Rr(e, null, n),
          t
        );
      }
      return Lr(e, r, t, n), Dr(e);
    }
    function ua(e, t, n) {
      if (null !== (t = t.updateQueue) && ((t = t.shared), 4194048 & n)) {
        var r = t.lanes;
        (n |= r &= e.pendingLanes), (t.lanes = n), Pe(e, n);
      }
    }
    function sa(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (null !== r && n === (r = r.updateQueue)) {
        var l = null,
          a = null;
        if (null !== (n = n.firstBaseUpdate)) {
          do {
            var o = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
            null === a ? (l = a = o) : (a = a.next = o), (n = n.next);
          } while (null !== n);
          null === a ? (l = a = t) : (a = a.next = t);
        } else l = a = t;
        return (
          (n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: a,
            shared: r.shared,
            callbacks: r.callbacks,
          }),
          void (e.updateQueue = n)
        );
      }
      null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
    }
    var ca = !1;
    function da() {
      if (ca) {
        if (null !== Ul) throw Ul;
      }
    }
    function fa(e, t, n, r) {
      ca = !1;
      var l = e.updateQueue;
      ra = !1;
      var a = l.firstBaseUpdate,
        o = l.lastBaseUpdate,
        i = l.shared.pending;
      if (null !== i) {
        l.shared.pending = null;
        var u = i,
          s = u.next;
        (u.next = null), null === o ? (a = s) : (o.next = s), (o = u);
        var d = e.alternate;
        null !== d &&
          (i = (d = d.updateQueue).lastBaseUpdate) !== o &&
          (null === i ? (d.firstBaseUpdate = s) : (i.next = s), (d.lastBaseUpdate = u));
      }
      if (null !== a) {
        var f = l.baseState;
        for (o = 0, d = s = u = null, i = a; ; ) {
          var p = -536870913 & i.lane,
            m = p !== i.lane;
          if (m ? (is & p) === p : (r & p) === p) {
            0 !== p && p === jl && (ca = !0),
              null !== d &&
                (d = d.next =
                  { lane: 0, tag: i.tag, payload: i.payload, callback: null, next: null });
            e: {
              var h = e,
                g = i;
              p = t;
              var b = n;
              switch (g.tag) {
                case 1:
                  if ('function' == typeof (h = g.payload)) {
                    f = h.call(b, f, p);
                    break e;
                  }
                  f = h;
                  break e;
                case 3:
                  h.flags = (-65537 & h.flags) | 128;
                case 0:
                  if (null == (p = 'function' == typeof (h = g.payload) ? h.call(b, f, p) : h))
                    break e;
                  f = c({}, f, p);
                  break e;
                case 2:
                  ra = !0;
              }
            }
            null !== (p = i.callback) &&
              ((e.flags |= 64),
              m && (e.flags |= 8192),
              null === (m = l.callbacks) ? (l.callbacks = [p]) : m.push(p));
          } else
            (m = { lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }),
              null === d ? ((s = d = m), (u = f)) : (d = d.next = m),
              (o |= p);
          if (null === (i = i.next)) {
            if (null === (i = l.shared.pending)) break;
            (i = (m = i).next), (m.next = null), (l.lastBaseUpdate = m), (l.shared.pending = null);
          }
        }
        null === d && (u = f),
          (l.baseState = u),
          (l.firstBaseUpdate = s),
          (l.lastBaseUpdate = d),
          null === a && (l.shared.lanes = 0),
          (hs |= o),
          (e.lanes = o),
          (e.memoizedState = f);
      }
    }
    function pa(e, t) {
      if ('function' != typeof e) throw Error(r(191, e));
      e.call(t);
    }
    function ma(e, t) {
      var n = e.callbacks;
      if (null !== n) for (e.callbacks = null, e = 0; e < n.length; e++) pa(n[e], t);
    }
    var ha = H(null),
      ga = H(0);
    function ba(e, t) {
      V(ga, (e = ps)), V(ha, t), (ps = e | t.baseLanes);
    }
    function ya() {
      V(ga, ps), V(ha, ha.current);
    }
    function va() {
      (ps = ga.current), $(ha), $(ga);
    }
    var wa = 0,
      ka = null,
      Sa = null,
      xa = null,
      _a = !1,
      Ea = !1,
      Ca = !1,
      za = 0,
      Na = 0,
      Pa = null,
      Ta = 0;
    function La() {
      throw Error(r(321));
    }
    function Oa(e, t) {
      if (null === t) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!Xn(e[n], t[n])) return !1;
      return !0;
    }
    function Aa(e, t, n, r, l, a) {
      return (
        (wa = a),
        (ka = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (M.H = null === e || null === e.memoizedState ? Go : Ko),
        (Ca = !1),
        (a = n(r, l)),
        (Ca = !1),
        Ea && (a = Da(t, n, r, l)),
        Ra(e),
        a
      );
    }
    function Ra(e) {
      M.H = Qo;
      var t = null !== Sa && null !== Sa.next;
      if (((wa = 0), (xa = Sa = ka = null), (_a = !1), (Na = 0), (Pa = null), t))
        throw Error(r(300));
      null === e || Pi || (null !== (e = e.dependencies) && Cl(e) && (Pi = !0));
    }
    function Da(e, t, n, l) {
      ka = e;
      var a = 0;
      do {
        if ((Ea && (Pa = null), (Na = 0), (Ea = !1), 25 <= a)) throw Error(r(301));
        if (((a += 1), (xa = Sa = null), null != e.updateQueue)) {
          var o = e.updateQueue;
          (o.lastEffect = null),
            (o.events = null),
            (o.stores = null),
            null != o.memoCache && (o.memoCache.index = 0);
        }
        (M.H = Yo), (o = t(n, l));
      } while (Ea);
      return o;
    }
    function Ma() {
      var e = M.H,
        t = e.useState()[0];
      return (
        (t = 'function' == typeof t.then ? $a(t) : t),
        (e = e.useState()[0]),
        (null !== Sa ? Sa.memoizedState : null) !== e && (ka.flags |= 1024),
        t
      );
    }
    function Fa() {
      var e = 0 !== za;
      return (za = 0), e;
    }
    function Ia(e, t, n) {
      (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
    }
    function ja(e) {
      if (_a) {
        for (e = e.memoizedState; null !== e; ) {
          var t = e.queue;
          null !== t && (t.pending = null), (e = e.next);
        }
        _a = !1;
      }
      (wa = 0), (xa = Sa = ka = null), (Ea = !1), (Na = za = 0), (Pa = null);
    }
    function Ua() {
      var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return null === xa ? (ka.memoizedState = xa = e) : (xa = xa.next = e), xa;
    }
    function Ha() {
      if (null === Sa) {
        var e = ka.alternate;
        e = null !== e ? e.memoizedState : null;
      } else e = Sa.next;
      var t = null === xa ? ka.memoizedState : xa.next;
      if (null !== t) (xa = t), (Sa = e);
      else {
        if (null === e) {
          if (null === ka.alternate) throw Error(r(467));
          throw Error(r(310));
        }
        (e = {
          memoizedState: (Sa = e).memoizedState,
          baseState: Sa.baseState,
          baseQueue: Sa.baseQueue,
          queue: Sa.queue,
          next: null,
        }),
          null === xa ? (ka.memoizedState = xa = e) : (xa = xa.next = e);
      }
      return xa;
    }
    function $a(e) {
      var t = Na;
      return (
        (Na += 1),
        null === Pa && (Pa = []),
        (e = Jl(Pa, e, t)),
        (t = ka),
        null === (null === xa ? t.memoizedState : xa.next) &&
          ((t = t.alternate), (M.H = null === t || null === t.memoizedState ? Go : Ko)),
        e
      );
    }
    function Va(e) {
      if (null !== e && 'object' == typeof e) {
        if ('function' == typeof e.then) return $a(e);
        if (e.$$typeof === S) return Nl(e);
      }
      throw Error(r(438, String(e)));
    }
    function Wa(e) {
      var t = null,
        n = ka.updateQueue;
      if ((null !== n && (t = n.memoCache), null == t)) {
        var r = ka.alternate;
        null !== r &&
          null !== (r = r.updateQueue) &&
          null != (r = r.memoCache) &&
          (t = {
            data: r.data.map(function (e) {
              return e.slice();
            }),
            index: 0,
          });
      }
      if (
        (null == t && (t = { data: [], index: 0 }),
        null === n &&
          ((n = { lastEffect: null, events: null, stores: null, memoCache: null }),
          (ka.updateQueue = n)),
        (n.memoCache = t),
        void 0 === (n = t.data[t.index]))
      )
        for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = T;
      return t.index++, n;
    }
    function Ba(e, t) {
      return 'function' == typeof t ? t(e) : t;
    }
    function qa(e) {
      return Qa(Ha(), Sa, e);
    }
    function Qa(e, t, n) {
      var l = e.queue;
      if (null === l) throw Error(r(311));
      l.lastRenderedReducer = n;
      var a = e.baseQueue,
        o = l.pending;
      if (null !== o) {
        if (null !== a) {
          var i = a.next;
          (a.next = o.next), (o.next = i);
        }
        (t.baseQueue = a = o), (l.pending = null);
      }
      if (((o = e.baseState), null === a)) e.memoizedState = o;
      else {
        var u = (i = null),
          s = null,
          c = (t = a.next),
          d = !1;
        do {
          var f = -536870913 & c.lane;
          if (f !== c.lane ? (is & f) === f : (wa & f) === f) {
            var p = c.revertLane;
            if (0 === p)
              null !== s &&
                (s = s.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null,
                  }),
                f === jl && (d = !0);
            else {
              if ((wa & p) === p) {
                (c = c.next), p === jl && (d = !0);
                continue;
              }
              (f = {
                lane: 0,
                revertLane: c.revertLane,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null,
              }),
                null === s ? ((u = s = f), (i = o)) : (s = s.next = f),
                (ka.lanes |= p),
                (hs |= p);
            }
            (f = c.action), Ca && n(o, f), (o = c.hasEagerState ? c.eagerState : n(o, f));
          } else
            (p = {
              lane: f,
              revertLane: c.revertLane,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
              null === s ? ((u = s = p), (i = o)) : (s = s.next = p),
              (ka.lanes |= f),
              (hs |= f);
          c = c.next;
        } while (null !== c && c !== t);
        if (
          (null === s ? (i = o) : (s.next = u),
          !Xn(o, e.memoizedState) && ((Pi = !0), d && null !== (n = Ul)))
        )
          throw n;
        (e.memoizedState = o), (e.baseState = i), (e.baseQueue = s), (l.lastRenderedState = o);
      }
      return null === a && (l.lanes = 0), [e.memoizedState, l.dispatch];
    }
    function Ga(e) {
      var t = Ha(),
        n = t.queue;
      if (null === n) throw Error(r(311));
      n.lastRenderedReducer = e;
      var l = n.dispatch,
        a = n.pending,
        o = t.memoizedState;
      if (null !== a) {
        n.pending = null;
        var i = (a = a.next);
        do {
          (o = e(o, i.action)), (i = i.next);
        } while (i !== a);
        Xn(o, t.memoizedState) || (Pi = !0),
          (t.memoizedState = o),
          null === t.baseQueue && (t.baseState = o),
          (n.lastRenderedState = o);
      }
      return [o, l];
    }
    function Ka(e, t, n) {
      var l = ka,
        a = Ha(),
        o = il;
      if (o) {
        if (void 0 === n) throw Error(r(407));
        n = n();
      } else n = t();
      var i = !Xn((Sa || a).memoizedState, n);
      if (
        (i && ((a.memoizedState = n), (Pi = !0)),
        (a = a.queue),
        vo(2048, 8, Za.bind(null, l, a, e), [e]),
        a.getSnapshot !== t || i || (null !== xa && 1 & xa.memoizedState.tag))
      ) {
        if (
          ((l.flags |= 2048),
          go(9, { destroy: void 0, resource: void 0 }, Xa.bind(null, l, a, n, t), null),
          null === as)
        )
          throw Error(r(349));
        o || 124 & wa || Ya(l, t, n);
      }
      return n;
    }
    function Ya(e, t, n) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        null === (t = ka.updateQueue)
          ? ((t = { lastEffect: null, events: null, stores: null, memoCache: null }),
            (ka.updateQueue = t),
            (t.stores = [e]))
          : null === (n = t.stores)
            ? (t.stores = [e])
            : n.push(e);
    }
    function Xa(e, t, n, r) {
      (t.value = n), (t.getSnapshot = r), Ja(t) && eo(e);
    }
    function Za(e, t, n) {
      return n(function () {
        Ja(t) && eo(e);
      });
    }
    function Ja(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Xn(e, n);
      } catch (e) {
        return !0;
      }
    }
    function eo(e) {
      var t = Ar(e, 2);
      null !== t && Is(t, e, 2);
    }
    function to(e) {
      var t = Ua();
      if ('function' == typeof e) {
        var n = e;
        if (((e = n()), Ca)) {
          me(!0);
          try {
            n();
          } finally {
            me(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = e),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ba,
          lastRenderedState: e,
        }),
        t
      );
    }
    function no(e, t, n, r) {
      return (e.baseState = n), Qa(e, Sa, 'function' == typeof r ? r : Ba);
    }
    function ro(e, t, n, l, a) {
      if (Wo(e)) throw Error(r(485));
      if (null !== (e = t.action)) {
        var o = {
          payload: a,
          action: e,
          next: null,
          isTransition: !0,
          status: 'pending',
          value: null,
          reason: null,
          listeners: [],
          then: function (e) {
            o.listeners.push(e);
          },
        };
        null !== M.T ? n(!0) : (o.isTransition = !1),
          l(o),
          null === (n = t.pending)
            ? ((o.next = t.pending = o), lo(t, o))
            : ((o.next = n.next), (t.pending = n.next = o));
      }
    }
    function lo(e, t) {
      var n = t.action,
        r = t.payload,
        l = e.state;
      if (t.isTransition) {
        var a = M.T,
          o = {};
        M.T = o;
        try {
          var i = n(l, r),
            u = M.S;
          null !== u && u(o, i), ao(e, t, i);
        } catch (n) {
          io(e, t, n);
        } finally {
          M.T = a;
        }
      } else
        try {
          ao(e, t, (a = n(l, r)));
        } catch (n) {
          io(e, t, n);
        }
    }
    function ao(e, t, n) {
      null !== n && 'object' == typeof n && 'function' == typeof n.then
        ? n.then(
            function (n) {
              oo(e, t, n);
            },
            function (n) {
              return io(e, t, n);
            },
          )
        : oo(e, t, n);
    }
    function oo(e, t, n) {
      (t.status = 'fulfilled'),
        (t.value = n),
        uo(t),
        (e.state = n),
        null !== (t = e.pending) &&
          ((n = t.next) === t ? (e.pending = null) : ((n = n.next), (t.next = n), lo(e, n)));
    }
    function io(e, t, n) {
      var r = e.pending;
      if (((e.pending = null), null !== r)) {
        r = r.next;
        do {
          (t.status = 'rejected'), (t.reason = n), uo(t), (t = t.next);
        } while (t !== r);
      }
      e.action = null;
    }
    function uo(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function so(e, t) {
      return t;
    }
    function co(e, t) {
      if (il) {
        var n = as.formState;
        if (null !== n) {
          e: {
            var r = ka;
            if (il) {
              if (ol) {
                t: {
                  for (var l = ol, a = sl; 8 !== l.nodeType; ) {
                    if (!a) {
                      l = null;
                      break t;
                    }
                    if (null === (l = vd(l.nextSibling))) {
                      l = null;
                      break t;
                    }
                  }
                  l = 'F!' === (a = l.data) || 'F' === a ? l : null;
                }
                if (l) {
                  (ol = vd(l.nextSibling)), (r = 'F!' === l.data);
                  break e;
                }
              }
              dl(r);
            }
            r = !1;
          }
          r && (t = n[0]);
        }
      }
      return (
        ((n = Ua()).memoizedState = n.baseState = t),
        (r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: so,
          lastRenderedState: t,
        }),
        (n.queue = r),
        (n = Ho.bind(null, ka, r)),
        (r.dispatch = n),
        (r = to(!1)),
        (a = Vo.bind(null, ka, !1, r.queue)),
        (l = { state: t, dispatch: null, action: e, pending: null }),
        ((r = Ua()).queue = l),
        (n = ro.bind(null, ka, l, a, n)),
        (l.dispatch = n),
        (r.memoizedState = e),
        [t, n, !1]
      );
    }
    function fo(e) {
      return po(Ha(), Sa, e);
    }
    function po(e, t, n) {
      if (
        ((t = Qa(e, t, so)[0]),
        (e = qa(Ba)[0]),
        'object' == typeof t && null !== t && 'function' == typeof t.then)
      )
        try {
          var r = $a(t);
        } catch (e) {
          if (e === Ql) throw Kl;
          throw e;
        }
      else r = t;
      var l = (t = Ha()).queue,
        a = l.dispatch;
      return (
        n !== t.memoizedState &&
          ((ka.flags |= 2048),
          go(9, { destroy: void 0, resource: void 0 }, mo.bind(null, l, n), null)),
        [r, a, e]
      );
    }
    function mo(e, t) {
      e.action = t;
    }
    function ho(e) {
      var t = Ha(),
        n = Sa;
      if (null !== n) return po(t, n, e);
      Ha(), (t = t.memoizedState);
      var r = (n = Ha()).queue.dispatch;
      return (n.memoizedState = e), [t, r, !1];
    }
    function go(e, t, n, r) {
      return (
        (e = { tag: e, create: n, deps: r, inst: t, next: null }),
        null === (t = ka.updateQueue) &&
          ((t = { lastEffect: null, events: null, stores: null, memoCache: null }),
          (ka.updateQueue = t)),
        null === (n = t.lastEffect)
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      );
    }
    function bo() {
      return Ha().memoizedState;
    }
    function yo(e, t, n, r) {
      var l = Ua();
      (r = void 0 === r ? null : r),
        (ka.flags |= e),
        (l.memoizedState = go(1 | t, { destroy: void 0, resource: void 0 }, n, r));
    }
    function vo(e, t, n, r) {
      var l = Ha();
      r = void 0 === r ? null : r;
      var a = l.memoizedState.inst;
      null !== Sa && null !== r && Oa(r, Sa.memoizedState.deps)
        ? (l.memoizedState = go(t, a, n, r))
        : ((ka.flags |= e), (l.memoizedState = go(1 | t, a, n, r)));
    }
    function wo(e, t) {
      yo(8390656, 8, e, t);
    }
    function ko(e, t) {
      vo(2048, 8, e, t);
    }
    function So(e, t) {
      return vo(4, 2, e, t);
    }
    function xo(e, t) {
      return vo(4, 4, e, t);
    }
    function _o(e, t) {
      if ('function' == typeof t) {
        e = e();
        var n = t(e);
        return function () {
          'function' == typeof n ? n() : t(null);
        };
      }
      if (null != t)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function Eo(e, t, n) {
      (n = null != n ? n.concat([e]) : null), vo(4, 4, _o.bind(null, t, e), n);
    }
    function Co() {}
    function zo(e, t) {
      var n = Ha();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== t && Oa(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
    }
    function No(e, t) {
      var n = Ha();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      if (null !== t && Oa(t, r[1])) return r[0];
      if (((r = e()), Ca)) {
        me(!0);
        try {
          e();
        } finally {
          me(!1);
        }
      }
      return (n.memoizedState = [r, t]), r;
    }
    function Po(e, t, n) {
      return void 0 === n || 1073741824 & wa
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = Fs()), (ka.lanes |= e), (hs |= e), n);
    }
    function To(e, t, n, r) {
      return Xn(n, t)
        ? n
        : null !== ha.current
          ? ((e = Po(e, n, r)), Xn(e, t) || (Pi = !0), e)
          : 42 & wa
            ? ((e = Fs()), (ka.lanes |= e), (hs |= e), t)
            : ((Pi = !0), (e.memoizedState = n));
    }
    function Lo(e, t, n, r, l) {
      var a = F.p;
      F.p = 0 !== a && 8 > a ? a : 8;
      var o = M.T,
        i = {};
      (M.T = i), Vo(e, !1, t, n);
      try {
        var u = l(),
          s = M.S;
        if (
          (null !== s && s(i, u), null !== u && 'object' == typeof u && 'function' == typeof u.then)
        ) {
          var c = (function (e, t) {
            var n = [],
              r = {
                status: 'pending',
                value: null,
                reason: null,
                then: function (e) {
                  n.push(e);
                },
              };
            return (
              e.then(
                function () {
                  (r.status = 'fulfilled'), (r.value = t);
                  for (var e = 0; e < n.length; e++) (0, n[e])(t);
                },
                function (e) {
                  for (r.status = 'rejected', r.reason = e, e = 0; e < n.length; e++)
                    (0, n[e])(void 0);
                },
              ),
              r
            );
          })(u, r);
          $o(e, t, c, Ms());
        } else $o(e, t, r, Ms());
      } catch (n) {
        $o(e, t, { then: function () {}, status: 'rejected', reason: n }, Ms());
      } finally {
        (F.p = a), (M.T = o);
      }
    }
    function Oo() {}
    function Ao(e, t, n, l) {
      if (5 !== e.tag) throw Error(r(476));
      var a = Ro(e).queue;
      Lo(
        e,
        a,
        t,
        I,
        null === n
          ? Oo
          : function () {
              return Do(e), n(l);
            },
      );
    }
    function Ro(e) {
      var t = e.memoizedState;
      if (null !== t) return t;
      var n = {};
      return (
        ((t = {
          memoizedState: I,
          baseState: I,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Ba,
            lastRenderedState: I,
          },
          next: null,
        }).next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Ba,
            lastRenderedState: n,
          },
          next: null,
        }),
        (e.memoizedState = t),
        null !== (e = e.alternate) && (e.memoizedState = t),
        t
      );
    }
    function Do(e) {
      $o(e, Ro(e).next.queue, {}, Ms());
    }
    function Mo() {
      return Nl(Yd);
    }
    function Fo() {
      return Ha().memoizedState;
    }
    function Io() {
      return Ha().memoizedState;
    }
    function jo(e) {
      for (var t = e.return; null !== t; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = Ms(),
              r = ia(t, (e = oa(n)), n);
            return (
              null !== r && (Is(r, t, n), ua(r, t, n)), (t = { cache: Dl() }), void (e.payload = t)
            );
        }
        t = t.return;
      }
    }
    function Uo(e, t, n) {
      var r = Ms();
      (n = { lane: r, revertLane: 0, action: n, hasEagerState: !1, eagerState: null, next: null }),
        Wo(e) ? Bo(t, n) : null !== (n = Or(e, t, n, r)) && (Is(n, e, r), qo(n, t, r));
    }
    function Ho(e, t, n) {
      $o(e, t, n, Ms());
    }
    function $o(e, t, n, r) {
      var l = {
        lane: r,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Wo(e)) Bo(t, l);
      else {
        var a = e.alternate;
        if (0 === e.lanes && (null === a || 0 === a.lanes) && null !== (a = t.lastRenderedReducer))
          try {
            var o = t.lastRenderedState,
              i = a(o, n);
            if (((l.hasEagerState = !0), (l.eagerState = i), Xn(i, o)))
              return Lr(e, t, l, 0), null === as && Tr(), !1;
          } catch (e) {}
        if (null !== (n = Or(e, t, l, r))) return Is(n, e, r), qo(n, t, r), !0;
      }
      return !1;
    }
    function Vo(e, t, n, l) {
      if (
        ((l = {
          lane: 2,
          revertLane: Lc(),
          action: l,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Wo(e))
      ) {
        if (t) throw Error(r(479));
      } else null !== (t = Or(e, n, l, 2)) && Is(t, e, 2);
    }
    function Wo(e) {
      var t = e.alternate;
      return e === ka || (null !== t && t === ka);
    }
    function Bo(e, t) {
      Ea = _a = !0;
      var n = e.pending;
      null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
    }
    function qo(e, t, n) {
      if (4194048 & n) {
        var r = t.lanes;
        (n |= r &= e.pendingLanes), (t.lanes = n), Pe(e, n);
      }
    }
    var Qo = {
        readContext: Nl,
        use: Va,
        useCallback: La,
        useContext: La,
        useEffect: La,
        useImperativeHandle: La,
        useLayoutEffect: La,
        useInsertionEffect: La,
        useMemo: La,
        useReducer: La,
        useRef: La,
        useState: La,
        useDebugValue: La,
        useDeferredValue: La,
        useTransition: La,
        useSyncExternalStore: La,
        useId: La,
        useHostTransitionStatus: La,
        useFormState: La,
        useActionState: La,
        useOptimistic: La,
        useMemoCache: La,
        useCacheRefresh: La,
      },
      Go = {
        readContext: Nl,
        use: Va,
        useCallback: function (e, t) {
          return (Ua().memoizedState = [e, void 0 === t ? null : t]), e;
        },
        useContext: Nl,
        useEffect: wo,
        useImperativeHandle: function (e, t, n) {
          (n = null != n ? n.concat([e]) : null), yo(4194308, 4, _o.bind(null, t, e), n);
        },
        useLayoutEffect: function (e, t) {
          return yo(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          yo(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Ua();
          t = void 0 === t ? null : t;
          var r = e();
          if (Ca) {
            me(!0);
            try {
              e();
            } finally {
              me(!1);
            }
          }
          return (n.memoizedState = [r, t]), r;
        },
        useReducer: function (e, t, n) {
          var r = Ua();
          if (void 0 !== n) {
            var l = n(t);
            if (Ca) {
              me(!0);
              try {
                n(t);
              } finally {
                me(!1);
              }
            }
          } else l = t;
          return (
            (r.memoizedState = r.baseState = l),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: l,
            }),
            (r.queue = e),
            (e = e.dispatch = Uo.bind(null, ka, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (Ua().memoizedState = e);
        },
        useState: function (e) {
          var t = (e = to(e)).queue,
            n = Ho.bind(null, ka, t);
          return (t.dispatch = n), [e.memoizedState, n];
        },
        useDebugValue: Co,
        useDeferredValue: function (e, t) {
          return Po(Ua(), e, t);
        },
        useTransition: function () {
          var e = to(!1);
          return (e = Lo.bind(null, ka, e.queue, !0, !1)), (Ua().memoizedState = e), [!1, e];
        },
        useSyncExternalStore: function (e, t, n) {
          var l = ka,
            a = Ua();
          if (il) {
            if (void 0 === n) throw Error(r(407));
            n = n();
          } else {
            if (((n = t()), null === as)) throw Error(r(349));
            124 & is || Ya(l, t, n);
          }
          a.memoizedState = n;
          var o = { value: n, getSnapshot: t };
          return (
            (a.queue = o),
            wo(Za.bind(null, l, o, e), [e]),
            (l.flags |= 2048),
            go(9, { destroy: void 0, resource: void 0 }, Xa.bind(null, l, o, n, t), null),
            n
          );
        },
        useId: function () {
          var e = Ua(),
            t = as.identifierPrefix;
          if (il) {
            var n = el;
            (t = '«' + t + 'R' + (n = (Jr & ~(1 << (32 - he(Jr) - 1))).toString(32) + n)),
              0 < (n = za++) && (t += 'H' + n.toString(32)),
              (t += '»');
          } else t = '«' + t + 'r' + (n = Ta++).toString(32) + '»';
          return (e.memoizedState = t);
        },
        useHostTransitionStatus: Mo,
        useFormState: co,
        useActionState: co,
        useOptimistic: function (e) {
          var t = Ua();
          t.memoizedState = t.baseState = e;
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (t.queue = n), (t = Vo.bind(null, ka, !0, n)), (n.dispatch = t), [e, t];
        },
        useMemoCache: Wa,
        useCacheRefresh: function () {
          return (Ua().memoizedState = jo.bind(null, ka));
        },
      },
      Ko = {
        readContext: Nl,
        use: Va,
        useCallback: zo,
        useContext: Nl,
        useEffect: ko,
        useImperativeHandle: Eo,
        useInsertionEffect: So,
        useLayoutEffect: xo,
        useMemo: No,
        useReducer: qa,
        useRef: bo,
        useState: function () {
          return qa(Ba);
        },
        useDebugValue: Co,
        useDeferredValue: function (e, t) {
          return To(Ha(), Sa.memoizedState, e, t);
        },
        useTransition: function () {
          var e = qa(Ba)[0],
            t = Ha().memoizedState;
          return ['boolean' == typeof e ? e : $a(e), t];
        },
        useSyncExternalStore: Ka,
        useId: Fo,
        useHostTransitionStatus: Mo,
        useFormState: fo,
        useActionState: fo,
        useOptimistic: function (e, t) {
          return no(Ha(), 0, e, t);
        },
        useMemoCache: Wa,
        useCacheRefresh: Io,
      },
      Yo = {
        readContext: Nl,
        use: Va,
        useCallback: zo,
        useContext: Nl,
        useEffect: ko,
        useImperativeHandle: Eo,
        useInsertionEffect: So,
        useLayoutEffect: xo,
        useMemo: No,
        useReducer: Ga,
        useRef: bo,
        useState: function () {
          return Ga(Ba);
        },
        useDebugValue: Co,
        useDeferredValue: function (e, t) {
          var n = Ha();
          return null === Sa ? Po(n, e, t) : To(n, Sa.memoizedState, e, t);
        },
        useTransition: function () {
          var e = Ga(Ba)[0],
            t = Ha().memoizedState;
          return ['boolean' == typeof e ? e : $a(e), t];
        },
        useSyncExternalStore: Ka,
        useId: Fo,
        useHostTransitionStatus: Mo,
        useFormState: ho,
        useActionState: ho,
        useOptimistic: function (e, t) {
          var n = Ha();
          return null !== Sa ? no(n, 0, e, t) : ((n.baseState = e), [e, n.queue.dispatch]);
        },
        useMemoCache: Wa,
        useCacheRefresh: Io,
      },
      Xo = null,
      Zo = 0;
    function Jo(e) {
      var t = Zo;
      return (Zo += 1), null === Xo && (Xo = []), Jl(Xo, e, t);
    }
    function ei(e, t) {
      (t = t.props.ref), (e.ref = void 0 !== t ? t : null);
    }
    function ti(e, t) {
      if (t.$$typeof === f) throw Error(r(525));
      throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            '[object Object]' === e ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e,
          ),
        ))
      );
    }
    function ni(e) {
      return (0, e._init)(e._payload);
    }
    function ri(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function l(e) {
        for (var t = new Map(); null !== e; )
          null !== e.key ? t.set(e.key, e) : t.set(e.index, e), (e = e.sibling);
        return t;
      }
      function a(e, t) {
        return ((e = Ur(e, t)).index = 0), (e.sibling = null), e;
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? null !== (r = t.alternate)
              ? (r = r.index) < n
                ? ((t.flags |= 67108866), n)
                : r
              : ((t.flags |= 67108866), n)
            : ((t.flags |= 1048576), n)
        );
      }
      function i(t) {
        return e && null === t.alternate && (t.flags |= 67108866), t;
      }
      function u(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? (((t = Wr(n, e.mode, r)).return = e), t)
          : (((t = a(t, n)).return = e), t);
      }
      function s(e, t, n, r) {
        var l = n.type;
        return l === h
          ? d(e, t, n.props.children, r, n.key)
          : null !== t &&
              (t.elementType === l ||
                ('object' == typeof l && null !== l && l.$$typeof === N && ni(l) === t.type))
            ? (ei((t = a(t, n.props)), n), (t.return = e), t)
            : (ei((t = $r(n.type, n.key, n.props, null, e.mode, r)), n), (t.return = e), t);
      }
      function c(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? (((t = Br(n, e.mode, r)).return = e), t)
          : (((t = a(t, n.children || [])).return = e), t);
      }
      function d(e, t, n, r, l) {
        return null === t || 7 !== t.tag
          ? (((t = Vr(n, e.mode, r, l)).return = e), t)
          : (((t = a(t, n)).return = e), t);
      }
      function f(e, t, n) {
        if (('string' == typeof t && '' !== t) || 'number' == typeof t || 'bigint' == typeof t)
          return ((t = Wr(String(t), e.mode, n)).return = e), t;
        if ('object' == typeof t && null !== t) {
          switch (t.$$typeof) {
            case p:
              return ei((n = $r(t.type, t.key, t.props, null, e.mode, n)), t), (n.return = e), n;
            case m:
              return ((t = Br(t, e.mode, n)).return = e), t;
            case N:
              return f(e, (t = (0, t._init)(t._payload)), n);
          }
          if (D(t) || O(t)) return ((t = Vr(t, e.mode, n, null)).return = e), t;
          if ('function' == typeof t.then) return f(e, Jo(t), n);
          if (t.$$typeof === S) return f(e, Pl(e, t), n);
          ti(e, t);
        }
        return null;
      }
      function g(e, t, n, r) {
        var l = null !== t ? t.key : null;
        if (('string' == typeof n && '' !== n) || 'number' == typeof n || 'bigint' == typeof n)
          return null !== l ? null : u(e, t, String(n), r);
        if ('object' == typeof n && null !== n) {
          switch (n.$$typeof) {
            case p:
              return n.key === l ? s(e, t, n, r) : null;
            case m:
              return n.key === l ? c(e, t, n, r) : null;
            case N:
              return g(e, t, (n = (l = n._init)(n._payload)), r);
          }
          if (D(n) || O(n)) return null !== l ? null : d(e, t, n, r, null);
          if ('function' == typeof n.then) return g(e, t, Jo(n), r);
          if (n.$$typeof === S) return g(e, t, Pl(e, n), r);
          ti(e, n);
        }
        return null;
      }
      function b(e, t, n, r, l) {
        if (('string' == typeof r && '' !== r) || 'number' == typeof r || 'bigint' == typeof r)
          return u(t, (e = e.get(n) || null), String(r), l);
        if ('object' == typeof r && null !== r) {
          switch (r.$$typeof) {
            case p:
              return s(t, (e = e.get(null === r.key ? n : r.key) || null), r, l);
            case m:
              return c(t, (e = e.get(null === r.key ? n : r.key) || null), r, l);
            case N:
              return b(e, t, n, (r = (0, r._init)(r._payload)), l);
          }
          if (D(r) || O(r)) return d(t, (e = e.get(n) || null), r, l, null);
          if ('function' == typeof r.then) return b(e, t, n, Jo(r), l);
          if (r.$$typeof === S) return b(e, t, n, Pl(t, r), l);
          ti(t, r);
        }
        return null;
      }
      function y(u, s, c, d) {
        if (
          ('object' == typeof c &&
            null !== c &&
            c.type === h &&
            null === c.key &&
            (c = c.props.children),
          'object' == typeof c && null !== c)
        ) {
          switch (c.$$typeof) {
            case p:
              e: {
                for (var v = c.key; null !== s; ) {
                  if (s.key === v) {
                    if ((v = c.type) === h) {
                      if (7 === s.tag) {
                        n(u, s.sibling), ((d = a(s, c.props.children)).return = u), (u = d);
                        break e;
                      }
                    } else if (
                      s.elementType === v ||
                      ('object' == typeof v && null !== v && v.$$typeof === N && ni(v) === s.type)
                    ) {
                      n(u, s.sibling), ei((d = a(s, c.props)), c), (d.return = u), (u = d);
                      break e;
                    }
                    n(u, s);
                    break;
                  }
                  t(u, s), (s = s.sibling);
                }
                c.type === h
                  ? (((d = Vr(c.props.children, u.mode, d, c.key)).return = u), (u = d))
                  : (ei((d = $r(c.type, c.key, c.props, null, u.mode, d)), c),
                    (d.return = u),
                    (u = d));
              }
              return i(u);
            case m:
              e: {
                for (v = c.key; null !== s; ) {
                  if (s.key === v) {
                    if (
                      4 === s.tag &&
                      s.stateNode.containerInfo === c.containerInfo &&
                      s.stateNode.implementation === c.implementation
                    ) {
                      n(u, s.sibling), ((d = a(s, c.children || [])).return = u), (u = d);
                      break e;
                    }
                    n(u, s);
                    break;
                  }
                  t(u, s), (s = s.sibling);
                }
                ((d = Br(c, u.mode, d)).return = u), (u = d);
              }
              return i(u);
            case N:
              return y(u, s, (c = (v = c._init)(c._payload)), d);
          }
          if (D(c))
            return (function (r, a, i, u) {
              for (
                var s = null, c = null, d = a, p = (a = 0), m = null;
                null !== d && p < i.length;
                p++
              ) {
                d.index > p ? ((m = d), (d = null)) : (m = d.sibling);
                var h = g(r, d, i[p], u);
                if (null === h) {
                  null === d && (d = m);
                  break;
                }
                e && d && null === h.alternate && t(r, d),
                  (a = o(h, a, p)),
                  null === c ? (s = h) : (c.sibling = h),
                  (c = h),
                  (d = m);
              }
              if (p === i.length) return n(r, d), il && tl(r, p), s;
              if (null === d) {
                for (; p < i.length; p++)
                  null !== (d = f(r, i[p], u)) &&
                    ((a = o(d, a, p)), null === c ? (s = d) : (c.sibling = d), (c = d));
                return il && tl(r, p), s;
              }
              for (d = l(d); p < i.length; p++)
                null !== (m = b(d, r, p, i[p], u)) &&
                  (e && null !== m.alternate && d.delete(null === m.key ? p : m.key),
                  (a = o(m, a, p)),
                  null === c ? (s = m) : (c.sibling = m),
                  (c = m));
              return (
                e &&
                  d.forEach(function (e) {
                    return t(r, e);
                  }),
                il && tl(r, p),
                s
              );
            })(u, s, c, d);
          if (O(c)) {
            if ('function' != typeof (v = O(c))) throw Error(r(150));
            return (function (a, i, u, s) {
              if (null == u) throw Error(r(151));
              for (
                var c = null, d = null, p = i, m = (i = 0), h = null, y = u.next();
                null !== p && !y.done;
                m++, y = u.next()
              ) {
                p.index > m ? ((h = p), (p = null)) : (h = p.sibling);
                var v = g(a, p, y.value, s);
                if (null === v) {
                  null === p && (p = h);
                  break;
                }
                e && p && null === v.alternate && t(a, p),
                  (i = o(v, i, m)),
                  null === d ? (c = v) : (d.sibling = v),
                  (d = v),
                  (p = h);
              }
              if (y.done) return n(a, p), il && tl(a, m), c;
              if (null === p) {
                for (; !y.done; m++, y = u.next())
                  null !== (y = f(a, y.value, s)) &&
                    ((i = o(y, i, m)), null === d ? (c = y) : (d.sibling = y), (d = y));
                return il && tl(a, m), c;
              }
              for (p = l(p); !y.done; m++, y = u.next())
                null !== (y = b(p, a, m, y.value, s)) &&
                  (e && null !== y.alternate && p.delete(null === y.key ? m : y.key),
                  (i = o(y, i, m)),
                  null === d ? (c = y) : (d.sibling = y),
                  (d = y));
              return (
                e &&
                  p.forEach(function (e) {
                    return t(a, e);
                  }),
                il && tl(a, m),
                c
              );
            })(u, s, (c = v.call(c)), d);
          }
          if ('function' == typeof c.then) return y(u, s, Jo(c), d);
          if (c.$$typeof === S) return y(u, s, Pl(u, c), d);
          ti(u, c);
        }
        return ('string' == typeof c && '' !== c) || 'number' == typeof c || 'bigint' == typeof c
          ? ((c = String(c)),
            null !== s && 6 === s.tag
              ? (n(u, s.sibling), ((d = a(s, c)).return = u), (u = d))
              : (n(u, s), ((d = Wr(c, u.mode, d)).return = u), (u = d)),
            i(u))
          : n(u, s);
      }
      return function (e, t, n, r) {
        try {
          Zo = 0;
          var l = y(e, t, n, r);
          return (Xo = null), l;
        } catch (t) {
          if (t === Ql || t === Kl) throw t;
          var a = Ir(29, t, null, e.mode);
          return (a.lanes = r), (a.return = e), a;
        }
      };
    }
    var li = ri(!0),
      ai = ri(!1),
      oi = H(null),
      ii = null;
    function ui(e) {
      var t = e.alternate;
      V(fi, 1 & fi.current),
        V(oi, e),
        null === ii && (null === t || null !== ha.current || null !== t.memoizedState) && (ii = e);
    }
    function si(e) {
      if (22 === e.tag) {
        if ((V(fi, fi.current), V(oi, e), null === ii)) {
          var t = e.alternate;
          null !== t && null !== t.memoizedState && (ii = e);
        }
      } else ci();
    }
    function ci() {
      V(fi, fi.current), V(oi, oi.current);
    }
    function di(e) {
      $(oi), ii === e && (ii = null), $(fi);
    }
    var fi = H(0);
    function pi(e) {
      for (var t = e; null !== t; ) {
        if (13 === t.tag) {
          var n = t.memoizedState;
          if (null !== n && (null === (n = n.dehydrated) || '$?' === n.data || yd(n))) return t;
        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
          if (128 & t.flags) return t;
        } else if (null !== t.child) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    function mi(e, t, n, r) {
      (n = null == (n = n(r, (t = e.memoizedState))) ? t : c({}, t, n)),
        (e.memoizedState = n),
        0 === e.lanes && (e.updateQueue.baseState = n);
    }
    var hi = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ms(),
          l = oa(r);
        (l.payload = t),
          null != n && (l.callback = n),
          null !== (t = ia(e, l, r)) && (Is(t, e, r), ua(t, e, r));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ms(),
          l = oa(r);
        (l.tag = 1),
          (l.payload = t),
          null != n && (l.callback = n),
          null !== (t = ia(e, l, r)) && (Is(t, e, r), ua(t, e, r));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Ms(),
          r = oa(n);
        (r.tag = 2),
          null != t && (r.callback = t),
          null !== (t = ia(e, r, n)) && (Is(t, e, n), ua(t, e, n));
      },
    };
    function gi(e, t, n, r, l, a, o) {
      return 'function' == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, a, o)
        : !t.prototype || !t.prototype.isPureReactComponent || !Zn(n, r) || !Zn(l, a);
    }
    function bi(e, t, n, r) {
      (e = t.state),
        'function' == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r),
        'function' == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && hi.enqueueReplaceState(t, t.state, null);
    }
    function yi(e, t) {
      var n = t;
      if ('ref' in t) for (var r in ((n = {}), t)) 'ref' !== r && (n[r] = t[r]);
      if ((e = e.defaultProps))
        for (var l in (n === t && (n = c({}, n)), e)) void 0 === n[l] && (n[l] = e[l]);
      return n;
    }
    var vi =
      'function' == typeof reportError
        ? reportError
        : function (e) {
            if ('object' == typeof window && 'function' == typeof window.ErrorEvent) {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  'object' == typeof e && null !== e && 'string' == typeof e.message
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if ('function' == typeof process.emit)
              return void process.emit('uncaughtException', e);
            console.error(e);
          };
    function wi(e) {
      vi(e);
    }
    function ki(e) {
      console.error(e);
    }
    function Si(e) {
      vi(e);
    }
    function xi(e, t) {
      try {
        (0, e.onUncaughtError)(t.value, { componentStack: t.stack });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function _i(e, t, n) {
      try {
        (0, e.onCaughtError)(n.value, {
          componentStack: n.stack,
          errorBoundary: 1 === t.tag ? t.stateNode : null,
        });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Ei(e, t, n) {
      return (
        ((n = oa(n)).tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          xi(e, t);
        }),
        n
      );
    }
    function Ci(e) {
      return ((e = oa(e)).tag = 3), e;
    }
    function zi(e, t, n, r) {
      var l = n.type.getDerivedStateFromError;
      if ('function' == typeof l) {
        var a = r.value;
        (e.payload = function () {
          return l(a);
        }),
          (e.callback = function () {
            _i(t, n, r);
          });
      }
      var o = n.stateNode;
      null !== o &&
        'function' == typeof o.componentDidCatch &&
        (e.callback = function () {
          _i(t, n, r),
            'function' != typeof l && (null === Cs ? (Cs = new Set([this])) : Cs.add(this));
          var e = r.stack;
          this.componentDidCatch(r.value, { componentStack: null !== e ? e : '' });
        });
    }
    var Ni = Error(r(461)),
      Pi = !1;
    function Ti(e, t, n, r) {
      t.child = null === e ? ai(t, null, n, r) : li(t, e.child, n, r);
    }
    function Li(e, t, n, r, l) {
      n = n.render;
      var a = t.ref;
      if ('ref' in r) {
        var o = {};
        for (var i in r) 'ref' !== i && (o[i] = r[i]);
      } else o = r;
      return (
        zl(t),
        (r = Aa(e, t, n, o, a, l)),
        (i = Fa()),
        null === e || Pi
          ? (il && i && rl(t), (t.flags |= 1), Ti(e, t, r, l), t.child)
          : (Ia(e, t, l), Xi(e, t, l))
      );
    }
    function Oi(e, t, n, r, l) {
      if (null === e) {
        var a = n.type;
        return 'function' != typeof a || jr(a) || void 0 !== a.defaultProps || null !== n.compare
          ? (((e = $r(n.type, null, r, t, t.mode, l)).ref = t.ref), (e.return = t), (t.child = e))
          : ((t.tag = 15), (t.type = a), Ai(e, t, a, r, l));
      }
      if (((a = e.child), !Zi(e, l))) {
        var o = a.memoizedProps;
        if ((n = null !== (n = n.compare) ? n : Zn)(o, r) && e.ref === t.ref) return Xi(e, t, l);
      }
      return (t.flags |= 1), ((e = Ur(a, r)).ref = t.ref), (e.return = t), (t.child = e);
    }
    function Ai(e, t, n, r, l) {
      if (null !== e) {
        var a = e.memoizedProps;
        if (Zn(a, r) && e.ref === t.ref) {
          if (((Pi = !1), (t.pendingProps = r = a), !Zi(e, l)))
            return (t.lanes = e.lanes), Xi(e, t, l);
          131072 & e.flags && (Pi = !0);
        }
      }
      return Fi(e, t, n, r, l);
    }
    function Ri(e, t, n) {
      var r = t.pendingProps,
        l = r.children,
        a = null !== e ? e.memoizedState : null;
      if ('hidden' === r.mode) {
        if (128 & t.flags) {
          if (((r = null !== a ? a.baseLanes | n : n), null !== e)) {
            for (l = t.child = e.child, a = 0; null !== l; )
              (a = a | l.lanes | l.childLanes), (l = l.sibling);
            t.childLanes = a & ~r;
          } else (t.childLanes = 0), (t.child = null);
          return Di(e, t, r, n);
        }
        if (!(536870912 & n))
          return (
            (t.lanes = t.childLanes = 536870912), Di(e, t, null !== a ? a.baseLanes | n : n, n)
          );
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          null !== e && Bl(0, null !== a ? a.cachePool : null),
          null !== a ? ba(t, a) : ya(),
          si(t);
      } else
        null !== a
          ? (Bl(0, a.cachePool), ba(t, a), ci(), (t.memoizedState = null))
          : (null !== e && Bl(0, null), ya(), ci());
      return Ti(e, t, l, n), t.child;
    }
    function Di(e, t, n, r) {
      var l = Wl();
      return (
        (l = null === l ? null : { parent: Rl._currentValue, pool: l }),
        (t.memoizedState = { baseLanes: n, cachePool: l }),
        null !== e && Bl(0, null),
        ya(),
        si(t),
        null !== e && El(e, t, r, !0),
        null
      );
    }
    function Mi(e, t) {
      var n = t.ref;
      if (null === n) null !== e && null !== e.ref && (t.flags |= 4194816);
      else {
        if ('function' != typeof n && 'object' != typeof n) throw Error(r(284));
        (null !== e && e.ref === n) || (t.flags |= 4194816);
      }
    }
    function Fi(e, t, n, r, l) {
      return (
        zl(t),
        (n = Aa(e, t, n, r, void 0, l)),
        (r = Fa()),
        null === e || Pi
          ? (il && r && rl(t), (t.flags |= 1), Ti(e, t, n, l), t.child)
          : (Ia(e, t, l), Xi(e, t, l))
      );
    }
    function Ii(e, t, n, r, l, a) {
      return (
        zl(t),
        (t.updateQueue = null),
        (n = Da(t, r, n, l)),
        Ra(e),
        (r = Fa()),
        null === e || Pi
          ? (il && r && rl(t), (t.flags |= 1), Ti(e, t, n, a), t.child)
          : (Ia(e, t, a), Xi(e, t, a))
      );
    }
    function ji(e, t, n, r, l) {
      if ((zl(t), null === t.stateNode)) {
        var a = Mr,
          o = n.contextType;
        'object' == typeof o && null !== o && (a = Nl(o)),
          (a = new n(r, a)),
          (t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null),
          (a.updater = hi),
          (t.stateNode = a),
          (a._reactInternals = t),
          ((a = t.stateNode).props = r),
          (a.state = t.memoizedState),
          (a.refs = {}),
          la(t),
          (o = n.contextType),
          (a.context = 'object' == typeof o && null !== o ? Nl(o) : Mr),
          (a.state = t.memoizedState),
          'function' == typeof (o = n.getDerivedStateFromProps) &&
            (mi(t, n, o, r), (a.state = t.memoizedState)),
          'function' == typeof n.getDerivedStateFromProps ||
            'function' == typeof a.getSnapshotBeforeUpdate ||
            ('function' != typeof a.UNSAFE_componentWillMount &&
              'function' != typeof a.componentWillMount) ||
            ((o = a.state),
            'function' == typeof a.componentWillMount && a.componentWillMount(),
            'function' == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(),
            o !== a.state && hi.enqueueReplaceState(a, a.state, null),
            fa(t, r, a, l),
            da(),
            (a.state = t.memoizedState)),
          'function' == typeof a.componentDidMount && (t.flags |= 4194308),
          (r = !0);
      } else if (null === e) {
        a = t.stateNode;
        var i = t.memoizedProps,
          u = yi(n, i);
        a.props = u;
        var s = a.context,
          c = n.contextType;
        (o = Mr), 'object' == typeof c && null !== c && (o = Nl(c));
        var d = n.getDerivedStateFromProps;
        (c = 'function' == typeof d || 'function' == typeof a.getSnapshotBeforeUpdate),
          (i = t.pendingProps !== i),
          c ||
            ('function' != typeof a.UNSAFE_componentWillReceiveProps &&
              'function' != typeof a.componentWillReceiveProps) ||
            ((i || s !== o) && bi(t, a, r, o)),
          (ra = !1);
        var f = t.memoizedState;
        (a.state = f),
          fa(t, r, a, l),
          da(),
          (s = t.memoizedState),
          i || f !== s || ra
            ? ('function' == typeof d && (mi(t, n, d, r), (s = t.memoizedState)),
              (u = ra || gi(t, n, u, r, f, s, o))
                ? (c ||
                    ('function' != typeof a.UNSAFE_componentWillMount &&
                      'function' != typeof a.componentWillMount) ||
                    ('function' == typeof a.componentWillMount && a.componentWillMount(),
                    'function' == typeof a.UNSAFE_componentWillMount &&
                      a.UNSAFE_componentWillMount()),
                  'function' == typeof a.componentDidMount && (t.flags |= 4194308))
                : ('function' == typeof a.componentDidMount && (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = s)),
              (a.props = r),
              (a.state = s),
              (a.context = o),
              (r = u))
            : ('function' == typeof a.componentDidMount && (t.flags |= 4194308), (r = !1));
      } else {
        (a = t.stateNode),
          aa(e, t),
          (c = yi(n, (o = t.memoizedProps))),
          (a.props = c),
          (d = t.pendingProps),
          (f = a.context),
          (s = n.contextType),
          (u = Mr),
          'object' == typeof s && null !== s && (u = Nl(s)),
          (s =
            'function' == typeof (i = n.getDerivedStateFromProps) ||
            'function' == typeof a.getSnapshotBeforeUpdate) ||
            ('function' != typeof a.UNSAFE_componentWillReceiveProps &&
              'function' != typeof a.componentWillReceiveProps) ||
            ((o !== d || f !== u) && bi(t, a, r, u)),
          (ra = !1),
          (f = t.memoizedState),
          (a.state = f),
          fa(t, r, a, l),
          da();
        var p = t.memoizedState;
        o !== d || f !== p || ra || (null !== e && null !== e.dependencies && Cl(e.dependencies))
          ? ('function' == typeof i && (mi(t, n, i, r), (p = t.memoizedState)),
            (c =
              ra ||
              gi(t, n, c, r, f, p, u) ||
              (null !== e && null !== e.dependencies && Cl(e.dependencies)))
              ? (s ||
                  ('function' != typeof a.UNSAFE_componentWillUpdate &&
                    'function' != typeof a.componentWillUpdate) ||
                  ('function' == typeof a.componentWillUpdate && a.componentWillUpdate(r, p, u),
                  'function' == typeof a.UNSAFE_componentWillUpdate &&
                    a.UNSAFE_componentWillUpdate(r, p, u)),
                'function' == typeof a.componentDidUpdate && (t.flags |= 4),
                'function' == typeof a.getSnapshotBeforeUpdate && (t.flags |= 1024))
              : ('function' != typeof a.componentDidUpdate ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                'function' != typeof a.getSnapshotBeforeUpdate ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = p)),
            (a.props = r),
            (a.state = p),
            (a.context = u),
            (r = c))
          : ('function' != typeof a.componentDidUpdate ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            'function' != typeof a.getSnapshotBeforeUpdate ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return (
        (a = r),
        Mi(e, t),
        (r = Boolean(128 & t.flags)),
        a || r
          ? ((a = t.stateNode),
            (n = r && 'function' != typeof n.getDerivedStateFromError ? null : a.render()),
            (t.flags |= 1),
            null !== e && r
              ? ((t.child = li(t, e.child, null, l)), (t.child = li(t, null, n, l)))
              : Ti(e, t, n, l),
            (t.memoizedState = a.state),
            (e = t.child))
          : (e = Xi(e, t, l)),
        e
      );
    }
    function Ui(e, t, n, r) {
      return hl(), (t.flags |= 256), Ti(e, t, n, r), t.child;
    }
    var Hi = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
    function $i(e) {
      return { baseLanes: e, cachePool: ql() };
    }
    function Vi(e, t, n) {
      return (e = null !== e ? e.childLanes & ~n : 0), t && (e |= ys), e;
    }
    function Wi(e, t, n) {
      var l,
        a = t.pendingProps,
        o = !1,
        i = Boolean(128 & t.flags);
      if (
        ((l = i) || (l = (null === e || null !== e.memoizedState) && Boolean(2 & fi.current)),
        l && ((o = !0), (t.flags &= -129)),
        (l = Boolean(32 & t.flags)),
        (t.flags &= -33),
        null === e)
      ) {
        if (il) {
          if ((o ? ui(t) : ci(), il)) {
            var u,
              s = ol;
            if ((u = s)) {
              e: {
                for (u = s, s = sl; 8 !== u.nodeType; ) {
                  if (!s) {
                    s = null;
                    break e;
                  }
                  if (null === (u = vd(u.nextSibling))) {
                    s = null;
                    break e;
                  }
                }
                s = u;
              }
              null !== s
                ? ((t.memoizedState = {
                    dehydrated: s,
                    treeContext: null !== Zr ? { id: Jr, overflow: el } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  ((u = Ir(18, null, null, 0)).stateNode = s),
                  (u.return = t),
                  (t.child = u),
                  (al = t),
                  (ol = null),
                  (u = !0))
                : (u = !1);
            }
            u || dl(t);
          }
          if (null !== (s = t.memoizedState) && null !== (s = s.dehydrated))
            return yd(s) ? (t.lanes = 32) : (t.lanes = 536870912), null;
          di(t);
        }
        return (
          (s = a.children),
          (a = a.fallback),
          o
            ? (ci(),
              (s = qi({ mode: 'hidden', children: s }, (o = t.mode))),
              (a = Vr(a, o, n, null)),
              (s.return = t),
              (a.return = t),
              (s.sibling = a),
              (t.child = s),
              ((o = t.child).memoizedState = $i(n)),
              (o.childLanes = Vi(e, l, n)),
              (t.memoizedState = Hi),
              a)
            : (ui(t), Bi(t, s))
        );
      }
      if (null !== (u = e.memoizedState) && null !== (s = u.dehydrated)) {
        if (i)
          256 & t.flags
            ? (ui(t), (t.flags &= -257), (t = Qi(e, t, n)))
            : null !== t.memoizedState
              ? (ci(), (t.child = e.child), (t.flags |= 128), (t = null))
              : (ci(),
                (o = a.fallback),
                (s = t.mode),
                (a = qi({ mode: 'visible', children: a.children }, s)),
                ((o = Vr(o, s, n, null)).flags |= 2),
                (a.return = t),
                (o.return = t),
                (a.sibling = o),
                (t.child = a),
                li(t, e.child, null, n),
                ((a = t.child).memoizedState = $i(n)),
                (a.childLanes = Vi(e, l, n)),
                (t.memoizedState = Hi),
                (t = o));
        else if ((ui(t), yd(s))) {
          if ((l = s.nextSibling?.dataset)) var c = l.dgst;
          (l = c),
            ((a = Error(r(419))).stack = ''),
            (a.digest = l),
            bl({ value: a, source: null, stack: null }),
            (t = Qi(e, t, n));
        } else if ((Pi || El(e, t, n, !1), (l = 0 !== (n & e.childLanes)), Pi || l)) {
          if (
            null !== (l = as) &&
            0 !==
              (a = 0 !== ((a = 42 & (a = n & -n) ? 1 : Te(a)) & (l.suspendedLanes | n)) ? 0 : a) &&
            a !== u.retryLane
          )
            throw ((u.retryLane = a), Ar(e, a), Is(l, e, a), Ni);
          '$?' === s.data || Ks(), (t = Qi(e, t, n));
        } else
          '$?' === s.data
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = u.treeContext),
              (ol = vd(s.nextSibling)),
              (al = t),
              (il = !0),
              (ul = null),
              (sl = !1),
              null !== e &&
                ((Yr[Xr++] = Jr),
                (Yr[Xr++] = el),
                (Yr[Xr++] = Zr),
                (Jr = e.id),
                (el = e.overflow),
                (Zr = t)),
              ((t = Bi(t, a.children)).flags |= 4096));
        return t;
      }
      return o
        ? (ci(),
          (o = a.fallback),
          (s = t.mode),
          (c = (u = e.child).sibling),
          ((a = Ur(u, { mode: 'hidden', children: a.children })).subtreeFlags =
            65011712 & u.subtreeFlags),
          null !== c ? (o = Ur(c, o)) : ((o = Vr(o, s, n, null)).flags |= 2),
          (o.return = t),
          (a.return = t),
          (a.sibling = o),
          (t.child = a),
          (a = o),
          (o = t.child),
          null === (s = e.child.memoizedState)
            ? (s = $i(n))
            : (null !== (u = s.cachePool)
                ? ((c = Rl._currentValue), (u = u.parent !== c ? { parent: c, pool: c } : u))
                : (u = ql()),
              (s = { baseLanes: s.baseLanes | n, cachePool: u })),
          (o.memoizedState = s),
          (o.childLanes = Vi(e, l, n)),
          (t.memoizedState = Hi),
          a)
        : (ui(t),
          (e = (n = e.child).sibling),
          ((n = Ur(n, { mode: 'visible', children: a.children })).return = t),
          (n.sibling = null),
          null !== e &&
            (null === (l = t.deletions) ? ((t.deletions = [e]), (t.flags |= 16)) : l.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n);
    }
    function Bi(e, t) {
      return ((t = qi({ mode: 'visible', children: t }, e.mode)).return = e), (e.child = t);
    }
    function qi(e, t) {
      return (
        ((e = Ir(22, e, null, t)).lanes = 0),
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
        e
      );
    }
    function Qi(e, t, n) {
      return (
        li(t, e.child, null, n),
        ((e = Bi(t, t.pendingProps.children)).flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function Gi(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      null !== r && (r.lanes |= t), xl(e.return, t, n);
    }
    function Ki(e, t, n, r, l) {
      var a = e.memoizedState;
      null === a
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: l,
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.renderingStartTime = 0),
          (a.last = r),
          (a.tail = n),
          (a.tailMode = l));
    }
    function Yi(e, t, n) {
      var r = t.pendingProps,
        l = r.revealOrder,
        a = r.tail;
      if ((Ti(e, t, r.children, n), 2 & (r = fi.current))) (r = (1 & r) | 2), (t.flags |= 128);
      else {
        if (null !== e && 128 & e.flags)
          e: for (e = t.child; null !== e; ) {
            if (13 === e.tag) null !== e.memoizedState && Gi(e, n, t);
            else if (19 === e.tag) Gi(e, n, t);
            else if (null !== e.child) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      switch ((V(fi, r), l)) {
        case 'forwards':
          for (n = t.child, l = null; null !== n; )
            null !== (e = n.alternate) && null === pi(e) && (l = n), (n = n.sibling);
          null === (n = l)
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
            Ki(t, !1, l, n, a);
          break;
        case 'backwards':
          for (n = null, l = t.child, t.child = null; null !== l; ) {
            if (null !== (e = l.alternate) && null === pi(e)) {
              t.child = l;
              break;
            }
            (e = l.sibling), (l.sibling = n), (n = l), (l = e);
          }
          Ki(t, !0, n, null, a);
          break;
        case 'together':
          Ki(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Xi(e, t, n) {
      if (
        (null !== e && (t.dependencies = e.dependencies), (hs |= t.lanes), 0 === (n & t.childLanes))
      ) {
        if (null === e) return null;
        if ((El(e, t, n, !1), 0 === (n & t.childLanes))) return null;
      }
      if (null !== e && t.child !== e.child) throw Error(r(153));
      if (null !== t.child) {
        for (n = Ur((e = t.child), e.pendingProps), t.child = n, n.return = t; null !== e.sibling; )
          (e = e.sibling), ((n = n.sibling = Ur(e, e.pendingProps)).return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function Zi(e, t) {
      return 0 !== (e.lanes & t) || !(null === (e = e.dependencies) || !Cl(e));
    }
    function Ji(e, t, n) {
      if (null !== e)
        if (e.memoizedProps !== t.pendingProps) Pi = !0;
        else {
          if (!(Zi(e, n) || 128 & t.flags))
            return (
              (Pi = !1),
              (function (e, t, n) {
                switch (t.tag) {
                  case 3:
                    G(t, t.stateNode.containerInfo), kl(0, Rl, e.memoizedState.cache), hl();
                    break;
                  case 27:
                  case 5:
                    Y(t);
                    break;
                  case 4:
                    G(t, t.stateNode.containerInfo);
                    break;
                  case 10:
                    kl(0, t.type, t.memoizedProps.value);
                    break;
                  case 13:
                    var r = t.memoizedState;
                    if (null !== r)
                      return null !== r.dehydrated
                        ? (ui(t), (t.flags |= 128), null)
                        : 0 !== (n & t.child.childLanes)
                          ? Wi(e, t, n)
                          : (ui(t), null !== (e = Xi(e, t, n)) ? e.sibling : null);
                    ui(t);
                    break;
                  case 19:
                    var l = Boolean(128 & e.flags);
                    if (
                      ((r = 0 !== (n & t.childLanes)) ||
                        (El(e, t, n, !1), (r = 0 !== (n & t.childLanes))),
                      l)
                    ) {
                      if (r) return Yi(e, t, n);
                      t.flags |= 128;
                    }
                    if (
                      (null !== (l = t.memoizedState) &&
                        ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
                      V(fi, fi.current),
                      r)
                    )
                      break;
                    return null;
                  case 22:
                  case 23:
                    return (t.lanes = 0), Ri(e, t, n);
                  case 24:
                    kl(0, Rl, e.memoizedState.cache);
                }
                return Xi(e, t, n);
              })(e, t, n)
            );
          Pi = Boolean(131072 & e.flags);
        }
      else (Pi = !1), il && 1048576 & t.flags && nl(t, Kr, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          e: {
            e = t.pendingProps;
            var l = t.elementType,
              a = l._init;
            if (((l = a(l._payload)), (t.type = l), 'function' != typeof l)) {
              if (null != l) {
                if ((a = l.$$typeof) === x) {
                  (t.tag = 11), (t = Li(null, t, l, e, n));
                  break e;
                }
                if (a === z) {
                  (t.tag = 14), (t = Oi(null, t, l, e, n));
                  break e;
                }
              }
              throw ((t = R(l) || l), Error(r(306, t, '')));
            }
            jr(l)
              ? ((e = yi(l, e)), (t.tag = 1), (t = ji(null, t, l, e, n)))
              : ((t.tag = 0), (t = Fi(null, t, l, e, n)));
          }
          return t;
        case 0:
          return Fi(e, t, t.type, t.pendingProps, n);
        case 1:
          return ji(e, t, (l = t.type), (a = yi(l, t.pendingProps)), n);
        case 3:
          e: {
            if ((G(t, t.stateNode.containerInfo), null === e)) throw Error(r(387));
            l = t.pendingProps;
            var o = t.memoizedState;
            (a = o.element), aa(e, t), fa(t, l, null, n);
            var i = t.memoizedState;
            if (
              ((l = i.cache),
              kl(0, Rl, l),
              l !== o.cache && _l(t, [Rl], n, !0),
              da(),
              (l = i.element),
              o.isDehydrated)
            ) {
              if (
                ((o = { element: l, isDehydrated: !1, cache: i.cache }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                256 & t.flags)
              ) {
                t = Ui(e, t, l, n);
                break e;
              }
              if (l !== a) {
                bl((a = Cr(Error(r(424)), t))), (t = Ui(e, t, l, n));
                break e;
              }
              if (9 === (e = t.stateNode.containerInfo).nodeType) e = e.body;
              else e = 'HTML' === e.nodeName ? e.ownerDocument.body : e;
              for (
                ol = vd(e.firstChild),
                  al = t,
                  il = !0,
                  ul = null,
                  sl = !0,
                  n = ai(t, null, l, n),
                  t.child = n;
                n;

              )
                (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
            } else {
              if ((hl(), l === a)) {
                t = Xi(e, t, n);
                break e;
              }
              Ti(e, t, l, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            Mi(e, t),
            null === e
              ? (n = Td(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : il ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  ((l = ad(q.current).createElement(n))[Re] = t),
                  (l[De] = e),
                  nd(l, n, e),
                  Qe(l),
                  (t.stateNode = l))
              : (t.memoizedState = Td(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
            null
          );
        case 27:
          return (
            Y(t),
            null === e &&
              il &&
              ((l = t.stateNode = Sd(t.type, t.pendingProps, q.current)),
              (al = t),
              (sl = !0),
              (a = ol),
              hd(t.type) ? ((wd = a), (ol = vd(l.firstChild))) : (ol = a)),
            Ti(e, t, t.pendingProps.children, n),
            Mi(e, t),
            null === e && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            null === e &&
              il &&
              ((a = l = ol) &&
                (null !==
                (l = (function (e, t, n, r) {
                  for (; 1 === e.nodeType; ) {
                    var l = n;
                    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                      if (!r && ('INPUT' !== e.nodeName || 'hidden' !== e.type)) break;
                    } else if (r) {
                      if (!e[He])
                        switch (t) {
                          case 'meta':
                            if (!e.hasAttribute('itemprop')) break;
                            return e;
                          case 'link':
                            if (
                              'stylesheet' === (a = e.getAttribute('rel')) &&
                              e.hasAttribute('data-precedence')
                            )
                              break;
                            if (
                              a !== l.rel ||
                              e.getAttribute('href') !==
                                (null == l.href || '' === l.href ? null : l.href) ||
                              e.getAttribute('crossorigin') !==
                                (null == l.crossOrigin ? null : l.crossOrigin) ||
                              e.getAttribute('title') !== (null == l.title ? null : l.title)
                            )
                              break;
                            return e;
                          case 'style':
                            if (e.hasAttribute('data-precedence')) break;
                            return e;
                          case 'script':
                            if (
                              ((a = e.getAttribute('src')) !== (null == l.src ? null : l.src) ||
                                e.getAttribute('type') !== (null == l.type ? null : l.type) ||
                                e.getAttribute('crossorigin') !==
                                  (null == l.crossOrigin ? null : l.crossOrigin)) &&
                              a &&
                              e.hasAttribute('async') &&
                              !e.hasAttribute('itemprop')
                            )
                              break;
                            return e;
                          default:
                            return e;
                        }
                    } else {
                      if ('input' !== t || 'hidden' !== e.type) return e;
                      var a = null == l.name ? null : String(l.name);
                      if ('hidden' === l.type && e.getAttribute('name') === a) return e;
                    }
                    if (null === (e = vd(e.nextSibling))) break;
                  }
                  return null;
                })(l, t.type, t.pendingProps, sl))
                  ? ((t.stateNode = l), (al = t), (ol = vd(l.firstChild)), (sl = !1), (a = !0))
                  : (a = !1)),
              a || dl(t)),
            Y(t),
            (a = t.type),
            (o = t.pendingProps),
            (i = null !== e ? e.memoizedProps : null),
            (l = o.children),
            ud(a, o) ? (l = null) : null !== i && ud(a, i) && (t.flags |= 32),
            null !== t.memoizedState && ((a = Aa(e, t, Ma, null, null, n)), (Yd._currentValue = a)),
            Mi(e, t),
            Ti(e, t, l, n),
            t.child
          );
        case 6:
          return (
            null === e &&
              il &&
              ((e = n = ol) &&
                (null !==
                (n = (function (e, t, n) {
                  if ('' === t) return null;
                  for (; 3 !== e.nodeType; ) {
                    if ((1 !== e.nodeType || 'INPUT' !== e.nodeName || 'hidden' !== e.type) && !n)
                      return null;
                    if (null === (e = vd(e.nextSibling))) return null;
                  }
                  return e;
                })(n, t.pendingProps, sl))
                  ? ((t.stateNode = n), (al = t), (ol = null), (e = !0))
                  : (e = !1)),
              e || dl(t)),
            null
          );
        case 13:
          return Wi(e, t, n);
        case 4:
          return (
            G(t, t.stateNode.containerInfo),
            (l = t.pendingProps),
            null === e ? (t.child = li(t, null, l, n)) : Ti(e, t, l, n),
            t.child
          );
        case 11:
          return Li(e, t, t.type, t.pendingProps, n);
        case 7:
          return Ti(e, t, t.pendingProps, n), t.child;
        case 8:
        case 12:
          return Ti(e, t, t.pendingProps.children, n), t.child;
        case 10:
          return (l = t.pendingProps), kl(0, t.type, l.value), Ti(e, t, l.children, n), t.child;
        case 9:
          return (
            (a = t.type._context),
            (l = t.pendingProps.children),
            zl(t),
            (l = l((a = Nl(a)))),
            (t.flags |= 1),
            Ti(e, t, l, n),
            t.child
          );
        case 14:
          return Oi(e, t, t.type, t.pendingProps, n);
        case 15:
          return Ai(e, t, t.type, t.pendingProps, n);
        case 19:
          return Yi(e, t, n);
        case 31:
          return (
            (l = t.pendingProps),
            (n = t.mode),
            (l = { mode: l.mode, children: l.children }),
            null === e
              ? (((n = qi(l, n)).ref = t.ref), (t.child = n), (n.return = t), (t = n))
              : (((n = Ur(e.child, l)).ref = t.ref), (t.child = n), (n.return = t), (t = n)),
            t
          );
        case 22:
          return Ri(e, t, n);
        case 24:
          return (
            zl(t),
            (l = Nl(Rl)),
            null === e
              ? (null === (a = Wl()) &&
                  ((a = as),
                  (o = Dl()),
                  (a.pooledCache = o),
                  o.refCount++,
                  null !== o && (a.pooledCacheLanes |= n),
                  (a = o)),
                (t.memoizedState = { parent: l, cache: a }),
                la(t),
                kl(0, Rl, a))
              : (0 !== (e.lanes & n) && (aa(e, t), fa(t, null, null, n), da()),
                (a = e.memoizedState),
                (o = t.memoizedState),
                a.parent !== l
                  ? ((a = { parent: l, cache: l }),
                    (t.memoizedState = a),
                    0 === t.lanes && (t.memoizedState = t.updateQueue.baseState = a),
                    kl(0, Rl, l))
                  : ((l = o.cache), kl(0, Rl, l), l !== a.cache && _l(t, [Rl], n, !0))),
            Ti(e, t, t.pendingProps.children, n),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(r(156, t.tag));
    }
    function eu(e) {
      e.flags |= 4;
    }
    function tu(e, t) {
      if ('stylesheet' !== t.type || 4 & t.state.loading) e.flags &= -16777217;
      else if (((e.flags |= 16777216), !Vd(t))) {
        if (
          null !== (t = oi.current) &&
          ((4194048 & is) === is
            ? null !== ii
            : ((62914560 & is) !== is && !(536870912 & is)) || t !== ii)
        )
          throw ((ea = Yl), Gl);
        e.flags |= 8192;
      }
    }
    function nu(e, t) {
      null !== t && (e.flags |= 4),
        16384 & e.flags && ((t = 22 !== e.tag ? Ee() : 536870912), (e.lanes |= t), (vs |= t));
    }
    function ru(e, t) {
      if (!il)
        switch (e.tailMode) {
          case 'hidden':
            t = e.tail;
            for (var n = null; null !== t; ) null !== t.alternate && (n = t), (t = t.sibling);
            null === n ? (e.tail = null) : (n.sibling = null);
            break;
          case 'collapsed':
            n = e.tail;
            for (var r = null; null !== n; ) null !== n.alternate && (r = n), (n = n.sibling);
            null === r
              ? t || null === e.tail
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function lu(e) {
      var t = null !== e.alternate && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var l = e.child; null !== l; )
          (n |= l.lanes | l.childLanes),
            (r |= 65011712 & l.subtreeFlags),
            (r |= 65011712 & l.flags),
            (l.return = e),
            (l = l.sibling);
      else
        for (l = e.child; null !== l; )
          (n |= l.lanes | l.childLanes),
            (r |= l.subtreeFlags),
            (r |= l.flags),
            (l.return = e),
            (l = l.sibling);
      return (e.subtreeFlags |= r), (e.childLanes = n), t;
    }
    function au(e, t, n) {
      var l = t.pendingProps;
      switch ((ll(t), t.tag)) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
        case 1:
          return lu(t), null;
        case 3:
          return (
            (n = t.stateNode),
            (l = null),
            null !== e && (l = e.memoizedState.cache),
            t.memoizedState.cache !== l && (t.flags |= 2048),
            Sl(Rl),
            K(),
            n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
            (null !== e && null !== e.child) ||
              (ml(t)
                ? eu(t)
                : null === e ||
                  (e.memoizedState.isDehydrated && !(256 & t.flags)) ||
                  ((t.flags |= 1024), gl())),
            lu(t),
            null
          );
        case 26:
          return (
            (n = t.memoizedState),
            null === e
              ? (eu(t), null !== n ? (lu(t), tu(t, n)) : (lu(t), (t.flags &= -16777217)))
              : n
                ? n !== e.memoizedState
                  ? (eu(t), lu(t), tu(t, n))
                  : (lu(t), (t.flags &= -16777217))
                : (e.memoizedProps !== l && eu(t), lu(t), (t.flags &= -16777217)),
            null
          );
        case 27:
          X(t), (n = q.current);
          var a = t.type;
          if (null !== e && null != t.stateNode) e.memoizedProps !== l && eu(t);
          else {
            if (!l) {
              if (null === t.stateNode) throw Error(r(166));
              return lu(t), null;
            }
            (e = W.current), ml(t) ? fl(t) : ((e = Sd(a, l, n)), (t.stateNode = e), eu(t));
          }
          return lu(t), null;
        case 5:
          if ((X(t), (n = t.type), null !== e && null != t.stateNode))
            e.memoizedProps !== l && eu(t);
          else {
            if (!l) {
              if (null === t.stateNode) throw Error(r(166));
              return lu(t), null;
            }
            if (((e = W.current), ml(t))) fl(t);
            else {
              switch (((a = ad(q.current)), e)) {
                case 1:
                  e = a.createElementNS('http://www.w3.org/2000/svg', n);
                  break;
                case 2:
                  e = a.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                  break;
                default:
                  switch (n) {
                    case 'svg':
                      e = a.createElementNS('http://www.w3.org/2000/svg', n);
                      break;
                    case 'math':
                      e = a.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                      break;
                    case 'script':
                      ((e = a.createElement('div')).innerHTML = '<script><\/script>'),
                        (e = e.removeChild(e.firstChild));
                      break;
                    case 'select':
                      (e =
                        'string' == typeof l.is
                          ? a.createElement('select', { is: l.is })
                          : a.createElement('select')),
                        l.multiple ? (e.multiple = !0) : l.size && (e.size = l.size);
                      break;
                    default:
                      e =
                        'string' == typeof l.is
                          ? a.createElement(n, { is: l.is })
                          : a.createElement(n);
                  }
              }
              (e[Re] = t), (e[De] = l);
              e: for (a = t.child; null !== a; ) {
                if (5 === a.tag || 6 === a.tag) e.appendChild(a.stateNode);
                else if (4 !== a.tag && 27 !== a.tag && null !== a.child) {
                  (a.child.return = a), (a = a.child);
                  continue;
                }
                if (a === t) break e;
                for (; null === a.sibling; ) {
                  if (null === a.return || a.return === t) break e;
                  a = a.return;
                }
                (a.sibling.return = a.return), (a = a.sibling);
              }
              t.stateNode = e;
              e: switch ((nd(e, n, l), n)) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  e = Boolean(l.autoFocus);
                  break e;
                case 'img':
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && eu(t);
            }
          }
          return lu(t), (t.flags &= -16777217), null;
        case 6:
          if (e && null != t.stateNode) e.memoizedProps !== l && eu(t);
          else {
            if ('string' != typeof l && null === t.stateNode) throw Error(r(166));
            if (((e = q.current), ml(t))) {
              if (((e = t.stateNode), (n = t.memoizedProps), (l = null), null !== (a = al)))
                switch (a.tag) {
                  case 27:
                  case 5:
                    l = a.memoizedProps;
                }
              (e[Re] = t),
                (e = Boolean(
                  e.nodeValue === n ||
                    (null !== l && !0 === l.suppressHydrationWarning) ||
                    Zc(e.nodeValue, n),
                )) || dl(t);
            } else ((e = ad(e).createTextNode(l))[Re] = t), (t.stateNode = e);
          }
          return lu(t), null;
        case 13:
          if (
            ((l = t.memoizedState),
            null === e || (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
          ) {
            if (((a = ml(t)), null !== l && null !== l.dehydrated)) {
              if (null === e) {
                if (!a) throw Error(r(318));
                if (!(a = null !== (a = t.memoizedState) ? a.dehydrated : null))
                  throw Error(r(317));
                a[Re] = t;
              } else hl(), !(128 & t.flags) && (t.memoizedState = null), (t.flags |= 4);
              lu(t), (a = !1);
            } else
              (a = gl()),
                null !== e && null !== e.memoizedState && (e.memoizedState.hydrationErrors = a),
                (a = !0);
            if (!a) return 256 & t.flags ? (di(t), t) : (di(t), null);
          }
          if ((di(t), 128 & t.flags)) return (t.lanes = n), t;
          if (((n = null !== l), (e = null !== e && null !== e.memoizedState), n)) {
            (a = null),
              null !== (l = t.child).alternate &&
                null !== l.alternate.memoizedState &&
                null !== l.alternate.memoizedState.cachePool &&
                (a = l.alternate.memoizedState.cachePool.pool);
            var o = null;
            null !== l.memoizedState &&
              null !== l.memoizedState.cachePool &&
              (o = l.memoizedState.cachePool.pool),
              o !== a && (l.flags |= 2048);
          }
          return n !== e && n && (t.child.flags |= 8192), nu(t, t.updateQueue), lu(t), null;
        case 4:
          return K(), null === e && $c(t.stateNode.containerInfo), lu(t), null;
        case 10:
          return Sl(t.type), lu(t), null;
        case 19:
          if (($(fi), null === (a = t.memoizedState))) return lu(t), null;
          if (((l = Boolean(128 & t.flags)), null === (o = a.rendering)))
            if (l) ru(a, !1);
            else {
              if (0 !== ms || (null !== e && 128 & e.flags))
                for (e = t.child; null !== e; ) {
                  if (null !== (o = pi(e))) {
                    for (
                      t.flags |= 128,
                        ru(a, !1),
                        e = o.updateQueue,
                        t.updateQueue = e,
                        nu(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      null !== n;

                    )
                      Hr(n, e), (n = n.sibling);
                    return V(fi, (1 & fi.current) | 2), t.child;
                  }
                  e = e.sibling;
                }
              null !== a.tail &&
                re() > _s &&
                ((t.flags |= 128), (l = !0), ru(a, !1), (t.lanes = 4194304));
            }
          else {
            if (!l)
              if (null !== (e = pi(o))) {
                if (
                  ((t.flags |= 128),
                  (l = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  nu(t, e),
                  ru(a, !0),
                  null === a.tail && 'hidden' === a.tailMode && !o.alternate && !il)
                )
                  return lu(t), null;
              } else
                2 * re() - a.renderingStartTime > _s &&
                  536870912 !== n &&
                  ((t.flags |= 128), (l = !0), ru(a, !1), (t.lanes = 4194304));
            a.isBackwards
              ? ((o.sibling = t.child), (t.child = o))
              : (null !== (e = a.last) ? (e.sibling = o) : (t.child = o), (a.last = o));
          }
          return null !== a.tail
            ? ((t = a.tail),
              (a.rendering = t),
              (a.tail = t.sibling),
              (a.renderingStartTime = re()),
              (t.sibling = null),
              (e = fi.current),
              V(fi, l ? (1 & e) | 2 : 1 & e),
              t)
            : (lu(t), null);
        case 22:
        case 23:
          return (
            di(t),
            va(),
            (l = null !== t.memoizedState),
            null !== e
              ? (null !== e.memoizedState) !== l && (t.flags |= 8192)
              : l && (t.flags |= 8192),
            l
              ? Boolean(536870912 & n) &&
                !(128 & t.flags) &&
                (lu(t), 6 & t.subtreeFlags && (t.flags |= 8192))
              : lu(t),
            null !== (n = t.updateQueue) && nu(t, n.retryQueue),
            (n = null),
            null !== e &&
              null !== e.memoizedState &&
              null !== e.memoizedState.cachePool &&
              (n = e.memoizedState.cachePool.pool),
            (l = null),
            null !== t.memoizedState &&
              null !== t.memoizedState.cachePool &&
              (l = t.memoizedState.cachePool.pool),
            l !== n && (t.flags |= 2048),
            null !== e && $(Vl),
            null
          );
        case 24:
          return (
            (n = null),
            null !== e && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            Sl(Rl),
            lu(t),
            null
          );
        case 25:
        case 30:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function ou(e, t) {
      switch ((ll(t), t.tag)) {
        case 1:
          return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
        case 3:
          return (
            Sl(Rl),
            K(),
            65536 & (e = t.flags) && !(128 & e) ? ((t.flags = (-65537 & e) | 128), t) : null
          );
        case 26:
        case 27:
        case 5:
          return X(t), null;
        case 13:
          if ((di(t), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
            if (null === t.alternate) throw Error(r(340));
            hl();
          }
          return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
        case 19:
          return $(fi), null;
        case 4:
          return K(), null;
        case 10:
          return Sl(t.type), null;
        case 22:
        case 23:
          return (
            di(t),
            va(),
            null !== e && $(Vl),
            65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null
          );
        case 24:
          return Sl(Rl), null;
        default:
          return null;
      }
    }
    function iu(e, t) {
      switch ((ll(t), t.tag)) {
        case 3:
          Sl(Rl), K();
          break;
        case 26:
        case 27:
        case 5:
          X(t);
          break;
        case 4:
          K();
          break;
        case 13:
          di(t);
          break;
        case 19:
          $(fi);
          break;
        case 10:
          Sl(t.type);
          break;
        case 22:
        case 23:
          di(t), va(), null !== e && $(Vl);
          break;
        case 24:
          Sl(Rl);
      }
    }
    function uu(e, t) {
      try {
        var n = t.updateQueue,
          r = null !== n ? n.lastEffect : null;
        if (null !== r) {
          var l = r.next;
          n = l;
          do {
            if ((n.tag & e) === e) {
              r = void 0;
              var a = n.create,
                o = n.inst;
              (r = a()), (o.destroy = r);
            }
            n = n.next;
          } while (n !== l);
        }
      } catch (e) {
        fc(t, t.return, e);
      }
    }
    function su(e, t, n) {
      try {
        var r = t.updateQueue,
          l = null !== r ? r.lastEffect : null;
        if (null !== l) {
          var a = l.next;
          r = a;
          do {
            if ((r.tag & e) === e) {
              var o = r.inst,
                i = o.destroy;
              if (void 0 !== i) {
                (o.destroy = void 0), (l = t);
                var u = n,
                  s = i;
                try {
                  s();
                } catch (e) {
                  fc(l, u, e);
                }
              }
            }
            r = r.next;
          } while (r !== a);
        }
      } catch (e) {
        fc(t, t.return, e);
      }
    }
    function cu(e) {
      var t = e.updateQueue;
      if (null !== t) {
        var n = e.stateNode;
        try {
          ma(t, n);
        } catch (t) {
          fc(e, e.return, t);
        }
      }
    }
    function du(e, t, n) {
      (n.props = yi(e.type, e.memoizedProps)), (n.state = e.memoizedState);
      try {
        n.componentWillUnmount();
      } catch (n) {
        fc(e, t, n);
      }
    }
    function fu(e, t) {
      try {
        var n = e.ref;
        if (null !== n) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var r = e.stateNode;
              break;
            default:
              r = e.stateNode;
          }
          'function' == typeof n ? (e.refCleanup = n(r)) : (n.current = r);
        }
      } catch (n) {
        fc(e, t, n);
      }
    }
    function pu(e, t) {
      var n = e.ref,
        r = e.refCleanup;
      if (null !== n)
        if ('function' == typeof r)
          try {
            r();
          } catch (n) {
            fc(e, t, n);
          } finally {
            (e.refCleanup = null), null != (e = e.alternate) && (e.refCleanup = null);
          }
        else if ('function' == typeof n)
          try {
            n(null);
          } catch (n) {
            fc(e, t, n);
          }
        else n.current = null;
    }
    function mu(e) {
      var t = e.type,
        n = e.memoizedProps,
        r = e.stateNode;
      try {
        e: switch (t) {
          case 'button':
          case 'input':
          case 'select':
          case 'textarea':
            n.autoFocus && r.focus();
            break e;
          case 'img':
            n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
        }
      } catch (t) {
        fc(e, e.return, t);
      }
    }
    function hu(e, t, n) {
      try {
        var l = e.stateNode;
        !(function (e, t, n, l) {
          switch (t) {
            case 'div':
            case 'span':
            case 'svg':
            case 'path':
            case 'a':
            case 'g':
            case 'p':
            case 'li':
              break;
            case 'input':
              var a = null,
                o = null,
                i = null,
                u = null,
                s = null,
                c = null,
                d = null;
              for (m in n) {
                var f = n[m];
                if (n.hasOwnProperty(m) && null != f)
                  switch (m) {
                    case 'checked':
                    case 'value':
                      break;
                    case 'defaultValue':
                      s = f;
                    default:
                      l.hasOwnProperty(m) || ed(e, t, m, null, l, f);
                  }
              }
              for (var p in l) {
                var m = l[p];
                if (((f = n[p]), l.hasOwnProperty(p) && (null != m || null != f)))
                  switch (p) {
                    case 'type':
                      o = m;
                      break;
                    case 'name':
                      a = m;
                      break;
                    case 'checked':
                      c = m;
                      break;
                    case 'defaultChecked':
                      d = m;
                      break;
                    case 'value':
                      i = m;
                      break;
                    case 'defaultValue':
                      u = m;
                      break;
                    case 'children':
                    case 'dangerouslySetInnerHTML':
                      if (null != m) throw Error(r(137, t));
                      break;
                    default:
                      m !== f && ed(e, t, p, m, l, f);
                  }
              }
              return void yt(e, i, u, s, c, d, o, a);
            case 'select':
              for (o in ((m = i = u = p = null), n))
                if (((s = n[o]), n.hasOwnProperty(o) && null != s))
                  switch (o) {
                    case 'value':
                      break;
                    case 'multiple':
                      m = s;
                    default:
                      l.hasOwnProperty(o) || ed(e, t, o, null, l, s);
                  }
              for (a in l)
                if (((o = l[a]), (s = n[a]), l.hasOwnProperty(a) && (null != o || null != s)))
                  switch (a) {
                    case 'value':
                      p = o;
                      break;
                    case 'defaultValue':
                      u = o;
                      break;
                    case 'multiple':
                      i = o;
                    default:
                      o !== s && ed(e, t, a, o, l, s);
                  }
              return (
                (t = u),
                (n = i),
                (l = m),
                void (null != p
                  ? kt(e, Boolean(n), p, !1)
                  : Boolean(l) != Boolean(n) &&
                    (null != t ? kt(e, Boolean(n), t, !0) : kt(e, Boolean(n), n ? [] : '', !1)))
              );
            case 'textarea':
              for (u in ((m = p = null), n))
                if (((a = n[u]), n.hasOwnProperty(u) && null != a && !l.hasOwnProperty(u)))
                  switch (u) {
                    case 'value':
                    case 'children':
                      break;
                    default:
                      ed(e, t, u, null, l, a);
                  }
              for (i in l)
                if (((a = l[i]), (o = n[i]), l.hasOwnProperty(i) && (null != a || null != o)))
                  switch (i) {
                    case 'value':
                      p = a;
                      break;
                    case 'defaultValue':
                      m = a;
                      break;
                    case 'children':
                      break;
                    case 'dangerouslySetInnerHTML':
                      if (null != a) throw Error(r(91));
                      break;
                    default:
                      a !== o && ed(e, t, i, a, l, o);
                  }
              return void St(e, p, m);
            case 'option':
              for (var h in n)
                if (((p = n[h]), n.hasOwnProperty(h) && null != p && !l.hasOwnProperty(h)))
                  if ('selected' === h) e.selected = !1;
                  else ed(e, t, h, null, l, p);
              for (s in l)
                if (
                  ((p = l[s]),
                  (m = n[s]),
                  l.hasOwnProperty(s) && p !== m && (null != p || null != m))
                )
                  if ('selected' === s)
                    e.selected = p && 'function' != typeof p && 'symbol' != typeof p;
                  else ed(e, t, s, p, l, m);
              return;
            case 'img':
            case 'link':
            case 'area':
            case 'base':
            case 'br':
            case 'col':
            case 'embed':
            case 'hr':
            case 'keygen':
            case 'meta':
            case 'param':
            case 'source':
            case 'track':
            case 'wbr':
            case 'menuitem':
              for (var g in n)
                (p = n[g]),
                  n.hasOwnProperty(g) &&
                    null != p &&
                    !l.hasOwnProperty(g) &&
                    ed(e, t, g, null, l, p);
              for (c in l)
                if (
                  ((p = l[c]),
                  (m = n[c]),
                  l.hasOwnProperty(c) && p !== m && (null != p || null != m))
                )
                  switch (c) {
                    case 'children':
                    case 'dangerouslySetInnerHTML':
                      if (null != p) throw Error(r(137, t));
                      break;
                    default:
                      ed(e, t, c, p, l, m);
                  }
              return;
            default:
              if (Nt(t)) {
                for (var b in n)
                  (p = n[b]),
                    n.hasOwnProperty(b) &&
                      void 0 !== p &&
                      !l.hasOwnProperty(b) &&
                      td(e, t, b, void 0, l, p);
                for (d in l)
                  (p = l[d]),
                    (m = n[d]),
                    !l.hasOwnProperty(d) ||
                      p === m ||
                      (void 0 === p && void 0 === m) ||
                      td(e, t, d, p, l, m);
                return;
              }
          }
          for (var y in n)
            (p = n[y]),
              n.hasOwnProperty(y) && null != p && !l.hasOwnProperty(y) && ed(e, t, y, null, l, p);
          for (f in l)
            (p = l[f]),
              (m = n[f]),
              !l.hasOwnProperty(f) || p === m || (null == p && null == m) || ed(e, t, f, p, l, m);
        })(l, e.type, n, t),
          (l[De] = t);
      } catch (t) {
        fc(e, e.return, t);
      }
    }
    function gu(e) {
      return (
        5 === e.tag || 3 === e.tag || 26 === e.tag || (27 === e.tag && hd(e.type)) || 4 === e.tag
      );
    }
    function bu(e) {
      e: for (;;) {
        for (; null === e.sibling; ) {
          if (null === e.return || gu(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

        ) {
          if (27 === e.tag && hd(e.type)) continue e;
          if (2 & e.flags) continue e;
          if (null === e.child || 4 === e.tag) continue e;
          (e.child.return = e), (e = e.child);
        }
        if (!(2 & e.flags)) return e.stateNode;
      }
    }
    function yu(e, t, n) {
      var r = e.tag;
      if (5 === r || 6 === r)
        (e = e.stateNode),
          t
            ? (9 === n.nodeType
                ? n.body
                : 'HTML' === n.nodeName
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(e, t)
            : ((t =
                9 === n.nodeType
                  ? n.body
                  : 'HTML' === n.nodeName
                    ? n.ownerDocument.body
                    : n).appendChild(e),
              null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = Jc));
      else if (
        4 !== r &&
        (27 === r && hd(e.type) && ((n = e.stateNode), (t = null)), null !== (e = e.child))
      )
        for (yu(e, t, n), e = e.sibling; null !== e; ) yu(e, t, n), (e = e.sibling);
    }
    function vu(e, t, n) {
      var r = e.tag;
      if (5 === r || 6 === r) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
      else if (4 !== r && (27 === r && hd(e.type) && (n = e.stateNode), null !== (e = e.child)))
        for (vu(e, t, n), e = e.sibling; null !== e; ) vu(e, t, n), (e = e.sibling);
    }
    function wu(e) {
      var t = e.stateNode,
        n = e.memoizedProps;
      try {
        for (var r = e.type, l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
        nd(t, r, n), (t[Re] = e), (t[De] = n);
      } catch (t) {
        fc(e, e.return, t);
      }
    }
    var ku = !1,
      Su = !1,
      xu = !1,
      _u = 'function' == typeof WeakSet ? WeakSet : Set,
      Eu = null;
    function Cu(e, t, n) {
      var r = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ju(e, n), 4 & r && uu(5, n);
          break;
        case 1:
          if ((ju(e, n), 4 & r))
            if (((e = n.stateNode), null === t))
              try {
                e.componentDidMount();
              } catch (e) {
                fc(n, n.return, e);
              }
            else {
              var l = yi(n.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
              } catch (e) {
                fc(n, n.return, e);
              }
            }
          64 & r && cu(n), 512 & r && fu(n, n.return);
          break;
        case 3:
          if ((ju(e, n), 64 & r && null !== (e = n.updateQueue))) {
            if (((t = null), null !== n.child))
              switch (n.child.tag) {
                case 27:
                case 5:
                case 1:
                  t = n.child.stateNode;
              }
            try {
              ma(e, t);
            } catch (e) {
              fc(n, n.return, e);
            }
          }
          break;
        case 27:
          null === t && 4 & r && wu(n);
        case 26:
        case 5:
          ju(e, n), null === t && 4 & r && mu(n), 512 & r && fu(n, n.return);
          break;
        case 12:
          ju(e, n);
          break;
        case 13:
          ju(e, n),
            4 & r && Ou(e, n),
            64 & r &&
              null !== (e = n.memoizedState) &&
              null !== (e = e.dehydrated) &&
              (function (e, t) {
                var n = e.ownerDocument;
                if ('$?' !== e.data || 'complete' === n.readyState) t();
                else {
                  var r = function () {
                    t(), n.removeEventListener('DOMContentLoaded', r);
                  };
                  n.addEventListener('DOMContentLoaded', r), (e._reactRetry = r);
                }
              })(e, (n = gc.bind(null, n)));
          break;
        case 22:
          if (!(r = null !== n.memoizedState || ku)) {
            (t = (null !== t && null !== t.memoizedState) || Su), (l = ku);
            var a = Su;
            (ku = r),
              (Su = t) && !a ? Hu(e, n, Boolean(8772 & n.subtreeFlags)) : ju(e, n),
              (ku = l),
              (Su = a);
          }
          break;
        case 30:
          break;
        default:
          ju(e, n);
      }
    }
    function zu(e) {
      var t = e.alternate;
      null !== t && ((e.alternate = null), zu(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        5 === e.tag && null !== (t = e.stateNode) && $e(t),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    var Nu = null,
      Pu = !1;
    function Tu(e, t, n) {
      for (n = n.child; null !== n; ) Lu(e, t, n), (n = n.sibling);
    }
    function Lu(e, t, n) {
      if (pe && 'function' == typeof pe.onCommitFiberUnmount)
        try {
          pe.onCommitFiberUnmount(fe, n);
        } catch (e) {}
      switch (n.tag) {
        case 26:
          Su || pu(n, t),
            Tu(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode && (n = n.stateNode).parentNode.removeChild(n);
          break;
        case 27:
          Su || pu(n, t);
          var r = Nu,
            l = Pu;
          hd(n.type) && ((Nu = n.stateNode), (Pu = !1)),
            Tu(e, t, n),
            xd(n.stateNode),
            (Nu = r),
            (Pu = l);
          break;
        case 5:
          Su || pu(n, t);
        case 6:
          if (((r = Nu), (l = Pu), (Nu = null), Tu(e, t, n), (Pu = l), null !== (Nu = r)))
            if (Pu)
              try {
                (9 === Nu.nodeType
                  ? Nu.body
                  : 'HTML' === Nu.nodeName
                    ? Nu.ownerDocument.body
                    : Nu
                ).removeChild(n.stateNode);
              } catch (e) {
                fc(n, t, e);
              }
            else
              try {
                Nu.removeChild(n.stateNode);
              } catch (e) {
                fc(n, t, e);
              }
          break;
        case 18:
          null !== Nu &&
            (Pu
              ? (gd(
                  9 === (e = Nu).nodeType
                    ? e.body
                    : 'HTML' === e.nodeName
                      ? e.ownerDocument.body
                      : e,
                  n.stateNode,
                ),
                Tf(e))
              : gd(Nu, n.stateNode));
          break;
        case 4:
          (r = Nu),
            (l = Pu),
            (Nu = n.stateNode.containerInfo),
            (Pu = !0),
            Tu(e, t, n),
            (Nu = r),
            (Pu = l);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Su || su(2, n, t), Su || su(4, n, t), Tu(e, t, n);
          break;
        case 1:
          Su ||
            (pu(n, t), 'function' == typeof (r = n.stateNode).componentWillUnmount && du(n, t, r)),
            Tu(e, t, n);
          break;
        case 21:
          Tu(e, t, n);
          break;
        case 22:
          (Su = (r = Su) || null !== n.memoizedState), Tu(e, t, n), (Su = r);
          break;
        default:
          Tu(e, t, n);
      }
    }
    function Ou(e, t) {
      if (
        null === t.memoizedState &&
        null !== (e = t.alternate) &&
        null !== (e = e.memoizedState) &&
        null !== (e = e.dehydrated)
      )
        try {
          Tf(e);
        } catch (e) {
          fc(t, t.return, e);
        }
    }
    function Au(e, t) {
      var n = (function (e) {
        switch (e.tag) {
          case 13:
          case 19:
            var t = e.stateNode;
            return null === t && (t = e.stateNode = new _u()), t;
          case 22:
            return (
              null === (t = (e = e.stateNode)._retryCache) && (t = e._retryCache = new _u()), t
            );
          default:
            throw Error(r(435, e.tag));
        }
      })(e);
      t.forEach(function (t) {
        var r = bc.bind(null, e, t);
        n.has(t) || (n.add(t), t.then(r, r));
      });
    }
    function Ru(e, t) {
      var n = t.deletions;
      if (null !== n)
        for (var l = 0; l < n.length; l++) {
          var a = n[l],
            o = e,
            i = t,
            u = i;
          e: for (; null !== u; ) {
            switch (u.tag) {
              case 27:
                if (hd(u.type)) {
                  (Nu = u.stateNode), (Pu = !1);
                  break e;
                }
                break;
              case 5:
                (Nu = u.stateNode), (Pu = !1);
                break e;
              case 3:
              case 4:
                (Nu = u.stateNode.containerInfo), (Pu = !0);
                break e;
            }
            u = u.return;
          }
          if (null === Nu) throw Error(r(160));
          Lu(o, i, a),
            (Nu = null),
            (Pu = !1),
            null !== (o = a.alternate) && (o.return = null),
            (a.return = null);
        }
      if (13878 & t.subtreeFlags) for (t = t.child; null !== t; ) Mu(t, e), (t = t.sibling);
    }
    var Du = null;
    function Mu(e, t) {
      var n = e.alternate,
        l = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ru(t, e), Fu(e), 4 & l && (su(3, e, e.return), uu(3, e), su(5, e, e.return));
          break;
        case 1:
          Ru(t, e),
            Fu(e),
            512 & l && (Su || null === n || pu(n, n.return)),
            64 & l &&
              ku &&
              null !== (e = e.updateQueue) &&
              null !== (l = e.callbacks) &&
              ((n = e.shared.hiddenCallbacks),
              (e.shared.hiddenCallbacks = null === n ? l : n.concat(l)));
          break;
        case 26:
          var a = Du;
          if ((Ru(t, e), Fu(e), 512 & l && (Su || null === n || pu(n, n.return)), 4 & l)) {
            var o = null !== n ? n.memoizedState : null;
            if (((l = e.memoizedState), null === n))
              if (null === l)
                if (null === e.stateNode) {
                  e: {
                    (l = e.type), (n = e.memoizedProps), (a = a.ownerDocument || a);
                    t: switch (l) {
                      case 'title':
                        (!(o = a.getElementsByTagName('title')[0]) ||
                          o[He] ||
                          o[Re] ||
                          'http://www.w3.org/2000/svg' === o.namespaceURI ||
                          o.hasAttribute('itemprop')) &&
                          ((o = a.createElement(l)),
                          a.head.insertBefore(o, a.querySelector('head > title'))),
                          nd(o, l, n),
                          (o[Re] = e),
                          Qe(o),
                          (l = o);
                        break e;
                      case 'link':
                        var i = Hd('link', 'href', a).get(l + (n.href || ''));
                        if (i)
                          for (var u = 0; u < i.length; u++)
                            if (
                              (o = i[u]).getAttribute('href') ===
                                (null == n.href || '' === n.href ? null : n.href) &&
                              o.getAttribute('rel') === (null == n.rel ? null : n.rel) &&
                              o.getAttribute('title') === (null == n.title ? null : n.title) &&
                              o.getAttribute('crossorigin') ===
                                (null == n.crossOrigin ? null : n.crossOrigin)
                            ) {
                              i.splice(u, 1);
                              break t;
                            }
                        nd((o = a.createElement(l)), l, n), a.head.appendChild(o);
                        break;
                      case 'meta':
                        if ((i = Hd('meta', 'content', a).get(l + (n.content || ''))))
                          for (u = 0; u < i.length; u++)
                            if (
                              (o = i[u]).getAttribute('content') ===
                                (null == n.content ? null : String(n.content)) &&
                              o.getAttribute('name') === (null == n.name ? null : n.name) &&
                              o.getAttribute('property') ===
                                (null == n.property ? null : n.property) &&
                              o.getAttribute('http-equiv') ===
                                (null == n.httpEquiv ? null : n.httpEquiv) &&
                              o.getAttribute('charset') === (null == n.charSet ? null : n.charSet)
                            ) {
                              i.splice(u, 1);
                              break t;
                            }
                        nd((o = a.createElement(l)), l, n), a.head.appendChild(o);
                        break;
                      default:
                        throw Error(r(468, l));
                    }
                    (o[Re] = e), Qe(o), (l = o);
                  }
                  e.stateNode = l;
                } else $d(a, e.type, e.stateNode);
              else e.stateNode = Md(a, l, e.memoizedProps);
            else
              o !== l
                ? (null === o
                    ? null !== n.stateNode && (n = n.stateNode).parentNode.removeChild(n)
                    : o.count--,
                  null === l ? $d(a, e.type, e.stateNode) : Md(a, l, e.memoizedProps))
                : null === l && null !== e.stateNode && hu(e, e.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          Ru(t, e),
            Fu(e),
            512 & l && (Su || null === n || pu(n, n.return)),
            null !== n && 4 & l && hu(e, e.memoizedProps, n.memoizedProps);
          break;
        case 5:
          if ((Ru(t, e), Fu(e), 512 & l && (Su || null === n || pu(n, n.return)), 32 & e.flags)) {
            a = e.stateNode;
            try {
              _t(a, '');
            } catch (t) {
              fc(e, e.return, t);
            }
          }
          4 & l &&
            null != e.stateNode &&
            hu(e, (a = e.memoizedProps), null !== n ? n.memoizedProps : a),
            1024 & l && (xu = !0);
          break;
        case 6:
          if ((Ru(t, e), Fu(e), 4 & l)) {
            if (null === e.stateNode) throw Error(r(162));
            (l = e.memoizedProps), (n = e.stateNode);
            try {
              n.nodeValue = l;
            } catch (t) {
              fc(e, e.return, t);
            }
          }
          break;
        case 3:
          if (
            ((Ud = null),
            (a = Du),
            (Du = Cd(t.containerInfo)),
            Ru(t, e),
            (Du = a),
            Fu(e),
            4 & l && null !== n && n.memoizedState.isDehydrated)
          )
            try {
              Tf(t.containerInfo);
            } catch (t) {
              fc(e, e.return, t);
            }
          xu && ((xu = !1), Iu(e));
          break;
        case 4:
          (l = Du), (Du = Cd(e.stateNode.containerInfo)), Ru(t, e), Fu(e), (Du = l);
          break;
        case 12:
        default:
          Ru(t, e), Fu(e);
          break;
        case 13:
          Ru(t, e),
            Fu(e),
            8192 & e.child.flags &&
              (null !== e.memoizedState) != (null !== n && null !== n.memoizedState) &&
              (xs = re()),
            4 & l && null !== (l = e.updateQueue) && ((e.updateQueue = null), Au(e, l));
          break;
        case 22:
          a = null !== e.memoizedState;
          var s = null !== n && null !== n.memoizedState,
            c = ku,
            d = Su;
          if (((ku = c || a), (Su = d || s), Ru(t, e), (Su = d), (ku = c), Fu(e), 8192 & l))
            e: for (
              t = e.stateNode,
                t._visibility = a ? -2 & t._visibility : 1 | t._visibility,
                a && (null === n || s || ku || Su || Uu(e)),
                n = null,
                t = e;
              ;

            ) {
              if (5 === t.tag || 26 === t.tag) {
                if (null === n) {
                  s = n = t;
                  try {
                    if (((o = s.stateNode), a))
                      'function' == typeof (i = o.style).setProperty
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none');
                    else {
                      u = s.stateNode;
                      var f = s.memoizedProps.style,
                        p = null != f && f.hasOwnProperty('display') ? f.display : null;
                      u.style.display = null == p || 'boolean' == typeof p ? '' : String(p).trim();
                    }
                  } catch (e) {
                    fc(s, s.return, e);
                  }
                }
              } else if (6 === t.tag) {
                if (null === n) {
                  s = t;
                  try {
                    s.stateNode.nodeValue = a ? '' : s.memoizedProps;
                  } catch (e) {
                    fc(s, s.return, e);
                  }
                }
              } else if (
                ((22 !== t.tag && 23 !== t.tag) || null === t.memoizedState || t === e) &&
                null !== t.child
              ) {
                (t.child.return = t), (t = t.child);
                continue;
              }
              if (t === e) break e;
              for (; null === t.sibling; ) {
                if (null === t.return || t.return === e) break e;
                n === t && (n = null), (t = t.return);
              }
              n === t && (n = null), (t.sibling.return = t.return), (t = t.sibling);
            }
          4 & l &&
            null !== (l = e.updateQueue) &&
            null !== (n = l.retryQueue) &&
            ((l.retryQueue = null), Au(e, n));
          break;
        case 19:
          Ru(t, e),
            Fu(e),
            4 & l && null !== (l = e.updateQueue) && ((e.updateQueue = null), Au(e, l));
        case 30:
        case 21:
      }
    }
    function Fu(e) {
      var t = e.flags;
      if (2 & t) {
        try {
          for (var n, l = e.return; null !== l; ) {
            if (gu(l)) {
              n = l;
              break;
            }
            l = l.return;
          }
          if (null == n) throw Error(r(160));
          switch (n.tag) {
            case 27:
              var a = n.stateNode;
              vu(e, bu(e), a);
              break;
            case 5:
              var o = n.stateNode;
              32 & n.flags && (_t(o, ''), (n.flags &= -33)), vu(e, bu(e), o);
              break;
            case 3:
            case 4:
              var i = n.stateNode.containerInfo;
              yu(e, bu(e), i);
              break;
            default:
              throw Error(r(161));
          }
        } catch (t) {
          fc(e, e.return, t);
        }
        e.flags &= -3;
      }
      4096 & t && (e.flags &= -4097);
    }
    function Iu(e) {
      if (1024 & e.subtreeFlags)
        for (e = e.child; null !== e; ) {
          var t = e;
          Iu(t), 5 === t.tag && 1024 & t.flags && t.stateNode.reset(), (e = e.sibling);
        }
    }
    function ju(e, t) {
      if (8772 & t.subtreeFlags)
        for (t = t.child; null !== t; ) Cu(e, t.alternate, t), (t = t.sibling);
    }
    function Uu(e) {
      for (e = e.child; null !== e; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            su(4, t, t.return), Uu(t);
            break;
          case 1:
            pu(t, t.return);
            var n = t.stateNode;
            'function' == typeof n.componentWillUnmount && du(t, t.return, n), Uu(t);
            break;
          case 27:
            xd(t.stateNode);
          case 26:
          case 5:
            pu(t, t.return), Uu(t);
            break;
          case 22:
            null === t.memoizedState && Uu(t);
            break;
          default:
            Uu(t);
        }
        e = e.sibling;
      }
    }
    function Hu(e, t, n) {
      for (n = n && Boolean(8772 & t.subtreeFlags), t = t.child; null !== t; ) {
        var r = t.alternate,
          l = e,
          a = t,
          o = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            Hu(l, a, n), uu(4, a);
            break;
          case 1:
            if ((Hu(l, a, n), 'function' == typeof (l = (r = a).stateNode).componentDidMount))
              try {
                l.componentDidMount();
              } catch (e) {
                fc(r, r.return, e);
              }
            if (null !== (l = (r = a).updateQueue)) {
              var i = r.stateNode;
              try {
                var u = l.shared.hiddenCallbacks;
                if (null !== u)
                  for (l.shared.hiddenCallbacks = null, l = 0; l < u.length; l++) pa(u[l], i);
              } catch (e) {
                fc(r, r.return, e);
              }
            }
            n && 64 & o && cu(a), fu(a, a.return);
            break;
          case 27:
            wu(a);
          case 26:
          case 5:
            Hu(l, a, n), n && null === r && 4 & o && mu(a), fu(a, a.return);
            break;
          case 12:
            Hu(l, a, n);
            break;
          case 13:
            Hu(l, a, n), n && 4 & o && Ou(l, a);
            break;
          case 22:
            null === a.memoizedState && Hu(l, a, n), fu(a, a.return);
            break;
          case 30:
            break;
          default:
            Hu(l, a, n);
        }
        t = t.sibling;
      }
    }
    function $u(e, t) {
      var n = null;
      null !== e &&
        null !== e.memoizedState &&
        null !== e.memoizedState.cachePool &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        null !== t.memoizedState &&
          null !== t.memoizedState.cachePool &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (null != e && e.refCount++, null != n && Ml(n));
    }
    function Vu(e, t) {
      (e = null),
        null !== t.alternate && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache) !== e && (t.refCount++, null != e && Ml(e));
    }
    function Wu(e, t, n, r) {
      if (10256 & t.subtreeFlags) for (t = t.child; null !== t; ) Bu(e, t, n, r), (t = t.sibling);
    }
    function Bu(e, t, n, r) {
      var l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Wu(e, t, n, r), 2048 & l && uu(9, t);
          break;
        case 1:
        case 13:
        default:
          Wu(e, t, n, r);
          break;
        case 3:
          Wu(e, t, n, r),
            2048 & l &&
              ((e = null),
              null !== t.alternate && (e = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache) !== e && (t.refCount++, null != e && Ml(e)));
          break;
        case 12:
          if (2048 & l) {
            Wu(e, t, n, r), (e = t.stateNode);
            try {
              var a = t.memoizedProps,
                o = a.id,
                i = a.onPostCommit;
              'function' == typeof i &&
                i(o, null === t.alternate ? 'mount' : 'update', e.passiveEffectDuration, -0);
            } catch (e) {
              fc(t, t.return, e);
            }
          } else Wu(e, t, n, r);
          break;
        case 23:
          break;
        case 22:
          (a = t.stateNode),
            (o = t.alternate),
            null !== t.memoizedState
              ? 2 & a._visibility
                ? Wu(e, t, n, r)
                : Qu(e, t)
              : 2 & a._visibility
                ? Wu(e, t, n, r)
                : ((a._visibility |= 2), qu(e, t, n, r, Boolean(10256 & t.subtreeFlags))),
            2048 & l && $u(o, t);
          break;
        case 24:
          Wu(e, t, n, r), 2048 & l && Vu(t.alternate, t);
      }
    }
    function qu(e, t, n, r, l) {
      for (l = l && Boolean(10256 & t.subtreeFlags), t = t.child; null !== t; ) {
        var a = e,
          o = t,
          i = n,
          u = r,
          s = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            qu(a, o, i, u, l), uu(8, o);
            break;
          case 23:
            break;
          case 22:
            var c = o.stateNode;
            null !== o.memoizedState
              ? 2 & c._visibility
                ? qu(a, o, i, u, l)
                : Qu(a, o)
              : ((c._visibility |= 2), qu(a, o, i, u, l)),
              l && 2048 & s && $u(o.alternate, o);
            break;
          case 24:
            qu(a, o, i, u, l), l && 2048 & s && Vu(o.alternate, o);
            break;
          default:
            qu(a, o, i, u, l);
        }
        t = t.sibling;
      }
    }
    function Qu(e, t) {
      if (10256 & t.subtreeFlags)
        for (t = t.child; null !== t; ) {
          var n = e,
            r = t,
            l = r.flags;
          switch (r.tag) {
            case 22:
              Qu(n, r), 2048 & l && $u(r.alternate, r);
              break;
            case 24:
              Qu(n, r), 2048 & l && Vu(r.alternate, r);
              break;
            default:
              Qu(n, r);
          }
          t = t.sibling;
        }
    }
    var Gu = 8192;
    function Ku(e) {
      if (e.subtreeFlags & Gu) for (e = e.child; null !== e; ) Yu(e), (e = e.sibling);
    }
    function Yu(e) {
      switch (e.tag) {
        case 26:
          Ku(e),
            e.flags & Gu &&
              null !== e.memoizedState &&
              (function (e, t, n) {
                if (null === Wd) throw Error(r(475));
                var l = Wd;
                if (
                  !(
                    'stylesheet' !== t.type ||
                    ('string' == typeof n.media && !1 === matchMedia(n.media).matches) ||
                    4 & t.state.loading
                  )
                ) {
                  if (null === t.instance) {
                    var a = Ld(n.href),
                      o = e.querySelector(Od(a));
                    if (o)
                      return (
                        null !== (e = o._p) &&
                          'object' == typeof e &&
                          'function' == typeof e.then &&
                          (l.count++, (l = qd.bind(l)), e.then(l, l)),
                        (t.state.loading |= 4),
                        (t.instance = o),
                        void Qe(o)
                      );
                    (o = e.ownerDocument || e),
                      (n = Ad(n)),
                      (a = _d.get(a)) && Id(n, a),
                      Qe((o = o.createElement('link')));
                    var i = o;
                    (i._p = new Promise(function (e, t) {
                      (i.onload = e), (i.onerror = t);
                    })),
                      nd(o, 'link', n),
                      (t.instance = o);
                  }
                  null === l.stylesheets && (l.stylesheets = new Map()),
                    l.stylesheets.set(t, e),
                    (e = t.state.preload) &&
                      !(3 & t.state.loading) &&
                      (l.count++,
                      (t = qd.bind(l)),
                      e.addEventListener('load', t),
                      e.addEventListener('error', t));
                }
              })(Du, e.memoizedState, e.memoizedProps);
          break;
        case 5:
        default:
          Ku(e);
          break;
        case 3:
        case 4:
          var t = Du;
          (Du = Cd(e.stateNode.containerInfo)), Ku(e), (Du = t);
          break;
        case 22:
          null === e.memoizedState &&
            (null !== (t = e.alternate) && null !== t.memoizedState
              ? ((t = Gu), (Gu = 16777216), Ku(e), (Gu = t))
              : Ku(e));
      }
    }
    function Xu(e) {
      var t = e.alternate;
      if (null !== t && null !== (e = t.child)) {
        t.child = null;
        do {
          (t = e.sibling), (e.sibling = null), (e = t);
        } while (null !== e);
      }
    }
    function Zu(e) {
      var t = e.deletions;
      if (16 & e.flags) {
        if (null !== t)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (Eu = r), ts(r, e);
          }
        Xu(e);
      }
      if (10256 & e.subtreeFlags) for (e = e.child; null !== e; ) Ju(e), (e = e.sibling);
    }
    function Ju(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Zu(e), 2048 & e.flags && su(9, e, e.return);
          break;
        case 3:
        case 12:
        default:
          Zu(e);
          break;
        case 22:
          var t = e.stateNode;
          null !== e.memoizedState &&
          2 & t._visibility &&
          (null === e.return || 13 !== e.return.tag)
            ? ((t._visibility &= -3), es(e))
            : Zu(e);
      }
    }
    function es(e) {
      var t = e.deletions;
      if (16 & e.flags) {
        if (null !== t)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (Eu = r), ts(r, e);
          }
        Xu(e);
      }
      for (e = e.child; null !== e; ) {
        switch ((t = e).tag) {
          case 0:
          case 11:
          case 15:
            su(8, t, t.return), es(t);
            break;
          case 22:
            2 & (n = t.stateNode)._visibility && ((n._visibility &= -3), es(t));
            break;
          default:
            es(t);
        }
        e = e.sibling;
      }
    }
    function ts(e, t) {
      for (; null !== Eu; ) {
        var n = Eu;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            su(8, n, t);
            break;
          case 23:
          case 22:
            if (null !== n.memoizedState && null !== n.memoizedState.cachePool) {
              var r = n.memoizedState.cachePool.pool;
              null != r && r.refCount++;
            }
            break;
          case 24:
            Ml(n.memoizedState.cache);
        }
        if (null !== (r = n.child)) (r.return = n), (Eu = r);
        else
          e: for (n = e; null !== Eu; ) {
            var l = (r = Eu).sibling,
              a = r.return;
            if ((zu(r), r === n)) {
              Eu = null;
              break e;
            }
            if (null !== l) {
              (l.return = a), (Eu = l);
              break e;
            }
            Eu = a;
          }
      }
    }
    var ns = {
        getCacheForType: function (e) {
          var t = Nl(Rl),
            n = t.data.get(e);
          return void 0 === n && ((n = e()), t.data.set(e, n)), n;
        },
      },
      rs = 'function' == typeof WeakMap ? WeakMap : Map,
      ls = 0,
      as = null,
      os = null,
      is = 0,
      us = 0,
      ss = null,
      cs = !1,
      ds = !1,
      fs = !1,
      ps = 0,
      ms = 0,
      hs = 0,
      gs = 0,
      bs = 0,
      ys = 0,
      vs = 0,
      ws = null,
      ks = null,
      Ss = !1,
      xs = 0,
      _s = 1 / 0,
      Es = null,
      Cs = null,
      zs = 0,
      Ns = null,
      Ps = null,
      Ts = 0,
      Ls = 0,
      Os = null,
      As = null,
      Rs = 0,
      Ds = null;
    function Ms() {
      if (2 & ls && 0 !== is) return is & -is;
      if (null !== M.T) {
        return 0 !== jl ? jl : Lc();
      }
      return Oe();
    }
    function Fs() {
      0 === ys && (ys = 536870912 & is && !il ? 536870912 : _e());
      var e = oi.current;
      return null !== e && (e.flags |= 32), ys;
    }
    function Is(e, t, n) {
      ((e !== as || (2 !== us && 9 !== us)) && null === e.cancelPendingCommit) ||
        (Bs(e, 0), $s(e, is, ys, !1)),
        ze(e, n),
        (2 & ls && e === as) ||
          (e === as && (!(2 & ls) && (gs |= n), 4 === ms && $s(e, is, ys, !1)), _c(e));
    }
    function js(e, t, n) {
      if (6 & ls) throw Error(r(327));
      for (
        var l = (!n && !(124 & t) && 0 === (t & e.expiredLanes)) || Se(e, t),
          a = l
            ? (function (e, t) {
                var n = ls;
                ls |= 2;
                var l = Qs(),
                  a = Gs();
                as !== e || is !== t ? ((Es = null), (_s = re() + 500), Bs(e, t)) : (ds = Se(e, t));
                e: for (;;)
                  try {
                    if (0 !== us && null !== os) {
                      t = os;
                      var o = ss;
                      t: switch (us) {
                        case 1:
                          (us = 0), (ss = null), tc(e, t, o, 1);
                          break;
                        case 2:
                        case 9:
                          if (Xl(o)) {
                            (us = 0), (ss = null), ec(t);
                            break;
                          }
                          (t = function () {
                            (2 !== us && 9 !== us) || as !== e || (us = 7), _c(e);
                          }),
                            o.then(t, t);
                          break e;
                        case 3:
                          us = 7;
                          break e;
                        case 4:
                          us = 5;
                          break e;
                        case 7:
                          Xl(o)
                            ? ((us = 0), (ss = null), ec(t))
                            : ((us = 0), (ss = null), tc(e, t, o, 7));
                          break;
                        case 5:
                          var i = null;
                          switch (os.tag) {
                            case 26:
                              i = os.memoizedState;
                            case 5:
                            case 27:
                              var u = os;
                              if (!i || Vd(i)) {
                                (us = 0), (ss = null);
                                var s = u.sibling;
                                if (null !== s) os = s;
                                else {
                                  var c = u.return;
                                  null !== c ? ((os = c), nc(c)) : (os = null);
                                }
                                break t;
                              }
                          }
                          (us = 0), (ss = null), tc(e, t, o, 5);
                          break;
                        case 6:
                          (us = 0), (ss = null), tc(e, t, o, 6);
                          break;
                        case 8:
                          Ws(), (ms = 6);
                          break e;
                        default:
                          throw Error(r(462));
                      }
                    }
                    Zs();
                    break;
                  } catch (t) {
                    qs(e, t);
                  }
                return (
                  (wl = vl = null),
                  (M.H = l),
                  (M.A = a),
                  (ls = n),
                  null !== os ? 0 : ((as = null), (is = 0), Tr(), ms)
                );
              })(e, t)
            : Ys(e, t, !0),
          o = l;
        ;

      ) {
        if (0 === a) {
          ds && !l && $s(e, t, 0, !1);
          break;
        }
        if (((n = e.current.alternate), !o || Hs(n))) {
          if (2 === a) {
            if (((o = t), e.errorRecoveryDisabledLanes & o)) var i = 0;
            else i = 0 !== (i = -536870913 & e.pendingLanes) ? i : 536870912 & i ? 536870912 : 0;
            if (0 !== i) {
              t = i;
              e: {
                var u = e;
                a = ws;
                var s = u.current.memoizedState.isDehydrated;
                if ((s && (Bs(u, i).flags |= 256), 2 !== (i = Ys(u, i, !1)))) {
                  if (fs && !s) {
                    (u.errorRecoveryDisabledLanes |= o), (gs |= o), (a = 4);
                    break e;
                  }
                  (o = ks), (ks = a), null !== o && (null === ks ? (ks = o) : ks.push.apply(ks, o));
                }
                a = i;
              }
              if (((o = !1), 2 !== a)) continue;
            }
          }
          if (1 === a) {
            Bs(e, 0), $s(e, t, 0, !0);
            break;
          }
          e: {
            switch (((l = e), (o = a))) {
              case 0:
              case 1:
                throw Error(r(345));
              case 4:
                if ((4194048 & t) !== t) break;
              case 6:
                $s(l, t, ys, !cs);
                break e;
              case 2:
                ks = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(r(329));
            }
            if ((62914560 & t) === t && 10 < (a = xs + 300 - re())) {
              if (($s(l, t, ys, !cs), 0 !== ke(l, 0, !0))) break e;
              l.timeoutHandle = cd(
                Us.bind(null, l, n, ks, Es, Ss, t, ys, gs, vs, cs, o, 2, -0, 0),
                a,
              );
            } else Us(l, n, ks, Es, Ss, t, ys, gs, vs, cs, o, 0, -0, 0);
          }
          break;
        }
        (a = Ys(e, t, !1)), (o = !1);
      }
      _c(e);
    }
    function Us(e, t, n, l, a, o, i, u, s, c, d, f, p, m) {
      if (
        ((e.timeoutHandle = -1),
        (8192 & (f = t.subtreeFlags) || !(16785408 & ~f)) &&
          ((Wd = { stylesheets: null, count: 0, unsuspend: Bd }),
          Yu(t),
          null !==
            (f = (function () {
              if (null === Wd) throw Error(r(475));
              var e = Wd;
              return (
                e.stylesheets && 0 === e.count && Gd(e, e.stylesheets),
                0 < e.count
                  ? function (t) {
                      var n = setTimeout(function () {
                        if ((e.stylesheets && Gd(e, e.stylesheets), e.unsuspend)) {
                          var t = e.unsuspend;
                          (e.unsuspend = null), t();
                        }
                      }, 6e4);
                      return (
                        (e.unsuspend = t),
                        function () {
                          (e.unsuspend = null), clearTimeout(n);
                        }
                      );
                    }
                  : null
              );
            })())))
      )
        return (
          (e.cancelPendingCommit = f(lc.bind(null, e, t, o, n, l, a, i, u, s, d, 1, p, m))),
          void $s(e, o, i, !c)
        );
      lc(e, t, o, n, l, a, i, u, s);
    }
    function Hs(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if (
          (0 === n || 11 === n || 15 === n) &&
          16384 & t.flags &&
          null !== (n = t.updateQueue) &&
          null !== (n = n.stores)
        )
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              a = l.getSnapshot;
            l = l.value;
            try {
              if (!Xn(a(), l)) return !1;
            } catch (e) {
              return !1;
            }
          }
        if (((n = t.child), 16384 & t.subtreeFlags && null !== n)) (n.return = t), (t = n);
        else {
          if (t === e) break;
          for (; null === t.sibling; ) {
            if (null === t.return || t.return === e) return !0;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return !0;
    }
    function $s(e, t, n, r) {
      (t &= ~bs),
        (t &= ~gs),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        r && (e.warmLanes |= t),
        (r = e.expirationTimes);
      for (var l = t; 0 < l; ) {
        var a = 31 - he(l),
          o = 1 << a;
        (r[a] = -1), (l &= ~o);
      }
      0 !== n && Ne(e, n, t);
    }
    function Vs() {
      return Boolean(6 & ls) || (Ec(0), !1);
    }
    function Ws() {
      if (null !== os) {
        if (0 === us) var e = os.return;
        else (wl = vl = null), ja((e = os)), (Xo = null), (Zo = 0), (e = os);
        for (; null !== e; ) iu(e.alternate, e), (e = e.return);
        os = null;
      }
    }
    function Bs(e, t) {
      var n = e.timeoutHandle;
      -1 !== n && ((e.timeoutHandle = -1), dd(n)),
        null !== (n = e.cancelPendingCommit) && ((e.cancelPendingCommit = null), n()),
        Ws(),
        (as = e),
        (os = n = Ur(e.current, null)),
        (is = t),
        (us = 0),
        (ss = null),
        (cs = !1),
        (ds = Se(e, t)),
        (fs = !1),
        (vs = ys = bs = gs = hs = ms = 0),
        (ks = ws = null),
        (Ss = !1),
        8 & t && (t |= 32 & t);
      var r = e.entangledLanes;
      if (0 !== r)
        for (e = e.entanglements, r &= t; 0 < r; ) {
          var l = 31 - he(r),
            a = 1 << l;
          (t |= e[l]), (r &= ~a);
        }
      return (ps = t), Tr(), n;
    }
    function qs(e, t) {
      (ka = null),
        (M.H = Qo),
        t === Ql || t === Kl
          ? ((t = ta()), (us = 3))
          : t === Gl
            ? ((t = ta()), (us = 4))
            : (us =
                t === Ni
                  ? 8
                  : null !== t && 'object' == typeof t && 'function' == typeof t.then
                    ? 6
                    : 1),
        (ss = t),
        null === os && ((ms = 1), xi(e, Cr(t, e.current)));
    }
    function Qs() {
      var e = M.H;
      return (M.H = Qo), null === e ? Qo : e;
    }
    function Gs() {
      var e = M.A;
      return (M.A = ns), e;
    }
    function Ks() {
      (ms = 4),
        cs || ((4194048 & is) !== is && null !== oi.current) || (ds = !0),
        (!(134217727 & hs) && !(134217727 & gs)) || null === as || $s(as, is, ys, !1);
    }
    function Ys(e, t, n) {
      var r = ls;
      ls |= 2;
      var l = Qs(),
        a = Gs();
      (as === e && is === t) || ((Es = null), Bs(e, t)), (t = !1);
      var o = ms;
      e: for (;;)
        try {
          if (0 !== us && null !== os) {
            var i = os,
              u = ss;
            switch (us) {
              case 8:
                Ws(), (o = 6);
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                null === oi.current && (t = !0);
                var s = us;
                if (((us = 0), (ss = null), tc(e, i, u, s), n && ds)) {
                  o = 0;
                  break e;
                }
                break;
              default:
                (s = us), (us = 0), (ss = null), tc(e, i, u, s);
            }
          }
          Xs(), (o = ms);
          break;
        } catch (t) {
          qs(e, t);
        }
      return (
        t && e.shellSuspendCounter++,
        (wl = vl = null),
        (ls = r),
        (M.H = l),
        (M.A = a),
        null === os && ((as = null), (is = 0), Tr()),
        o
      );
    }
    function Xs() {
      for (; null !== os; ) Js(os);
    }
    function Zs() {
      for (; null !== os && !te(); ) Js(os);
    }
    function Js(e) {
      var t = Ji(e.alternate, e, ps);
      (e.memoizedProps = e.pendingProps), null === t ? nc(e) : (os = t);
    }
    function ec(e) {
      var t = e,
        n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Ii(n, t, t.pendingProps, t.type, void 0, is);
          break;
        case 11:
          t = Ii(n, t, t.pendingProps, t.type.render, t.ref, is);
          break;
        case 5:
          ja(t);
        default:
          iu(n, t), (t = Ji(n, (t = os = Hr(t, ps)), ps));
      }
      (e.memoizedProps = e.pendingProps), null === t ? nc(e) : (os = t);
    }
    function tc(e, t, n, l) {
      (wl = vl = null), ja(t), (Xo = null), (Zo = 0);
      var a = t.return;
      try {
        if (
          (function (e, t, n, l, a) {
            if (
              ((n.flags |= 32768),
              null !== l && 'object' == typeof l && 'function' == typeof l.then)
            ) {
              if ((null !== (t = n.alternate) && El(t, n, a, !0), null !== (n = oi.current))) {
                switch (n.tag) {
                  case 13:
                    return (
                      null === ii ? Ks() : null === n.alternate && 0 === ms && (ms = 3),
                      (n.flags &= -257),
                      (n.flags |= 65536),
                      (n.lanes = a),
                      l === Yl
                        ? (n.flags |= 16384)
                        : (null === (t = n.updateQueue) ? (n.updateQueue = new Set([l])) : t.add(l),
                          pc(e, l, a)),
                      !1
                    );
                  case 22:
                    return (
                      (n.flags |= 65536),
                      l === Yl
                        ? (n.flags |= 16384)
                        : (null === (t = n.updateQueue)
                            ? ((t = {
                                transitions: null,
                                markerInstances: null,
                                retryQueue: new Set([l]),
                              }),
                              (n.updateQueue = t))
                            : null === (n = t.retryQueue)
                              ? (t.retryQueue = new Set([l]))
                              : n.add(l),
                          pc(e, l, a)),
                      !1
                    );
                }
                throw Error(r(435, n.tag));
              }
              return pc(e, l, a), Ks(), !1;
            }
            if (il)
              return (
                null !== (t = oi.current)
                  ? (!(65536 & t.flags) && (t.flags |= 256),
                    (t.flags |= 65536),
                    (t.lanes = a),
                    l !== cl && bl(Cr((e = Error(r(422), { cause: l })), n)))
                  : (l !== cl && bl(Cr((t = Error(r(423), { cause: l })), n)),
                    ((e = e.current.alternate).flags |= 65536),
                    (a &= -a),
                    (e.lanes |= a),
                    (l = Cr(l, n)),
                    sa(e, (a = Ei(e.stateNode, l, a))),
                    4 !== ms && (ms = 2)),
                !1
              );
            var o = Error(r(520), { cause: l });
            if (
              ((o = Cr(o, n)),
              null === ws ? (ws = [o]) : ws.push(o),
              4 !== ms && (ms = 2),
              null === t)
            )
              return !0;
            (l = Cr(l, n)), (n = t);
            do {
              switch (n.tag) {
                case 3:
                  return (
                    (n.flags |= 65536),
                    (e = a & -a),
                    (n.lanes |= e),
                    sa(n, (e = Ei(n.stateNode, l, e))),
                    !1
                  );
                case 1:
                  if (
                    ((t = n.type),
                    (o = n.stateNode),
                    !(
                      128 & n.flags ||
                      ('function' != typeof t.getDerivedStateFromError &&
                        (null === o ||
                          'function' != typeof o.componentDidCatch ||
                          (null !== Cs && Cs.has(o))))
                    ))
                  )
                    return (
                      (n.flags |= 65536),
                      (a &= -a),
                      (n.lanes |= a),
                      zi((a = Ci(a)), e, n, l),
                      sa(n, a),
                      !1
                    );
              }
              n = n.return;
            } while (null !== n);
            return !1;
          })(e, a, t, n, is)
        )
          return (ms = 1), xi(e, Cr(n, e.current)), void (os = null);
      } catch (t) {
        if (null !== a) throw ((os = a), t);
        return (ms = 1), xi(e, Cr(n, e.current)), void (os = null);
      }
      32768 & t.flags
        ? (il || 1 === l
            ? (e = !0)
            : ds || 536870912 & is
              ? (e = !1)
              : ((cs = e = !0),
                (2 === l || 9 === l || 3 === l || 6 === l) &&
                  null !== (l = oi.current) &&
                  13 === l.tag &&
                  (l.flags |= 16384)),
          rc(t, e))
        : nc(t);
    }
    function nc(e) {
      var t = e;
      do {
        if (32768 & t.flags) return void rc(t, cs);
        e = t.return;
        var n = au(t.alternate, t, ps);
        if (null !== n) return void (os = n);
        if (null !== (t = t.sibling)) return void (os = t);
        os = t = e;
      } while (null !== t);
      0 === ms && (ms = 5);
    }
    function rc(e, t) {
      do {
        var n = ou(e.alternate, e);
        if (null !== n) return (n.flags &= 32767), void (os = n);
        if (
          (null !== (n = e.return) &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && null !== (e = e.sibling))
        )
          return void (os = e);
        os = e = n;
      } while (null !== e);
      (ms = 6), (os = null);
    }
    function lc(e, t, n, l, a, o, i, u, s) {
      e.cancelPendingCommit = null;
      do {
        sc();
      } while (0 !== zs);
      if (6 & ls) throw Error(r(327));
      if (null !== t) {
        if (t === e.current) throw Error(r(177));
        if (
          ((o = t.lanes | t.childLanes),
          (function (e, t, n, r, l, a) {
            var o = e.pendingLanes;
            (e.pendingLanes = n),
              (e.suspendedLanes = 0),
              (e.pingedLanes = 0),
              (e.warmLanes = 0),
              (e.expiredLanes &= n),
              (e.entangledLanes &= n),
              (e.errorRecoveryDisabledLanes &= n),
              (e.shellSuspendCounter = 0);
            var i = e.entanglements,
              u = e.expirationTimes,
              s = e.hiddenUpdates;
            for (n = o & ~n; 0 < n; ) {
              var c = 31 - he(n),
                d = 1 << c;
              (i[c] = 0), (u[c] = -1);
              var f = s[c];
              if (null !== f)
                for (s[c] = null, c = 0; c < f.length; c++) {
                  var p = f[c];
                  null !== p && (p.lane &= -536870913);
                }
              n &= ~d;
            }
            0 !== r && Ne(e, r, 0),
              0 !== a && 0 === l && 0 !== e.tag && (e.suspendedLanes |= a & ~(o & ~t));
          })(e, n, (o |= Pr), i, u, s),
          e === as && ((os = as = null), (is = 0)),
          (Ps = t),
          (Ns = e),
          (Ts = n),
          (Ls = o),
          (Os = a),
          (As = l),
          10256 & t.subtreeFlags || 10256 & t.flags
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              J(ie, function () {
                return cc(), null;
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (l = Boolean(13878 & t.flags)),
          13878 & t.subtreeFlags || l)
        ) {
          (l = M.T), (M.T = null), (a = F.p), (F.p = 2), (i = ls), (ls |= 4);
          try {
            !(function (e, t) {
              if (((e = e.containerInfo), (rd = lf), rr((e = nr(e))))) {
                if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
                else
                  e: {
                    var l =
                      (n = ((n = e.ownerDocument) && n.defaultView) || window).getSelection &&
                      n.getSelection();
                    if (l && 0 !== l.rangeCount) {
                      n = l.anchorNode;
                      var a = l.anchorOffset,
                        o = l.focusNode;
                      l = l.focusOffset;
                      try {
                        n.nodeType, o.nodeType;
                      } catch (e) {
                        n = null;
                        break e;
                      }
                      var i = 0,
                        u = -1,
                        s = -1,
                        c = 0,
                        d = 0,
                        f = e,
                        p = null;
                      t: for (;;) {
                        for (
                          var m;
                          f !== n || (0 !== a && 3 !== f.nodeType) || (u = i + a),
                            f !== o || (0 !== l && 3 !== f.nodeType) || (s = i + l),
                            3 === f.nodeType && (i += f.nodeValue.length),
                            null !== (m = f.firstChild);

                        )
                          (p = f), (f = m);
                        for (;;) {
                          if (f === e) break t;
                          if (
                            (p === n && ++c === a && (u = i),
                            p === o && ++d === l && (s = i),
                            null !== (m = f.nextSibling))
                          )
                            break;
                          p = (f = p).parentNode;
                        }
                        f = m;
                      }
                      n = -1 === u || -1 === s ? null : { start: u, end: s };
                    } else n = null;
                  }
                n = n || { start: 0, end: 0 };
              } else n = null;
              for (ld = { focusedElem: e, selectionRange: n }, lf = !1, Eu = t; null !== Eu; )
                if (((e = (t = Eu).child), 1024 & t.subtreeFlags && null !== e))
                  (e.return = t), (Eu = e);
                else
                  for (; null !== Eu; ) {
                    switch (((o = (t = Eu).alternate), (e = t.flags), t.tag)) {
                      case 0:
                      case 11:
                      case 15:
                      case 5:
                      case 26:
                      case 27:
                      case 6:
                      case 4:
                      case 17:
                        break;
                      case 1:
                        if (1024 & e && null !== o) {
                          (e = void 0),
                            (n = t),
                            (a = o.memoizedProps),
                            (o = o.memoizedState),
                            (l = n.stateNode);
                          try {
                            var h = yi(n.type, a, (n.elementType, n.type));
                            (e = l.getSnapshotBeforeUpdate(h, o)),
                              (l.__reactInternalSnapshotBeforeUpdate = e);
                          } catch (e) {
                            fc(n, n.return, e);
                          }
                        }
                        break;
                      case 3:
                        if (1024 & e)
                          if (9 === (n = (e = t.stateNode.containerInfo).nodeType)) bd(e);
                          else if (1 === n)
                            switch (e.nodeName) {
                              case 'HEAD':
                              case 'HTML':
                              case 'BODY':
                                bd(e);
                                break;
                              default:
                                e.textContent = '';
                            }
                        break;
                      default:
                        if (1024 & e) throw Error(r(163));
                    }
                    if (null !== (e = t.sibling)) {
                      (e.return = t.return), (Eu = e);
                      break;
                    }
                    Eu = t.return;
                  }
            })(e, t);
          } finally {
            (ls = i), (F.p = a), (M.T = l);
          }
        }
        (zs = 1), ac(), oc(), ic();
      }
    }
    function ac() {
      if (1 === zs) {
        zs = 0;
        var e = Ns,
          t = Ps,
          n = Boolean(13878 & t.flags);
        if (13878 & t.subtreeFlags || n) {
          (n = M.T), (M.T = null);
          var r = F.p;
          F.p = 2;
          var l = ls;
          ls |= 4;
          try {
            Mu(t, e);
            var a = ld,
              o = nr(e.containerInfo),
              i = a.focusedElem,
              u = a.selectionRange;
            if (o !== i && i && i.ownerDocument && tr(i.ownerDocument.documentElement, i)) {
              if (null !== u && rr(i)) {
                var s = u.start,
                  c = u.end;
                if ((void 0 === c && (c = s), 'selectionStart' in i))
                  (i.selectionStart = s), (i.selectionEnd = Math.min(c, i.value.length));
                else {
                  var d = i.ownerDocument || document,
                    f = d?.defaultView || window;
                  if (f.getSelection) {
                    var p = f.getSelection(),
                      m = i.textContent.length,
                      h = Math.min(u.start, m),
                      g = void 0 === u.end ? h : Math.min(u.end, m);
                    !p.extend && h > g && ((o = g), (g = h), (h = o));
                    var b = er(i, h),
                      y = er(i, g);
                    if (
                      b &&
                      y &&
                      (1 !== p.rangeCount ||
                        p.anchorNode !== b.node ||
                        p.anchorOffset !== b.offset ||
                        p.focusNode !== y.node ||
                        p.focusOffset !== y.offset)
                    ) {
                      var v = d.createRange();
                      v.setStart(b.node, b.offset),
                        p.removeAllRanges(),
                        h > g
                          ? (p.addRange(v), p.extend(y.node, y.offset))
                          : (v.setEnd(y.node, y.offset), p.addRange(v));
                    }
                  }
                }
              }
              for (d = [], p = i; (p = p.parentNode); )
                1 === p.nodeType && d.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
              for ('function' == typeof i.focus && i.focus(), i = 0; i < d.length; i++) {
                var w = d[i];
                (w.element.scrollLeft = w.left), (w.element.scrollTop = w.top);
              }
            }
            (lf = Boolean(rd)), (ld = rd = null);
          } finally {
            (ls = l), (F.p = r), (M.T = n);
          }
        }
        (e.current = t), (zs = 2);
      }
    }
    function oc() {
      if (2 === zs) {
        zs = 0;
        var e = Ns,
          t = Ps,
          n = Boolean(8772 & t.flags);
        if (8772 & t.subtreeFlags || n) {
          (n = M.T), (M.T = null);
          var r = F.p;
          F.p = 2;
          var l = ls;
          ls |= 4;
          try {
            Cu(e, t.alternate, t);
          } finally {
            (ls = l), (F.p = r), (M.T = n);
          }
        }
        zs = 3;
      }
    }
    function ic() {
      if (4 === zs || 3 === zs) {
        (zs = 0), ne();
        var e = Ns,
          t = Ps,
          n = Ts,
          r = As;
        10256 & t.subtreeFlags || 10256 & t.flags
          ? (zs = 5)
          : ((zs = 0), (Ps = Ns = null), uc(e, e.pendingLanes));
        var l = e.pendingLanes;
        if (
          (0 === l && (Cs = null),
          Le(n),
          (t = t.stateNode),
          pe && 'function' == typeof pe.onCommitFiberRoot)
        )
          try {
            pe.onCommitFiberRoot(fe, t, void 0, !(128 & ~t.current.flags));
          } catch (e) {}
        if (null !== r) {
          (t = M.T), (l = F.p), (F.p = 2), (M.T = null);
          try {
            for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
              var i = r[o];
              a(i.value, { componentStack: i.stack });
            }
          } finally {
            (M.T = t), (F.p = l);
          }
        }
        3 & Ts && sc(),
          _c(e),
          (l = e.pendingLanes),
          4194090 & n && 42 & l ? (e === Ds ? Rs++ : ((Rs = 0), (Ds = e))) : (Rs = 0),
          Ec(0);
      }
    }
    function uc(e, t) {
      0 === (e.pooledCacheLanes &= t) &&
        null != (t = e.pooledCache) &&
        ((e.pooledCache = null), Ml(t));
    }
    function sc(e) {
      return ac(), oc(), ic(), cc();
    }
    function cc() {
      if (5 !== zs) return !1;
      var e = Ns,
        t = Ls;
      Ls = 0;
      var n = Le(Ts),
        l = M.T,
        a = F.p;
      try {
        (F.p = 32 > n ? 32 : n), (M.T = null), (n = Os), (Os = null);
        var o = Ns,
          i = Ts;
        if (((zs = 0), (Ps = Ns = null), (Ts = 0), 6 & ls)) throw Error(r(331));
        var u = ls;
        if (
          ((ls |= 4),
          Ju(o.current),
          Bu(o, o.current, i, n),
          (ls = u),
          Ec(0, !1),
          pe && 'function' == typeof pe.onPostCommitFiberRoot)
        )
          try {
            pe.onPostCommitFiberRoot(fe, o);
          } catch (e) {}
        return !0;
      } finally {
        (F.p = a), (M.T = l), uc(e, t);
      }
    }
    function dc(e, t, n) {
      (t = Cr(n, t)), null !== (e = ia(e, (t = Ei(e.stateNode, t, 2)), 2)) && (ze(e, 2), _c(e));
    }
    function fc(e, t, n) {
      if (3 === e.tag) dc(e, e, n);
      else
        for (; null !== t; ) {
          if (3 === t.tag) {
            dc(t, e, n);
            break;
          }
          if (1 === t.tag) {
            var r = t.stateNode;
            if (
              'function' == typeof t.type.getDerivedStateFromError ||
              ('function' == typeof r.componentDidCatch && (null === Cs || !Cs.has(r)))
            ) {
              (e = Cr(n, e)),
                null !== (r = ia(t, (n = Ci(2)), 2)) && (zi(n, r, t, e), ze(r, 2), _c(r));
              break;
            }
          }
          t = t.return;
        }
    }
    function pc(e, t, n) {
      var r = e.pingCache;
      if (null === r) {
        r = e.pingCache = new rs();
        var l = new Set();
        r.set(t, l);
      } else void 0 === (l = r.get(t)) && ((l = new Set()), r.set(t, l));
      l.has(n) || ((fs = !0), l.add(n), (e = mc.bind(null, e, t, n)), t.then(e, e));
    }
    function mc(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        as === e &&
          (is & n) === n &&
          (4 === ms || (3 === ms && (62914560 & is) === is && 300 > re() - xs)
            ? !(2 & ls) && Bs(e, 0)
            : (bs |= n),
          vs === is && (vs = 0)),
        _c(e);
    }
    function hc(e, t) {
      0 === t && (t = Ee()), null !== (e = Ar(e, t)) && (ze(e, t), _c(e));
    }
    function gc(e) {
      var t = e.memoizedState,
        n = 0;
      null !== t && (n = t.retryLane), hc(e, n);
    }
    function bc(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var l = e.stateNode,
            a = e.memoizedState;
          null !== a && (n = a.retryLane);
          break;
        case 19:
          l = e.stateNode;
          break;
        case 22:
          l = e.stateNode._retryCache;
          break;
        default:
          throw Error(r(314));
      }
      null !== l && l.delete(t), hc(e, n);
    }
    var yc = null,
      vc = null,
      wc = !1,
      kc = !1,
      Sc = !1,
      xc = 0;
    function _c(e) {
      e !== vc && null === e.next && (null === vc ? (yc = vc = e) : (vc = vc.next = e)),
        (kc = !0),
        wc ||
          ((wc = !0),
          pd(function () {
            6 & ls ? J(ae, Cc) : zc();
          }));
    }
    function Ec(e, t) {
      if (!Sc && kc) {
        Sc = !0;
        do {
          for (var n = !1, r = yc; null !== r; ) {
            if (0 !== e) {
              var l = r.pendingLanes;
              if (0 === l) var a = 0;
              else {
                var o = r.suspendedLanes,
                  i = r.pingedLanes;
                (a = (1 << (31 - he(42 | e) + 1)) - 1),
                  (a = 201326741 & (a &= l & ~(o & ~i)) ? (201326741 & a) | 1 : a ? 2 | a : 0);
              }
              0 !== a && ((n = !0), Tc(r, a));
            } else
              (a = is),
                !(
                  3 &
                  (a = ke(
                    r,
                    r === as ? a : 0,
                    null !== r.cancelPendingCommit || -1 !== r.timeoutHandle,
                  ))
                ) ||
                  Se(r, a) ||
                  ((n = !0), Tc(r, a));
            r = r.next;
          }
        } while (n);
        Sc = !1;
      }
    }
    function Cc() {
      zc();
    }
    function zc() {
      kc = wc = !1;
      var e = 0;
      0 !== xc &&
        ((function () {
          var e = window.event;
          if (e && 'popstate' === e.type) return e !== sd && ((sd = e), !0);
          return (sd = null), !1;
        })() && (e = xc),
        (xc = 0));
      for (var t = re(), n = null, r = yc; null !== r; ) {
        var l = r.next,
          a = Nc(r, t);
        0 === a
          ? ((r.next = null), null === n ? (yc = l) : (n.next = l), null === l && (vc = n))
          : ((n = r), (0 !== e || 3 & a) && (kc = !0)),
          (r = l);
      }
      Ec(e);
    }
    function Nc(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          l = e.expirationTimes,
          a = -62914561 & e.pendingLanes;
        0 < a;

      ) {
        var o = 31 - he(a),
          i = 1 << o,
          u = l[o];
        -1 === u
          ? (0 !== (i & n) && 0 === (i & r)) || (l[o] = xe(i, t))
          : u <= t && (e.expiredLanes |= i),
          (a &= ~i);
      }
      if (
        ((n = is),
        (n = ke(
          e,
          e === (t = as) ? n : 0,
          null !== e.cancelPendingCommit || -1 !== e.timeoutHandle,
        )),
        (r = e.callbackNode),
        0 === n || (e === t && (2 === us || 9 === us)) || null !== e.cancelPendingCommit)
      )
        return null !== r && null !== r && ee(r), (e.callbackNode = null), (e.callbackPriority = 0);
      if (!(3 & n) || Se(e, n)) {
        if ((t = n & -n) === e.callbackPriority) return t;
        switch ((null !== r && ee(r), Le(n))) {
          case 2:
          case 8:
            n = oe;
            break;
          case 32:
          default:
            n = ie;
            break;
          case 268435456:
            n = se;
        }
        return (
          (r = Pc.bind(null, e)), (n = J(n, r)), (e.callbackPriority = t), (e.callbackNode = n), t
        );
      }
      return (
        null !== r && null !== r && ee(r), (e.callbackPriority = 2), (e.callbackNode = null), 2
      );
    }
    function Pc(e, t) {
      if (0 !== zs && 5 !== zs) return (e.callbackNode = null), (e.callbackPriority = 0), null;
      var n = e.callbackNode;
      if (sc() && e.callbackNode !== n) return null;
      var r = is;
      return 0 ===
        (r = ke(e, e === as ? r : 0, null !== e.cancelPendingCommit || -1 !== e.timeoutHandle))
        ? null
        : (js(e, r, t),
          Nc(e, re()),
          null != e.callbackNode && e.callbackNode === n ? Pc.bind(null, e) : null);
    }
    function Tc(e, t) {
      if (sc()) return null;
      js(e, t, !0);
    }
    function Lc() {
      return 0 === xc && (xc = _e()), xc;
    }
    function Oc(e) {
      return null == e || 'symbol' == typeof e || 'boolean' == typeof e
        ? null
        : 'function' == typeof e
          ? e
          : Lt(String(e));
    }
    function Ac(e, t) {
      var n = t.ownerDocument.createElement('input');
      return (
        (n.name = t.name),
        (n.value = t.value),
        e.id && n.setAttribute('form', e.id),
        t.parentNode.insertBefore(n, t),
        (e = new FormData(e)),
        n.parentNode.removeChild(n),
        e
      );
    }
    for (var Rc = 0; Rc < xr.length; Rc++) {
      var Dc = xr[Rc];
      _r(Dc.toLowerCase(), 'on' + (Dc[0].toUpperCase() + Dc.slice(1)));
    }
    _r(hr, 'onAnimationEnd'),
      _r(gr, 'onAnimationIteration'),
      _r(br, 'onAnimationStart'),
      _r('dblclick', 'onDoubleClick'),
      _r('focusin', 'onFocus'),
      _r('focusout', 'onBlur'),
      _r(yr, 'onTransitionRun'),
      _r(vr, 'onTransitionStart'),
      _r(wr, 'onTransitionCancel'),
      _r(kr, 'onTransitionEnd'),
      Xe('onMouseEnter', ['mouseout', 'mouseover']),
      Xe('onMouseLeave', ['mouseout', 'mouseover']),
      Xe('onPointerEnter', ['pointerout', 'pointerover']),
      Xe('onPointerLeave', ['pointerout', 'pointerover']),
      Ye(
        'onChange',
        'change click focusin focusout input keydown keyup selectionchange'.split(' '),
      ),
      Ye(
        'onSelect',
        'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
          ' ',
        ),
      ),
      Ye('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
      Ye('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
      Ye(
        'onCompositionStart',
        'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
      ),
      Ye(
        'onCompositionUpdate',
        'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
      );
    var Mc =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      Fc = new Set(
        'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Mc),
      );
    function Ic(e, t) {
      t = Boolean(4 & t);
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          l = r.event;
        r = r.listeners;
        e: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var i = r[o],
                u = i.instance,
                s = i.currentTarget;
              if (((i = i.listener), u !== a && l.isPropagationStopped())) break e;
              (a = i), (l.currentTarget = s);
              try {
                a(l);
              } catch (e) {
                vi(e);
              }
              (l.currentTarget = null), (a = u);
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((u = (i = r[o]).instance),
                (s = i.currentTarget),
                (i = i.listener),
                u !== a && l.isPropagationStopped())
              )
                break e;
              (a = i), (l.currentTarget = s);
              try {
                a(l);
              } catch (e) {
                vi(e);
              }
              (l.currentTarget = null), (a = u);
            }
        }
      }
    }
    function jc(e, t) {
      var n = t[Fe];
      void 0 === n && (n = t[Fe] = new Set());
      var r = e + '__bubble';
      n.has(r) || (Vc(t, e, 2, !1), n.add(r));
    }
    function Uc(e, t, n) {
      var r = 0;
      t && (r |= 4), Vc(n, e, r, t);
    }
    var Hc = '_reactListening' + Math.random().toString(36).slice(2);
    function $c(e) {
      if (!e[Hc]) {
        (e[Hc] = !0),
          Ge.forEach(function (t) {
            'selectionchange' !== t && (Fc.has(t) || Uc(t, !1, e), Uc(t, !0, e));
          });
        var t = 9 === e.nodeType ? e : e.ownerDocument;
        null === t || t[Hc] || ((t[Hc] = !0), Uc('selectionchange', !1, t));
      }
    }
    function Vc(e, t, n, r) {
      switch (ff(t)) {
        case 2:
          var l = af;
          break;
        case 8:
          l = of;
          break;
        default:
          l = uf;
      }
      (n = l.bind(null, t, n, e)),
        (l = void 0),
        !Ht || ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) || (l = !0),
        r
          ? void 0 !== l
            ? e.addEventListener(t, n, { capture: !0, passive: l })
            : e.addEventListener(t, n, !0)
          : void 0 !== l
            ? e.addEventListener(t, n, { passive: l })
            : e.addEventListener(t, n, !1);
    }
    function Wc(e, t, n, r, l) {
      var o = r;
      if (!(1 & t || 2 & t || null === r))
        e: for (;;) {
          if (null === r) return;
          var i = r.tag;
          if (3 === i || 4 === i) {
            var u = r.stateNode.containerInfo;
            if (u === l) break;
            if (4 === i)
              for (i = r.return; null !== i; ) {
                var s = i.tag;
                if ((3 === s || 4 === s) && i.stateNode.containerInfo === l) return;
                i = i.return;
              }
            for (; null !== u; ) {
              if (null === (i = Ve(u))) return;
              if (5 === (s = i.tag) || 6 === s || 26 === s || 27 === s) {
                r = o = i;
                continue e;
              }
              u = u.parentNode;
            }
          }
          r = r.return;
        }
      It(function () {
        var r = o,
          l = At(n),
          i = [];
        e: {
          var u = Sr.get(e);
          if (void 0 !== u) {
            var s = tn,
              c = e;
            switch (e) {
              case 'keypress':
                if (0 === Qt(n)) break e;
              case 'keydown':
              case 'keyup':
                s = bn;
                break;
              case 'focusin':
                (c = 'focus'), (s = un);
                break;
              case 'focusout':
                (c = 'blur'), (s = un);
                break;
              case 'beforeblur':
              case 'afterblur':
                s = un;
                break;
              case 'click':
                if (2 === n.button) break e;
              case 'auxclick':
              case 'dblclick':
              case 'mousedown':
              case 'mousemove':
              case 'mouseup':
              case 'mouseout':
              case 'mouseover':
              case 'contextmenu':
                s = an;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                s = on;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                s = vn;
                break;
              case hr:
              case gr:
              case br:
                s = sn;
                break;
              case kr:
                s = wn;
                break;
              case 'scroll':
              case 'scrollend':
                s = rn;
                break;
              case 'wheel':
                s = kn;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                s = cn;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                s = yn;
                break;
              case 'toggle':
              case 'beforetoggle':
                s = Sn;
            }
            var d = Boolean(4 & t),
              f = !d && ('scroll' === e || 'scrollend' === e),
              p = d ? (null !== u ? u + 'Capture' : null) : u;
            d = [];
            for (var m, h = r; null !== h; ) {
              var g = h;
              if (
                ((m = g.stateNode),
                (5 !== (g = g.tag) && 26 !== g && 27 !== g) ||
                  null === m ||
                  null === p ||
                  (null != (g = jt(h, p)) && d.push(Bc(h, g, m))),
                f)
              )
                break;
              h = h.return;
            }
            0 < d.length && ((u = new s(u, c, null, n, l)), i.push({ event: u, listeners: d }));
          }
        }
        if (!(7 & t)) {
          if (
            ((s = 'mouseout' === e || 'pointerout' === e),
            (!(u = 'mouseover' === e || 'pointerover' === e) ||
              n === Ot ||
              !(c = n.relatedTarget || n.fromElement) ||
              (!Ve(c) && !c[Me])) &&
              (s || u) &&
              ((u =
                l.window === l
                  ? l
                  : (u = l.ownerDocument)
                    ? u.defaultView || u.parentWindow
                    : window),
              s
                ? ((s = r),
                  null !== (c = (c = n.relatedTarget || n.toElement) ? Ve(c) : null) &&
                    ((f = a(c)), (d = c.tag), c !== f || (5 !== d && 27 !== d && 6 !== d)) &&
                    (c = null))
                : ((s = null), (c = r)),
              s !== c))
          ) {
            if (
              ((d = an),
              (g = 'onMouseLeave'),
              (p = 'onMouseEnter'),
              (h = 'mouse'),
              ('pointerout' !== e && 'pointerover' !== e) ||
                ((d = yn), (g = 'onPointerLeave'), (p = 'onPointerEnter'), (h = 'pointer')),
              (f = null == s ? u : Be(s)),
              (m = null == c ? u : Be(c)),
              ((u = new d(g, h + 'leave', s, n, l)).target = f),
              (u.relatedTarget = m),
              (g = null),
              Ve(l) === r &&
                (((d = new d(p, h + 'enter', c, n, l)).target = m), (d.relatedTarget = f), (g = d)),
              (f = g),
              s && c)
            )
              e: {
                for (p = c, h = 0, m = d = s; m; m = Qc(m)) h++;
                for (m = 0, g = p; g; g = Qc(g)) m++;
                for (; 0 < h - m; ) (d = Qc(d)), h--;
                for (; 0 < m - h; ) (p = Qc(p)), m--;
                for (; h--; ) {
                  if (d === p || (null !== p && d === p.alternate)) break e;
                  (d = Qc(d)), (p = Qc(p));
                }
                d = null;
              }
            else d = null;
            null !== s && Gc(i, u, s, d, !1), null !== c && null !== f && Gc(i, f, c, d, !0);
          }
          if (
            'select' === (s = (u = r ? Be(r) : window).nodeName && u.nodeName.toLowerCase()) ||
            ('input' === s && 'file' === u.type)
          )
            var b = Un;
          else if (Rn(u))
            if (Hn) b = Yn;
            else {
              b = Gn;
              var y = Qn;
            }
          else
            !(s = u.nodeName) ||
            'input' !== s.toLowerCase() ||
            ('checkbox' !== u.type && 'radio' !== u.type)
              ? r && Nt(r.elementType) && (b = Un)
              : (b = Kn);
          switch (
            (b && (b = b(e, r))
              ? Dn(i, b, n, l)
              : (y?.(e, u, r),
                'focusout' === e &&
                  r &&
                  'number' === u.type &&
                  null != r.memoizedProps.value &&
                  wt(u, 'number', u.value)),
            (y = r ? Be(r) : window),
            e)
          ) {
            case 'focusin':
              (Rn(y) || 'true' === y.contentEditable) && ((ar = y), (or = r), (ir = null));
              break;
            case 'focusout':
              ir = or = ar = null;
              break;
            case 'mousedown':
              ur = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              (ur = !1), sr(i, n, l);
              break;
            case 'selectionchange':
              if (lr) break;
            case 'keydown':
            case 'keyup':
              sr(i, n, l);
          }
          var v;
          if (_n)
            e: {
              switch (e) {
                case 'compositionstart':
                  var w = 'onCompositionStart';
                  break e;
                case 'compositionend':
                  w = 'onCompositionEnd';
                  break e;
                case 'compositionupdate':
                  w = 'onCompositionUpdate';
                  break e;
              }
              w = void 0;
            }
          else
            On
              ? Tn(e, n) && (w = 'onCompositionEnd')
              : 'keydown' === e && 229 === n.keyCode && (w = 'onCompositionStart');
          w &&
            (zn &&
              'ko' !== n.locale &&
              (On || 'onCompositionStart' !== w
                ? 'onCompositionEnd' === w && On && (v = qt())
                : ((Wt = 'value' in (Vt = l) ? Vt.value : Vt.textContent), (On = !0))),
            0 < (y = qc(r, w)).length &&
              ((w = new dn(w, e, null, n, l)),
              i.push({ event: w, listeners: y }),
              v ? (w.data = v) : null !== (v = Ln(n)) && (w.data = v))),
            (v = Cn
              ? (function (e, t) {
                  switch (e) {
                    case 'compositionend':
                      return Ln(t);
                    case 'keypress':
                      return 32 !== t.which ? null : ((Pn = !0), Nn);
                    case 'textInput':
                      return (e = t.data) === Nn && Pn ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (On)
                    return 'compositionend' === e || (!_n && Tn(e, t))
                      ? ((e = qt()), (Bt = Wt = Vt = null), (On = !1), e)
                      : null;
                  switch (e) {
                    case 'paste':
                    default:
                      return null;
                    case 'keypress':
                      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case 'compositionend':
                      return zn && 'ko' !== t.locale ? null : t.data;
                  }
                })(e, n)) &&
              0 < (w = qc(r, 'onBeforeInput')).length &&
              ((y = new dn('onBeforeInput', 'beforeinput', null, n, l)),
              i.push({ event: y, listeners: w }),
              (y.data = v)),
            (function (e, t, n, r, l) {
              if ('submit' === t && n && n.stateNode === l) {
                var a = Oc((l[De] || null).action),
                  o = r.submitter;
                o &&
                  null !==
                    (t = (t = o[De] || null) ? Oc(t.formAction) : o.getAttribute('formAction')) &&
                  ((a = t), (o = null));
                var i = new tn('action', 'action', null, r, l);
                e.push({
                  event: i,
                  listeners: [
                    {
                      instance: null,
                      listener: function () {
                        if (r.defaultPrevented) {
                          if (0 !== xc) {
                            var e = o ? Ac(l, o) : new FormData(l);
                            Ao(n, { pending: !0, data: e, method: l.method, action: a }, null, e);
                          }
                        } else
                          'function' == typeof a &&
                            (i.preventDefault(),
                            (e = o ? Ac(l, o) : new FormData(l)),
                            Ao(n, { pending: !0, data: e, method: l.method, action: a }, a, e));
                      },
                      currentTarget: l,
                    },
                  ],
                });
              }
            })(i, e, r, n, l);
        }
        Ic(i, t);
      });
    }
    function Bc(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function qc(e, t) {
      for (var n = t + 'Capture', r = []; null !== e; ) {
        var l = e,
          a = l.stateNode;
        if (
          ((5 !== (l = l.tag) && 26 !== l && 27 !== l) ||
            null === a ||
            (null != (l = jt(e, n)) && r.unshift(Bc(e, l, a)),
            null != (l = jt(e, t)) && r.push(Bc(e, l, a))),
          3 === e.tag)
        )
          return r;
        e = e.return;
      }
      return [];
    }
    function Qc(e) {
      if (null === e) return null;
      do {
        e = e.return;
      } while (e && 5 !== e.tag && 27 !== e.tag);
      return e || null;
    }
    function Gc(e, t, n, r, l) {
      for (var a = t._reactName, o = []; null !== n && n !== r; ) {
        var i = n,
          u = i.alternate,
          s = i.stateNode;
        if (((i = i.tag), null !== u && u === r)) break;
        (5 !== i && 26 !== i && 27 !== i) ||
          null === s ||
          ((u = s),
          l
            ? null != (s = jt(n, a)) && o.unshift(Bc(n, s, u))
            : l || (null != (s = jt(n, a)) && o.push(Bc(n, s, u)))),
          (n = n.return);
      }
      0 !== o.length && e.push({ event: t, listeners: o });
    }
    var Kc = /\r\n?/g,
      Yc = /\u0000|\uFFFD/g;
    function Xc(e) {
      return ('string' == typeof e ? e : String(e)).replace(Kc, '\n').replace(Yc, '');
    }
    function Zc(e, t) {
      return (t = Xc(t)), Xc(e) === t;
    }
    function Jc() {}
    function ed(e, t, n, l, a, o) {
      switch (n) {
        case 'children':
          'string' == typeof l
            ? 'body' === t || ('textarea' === t && '' === l) || _t(e, l)
            : ('number' == typeof l || 'bigint' == typeof l) && 'body' !== t && _t(e, String(l));
          break;
        case 'className':
          lt(e, 'class', l);
          break;
        case 'tabIndex':
          lt(e, 'tabindex', l);
          break;
        case 'dir':
        case 'role':
        case 'viewBox':
        case 'width':
        case 'height':
          lt(e, n, l);
          break;
        case 'style':
          zt(e, l, o);
          break;
        case 'data':
          if ('object' !== t) {
            lt(e, 'data', l);
            break;
          }
        case 'src':
        case 'href':
          if ('' === l && ('a' !== t || 'href' !== n)) {
            e.removeAttribute(n);
            break;
          }
          if (
            null == l ||
            'function' == typeof l ||
            'symbol' == typeof l ||
            'boolean' == typeof l
          ) {
            e.removeAttribute(n);
            break;
          }
          (l = Lt(String(l))), e.setAttribute(n, l);
          break;
        case 'action':
        case 'formAction':
          if ('function' == typeof l) {
            e.setAttribute(
              n,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          }
          if (
            ('function' == typeof o &&
              ('formAction' === n
                ? ('input' !== t && ed(e, t, 'name', a.name, a, null),
                  ed(e, t, 'formEncType', a.formEncType, a, null),
                  ed(e, t, 'formMethod', a.formMethod, a, null),
                  ed(e, t, 'formTarget', a.formTarget, a, null))
                : (ed(e, t, 'encType', a.encType, a, null),
                  ed(e, t, 'method', a.method, a, null),
                  ed(e, t, 'target', a.target, a, null))),
            null == l || 'symbol' == typeof l || 'boolean' == typeof l)
          ) {
            e.removeAttribute(n);
            break;
          }
          (l = Lt(String(l))), e.setAttribute(n, l);
          break;
        case 'onClick':
          null != l && (e.onclick = Jc);
          break;
        case 'onScroll':
          null != l && jc('scroll', e);
          break;
        case 'onScrollEnd':
          null != l && jc('scrollend', e);
          break;
        case 'dangerouslySetInnerHTML':
          if (null != l) {
            if ('object' != typeof l || !('__html' in l)) throw Error(r(61));
            if (null != (n = l.__html)) {
              if (null != a.children) throw Error(r(60));
              e.innerHTML = n;
            }
          }
          break;
        case 'multiple':
          e.multiple = l && 'function' != typeof l && 'symbol' != typeof l;
          break;
        case 'muted':
          e.muted = l && 'function' != typeof l && 'symbol' != typeof l;
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'defaultValue':
        case 'defaultChecked':
        case 'innerHTML':
        case 'ref':
        case 'autoFocus':
          break;
        case 'xlinkHref':
          if (
            null == l ||
            'function' == typeof l ||
            'boolean' == typeof l ||
            'symbol' == typeof l
          ) {
            e.removeAttribute('xlink:href');
            break;
          }
          (n = Lt(String(l))), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', n);
          break;
        case 'contentEditable':
        case 'spellCheck':
        case 'draggable':
        case 'value':
        case 'autoReverse':
        case 'externalResourcesRequired':
        case 'focusable':
        case 'preserveAlpha':
          null != l && 'function' != typeof l && 'symbol' != typeof l
            ? e.setAttribute(n, String(l))
            : e.removeAttribute(n);
          break;
        case 'inert':
        case 'allowFullScreen':
        case 'async':
        case 'autoPlay':
        case 'controls':
        case 'default':
        case 'defer':
        case 'disabled':
        case 'disablePictureInPicture':
        case 'disableRemotePlayback':
        case 'formNoValidate':
        case 'hidden':
        case 'loop':
        case 'noModule':
        case 'noValidate':
        case 'open':
        case 'playsInline':
        case 'readOnly':
        case 'required':
        case 'reversed':
        case 'scoped':
        case 'seamless':
        case 'itemScope':
          l && 'function' != typeof l && 'symbol' != typeof l
            ? e.setAttribute(n, '')
            : e.removeAttribute(n);
          break;
        case 'capture':
        case 'download':
          !0 === l
            ? e.setAttribute(n, '')
            : !1 !== l && null != l && 'function' != typeof l && 'symbol' != typeof l
              ? e.setAttribute(n, l)
              : e.removeAttribute(n);
          break;
        case 'cols':
        case 'rows':
        case 'size':
        case 'span':
          null != l && 'function' != typeof l && 'symbol' != typeof l && !isNaN(l) && 1 <= l
            ? e.setAttribute(n, l)
            : e.removeAttribute(n);
          break;
        case 'rowSpan':
        case 'start':
          null == l || 'function' == typeof l || 'symbol' == typeof l || isNaN(l)
            ? e.removeAttribute(n)
            : e.setAttribute(n, l);
          break;
        case 'popover':
          jc('beforetoggle', e), jc('toggle', e), rt(e, 'popover', l);
          break;
        case 'xlinkActuate':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l);
          break;
        case 'xlinkArcrole':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l);
          break;
        case 'xlinkRole':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:role', l);
          break;
        case 'xlinkShow':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:show', l);
          break;
        case 'xlinkTitle':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:title', l);
          break;
        case 'xlinkType':
          at(e, 'http://www.w3.org/1999/xlink', 'xlink:type', l);
          break;
        case 'xmlBase':
          at(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l);
          break;
        case 'xmlLang':
          at(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l);
          break;
        case 'xmlSpace':
          at(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l);
          break;
        case 'is':
          rt(e, 'is', l);
          break;
        case 'innerText':
        case 'textContent':
          break;
        default:
          (!(2 < n.length) || ('o' !== n[0] && 'O' !== n[0]) || ('n' !== n[1] && 'N' !== n[1])) &&
            rt(e, (n = Pt.get(n) || n), l);
      }
    }
    function td(e, t, n, l, a, o) {
      switch (n) {
        case 'style':
          zt(e, l, o);
          break;
        case 'dangerouslySetInnerHTML':
          if (null != l) {
            if ('object' != typeof l || !('__html' in l)) throw Error(r(61));
            if (null != (n = l.__html)) {
              if (null != a.children) throw Error(r(60));
              e.innerHTML = n;
            }
          }
          break;
        case 'children':
          'string' == typeof l
            ? _t(e, l)
            : ('number' == typeof l || 'bigint' == typeof l) && _t(e, String(l));
          break;
        case 'onScroll':
          null != l && jc('scroll', e);
          break;
        case 'onScrollEnd':
          null != l && jc('scrollend', e);
          break;
        case 'onClick':
          null != l && (e.onclick = Jc);
          break;
        case 'suppressContentEditableWarning':
        case 'suppressHydrationWarning':
        case 'innerHTML':
        case 'ref':
        case 'innerText':
        case 'textContent':
          break;
        default:
          Ke.hasOwnProperty(n) ||
            ('o' !== n[0] ||
            'n' !== n[1] ||
            ((a = n.endsWith('Capture')),
            (t = n.slice(2, a ? n.length - 7 : void 0)),
            'function' == typeof (o = null != (o = e[De] || null) ? o[n] : null) &&
              e.removeEventListener(t, o, a),
            'function' != typeof l)
              ? n in e
                ? (e[n] = l)
                : !0 === l
                  ? e.setAttribute(n, '')
                  : rt(e, n, l)
              : ('function' != typeof o &&
                  null !== o &&
                  (n in e ? (e[n] = null) : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, l, a)));
      }
    }
    function nd(e, t, n) {
      switch (t) {
        case 'div':
        case 'span':
        case 'svg':
        case 'path':
        case 'a':
        case 'g':
        case 'p':
        case 'li':
          break;
        case 'img':
          jc('error', e), jc('load', e);
          var l,
            a = !1,
            o = !1;
          for (l in n)
            if (n.hasOwnProperty(l)) {
              var i = n[l];
              if (null != i)
                switch (l) {
                  case 'src':
                    a = !0;
                    break;
                  case 'srcSet':
                    o = !0;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    throw Error(r(137, t));
                  default:
                    ed(e, t, l, i, n, null);
                }
            }
          return (
            o && ed(e, t, 'srcSet', n.srcSet, n, null), void (a && ed(e, t, 'src', n.src, n, null))
          );
        case 'input':
          jc('invalid', e);
          var u = (l = i = o = null),
            s = null,
            c = null;
          for (a in n)
            if (n.hasOwnProperty(a)) {
              var d = n[a];
              if (null != d)
                switch (a) {
                  case 'name':
                    o = d;
                    break;
                  case 'type':
                    i = d;
                    break;
                  case 'checked':
                    s = d;
                    break;
                  case 'defaultChecked':
                    c = d;
                    break;
                  case 'value':
                    l = d;
                    break;
                  case 'defaultValue':
                    u = d;
                    break;
                  case 'children':
                  case 'dangerouslySetInnerHTML':
                    if (null != d) throw Error(r(137, t));
                    break;
                  default:
                    ed(e, t, a, d, n, null);
                }
            }
          return vt(e, l, u, s, c, i, o, !1), void pt(e);
        case 'select':
          for (o in (jc('invalid', e), (a = i = l = null), n))
            if (n.hasOwnProperty(o) && null != (u = n[o]))
              switch (o) {
                case 'value':
                  l = u;
                  break;
                case 'defaultValue':
                  i = u;
                  break;
                case 'multiple':
                  a = u;
                default:
                  ed(e, t, o, u, n, null);
              }
          return (
            (t = l),
            (n = i),
            (e.multiple = Boolean(a)),
            void (null != t ? kt(e, Boolean(a), t, !1) : null != n && kt(e, Boolean(a), n, !0))
          );
        case 'textarea':
          for (i in (jc('invalid', e), (l = o = a = null), n))
            if (n.hasOwnProperty(i) && null != (u = n[i]))
              switch (i) {
                case 'value':
                  a = u;
                  break;
                case 'defaultValue':
                  o = u;
                  break;
                case 'children':
                  l = u;
                  break;
                case 'dangerouslySetInnerHTML':
                  if (null != u) throw Error(r(91));
                  break;
                default:
                  ed(e, t, i, u, n, null);
              }
          return xt(e, a, o, l), void pt(e);
        case 'option':
          for (s in n)
            if (n.hasOwnProperty(s) && null != (a = n[s]))
              if ('selected' === s)
                e.selected = a && 'function' != typeof a && 'symbol' != typeof a;
              else ed(e, t, s, a, n, null);
          return;
        case 'dialog':
          jc('beforetoggle', e), jc('toggle', e), jc('cancel', e), jc('close', e);
          break;
        case 'iframe':
        case 'object':
          jc('load', e);
          break;
        case 'video':
        case 'audio':
          for (a = 0; a < Mc.length; a++) jc(Mc[a], e);
          break;
        case 'image':
          jc('error', e), jc('load', e);
          break;
        case 'details':
          jc('toggle', e);
          break;
        case 'embed':
        case 'source':
        case 'link':
          jc('error', e), jc('load', e);
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'hr':
        case 'keygen':
        case 'meta':
        case 'param':
        case 'track':
        case 'wbr':
        case 'menuitem':
          for (c in n)
            if (n.hasOwnProperty(c) && null != (a = n[c]))
              switch (c) {
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, t));
                default:
                  ed(e, t, c, a, n, null);
              }
          return;
        default:
          if (Nt(t)) {
            for (d in n) n.hasOwnProperty(d) && void 0 !== (a = n[d]) && td(e, t, d, a, n, void 0);
            return;
          }
      }
      for (u in n) n.hasOwnProperty(u) && null != (a = n[u]) && ed(e, t, u, a, n, null);
    }
    var rd = null,
      ld = null;
    function ad(e) {
      return 9 === e.nodeType ? e : e.ownerDocument;
    }
    function od(e) {
      switch (e) {
        case 'http://www.w3.org/2000/svg':
          return 1;
        case 'http://www.w3.org/1998/Math/MathML':
          return 2;
        default:
          return 0;
      }
    }
    function id(e, t) {
      if (0 === e)
        switch (t) {
          case 'svg':
            return 1;
          case 'math':
            return 2;
          default:
            return 0;
        }
      return 1 === e && 'foreignObject' === t ? 0 : e;
    }
    function ud(e, t) {
      return (
        'textarea' === e ||
        'noscript' === e ||
        'string' == typeof t.children ||
        'number' == typeof t.children ||
        'bigint' == typeof t.children ||
        ('object' == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    var sd = null;
    var cd = 'function' == typeof setTimeout ? setTimeout : void 0,
      dd = 'function' == typeof clearTimeout ? clearTimeout : void 0,
      fd = 'function' == typeof Promise ? Promise : void 0,
      pd =
        'function' == typeof queueMicrotask
          ? queueMicrotask
          : void 0 !== fd
            ? function (e) {
                return fd.resolve(null).then(e).catch(md);
              }
            : cd;
    function md(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function hd(e) {
      return 'head' === e;
    }
    function gd(e, t) {
      var n = t,
        r = 0,
        l = 0;
      do {
        var a = n.nextSibling;
        if ((e.removeChild(n), a && 8 === a.nodeType))
          if ('/$' === (n = a.data)) {
            if (0 < r && 8 > r) {
              n = r;
              var o = e.ownerDocument;
              if ((1 & n && xd(o.documentElement), 2 & n && xd(o.body), 4 & n))
                for (xd((n = o.head)), o = n.firstChild; o; ) {
                  var i = o.nextSibling,
                    u = o.nodeName;
                  o[He] ||
                    'SCRIPT' === u ||
                    'STYLE' === u ||
                    ('LINK' === u && 'stylesheet' === o.rel.toLowerCase()) ||
                    n.removeChild(o),
                    (o = i);
                }
            }
            if (0 === l) return e.removeChild(a), void Tf(t);
            l--;
          } else '$' === n || '$?' === n || '$!' === n ? l++ : (r = n.charCodeAt(0) - 48);
        else r = 0;
        n = a;
      } while (n);
      Tf(t);
    }
    function bd(e) {
      var t = e.firstChild;
      for (t && 10 === t.nodeType && (t = t.nextSibling); t; ) {
        var n = t;
        switch (((t = t.nextSibling), n.nodeName)) {
          case 'HTML':
          case 'HEAD':
          case 'BODY':
            bd(n), $e(n);
            continue;
          case 'SCRIPT':
          case 'STYLE':
            continue;
          case 'LINK':
            if ('stylesheet' === n.rel.toLowerCase()) continue;
        }
        e.removeChild(n);
      }
    }
    function yd(e) {
      return '$!' === e.data || ('$?' === e.data && 'complete' === e.ownerDocument.readyState);
    }
    function vd(e) {
      for (; null != e; e = e.nextSibling) {
        var t = e.nodeType;
        if (1 === t || 3 === t) break;
        if (8 === t) {
          if ('$' === (t = e.data) || '$!' === t || '$?' === t || 'F!' === t || 'F' === t) break;
          if ('/$' === t) return null;
        }
      }
      return e;
    }
    var wd = null;
    function kd(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if ('$' === n || '$!' === n || '$?' === n) {
            if (0 === t) return e;
            t--;
          } else '/$' === n && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Sd(e, t, n) {
      switch (((t = ad(n)), e)) {
        case 'html':
          if (!(e = t.documentElement)) throw Error(r(452));
          return e;
        case 'head':
          if (!(e = t.head)) throw Error(r(453));
          return e;
        case 'body':
          if (!(e = t.body)) throw Error(r(454));
          return e;
        default:
          throw Error(r(451));
      }
    }
    function xd(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      $e(e);
    }
    var _d = new Map(),
      Ed = new Set();
    function Cd(e) {
      return 'function' == typeof e.getRootNode
        ? e.getRootNode()
        : 9 === e.nodeType
          ? e
          : e.ownerDocument;
    }
    var zd = F.d;
    F.d = {
      f: function () {
        var e = zd.f(),
          t = Vs();
        return e || t;
      },
      r: function (e) {
        var t = We(e);
        null !== t && 5 === t.tag && 'form' === t.type ? Do(t) : zd.r(e);
      },
      D: function (e) {
        zd.D(e), Pd('dns-prefetch', e, null);
      },
      C: function (e, t) {
        zd.C(e, t), Pd('preconnect', e, t);
      },
      L: function (e, t, n) {
        zd.L(e, t, n);
        var r = Nd;
        if (r && e && t) {
          var l = 'link[rel="preload"][as="' + bt(t) + '"]';
          'image' === t && n && n.imageSrcSet
            ? ((l += '[imagesrcset="' + bt(n.imageSrcSet) + '"]'),
              'string' == typeof n.imageSizes && (l += '[imagesizes="' + bt(n.imageSizes) + '"]'))
            : (l += '[href="' + bt(e) + '"]');
          var a = l;
          switch (t) {
            case 'style':
              a = Ld(e);
              break;
            case 'script':
              a = Rd(e);
          }
          _d.has(a) ||
            ((e = c(
              { rel: 'preload', href: 'image' === t && n && n.imageSrcSet ? void 0 : e, as: t },
              n,
            )),
            _d.set(a, e),
            null !== r.querySelector(l) ||
              ('style' === t && r.querySelector(Od(a))) ||
              ('script' === t && r.querySelector(Dd(a))) ||
              (nd((t = r.createElement('link')), 'link', e), Qe(t), r.head.appendChild(t)));
        }
      },
      m: function (e, t) {
        zd.m(e, t);
        var n = Nd;
        if (n && e) {
          var r = t && 'string' == typeof t.as ? t.as : 'script',
            l = 'link[rel="modulepreload"][as="' + bt(r) + '"][href="' + bt(e) + '"]',
            a = l;
          switch (r) {
            case 'audioworklet':
            case 'paintworklet':
            case 'serviceworker':
            case 'sharedworker':
            case 'worker':
            case 'script':
              a = Rd(e);
          }
          if (
            !_d.has(a) &&
            ((e = c({ rel: 'modulepreload', href: e }, t)),
            _d.set(a, e),
            null === n.querySelector(l))
          ) {
            switch (r) {
              case 'audioworklet':
              case 'paintworklet':
              case 'serviceworker':
              case 'sharedworker':
              case 'worker':
              case 'script':
                if (n.querySelector(Dd(a))) return;
            }
            nd((r = n.createElement('link')), 'link', e), Qe(r), n.head.appendChild(r);
          }
        }
      },
      X: function (e, t) {
        zd.X(e, t);
        var n = Nd;
        if (n && e) {
          var r = qe(n).hoistableScripts,
            l = Rd(e),
            a = r.get(l);
          a ||
            ((a = n.querySelector(Dd(l))) ||
              ((e = c({ src: e, async: !0 }, t)),
              (t = _d.get(l)) && jd(e, t),
              Qe((a = n.createElement('script'))),
              nd(a, 'link', e),
              n.head.appendChild(a)),
            (a = { type: 'script', instance: a, count: 1, state: null }),
            r.set(l, a));
        }
      },
      S: function (e, t, n) {
        zd.S(e, t, n);
        var r = Nd;
        if (r && e) {
          var l = qe(r).hoistableStyles,
            a = Ld(e);
          t = t || 'default';
          var o = l.get(a);
          if (!o) {
            var i = { loading: 0, preload: null };
            if ((o = r.querySelector(Od(a)))) i.loading = 5;
            else {
              (e = c({ rel: 'stylesheet', href: e, 'data-precedence': t }, n)),
                (n = _d.get(a)) && Id(e, n);
              var u = (o = r.createElement('link'));
              Qe(u),
                nd(u, 'link', e),
                (u._p = new Promise(function (e, t) {
                  (u.onload = e), (u.onerror = t);
                })),
                u.addEventListener('load', function () {
                  i.loading |= 1;
                }),
                u.addEventListener('error', function () {
                  i.loading |= 2;
                }),
                (i.loading |= 4),
                Fd(o, t, r);
            }
            (o = { type: 'stylesheet', instance: o, count: 1, state: i }), l.set(a, o);
          }
        }
      },
      M: function (e, t) {
        zd.M(e, t);
        var n = Nd;
        if (n && e) {
          var r = qe(n).hoistableScripts,
            l = Rd(e),
            a = r.get(l);
          a ||
            ((a = n.querySelector(Dd(l))) ||
              ((e = c({ src: e, async: !0, type: 'module' }, t)),
              (t = _d.get(l)) && jd(e, t),
              Qe((a = n.createElement('script'))),
              nd(a, 'link', e),
              n.head.appendChild(a)),
            (a = { type: 'script', instance: a, count: 1, state: null }),
            r.set(l, a));
        }
      },
    };
    var Nd = 'undefined' == typeof document ? null : document;
    function Pd(e, t, n) {
      var r = Nd;
      if (r && 'string' == typeof t && t) {
        var l = bt(t);
        (l = 'link[rel="' + e + '"][href="' + l + '"]'),
          'string' == typeof n && (l += '[crossorigin="' + n + '"]'),
          Ed.has(l) ||
            (Ed.add(l),
            (e = { rel: e, crossOrigin: n, href: t }),
            null === r.querySelector(l) &&
              (nd((t = r.createElement('link')), 'link', e), Qe(t), r.head.appendChild(t)));
      }
    }
    function Td(e, t, n, l) {
      var a,
        o,
        i,
        u,
        s = (s = q.current) ? Cd(s) : null;
      if (!s) throw Error(r(446));
      switch (e) {
        case 'meta':
        case 'title':
          return null;
        case 'style':
          return 'string' == typeof n.precedence && 'string' == typeof n.href
            ? ((t = Ld(n.href)),
              (l = (n = qe(s).hoistableStyles).get(t)) ||
                ((l = { type: 'style', instance: null, count: 0, state: null }), n.set(t, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null };
        case 'link':
          if (
            'stylesheet' === n.rel &&
            'string' == typeof n.href &&
            'string' == typeof n.precedence
          ) {
            e = Ld(n.href);
            var c = qe(s).hoistableStyles,
              d = c.get(e);
            if (
              (d ||
                ((s = s.ownerDocument || s),
                (d = {
                  type: 'stylesheet',
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                c.set(e, d),
                (c = s.querySelector(Od(e))) && !c._p && ((d.instance = c), (d.state.loading = 5)),
                _d.has(e) ||
                  ((n = {
                    rel: 'preload',
                    as: 'style',
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  _d.set(e, n),
                  c ||
                    ((a = s),
                    (o = e),
                    (i = n),
                    (u = d.state),
                    a.querySelector('link[rel="preload"][as="style"][' + o + ']')
                      ? (u.loading = 1)
                      : ((o = a.createElement('link')),
                        (u.preload = o),
                        o.addEventListener('load', function () {
                          return (u.loading |= 1);
                        }),
                        o.addEventListener('error', function () {
                          return (u.loading |= 2);
                        }),
                        nd(o, 'link', i),
                        Qe(o),
                        a.head.appendChild(o))))),
              t && null === l)
            )
              throw Error(r(528, ''));
            return d;
          }
          if (t && null !== l) throw Error(r(529, ''));
          return null;
        case 'script':
          return (
            (t = n.async),
            'string' == typeof (n = n.src) && t && 'function' != typeof t && 'symbol' != typeof t
              ? ((t = Rd(n)),
                (l = (n = qe(s).hoistableScripts).get(t)) ||
                  ((l = { type: 'script', instance: null, count: 0, state: null }), n.set(t, l)),
                l)
              : { type: 'void', instance: null, count: 0, state: null }
          );
        default:
          throw Error(r(444, e));
      }
    }
    function Ld(e) {
      return 'href="' + bt(e) + '"';
    }
    function Od(e) {
      return 'link[rel="stylesheet"][' + e + ']';
    }
    function Ad(e) {
      return c({}, e, { 'data-precedence': e.precedence, precedence: null });
    }
    function Rd(e) {
      return '[src="' + bt(e) + '"]';
    }
    function Dd(e) {
      return 'script[async]' + e;
    }
    function Md(e, t, n) {
      if ((t.count++, null === t.instance))
        switch (t.type) {
          case 'style':
            var l = e.querySelector('style[data-href~="' + bt(n.href) + '"]');
            if (l) return (t.instance = l), Qe(l), l;
            var a = c({}, n, {
              'data-href': n.href,
              'data-precedence': n.precedence,
              href: null,
              precedence: null,
            });
            return (
              Qe((l = (e.ownerDocument || e).createElement('style'))),
              nd(l, 'style', a),
              Fd(l, n.precedence, e),
              (t.instance = l)
            );
          case 'stylesheet':
            a = Ld(n.href);
            var o = e.querySelector(Od(a));
            if (o) return (t.state.loading |= 4), (t.instance = o), Qe(o), o;
            (l = Ad(n)),
              (a = _d.get(a)) && Id(l, a),
              Qe((o = (e.ownerDocument || e).createElement('link')));
            var i = o;
            return (
              (i._p = new Promise(function (e, t) {
                (i.onload = e), (i.onerror = t);
              })),
              nd(o, 'link', l),
              (t.state.loading |= 4),
              Fd(o, n.precedence, e),
              (t.instance = o)
            );
          case 'script':
            return (
              (o = Rd(n.src)),
              (a = e.querySelector(Dd(o)))
                ? ((t.instance = a), Qe(a), a)
                : ((l = n),
                  (a = _d.get(o)) && jd((l = c({}, n)), a),
                  Qe((a = (e = e.ownerDocument || e).createElement('script'))),
                  nd(a, 'link', l),
                  e.head.appendChild(a),
                  (t.instance = a))
            );
          case 'void':
            return null;
          default:
            throw Error(r(443, t.type));
        }
      else
        'stylesheet' === t.type &&
          !(4 & t.state.loading) &&
          ((l = t.instance), (t.state.loading |= 4), Fd(l, n.precedence, e));
      return t.instance;
    }
    function Fd(e, t, n) {
      for (
        var r = n.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          l = r.length ? r[r.length - 1] : null,
          a = l,
          o = 0;
        o < r.length;
        o++
      ) {
        var i = r[o];
        if (i.dataset.precedence === t) a = i;
        else if (a !== l) break;
      }
      a
        ? a.parentNode.insertBefore(e, a.nextSibling)
        : (t = 9 === n.nodeType ? n.head : n).insertBefore(e, t.firstChild);
    }
    function Id(e, t) {
      null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
        null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
        null == e.title && (e.title = t.title);
    }
    function jd(e, t) {
      null == e.crossOrigin && (e.crossOrigin = t.crossOrigin),
        null == e.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
        null == e.integrity && (e.integrity = t.integrity);
    }
    var Ud = null;
    function Hd(e, t, n) {
      if (null === Ud) {
        var r = new Map(),
          l = (Ud = new Map());
        l.set(n, r);
      } else (r = (l = Ud).get(n)) || ((r = new Map()), l.set(n, r));
      if (r.has(e)) return r;
      for (r.set(e, null), n = n.getElementsByTagName(e), l = 0; l < n.length; l++) {
        var a = n[l];
        if (
          !(a[He] || a[Re] || ('link' === e && 'stylesheet' === a.getAttribute('rel'))) &&
          'http://www.w3.org/2000/svg' !== a.namespaceURI
        ) {
          var o = a.getAttribute(t) || '';
          o = e + o;
          var i = r.get(o);
          i ? i.push(a) : r.set(o, [a]);
        }
      }
      return r;
    }
    function $d(e, t, n) {
      (e = e.ownerDocument || e).head.insertBefore(
        n,
        'title' === t ? e.querySelector('head > title') : null,
      );
    }
    function Vd(e) {
      return Boolean('stylesheet' !== e.type || 3 & e.state.loading);
    }
    var Wd = null;
    function Bd() {}
    function qd() {
      if ((this.count--, 0 === this.count))
        if (this.stylesheets) Gd(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          (this.unsuspend = null), e();
        }
    }
    var Qd = null;
    function Gd(e, t) {
      (e.stylesheets = null),
        null !== e.unsuspend &&
          (e.count++, (Qd = new Map()), t.forEach(Kd, e), (Qd = null), qd.call(e));
    }
    function Kd(e, t) {
      if (!(4 & t.state.loading)) {
        var n = Qd.get(e);
        if (n) var r = n.get(null);
        else {
          (n = new Map()), Qd.set(e, n);
          for (
            var l = e.querySelectorAll('link[data-precedence],style[data-precedence]'), a = 0;
            a < l.length;
            a++
          ) {
            var o = l[a];
            ('LINK' !== o.nodeName && 'not all' === o.getAttribute('media')) ||
              (n.set(o.dataset.precedence, o), (r = o));
          }
          r && n.set(null, r);
        }
        (o = (l = t.instance).getAttribute('data-precedence')),
          (a = n.get(o) || r) === r && n.set(null, l),
          n.set(o, l),
          this.count++,
          (r = qd.bind(this)),
          l.addEventListener('load', r),
          l.addEventListener('error', r),
          a
            ? a.parentNode.insertBefore(l, a.nextSibling)
            : (e = 9 === e.nodeType ? e.head : e).insertBefore(l, e.firstChild),
          (t.state.loading |= 4);
      }
    }
    var Yd = {
      $$typeof: S,
      Provider: null,
      Consumer: null,
      _currentValue: I,
      _currentValue2: I,
      _threadCount: 0,
    };
    function Xd(e, t, n, r, l, a, o, i) {
      (this.tag = 1),
        (this.containerInfo = e),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = Ce(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Ce(0)),
        (this.hiddenUpdates = Ce(null)),
        (this.identifierPrefix = r),
        (this.onUncaughtError = l),
        (this.onCaughtError = a),
        (this.onRecoverableError = o),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = i),
        (this.incompleteTransitions = new Map());
    }
    function Zd(e, t, n, r, l, a, o, i, u, s, c, d) {
      return (
        (e = new Xd(e, t, n, o, i, u, s, d)),
        (t = 1),
        !0 === a && (t |= 24),
        (a = Ir(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (t = Dl()).refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (a.memoizedState = { element: r, isDehydrated: n, cache: t }),
        la(a),
        e
      );
    }
    function Jd(e) {
      return e ? (e = Mr) : Mr;
    }
    function ef(e, t, n, r, l, a) {
      (l = Jd(l)),
        null === r.context ? (r.context = l) : (r.pendingContext = l),
        ((r = oa(t)).payload = { element: n }),
        null !== (a = void 0 === a ? null : a) && (r.callback = a),
        null !== (n = ia(e, r, t)) && (Is(n, 0, t), ua(n, e, t));
    }
    function tf(e, t) {
      if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
        var n = e.retryLane;
        e.retryLane = 0 !== n && n < t ? n : t;
      }
    }
    function nf(e, t) {
      tf(e, t), (e = e.alternate) && tf(e, t);
    }
    function rf(e) {
      if (13 === e.tag) {
        var t = Ar(e, 67108864);
        null !== t && Is(t, 0, 67108864), nf(e, 67108864);
      }
    }
    var lf = !0;
    function af(e, t, n, r) {
      var l = M.T;
      M.T = null;
      var a = F.p;
      try {
        (F.p = 2), uf(e, t, n, r);
      } finally {
        (F.p = a), (M.T = l);
      }
    }
    function of(e, t, n, r) {
      var l = M.T;
      M.T = null;
      var a = F.p;
      try {
        (F.p = 8), uf(e, t, n, r);
      } finally {
        (F.p = a), (M.T = l);
      }
    }
    function uf(e, t, n, r) {
      if (lf) {
        var l = sf(r);
        if (null === l) Wc(e, t, r, cf, n), kf(e, r);
        else if (
          (function (e, t, n, r, l) {
            switch (t) {
              case 'focusin':
                return (mf = Sf(mf, e, t, n, r, l)), !0;
              case 'dragenter':
                return (hf = Sf(hf, e, t, n, r, l)), !0;
              case 'mouseover':
                return (gf = Sf(gf, e, t, n, r, l)), !0;
              case 'pointerover':
                var a = l.pointerId;
                return bf.set(a, Sf(bf.get(a) || null, e, t, n, r, l)), !0;
              case 'gotpointercapture':
                return (a = l.pointerId), yf.set(a, Sf(yf.get(a) || null, e, t, n, r, l)), !0;
            }
            return !1;
          })(l, e, t, n, r)
        )
          r.stopPropagation();
        else if ((kf(e, r), 4 & t && -1 < wf.indexOf(e))) {
          for (; null !== l; ) {
            var a = We(l);
            if (null !== a)
              switch (a.tag) {
                case 3:
                  if ((a = a.stateNode).current.memoizedState.isDehydrated) {
                    var o = we(a.pendingLanes);
                    if (0 !== o) {
                      var i = a;
                      for (i.pendingLanes |= 2, i.entangledLanes |= 2; o; ) {
                        var u = 1 << (31 - he(o));
                        (i.entanglements[1] |= u), (o &= ~u);
                      }
                      _c(a), !(6 & ls) && ((_s = re() + 500), Ec(0));
                    }
                  }
                  break;
                case 13:
                  null !== (i = Ar(a, 2)) && Is(i, 0, 2), Vs(), nf(a, 2);
              }
            if ((null === (a = sf(r)) && Wc(e, t, r, cf, n), a === l)) break;
            l = a;
          }
          null !== l && r.stopPropagation();
        } else Wc(e, t, r, null, n);
      }
    }
    function sf(e) {
      return df((e = At(e)));
    }
    var cf = null;
    function df(e) {
      if (((cf = null), null !== (e = Ve(e)))) {
        var t = a(e);
        if (null === t) e = null;
        else {
          var n = t.tag;
          if (13 === n) {
            if (null !== (e = o(t))) return e;
            e = null;
          } else if (3 === n) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return 3 === t.tag ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return (cf = e), null;
    }
    function ff(e) {
      switch (e) {
        case 'beforetoggle':
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'toggle':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
          return 2;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
          return 8;
        case 'message':
          switch (le()) {
            case ae:
              return 2;
            case oe:
              return 8;
            case ie:
            case ue:
              return 32;
            case se:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var pf = !1,
      mf = null,
      hf = null,
      gf = null,
      bf = new Map(),
      yf = new Map(),
      vf = [],
      wf =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
          ' ',
        );
    function kf(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          mf = null;
          break;
        case 'dragenter':
        case 'dragleave':
          hf = null;
          break;
        case 'mouseover':
        case 'mouseout':
          gf = null;
          break;
        case 'pointerover':
        case 'pointerout':
          bf.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          yf.delete(t.pointerId);
      }
    }
    function Sf(e, t, n, r, l, a) {
      return null === e || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [l],
          }),
          null !== t && null !== (t = We(t)) && rf(t),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          null !== l && -1 === t.indexOf(l) && t.push(l),
          e);
    }
    function xf(e) {
      var t = Ve(e.target);
      if (null !== t) {
        var n = a(t);
        if (null !== n)
          if (13 === (t = n.tag)) {
            if (null !== (t = o(n)))
              return (
                (e.blockedOn = t),
                void (function (e, t) {
                  var n = F.p;
                  try {
                    return (F.p = e), t();
                  } finally {
                    F.p = n;
                  }
                })(e.priority, function () {
                  if (13 === n.tag) {
                    var e = Ms();
                    e = Te(e);
                    var t = Ar(n, e);
                    null !== t && Is(t, 0, e), nf(n, e);
                  }
                })
              );
          } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated)
            return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function _f(e) {
      if (null !== e.blockedOn) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = sf(e.nativeEvent);
        if (null !== n) return null !== (t = We(n)) && rf(t), (e.blockedOn = n), !1;
        var r = new (n = e.nativeEvent).constructor(n.type, n);
        (Ot = r), n.target.dispatchEvent(r), (Ot = null), t.shift();
      }
      return !0;
    }
    function Ef(e, t, n) {
      _f(e) && n.delete(t);
    }
    function Cf() {
      (pf = !1),
        null !== mf && _f(mf) && (mf = null),
        null !== hf && _f(hf) && (hf = null),
        null !== gf && _f(gf) && (gf = null),
        bf.forEach(Ef),
        yf.forEach(Ef);
    }
    function zf(t, n) {
      t.blockedOn === n &&
        ((t.blockedOn = null),
        pf || ((pf = !0), e.unstable_scheduleCallback(e.unstable_NormalPriority, Cf)));
    }
    var Nf = null;
    function Pf(t) {
      Nf !== t &&
        ((Nf = t),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
          Nf === t && (Nf = null);
          for (var e = 0; e < t.length; e += 3) {
            var n = t[e],
              r = t[e + 1],
              l = t[e + 2];
            if ('function' != typeof r) {
              if (null === df(r || n)) continue;
              break;
            }
            var a = We(n);
            null !== a &&
              (t.splice(e, 3),
              (e -= 3),
              Ao(a, { pending: !0, data: l, method: n.method, action: r }, r, l));
          }
        }));
    }
    function Tf(e) {
      function t(t) {
        return zf(t, e);
      }
      null !== mf && zf(mf, e),
        null !== hf && zf(hf, e),
        null !== gf && zf(gf, e),
        bf.forEach(t),
        yf.forEach(t);
      for (var n = 0; n < vf.length; n++) {
        var r = vf[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
      for (; 0 < vf.length && null === (n = vf[0]).blockedOn; )
        xf(n), null === n.blockedOn && vf.shift();
      if (null != (n = (e.ownerDocument || e).$$reactFormReplay))
        for (r = 0; r < n.length; r += 3) {
          var l = n[r],
            a = n[r + 1],
            o = l[De] || null;
          if ('function' == typeof a) o || Pf(n);
          else if (o) {
            var i = null;
            if (a?.hasAttribute('formAction')) {
              if (((l = a), (o = a[De] || null))) i = o.formAction;
              else if (null !== df(l)) continue;
            } else i = o.action;
            'function' == typeof i ? (n[r + 1] = i) : (n.splice(r, 3), (r -= 3)), Pf(n);
          }
        }
    }
    function Lf(e) {
      this._internalRoot = e;
    }
    function Of(e) {
      this._internalRoot = e;
    }
    (Of.prototype.render = Lf.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (null === t) throw Error(r(409));
        ef(t.current, Ms(), e, t, null, null);
      }),
      (Of.prototype.unmount = Lf.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (null !== e) {
            this._internalRoot = null;
            var t = e.containerInfo;
            ef(e.current, 2, null, e, null, null), Vs(), (t[Me] = null);
          }
        }),
      (Of.prototype.unstable_scheduleHydration = function (e) {
        if (e) {
          var t = Oe();
          e = { blockedOn: null, target: e, priority: t };
          for (var n = 0; n < vf.length && 0 !== t && t < vf[n].priority; n++);
          vf.splice(n, 0, e), 0 === n && xf(e);
        }
      });
    var Af = t.version;
    if ('19.1.0' !== Af) throw Error(r(527, Af, '19.1.0'));
    F.findDOMNode = function (e) {
      var t = e._reactInternals;
      if (void 0 === t) {
        if ('function' == typeof e.render) throw Error(r(188));
        throw ((e = Object.keys(e).join(',')), Error(r(268, e)));
      }
      return (
        (e = (function (e) {
          var t = e.alternate;
          if (!t) {
            if (null === (t = a(e))) throw Error(r(188));
            return t !== e ? null : e;
          }
          for (var n = e, l = t; ; ) {
            var o = n.return;
            if (null === o) break;
            var u = o.alternate;
            if (null === u) {
              if (null !== (l = o.return)) {
                n = l;
                continue;
              }
              break;
            }
            if (o.child === u.child) {
              for (u = o.child; u; ) {
                if (u === n) return i(o), e;
                if (u === l) return i(o), t;
                u = u.sibling;
              }
              throw Error(r(188));
            }
            if (n.return !== l.return) (n = o), (l = u);
            else {
              for (var s = !1, c = o.child; c; ) {
                if (c === n) {
                  (s = !0), (n = o), (l = u);
                  break;
                }
                if (c === l) {
                  (s = !0), (l = o), (n = u);
                  break;
                }
                c = c.sibling;
              }
              if (!s) {
                for (c = u.child; c; ) {
                  if (c === n) {
                    (s = !0), (n = u), (l = o);
                    break;
                  }
                  if (c === l) {
                    (s = !0), (l = u), (n = o);
                    break;
                  }
                  c = c.sibling;
                }
                if (!s) throw Error(r(189));
              }
            }
            if (n.alternate !== l) throw Error(r(190));
          }
          if (3 !== n.tag) throw Error(r(188));
          return n.stateNode.current === n ? e : t;
        })(t)),
        (e = null === (e = null !== e ? s(e) : null) ? null : e.stateNode)
      );
    };
    var Rf = {
      bundleType: 0,
      version: '19.1.0',
      rendererPackageName: 'react-dom',
      currentDispatcherRef: M,
      reconcilerVersion: '19.1.0',
    };
    if ('undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var Df = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Df.isDisabled && Df.supportsFiber)
        try {
          (fe = Df.inject(Rf)), (pe = Df);
        } catch (e) {}
    }
    return (
      (u.createRoot = function (e, t) {
        if (!l(e)) throw Error(r(299));
        var n = !1,
          a = '',
          o = wi,
          i = ki,
          u = Si;
        return (
          null != t &&
            (!0 === t.unstable_strictMode && (n = !0),
            void 0 !== t.identifierPrefix && (a = t.identifierPrefix),
            void 0 !== t.onUncaughtError && (o = t.onUncaughtError),
            void 0 !== t.onCaughtError && (i = t.onCaughtError),
            void 0 !== t.onRecoverableError && (u = t.onRecoverableError),
            void 0 !== t.unstable_transitionCallbacks && t.unstable_transitionCallbacks),
          (t = Zd(e, 1, !1, null, 0, n, a, o, i, u, 0, null)),
          (e[Me] = t.current),
          $c(e),
          new Lf(t)
        );
      }),
      (u.hydrateRoot = function (e, t, n) {
        if (!l(e)) throw Error(r(299));
        var a = !1,
          o = '',
          i = wi,
          u = ki,
          s = Si,
          c = null;
        return (
          null != n &&
            (!0 === n.unstable_strictMode && (a = !0),
            void 0 !== n.identifierPrefix && (o = n.identifierPrefix),
            void 0 !== n.onUncaughtError && (i = n.onUncaughtError),
            void 0 !== n.onCaughtError && (u = n.onCaughtError),
            void 0 !== n.onRecoverableError && (s = n.onRecoverableError),
            void 0 !== n.unstable_transitionCallbacks && n.unstable_transitionCallbacks,
            void 0 !== n.formState && (c = n.formState)),
          ((t = Zd(e, 1, !0, t, 0, a, o, i, u, s, 0, c)).context = Jd(null)),
          (n = t.current),
          ((o = oa((a = Te((a = Ms()))))).callback = null),
          ia(n, o, a),
          (n = a),
          (t.current.lanes = n),
          ze(t, n),
          _c(t),
          (e[Me] = t.current),
          $c(e),
          new Of(t)
        );
      }),
      (u.version = '19.1.0'),
      u
    );
  }
  var z =
      (k ||
        ((k = 1),
        (function e() {
          if (
            'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (e) {
              console.error(e);
            }
        })(),
        (i.exports = C())),
      i.exports),
    N = function () {
      return (
        (N =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var l in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
            return e;
          }),
        N.apply(this, arguments)
      );
    };
  function P(e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
      var l = 0;
      for (r = Object.getOwnPropertySymbols(e); l < r.length; l++)
        t.indexOf(r[l]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
          (n[r[l]] = e[r[l]]);
    }
    return n;
  }
  function T(e, t, n, r) {
    return new (n || (n = Promise))(function (l, a) {
      function o(e) {
        try {
          u(r.next(e));
        } catch (e) {
          a(e);
        }
      }
      function i(e) {
        try {
          u(r.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function u(e) {
        var t;
        e.done
          ? l(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(o, i);
      }
      u((r = r.apply(e, t || [])).next());
    });
  }
  function L(e, t) {
    var n,
      r,
      l,
      a = {
        label: 0,
        sent: function () {
          if (1 & l[0]) throw l[1];
          return l[1];
        },
        trys: [],
        ops: [],
      },
      o = Object.create(('function' == typeof Iterator ? Iterator : Object).prototype);
    return (
      (o.next = i(0)),
      (o.throw = i(1)),
      (o.return = i(2)),
      'function' == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function i(i) {
      return function (u) {
        return (function (i) {
          if (n) throw new TypeError('Generator is already executing.');
          for (; o && ((o = 0), i[0] && (a = 0)), a; )
            try {
              if (
                ((n = 1),
                r &&
                  (l =
                    2 & i[0]
                      ? r.return
                      : i[0]
                        ? r.throw || ((l = r.return) && l.call(r), 0)
                        : r.next) &&
                  !(l = l.call(r, i[1])).done)
              )
                return l;
              switch (((r = 0), l && (i = [2 & i[0], l.value]), i[0])) {
                case 0:
                case 1:
                  l = i;
                  break;
                case 4:
                  return a.label++, { value: i[1], done: !1 };
                case 5:
                  a.label++, (r = i[1]), (i = [0]);
                  continue;
                case 7:
                  (i = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((l = a.trys),
                    (l = l.length > 0 && l[l.length - 1]) || (6 !== i[0] && 2 !== i[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === i[0] && (!l || (i[1] > l[0] && i[1] < l[3]))) {
                    a.label = i[1];
                    break;
                  }
                  if (6 === i[0] && a.label < l[1]) {
                    (a.label = l[1]), (l = i);
                    break;
                  }
                  if (l && a.label < l[2]) {
                    (a.label = l[2]), a.ops.push(i);
                    break;
                  }
                  l[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              i = t.call(e, a);
            } catch (e) {
              (i = [6, e]), (r = 0);
            } finally {
              n = l = 0;
            }
          if (5 & i[0]) throw i[1];
          return { value: i[0] ? i[1] : void 0, done: !0 };
        })([i, u]);
      };
    }
  }
  function O(e, t, n) {
    if (n || 2 === arguments.length)
      for (var r, l = 0, a = t.length; l < a; l++)
        (!r && l in t) || (r || (r = Array.prototype.slice.call(t, 0, l)), (r[l] = t[l]));
    return e.concat(r || Array.prototype.slice.call(t));
  }
  'function' == typeof SuppressedError && SuppressedError;
  var A = b();
  function R(e, t) {
    if ('function' == typeof e) return e(t);
    null != e && (e.current = t);
  }
  function D(e) {
    const t = F(e),
      n = A.forwardRef((e, n) => {
        const { children: r, ...l } = e,
          a = A.Children.toArray(r),
          i = a.find(j);
        if (i) {
          const e = i.props.children,
            r = a.map((t) =>
              t === i
                ? A.Children.count(e) > 1
                  ? A.Children.only(null)
                  : A.isValidElement(e)
                    ? e.props.children
                    : null
                : t,
            );
          return o.jsx(t, {
            ...l,
            ref: n,
            children: A.isValidElement(e) ? A.cloneElement(e, void 0, r) : null,
          });
        }
        return o.jsx(t, { ...l, ref: n, children: r });
      });
    return (n.displayName = `${e}.Slot`), n;
  }
  var M = D('Slot');
  function F(e) {
    const t = A.forwardRef((e, t) => {
      const { children: n, ...r } = e;
      if (A.isValidElement(n)) {
        const e = (function (e) {
            let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
              n = t && 'isReactWarning' in t && t.isReactWarning;
            if (n) return e.ref;
            if (
              ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
              (n = t && 'isReactWarning' in t && t.isReactWarning),
              n)
            )
              return e.props.ref;
            return e.props.ref || e.ref;
          })(n),
          l = (function (e, t) {
            const n = { ...t };
            for (const r in t) {
              const l = e[r],
                a = t[r];
              /^on[A-Z]/.test(r)
                ? l && a
                  ? (n[r] = (...e) => {
                      const t = a(...e);
                      return l(...e), t;
                    })
                  : l && (n[r] = l)
                : 'style' === r
                  ? (n[r] = { ...l, ...a })
                  : 'className' === r && (n[r] = [l, a].filter(Boolean).join(' '));
            }
            return { ...e, ...n };
          })(r, n.props);
        return (
          n.type !== A.Fragment &&
            (l.ref = t
              ? (function (...e) {
                  return (t) => {
                    let n = !1;
                    const r = e.map((e) => {
                      const r = R(e, t);
                      return n || 'function' != typeof r || (n = !0), r;
                    });
                    if (n)
                      return () => {
                        for (let t = 0; t < r.length; t++) {
                          const n = r[t];
                          'function' == typeof n ? n() : R(e[t], null);
                        }
                      };
                  };
                })(t, e)
              : e),
          A.cloneElement(n, l)
        );
      }
      return A.Children.count(n) > 1 ? A.Children.only(null) : null;
    });
    return (t.displayName = `${e}.SlotClone`), t;
  }
  var I = Symbol('radix.slottable');
  function j(e) {
    return (
      A.isValidElement(e) &&
      'function' == typeof e.type &&
      '__radixId' in e.type &&
      e.type.__radixId === I
    );
  }
  function U(e) {
    var t,
      n,
      r = '';
    if ('string' == typeof e || 'number' == typeof e) r += e;
    else if ('object' == typeof e)
      if (Array.isArray(e)) {
        var l = e.length;
        for (t = 0; t < l; t++) e[t] && (n = U(e[t])) && (r && (r += ' '), (r += n));
      } else for (n in e) e[n] && (r && (r += ' '), (r += n));
    return r;
  }
  function H() {
    for (var e, t, n = 0, r = '', l = arguments.length; n < l; n++)
      (e = arguments[n]) && (t = U(e)) && (r && (r += ' '), (r += t));
    return r;
  }
  const $ = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
    V = H,
    W = (e, t) => (n) => {
      var r;
      if (null == (null == t ? void 0 : t.variants))
        return V(e, null == n ? void 0 : n.class, null == n ? void 0 : n.className);
      const { variants: l, defaultVariants: a } = t,
        o = Object.keys(l).map((e) => {
          const t = null == n ? void 0 : n[e],
            r = null == a ? void 0 : a[e];
          if (null === t) return null;
          const o = $(t) || $(r);
          return l[e][o];
        }),
        i =
          n &&
          Object.entries(n).reduce((e, t) => {
            let [n, r] = t;
            return void 0 === r || (e[n] = r), e;
          }, {}),
        u =
          null == t || null === (r = t.compoundVariants) || void 0 === r
            ? void 0
            : r.reduce((e, t) => {
                let { class: n, className: r, ...l } = t;
                return Object.entries(l).every((e) => {
                  let [t, n] = e;
                  return Array.isArray(n) ? n.includes({ ...a, ...i }[t]) : { ...a, ...i }[t] === n;
                })
                  ? [...e, n, r]
                  : e;
              }, []);
      return V(e, o, u, null == n ? void 0 : n.class, null == n ? void 0 : n.className);
    },
    B = (e) => {
      const t = K(e),
        { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
      return {
        getClassGroupId: (e) => {
          const n = e.split('-');
          return '' === n[0] && 1 !== n.length && n.shift(), q(n, t) || G(e);
        },
        getConflictingClassGroupIds: (e, t) => {
          const l = n[e] || [];
          return t && r[e] ? [...l, ...r[e]] : l;
        },
      };
    },
    q = (e, t) => {
      if (0 === e.length) return t.classGroupId;
      const n = e[0],
        r = t.nextPart.get(n),
        l = r ? q(e.slice(1), r) : void 0;
      if (l) return l;
      if (0 === t.validators.length) return;
      const a = e.join('-');
      return t.validators.find(({ validator: e }) => e(a))?.classGroupId;
    },
    Q = /^\[(.+)\]$/,
    G = (e) => {
      if (Q.test(e)) {
        const t = Q.exec(e)[1],
          n = t?.substring(0, t.indexOf(':'));
        if (n) return 'arbitrary..' + n;
      }
    },
    K = (e) => {
      const { theme: t, classGroups: n } = e,
        r = { nextPart: new Map(), validators: [] };
      for (const e in n) Y(n[e], r, e, t);
      return r;
    },
    Y = (e, t, n, r) => {
      e.forEach((e) => {
        if ('string' != typeof e) {
          if ('function' == typeof e)
            return Z(e)
              ? void Y(e(r), t, n, r)
              : void t.validators.push({ validator: e, classGroupId: n });
          Object.entries(e).forEach(([e, l]) => {
            Y(l, X(t, e), n, r);
          });
        } else {
          ('' === e ? t : X(t, e)).classGroupId = n;
        }
      });
    },
    X = (e, t) => {
      let n = e;
      return (
        t.split('-').forEach((e) => {
          n.nextPart.has(e) || n.nextPart.set(e, { nextPart: new Map(), validators: [] }),
            (n = n.nextPart.get(e));
        }),
        n
      );
    },
    Z = (e) => e.isThemeGetter,
    J = (e) => {
      if (e < 1) return { get: () => {}, set: () => {} };
      let t = 0,
        n = new Map(),
        r = new Map();
      const l = (l, a) => {
        n.set(l, a), t++, t > e && ((t = 0), (r = n), (n = new Map()));
      };
      return {
        get(e) {
          let t = n.get(e);
          return void 0 !== t ? t : void 0 !== (t = r.get(e)) ? (l(e, t), t) : void 0;
        },
        set(e, t) {
          n.has(e) ? n.set(e, t) : l(e, t);
        },
      };
    },
    ee = (e) => {
      const { prefix: t, experimentalParseClassName: n } = e;
      let r = (e) => {
        const t = [];
        let n,
          r = 0,
          l = 0,
          a = 0;
        for (let o = 0; o < e.length; o++) {
          let i = e[o];
          if (0 === r && 0 === l) {
            if (':' === i) {
              t.push(e.slice(a, o)), (a = o + 1);
              continue;
            }
            if ('/' === i) {
              n = o;
              continue;
            }
          }
          '[' === i ? r++ : ']' === i ? r-- : '(' === i ? l++ : ')' === i && l--;
        }
        const o = 0 === t.length ? e : e.substring(a),
          i = te(o);
        return {
          modifiers: t,
          hasImportantModifier: i !== o,
          baseClassName: i,
          maybePostfixModifierPosition: n && n > a ? n - a : void 0,
        };
      };
      if (t) {
        const e = t + ':',
          n = r;
        r = (t) =>
          t.startsWith(e)
            ? n(t.substring(e.length))
            : {
                isExternal: !0,
                modifiers: [],
                hasImportantModifier: !1,
                baseClassName: t,
                maybePostfixModifierPosition: void 0,
              };
      }
      if (n) {
        const e = r;
        r = (t) => n({ className: t, parseClassName: e });
      }
      return r;
    },
    te = (e) =>
      e.endsWith('!') ? e.substring(0, e.length - 1) : e.startsWith('!') ? e.substring(1) : e,
    ne = (e) => {
      const t = Object.fromEntries(e.orderSensitiveModifiers.map((e) => [e, !0]));
      return (e) => {
        if (e.length <= 1) return e;
        const n = [];
        let r = [];
        return (
          e.forEach((e) => {
            '[' === e[0] || t[e] ? (n.push(...r.sort(), e), (r = [])) : r.push(e);
          }),
          n.push(...r.sort()),
          n
        );
      };
    },
    re = /\s+/;
  function le() {
    let e,
      t,
      n = 0,
      r = '';
    for (; n < arguments.length; )
      (e = arguments[n++]) && (t = ae(e)) && (r && (r += ' '), (r += t));
    return r;
  }
  const ae = (e) => {
    if ('string' == typeof e) return e;
    let t,
      n = '';
    for (let r = 0; r < e.length; r++) e[r] && (t = ae(e[r])) && (n && (n += ' '), (n += t));
    return n;
  };
  function oe(e, ...t) {
    let n,
      r,
      l,
      a = function (i) {
        const u = t.reduce((e, t) => t(e), e());
        return (
          (n = ((e) => ({
            cache: J(e.cacheSize),
            parseClassName: ee(e),
            sortModifiers: ne(e),
            ...B(e),
          }))(u)),
          (r = n.cache.get),
          (l = n.cache.set),
          (a = o),
          o(i)
        );
      };
    function o(e) {
      const t = r(e);
      if (t) return t;
      const a = ((e, t) => {
        const {
            parseClassName: n,
            getClassGroupId: r,
            getConflictingClassGroupIds: l,
            sortModifiers: a,
          } = t,
          o = [],
          i = e.trim().split(re);
        let u = '';
        for (let e = i.length - 1; e >= 0; e -= 1) {
          const t = i[e],
            {
              isExternal: s,
              modifiers: c,
              hasImportantModifier: d,
              baseClassName: f,
              maybePostfixModifierPosition: p,
            } = n(t);
          if (s) {
            u = t + (u.length > 0 ? ' ' + u : u);
            continue;
          }
          let m = Boolean(p),
            h = r(m ? f.substring(0, p) : f);
          if (!h) {
            if (!m) {
              u = t + (u.length > 0 ? ' ' + u : u);
              continue;
            }
            if (((h = r(f)), !h)) {
              u = t + (u.length > 0 ? ' ' + u : u);
              continue;
            }
            m = !1;
          }
          const g = a(c).join(':'),
            b = d ? g + '!' : g,
            y = b + h;
          if (o.includes(y)) continue;
          o.push(y);
          const v = l(h, m);
          for (let e = 0; e < v.length; ++e) {
            const t = v[e];
            o.push(b + t);
          }
          u = t + (u.length > 0 ? ' ' + u : u);
        }
        return u;
      })(e, n);
      return l(e, a), a;
    }
    return function () {
      return a(le.apply(null, arguments));
    };
  }
  const ie = (e) => {
      const t = (t) => t[e] || [];
      return (t.isThemeGetter = !0), t;
    },
    ue = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
    se = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
    ce = /^\d+\/\d+$/,
    de = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    fe =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    pe = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    me = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    he =
      /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    ge = (e) => ce.test(e),
    be = (e) => Boolean(e) && !Number.isNaN(Number(e)),
    ye = (e) => Boolean(e) && Number.isInteger(Number(e)),
    ve = (e) => e.endsWith('%') && be(e.slice(0, -1)),
    we = (e) => de.test(e),
    ke = () => !0,
    Se = (e) => fe.test(e) && !pe.test(e),
    xe = () => !1,
    _e = (e) => me.test(e),
    Ee = (e) => he.test(e),
    Ce = (e) => !Ne(e) && !Re(e),
    ze = (e) => He(e, Be, xe),
    Ne = (e) => ue.test(e),
    Pe = (e) => He(e, qe, Se),
    Te = (e) => He(e, Qe, be),
    Le = (e) => He(e, Ve, xe),
    Oe = (e) => He(e, We, Ee),
    Ae = (e) => He(e, Ke, _e),
    Re = (e) => se.test(e),
    De = (e) => $e(e, qe),
    Me = (e) => $e(e, Ge),
    Fe = (e) => $e(e, Ve),
    Ie = (e) => $e(e, Be),
    je = (e) => $e(e, We),
    Ue = (e) => $e(e, Ke, !0),
    He = (e, t, n) => {
      const r = ue.exec(e);
      return Boolean(r) && (r[1] ? t(r[1]) : n(r[2]));
    },
    $e = (e, t, n = !1) => {
      const r = se.exec(e);
      return Boolean(r) && (r[1] ? t(r[1]) : n);
    },
    Ve = (e) => 'position' === e || 'percentage' === e,
    We = (e) => 'image' === e || 'url' === e,
    Be = (e) => 'length' === e || 'size' === e || 'bg-size' === e,
    qe = (e) => 'length' === e,
    Qe = (e) => 'number' === e,
    Ge = (e) => 'family-name' === e,
    Ke = (e) => 'shadow' === e,
    Ye = oe(() => {
      const e = ie('color'),
        t = ie('font'),
        n = ie('text'),
        r = ie('font-weight'),
        l = ie('tracking'),
        a = ie('leading'),
        o = ie('breakpoint'),
        i = ie('container'),
        u = ie('spacing'),
        s = ie('radius'),
        c = ie('shadow'),
        d = ie('inset-shadow'),
        f = ie('text-shadow'),
        p = ie('drop-shadow'),
        m = ie('blur'),
        h = ie('perspective'),
        g = ie('aspect'),
        b = ie('ease'),
        y = ie('animate'),
        v = () => [
          'center',
          'top',
          'bottom',
          'left',
          'right',
          'top-left',
          'left-top',
          'top-right',
          'right-top',
          'bottom-right',
          'right-bottom',
          'bottom-left',
          'left-bottom',
          Re,
          Ne,
        ],
        w = () => [Re, Ne, u],
        k = () => [ge, 'full', 'auto', ...w()],
        S = () => [ye, 'none', 'subgrid', Re, Ne],
        x = () => ['auto', { span: ['full', ye, Re, Ne] }, ye, Re, Ne],
        _ = () => [ye, 'auto', Re, Ne],
        E = () => ['auto', 'min', 'max', 'fr', Re, Ne],
        C = () => ['auto', ...w()],
        z = () => [
          ge,
          'auto',
          'full',
          'dvw',
          'dvh',
          'lvw',
          'lvh',
          'svw',
          'svh',
          'min',
          'max',
          'fit',
          ...w(),
        ],
        N = () => [e, Re, Ne],
        P = () => [
          'center',
          'top',
          'bottom',
          'left',
          'right',
          'top-left',
          'left-top',
          'top-right',
          'right-top',
          'bottom-right',
          'right-bottom',
          'bottom-left',
          'left-bottom',
          Fe,
          Le,
          { position: [Re, Ne] },
        ],
        T = () => ['auto', 'cover', 'contain', Ie, ze, { size: [Re, Ne] }],
        L = () => [ve, De, Pe],
        O = () => ['', 'none', 'full', s, Re, Ne],
        A = () => ['', be, De, Pe],
        R = () => [be, ve, Fe, Le],
        D = () => ['', 'none', m, Re, Ne],
        M = () => ['none', be, Re, Ne],
        F = () => ['none', be, Re, Ne],
        I = () => [be, Re, Ne],
        j = () => [ge, 'full', ...w()];
      return {
        cacheSize: 500,
        theme: {
          animate: ['spin', 'ping', 'pulse', 'bounce'],
          aspect: ['video'],
          blur: [we],
          breakpoint: [we],
          color: [ke],
          container: [we],
          'drop-shadow': [we],
          ease: ['in', 'out', 'in-out'],
          font: [Ce],
          'font-weight': [
            'thin',
            'extralight',
            'light',
            'normal',
            'medium',
            'semibold',
            'bold',
            'extrabold',
            'black',
          ],
          'inset-shadow': [we],
          leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
          perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
          radius: [we],
          shadow: [we],
          spacing: ['px', be],
          text: [we],
          'text-shadow': [we],
          tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
        },
        classGroups: {
          aspect: [{ aspect: ['auto', 'square', ge, Ne, Re, g] }],
          container: ['container'],
          columns: [{ columns: [be, Ne, Re, i] }],
          'break-after': [
            {
              'break-after': [
                'auto',
                'avoid',
                'all',
                'avoid-page',
                'page',
                'left',
                'right',
                'column',
              ],
            },
          ],
          'break-before': [
            {
              'break-before': [
                'auto',
                'avoid',
                'all',
                'avoid-page',
                'page',
                'left',
                'right',
                'column',
              ],
            },
          ],
          'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
          'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
          box: [{ box: ['border', 'content'] }],
          display: [
            'block',
            'inline-block',
            'inline',
            'flex',
            'inline-flex',
            'table',
            'inline-table',
            'table-caption',
            'table-cell',
            'table-column',
            'table-column-group',
            'table-footer-group',
            'table-header-group',
            'table-row-group',
            'table-row',
            'flow-root',
            'grid',
            'inline-grid',
            'contents',
            'list-item',
            'hidden',
          ],
          sr: ['sr-only', 'not-sr-only'],
          float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
          clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
          isolation: ['isolate', 'isolation-auto'],
          'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
          'object-position': [{ object: v() }],
          overflow: [{ overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          'overflow-x': [{ 'overflow-x': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          'overflow-y': [{ 'overflow-y': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
          overscroll: [{ overscroll: ['auto', 'contain', 'none'] }],
          'overscroll-x': [{ 'overscroll-x': ['auto', 'contain', 'none'] }],
          'overscroll-y': [{ 'overscroll-y': ['auto', 'contain', 'none'] }],
          position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
          inset: [{ inset: k() }],
          'inset-x': [{ 'inset-x': k() }],
          'inset-y': [{ 'inset-y': k() }],
          start: [{ start: k() }],
          end: [{ end: k() }],
          top: [{ top: k() }],
          right: [{ right: k() }],
          bottom: [{ bottom: k() }],
          left: [{ left: k() }],
          visibility: ['visible', 'invisible', 'collapse'],
          z: [{ z: [ye, 'auto', Re, Ne] }],
          basis: [{ basis: [ge, 'full', 'auto', i, ...w()] }],
          'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
          'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
          flex: [{ flex: [be, ge, 'auto', 'initial', 'none', Ne] }],
          grow: [{ grow: ['', be, Re, Ne] }],
          shrink: [{ shrink: ['', be, Re, Ne] }],
          order: [{ order: [ye, 'first', 'last', 'none', Re, Ne] }],
          'grid-cols': [{ 'grid-cols': S() }],
          'col-start-end': [{ col: x() }],
          'col-start': [{ 'col-start': _() }],
          'col-end': [{ 'col-end': _() }],
          'grid-rows': [{ 'grid-rows': S() }],
          'row-start-end': [{ row: x() }],
          'row-start': [{ 'row-start': _() }],
          'row-end': [{ 'row-end': _() }],
          'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
          'auto-cols': [{ 'auto-cols': E() }],
          'auto-rows': [{ 'auto-rows': E() }],
          gap: [{ gap: w() }],
          'gap-x': [{ 'gap-x': w() }],
          'gap-y': [{ 'gap-y': w() }],
          'justify-content': [
            {
              justify: [
                'start',
                'end',
                'center',
                'between',
                'around',
                'evenly',
                'stretch',
                'baseline',
                'center-safe',
                'end-safe',
                'normal',
              ],
            },
          ],
          'justify-items': [
            {
              'justify-items': [
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
                'normal',
              ],
            },
          ],
          'justify-self': [
            {
              'justify-self': [
                'auto',
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
              ],
            },
          ],
          'align-content': [
            {
              content: [
                'normal',
                'start',
                'end',
                'center',
                'between',
                'around',
                'evenly',
                'stretch',
                'baseline',
                'center-safe',
                'end-safe',
              ],
            },
          ],
          'align-items': [
            {
              items: [
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
                { baseline: ['', 'last'] },
              ],
            },
          ],
          'align-self': [
            {
              self: [
                'auto',
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
                { baseline: ['', 'last'] },
              ],
            },
          ],
          'place-content': [
            {
              'place-content': [
                'start',
                'end',
                'center',
                'between',
                'around',
                'evenly',
                'stretch',
                'baseline',
                'center-safe',
                'end-safe',
              ],
            },
          ],
          'place-items': [
            {
              'place-items': [
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
                'baseline',
              ],
            },
          ],
          'place-self': [
            {
              'place-self': [
                'auto',
                'start',
                'end',
                'center',
                'stretch',
                'center-safe',
                'end-safe',
              ],
            },
          ],
          p: [{ p: w() }],
          px: [{ px: w() }],
          py: [{ py: w() }],
          ps: [{ ps: w() }],
          pe: [{ pe: w() }],
          pt: [{ pt: w() }],
          pr: [{ pr: w() }],
          pb: [{ pb: w() }],
          pl: [{ pl: w() }],
          m: [{ m: C() }],
          mx: [{ mx: C() }],
          my: [{ my: C() }],
          ms: [{ ms: C() }],
          me: [{ me: C() }],
          mt: [{ mt: C() }],
          mr: [{ mr: C() }],
          mb: [{ mb: C() }],
          ml: [{ ml: C() }],
          'space-x': [{ 'space-x': w() }],
          'space-x-reverse': ['space-x-reverse'],
          'space-y': [{ 'space-y': w() }],
          'space-y-reverse': ['space-y-reverse'],
          size: [{ size: z() }],
          w: [{ w: [i, 'screen', ...z()] }],
          'min-w': [{ 'min-w': [i, 'screen', 'none', ...z()] }],
          'max-w': [{ 'max-w': [i, 'screen', 'none', 'prose', { screen: [o] }, ...z()] }],
          h: [{ h: ['screen', 'lh', ...z()] }],
          'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...z()] }],
          'max-h': [{ 'max-h': ['screen', 'lh', ...z()] }],
          'font-size': [{ text: ['base', n, De, Pe] }],
          'font-smoothing': ['antialiased', 'subpixel-antialiased'],
          'font-style': ['italic', 'not-italic'],
          'font-weight': [{ font: [r, Re, Te] }],
          'font-stretch': [
            {
              'font-stretch': [
                'ultra-condensed',
                'extra-condensed',
                'condensed',
                'semi-condensed',
                'normal',
                'semi-expanded',
                'expanded',
                'extra-expanded',
                'ultra-expanded',
                ve,
                Ne,
              ],
            },
          ],
          'font-family': [{ font: [Me, Ne, t] }],
          'fvn-normal': ['normal-nums'],
          'fvn-ordinal': ['ordinal'],
          'fvn-slashed-zero': ['slashed-zero'],
          'fvn-figure': ['lining-nums', 'oldstyle-nums'],
          'fvn-spacing': ['proportional-nums', 'tabular-nums'],
          'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
          tracking: [{ tracking: [l, Re, Ne] }],
          'line-clamp': [{ 'line-clamp': [be, 'none', Re, Te] }],
          leading: [{ leading: [a, ...w()] }],
          'list-image': [{ 'list-image': ['none', Re, Ne] }],
          'list-style-position': [{ list: ['inside', 'outside'] }],
          'list-style-type': [{ list: ['disc', 'decimal', 'none', Re, Ne] }],
          'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
          'placeholder-color': [{ placeholder: N() }],
          'text-color': [{ text: N() }],
          'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
          'text-decoration-style': [
            { decoration: ['solid', 'dashed', 'dotted', 'double', 'wavy'] },
          ],
          'text-decoration-thickness': [{ decoration: [be, 'from-font', 'auto', Re, Pe] }],
          'text-decoration-color': [{ decoration: N() }],
          'underline-offset': [{ 'underline-offset': [be, 'auto', Re, Ne] }],
          'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
          'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
          'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
          indent: [{ indent: w() }],
          'vertical-align': [
            {
              align: [
                'baseline',
                'top',
                'middle',
                'bottom',
                'text-top',
                'text-bottom',
                'sub',
                'super',
                Re,
                Ne,
              ],
            },
          ],
          whitespace: [
            { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
          ],
          break: [{ break: ['normal', 'words', 'all', 'keep'] }],
          wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
          hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
          content: [{ content: ['none', Re, Ne] }],
          'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
          'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
          'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
          'bg-position': [{ bg: P() }],
          'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] }],
          'bg-size': [{ bg: T() }],
          'bg-image': [
            {
              bg: [
                'none',
                {
                  linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, ye, Re, Ne],
                  radial: ['', Re, Ne],
                  conic: [ye, Re, Ne],
                },
                je,
                Oe,
              ],
            },
          ],
          'bg-color': [{ bg: N() }],
          'gradient-from-pos': [{ from: L() }],
          'gradient-via-pos': [{ via: L() }],
          'gradient-to-pos': [{ to: L() }],
          'gradient-from': [{ from: N() }],
          'gradient-via': [{ via: N() }],
          'gradient-to': [{ to: N() }],
          rounded: [{ rounded: O() }],
          'rounded-s': [{ 'rounded-s': O() }],
          'rounded-e': [{ 'rounded-e': O() }],
          'rounded-t': [{ 'rounded-t': O() }],
          'rounded-r': [{ 'rounded-r': O() }],
          'rounded-b': [{ 'rounded-b': O() }],
          'rounded-l': [{ 'rounded-l': O() }],
          'rounded-ss': [{ 'rounded-ss': O() }],
          'rounded-se': [{ 'rounded-se': O() }],
          'rounded-ee': [{ 'rounded-ee': O() }],
          'rounded-es': [{ 'rounded-es': O() }],
          'rounded-tl': [{ 'rounded-tl': O() }],
          'rounded-tr': [{ 'rounded-tr': O() }],
          'rounded-br': [{ 'rounded-br': O() }],
          'rounded-bl': [{ 'rounded-bl': O() }],
          'border-w': [{ border: A() }],
          'border-w-x': [{ 'border-x': A() }],
          'border-w-y': [{ 'border-y': A() }],
          'border-w-s': [{ 'border-s': A() }],
          'border-w-e': [{ 'border-e': A() }],
          'border-w-t': [{ 'border-t': A() }],
          'border-w-r': [{ 'border-r': A() }],
          'border-w-b': [{ 'border-b': A() }],
          'border-w-l': [{ 'border-l': A() }],
          'divide-x': [{ 'divide-x': A() }],
          'divide-x-reverse': ['divide-x-reverse'],
          'divide-y': [{ 'divide-y': A() }],
          'divide-y-reverse': ['divide-y-reverse'],
          'border-style': [{ border: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] }],
          'divide-style': [{ divide: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] }],
          'border-color': [{ border: N() }],
          'border-color-x': [{ 'border-x': N() }],
          'border-color-y': [{ 'border-y': N() }],
          'border-color-s': [{ 'border-s': N() }],
          'border-color-e': [{ 'border-e': N() }],
          'border-color-t': [{ 'border-t': N() }],
          'border-color-r': [{ 'border-r': N() }],
          'border-color-b': [{ 'border-b': N() }],
          'border-color-l': [{ 'border-l': N() }],
          'divide-color': [{ divide: N() }],
          'outline-style': [{ outline: ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'] }],
          'outline-offset': [{ 'outline-offset': [be, Re, Ne] }],
          'outline-w': [{ outline: ['', be, De, Pe] }],
          'outline-color': [{ outline: N() }],
          shadow: [{ shadow: ['', 'none', c, Ue, Ae] }],
          'shadow-color': [{ shadow: N() }],
          'inset-shadow': [{ 'inset-shadow': ['none', d, Ue, Ae] }],
          'inset-shadow-color': [{ 'inset-shadow': N() }],
          'ring-w': [{ ring: A() }],
          'ring-w-inset': ['ring-inset'],
          'ring-color': [{ ring: N() }],
          'ring-offset-w': [{ 'ring-offset': [be, Pe] }],
          'ring-offset-color': [{ 'ring-offset': N() }],
          'inset-ring-w': [{ 'inset-ring': A() }],
          'inset-ring-color': [{ 'inset-ring': N() }],
          'text-shadow': [{ 'text-shadow': ['none', f, Ue, Ae] }],
          'text-shadow-color': [{ 'text-shadow': N() }],
          opacity: [{ opacity: [be, Re, Ne] }],
          'mix-blend': [
            {
              'mix-blend': [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
                'plus-darker',
                'plus-lighter',
              ],
            },
          ],
          'bg-blend': [
            {
              'bg-blend': [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
              ],
            },
          ],
          'mask-clip': [
            { 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
            'mask-no-clip',
          ],
          'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
          'mask-image-linear-pos': [{ 'mask-linear': [be] }],
          'mask-image-linear-from-pos': [{ 'mask-linear-from': R() }],
          'mask-image-linear-to-pos': [{ 'mask-linear-to': R() }],
          'mask-image-linear-from-color': [{ 'mask-linear-from': N() }],
          'mask-image-linear-to-color': [{ 'mask-linear-to': N() }],
          'mask-image-t-from-pos': [{ 'mask-t-from': R() }],
          'mask-image-t-to-pos': [{ 'mask-t-to': R() }],
          'mask-image-t-from-color': [{ 'mask-t-from': N() }],
          'mask-image-t-to-color': [{ 'mask-t-to': N() }],
          'mask-image-r-from-pos': [{ 'mask-r-from': R() }],
          'mask-image-r-to-pos': [{ 'mask-r-to': R() }],
          'mask-image-r-from-color': [{ 'mask-r-from': N() }],
          'mask-image-r-to-color': [{ 'mask-r-to': N() }],
          'mask-image-b-from-pos': [{ 'mask-b-from': R() }],
          'mask-image-b-to-pos': [{ 'mask-b-to': R() }],
          'mask-image-b-from-color': [{ 'mask-b-from': N() }],
          'mask-image-b-to-color': [{ 'mask-b-to': N() }],
          'mask-image-l-from-pos': [{ 'mask-l-from': R() }],
          'mask-image-l-to-pos': [{ 'mask-l-to': R() }],
          'mask-image-l-from-color': [{ 'mask-l-from': N() }],
          'mask-image-l-to-color': [{ 'mask-l-to': N() }],
          'mask-image-x-from-pos': [{ 'mask-x-from': R() }],
          'mask-image-x-to-pos': [{ 'mask-x-to': R() }],
          'mask-image-x-from-color': [{ 'mask-x-from': N() }],
          'mask-image-x-to-color': [{ 'mask-x-to': N() }],
          'mask-image-y-from-pos': [{ 'mask-y-from': R() }],
          'mask-image-y-to-pos': [{ 'mask-y-to': R() }],
          'mask-image-y-from-color': [{ 'mask-y-from': N() }],
          'mask-image-y-to-color': [{ 'mask-y-to': N() }],
          'mask-image-radial': [{ 'mask-radial': [Re, Ne] }],
          'mask-image-radial-from-pos': [{ 'mask-radial-from': R() }],
          'mask-image-radial-to-pos': [{ 'mask-radial-to': R() }],
          'mask-image-radial-from-color': [{ 'mask-radial-from': N() }],
          'mask-image-radial-to-color': [{ 'mask-radial-to': N() }],
          'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
          'mask-image-radial-size': [
            { 'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }] },
          ],
          'mask-image-radial-pos': [
            {
              'mask-radial-at': [
                'center',
                'top',
                'bottom',
                'left',
                'right',
                'top-left',
                'left-top',
                'top-right',
                'right-top',
                'bottom-right',
                'right-bottom',
                'bottom-left',
                'left-bottom',
              ],
            },
          ],
          'mask-image-conic-pos': [{ 'mask-conic': [be] }],
          'mask-image-conic-from-pos': [{ 'mask-conic-from': R() }],
          'mask-image-conic-to-pos': [{ 'mask-conic-to': R() }],
          'mask-image-conic-from-color': [{ 'mask-conic-from': N() }],
          'mask-image-conic-to-color': [{ 'mask-conic-to': N() }],
          'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
          'mask-origin': [
            { 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
          ],
          'mask-position': [{ mask: P() }],
          'mask-repeat': [{ mask: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] }],
          'mask-size': [{ mask: T() }],
          'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
          'mask-image': [{ mask: ['none', Re, Ne] }],
          filter: [{ filter: ['', 'none', Re, Ne] }],
          blur: [{ blur: D() }],
          brightness: [{ brightness: [be, Re, Ne] }],
          contrast: [{ contrast: [be, Re, Ne] }],
          'drop-shadow': [{ 'drop-shadow': ['', 'none', p, Ue, Ae] }],
          'drop-shadow-color': [{ 'drop-shadow': N() }],
          grayscale: [{ grayscale: ['', be, Re, Ne] }],
          'hue-rotate': [{ 'hue-rotate': [be, Re, Ne] }],
          invert: [{ invert: ['', be, Re, Ne] }],
          saturate: [{ saturate: [be, Re, Ne] }],
          sepia: [{ sepia: ['', be, Re, Ne] }],
          'backdrop-filter': [{ 'backdrop-filter': ['', 'none', Re, Ne] }],
          'backdrop-blur': [{ 'backdrop-blur': D() }],
          'backdrop-brightness': [{ 'backdrop-brightness': [be, Re, Ne] }],
          'backdrop-contrast': [{ 'backdrop-contrast': [be, Re, Ne] }],
          'backdrop-grayscale': [{ 'backdrop-grayscale': ['', be, Re, Ne] }],
          'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [be, Re, Ne] }],
          'backdrop-invert': [{ 'backdrop-invert': ['', be, Re, Ne] }],
          'backdrop-opacity': [{ 'backdrop-opacity': [be, Re, Ne] }],
          'backdrop-saturate': [{ 'backdrop-saturate': [be, Re, Ne] }],
          'backdrop-sepia': [{ 'backdrop-sepia': ['', be, Re, Ne] }],
          'border-collapse': [{ border: ['collapse', 'separate'] }],
          'border-spacing': [{ 'border-spacing': w() }],
          'border-spacing-x': [{ 'border-spacing-x': w() }],
          'border-spacing-y': [{ 'border-spacing-y': w() }],
          'table-layout': [{ table: ['auto', 'fixed'] }],
          caption: [{ caption: ['top', 'bottom'] }],
          transition: [
            { transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', Re, Ne] },
          ],
          'transition-behavior': [{ transition: ['normal', 'discrete'] }],
          duration: [{ duration: [be, 'initial', Re, Ne] }],
          ease: [{ ease: ['linear', 'initial', b, Re, Ne] }],
          delay: [{ delay: [be, Re, Ne] }],
          animate: [{ animate: ['none', y, Re, Ne] }],
          backface: [{ backface: ['hidden', 'visible'] }],
          perspective: [{ perspective: [h, Re, Ne] }],
          'perspective-origin': [{ 'perspective-origin': v() }],
          rotate: [{ rotate: M() }],
          'rotate-x': [{ 'rotate-x': M() }],
          'rotate-y': [{ 'rotate-y': M() }],
          'rotate-z': [{ 'rotate-z': M() }],
          scale: [{ scale: F() }],
          'scale-x': [{ 'scale-x': F() }],
          'scale-y': [{ 'scale-y': F() }],
          'scale-z': [{ 'scale-z': F() }],
          'scale-3d': ['scale-3d'],
          skew: [{ skew: I() }],
          'skew-x': [{ 'skew-x': I() }],
          'skew-y': [{ 'skew-y': I() }],
          transform: [{ transform: [Re, Ne, '', 'none', 'gpu', 'cpu'] }],
          'transform-origin': [{ origin: v() }],
          'transform-style': [{ transform: ['3d', 'flat'] }],
          translate: [{ translate: j() }],
          'translate-x': [{ 'translate-x': j() }],
          'translate-y': [{ 'translate-y': j() }],
          'translate-z': [{ 'translate-z': j() }],
          'translate-none': ['translate-none'],
          accent: [{ accent: N() }],
          appearance: [{ appearance: ['none', 'auto'] }],
          'caret-color': [{ caret: N() }],
          'color-scheme': [
            { scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] },
          ],
          cursor: [
            {
              cursor: [
                'auto',
                'default',
                'pointer',
                'wait',
                'text',
                'move',
                'help',
                'not-allowed',
                'none',
                'context-menu',
                'progress',
                'cell',
                'crosshair',
                'vertical-text',
                'alias',
                'copy',
                'no-drop',
                'grab',
                'grabbing',
                'all-scroll',
                'col-resize',
                'row-resize',
                'n-resize',
                'e-resize',
                's-resize',
                'w-resize',
                'ne-resize',
                'nw-resize',
                'se-resize',
                'sw-resize',
                'ew-resize',
                'ns-resize',
                'nesw-resize',
                'nwse-resize',
                'zoom-in',
                'zoom-out',
                Re,
                Ne,
              ],
            },
          ],
          'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
          'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
          resize: [{ resize: ['none', '', 'y', 'x'] }],
          'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
          'scroll-m': [{ 'scroll-m': w() }],
          'scroll-mx': [{ 'scroll-mx': w() }],
          'scroll-my': [{ 'scroll-my': w() }],
          'scroll-ms': [{ 'scroll-ms': w() }],
          'scroll-me': [{ 'scroll-me': w() }],
          'scroll-mt': [{ 'scroll-mt': w() }],
          'scroll-mr': [{ 'scroll-mr': w() }],
          'scroll-mb': [{ 'scroll-mb': w() }],
          'scroll-ml': [{ 'scroll-ml': w() }],
          'scroll-p': [{ 'scroll-p': w() }],
          'scroll-px': [{ 'scroll-px': w() }],
          'scroll-py': [{ 'scroll-py': w() }],
          'scroll-ps': [{ 'scroll-ps': w() }],
          'scroll-pe': [{ 'scroll-pe': w() }],
          'scroll-pt': [{ 'scroll-pt': w() }],
          'scroll-pr': [{ 'scroll-pr': w() }],
          'scroll-pb': [{ 'scroll-pb': w() }],
          'scroll-pl': [{ 'scroll-pl': w() }],
          'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
          'snap-stop': [{ snap: ['normal', 'always'] }],
          'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
          'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
          touch: [{ touch: ['auto', 'none', 'manipulation'] }],
          'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
          'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
          'touch-pz': ['touch-pinch-zoom'],
          select: [{ select: ['none', 'text', 'all', 'auto'] }],
          'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', Re, Ne] }],
          fill: [{ fill: ['none', ...N()] }],
          'stroke-w': [{ stroke: [be, De, Pe, Te] }],
          stroke: [{ stroke: ['none', ...N()] }],
          'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
        },
        conflictingClassGroups: {
          overflow: ['overflow-x', 'overflow-y'],
          overscroll: ['overscroll-x', 'overscroll-y'],
          inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
          'inset-x': ['right', 'left'],
          'inset-y': ['top', 'bottom'],
          flex: ['basis', 'grow', 'shrink'],
          gap: ['gap-x', 'gap-y'],
          p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
          px: ['pr', 'pl'],
          py: ['pt', 'pb'],
          m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
          mx: ['mr', 'ml'],
          my: ['mt', 'mb'],
          size: ['w', 'h'],
          'font-size': ['leading'],
          'fvn-normal': [
            'fvn-ordinal',
            'fvn-slashed-zero',
            'fvn-figure',
            'fvn-spacing',
            'fvn-fraction',
          ],
          'fvn-ordinal': ['fvn-normal'],
          'fvn-slashed-zero': ['fvn-normal'],
          'fvn-figure': ['fvn-normal'],
          'fvn-spacing': ['fvn-normal'],
          'fvn-fraction': ['fvn-normal'],
          'line-clamp': ['display', 'overflow'],
          rounded: [
            'rounded-s',
            'rounded-e',
            'rounded-t',
            'rounded-r',
            'rounded-b',
            'rounded-l',
            'rounded-ss',
            'rounded-se',
            'rounded-ee',
            'rounded-es',
            'rounded-tl',
            'rounded-tr',
            'rounded-br',
            'rounded-bl',
          ],
          'rounded-s': ['rounded-ss', 'rounded-es'],
          'rounded-e': ['rounded-se', 'rounded-ee'],
          'rounded-t': ['rounded-tl', 'rounded-tr'],
          'rounded-r': ['rounded-tr', 'rounded-br'],
          'rounded-b': ['rounded-br', 'rounded-bl'],
          'rounded-l': ['rounded-tl', 'rounded-bl'],
          'border-spacing': ['border-spacing-x', 'border-spacing-y'],
          'border-w': [
            'border-w-x',
            'border-w-y',
            'border-w-s',
            'border-w-e',
            'border-w-t',
            'border-w-r',
            'border-w-b',
            'border-w-l',
          ],
          'border-w-x': ['border-w-r', 'border-w-l'],
          'border-w-y': ['border-w-t', 'border-w-b'],
          'border-color': [
            'border-color-x',
            'border-color-y',
            'border-color-s',
            'border-color-e',
            'border-color-t',
            'border-color-r',
            'border-color-b',
            'border-color-l',
          ],
          'border-color-x': ['border-color-r', 'border-color-l'],
          'border-color-y': ['border-color-t', 'border-color-b'],
          translate: ['translate-x', 'translate-y', 'translate-none'],
          'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
          'scroll-m': [
            'scroll-mx',
            'scroll-my',
            'scroll-ms',
            'scroll-me',
            'scroll-mt',
            'scroll-mr',
            'scroll-mb',
            'scroll-ml',
          ],
          'scroll-mx': ['scroll-mr', 'scroll-ml'],
          'scroll-my': ['scroll-mt', 'scroll-mb'],
          'scroll-p': [
            'scroll-px',
            'scroll-py',
            'scroll-ps',
            'scroll-pe',
            'scroll-pt',
            'scroll-pr',
            'scroll-pb',
            'scroll-pl',
          ],
          'scroll-px': ['scroll-pr', 'scroll-pl'],
          'scroll-py': ['scroll-pt', 'scroll-pb'],
          touch: ['touch-x', 'touch-y', 'touch-pz'],
          'touch-x': ['touch'],
          'touch-y': ['touch'],
          'touch-pz': ['touch'],
        },
        conflictingClassGroupModifiers: { 'font-size': ['leading'] },
        orderSensitiveModifiers: [
          '*',
          '**',
          'after',
          'backdrop',
          'before',
          'details-content',
          'file',
          'first-letter',
          'first-line',
          'marker',
          'placeholder',
          'selection',
        ],
      };
    });
  function Xe() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return Ye(H(e));
  }
  var Ze = W(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      {
        variants: {
          variant: {
            default: 'bg-brand-700 text-brand-50 shadow hover:bg-brand-800',
            destructive:
              'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline:
              'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: 'h-11 px-4 py-2',
            sm: 'h-10 rounded-md px-3 text-xs',
            lg: 'h-12 rounded-md px-8',
            icon: 'h-9 w-9',
          },
        },
        defaultVariants: { variant: 'default', size: 'default' },
      },
    ),
    Je = A.forwardRef(function (e, t) {
      var n = e.className,
        r = e.variant,
        l = e.size,
        a = e.asChild,
        i = void 0 !== a && a,
        u = P(e, ['className', 'variant', 'size', 'asChild']),
        s = i ? M : 'button';
      return o.jsx(s, N({ className: Xe(Ze({ variant: r, size: l, className: n })), ref: t }, u));
    });
  Je.displayName = 'Button';
  var et = A.forwardRef(function (e, t) {
    var n = e.className,
      r = e.type,
      l = e.suppressHydrationWarning,
      a = void 0 === l || l,
      i = P(e, ['className', 'type', 'suppressHydrationWarning']);
    return o.jsx(
      'input',
      N(
        {
          type: r,
          className: Xe(
            'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:cursor-not-allowed disabled:opacity-50',
            n,
          ),
          ref: t,
          suppressHydrationWarning: a,
        },
        i,
      ),
    );
  });
  (et.displayName = 'Input'), E();
  var tt = [
      'a',
      'button',
      'div',
      'form',
      'h2',
      'h3',
      'img',
      'input',
      'label',
      'li',
      'nav',
      'ol',
      'p',
      'select',
      'span',
      'svg',
      'ul',
    ].reduce((e, t) => {
      const n = D(`Primitive.${t}`),
        r = A.forwardRef((e, r) => {
          const { asChild: l, ...a } = e,
            i = l ? n : t;
          return (
            'undefined' != typeof window && (window[Symbol.for('radix-ui')] = !0),
            o.jsx(i, { ...a, ref: r })
          );
        });
      return (r.displayName = `Primitive.${t}`), { ...e, [t]: r };
    }, {}),
    nt = A.forwardRef((e, t) =>
      o.jsx(tt.label, {
        ...e,
        ref: t,
        onMouseDown: (t) => {
          t.target.closest('button, input, select, textarea') ||
            (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        },
      }),
    );
  nt.displayName = 'Label';
  var rt = nt,
    lt = W(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    ),
    at = A.forwardRef(function (e, t) {
      var n = e.className,
        r = P(e, ['className']);
      return o.jsx(rt, N({ ref: t, className: Xe(lt(), n) }, r));
    });
  at.displayName = rt.displayName;
  var ot = 0;
  var it = new Map(),
    ut = function (e) {
      if (!it.has(e)) {
        var t = setTimeout(function () {
          it.delete(e), ft({ type: 'REMOVE_TOAST', toastId: e });
        }, 1e6);
        it.set(e, t);
      }
    },
    st = function (e, t) {
      switch (t.type) {
        case 'ADD_TOAST':
          return N(N({}, e), { toasts: O([t.toast], e.toasts, !0).slice(0, 1) });
        case 'UPDATE_TOAST':
          return N(N({}, e), {
            toasts: e.toasts.map(function (e) {
              return e.id === t.toast.id ? N(N({}, e), t.toast) : e;
            }),
          });
        case 'DISMISS_TOAST':
          var n = t.toastId;
          return (
            n
              ? ut(n)
              : e.toasts.forEach(function (e) {
                  ut(e.id);
                }),
            N(N({}, e), {
              toasts: e.toasts.map(function (e) {
                return e.id === n || void 0 === n ? N(N({}, e), { open: !1 }) : e;
              }),
            })
          );
        case 'REMOVE_TOAST':
          return void 0 === t.toastId
            ? N(N({}, e), { toasts: [] })
            : N(N({}, e), {
                toasts: e.toasts.filter(function (e) {
                  return e.id !== t.toastId;
                }),
              });
        default:
          return e;
      }
    },
    ct = [],
    dt = { toasts: [] };
  function ft(e) {
    (dt = st(dt, e)),
      ct.forEach(function (e) {
        e(dt);
      });
  }
  function pt(e) {
    var t = P(e, []),
      n = (ot = (ot + 1) % Number.MAX_VALUE).toString(),
      r = function () {
        return ft({ type: 'DISMISS_TOAST', toastId: n });
      };
    return (
      ft({
        type: 'ADD_TOAST',
        toast: N(N({}, t), {
          id: n,
          open: !0,
          onOpenChange: function (e) {
            e || r();
          },
        }),
      }),
      {
        id: n,
        dismiss: r,
        update: function (e) {
          return ft({ type: 'UPDATE_TOAST', toast: N(N({}, e), { id: n }) });
        },
      }
    );
  }
  function mt() {
    var e = A.useState(dt),
      t = e[0],
      n = e[1];
    return (
      A.useEffect(
        function () {
          return (
            ct.push(n),
            function () {
              var e = ct.indexOf(n);
              e > -1 && ct.splice(e, 1);
            }
          );
        },
        [t],
      ),
      N(N({}, t), {
        toast: pt,
        dismiss: function (e) {
          return ft({ type: 'DISMISS_TOAST', toastId: e });
        },
      })
    );
  }
  function ht() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return Ye(H(e));
  }
  var gt,
    bt,
    yt,
    vt,
    wt,
    kt,
    St,
    xt,
    _t,
    Et = {
      'waitlist-widget': 'waitlist-widget-module_waitlist-widget__KZBrf',
      'waitlist-widget__form': 'waitlist-widget-module_waitlist-widget__form__kl5m9',
      'waitlist-widget--inline': 'waitlist-widget-module_waitlist-widget--inline__tW92d',
      'waitlist-widget__field': 'waitlist-widget-module_waitlist-widget__field__dVlqx',
      'waitlist-widget__label': 'waitlist-widget-module_waitlist-widget__label__GXWbA',
      'waitlist-widget--no-labels': 'waitlist-widget-module_waitlist-widget--no-labels__0-q61',
      'waitlist-widget__input': 'waitlist-widget-module_waitlist-widget__input__9azS9',
      'waitlist-widget__button': 'waitlist-widget-module_waitlist-widget__button__EN6Lu',
    };
  !(function (e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if ('undefined' != typeof document) {
      var r = document.head || document.getElementsByTagName('head')[0],
        l = document.createElement('style');
      (l.type = 'text/css'),
        'top' === n && r.firstChild ? r.insertBefore(l, r.firstChild) : r.appendChild(l),
        l.styleSheet ? (l.styleSheet.cssText = e) : l.appendChild(document.createTextNode(e));
    }
  })(
    '.waitlist-widget-module_waitlist-widget__KZBrf {\r\n  /* Base variables with fallbacks */\r\n  --button-bg: var(--brand-primary, #3b82f6);\r\n  --button-text: var(--text-on-primary, #ffffff);\r\n  --input-bg: var(--background-muted, rgba(0, 0, 0, 0.05));\r\n  --input-border: var(--border-color, rgba(0, 0, 0, 0.1));\r\n  --text-color: var(--text-primary, #1f2937);\r\n  --border-radius: var(--radius-md, 8px);\r\n  --font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\r\n\r\n  font-family: var(--font-family);\r\n  color: var(--text-color);\r\n  width: 100%;\r\n  background-color: var(--background, #ffffff);\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__form__kl5m9 {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget--inline__tW92d .waitlist-widget-module_waitlist-widget__form__kl5m9 {\r\n  flex-direction: row;\r\n  align-items: flex-end;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__field__dVlqx {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget--inline__tW92d .waitlist-widget-module_waitlist-widget__field__dVlqx {\r\n  flex: 1;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__label__GXWbA {\r\n  display: block;\r\n  margin-bottom: 0.5rem;\r\n  font-weight: 500;\r\n  font-size: 0.875rem;\r\n  color: var(--text-color);\r\n  opacity: 0.9;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget--no-labels__0-q61 .waitlist-widget-module_waitlist-widget__label__GXWbA {\r\n  display: none;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__input__9azS9 {\r\n  width: 100%;\r\n  background-color: var(--input-bg);\r\n  border: 1px solid var(--input-border);\r\n  border-radius: var(--border-radius);\r\n  padding: 0.75rem 1rem;\r\n  font-family: var(--font-family);\r\n  color: var(--text-color);\r\n  font-size: var(--text-sm, 0.9375rem);\r\n  transition: all 0.2s ease-in-out;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__input__9azS9:focus {\r\n  outline: none;\r\n  border-color: var(--button-bg);\r\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--button-bg) 25%, transparent);\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__button__EN6Lu {\r\n  background-color: var(--button-bg);\r\n  color: var(--button-text);\r\n  border: none;\r\n  border-radius: var(--border-radius);\r\n  padding: 0.75rem 1.5rem;\r\n  font-size: var(--text-base, 1rem);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s ease-in-out;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  font-family: inherit;\r\n  line-height: 1.5;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget--inline__tW92d .waitlist-widget-module_waitlist-widget__button__EN6Lu {\r\n  width: auto;\r\n  height: 42px;\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__button__EN6Lu:hover {\r\n  opacity: 0.9;\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__button__EN6Lu:active {\r\n  transform: translateY(0);\r\n}\r\n\r\n.waitlist-widget-module_waitlist-widget__button__EN6Lu:disabled {\r\n  opacity: 0.7;\r\n  cursor: not-allowed;\r\n  transform: none;\r\n}\r\n',
  );
  var Ct = document.currentScript;
  if (Ct) {
    var zt = function (e, t) {
        return Ct.getAttribute(e) || t;
      },
      Nt = null !== (gt = zt('data-waitlist-id', 'new')) && void 0 !== gt ? gt : 'new',
      Pt = zt('data-api-key', void 0),
      Tt = {
        buttonText: null !== (bt = zt('data-button-text', void 0)) && void 0 !== bt ? bt : void 0,
        buttonColor:
          null !== (yt = zt('data-primary-color', void 0)) && void 0 !== yt ? yt : void 0,
        buttonTextColor:
          null !== (vt = zt('data-button-text-color', void 0)) && void 0 !== vt ? vt : void 0,
        backgroundColor:
          null !== (wt = zt('data-background-color', void 0)) && void 0 !== wt ? wt : void 0,
        textColor: null !== (kt = zt('data-text-color', void 0)) && void 0 !== kt ? kt : void 0,
        borderRadius:
          'md' === zt('data-button-rounded', void 0)
            ? 8
            : 'lg' === zt('data-button-rounded', void 0)
              ? 16
              : void 0,
        fontFamily: null !== (St = zt('data-font-family', void 0)) && void 0 !== St ? St : void 0,
        showLabels: 'true' === zt('data-show-labels', 'true'),
        formLayout:
          null !== (xt = zt('data-form-layout', 'stacked')) && void 0 !== xt ? xt : void 0,
      };
    Object.keys(Tt).forEach(function (e) {
      var t = e;
      void 0 === Tt[t] && delete Tt[t];
    });
    var Lt = document.createElement('div');
    (Lt.id = 'waitlist-widget-container-'.concat(Nt)),
      null === (_t = Ct.parentNode) || void 0 === _t || _t.insertBefore(Lt, Ct.nextSibling);
    var Ot = Ct.getAttribute('data-plan') || 'free',
      At = Ct.getAttribute('data-show-branding'),
      Rt = !['Starter', 'Growth', 'Pro'].includes(Ot) || 'false' !== At;
    z.createRoot(Lt).render(
      o.jsx(
        function (e) {
          var t = this,
            n = e.waitlistId,
            r = e.style,
            l = void 0 === r ? {} : r,
            a = e.apiKey,
            i = e.showBranding,
            u = void 0 === i || i,
            s = e.className,
            c = void 0 === s ? '' : s,
            d = A.useState(''),
            f = d[0],
            p = d[1],
            m = A.useState(''),
            h = m[0],
            g = m[1],
            b = A.useState(!1),
            y = b[0],
            v = b[1],
            w = mt().toast,
            k = l || {},
            S = k.buttonText,
            x = void 0 === S ? 'Join Waitlist' : S,
            _ = k.buttonColor,
            E = void 0 === _ ? '' : _,
            C = k.buttonTextColor,
            z = void 0 === C ? '' : C,
            P = k.backgroundColor,
            O = void 0 === P ? '' : P,
            R = k.textColor,
            D = void 0 === R ? '' : R,
            M = k.borderRadius,
            F = void 0 === M ? 8 : M,
            I = k.fontFamily,
            j = void 0 === I ? '' : I,
            U = k.showLabels,
            H = void 0 === U || U,
            $ = k.formLayout,
            V = void 0 === $ ? 'stacked' : $,
            W = N(
              N(
                N(
                  N(
                    N(N({}, E && { '--button-bg': E }), z && { '--button-text': z }),
                    D && { '--text-color': D },
                  ),
                  O && { '--bg-color': O },
                ),
                j && { '--font-family': j },
              ),
              F && { '--border-radius': ''.concat(F, 'px') },
            );
          return o.jsxs('div', {
            className: ht(
              Et['waitlist-widget'],
              'inline' === V ? Et['waitlist-widget--inline'] : Et['waitlist-widget--stacked'],
              !H && Et['waitlist-widget--no-labels'],
              c,
            ),
            style: W,
            children: [
              o.jsxs('form', {
                onSubmit: function (e) {
                  return T(t, void 0, void 0, function () {
                    var t, r, l;
                    return L(this, function (o) {
                      switch (o.label) {
                        case 0:
                          if ((e.preventDefault(), !f))
                            return (
                              w({
                                title: 'Error',
                                description: 'Email is required',
                                variant: 'destructive',
                              }),
                              [2]
                            );
                          v(!0), console.log('Widget API Key:', a), (o.label = 1);
                        case 1:
                          return (
                            o.trys.push([1, 4, 5, 6]),
                            [
                              4,
                              fetch('/api/waitlists/'.concat(n, '/subscribers'), {
                                method: 'POST',
                                headers: N(
                                  { 'Content-Type': 'application/json' },
                                  a ? { Authorization: 'Bearer '.concat(a) } : {},
                                ),
                                body: JSON.stringify({ email: f, name: h }),
                              }),
                            ]
                          );
                        case 2:
                          return [4, (t = o.sent()).json()];
                        case 3:
                          if (((r = o.sent()), !t.ok))
                            throw new Error(r.message || 'Failed to join waitlist');
                          return (
                            w({
                              title: 'Success!',
                              description: 'You have been added to the waitlist',
                            }),
                            p(''),
                            g(''),
                            [3, 6]
                          );
                        case 4:
                          return (
                            (l = o.sent()),
                            w({
                              title: 'Error',
                              description:
                                l instanceof Error ? l.message : 'Failed to join waitlist',
                              variant: 'destructive',
                            }),
                            [3, 6]
                          );
                        case 5:
                          return v(!1), [7];
                        case 6:
                          return [2];
                      }
                    });
                  });
                },
                className: Et['waitlist-widget__form'],
                children: [
                  o.jsxs('div', {
                    className: Et['waitlist-widget__field'],
                    children: [
                      H &&
                        o.jsx(at, {
                          htmlFor: 'name',
                          className: Et['waitlist-widget__label'],
                          children: 'Name (Optional)',
                        }),
                      o.jsx(et, {
                        id: 'name',
                        type: 'text',
                        placeholder: 'Your name',
                        value: h,
                        onChange: function (e) {
                          return g(e.target.value);
                        },
                        disabled: y,
                        className: Et['waitlist-widget__input'],
                      }),
                    ],
                  }),
                  o.jsxs('div', {
                    className: Et['waitlist-widget__field'],
                    children: [
                      H &&
                        o.jsx(at, {
                          htmlFor: 'email',
                          className: Et['waitlist-widget__label'],
                          children: 'Email *',
                        }),
                      o.jsx(et, {
                        id: 'email',
                        type: 'email',
                        placeholder: 'your@email.com',
                        value: f,
                        onChange: function (e) {
                          return p(e.target.value);
                        },
                        required: !0,
                        disabled: y,
                        className: Et['waitlist-widget__input'],
                      }),
                    ],
                  }),
                  o.jsx(Je, {
                    type: 'submit',
                    disabled: y,
                    className: Et['waitlist-widget__button'],
                    children: y ? 'Joining...' : x,
                  }),
                ],
              }),
              u &&
                o.jsx('div', {
                  style: { color: 'red', fontWeight: 'bold', fontSize: 20 },
                  children: 'Powered by WaitlistNow',
                }),
            ],
          });
        },
        { waitlistId: Nt, style: Tt, apiKey: Pt, showBranding: Rt },
      ),
    );
  }
})();
//# sourceMappingURL=widget.js.map
