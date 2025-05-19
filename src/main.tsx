import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "../growthbook";
import * as Sentry from "@sentry/react";

// Inicializar Sentry
Sentry.init({
  dsn: "https://9323961bbe2f8b41253baa9095204ac1@o4509340464775168.ingest.us.sentry.io/4509340468838400",
  sendDefaultPii: true,
});

const Root = () => {
  useEffect(() => {
    growthbook.init({ streaming: true });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <App />
    </GrowthBookProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
