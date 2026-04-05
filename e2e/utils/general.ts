export class GeneralUtils {

  static generateRandomString(prefix = 'Test') {
    return `${prefix}_${Math.random().toString(36).substring(2, 8)}`;
  }

  static generateRandomZip() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  static generateRandomFirstName() {
    return this.generateRandomString('FN');
  }

  static generateRandomLastName() {
    return this.generateRandomString('LN');
  }

}