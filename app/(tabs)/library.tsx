import { SafeAreaView, } from 'react-native-safe-area-context';
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { AnchorThread, DmcThread, Thread } from '../../components/Thread';
import { ThreadType } from '@/types/types'
import { supabase } from '@/lib/supabase';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';

export default function LibraryScreen() {
  const [threads, setThreads] = useState<any[]>([]);
  const [filteredThreads, setFilteredThreads] = useState<any[]>([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async function main() {
      const { data: dmcThreads } = await supabase.from('dmc').select()
      const { data: anchorThreads } = await supabase.from('anchor').select()

      if (dmcThreads && anchorThreads) {
        setThreads(dmcThreads.concat(anchorThreads))
        setFilteredThreads(dmcThreads.concat(anchorThreads))
      }
    })();
  }, [])
  const { width } = useWindowDimensions();


  useEffect(() => {
    const search = searchText.toLowerCase()

    const filteredThreads = threads.filter(t => {
      const description = String(t.description).toLowerCase()
      const brand = String(t.brand).toLowerCase()
      const code = String(t.code).toLowerCase()
      const brandAndCode = `${brand} ${code}`
      const keywords = t.keywords

      return description.includes(search) ||
        brand.includes(search) ||
        code.includes(search) ||
        brandAndCode.includes(search) ||
        keywords.includes(search)
    })

    setFilteredThreads(filteredThreads)
  }, [searchText])


  const GridView = () => {
    const context = useContext(AppContext)
    return <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        gap: 10
      }}
    >
      {context?.allThreads.map((t, i) => <Thread key={i} thread={t} />)}
    </ScrollView>
  }

  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, padding: 5, backgroundColor: 'white' }}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder='Search'
        placeholderTextColor={'gray'}
      />
      <GridView />
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