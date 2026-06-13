export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/upload/index',
    'pages/pet/index',
    'pages/album/index',
    'pages/mine/index',
    'pages/detail/index',
    'pages/pet-detail/index',
    'pages/album-detail/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '萌宠相册',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F8F5F2'
  },
  tabBar: {
    color: '#B2BEC3',
    selectedColor: '#FF6B6B',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/upload/index',
        text: '上传'
      },
      {
        pagePath: 'pages/pet/index',
        text: '宠物'
      },
      {
        pagePath: 'pages/album/index',
        text: '专题'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})