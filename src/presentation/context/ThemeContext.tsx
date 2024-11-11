import { PropsWithChildren, createContext } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme: LightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkTheme : LightTheme;

    return (
        <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}
                settings={{
                    icon: props => <FontAwesome6 {...props} />,
                }}>
                <ThemeContext.Provider
                    value={{
                        isDark,
                        theme,
                    }}>
                    {children}
                </ThemeContext.Provider>
            </PaperProvider>
        </NavigationContainer>
    );
};