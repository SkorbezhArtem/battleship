const parseNestedJSON = (str: string) => {
  const parsePropertyValue = (value: string | unknown): unknown => {
    if (typeof value === 'string' && value.includes('{')) {
      return parseNestedJSON(value);
    }
    return value;
  };

  const parseObjectProperties = (
    obj: Record<string, string | unknown>,
  ): Record<string, unknown> => {
    const parsedObject: Record<string, unknown> = {};
    for (const property in obj) {
      parsedObject[property] = parsePropertyValue(obj[property]);
    }
    return parsedObject;
  };

  try {
    const data = JSON.parse(str);
    if (typeof data === 'object' && data !== null) {
      return parseObjectProperties(data);
    }
    return data;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return str;
  }
};

export default parseNestedJSON;
