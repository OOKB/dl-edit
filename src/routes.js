import createRouter from 'location-info'

const { addRoutes, locationInfo } = createRouter({ trailingSlash: false })
addRoutes({
  home: '/',
  drawer: '/home-drawer',
  image: '/image-upload',
})

export default locationInfo
