import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import styles from "./app.module.css";
function App() {
  const views = useRoutes(routes);

  return (
    <div className={`${styles.body}`}>
      <main>{views}</main>
    </div>
  );
}

export default App;
