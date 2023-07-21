export class MediaGenerator {
  constructor(params, media = ['s', 'm', 'l', 'xl']) {
    this.params = params
    this.media = media
  }
  generateProps(type = [Number, String]) {
    let props = {}
    this.params.forEach(param => {
      props[param] = {
        type: type,
      }
    })
    this.media.forEach(grid => {
      this.params.forEach(param => {
        props[`${param}-${grid}`] = {
          type: type,
        }
      })
    })
    return props
  }
}
