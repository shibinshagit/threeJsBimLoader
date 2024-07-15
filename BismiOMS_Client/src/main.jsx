import { RouterProvider } from "react-router-dom";
import appRouter from "./routers/appRouter.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(

        <RouterProvider router={appRouter}>
          <Toaster richColors position='top-right'/>
          <App />
        </RouterProvider>

);
