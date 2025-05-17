import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://9323961bbe2f8b41253baa9095204ac1@o4509340464775168.ingest.us.sentry.io/4509340468838400",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

/*
En app solo se corre un componente que es public, el cual tiene la logica de login y registro.
Public lo que hace es estár verificando 3 casos, ver si los estados toke y user existen, si existen renderiza el componente homepage

Si no está logueado entonces va a verificar si el estado showRegister.
Inicialmente es false, por lo que renderiza login, y dentro de login hay un <a> que cambia el estado, para renderizar register.

Dentro de register al terminar de hacer el registro, se cambia el estado de ShowRegister para que vuelva a login.

Esto no me gusta...... porque no se puede hacer para atrás al momento de darle a resgistrarse.

Tampoco está implementado que homepage te mande para otra página de modo que todo es un single plage. 
*/
