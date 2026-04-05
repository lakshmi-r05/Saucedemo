import { GeneralUtils } from '../utils/general';
import { USER_TYPES } from './staticValues';
export class TestData {
  static getUser(userType: keyof typeof USER_TYPES) {
    const envKey = USER_TYPES[userType];

    const username = process.env[envKey];
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error(`Missing env data for ${userType}`);
    }

    return { username, password };
  }
  static getCheckoutData() {
    return {
      firstName: GeneralUtils.generateRandomFirstName(),
      lastName: GeneralUtils.generateRandomLastName(),
      zip: GeneralUtils.generateRandomZip(),
    };
  }

}