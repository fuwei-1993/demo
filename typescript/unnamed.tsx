// @ts-nocheck
import { difference } from 'lodash';

import React, { createContext, useContext, useState, useEffect, useRef, PropsWithChildren } from 'react';

interface ObservableValue<T = any> {
  state: T;
  observers: Set<(keys: string[]) => void>;
}
const defaultValue = {
  state: {},
  observers: new Set(),
} as ObservableValue;

const FreezedContext = createContext(defaultValue);

export const NutsProvider = <T extends Record<string, any> = any>(props: PropsWithChildren<{ hook: () => T }>) => {
  const value = props.hook();
  const { current: observableValue } = useRef<ObservableValue<T>>({
    state: value,
    observers: new Set(),
  });

  useEffect(() => {
    const allKeys = Object.keys(value);
    const changedKeys: string[] = [];

    allKeys.forEach((key) => {
      if (!Object.is(observableValue.state[key], value[key])) {
        changedKeys.push(key);
      }
    });

    if (changedKeys.length) {
      observableValue.state = value;
      observableValue.observers.forEach((ob) => ob(changedKeys));
    }
  }, [value]);

  return <FreezedContext.Provider value={observableValue}>{props.children}</FreezedContext.Provider>;
};

const dependenciesCollector = <T extends Record<string, any> = any>(target: T) => {
  const deps = new Set<string>();
  return {
    collector: new Proxy(target, {
      get(target, p) {
        const key = p as string;
        if (!deps.has(key)) {
          deps.add(key);
        }

        return target[key];
      },
      set(_, p, newValue) {
        const key = p as string;
        (target[key] as any) = newValue;
        console.error(`属性${key}无法被改变, 请检查`);

        return true;
      },
    }),
    deps,
  };
};
export const useContextOnDemand = <T extends Record<string, any>>() => {
  const freezedContext = useContext(FreezedContext);
  const { collector, deps } = dependenciesCollector(freezedContext.state as T);
  const depsRef = useRef(deps);
  const [state, setState] = useState(collector);

  useEffect(() => {
    const observer = (changeKeys: string[]) => {
      const isStateChange = difference([...deps.values()], changeKeys).length < deps.size;

      if (isStateChange) {
        const { deps, collector } = dependenciesCollector(freezedContext.state);
        depsRef.current = deps;
        setState(collector);
      }
    };
    freezedContext.observers.add(observer);

    return () => {
      freezedContext.observers.delete(observer);
    };
  }, []);

  return state;
};
