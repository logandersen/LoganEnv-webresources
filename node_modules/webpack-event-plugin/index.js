class WebpackEventPlugin {
    /**
    * @constructor
    * @param {object} events - Event hooks to run callbacks for
    */
    constructor(events) {
        this.events = events;
    }

    /**
    * Apply plugin to webpack
    * @param {object} compiler
    */
    apply(compiler) {
        for (let event of this.events) {
            let hook = compiler.hooks[event.hook];
            
            if (hook != null) {
                hook.tap('Webpack Event Plugin', event.callback);
            } else {
                console.log('No compiler hook ' + event.hook);
            }
        }
    }
}

module.exports = WebpackEventPlugin;