import { useContext } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    style?: StyleProp<ImageStyle>;
}

export const PokemonLogo = ({ style }: Props) => {
    const { isDark } = useContext(ThemeContext)

    const logo = isDark
        ? require('../../../assets/pokeball-light.png')
        : require('../../../assets/pokeball-dark.png')

    return (
        <Image
            source={logo}
            style={[
                {
                    width: 300,
                    height: 300,
                    opacity: 0.3,
                },
                style
            ]}
        />
    )
}
