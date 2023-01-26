import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();

// Stack of screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Assignment 1', 
            headerTitleAlign: 'center',
            headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen name="Hall Pass" 
          component={HallPass}
          options={{ 
            title: ''
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Instructions to display
const instruct = 'This is a fill in the blank game, where you are given prompts on what type of word to fill in.\n\n' + 
'Fill in the three fields with the proper word type, and press the "Make Hall Pass" button.\n\n' + 
'From there, let hilarity ensue.';

// picture for top left
const squarePic = {uri: 'https://i1.wp.com/www.equinoxpub.com/blog/wp-content/uploads/2014/03/MadLibsIT.jpg'};
// picture for title
const titlePic = {uri: 'https://keysweekly.com/wp-content/uploads/2019/09/madlibs.png'};
// function to get and format the date
const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return date + '.' + month + '.' + year;
}
// dismiss the keyboard on background press
const dismissKeyboard = () => {
  Keyboard.dismiss();
}

// First Page: The text entry
const HomeScreen = ({navigation}) => {

  const [name, onChangeName] = React.useState('');
  const [noun, onChangeNoun] = React.useState('');
  const [event, onChangeEvent] = React.useState('');

  return(
    <Pressable style={styles.container} onPress={dismissKeyboard}>
      {/* Display the instructions */}
      <View>
        <Text style={styles.inst}>{instruct}</Text>
      </View>

      {/* Display the text inputs */}
      <View>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder={'Name'}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeNoun}
          value={noun}
          placeholder={'Noun'}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeEvent}
          value={event}
          placeholder={'An Event'}
        />
      </View>

      {/* Display the Make Pass Button */}
      <View>
        <Pressable
          onPress={() => {navigation.navigate('Hall Pass',
          {name: name, noun: noun, event: event}
          );}}
        >
          <View style={styles.makePassBtn}>
            <Text style={styles.btnText}>Make Hall Pass</Text>
          </View>
        </Pressable>
      </View>

      <View>
      {/* Reset the variables to their original values */}
        <Pressable onPress={() => 
          {onChangeName(''),
          onChangeNoun(''),
          onChangeEvent('')}}>
          <View style={styles.clearBtn}>
            <Text style={styles.btnText}>Clear</Text>
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

// Second page: The "Hall Pass"
const HallPass = ({navigation, route}) => {
  return(
    <View style={styles.container2}>
      <View style={styles.leftBanner}>
        <View style={styles.funPic}>
          <ImageBackground source={squarePic} resizeMode='cover' style={styles.image}></ImageBackground>
        </View>

        <View style={styles.hallPass}>
          <Text style={styles.hallPassText}>Hall Pass</Text>
        </View>
      </View>

      <View style={styles.mainBody}>
        <View style={styles.title}>
          <ImageBackground source={titlePic} resizeMode='cover' style={styles.image}></ImageBackground>
        </View>

        <View style={styles.date}>
          <Text style={styles.dateText}>Date: </Text>
          <Text style={[{textDecorationLine: 'underline'}, styles.dateText]}>  {getCurrentDate()}  </Text>
        </View>

        {/* This code looks a little messy, but it's <Text> within <Text> to only underline the passed variables */}
        <View style={styles.madLib}>
          <Text style={styles.madLibText}>{'\t\t\t'}
            <Text style={styles.madLibVar}>{'  '}{route.params.name}{'  '}</Text> {/* Underlining the variables */}
            {' '}is too cool for{' '}{/*        For some reason, these v spaces don't like to show depending on page layout, no idea why */}
            <Text style={styles.madLibVar}>{'  '}{route.params.noun}{'  '}</Text> {/* Underlining the variables */}
            class.
          </Text>
          <Text style={styles.madLibText}>{'\t\t\t'}Instead, they will be attending the{'\n'}
            <Text style={styles.madLibVar}>{'  '}{route.params.event}{'  '}</Text>. {/* Underlining the variables */}
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureText}>Signed:</Text>
        </View>
      </View>
    </View>
  )
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inst: {
    padding: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: 250,
    fontSize: 20,
  },
  makePassBtn: {
    width: 300,
    height: 50,
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
  },
  clearBtn: {
    width: 150,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  leftBanner: {
    width: '30%',
    height: '100%',
    flexDirection: 'column',
  },
  funPic: {
    height: '20%',
    padding: 5,
  },
  hallPass: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  hallPassText: {
    width: '400%',
    transform: [{rotate: '-90deg'}],
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  mainBody: {
    width: '70%',
    height: '100%',
    flexDirection: 'column',
  },
  title: {
    height: '10%',
  },
  date: {
    flexDirection: 'row',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 25,
  },
  madLib: {
    height: '70%',
    justifyContent: 'center',
    padding: 10,
  },
  madLibText: {
    fontSize: 25,
    margin: 15,
    lineHeight: 50,
  },
  madLibVar: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 25,
    margin: 15,
    lineHeight: 60,
  },
  signature: {
    borderWidth: 3,
    height: '10%',
    marginTop: 25,
    marginRight: 15,
  },
  signatureText: {
    fontSize: 20,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
