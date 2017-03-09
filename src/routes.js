import createRouter from 'location-info'

const { addRoutes, locationInfo } = createRouter({ trailingSlash: false })
addRoutes({
  home: '/',
  drawer: '/home-drawer',
  drawerEdit: '/home-drawer/:id',
  image: '/image-upload',
})

export default locationInfo
