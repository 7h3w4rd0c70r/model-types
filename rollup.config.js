
import babel from 'rollup-plugin-babel'

export default {
    entry: 'src/index.js',
    dest: 'dist/model-types.js',
    format: 'cjs',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
