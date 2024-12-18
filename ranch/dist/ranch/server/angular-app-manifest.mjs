
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
    'index.csr.html': {size: 701, hash: 'bc6dbf2df3377842f6676028f281e552fd115a56beed64a758aa4290f9620bd7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1019, hash: '48b5cffe6e9344dc2676731f2f1db7ba6875efd076015e0a56306009ca5b2504', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'cow-list/index.html': {size: 3128, hash: '51455dad0d0815393d3ac4d9827acc519e22dcaf71ba2c0c7e45277c318c5304', text: () => import('./assets-chunks/cow-list_index_html.mjs').then(m => m.default)},
    'styles-4XSUI7QU.css': {size: 179, hash: 'yf3Yn7k9QM8', text: () => import('./assets-chunks/styles-4XSUI7QU_css.mjs').then(m => m.default)}
  },
};
