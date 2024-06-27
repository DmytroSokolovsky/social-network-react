import { useLayoutEffect, useState } from 'react';

const queries = [
  '(max-width: 992.98px)',
  '(max-width: 767.98px)',
  '(max-width: 479.98px)',
];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map(query => matchMedia(query));

  const getValues = mediaQueryLists.map(mql => mql.matches);

  const [values, setValues] = useState<Array<boolean>>(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));

    return () => {
      mediaQueryLists.forEach(mql =>
        mql.removeEventListener('change', handler),
      );
    };
  });

  return {
    md2: values[0],
    md3: values[1],
    md4: values[2],
  };
};
