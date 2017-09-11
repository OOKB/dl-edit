import { connect } from 'react-redux'
import { imageSelector, handleSelect } from 'cape-mixer/lib/image'
import MenuEl from 'cape-mixer/lib/Menu/MenuEl'
import { menuActions, menuSelector } from '../select/menu'

import { drawerActions, drawerEdit, drawerSelector } from '../select/homeDrawer'
import DrawerEditPg from './DrawerEdit'
import HomeDrawerPg from './HomeDrawerPg'
import ImageUploadPg from './ImageUploadPg'

export const DrawerEdit = connect(drawerEdit)(DrawerEditPg)
export const HomeDrawer = connect(drawerSelector, drawerActions)(HomeDrawerPg)
export const ImageUpload = connect(imageSelector, { handleSelect })(ImageUploadPg)
export const Menu = connect(menuSelector, menuActions)(MenuEl)
