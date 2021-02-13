/*
  Library to handle intersection observer functionalities.
  https://codesandbox.io/s/0xq11z660v
*/
export class NativeIntersectionObserver {
  options = {
    threshold: 0,
  };
  _elementMap = new Map();
  obsvr = {};

  // when set to true, callback will be execute only once for a target
  observeOnce = false;

  // Initialize options
  constructor({ options, observeOnce = false }) {
    this.options = options;
    this.observeOnce = observeOnce;
    this._elementMap = new Map();
    this.obsvr = new IntersectionObserver(this.callBack, this.options);
  }

  // Intersection observer callback method
  callBack = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      this._elementMap.get(entry.target)(entry);
      this.observeOnce && this.unobserve(entry.target);
    });
  };

  // Consumer calls this public method to observe an element
  observe = (target, onIntersect) => {
    if (!target) return;
    this._elementMap.set(target, onIntersect);
    this.obsvr.observe(target);
  };

  // Consumer calls this public method to unobserve an element
  unobserve = (target) => {
    if (!target) return;
    this.obsvr.unobserve(target);
    this._elementMap.delete(target);
  };
}

export default NativeIntersectionObserver;
