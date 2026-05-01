import React, {useContext} from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function DepartmentScreen(){

 const {user} = useContext(AuthContext);

 return(

  <View>

   <Text>Nom : {user.nom}</Text>

   <Text>Département : {user.departement}</Text>

  </View>

 )

}