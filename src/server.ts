import { createServer } from "./configs/server.config";
import { connect } from "./configs/db.config";
import { PORT, DATABASE_URI } from "./configs/constants.config";

const app = createServer();

app.listen(PORT, async () => {
  console.log(`Running on PORT ${PORT}`);
  await connect(DATABASE_URI);
});
