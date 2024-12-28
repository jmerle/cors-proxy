import 'dotenv/config';

import { register } from 'node:module';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { envDetector } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

function removePrivacySensitiveSpanAttributes(span) {
  for (const attribute of Object.keys(span.attributes)) {
    if (attribute === 'http.url' || attribute === 'http.target' || attribute.startsWith('net.')) {
      delete span.attributes[attribute];
    }
  }
}

register('@opentelemetry/instrumentation/hook.mjs', import.meta.url);

new NodeSDK({
  instrumentations: [
    new HttpInstrumentation({
      applyCustomAttributesOnSpan: removePrivacySensitiveSpanAttributes,
    }),
  ],
  resourceDetectors: [envDetector],
}).start();
