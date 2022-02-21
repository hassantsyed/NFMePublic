import { ApplicationInsights } from "@microsoft/applicationinsights-web";
const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: ""
    }
});
export const logger = appInsights.loadAppInsights();