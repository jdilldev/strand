import { View, Text, StyleSheet, TouchableHighlight, } from 'react-native';
import { ThreadType } from '@/types/types';
import { DmcModel } from '@/types/DmcModel';
import { AnchorModel } from '@/types/AnchorModel';

export const Thread = ({ thread }: { thread: ThreadType }) =>
    <View style={styles.threadContainer}>
        <View style={{ ...styles.threadWrapper, backgroundColor: thread.color }} >
        </View>
        <TouchableHighlight style={styles.variantTextWrapper}><Text style={styles.variantText}>{thread.variant}</Text></TouchableHighlight>
        <Text style={styles.brandText}>{thread.getBrandText()}</Text>
        <Text style={styles.descriptionText}>{thread.description}</Text>
    </View>

export const DmcThread = ({ thread: {
    variant,
    anchorCodes,
    classicColorworks,
    color,
    code,
    description,
    keywords,
    weeksDyeWorks } }: { thread: DmcModel }) => {

    return <View style={styles.threadContainer}>
        <View style={{ ...styles.threadWrapper, backgroundColor: color }} >
        </View>
        <Text style={styles.variantText}>{variant}</Text>
        <Text style={styles.brandText}>{`Anchor ${code}`}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
    </View>
}

export const AnchorThread = ({ thread: {
    variant = '6-strand',
    color,
    code,
    description,
    keywords,
} }: { thread: AnchorModel }) => {

    return <View style={styles.threadContainer}>
        <View style={{ ...styles.threadWrapper, backgroundColor: color }} >
        </View>
        <Text style={styles.variantText}>{variant}</Text>
        <Text style={styles.brandText}>{`Anchor ${code}`}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
    </View>
}


const styles = StyleSheet.create({
    threadContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 110,
        padding: 5,
    },
    threadWrapper: {
        width: 100,
        height: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    variantTextWrapper: {
        borderRadius: 10,
        backgroundColor: '#bae6fd',
        marginTop: 5,
        width: 100,
        paddingHorizontal: 3,
        paddingVertical: 1,

    },
    variantText: {
        textTransform: 'uppercase',
        color: '#0369a1',
        textAlign: 'center',
        letterSpacing: 1.2,
    },
    brandText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    descriptionText: {
        fontSize: 11,
        fontWeight: 'light',
        height: 30
    }
});
