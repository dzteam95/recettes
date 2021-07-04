import React, {useState, useEffect} from 'react';
import {Text, View, Image,StyleSheet,TouchableOpacity, FlatList,} from 'react-native';

const Recettes = ({navigation}) => {
    const [resultat, setResultat] = useState();
    const axios = require('axios');

    useEffect(() => {
        searchRecette();
        return;
    }, []);

   const searchRecette = async () => {

        axios.get('https://api.spoonacular.com/recipes/complexSearch?', {
                params: {
                    query: 'a',
                    apiKey: '59e3c7b6206646d08c458cc212d07e1c',
                },
            })
            .then(function (response) {
                const tab = JSON.parse(response['request']['_response']);

                setResultat(tab.results);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={result}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                        <View style={styles.menuBoxList}>
                            <TouchableOpacity
                                style={styles.containerLight}
                                onPress={() =>
                                    navigation.replace('RecetteFiche', {item: item.id})
                                }>
                                <View style={styles.eventContentFirst}>
                                    <Image
                                        style={styles.tinyLogoGeneral}
                                        source={{uri: item.image}}
                                    />
                                    <Text style={styles.infoGeneral}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tinyLogoGeneral: {
        flex: 1,
        width: 40,
        height: 40,
        margin: 20,

    },
    infoGeneral: {
        flex: 8,
        margin: 20,
    },
    infoSun: {
        fontSize: 14,
        fontWeight: '500',
        color: '#E1BF0E',
        marginTop: 20,
        paddingLeft: 20,
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    },
    eventContentFirst: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.lightGray,
        padding: 5,
        marginTop: 10,
    },
});

export default Recettes;