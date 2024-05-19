import { SafeAreaView } from 'react-native-safe-area-context';
import { DmcThread } from '../../components/Thread'
import { DmcModel } from '@/types/types'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

const t: DmcModel = {
  brand: 'dmc',
  code: 2,
  description: 'candy',
  anchorCodes: [],
  classicColorworks: "",
  color: '',
  keywords: [],
  variant: '6-strand',
  weeksDyeWorks: []
}


export default function AppRoot() {

  (async function main() {
    const { data, error } = await supabase.from('anchor').select()

    console.log(data)
    console.log('error ' + error)
  })();

  return (
    <SafeAreaView>
      <DmcThread thread={t} />
    </SafeAreaView>
  );
}
