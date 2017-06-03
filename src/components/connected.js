import { connect } from 'react-redux'
import { imageSelector, handleSelect } from 'cape-mixer/lib/image'
import { menuActions, menuSelector } from '../select/menu'

import { drawerActions, drawerEdit, drawerSelector } from '../select/homeDrawer'
import DrawerEditPg from './DrawerEdit'
import HomeDrawerPg from './HomeDrawerPg'
import MenuEl from './Menu'
import ImageUploadPg from './ImageUploadPg'

export const DrawerEdit = connect(drawerEdit)(DrawerEditPg)
export const HomeDrawer = connect(drawerSelector, drawerActions)(HomeDrawerPg)
export const ImageUpload = connect(imageSelector, { handleSelect })(ImageUploadPg)
export const Menu = connect(menuSelector, menuActions)(MenuEl)
