import { DataSource } from 'typeorm';
import { RoomsSeeder } from './database/seed/RoomsSeeder';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    console.log('Running seeds...');
    await new RoomsSeeder().run(dataSource);
    console.log('Seeds executed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during seeds execution:', err);
    process.exit(1);
  });
