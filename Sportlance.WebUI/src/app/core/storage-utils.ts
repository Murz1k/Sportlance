const prefix = "sportlance-";

function getKey(key: string) {
  return prefix + key;
}

export class StorageUtils {

  public static setItem(key: string, value: any) {
    if (value) {
      localStorage.setItem(getKey(key), JSON.stringify(value));
    } else {
      localStorage.removeItem(getKey(key));
    }
  }

  public static getItem(key: string) {
    return JSON.parse(localStorage.getItem(getKey(key)));
  }
}
