interface Address {
  value: string;
  label: string | null;
  enabled: boolean;
}

interface ConfigData {
  cur_code: string;
  locale: string;
  addresses: Address[];
}

export async function fetchConfigData(configUrl: string) {
  const response = await fetch(configUrl);
  return  await response.json() as ConfigData;
}