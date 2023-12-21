import {scrypt,randomBytes} from 'crypto'
import bcrypt  from 'bcryptjs'
export class Password {
    static async toHash(password: string){
        const salt = await bcrypt.genSalt(10);
         return  bcrypt.hash(password, salt);
    }

    static async comparePassword(storedPassword: string,providedPassword: string)
    {
          const isMatch = await bcrypt.compare(providedPassword, storedPassword);
          return isMatch;
    }
}