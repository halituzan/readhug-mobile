import Card from "@/components/ui/Card";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = { user: any };

const UserProfileCard = ({ user }: Props) => {
  const { themeModeColor } = useTheme();
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  return (
    <Card
      styles={{
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: themeModeColor(950),
        position: "relative",
      }}
    >
      <View style={style.container}>
        <View style={style.header}>
          <Image
            source={
              user?.user?.image
                ? { uri: user?.user?.image }
                : require("../../../../assets/placeholder/avatar.png")
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
              {user?.counts?.followsCount} Takipçi
            </Text>
          </View>
          <View style={style.infoItem}>
            <Text style={profileStyle({ fontSize: 14 }).infoText}>
              {user?.counts?.followersCount} Takip
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default UserProfileCard;
