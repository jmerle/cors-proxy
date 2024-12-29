import 'dotenv/config';

import { register } from 'node:module';
import { isIP } from 'node:net';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { envDetector } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

function replacePrivacySensitiveSpanAttributes(span) {
  for (const [attribute, value] of Object.entries(span.attributes)) {
    if (attribute === 'http.url' || attribute === 'http.target' || isIP(value) !== 0) {
      span.attributes[attribute] = 'omitted';
    }
  }
}

register('@opentelemetry/instrumentation/hook.mjs', import.meta.url);

new NodeSDK({
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingRequestHook: req => !isUrl(req.url.substring(1)),
      requireParentforOutgoingSpans: true,
      applyCustomAttributesOnSpan: replacePrivacySensitiveSpanAttributes,
    }),
  ],
  resourceDetectors: [envDetector],
}).start();
