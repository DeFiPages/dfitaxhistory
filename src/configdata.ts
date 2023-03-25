/**
 * Interface representing an address object.
 */
interface Address {
  value: string; // The actual address value as a string.
  label: string | null; // An optional label for the address.
  enabled: boolean; // Indicates whether the address is enabled or not.
}

/**
 * Interface representing the configuration data object.
 */
interface ConfigData {
  cur_code: string; // The current currency code.
  locale: string; // The current locale for the application.
  addresses: Address[]; // An array of address objects.
}

/**
 * Holds the configuration data or null if not yet fetched.
 */
export var config: ConfigData | undefined;

/**
 * Stores the URL of the last fetched configuration.
 */
var lastconfigurl: string;

/**
 * Fetches the configuration data from the given URL.
 * If the configuration data is already fetched or the provided URL
 * is the same as the last fetched URL, it returns the existing config data.
 *
 * @param {string} configUrl - The URL to fetch the configuration data from.
 * @returns {Promise<string | ConfigData>} A promise that resolves to a config data object
 * or an error message string in case of an error.
 */
export async function fetchConfigData(configUrl: string): Promise<string | ConfigData> {
  if (config && lastconfigurl === configUrl) {
    return config;
  } else {
    try {
      config = undefined;
      const response = await fetch(configUrl);
      if (!response.ok)
        return `HTTP error fetching: ${configUrl} status: ${response.status}`
      config = await response.json() as ConfigData;
      lastconfigurl = configUrl; // Update the last fetched URL
      return config;
    } catch (error) {
      return "An error occurred while fetching the config data:" + error;
    }
  }
}