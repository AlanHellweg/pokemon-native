import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';

const queryClient = new QueryClient()

export const PokemonApp = () => {

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider>
                    <StackNavigator />
                </ThemeContextProvider>
            </QueryClientProvider>
        </Provider>
    )
}
