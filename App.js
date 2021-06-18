import React,{useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import CoinItem from './components/CoinItem'
const App = () => {
  const [coins, setcoins] = useState([])
  const loadData=async ()=>{
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    const data = await res.json();
    setcoins(data)
  }
  useEffect(()=>{
    loadData();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar
      backgroundColor="#141414"
      />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput style={styles.searchInput}/>
      </View>
      <FlatList 
        style={styles.list}
        data={coins}
        renderItem={({item})=>{
          return <CoinItem coin={item}/>
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#141414',
    alignItems:'center',
    flex: 1,
  },
  title:{
    color:'#fff',
    margin: 10,
    fontSize:20,
  },
  list:{
    width: '90%',

  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    width: '90%',
    marginBottom:10,
  },
  searchInput:{
    color: '#fff',
    borderBottomColor:'#4657CE',
    borderBottomWidth:1,
    textAlign:'center',
    with:'40%'
  }
})

export default App
