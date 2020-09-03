import { app } from './app';
import { PORT, HOST } from './environment.variables';

async function main() {
  app.listen(PORT, HOST, () => {
    console.log(`🚴‍♂️ Server is running in ${HOST}:${PORT}`);
  });
}

main();
