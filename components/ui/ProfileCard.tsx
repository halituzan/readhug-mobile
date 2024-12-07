import Card from "@/components/ui/Card";
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import { GetUserProfile } from "@/services/user/user.service";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Comment from "./Icons/Comment";
import Heart from "./Icons/Heart";
import { ArrowDown, ChevronDown, ChevronUp } from "lucide-react-native";
import { formatDate } from "@/lib/formatDate";

type Props = { userName: string; post: any };

const ProfileCard = ({ userName, post }: Props) => {
  const { themeModeColor } = useTheme();
  const { profileStyle, styles } = useStyles();
  const style = profileStyle({});
  const [user, setUser] = useState<any>({});
  const [showContent, setShowContent] = useState(false);

  const getUser = async (userName: string) => {
    const data = await GetUserProfile(userName);
    setUser(data);
  };

  useEffect(() => {
    if (userName) {
      getUser(userName);
    }
  }, [userName]);

  return (
    <Card
      styles={{
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: themeModeColor(950),
        flexDirection: "row",
        position: "relative",
        padding: 0,
      }}
    >
      <View style={[style.container, { flex: 1, height: "auto", padding: 8 }]}>
        <View style={style.header}>
          <Image
            source={
              user?.user?.image
                ? { uri: user?.user?.image }
                : require("../../assets/placeholder/avatar.png")
            }
            style={style.profileImage}
          />
          <View style={style.userName}>
            <Text style={profileStyle({ fontSize: 18 }).name}>
              {user?.user?.firstName + " " + user?.user?.lastName}
            </Text>
            <Text style={profileStyle({ fontSize: 16 }).name}>
              {user?.user?.userName}
            </Text>
          </View>
        </View>

        <View style={style.info}>
          <View style={style.infoItem}>
            <Text style={profileStyle({ fontSize: 14 }).infoText}>
              {user?.counts?.followersCount ?? 0} Takipçi
            </Text>
          </View>
          <View style={style.infoItem}>
            <Text style={profileStyle({ fontSize: 14 }).infoText}>
              {user?.counts?.followsCount ?? 0} Takip
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingBottom: 8,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: Colors.colors.primary,
              fontSize: 14,
              textAlign: "right",
            }}
          >
            {post?.book?.bookName}
          </Text>
        </View>
        <ScrollView
          style={{
            paddingVertical: 12,
            paddingRight: 12,
            borderTopColor: "gray",
            borderBottomColor: "gray",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            width: "100%",
            maxHeight: showContent ? 350 : 230,
            flexWrap: "wrap",
          }}
        >
          <Text
            style={[
              styles({}).cardContentText,
              { paddingBottom: 8, textAlign: "auto" },
            ]}
          >
            {post?.content?.length > 503 && !showContent
              ? post?.content.slice(0, 500) + "..."
              : post?.content}
          </Text>
          {post?.content?.length > 503 && !showContent && (
            <Pressable onPress={() => setShowContent(true)}>
              <Text style={{ color: themeModeColor(100) }}>Daha fazla..</Text>
            </Pressable>
          )}
        </ScrollView>
        <View
          style={[styles({}).cardFooterInteractionButtons, { paddingTop: 8 }]}
        >
          <View style={styles({}).cardFooterContainer}>
            <Heart
              color={Colors.colors.primary}
              likedColor={post?.isLiked ? Colors.colors.primary : "none"}
              width={16}
              height={16}
            />
            <Text style={styles({}).cardFooterInteraction}>
              {post?.likeCount}
            </Text>
          </View>
          <Pressable style={styles({}).cardFooterContainer}>
            <Comment
              color={Colors.colors.primary}
              messageColor={
                post?.commentCount > 0 ? Colors.colors.primary : "none"
              }
              width={16}
              height={16}
            />
            <Text style={styles({}).cardFooterInteraction}>
              {post?.commentCount}
            </Text>
          </Pressable>
          <Text style={styles({ fontSize: 12 }).cardFooterDate}>
            {formatDate(post?.createdAt,"dateTime")}
          </Text>
          {post?.content?.length > 503 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
                width: "100%",
              }}
            >
              <Pressable
                style={{
                  backgroundColor: Colors.colors.primary,
                  borderRadius: 4,
                  width: 16,
                  marginRight: 10,
                }}
                onPress={() => setShowContent(!showContent)}
              >
                {showContent ? (
                  <ChevronUp size={16} color={"white"} />
                ) : (
                  <ChevronDown size={16} color={"white"} />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View>
        <Image
          source={
            post?.book?.bookId?.images?.thumbnail
              ? { uri: post?.book?.bookId?.images?.thumbnail }
              : require("../../assets/placeholder/books/book-placeholder.png")
          }
          style={{
            width: 65,
            height: 90,
            position: "absolute",
            right: 8,
            top: 8,
            borderRadius: 10,
          }}
        />
      </View>
    </Card>
  );
};

export default ProfileCard;
