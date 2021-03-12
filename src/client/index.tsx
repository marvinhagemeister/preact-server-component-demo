import { render, h } from 'preact';

// TODO: this has to be transpiled out and replaced by:
/**
 * const ServerLoader = ({ hash = 'data.server.js#ServerComponent', ...props }) => {
 *    // Will parse when the loading completes
 *    const module = useModule(hash, props);
 *    return null;
 * }
 */
import { ServerComponent, ServerComponent2 } from './data.server';

const App = () => {
  return (
    <main>
      <h1>
        <span class="atom">⚛</span>
        Preact Server Components
      </h1>
      <p>
        This demo demonstrates how components are rendered on the server and
        inserted on the client.
      </p>
      <button id="toggle">Fetch data</button>
      <br />
      <div class="area">
        <div class="server-component">
          <h2 class="area-title">Server Component A</h2>
          <div data-root="J0">
            <ServerComponent />
          </div>
        </div>
        <div class="server-component">
          <h2 class="area-title">Server Component B</h2>
          <div data-root="J1">
            <ServerComponent2 />
          </div>
        </div>
      </div>
      <br />
    </main>
  )
}

render(<App />, document.body);
