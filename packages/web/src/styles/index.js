/* eslint-disable */

const styles = [
  {
    type: 'href',
    body: '/css/normalize.css',
  },
  {
    type: 'href',
    body: '/css/webflow.css',
  },
  {
    type: 'href',
    body: '/css/subvisual-holidays.webflow.css',
  },
  {
    type: 'sheet',
    body: '.af-view *{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-moz-font-feature-settings:"smcp" 1,"onum" 1,"frac" 1,"kern" 1,"liga" 1,"dlig" 1,"swsh" 1;-moz-font-feature-settings:"smcp=1, onum=1, frac=1, kern=1, liga=1, dlig=1, swsh=1";-ms-font-feature-settings:"smcp" 1,"onum" 1,"frac" 1,"kern" 1,"liga" 1,"dlig" 1,"swsh" 1;-o-font-feature-settings:"smcp" 1,"onum" 1,"frac" 1,"kern" 1,"liga" 1,"dlig" 1,"swsh" 1;-webkit-font-feature-settings:"smcp" 1,"onum" 1,"frac" 1,"kern" 1,"liga" 1,"dlig" 1,"swsh" 1;font-feature-settings:"smcp" 1,"onum" 1,"frac" 1,"kern" 1,"liga" 1,"dlig" 1,"swsh" 1;font-feature-settings:normal}.af-view .navbar-background{backdrop-filter:blur(20px)}.af-view .load-background{animation:colorBackgroundMove 1.5s cubic-bezier(.22,1,.36,1);animation-delay:.8s;animation-fill-mode:forwards}@keyframes colorBackgroundMove{0%{width:100vw;height:100vh;margin-left:0 auto;border-radius:0}100%{width:97vw;height:97vh;margin:0 1.5%;border-radius:0 0 60px 60px}}.af-view .w-webflow-badge{display:none!important}',
  },
]

const loadingStyles = styles.map((style) => {
  let styleEl
  let loading

  if (style.type == 'href') {
    styleEl = document.createElement('link')

    loading = new Promise((resolve, reject) => {
      styleEl.onload = resolve
      styleEl.onerror = reject
    })

    styleEl.rel = 'stylesheet'
    styleEl.type = 'text/css'
    styleEl.href = style.body
  }
  else {
    styleEl = document.createElement('style')
    styleEl.type = 'text/css'
    styleEl.innerHTML = style.body

    loading = Promise.resolve()
  }

  document.head.appendChild(styleEl)

  return loading
})

export default Promise.all(loadingStyles).then(() => {
  const styleSheets = Array.from(document.styleSheets).filter((styleSheet) => {
    return styleSheet.href && styles.some((style) => {
      return style.type == 'href' && styleSheet.href.match(style.body)
    })
  })
  styleSheets.forEach((styleSheet) => {
    Array.from(styleSheet.rules).forEach((rule) => {
      if (rule.selectorText) {
        rule.selectorText = rule.selectorText
          .replace(/\.([\w_-]+)/g, '.$1')
          .replace(/\[class(.?)="( ?)([^"]+)( ?)"\]/g, '[class$1="$2$3$4"]')
          .replace(/([^\s][^,]*)(\s*,?)/g, '.af-view $1$2')
          .replace(/\.af-view html/g, '.af-view')
          .replace(/\.af-view body/g, '.af-view')
          .replace(/w-/g, 'w-')
          .replace(/anima-/g, 'anima-')
          .replace(/([\w_-]+)an-animation([\w_-]+)/g, '$1an-animation$2')
      }
    })
  })
})

/* eslint-enable */