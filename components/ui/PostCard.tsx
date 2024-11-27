// components/Post.js
import React, { SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import UIText from './UIText';
import Heart from './Icons/Heart';
import Comment from './Icons/Comment';
import CommentCard from './CommentCard';
import { Input } from './Input';
import { Dispatch } from '@reduxjs/toolkit';

const Post = ({ post }: any) => {

    const [openMessage, setOpenMessage] = useState(false);
    const [newComment, setNewComment] = useState<string>("");
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: post?.book?.bookId?.images?.thumbnail }} style={styles.bookImage} />
                <View style={{
                    minWidth: 75, minHeight: 60, width: 75, height: 60
                }}></View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                    <View>
                        <Text style={styles.title}>{post?.book?.bookName}</Text>
                        <Text style={styles.author}>{post?.book?.bookId?.authors.map((i: any) => i.name).join(" & ")}</Text>
                    </View>
                    <View>
                        <Image source={{ uri: post?.user?.image }} style={{ width: 40, height: 40, borderRadius: "100%" }} />
                    </View>
                </View>

            </View>
            <UIText text={post.content} />
            <View style={styles.footer}>
                <View style={styles.interactionContainer}>
                    <Heart />
                    <Text style={styles.interactionCount}>{post.likeCount}</Text>
                </View>
                <Pressable onPress={() => { setOpenMessage(!openMessage) }} style={styles.interactionContainer}>
                    <Comment />
                    <Text style={styles.interactionCount}>{post.commentCount}</Text>
                </Pressable>
                <Text style={styles.timestamp}>{post.createdAt}</Text>
            </View>
            {
                openMessage && <View>
                    <Input value={newComment} onChangeText={setNewComment} label={''} className='border' />
                    <FlatList
                        style={{ paddingVertical: 30 }}
                        data={post.comments}
                        keyExtractor={(item: any) => item?._id + Math.floor(Math.random() * 9999999)}
                        renderItem={({ item }) =>
                            <CommentCard comment={item} />
                        }
                        onEndReached={() => { }}
                        onEndReachedThreshold={0.5}

                    // ListFooterComponent={isLoading && <View style={styles.loadingIndicator} />}
                    />
                </View>
            }
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