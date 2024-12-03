import Card from "@/components/ui/Card";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import { selectUser } from "@/store/features/userSlice";
import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const ProfileCard = (props: Props) => {
  const { themeModeColor } = useTheme();
  const { profileStyle } = useStyles();
  const style = profileStyle({});
  const user = useSelector(selectUser);

  return (
    <Card
      styles={{
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: themeModeColor(950),
      }}
    >
      <View style={style.container}>
        <View style={style.header}>
          <Image
            source={
              user.image
                ? { uri: user.image }
                : require("../../../../assets/placeholder/avatar.png")
            }
            style={style.profileImage}
          />
          <View style={style.userName}>
            <Text style={profileStyle({ fontSize: 18 }).name}>
              {user.firstName + " " + user.lastName}
            </Text>
            <Text style={profileStyle({ fontSize: 16 }).name}>
              {user.userName}
            </Text>
          </View>
        </View>

        <View style={style.info}>
          <View style={style.infoItem}>
            <Text style={profileStyle({ fontSize: 14 }).infoText}>
              2 Takipçi
            </Text>
          </View>
          <View style={style.infoItem}>
            <Text style={profileStyle({ fontSize: 14 }).infoText}>3 Takip</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ProfileCard;
