import { SafeAreaView, } from 'react-native-safe-area-context';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, Text, TextInput, View } from 'react-native';
import { Thread } from '../../components/Thread';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { ThreadType } from '@/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SlidersHorizontal as Filters } from '@/lib/icons/Copy';
import { Grid2X2, Grid3X3 } from 'lucide-react-native';

export default function LibraryScreen() {
  const state = useContext(AppContext)
  const [filteredThreads, setFilteredThreads] = useState<ThreadType[]>([]);
  const [grid, setGrid] = useState<'default' | 'more'>('default') //save in system preference or global context
  const [searchText, setSearchText] = useState('');

  const { width } = useWindowDimensions();

  useEffect(() => {
    const search = searchText.toLowerCase()
    if (state && search) {
      const ft = state.allThreads.filter(t => {
        return t.getSearchableFields().some(searchableField => searchableField.includes(search))
      })

      setFilteredThreads(ft)
    }
  }, [searchText])


  const GridView = () => {
    return <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        gap: 10,
      }}
    >
      {searchText ?
        filteredThreads.map((t, i) => <Thread size={grid} key={i} thread={t} />) :
        state?.allThreads.map((t, i) => <Thread size={grid} key={i} thread={t} />)
      }
    </ScrollView>
  }
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, padding: 5, backgroundColor: 'white' }}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          value={searchText}
          placeholder='Search'
          placeholderTextColor={'gray'}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost'>
              <Filters />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side={'bottom'}
            insets={contentInsets}
            className='w-80'
          >
            <Text className='font-medium leading-none native:text-xl'>Filters</Text>
            <Text className='text-sm text-muted-foreground'>
              Brand
            </Text>
            <Text className='text-sm text-muted-foreground'>
              Variant
            </Text>
            <Text className='text-sm text-muted-foreground'>
              Name
            </Text>
            <Text className='text-sm text-muted-foreground'>
              Keywords
            </Text>
          </PopoverContent>
        </Popover>
        <Button variant={'ghost'} onPress={() => grid === 'more' ? setGrid('default') : setGrid('more')}>
          {grid === 'more' ? <Grid2X2 /> : <Grid3X3 />}
        </Button>
      </View>
      <GridView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10
  },
  threadContainer: {
    display: 'flex',
  }
});