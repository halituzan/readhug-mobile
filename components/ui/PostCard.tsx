// components/Post.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import UIText from './UIText';
import Heart from './Icons/Heart';
import Comment from './Icons/Comment';

const Post = ({ post }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require(`../../assets/placeholder/books/book2.jpg`)} style={styles.bookImage} />
                <View style={{
                    minWidth: 75, minHeight: 60, width: 75, height: 60
                }}></View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                    <View>
                        <Text style={styles.title}>{post.bookTitle}</Text>
                        <Text style={styles.author}>{post.author}</Text>
                    </View>
                    <View>
                        <Image source={require(`../../assets/placeholder/books/book1.jpg`)} style={{ width: 40, height: 40, borderRadius: "100%" }} />
                    </View>
                </View>

            </View>
            <UIText text={post.content} />
            <View style={styles.footer}>
                <View style={styles.interactionContainer}>
                    <Heart />
                    <Text style={styles.interactionCount}>{post.likes}</Text>
                </View>
                <View style={styles.interactionContainer}>
                    <Comment />
                    <Text style={styles.interactionCount}>{post.comments}</Text>
                </View>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: "100%",
        flex: 1,
        position: "relative",

    },
    bookImage: { width: 60, height: 90, position: "absolute", top: -30, borderRadius: 10 },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomColor: "gray",
        borderBottomWidth: 2,
        paddingBottom: 8
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: '#7B8794',
    },
    content: {
        fontSize: 18,
        color: '#333',
        marginBottom: 12,
        width: "100%",
        paddingVertical: 8,
        flexWrap: "wrap",
        flex: 1,
        flexDirection: "row"
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        width: "100%",
        borderTopColor: "gray",
        borderTopWidth: 1,
        paddingVertical: 8
    },
    interactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    interactionCount: {
        marginLeft: 4,
        fontSize: 14,
        color: '#7B8794',
    },
    timestamp: {
        fontSize: 12,
        color: '#7B8794',
    },
});

export default Post;