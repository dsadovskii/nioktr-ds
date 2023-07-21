import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'

//Numeral
Vue.filter('number', (value, decimals = 2) => {
  if (value == null) return null

  let deciamlsString = ''.padStart(decimals, '0')
  return numeral(value)
    .format('0,0.' + deciamlsString)
    .replace(/,/g, ' ')
})
Vue.filter('numberToShort', value => {
  if (value == null) return null
  return numeral(value)
    .format('0.0a')
    .toUpperCase()
})

//nl22br
Vue.filter('nl2br', value => {
  if (value == null) return null
  return ('' + value).replace(/(?:\r\n|\r|\n)/g, '<br />')
})

// plural (ru)
// deprecated

Vue.filter('declOfNum', (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  ]
})

// plural (ru)

Vue.filter('pluralize', n => {
  return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
})

Vue.filter('implode', (value, field, separator = ',') => {
  return value.map(v => v[field]).join(`${separator} `)
})

Vue.filter('simpleDate', (value, year) => {
  if (year) return moment(value, 'YYYY-MM-DD').format('YYYY')
  return moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY')
})

Vue.filter('dateFormat', (date, format) => {
  if (!date) return null
  return moment(date.constructor === String ? new Date(date) : date).format(format || 'DD MMM YYYY')
})

Vue.filter('upperFirst', value => value.charAt(0).toUpperCase() + value.slice(1))

Vue.filter('creditCard', n =>
  n
    .toString()
    .match(/\d{4}/g)
    .join(' '),
)
