import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList } from 'react-native';
import firebase from '../../firebase';
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import Header from '../Header';
import Footer from '../Footer';

export default function HortiFruti({navigation}) {
  
  const [hortiFruti, setHortiFruti] = useState([]);

  useEffect(
    () => navigation.addListener('focus', () => {
        pegaHortiFruti()
    }),[]
  )

  const  pegaHortiFruti = async () => {
  const prods = firebase.db.collection("produtos");
  const querySnapshot = await prods.where('Departamento', '==', 'HortiFruti').get();
  const items = querySnapshot.docs;
  const listHortiFruti = [];
  items.forEach(
      doc => {
        listHortifruti.push({ 
              ...doc.data(),
              key: doc.id
        })
      })    
      setHortiFruti(listHortiFruti);
  }
  
  return(
    <View style={{backgroundColor: "#FFF"}}>
      <Header />
      <View style={styles.bgtitulo}>
          <Text style={styles.titulo}>HortiFruti</Text>
      </View>
      <FlatList
        horizontal
        data={hortiFruti}
        renderItem = { ({item}) =>(
          <View style={{paddingHorizontal: 10}}>
            <ImagedCarouselCard
            width={300}
            height={300}
            shadowColor="#051934"
            source={{uri: `${item.urlImg}`}}
            text={`${item.Nome} \nR$: ${item.Preço}`}
            overlayBackgroundColor={"#2E3192DD"}
            />
          </View>
        )}
      />
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo:{
    fontSize: 26,
    textAlign: 'center',
    padding: 20,
    fontFamily: "sans-serif-light",
  },
  bgtitulo:{
    width: Dimensions.get('window').width,
    backgroundColor: "#CCC",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  texto:{
    fontSize: 15,
    textAlign: 'center',
    padding: 20,
  },
  bgtexto:{
    width: Dimensions.get('window').width,
    backgroundColor: "#2E319222",
    marginVertical: 10,
  },
  img: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/1.3,
  },
});
