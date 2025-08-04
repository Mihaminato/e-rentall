import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getResponseStatus, getQuery as getQuery$1, readBody, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, getRouterParam, getResponseStatusText } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/@vue/shared/dist/shared.cjs.js';
import { isVNode, defineComponent, createBlock, openBlock, unref, withCtx, createVNode, createTextVNode, createElementVNode, toDisplayString, createCommentVNode, createElementBlock, toValue, isRef } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/vue/index.mjs';
import { Html, Head, Body, Container, Heading, Text, Section, Button } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/@vue-email/components/dist/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/destr/dist/index.mjs';
import { createDebugger, createHooks } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unstorage/drivers/fs.mjs';
import { digest, hash as hash$1 } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/nitropack/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, basename, isAbsolute } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/pathe/dist/index.mjs';
import { getIcons } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/@iconify/utils/lib/index.mjs';
import { collections } from 'file:///media/prince/Donner/Prince/e-rentall/.nuxt/nuxt-icon-server-bundle.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/unhead/dist/utils.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/ipx/dist/index.mjs';
import devalue from 'file:///media/prince/Donner/Prince/e-rentall/node_modules/@nuxt/devalue/dist/devalue.mjs';

const serverAssets = [{"baseName":"server","dir":"/media/prince/Donner/Prince/e-rentall/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/media/prince/Donner/Prince/e-rentall","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/media/prince/Donner/Prince/e-rentall/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/media/prince/Donner/Prince/e-rentall/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/media/prince/Donner/Prince/e-rentall/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/media/prince/Donner/Prince/e-rentall/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/": {
        "ssr": true,
        "prerender": true
      },
      "/how-it-works": {
        "ssr": true,
        "prerender": true
      },
      "/terms": {
        "ssr": true,
        "prerender": true
      },
      "/privacy": {
        "ssr": true,
        "prerender": true
      },
      "/contact": {
        "ssr": true,
        "prerender": true
      },
      "/about": {
        "ssr": true,
        "prerender": true
      },
      "/vehicles": {
        "ssr": false
      },
      "/vehicles/**": {
        "ssr": false
      },
      "/users/**": {
        "ssr": true,
        "prerender": false
      },
      "/admin/**": {
        "ssr": false
      },
      "/profile/**": {
        "ssr": false
      },
      "/vehicles/my-vehicles": {
        "ssr": false
      },
      "/bookings/**": {
        "ssr": false
      },
      "/messages/**": {
        "ssr": false
      },
      "/auth/**": {
        "ssr": false
      },
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
      },
      "/_scripts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        },
        "cache": {
          "maxAge": 31536000
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "appName": "location-voitures-madagascar",
    "supabaseUrl": "https://runfbuvqkjpmjxquioyh.supabase.co",
    "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bmZidXZxa2pwbWp4cXVpb3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUxNjksImV4cCI6MjA2NjMzMTE2OX0.HKm5nzil4c2WjzpAaCNCWG4JVut6XNjZ-0J9xLoXhms",
    "nuxt-scripts": {
      "version": "0.11.8",
      "defaultScriptOptions": {
        "trigger": "onNuxtReady"
      }
    },
    "piniaPluginPersistedstate": {}
  },
  "mail": {
    "smtp": {
      "host": "live.smtp.mailtrap.io",
      "port": 587,
      "auth": {
        "user": "smtp@mailtrap.io",
        "pass": "b8c754b53e00f3d6fca9a8e66cff9010"
      }
    }
  },
  "mailFromAddress": "prince.julien@aivi-shop.com",
  "icon": {
    "serverKnownCssClasses": []
  },
  "nuxt-scripts": {
    "version": "0.11.8"
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": [
        "/media/prince/Donner/Prince/e-rentall/public"
      ]
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _p2oTIwAM0JrF8gkaF_Udbg2zrlPVJvvJEfCDs0690qA = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/media/prince/Donner/Prince/e-rentall";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Location de voitures entre particuliers à Madagascar"},{"name":"theme-color","content":"#3B82F6"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _k5qVIWx94vjPYqDqWvXvVsmr0HDKJS2scd3BA9hL7U = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

function defineNitroPlugin(def) {
  return def;
}

const __wnXabhxz2BlzHJRB0RxwWohkZEVWNUo6QNbpeo7QRE = defineNitroPlugin((nitro) => {
  createDebugger(nitro.hooks, { tag: "nitro-runtime" });
});

const plugins = [
  _p2oTIwAM0JrF8gkaF_Udbg2zrlPVJvvJEfCDs0690qA,
_k5qVIWx94vjPYqDqWvXvVsmr0HDKJS2scd3BA9hL7U,
__wnXabhxz2BlzHJRB0RxwWohkZEVWNUo6QNbpeo7QRE
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_scripts/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _NKQkp7 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "BookingApprovedAdmin",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " [ADMIN] Demande accept\xE9e par le propri\xE9taire ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(
                        " Bonjour Admin, ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [1]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[2] || (_cache[2] = createTextVNode(
                        " Le propri\xE9taire a accept\xE9 la demande de r\xE9servation pour le v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[4] || (_cache[4] = createTextVNode(
                        ". ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [2, 3, 4]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#d4edda", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #28a745" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation accept\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Demandeur : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Propri\xE9taire : " + toDisplayString(_ctx.ownerName) + " (" + toDisplayString(_ctx.ownerEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Prix total : " + toDisplayString(formatPrice(_ctx.totalPrice)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Acompte demand\xE9 : " + toDisplayString(formatPrice(_ctx.depositAmount)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " \u2022 Statut : En attente de paiement acompte ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(
                        " La r\xE9servation est maintenant en attente du paiement de l'acompte par le locataire. Une fois l'acompte r\xE9gl\xE9, vous devrez confirmer d\xE9finitivement la r\xE9servation. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [7]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(
                            " Voir la r\xE9servation ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[9] || (_cache[9] = [
                      createTextVNode(
                        " Syst\xE8me VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [9]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "BookingApprovedRenter",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Demande accept\xE9e - R\xE9gler l'acompte ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  _ctx.reservationId ? (openBlock(), createBlock(unref(Text), {
                    key: 0,
                    style: { "color": "#666", "font-size": "16px", "line-height": "1.6" }
                  }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Excellente nouvelle ! Votre demande ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        "#" + toDisplayString(_ctx.reservationId.slice(0, 8)),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        " a \xE9t\xE9 accept\xE9e par le propri\xE9taire. Merci de r\xE9gler l'acompte pour confirmer la r\xE9servation. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2]
                  })) : (openBlock(), createBlock(unref(Text), {
                    key: 1,
                    style: { "color": "#666", "font-size": "16px", "line-height": "1.6" }
                  }, {
                    default: withCtx(() => _cache[3] || (_cache[3] = [
                      createTextVNode(
                        " Excellente nouvelle ! Votre demande a \xE9t\xE9 accept\xE9e par le propri\xE9taire. Merci de r\xE9gler l'acompte pour confirmer la r\xE9servation. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [3]
                  })),
                  createVNode(unref(Section), { style: { "background-color": "#d4edda", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #28a745" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation accept\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Prix total : " + toDisplayString(formatPrice(_ctx.totalPrice)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f8f9fa", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border": "2px solid #007bff" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333", "text-align": "center" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createElementVNode(
                            "strong",
                            null,
                            "Montant de l'acompte \xE0 r\xE9gler :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#007bff", "font-size": "24px", "font-weight": "bold", "text-align": "center" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(formatPrice(_ctx.depositAmount)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666", "text-align": "center", "font-size": "14px" } }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " (50% du montant total) ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(
                        " Pour finaliser votre r\xE9servation, veuillez vous connecter \xE0 votre espace et proc\xE9der au paiement de l'acompte. Une fois l'acompte r\xE9gl\xE9, votre r\xE9servation sera d\xE9finitivement confirm\xE9e. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [7]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#28a745", "color": "white", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(
                            " Payer l'acompte maintenant ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[9] || (_cache[9] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [9]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "BookingConfirmedAdmin",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " [ADMIN] Acompte r\xE9gl\xE9 - R\xE9servation confirm\xE9e ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(
                        " Bonjour Admin, ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [1]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[2] || (_cache[2] = createTextVNode(
                        " L'acompte pour la r\xE9servation du v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[4] || (_cache[4] = createTextVNode(
                        " a \xE9t\xE9 r\xE9gl\xE9. La r\xE9servation est maintenant confirm\xE9e. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [2, 3, 4]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#d1ecf1", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #17a2b8" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation confirm\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Demandeur : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Propri\xE9taire : " + toDisplayString(_ctx.ownerName) + " (" + toDisplayString(_ctx.ownerEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Prix total : " + toDisplayString(formatPrice(_ctx.totalPrice)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Acompte r\xE9gl\xE9 : " + toDisplayString(formatPrice(_ctx.depositAmount)) + " \u2705 ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 R\xE9f\xE9rence paiement : " + toDisplayString(_ctx.paymentReference),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " \u2022 Statut : Confirm\xE9e et active ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createElementVNode(
                            "strong",
                            null,
                            "Actions automatiques effectu\xE9es :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [7]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(
                            " \u2022 Email de confirmation envoy\xE9 au locataire ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(
                            " \u2022 Email de confirmation envoy\xE9 au propri\xE9taire ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [9]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[10] || (_cache[10] = [
                          createTextVNode(
                            " Consulter la r\xE9servation ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [10]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(
                        " Syst\xE8me VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [11]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "BookingConfirmedOwner",
  props: {
    reservationId: { type: String, required: true },
    ownerName: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " R\xE9servation confirm\xE9e pour votre v\xE9hicule ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.ownerName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Excellente nouvelle ! La r\xE9servation pour votre v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        " est confirm\xE9e. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#d4edda", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #28a745" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation confirm\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      _ctx.reservationId ? (openBlock(), createBlock(unref(Text), {
                        key: 0,
                        style: { "margin": "10px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : #" + toDisplayString(_ctx.reservationId.slice(0, 8)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })) : (openBlock(), createBlock(unref(Text), {
                        key: 1,
                        style: { "margin": "10px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : N/A ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      })),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Locataire : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Prix total : " + toDisplayString(formatPrice(_ctx.totalPrice)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Acompte re\xE7u : " + toDisplayString(formatPrice(_ctx.depositAmount)) + " \u2705 ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 R\xE9f\xE9rence paiement : " + toDisplayString(_ctx.paymentReference),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#e3f2fd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #2196f3" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createElementVNode(
                            "strong",
                            null,
                            "Prochaines \xE9tapes :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode(
                            " \u2022 Pr\xE9parez votre v\xE9hicule pour la location ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [7]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(
                            " \u2022 Contactez le locataire pour organiser la remise du v\xE9hicule ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(
                            " \u2022 Vous recevrez les documents contractuels par email sous peu ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [9]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[10] || (_cache[10] = [
                          createTextVNode(
                            " \u2022 Le solde sera r\xE9gl\xE9 \xE0 la fin de la location ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [10]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(
                        " F\xE9licitations pour cette nouvelle location ! Le syst\xE8me vous notifiera de toute mise \xE0 jour concernant cette r\xE9servation. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [11]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#2563eb", "color": "white", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[12] || (_cache[12] = [
                          createTextVNode(
                            " Voir la r\xE9servation ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [12]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[13] || (_cache[13] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "BookingConfirmedRenter",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " \u{1F389} R\xE9servation confirm\xE9e ! ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Excellente nouvelle ! Votre r\xE9servation pour le v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        " est confirm\xE9e. Merci pour votre confiance ! ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#d1ecf1", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #17a2b8" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de votre r\xE9servation confirm\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      _ctx.reservationId ? (openBlock(), createBlock(unref(Text), {
                        key: 0,
                        style: { "margin": "10px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : #" + toDisplayString(_ctx.reservationId.slice(0, 8)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })) : (openBlock(), createBlock(unref(Text), {
                        key: 1,
                        style: { "margin": "10px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : N/A ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      })),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Prix total : " + toDisplayString(formatPrice(_ctx.totalPrice)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Acompte r\xE9gl\xE9 : " + toDisplayString(formatPrice(_ctx.depositAmount)) + " \u2705 ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 R\xE9f\xE9rence paiement : " + toDisplayString(_ctx.paymentReference),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createElementVNode(
                            "strong",
                            null,
                            "Prochaines \xE9tapes :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode(
                            " \u2022 Vous recevrez sous peu les documents de location par email ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [7]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode(
                            " \u2022 Le propri\xE9taire vous contactera pour organiser la remise du v\xE9hicule ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(
                            " \u2022 Conservez cette confirmation pour vos records ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [9]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode(
                        " Nous vous souhaitons un excellent voyage ! En cas de questions, n'h\xE9sitez pas \xE0 nous contacter ou \xE0 consulter votre espace personnel. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [10]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#28a745", "color": "white", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
                          createTextVNode(
                            " Voir ma r\xE9servation ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [11]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "BookingRejectedRenter",
  props: {
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Demande de r\xE9servation refus\xE9e ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Nous sommes d\xE9sol\xE9s de vous informer que votre demande de r\xE9servation du v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        " a \xE9t\xE9 refus\xE9e par le propri\xE9taire. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f8d7da", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #dc3545" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la demande refus\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createTextVNode(
                            " \u2022 Statut : Refus\xE9e ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(
                        " Ne vous d\xE9couragez pas ! De nombreux autres v\xE9hicules sont disponibles sur notre plateforme. Nous vous encourageons \xE0 explorer d'autres options qui pourraient correspondre \xE0 vos besoins. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [6]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/vehicles`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode(
                            " Rechercher d'autres v\xE9hicules ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [7]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [8]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CancellationConfirmationForRenter",
  props: {
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    appUrl: { type: String, required: true },
    cancellationReason: { type: String, required: false }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Confirmation d'Annulation ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Nous vous confirmons que votre demande d'annulation pour la r\xE9servation du v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        " a bien \xE9t\xE9 enregistr\xE9e. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#e2e8f0", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #4a5568" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation annul\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [3]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      _ctx.cancellationReason ? (openBlock(), createBlock(unref(Text), {
                        key: 0,
                        style: { "margin": "5px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Raison fournie : " + toDisplayString(_ctx.cancellationReason),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode(
                            " \u2022 Statut : Annul\xE9e ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(
                        " Nous esp\xE9rons vous revoir bient\xF4t sur notre plateforme. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [5]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/vehicles`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " Trouver un autre v\xE9hicule ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe Vaika Malaky ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [7]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CancellationNotificationForAdmin",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    appUrl: { type: String, required: true },
    cancelledBy: { type: String, required: true },
    cancellationReason: { type: String, required: false }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " [ADMIN] Annulation de R\xE9servation ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(
                        " Bonjour Admin, ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [1]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(
                        " Une r\xE9servation a \xE9t\xE9 annul\xE9e. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [2]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f8d7da", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #dc3545" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de l'annulation :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [3]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[4] || (_cache[4] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[5] || (_cache[5] = createElementVNode(
                            "strong",
                            null,
                            "Annul\xE9e par :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.cancelledBy),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [4, 5]
                      }),
                      _ctx.cancellationReason ? (openBlock(), createBlock(unref(Text), {
                        key: 0,
                        style: { "margin": "5px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => [
                          _cache[6] || (_cache[6] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[7] || (_cache[7] = createElementVNode(
                            "strong",
                            null,
                            "Raison :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.cancellationReason),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [6, 7]
                      })) : createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f1f1f1", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #6c757d" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation concern\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Demandeur : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Propri\xE9taire : " + toDisplayString(_ctx.ownerName) + " (" + toDisplayString(_ctx.ownerEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(
                            " \u2022 Statut : Annul\xE9e ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [9]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Date d'annulation : " + toDisplayString(formatDate(_ctx.createdAt)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode(
                        " Les parties concern\xE9es (locataire et propri\xE9taire) ont \xE9t\xE9 notifi\xE9es. Aucune action suppl\xE9mentaire n'est requise de votre part, sauf si un suivi est n\xE9cessaire. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [10]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/admin/bookings`,
                        style: { "background-color": "#6c757d", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
                          createTextVNode(
                            " Voir la r\xE9servation dans l'admin ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [11]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(
                        " Syst\xE8me Vaika Malaky ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CancellationNotificationForOwner",
  props: {
    reservationId: { type: String, required: true },
    ownerName: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    appUrl: { type: String, required: true },
    cancelledBy: { type: String, required: true },
    cancellationReason: { type: String, required: false }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Annulation de R\xE9servation ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.ownerName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Une r\xE9servation pour votre v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        " a \xE9t\xE9 annul\xE9e. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de l'annulation :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [3]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[4] || (_cache[4] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[5] || (_cache[5] = createElementVNode(
                            "strong",
                            null,
                            "Annul\xE9e par :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.cancelledBy),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [4, 5]
                      }),
                      _ctx.cancellationReason ? (openBlock(), createBlock(unref(Text), {
                        key: 0,
                        style: { "margin": "5px 0 0 0", "color": "#666" }
                      }, {
                        default: withCtx(() => [
                          _cache[6] || (_cache[6] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[7] || (_cache[7] = createElementVNode(
                            "strong",
                            null,
                            "Raison fournie :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.cancellationReason),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [6, 7]
                      })) : createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f1f1f1", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #6c757d" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation concern\xE9e :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Locataire : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[9] || (_cache[9] = [
                          createTextVNode(
                            " \u2022 Statut : Annul\xE9e ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [9]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[10] || (_cache[10] = [
                      createTextVNode(
                        " Votre calendrier de disponibilit\xE9 pour ce v\xE9hicule a \xE9t\xE9 mis \xE0 jour en cons\xE9quence. Aucune action suppl\xE9mentaire n'est requise de votre part. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [10]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/requests`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
                          createTextVNode(
                            " Voir mes demandes ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [11]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe Vaika Malaky ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [12]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ReservationNotificationAdmin",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " [ADMIN] Nouvelle r\xE9servation cr\xE9\xE9e ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(
                        " Bonjour Admin, ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [1]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[2] || (_cache[2] = createTextVNode(
                        " Nouvelle demande de r\xE9servation en attente pour ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[4] || (_cache[4] = createTextVNode(
                        ". La demande a bien \xE9t\xE9 envoy\xE9e et est en cours de traitement. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [2, 3, 4]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails complets :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 ID R\xE9servation : " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Demandeur : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Propri\xE9taire : " + toDisplayString(_ctx.ownerName) + " (" + toDisplayString(_ctx.ownerEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Statut : " + toDisplayString(_ctx.status),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Date de cr\xE9ation : " + toDisplayString(formatDate(_ctx.createdAt)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " Voir la demande ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(
                        " Syst\xE8me VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [7]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReservationNotificationOwner",
  props: {
    ownerName: { type: String, required: true },
    renterName: { type: String, required: true },
    renterEmail: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    createdAt: { type: Date, required: true },
    reservationId: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Nouvelle demande de r\xE9servation ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.ownerName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Une nouvelle demande de r\xE9servation est en attente pour votre v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(
                        ", du " + toDisplayString(formatDate(_ctx.startDate)) + " au " + toDisplayString(formatDate(_ctx.endDate)) + " vers la destination ",
                        1
                        /* TEXT */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.destination),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ". Merci de la traiter. ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#e3f2fd", "padding": "20px", "border-radius": "6px", "margin": "20px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la demande :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Demandeur : " + toDisplayString(_ctx.renterName) + " (" + toDisplayString(_ctx.renterEmail) + ") ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Date de demande : " + toDisplayString(formatDate(_ctx.createdAt)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(
                        " Veuillez vous connecter \xE0 votre espace pour accepter ou refuser cette demande de r\xE9servation. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [5]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#2563eb", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode(
                            " Traiter cette demande ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [6]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [7]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ReservationPendingClient",
  props: {
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleLicensePlate: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destination: { type: String, required: true },
    reservationId: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Demande de r\xE9servation re\xE7ue ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Nous avons bien re\xE7u votre demande de r\xE9servation pour le v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        ", matricule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleLicensePlate),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ". ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#f8f9fa", "padding": "20px", "border-radius": "6px", "margin": "20px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails de la r\xE9servation :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 V\xE9hicule : " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Matricule : " + toDisplayString(_ctx.vehicleLicensePlate),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 P\xE9riode : " + toDisplayString(formatDate(_ctx.startDate)) + " - " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " \u2022 Destination : " + toDisplayString(_ctx.destination),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createTextVNode(
                            " \u2022 Statut : En attente de confirmation ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [5]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(
                        " Votre demande est actuellement ",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "strong",
                        null,
                        "en cours de traitement",
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        ". Le propri\xE9taire du v\xE9hicule va examiner votre demande et vous recevrez une notification d\xE8s qu'une d\xE9cision sera prise. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [6]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode(
                            " Suivre ma demande ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [7]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[8] || (_cache[8] = [
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [8]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DepositAwaitingValidationAdmin",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    depositAmount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    appUrl: { type: String, required: true }
  },
  setup(__props) {
    const formatPrice = (price) => {
      return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " [ACTION REQUISE] V\xE9rification d'acompte ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(
                        "Bonjour Administrateur,",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [1]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(
                        " Un paiement d'acompte a \xE9t\xE9 soumis par un locataire et n\xE9cessite votre ",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "strong",
                        { style: { "color": "#c0392b" } },
                        "v\xE9rification manuelle",
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " avant la confirmation finale de la r\xE9servation. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [2]
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333", "font-size": "18px" } }, {
                        default: withCtx(() => _cache[3] || (_cache[3] = [
                          createElementVNode(
                            "strong",
                            null,
                            "D\xE9tails \xE0 v\xE9rifier :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [3]
                      }),
                      createVNode(unref(Text), { style: { "margin": "15px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[4] || (_cache[4] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[5] || (_cache[5] = createElementVNode(
                            "strong",
                            null,
                            "ID R\xE9servation :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.reservationId),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [4, 5]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[6] || (_cache[6] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[7] || (_cache[7] = createElementVNode(
                            "strong",
                            null,
                            "Locataire :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.renterName),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [6, 7]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[8] || (_cache[8] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[9] || (_cache[9] = createElementVNode(
                            "strong",
                            null,
                            "V\xE9hicule :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.vehicleName) + " " + toDisplayString(_ctx.vehicleModel),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [8, 9]
                      }),
                      createVNode(unref(Text), { style: { "margin": "5px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[10] || (_cache[10] = createTextVNode(
                            " \u2022 ",
                            -1
                            /* CACHED */
                          )),
                          _cache[11] || (_cache[11] = createElementVNode(
                            "strong",
                            null,
                            "Montant de l'acompte :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(formatPrice(_ctx.depositAmount)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1,
                        __: [10, 11]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#c0392b", "font-weight": "bold", "background-color": "#fbeee6", "padding": "8px", "border-radius": "4px" } }, {
                        default: withCtx(() => [
                          createTextVNode(
                            " R\xE9f\xE9rence de paiement : " + toDisplayString(_ctx.paymentReference),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "text-align": "center" } }, {
                    default: withCtx(() => _cache[12] || (_cache[12] = [
                      createTextVNode(
                        " Veuillez vous assurer que le paiement a bien \xE9t\xE9 re\xE7u sur le compte avant de cliquer sur le bouton ci-dessous. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [12]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#007bff", "color": "white", "padding": "12px 24px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500" }
                      }, {
                        default: withCtx(() => _cache[13] || (_cache[13] = [
                          createTextVNode(
                            " Voir la r\xE9servation et confirmer ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [13]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[14] || (_cache[14] = [
                      createTextVNode(
                        " Syst\xE8me VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [14]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _hoisted_1$1 = { style: { "list-style-type": "none", "padding-left": "0", "color": "#666", "font-size": "16px" } };
const _hoisted_2$1 = { style: { "margin-bottom": "8px" } };
const _hoisted_3$1 = { style: { "margin-bottom": "8px" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentReferenceRequest",
  props: {
    reservationId: { type: String, required: true },
    renterName: { type: String, required: true },
    vehicleName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    appUrl: { type: String, required: true },
    paymentReference: { type: String, required: true }
  },
  setup(__props) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Html), null, {
        default: withCtx(() => [
          createVNode(unref(Head)),
          createVNode(unref(Body), { style: { "font-family": "Arial, sans-serif", "margin": "0", "padding": "20px", "background-color": "#f5f5f5" } }, {
            default: withCtx(() => [
              createVNode(unref(Container), { style: { "max-width": "600px", "margin": "0 auto", "background-color": "white", "padding": "20px", "border-radius": "8px" } }, {
                default: withCtx(() => [
                  createVNode(unref(Heading), { style: { "color": "#333", "text-align": "center", "margin-bottom": "30px" } }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(
                        " Action requise : R\xE9f\xE9rence de paiement incorrecte ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [0]
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Bonjour " + toDisplayString(_ctx.renterName) + ", ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => [
                      _cache[1] || (_cache[1] = createTextVNode(
                        " Nous vous contactons concernant votre r\xE9servation ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        "#" + toDisplayString(_ctx.reservationId.slice(0, 8)),
                        1
                        /* TEXT */
                      ),
                      _cache[2] || (_cache[2] = createTextVNode(
                        " pour le v\xE9hicule ",
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "strong",
                        null,
                        toDisplayString(_ctx.vehicleName),
                        1
                        /* TEXT */
                      ),
                      _cache[3] || (_cache[3] = createTextVNode(
                        ". ",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    _: 1,
                    __: [1, 2, 3]
                  }),
                  createVNode(unref(Section), { style: { "border": "1px solid #eee", "border-radius": "6px", "padding": "20px", "margin": "20px 0", "background-color": "#fafafa" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "font-size": "18px", "font-weight": "500", "color": "#333", "margin-top": "0" } }, {
                        default: withCtx(() => _cache[4] || (_cache[4] = [
                          createTextVNode(
                            " D\xE9tails de la r\xE9servation : ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [4]
                      }),
                      createElementVNode("ul", _hoisted_1$1, [
                        createElementVNode("li", _hoisted_2$1, [
                          _cache[5] || (_cache[5] = createElementVNode(
                            "strong",
                            null,
                            "Date de d\xE9but :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(formatDate(_ctx.startDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        createElementVNode("li", _hoisted_3$1, [
                          _cache[6] || (_cache[6] = createElementVNode(
                            "strong",
                            null,
                            "Date de fin :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(formatDate(_ctx.endDate)),
                            1
                            /* TEXT */
                          )
                        ]),
                        createElementVNode("li", null, [
                          _cache[7] || (_cache[7] = createElementVNode(
                            "strong",
                            null,
                            "Prix total :",
                            -1
                            /* CACHED */
                          )),
                          createTextVNode(
                            " " + toDisplayString(_ctx.totalPrice) + " \u20AC",
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Section), { style: { "background-color": "#fff3cd", "padding": "20px", "border-radius": "6px", "margin": "20px 0", "border-left": "4px solid #ffc107" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Text), { style: { "margin": "0", "color": "#333" } }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createElementVNode(
                            "strong",
                            null,
                            "Une action de votre part est n\xE9cessaire :",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [8]
                      }),
                      createVNode(unref(Text), { style: { "margin": "10px 0 0 0", "color": "#666" } }, {
                        default: withCtx(() => [
                          _cache[9] || (_cache[9] = createTextVNode(
                            ` L'administrateur a examin\xE9 votre soumission de paiement et a constat\xE9 que la r\xE9f\xE9rence fournie ("`,
                            -1
                            /* CACHED */
                          )),
                          createElementVNode(
                            "strong",
                            null,
                            toDisplayString(_ctx.paymentReference),
                            1
                            /* TEXT */
                          ),
                          _cache[10] || (_cache[10] = createTextVNode(
                            '") semble incorrecte. Pour finaliser votre r\xE9servation, veuillez soumettre une nouvelle r\xE9f\xE9rence de paiement valide. ',
                            -1
                            /* CACHED */
                          ))
                        ]),
                        _: 1,
                        __: [9, 10]
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6" } }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(
                        " Vous pouvez le faire en cliquant sur le bouton ci-dessous. Cela vous redirigera vers la page de votre r\xE9servation o\xF9 vous pourrez saisir la nouvelle r\xE9f\xE9rence. ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [11]
                  }),
                  createVNode(unref(Section), { style: { "text-align": "center", "margin": "30px 0" } }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        href: `${_ctx.appUrl}/bookings/${_ctx.reservationId}`,
                        style: { "background-color": "#ffc107", "color": "#212529", "padding": "15px 30px", "text-decoration": "none", "border-radius": "6px", "display": "inline-block", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => _cache[12] || (_cache[12] = [
                          createTextVNode(
                            " Soumettre une nouvelle r\xE9f\xE9rence ",
                            -1
                            /* CACHED */
                          )
                        ])),
                        _: 1,
                        __: [12]
                      }, 8, ["href"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Text), { style: { "color": "#666", "font-size": "16px", "line-height": "1.6", "margin-top": "30px" } }, {
                    default: withCtx(() => _cache[13] || (_cache[13] = [
                      createTextVNode(
                        " Si vous avez des questions, n'h\xE9sitez pas \xE0 nous contacter. ",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " Cordialement,",
                        -1
                        /* CACHED */
                      ),
                      createElementVNode(
                        "br",
                        null,
                        null,
                        -1
                        /* CACHED */
                      ),
                      createTextVNode(
                        " L'\xE9quipe VehicleRental ",
                        -1
                        /* CACHED */
                      )
                    ])),
                    _: 1,
                    __: [13]
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});

const _hoisted_1 = { style: { "font-family": "Arial, sans-serif", "max-width": "600px", "margin": "0 auto", "padding": "20px", "background-color": "#f8f9fa" } };
const _hoisted_2 = { style: { "background": "white", "padding": "30px", "border-radius": "0 0 10px 10px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" } };
const _hoisted_3 = { style: { "margin-bottom": "25px" } };
const _hoisted_4 = { style: { "background": "#f8f9fa", "padding": "15px", "border-radius": "8px", "border-left": "4px solid #58c7bf" } };
const _hoisted_5 = { style: { "margin": "5px 0", "color": "#555" } };
const _hoisted_6 = { style: { "margin": "5px 0", "color": "#555" } };
const _hoisted_7 = { style: { "margin": "5px 0", "color": "#555" } };
const _hoisted_8 = { style: { "margin-bottom": "25px" } };
const _hoisted_9 = { style: { "background": "#e8f5e8", "padding": "15px", "border-radius": "8px", "border-left": "4px solid #28a745" } };
const _hoisted_10 = { style: { "margin": "0", "color": "#155724", "font-weight": "500" } };
const _hoisted_11 = { style: { "text-align": "center", "margin-top": "30px", "padding-top": "20px", "border-top": "1px solid #eee" } };
const _hoisted_12 = { style: { "color": "#999", "margin": "5px 0 0 0", "font-size": "12px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocumentsSubmittedAdmin",
  props: {
    userData: { type: Object, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createCommentVNode(" Header "),
        _cache[12] || (_cache[12] = createElementVNode(
          "div",
          { style: { "background": "linear-gradient(135deg, #58c7bf, #4ca9b1)", "padding": "30px", "text-align": "center", "border-radius": "10px 10px 0 0" } },
          [
            createElementVNode("h1", { style: { "color": "white", "margin": "0", "font-size": "24px", "font-weight": "bold" } }, "Documents Soumis"),
            createElementVNode("p", { style: { "color": "white", "margin": "10px 0 0 0", "opacity": "0.9" } }, "Nouvelle soumission de documents")
          ],
          -1
          /* CACHED */
        )),
        createCommentVNode(" Content "),
        createElementVNode("div", _hoisted_2, [
          createCommentVNode(" User Info "),
          createElementVNode("div", _hoisted_3, [
            _cache[3] || (_cache[3] = createElementVNode(
              "h2",
              { style: { "color": "#333", "margin": "0 0 15px 0", "font-size": "18px" } },
              "Informations de l'utilisateur",
              -1
              /* CACHED */
            )),
            createElementVNode("div", _hoisted_4, [
              createElementVNode("p", _hoisted_5, [
                _cache[0] || (_cache[0] = createElementVNode(
                  "strong",
                  null,
                  "Nom :",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString(_ctx.userData.last_name),
                  1
                  /* TEXT */
                )
              ]),
              createElementVNode("p", _hoisted_6, [
                _cache[1] || (_cache[1] = createElementVNode(
                  "strong",
                  null,
                  "Pr\xE9nom :",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString(_ctx.userData.first_name),
                  1
                  /* TEXT */
                )
              ]),
              createElementVNode("p", _hoisted_7, [
                _cache[2] || (_cache[2] = createElementVNode(
                  "strong",
                  null,
                  "Email :",
                  -1
                  /* CACHED */
                )),
                createTextVNode(
                  " " + toDisplayString(_ctx.userData.email),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          createCommentVNode(" Documents Info "),
          createElementVNode("div", _hoisted_8, [
            _cache[9] || (_cache[9] = createElementVNode(
              "h2",
              { style: { "color": "#333", "margin": "0 0 15px 0", "font-size": "18px" } },
              "Documents fournis",
              -1
              /* CACHED */
            )),
            createElementVNode("div", _hoisted_9, [
              createElementVNode("p", _hoisted_10, [
                _cache[4] || (_cache[4] = createTextVNode(
                  " \u2705 L'utilisateur ",
                  -1
                  /* CACHED */
                )),
                createElementVNode(
                  "strong",
                  null,
                  toDisplayString(_ctx.userData.first_name) + " " + toDisplayString(_ctx.userData.last_name),
                  1
                  /* TEXT */
                ),
                _cache[5] || (_cache[5] = createTextVNode(
                  " a fourni les documents ",
                  -1
                  /* CACHED */
                )),
                _cache[6] || (_cache[6] = createElementVNode(
                  "strong",
                  null,
                  "NIF",
                  -1
                  /* CACHED */
                )),
                _cache[7] || (_cache[7] = createTextVNode(
                  " et ",
                  -1
                  /* CACHED */
                )),
                _cache[8] || (_cache[8] = createElementVNode(
                  "strong",
                  null,
                  "STAT",
                  -1
                  /* CACHED */
                ))
              ])
            ])
          ]),
          createCommentVNode(" Action Required "),
          _cache[11] || (_cache[11] = createElementVNode(
            "div",
            { style: { "background": "#fff3cd", "padding": "15px", "border-radius": "8px", "border-left": "4px solid #ffc107", "margin-bottom": "25px" } },
            [
              createElementVNode("h3", { style: { "color": "#856404", "margin": "0 0 10px 0", "font-size": "16px" } }, "Action requise"),
              createElementVNode("p", { style: { "margin": "0", "color": "#856404" } }, " Veuillez v\xE9rifier et valider les documents soumis dans le panneau d'administration. ")
            ],
            -1
            /* CACHED */
          )),
          createCommentVNode(" Footer "),
          createElementVNode("div", _hoisted_11, [
            _cache[10] || (_cache[10] = createElementVNode(
              "p",
              { style: { "color": "#666", "margin": "0", "font-size": "14px" } },
              " Cet email a \xE9t\xE9 envoy\xE9 automatiquement par le syst\xE8me E-rentall ",
              -1
              /* CACHED */
            )),
            createElementVNode(
              "p",
              _hoisted_12,
              toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })),
              1
              /* TEXT */
            )
          ])
        ])
      ]);
    };
  }
});

const config = useRuntimeConfig();
const emailComponents = {
  BookingApprovedAdmin: _sfc_main$e,
  BookingApprovedRenter: _sfc_main$d,
  BookingConfirmedAdmin: _sfc_main$c,
  BookingConfirmedOwner: _sfc_main$b,
  BookingConfirmedRenter: _sfc_main$a,
  BookingRejectedRenter: _sfc_main$9,
  CancellationConfirmationForRenter: _sfc_main$8,
  CancellationNotificationForAdmin: _sfc_main$7,
  CancellationNotificationForOwner: _sfc_main$6,
  ReservationNotificationAdmin: _sfc_main$5,
  ReservationNotificationOwner: _sfc_main$4,
  ReservationPendingClient: _sfc_main$3,
  DepositAwaitingValidationAdmin: _sfc_main$2,
  PaymentReferenceRequest: _sfc_main$1,
  DocumentsSubmittedAdmin: _sfc_main
};
async function sendEmail(options) {
  const { to, subject, component, props } = options;
  const { render } = await import('file:///media/prince/Donner/Prince/e-rentall/node_modules/@vue-email/render/dist/node/index.mjs');
  const emailComponent = emailComponents[component];
  if (!emailComponent) {
    throw new Error(`Composant email "${component}" introuvable.`);
  }
  const html = await render(emailComponent, props || {});
  try {
    if (false) ; else {
      console.info("Utilisation de nodemailer pour le d\xE9veloppement...");
      const nodemailer = await import('file:///media/prince/Donner/Prince/e-rentall/node_modules/nodemailer/lib/nodemailer.js');
      const createTransport = nodemailer.createTransport;
      const transporter = createTransport({
        host: config.mail.smtp.host,
        port: config.mail.smtp.port,
        auth: {
          user: config.mail.smtp.auth.user,
          pass: config.mail.smtp.auth.pass
        }
      });
      const info = await transporter.sendMail({
        from: config.mailFromAddress,
        to,
        subject,
        html
      });
      console.info(`Email envoy\xE9 avec succ\xE8s \xE0 ${to} via nodemailer: ${info.messageId}`);
      return info;
    }
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'email \xE0 ${to}:`, error);
    throw error;
  }
}

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _r6tfxD = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola$1.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      consola$1.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola$1.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///media/prince/Donner/Prince/e-rentall/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///media/prince/Donner/Prince/e-rentall/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _BHJVpM = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_rwaa63 = () => Promise.resolve().then(function () { return sendNotifications_post$1; });
const _lazy_Un0Ldd = () => Promise.resolve().then(function () { return sendNotification_post$1; });
const _lazy_2QCmTl = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _NKQkp7, lazy: false, middleware: true, method: undefined },
  { route: '/api/bookings/send-notifications', handler: _lazy_rwaa63, lazy: true, middleware: false, method: "post" },
  { route: '/api/documents/send-notification', handler: _lazy_Un0Ldd, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_2QCmTl, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _r6tfxD, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _BHJVpM, lazy: false, middleware: false, method: undefined },
  { route: '/_fonts/**', handler: _lazy_2QCmTl, lazy: true, middleware: false, method: undefined },
  { route: '/_scripts/**', handler: _lazy_2QCmTl, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_2QCmTl, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const sendNotifications_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    const { eventType, booking } = body;
    const appUrl = getRequestURL(event).origin;
    const templateData = {
      reservationId: booking.id,
      renterName: `${booking.renter.first_name} ${booking.renter.last_name}`,
      renterEmail: booking.renter.email,
      ownerName: `${booking.owner.first_name} ${booking.owner.last_name}`,
      ownerEmail: booking.owner.email,
      vehicleName: booking.vehicle.make,
      vehicleModel: booking.vehicle.model,
      vehicleLicensePlate: booking.vehicle.license_plate || "Non renseign\xE9e",
      startDate: new Date(booking.start_date),
      endDate: new Date(booking.end_date),
      destination: booking.destination || "Non renseign\xE9e",
      totalPrice: booking.total_price,
      depositAmount: booking.deposit_amount || 0,
      paymentReference: booking.payment_reference || "",
      createdAt: /* @__PURE__ */ new Date(),
      appUrl
    };
    const emailsToSend = [];
    switch (eventType) {
      case "booking_created":
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: `Demande de r\xE9servation re\xE7ue - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "ReservationPendingClient",
            props: templateData
          },
          {
            to: booking.owner.email,
            subject: `Nouvelle demande de r\xE9servation - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "ReservationNotificationOwner",
            // Correction: le bon template ici
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] Nouvelle demande de r\xE9servation - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "ReservationNotificationAdmin",
            props: templateData
          }
        );
        break;
      case "booking_approved":
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: "Demande accept\xE9e - Veuillez r\xE9gler l'acompte",
            component: "BookingApprovedRenter",
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] Demande accept\xE9e par le propri\xE9taire - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "BookingApprovedAdmin",
            props: templateData
          }
        );
        break;
      case "booking_cancelled": {
        const { cancelled_by, cancellation_reason, renter, owner } = booking;
        let cancelledByWho = "Inconnu";
        if (cancelled_by === renter?.id) cancelledByWho = "Le Locataire";
        else if (cancelled_by === owner?.id) cancelledByWho = "Le Propri\xE9taire";
        else if (cancelled_by) cancelledByWho = "L'Administrateur";
        const cancellationProps = {
          ...templateData,
          cancelledBy: cancelledByWho,
          cancellationReason: cancellation_reason || "Aucune raison fournie"
        };
        if (cancelled_by === renter?.id) {
          emailsToSend.push({
            to: renter?.email,
            subject: "Confirmation de votre annulation",
            component: "CancellationConfirmationForRenter",
            props: cancellationProps
          });
        } else {
          emailsToSend.push({
            to: renter?.email,
            subject: "Votre r\xE9servation a \xE9t\xE9 annul\xE9e",
            component: "BookingRejectedRenter",
            props: cancellationProps
          });
        }
        if (cancelled_by !== owner?.id) {
          emailsToSend.push({
            to: owner?.email,
            subject: "Une r\xE9servation pour votre v\xE9hicule a \xE9t\xE9 annul\xE9e",
            component: "CancellationNotificationForOwner",
            props: cancellationProps
          });
        }
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ADMIN] Annulation de r\xE9servation - ${booking.vehicle.make}`,
          component: "CancellationNotificationForAdmin",
          props: cancellationProps
        });
        break;
      }
      case "deposit_submitted_for_admin_validation":
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ACTION REQUISE] V\xE9rification d'acompte pour la r\xE9servation #${booking.id.slice(
            0,
            8
          )}`,
          component: "DepositAwaitingValidationAdmin",
          props: {
            ...templateData,
            depositAmount: booking.deposit_amount || 0,
            paymentReference: booking.payment_reference || "Non fournie",
            renterName: `${booking.renter.first_name} ${booking.renter.last_name}`
          }
        });
        break;
      case "request_new_payment_reference":
        await sendEmail({
          to: booking.renter.email,
          subject: "Action requise : R\xE9f\xE9rence de paiement incorrecte",
          component: "PaymentReferenceRequest",
          props: {
            ...templateData,
            renterName: `${booking.renter.first_name} ${booking.renter.last_name}`,
            paymentReference: booking.payment_reference || "Non fournie"
          }
        });
        break;
      case "booking_confirmed_and_active":
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: `R\xE9servation confirm\xE9e et active - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "BookingConfirmedRenter",
            props: templateData
          },
          {
            to: booking.owner.email,
            subject: `Votre v\xE9hicule est lou\xE9 - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: "BookingConfirmedOwner",
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] R\xE9servation confirm\xE9e - #${booking.id.slice(0, 8)}`,
            component: "BookingConfirmedAdmin",
            props: templateData
          }
        );
        break;
      default:
        throw createError({
          statusCode: 400,
          statusMessage: "Type d'\xE9v\xE9nement non support\xE9"
        });
    }
    const results = await Promise.allSettled(
      emailsToSend.filter((email) => email.to).map(
        (email) => sendEmail({
          to: email.to || "",
          subject: email.subject,
          component: email.component,
          // On passe le nom du composant
          props: email.props
          // Et les props
        })
      )
    );
    const fulfilledResults = results.filter((result) => result.status === "fulfilled");
    const rejectedResults = results.filter((result) => result.status === "rejected");
    const errors = rejectedResults.map((p) => {
      const reason = p.reason;
      if (reason instanceof Error) {
        return {
          name: reason.name,
          message: reason.message,
          stack: reason.stack
          // Utile pour le débogage
        };
      }
      return { message: String(reason) };
    });
    if (errors.length > 0) {
      console.error(
        "Certains emails ont \xE9chou\xE9:",
        JSON.stringify(errors, null, 2)
        // Log plus lisible
      );
    }
    return {
      success: rejectedResults.length === 0,
      emailsSent: fulfilledResults.length,
      emailsFailed: rejectedResults.length,
      message: `${fulfilledResults.length}/${emailsToSend.length} emails envoy\xE9s.`,
      errors
      // On retourne les erreurs détaillées
    };
  } catch (error) {
    console.error("Erreur dans send-notifications:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi des notifications email"
    });
  }
});

const sendNotifications_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendNotifications_post
}, Symbol.toStringTag, { value: 'Module' }));

const sendNotification_post = defineEventHandler(async (event) => {
  try {
    console.log("API: D\xE9but de traitement de la notification de documents");
    const body = await readBody(event);
    const { userData } = body;
    console.log("API: Donn\xE9es re\xE7ues:", userData);
    if (!userData || !userData.email || !userData.first_name || !userData.last_name) {
      console.error("API: Donn\xE9es utilisateur manquantes:", userData);
      throw createError({
        statusCode: 400,
        statusMessage: "Donn\xE9es utilisateur manquantes ou incompl\xE8tes"
      });
    }
    const adminEmail = process.env.ADMIN_EMAIL || "jenrandr@gmail.com";
    console.log("API: Tentative d'envoi d'email...");
    await sendEmail({
      to: adminEmail,
      subject: `Documents soumis - ${userData.first_name} ${userData.last_name}`,
      component: "DocumentsSubmittedAdmin",
      props: {
        userData: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email
        }
      }
    });
    console.log("API: Email envoy\xE9 avec succ\xE8s");
    return {
      success: true,
      message: "Notification envoy\xE9e avec succ\xE8s"
    };
  } catch (error) {
    console.error("API: Erreur lors de l'envoi de la notification de documents:", error);
    if (error instanceof Error) {
      console.error("API: Message d'erreur:", error.message);
      console.error("API: Stack trace:", error.stack);
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de la notification"
    });
  }
});

const sendNotification_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendNotification_post
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadScript(opts) {
  opts.data.config = opts.ssrContext.config;
  const nuxtData = devalue(opts.data);
  const singleAppPayload = `window.__NUXT__=${nuxtData}`;
  `window.__NUXT__=window.__NUXT__||{};window.__NUXT__[${JSON.stringify(appId)}]=${nuxtData}`;
  return [
    {
      innerHTML: singleAppPayload
    }
  ];
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadScript({ ssrContext, data: ssrContext.payload })
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
