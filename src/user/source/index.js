function buildMakeSource ({ isValidIp }) {
    return function makeSource ({ ip, browser } = {}) {
      if (!ip) {
        throw new Error('User source must contain an IP.')
      }
      if (!isValidIp(ip)) {
        throw new RangeError('User source must contain a valid IP.')
      }
      return Object.freeze({
        getIp: () => ip,
        getBrowser: () => browser
      })
    }
  }

export {buildMakeSource}