import { View, Text, StyleSheet } from 'react-native'

export default function Information() {
  return (
    <View style={styles.container}>
      <Text>Information</Text>
      <Text>
        This app comes from the idea of keeping a track of all the details of
        characters and locations from books, but avoiding spoilers from going
        onto wiki sites or reddit
      </Text>
      <Text>
        The way this app works is you input a book you are just about to tuck
        into, and from there you can add characters and locations, and the
        information that helps to keep a track of who they are, and what their
        connection to the story is
      </Text>
      <Text>
        To add some information into the tomes of knowledge simply hit the plus
        button below and fill out the details
      </Text>
      <Text>
        If you don't know all the details, then don't fret, simply leave it
        blank and you can always come back and update them with more information
        that comes to light as you read.
      </Text>
      <Text>
        To see all the information you have have entered, click on the book icon
        below to open the tomes and begin discovering
      </Text>
      <Text>
        To make life easier for you, you can easily choose to filter the
        information by you current book to see only those relevant to your
        current journey
      </Text>
      <Text>
        If you finish a book and decide to read another, easy, simply mark the
        new book as currently read and then away you go
      </Text>
      <Text> ADD SOME MORE / BETTER HOW TO USE INFORMATION </Text>
      <Text> and anything else that should be in this section </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBE2CC',
  },
})
