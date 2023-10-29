type SetterFn<T> = (prevState: T) => Partial<T>;

export function createStore<TState>(createState: () => TState) {
  let state = createState();
  const listeners = new Set<() => void>();

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newValue,
    };

    notifyListeners();
  }

  function getState() {
    return state;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  return {
    setState,
    getState,
    subscribe,
  };
}

const store = createStore(() => ({
  userName: '',
  active: false,
  counter: 1,
}));

store.subscribe(() => {
  console.log(store.getState());
});

store.setState({
  userName: 'Luis',
});
store.setState((prevState) => ({
  counter: prevState.counter + 1,
}));
