// add `--allow-natives-syntax` flag to use
export default fn => %OptimizeFunctionOnNextCall(fn)
