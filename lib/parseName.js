// addd[d=ee][ddd=eee]

const reg = /(\[[^[\]]+\]+)/g
/**
 * 解析文件名中配置信息
 * @param {string} pattern 特定形式的文件名字
 * @example
 * parseFileName('name[rename]')
 * => {name:'name',rename:true}
 * parseFileName('name[rename=true]')
 * => {name:'name',rename:true}
 */
function parseFileName (pattern = '') {
  let name = pattern.split(reg)[0]
  let opts = parseOptions(pattern.match(reg))
  return { ...opts, name }
}

function parseValue (val) {
  if (val === 'true') return true
  if (val === 'false') return false
  return val
}

function parseOptions (opts) {
  const config = {}
  if (!opts) return config
  opts.forEach(opt => {
    let [key, val = true] = opt.replace(/[\][]/g, '').split('=')
    config[key] = parseValue(val)
  })
  return config
}
module.exports = parseFileName