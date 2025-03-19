import { View, Text, StyleSheet, TouchableHighlight, Pressable, } from 'react-native';
import { ThreadType } from '@/types/types';

export const Thread = ({ thread, size }: { thread: ThreadType, size: "default" | "more" }) =>
    <Pressable style={styles.threadContainer}>
        <View style={{ ...styles.threadWrapper, backgroundColor: thread.color, }} >
        </View>
        <Pressable style={styles.variantTextWrapper}><Text style={styles.variantText}>{thread.variant}</Text></Pressable>
        <Text style={styles.brandText}>{thread.getBrandText()}</Text>
        <Text style={styles.descriptionText}>{thread.description}</Text>
    </Pressable>

const styles = StyleSheet.create({
    threadContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 120,
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
        width: 120

    },
    descriptionText: {
        fontSize: 11,
        fontWeight: 'light',
        height: 30
    }
});
