import { SafeAreaView, } from 'react-native-safe-area-context';
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { AnchorThread, DmcThread } from '../../components/Thread';
import { DmcModel, ThreadType } from '@/types/types'
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/Header';

export default function AppRoot() {
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
      const keywords: string[] = t.keywords

      return description.includes(search) ||
        brand.includes(search) ||
        code.includes(search) ||
        brandAndCode.includes(search) ||
        keywords.includes(search)
    })

    //console.log(filteredThreads)
    setFilteredThreads(filteredThreads)
  }, [searchText])


  const GridView = () => {
    return <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
        justifyContent: 'flex-start',
        gap: 10
      }}
    >
      {filteredThreads.map((t, i) => {
        if (t.brand === 'dmc')
          return <DmcThread key={'dmc' + i} thread={t} />
        else if (t.brand === 'anchor')
          return <AnchorThread key={'anchor' + i} thread={t} />
      })}
    </ScrollView>
  }

  const ListView = () => {
    return <FlatList
      contentContainerStyle={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      data={filteredThreads}
      renderItem={({ item }) => <View style={{ display: 'flex', flexDirection: 'row', gap: 20, borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: 5 }}>
        <TouchableOpacity style={{ borderRadius: 50, backgroundColor: '#1d4ed8', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 20, width: 70 }}>
          <Text style={{ color: 'white' }}>+ Library</Text>
        </TouchableOpacity>
        <View style={{ borderRadius: 5, width: 25, height: 25, backgroundColor: item.color }} />
        <Text style={{ flex: .9 }}>
          {item.description}
        </Text>
        <TouchableOpacity style={{ borderRadius: 50, backgroundColor: '#f87171', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 20, width: 110 }}>
          <Text style={{ color: 'white' }}>+ Shopping list</Text>
        </TouchableOpacity>
      </View>}
    />
  }


  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, padding: 5, backgroundColor: 'white' }}>
      <Header />
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder='Search'
        placeholderTextColor={'gray'}
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