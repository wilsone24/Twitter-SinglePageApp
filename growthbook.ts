import { GrowthBook } from "@growthbook/growthbook";
import { autoAttributesPlugin } from "@growthbook/growthbook/plugins";

export const  growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-y1NcWBtqwwg26pDj",
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    // This is where you would send an event to your analytics provider
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key
    });
  },
  plugins: [ autoAttributesPlugin() ],
});


