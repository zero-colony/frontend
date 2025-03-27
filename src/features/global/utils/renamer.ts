import { APP_VERSION } from '@root/settings/chains';
import path from 'path';

class Suffix {
  replace(filePath: string) {
    const file = path.parse(filePath);
    const newName = file.name + `${APP_VERSION}` + file.ext;
    return path.join(file.dir, newName);
  }
}

export default Suffix;
