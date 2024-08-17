import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __utildirname = dirname(fileURLToPath(import.meta.url));
export const __dirname = dirname(__utildirname);