
import { LOGGING_ERROR_HANDLER_PROVIDERS, LOGGING_ERROR_HANDLER_OPTIONS } from  'share-lib';
import { ErrorLogService } from 'share-lib';
import {MessageService} from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
export const APP_PROVIDERS = [

  ConfirmationService,
    ErrorLogService,

    // CAUTION: This providers collection overrides the CORE ErrorHandler with our
    // custom version of the service that logs errors to the ErrorLogService.
    LOGGING_ERROR_HANDLER_PROVIDERS, MessageService,

    // OPTIONAL: By default, our custom LoggingErrorHandler has behavior around
    // rethrowing and / or unwrapping errors. In order to facilitate dependency-
    // injection instead of resorting to the use of a Factory for instantiation,
    // these options can be overridden in the providers collection.
    {
      provide: LOGGING_ERROR_HANDLER_OPTIONS,
      useValue: {
        rethrowError: false,
        unwrapError: false
      }
    }
];
