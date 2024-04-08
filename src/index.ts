import dotenv from 'dotenv';
dotenv.config();
import server from './app';

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
