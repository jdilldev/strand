import { SafeAreaView, } from 'react-native-safe-area-context';
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, TextInput, View, TouchableOpacity } from 'react-native';
import { AnchorThread, DmcThread, Thread } from '../../components/Thread';
import { useContext, useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import "../../global.css"
import { searchThreads } from '@/lib/expor';
import { DmcModel } from '@/types/DmcModel';
import { AppContext } from '../state/AppContext';
import { AppState } from 'react-native';

export default function AppRoot() {
  const [filteredThreads, setFilteredThreads] = useState<any[]>([]);

  const [searchText, setSearchText] = useState('');
  const context = useContext(AppContext)

  const onChangeText = (text: string) => {
    setSearchText(text);
  };


  useEffect(() => {
    (async function main() {
      const initialThreads = await searchThreads(searchText)
      setFilteredThreads(initialThreads)
    })();
  }, [])
  const { width } = useWindowDimensions();


  useEffect(() => {
    const searchTextToLowerCase = searchText.toLowerCase();

    (async function main() {
      const filtered = await searchThreads(searchText)
      setFilteredThreads(filtered)
    })();

    setFilteredThreads(filteredThreads)
  }, [searchText])

  const ListView = () => {
    return <FlatList
      contentContainerStyle={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      data={context?.allThreads}
      renderItem={({ item }) => <View style={{ display: 'flex', flexDirection: 'row', gap: 20, borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: 5 }}>
        <TouchableOpacity style={{ borderRadius: 50, backgroundColor: '#1d4ed8', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 20, width: 70 }}>
          <Text style={{ color: 'white' }}>+ Library</Text>
        </TouchableOpacity>
        <Thread thread={item} />
        <TouchableOpacity style={{ borderRadius: 50, backgroundColor: '#f87171', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 20, width: 110 }}>
          <Text style={{ color: 'white' }}>+ Shopping list</Text>
        </TouchableOpacity>
      </View>}
    />
  }


  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, padding: 5, backgroundColor: 'white' }}>
      <Header />
      <Input
        placeholder='Write some stuff...'
        value={searchText}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
        style={{ padding: 10 }}
      />
      <ListView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 50,
    backgroundColor: 'lightgray',
    width: '50%',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10
  },
  threadContainer: {
    display: 'flex',
  }
});