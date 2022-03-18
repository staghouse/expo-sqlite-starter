export default class ComponentService {
  // Needs to be overridden to avoid conflicts on extension
  static instance = null;

  /**
   * Gets a single instance of the service across components
   */
  static getService() {
    if (this.instance === null) {
      this.instance = new this();
    }

    return this.instance;
  }

  /**
   * Wipes out instance
   */
  static resetInstance() {
    this.instance = null;
  }
}
