import reducer, { addRoutes } from 'location-info'

export const routes = {
  home: '/',
  homeDrawer: '/home-drawer',
  drawerEdit: '/home-drawer/:id',
  image: '/image-upload',
}
export const locInfo = reducer(undefined, addRoutes(routes))
export default {
  db: {
    cdnUrl: 'http://dl-f.imgix.net/',
  },
  firebase: {
    config: {
      apiKey: 'AIzaSyDmoWCc7mwN02lTBrp0mKmh8oeu_k86C5U',
      authDomain: 'delanylong.firebaseapp.com',
      databaseURL: 'https://delanylong.firebaseio.com',
      storageBucket: 'delanylong.appspot.com',
    },
    entityType: {
      HomeDrawer: true,
      ImageObject: true,
      MediaObject: true,
      OrderTrackItem: true,
      WebAppSetting: true,
    },
  },
  locInfo,
}
