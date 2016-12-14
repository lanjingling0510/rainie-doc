import createHistory from 'history/createHashHistory';

const history = createHistory();

let onChange;

/**
 * Set of functions that helps to manipulate browser history.
 */
const RouterHistory = {
  /**
   * Push state with given path.
   * @param {string} path
   */
  push(path) {
    history.push(path);
    // onChange(path, 'push')
  },

  /**
   * Replace state with given path.
   * @param {string} path
   */
  replace(path) {
    history.replace(path);
    // onChange(path, 'replace')
  },

  /**
   * popstate listener.
   */
  onPopState(location, e) {
    onChange(RouterHistory.currentPath(), typeof e === 'undefined'
      ? 'synthetic'
      : 'pop');
  },

  /**
   * @param {Function} cb callback
   * @returns {Function} that removes event listener.
   */
  start(cb) {
    onChange = cb;
    this.unlisten = history.listen(RouterHistory.onPopState.bind(this));
    RouterHistory.onPopState();
  },

  /**
   * Removes history listener
   */
  stop() {
    onChange = undefined;
    this.unlisten();
  },

  /**
   * @returns {string} current path
   */
  currentPath() {
    const location = history.location;
    return location.pathname + location.search;
  },
};

module.exports = RouterHistory;
