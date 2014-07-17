module.exports = {
  server: {
    base: '/'
    , host: 'localhost'
    , target: 'http://www.google-analytics.com'
    , port: 9010
    , bindAddress: '0.0.0.0'
  },
  plugins: [
    'request_header_logger'
  , 'response_header_logger'
  , 'no_favicon'
  , {
      name: 'country_filter',
      options: {
        blackList: ['CN']
      }
    }
  ]
};