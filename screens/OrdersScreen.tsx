import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootStackParamList } from '../navigator/RootNavigator'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/base';
import OrderCard from '../components/OrderCard';





export type OrderScreenNavigationProp=CompositeNavigationProp<
 BottomTabNavigationProp<TabStackParamList,'Orders'>,
 NativeStackNavigationProp<RootStackParamList> 
 
>;


const OrdersScreen = () => {
  const tw=useTailwind();
  const navigation=useNavigation<OrderScreenNavigationProp>();
  const {loading ,error,orders}= useOrders()
  const [ascending,setAscendig]= useState<boolean>(false) 


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
      tabBarLabel:({ focused, color}) =>(
        <Text style={{ color: focused ? "red" : color, fontSize: 10 }}>
          Orders
        </Text>
      )
    })

  },[]);
  
  return (
   <ScrollView style={{ backgroundColor: "#EB6A7C"}} >
    <Image
      source={{uri: "https://links.papareact.com/m51"}}
      containerStyle={tw("w-full h-64")}
      PlaceholderContent={<ActivityIndicator/>}
   
    />

    <View>
      <Button 
        color="pink"
        titleStyle={{ color:"gray",fontWeight:"400"}}
        style={tw("py-2 px-5")}
        onPress={() => setAscendig(!ascending) }>
        {ascending ? "Showing: Oldest First": "Showing: Most Recent First"}
      </Button>

      {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}

      

    </View>
  
    
   </ScrollView>

  )
}
  


export default OrdersScreen