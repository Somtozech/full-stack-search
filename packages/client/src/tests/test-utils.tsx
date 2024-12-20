import { Provider } from "react-redux";
import { store as appStore } from "../store";
import { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: typeof appStore;
  routerProps?: Parameters<typeof MemoryRouter>[0];
}

function renderWithProviders(
  ui: React.ReactElement,
  { store = appStore, routerProps, ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    const content = routerProps ? <MemoryRouter {...routerProps}>{children}</MemoryRouter> : children;

    return <Provider store={store}>{content}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithProviders };
