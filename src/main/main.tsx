import { AppRegistry } from 'react-native';
import { Bootstrap } from '@src/main/bootstrap';

// AppRegistry.registerComponent('Main', () => Bootstrap);

import CodePush from 'react-native-code-push';
/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
const CPBootstrap = CodePush(codePushOptions)(Bootstrap);
AppRegistry.registerComponent('Main', () => CPBootstrap);




