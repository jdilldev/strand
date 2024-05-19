import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { AnchorModel, DmcModel, ThreadType } from '@/types/types';

export const DmcThread = ({ thread: {
    variant,
    anchorCodes,
    classicColorworks,
    color,
    code,
    description,
    keywords,
    weeksDyeWorks } }: { thread: DmcModel }) => {

    return <View style={styles.contaner}>
        <View style={styles.threadContainer} />
        <Text style={styles.variantText}>{variant}</Text>
        <Text style={styles.brandText}>{`DMC ${code}`}</Text>
        <Text>{description}</Text>
    </View>
}

const styles = StyleSheet.create({
    contaner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1,
        width: 110,
        padding: 5
    },
    threadContainer: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 10,
        alignSelf: 'center',
    },
    variantText: {
        textTransform: 'uppercase',
        paddingHorizontal: 3,
        paddingVertical: 1,
        backgroundColor: 'red',
        width: 100,
        borderRadius: 5,
        textAlign: 'center',
        letterSpacing: 1.2,
        marginTop: 5
    },
    brandText: {
        fontWeight: 'bold'
    }
});
