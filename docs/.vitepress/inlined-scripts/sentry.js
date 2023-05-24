import * as Sentry from "https://esm.sh/@sentry/browser";

Sentry.init({
  dsn: 'https://a257054f72f14d18a20a84a2b1610f33@sentry.cshaw.tech/5',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.5,
  environment: window.location.host === 'www.aemvite.dev' ? 'production' : 'development',
});