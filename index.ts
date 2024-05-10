import app from "./app";
import { PORT } from "./data/EnvironmentVariables";

app.listen(PORT, () => {
  console.log(`Server is Started at tes http://localhost:${PORT}`);
});
