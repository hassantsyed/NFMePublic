import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import mongoose, { mongo } from "mongoose";
import { MONGO_URI } from "./constants";


// Start the server
const port = Number(process.env.PORT || 3000);
mongoose.connect(MONGO_URI);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
