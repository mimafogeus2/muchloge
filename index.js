console.loge = function() {
  var DOGE_WORDS = ['much', 'very', 'many', 'so', 'amaze', 'such']
  var RED_PRIME_DIVIDER = 3
  var GREEN_PRIME_DIVIDER = 5
  var BLUE_PRIME_DIVIDER = 11
  var DOGE_CSS = 'font-family: "Comic Sans MS", cursive, sans-serif; font-size: 18px; font-weight: bold;'
  var CIRCULAR_REFERENCE_ERROR = '<Object with Circular Reference>'

  var inputToNumReducer = function (num, v) {
    return num + v.charCodeAt()
  }

  var valueToString = function(x) {
    if (x.constructor === Array) {
      return '[' + x.toString() + ']'
    } else if (x.constructor === Object) {
      try {
        return JSON.stringify(x)
      }
      catch (e) {
        return CIRCULAR_REFERENCE_ERROR
      }
    } else {
      return x.toString()
    }
  }

  var generateColoredArgs = function(acc, x) {
    var num = Array.from('' + x).reduce(inputToNumReducer, 0)
    var prefix = DOGE_WORDS[num % DOGE_WORDS.length]
    var r = Math.round(num / RED_PRIME_DIVIDER) % 2 ? 'FF' : '00'
    var g = Math.round(num / GREEN_PRIME_DIVIDER) % 2 ? 'FF' : '00'
    var b = Math.round(num / BLUE_PRIME_DIVIDER) % 2 ? 'FF' : '00'
    var color = (r === 'FF' && g === 'FF' && b === 'FF') ? '#FF69B4' : '#' + r + g + b
    var css = 'color: ' + color + '; ' + DOGE_CSS
    acc.str.push('%c' + prefix + ' ' + valueToString(x) + '.')
    acc.styles.push(css)
    return acc
  }

  var args = Array.from(arguments)
  var coloredArgs = args.reduce(generateColoredArgs, {str: [], styles: []})
  coloredArgs.str.push('%cWow.')
  coloredArgs.styles.push('color: #FF69B4; ' + DOGE_CSS)
  console.log(coloredArgs.str.join(' '), ...coloredArgs.styles)
}
