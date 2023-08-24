import { SideBar } from "./Layout.interface";

const viewerSideBar: SideBar = {
  current: 'main',
  elements: [
    {
      id: 'main',
      url: '/',
      img: 'main',
      title: 'Главная',
    },
    {
      id: 'subscriptions',
      url: '/subscriptions',
      img: 'subscriptions',
      title: 'Подписки',
    },
    {
      id: 'library',
      url: '/library',
      img: 'library',
      title: 'Библиотека',
    },
  ]
}

const creatorSideBar: SideBar = {
  current: 'main',
  elements: [
    {
      id: 'main',
      url: '/creator',
      img: 'cr-main',
      title: 'Главная',
    },
    {
      id: 'videos',
      url: '/creator/videos',
      img: 'cr-videos',
      title: 'Видео',
    },
    {
      id: 'settings',
      url: '/creator/settings',
      img: 'cr-settings',
      title: 'Настройки',
    },
  ]
}

export {viewerSideBar, creatorSideBar,}