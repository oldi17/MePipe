import { SideBar } from "./SideBar.interface"

const viewerSideBar: SideBar = {
  current: 'main',
  elements: [
    {
      id: 'main',
      url: '/',
      img: '/static/main',
      title: 'Главная',
    },
    {
      id: 'subscriptions',
      url: '/subscriptions',
      img: '/static/subscriptions',
      title: 'Подписки',
    },
    {
      id: 'library',
      url: '/library',
      img: '/static/library',
      title: 'История',
    },
  ]
}

const creatorSideBar: SideBar = {
  current: '/creator/main',
  elements: [
    {
      id: 'main',
      url: '/creator/main',
      img: '/static/cr-main',
      title: 'Главная',
    },
    {
      id: 'videos',
      url: '/creator/videos',
      img: '/static/cr-videos',
      title: 'Видео',
    },
    {
      id: 'settings',
      url: '/creator/settings',
      img: '/static/cr-settings',
      title: 'Настройки канала',
    },
  ]
}

export {viewerSideBar, creatorSideBar,}