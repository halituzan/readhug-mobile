import Slider from "@/components/ui/Slider";
import { useStyles } from "@/hooks/useStyles";
import { formatDate } from "@/lib/formatDate";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const BookItem = ({
  item,
  type,
  mount,
}: {
  item: any;
  type: "wishlist" | "reading" | "read";
  mount: any;
}) => {
  const { profileStyle } = useStyles();
  const style = profileStyle({});
  return (
    <TouchableOpacity
      style={style.bookItemContainer}
      onLongPress={() => {
        console.log("first");
      }}
    >
      <Image
        source={
          item?.bookId?.images?.thumbnail
            ? { uri: item?.bookId?.images?.thumbnail }
            : require("@/assets/placeholder/books/book-placeholder.png")
        }
        style={style.bookItemImage}
      />
      <View style={style.bookTextContainer}>
        <Text style={style.bookTitle}>{item?.bookName}</Text>
        <Text style={profileStyle({ fontSize: 14 }).bookAuthor}>
          {item?.bookId?.authors.map((i: any) => i.name).join(" & ")}
        </Text>
        {type === "reading" && (
          <View style={{ flex: 1 }}>
            <Slider
              pageCount={item.process.pageCount}
              readCount={item.process.readCount}
              bookId={item._id}
              mount={mount}
            />
          </View>
        )}
        {type !== "reading" && (
          <View>
            <Text style={profileStyle({ fontSize: 12 }).bookDate}>
              Pages: {item?.process?.pageCount}
            </Text>
          </View>
        )}

        <Text style={profileStyle({ fontSize: 12 }).bookDate}>
          Added: {formatDate(item?.bookId?.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;
