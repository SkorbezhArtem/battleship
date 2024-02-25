interface PObj {
  [key: string]: PObj | string;
}

const parseNestedJSON = (jsonStr: string): PObj => {
  const parsedData = JSON.parse(jsonStr);

  const parseNested = (obj: PObj): PObj => {
    Object.entries(obj).forEach(([prop, value]) => {
      if (typeof value === 'string' && value.includes('{')) {
        obj[prop] = parseNested(JSON.parse(value as string));
      }
    });
    return obj;
  };

  return parseNested(parsedData);
};

export default parseNestedJSON;
