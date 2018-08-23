/**
 * Make an Async action take at least X milliseconds to complete.
 * It makes the user experience less clunky in situations where the action
 * is completed very fast.
 *
 * How to use (inside a component method):
 *
 * // Start the delay with progress indicators
 * const delay = new Delay(this, ['submiting'], 300)
 *
 * // ... do async stuff
 *
 * // Initialize another progress indicator
 * delay.init('loading')
 *
 * // ... do async stuff
 *
 * // End the delay and restore the indicators
 * delay.end()
 */
export class Delay {
  component;
  indicators;
  delay;
  start;
  finish;

  constructor(component, indicators = [], delay = 300) {
    this.component = component;
    this.indicators = indicators || [];
    this.delay = delay;
    this.start = new Date().getTime();

    this.indicators.forEach(indicator => (this.component[indicator] = true));
  }

  init(indicator) {
    this.indicators.push(indicator);
    this.component[indicator] = true;
  }

  async end() {
    this.finish = new Date().getTime();

    const elapsed = this.finish - this.start;
    const remaining = this.delay - elapsed;

    if (elapsed > this.delay) {
      // Reset flags
      this.indicators.forEach(indicator => (this.component[indicator] = false));

      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Reset flags
        this.indicators.forEach(
          indicator => (this.component[indicator] = false)
        );

        resolve(true);
      }, remaining);
    });
  }
}
