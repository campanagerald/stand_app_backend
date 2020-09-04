import mongoose from 'mongoose';
import { app } from './app';
import { PORT, HOST, MONGODB_URI } from './environment.variables';

async function main() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, HOST, () => {
      console.log(`🚴‍♂️ Server is running in ${HOST}:${PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

main().catch(console.log);
