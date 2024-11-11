/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { PokemonApp } from './src/PokemonApp';

AppRegistry.registerComponent(appName, () => PokemonApp);
