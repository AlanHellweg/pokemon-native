import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Pokemon } from '../../../domain/entities/pokemon'
import { Card, Text } from 'react-native-paper';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';
import { isColorLight } from '../../../config/helpers/functions';
import { PokemonLogo } from '../ui/PokemonLogo';

interface Props {
    pokemon: Pokemon;

}

export const PokemonCard = ({ pokemon }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const textColor = isColorLight(pokemon.color) ? '#373737' : 'white';

    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('PokemonScreen', { pokemonId: pokemon.id })}
        >
            <Card style={[styles.cardContainer, { backgroundColor: pokemon.color }]}>
                <View style={styles.contPic}>
                    <PokemonLogo style={styles.pokeball} />
                    <FadeInImage
                        uri={pokemon.avatar}
                        style={styles.pokemonImage}
                    />
                </View>
                <Text style={[styles.type, { color: pokemon.color }]}>
                    {pokemon.types[0]}
                </Text>
                <Text lineBreakMode='middle' variant='bodyLarge' style={[styles.name, { color: textColor }]}>
                    {pokemon.name}
                </Text>
                <Text style={[styles.description, { color: textColor }]}>
                    {pokemon.description}
                </Text>
            </Card>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        position: 'relative',
        flex: 0.5,
        marginBottom: '30%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 'auto',
        padding: 10,
    },
    pokeball: {
        width: 100,
        height: 100,
        opacity: 0.4,
        zIndex: 1,
    },
    pokemonImage: {
        width: "50%",
        aspectRatio: '1/1',
        objectFit: 'contain',
        zIndex: 2,
        position: 'absolute',
        top: -85
    },
    contPic: {
        width: "100%",
        position: 'absolute',
        height: 'auto',
        top: -50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    type: {
        alignSelf: 'center',
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#ccc',
        borderRadius: 12,
        textAlign: 'center',
        color: 'white',
        marginTop: '40%',
        fontWeight: 'bold',
    },
    name: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        color: 'white',
        margin: 0,
        fontSize: 14
    },
});