
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
  
} from 'reactotron-react-native'

Reactotron
  .configure({
    name: 'BiBigChannel',
    host: '192.168.2.179',
    port: 9090
  })
  .use(trackGlobalErrors({offline: true}))
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage()) // {ignore: ['M.Iis[]'] }
  .use(networking())
  .connect();


  //   npm i --save-dev reactotron-react-native

