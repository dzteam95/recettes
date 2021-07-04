import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity,FlatList, View, StyleSheet, Text, Button} from 'react-native';

const Fiche = ({navigation, route}) => {
    const item = route.params.item;
    const [description, setDescription] = useState();
    const [photo, setPhoto] = useState();
    const [Lists, setLists] = useState();
    const [url, setUrl] = useState();
    const [resultat, setResultat] = useState();
    const [titre, setTitre] = useState();
    const axios = require('axios');

    useEffect(() => {
        searchRecetteFiche();
        return;
    }, []);

  const  searchRecetteFiche = async () => {

        axios.get(`https://api.spoonacular.com/recipes/${item}/information`, {
                params: {
                    apiKey: '59e3c7b6206646d08c458cc212d07e1c',
                },
            })
            .then(function (response) {
                const tab = JSON.parse(response['request']['_response']);

                setResultat(response['request']['_response']);
                setTitre(obj['title']);
                setLists(obj['extendedIngredients']);
                setUrl(obj['spoonacularSourceUrl']);
                setDescription(obj['summary']);
                setPhoto(obj['image']);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });


    };
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Image style={styles.tinyLogoGeneral} source={{uri: img}} />
            </View>
            <View style={styles.containerBottom}>
                <View style={styles.containerBottomOne}>
                    <Text style={styles.infoGeneral}>
                        <Button
                            onPress={() => navigation.replace('RecetteList')}
                            title={`< Go back`}
                            style={styles.infoGeneral}
                        />
                        {title}
                    </Text>
                </View>
                <View style={styles.containerBottomTwo}>
                    <FlatList
                        enableEmptySections={true}
                        style={styles.eventList}
                        data={ingreList}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.menuBoxList}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.replace('RecetteDetail', {item: item.id})
                                        }>

                                        <Text style={styles.infoName}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.containerBottomThree}>
                    <Text style={styles.infoGeneral}>{desc}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        // height:10000,
        // padding: 20,
    },
    containerHeader: {
        flex: 3,
        // backgroundColor: "red"
    },
    containerBottom: {
        flex: 8,
        margin: 20,
        // backgroundColor: "red"
    },
    tinyLogoGeneral: {
        width: '100%',
        height: '100%',
    },
    infoGeneral: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        marginTop: 25,
    },
    containerBottomOne: {
        flex: 2,
    },
    containerBottomTwo: {
        flex: 8,
    },
    containerBottomThree: {
        flex: 2,
    },
    menuBoxList: {
        backgroundColor: COLORS.lightGray,
        padding: 5,
        marginTop: 10,
    },
});

export default Fiche;