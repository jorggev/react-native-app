import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "./components/Modal";
import TextInput from "./components/TextInput";
import FlatList from "./components/FlatList";

import AntDesign from "@expo/vector-icons/FontAwesome";

export default function App() {
  const [name, setName] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  const onHandleChangeName = (text) => setName(text);

  const addItem = () => {
    if (name === "") {
      return;
    }
    setItemsList((prevState) => [
      ...prevState,
      { id: Math.random(), value: name },
    ]);
    setName("");
  };

  const renderListItem = ({ item, index }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.textItem}>{item.value}</Text>
        <View style={styles.buttonContainer}>
          <AntDesign
            name="close"
            size={25}
            color={"#ff5471"}
            onPress={() => {
              onHandleModal(index);
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const onHandleDelete = (confirmDelete) => {
    if (confirmDelete) {
      let array = itemsList.slice();
      array.splice(itemSelected, 1);
      setItemsList(array);
    }
    setModalVisible(false);
    setItemToDelete("");
  };

  const onHandleModal = (index) => {
    setModalVisible(true);
    setItemSelected(index);

    const selectedItem = itemsList[index].value;
    setItemToDelete(selectedItem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TASKS</Text>
      <View style={styles.inputContainer}>
        <TextInput name={name} onHandleChangeName={onHandleChangeName} />
        <View style={styles.buttonAdd}>
          <AntDesign
            name="plus"
            size={20}
            color={"#fffaf2"}
            onPress={addItem}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList itemsList={itemsList} renderListItem={renderListItem}/>
      </View>
      <Modal
        modalVisible={modalVisible}
        onHandleDelete={onHandleDelete}
        itemToDelete={itemToDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 35,
    backgroundColor: "#16233d",
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
    marginBottom: 25,
    color: "#e2e2e2",
  },
  inputContainer: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fffaf2",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonAdd: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16233d",
    padding: 10,
    borderRadius: 5,
    width: 50,
  },
  listContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  itemContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 7,
    backgroundColor: "#fffaf2",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 15,
    color: "#17202A",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});