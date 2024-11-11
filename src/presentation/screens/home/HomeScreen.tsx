import { FlatList, Image, StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PokemonLogo } from '../../components/ui/PokemonLogo';
import { Pokemon } from '../../../domain/entities/pokemon';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDispatch } from 'react-redux';
import { addPokemons } from '../../../store/slices';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { };

export const HomeScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch()
    const { top } = useSafeAreaInsets()
    const theme = useTheme()
    const { isLoading, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60,
        queryFn: async params => {
            const pokemons = await getPokemons(params.pageParam);
            dispatch(addPokemons(pokemons))

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
    });

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <View style={globalTheme.globalMargin}>
            <PokemonLogo style={styles.imgPosition} />
            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(pokemon: Pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={() => (
                    <View style={{ height: 100, marginBottom: 50 }}>
                        <Image
                            source={require('../../../assets/logoBlack.png')}
                            style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                )}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                onEndReachedThreshold={0.6}
                onEndReached={() => { fetchNextPage() }}
                showsVerticalScrollIndicator={false}
            />
            {isFetchingNextPage ? (
                <Text>Cargando...</Text>
            ) : ''}
            <FAB
                style={[globalTheme.fab, { backgroundColor: theme.colors.background }]}
                mode='elevated'
                onPress={() => { navigation.push('SearchScreen') }}
                color={theme.dark ? 'white' : 'black'}
                label='Buscar'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
})