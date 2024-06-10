import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MenuButton from '@/components/MenuButton';

export default function Index() {
  return (
    <View id='Container' style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View id='Grid' style={styles.gridContainer}>
        <MenuButton title="Wallet composition" href="/WalletComposition" iconName="wallet-outline" iconLibrary="Ionicons" />
        <MenuButton title="Add purchase" href="/AddPurchase" iconName="cart-outline" iconLibrary="Ionicons" />
        <MenuButton title="Statement" href="/Statement" iconName="file-invoice-dollar" iconLibrary="FontAwesome5" />
        <MenuButton title="New objective" href="/NewObjective" iconName="bar-graph" iconLibrary="Entypo" />
        <MenuButton title="My investments" href="/MyInvestments" iconName="bank" iconLibrary="FontAwesome" />
        <MenuButton title="Add member" href="/AddMember" iconName="group-add" iconLibrary="MaterialIcons" />
        <MenuButton title="Recommendation" href="/Recommendation" iconName="clipboard-notes" iconLibrary="Foundation" />
        <MenuButton title="Help" href="/Help" iconName="warning-outline" iconLibrary="Ionicons" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 20,
    gap: 10,
  },
});