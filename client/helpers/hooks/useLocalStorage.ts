import React from "react";

type Key = "form-data";

export const useLocalStorage = <T>(
  key: Key,
  defaultValue: T,
): [T, (v: T) => void] => {
  const savedValue = localStorage.getItem(key);
  const [value, _setValue] = React.useState<T>(
    savedValue ? JSON.parse(savedValue) : defaultValue,
  );

  const setValue = (v: T) => {
    localStorage.setItem(key, JSON.stringify(v));
    _setValue(v);
  };

  return [value, setValue];
};
