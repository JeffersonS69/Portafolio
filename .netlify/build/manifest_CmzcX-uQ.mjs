import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/shared_BCgKBF-k.mjs';
import 'html-escaper';
import 'clsx';
import { h as decodeKey } from './chunks/astro/server_BzW_gVoO.mjs';
import { compile } from 'path-to-regexp';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/jeff/Portafolio/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sections","isIndex":false,"type":"page","pattern":"^\\/sections\\/?$","segments":[[{"content":"sections","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sections.astro","pathname":"/sections","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function y(){const e=document.querySelectorAll(\"article\");let t=\"\";e.forEach(o=>{const n=o.offsetTop,r=o.offsetHeight;window.scrollY>=n-r/2&&(t=o.getAttribute(\"id\"))}),t&&window.location.hash!==`#${t}`&&history.pushState(null,\"\",`#${t}`)}window.addEventListener(\"scroll\",y);const d=document.getElementById(\"paragraph1\"),l=document.getElementById(\"paragraph2\"),E=document.getElementById(\"toggleButton1\"),w=document.getElementById(\"toggleButton2\");E.addEventListener(\"click\",()=>{d.classList.remove(\"active-para1\"),d.classList.add(\"hidden-para2\"),l.classList.remove(\"hidden-para2\"),l.classList.add(\"active-para1\")});w.addEventListener(\"click\",()=>{l.classList.remove(\"active-para1\"),l.classList.add(\"hidden-para2\"),d.classList.remove(\"hidden-para2\"),d.classList.add(\"active-para1\")});document.getElementById(\"downloadCV\")?.addEventListener(\"click\",()=>{const e=document.createElement(\"a\");e.href=\"https://drive.google.com/uc?export=download&id=1P2b6H5r6J7JIrpB_Ao9mN-PGLA8ULzR7\",e.download=\"Jefferson_Garcia_CV.pdf\",document.body.appendChild(e),e.click(),document.body.removeChild(e)});const s=document.getElementById(\"form-contact\"),a=document.getElementById(\"submit-button\");s?.addEventListener(\"submit\",async e=>{e.preventDefault(),a.disabled=!0;const t=a?.innerHTML;a.innerHTML=\"Enviando...\";const o=new FormData(s);try{(await fetch(s.action,{method:s.method,body:o})).ok?(alert(\"Mensaje enviado con éxito\"),s.reset()):alert(\"Hubo un problema al enviar el mensaje.\")}catch(n){alert(\"Error al enviar el formulario.\"),console.error(n)}a.innerHTML=t,a.disabled=!1});const L=[\"#fff2\",\"#fff4\",\"#fff7\",\"#fffc\"],u=(e,t,o,n)=>{const r=[];for(let v=0;v<o;v++){const f=L[Math.floor(Math.random()*L.length)],h=Math.floor(Math.random()*100),p=Math.floor(Math.random()*100);r.push(`${h}vw ${p}vh 0 ${f}, ${h}vw ${p+100}vh 0 ${f}`)}const i=document.querySelector(t);i.style.setProperty(\"--size\",e),i.style.setProperty(\"--space-layer\",r.join(\",\")),i.style.setProperty(\"--duration\",n)};u(\"1px\",\".space-1\",200,\"25s\");u(\"2px\",\".space-2\",100,\"20s\");u(\"4px\",\".space-3\",25,\"15s\");const c=document.querySelector(\"#menuToggle\"),m=document.querySelector(\"#navLinks\"),b=document.querySelector(\"#exitMenu\"),B=document.querySelectorAll(\"article\");window.addEventListener(\"resize\",()=>{window.innerWidth>512&&(m.classList.remove(\"visible\"),c.classList.remove(\"hidden\"))});c.addEventListener(\"click\",()=>{m.classList.add(\"visible\"),c.classList.add(\"hidden\")});b.addEventListener(\"click\",()=>{m.classList.remove(\"visible\"),c.classList.remove(\"hidden\")});function S(){document.querySelectorAll(\"nav a\").forEach(e=>{e.classList.remove(\"active\")})}function g(){B.forEach(e=>{const t=e.offsetTop,o=e.clientHeight,n=document.querySelector(`nav a[href=\"#${e.id}\"]`);n?.addEventListener(\"click\",()=>{m.classList.remove(\"visible\"),c.classList.remove(\"hidden\")}),window.scrollY>=t-o/2&&(S(),n?.classList.add(\"active\"))})}window.addEventListener(\"load\",()=>{g()});window.addEventListener(\"scroll\",()=>{g()});\n"}],"styles":[{"type":"external","src":"/_astro/index.j6ko9CKI.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jeff/Portafolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/jeff/Portafolio/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/sections@_@astro":"pages/sections.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CmzcX-uQ.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_Bk8ELK_y.mjs","/home/jeff/Portafolio/node_modules/astro/dist/actions/runtime/virtual/get-action.js":"chunks/get-action_C703mPAc.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BcqI0alc.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/deone.CjMOcdMV.png","/_astro/foto3.CMTqYNfY.png","/_astro/page-gif.FfEgDJEb.png","/_astro/J.C2Jt2Aff.png","/_astro/index.j6ko9CKI.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PR0pmPo1nMXeEPiSukQGmugdldgXpugKulDFEz1nQ8Q=","experimentalEnvGetSecretEnabled":false});

export { manifest };
