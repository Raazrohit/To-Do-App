import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputText !== '') {
      if (editMode) {
        // Edit existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = inputText;
        setTodos(updatedTodos);
        setInputText('');
        setEditMode(false);
        setEditIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, inputText]);
        setInputText('');
      }
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setInputText(todos[index]);
  };

  return (

    <ScrollView>

    <View style={{padding:30}} >
      <Text style={{textAlign:"center",fontSize:30}}>Todo List</Text>
      <TextInput
      style={styles.textInput}
        placeholder="Enter a task"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title={editMode ? 'Update' : 'Add'} onPress={addTodo} />
      <View style={{padding:10}} ></View>
      {todos.map((todo, index) => (
        <View key={index} style={styles.dataWrapper}>
          <Text style={{flex:1}} >{todo}</Text>
          <View style={{flex:1}} ><Icon
            name="edit"
            type="material"
            onPress={() => editTodo(index)}
            size={20}
          /></View>
          <View style={{flex:1}} ><Icon
            name="delete"
            type="material"
            onPress={() => deleteTodo(index)}
            size={20}
          /></View>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  dataWrapper:{
    flexDirection:"row",
    justifyContent:"flex-end",
    backgroundColor:"orange",
    // margin:5,
    // padding:8

  },
  textInput:{
    borderWidth:2,
    marginBottom:10,
    borderColor:"blue",
    paddingLeft:10
  }
})
export default TodoList;
