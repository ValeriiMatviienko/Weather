import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';

export default function GetQuotes() {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const getQuote = async () => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      setQuote(response.data[0].q);
      setAuthor(response.data[0].a);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.author}>{author}</Text>
      <Button
        buttonColor="teal"
        icon="book-search-outline"
        mode="contained"
        onPress={getQuote}>
        Get Quote
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  author: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
  },
  quote: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#a881af',
  },
});
