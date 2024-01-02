import { createServer } from "./configs/server.config.js";
import { connect } from "./configs/db.config.js";
import { PORT, DATABASE_URI } from "./configs/constants.config.js";

const app = createServer();

app.listen(PORT, async () => {
  console.log(`Running on PORT ${PORT}`);
  await connect(DATABASE_URI);
});
