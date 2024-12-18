
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/cow-list",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/cow-list"
  }
],
  assets: {
    'index.csr.html': {size: 716, hash: 'b4e4db264400e1dd5c8a93675131a7bca0df3a0005cc19a807c7be50967e0c0a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1034, hash: 'ddfdfd43e0c92b9908154251513817207322ea80ad360f1440684848729c099a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cow-list/index.html': {size: 3168, hash: 'a23af824b336243275f83cd4ff04463af951d1ebb3b7962499a008ece87ea5b3', text: () => import('./assets-chunks/cow-list_index_html.mjs').then(m => m.default)},
    'styles-4XSUI7QU.css': {size: 179, hash: 'yf3Yn7k9QM8', text: () => import('./assets-chunks/styles-4XSUI7QU_css.mjs').then(m => m.default)}
  },
};
