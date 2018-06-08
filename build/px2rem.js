const postcss = require('postcss')
const pxRegExp = /\b(\d+(\.\d+)?)px\b/

const defaultConfig = {
    remUnit: 75,
    remPrecision: 6,
    keepComment: 'no',
}

function getCoverValue(value, config) {
    const pxGlobalRegExp = new RegExp(pxRegExp.source, 'g')

    function getValue(val) {
        val = parseFloat(val.toFixed(config.remPrecision))
        return val == 0 ? val : val + 'rem'
    }

    return value.replace(pxGlobalRegExp, function ($0, $1) {
        return getValue($1 / config.remUnit)
    })
}

module.exports = postcss.plugin('px2rem', function (opts) {
    opts = Object.assign({}, defaultConfig, opts)

    return function (css) {
        css.walkDecls(function (decl) {
            if (!decl || !(decl.type === 'decl' && pxRegExp.test(decl.value))) {
                return
            }
            const nextDecl = decl.next()
            if (nextDecl && nextDecl.type === 'comment' && nextDecl.text.trim() === opts.keepComment) {
                return
            }

            decl.value = getCoverValue(decl.value, opts)
        })
    }
})
