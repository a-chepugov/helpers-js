/**
 * @name sleep
 * @memberof Standard/Promise
 * @param {Number} timeout
 * @return {Promise<Number>}
 */
export default ( timeout: number ) =>
    new Promise( ( resolve ) => setTimeout( resolve, timeout, timeout ) );