import Card from "@/components/ui/Card";
import { useStyles } from "@/hooks/useStyles";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {};

const ProfileCard = (props: Props) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Halido Gurbaney</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoIcon, styles.infoIconColor]}>👥</Text>
            <Text style={styles.infoText}>2 Takipçi</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoIcon, styles.infoIconColor]}>🙋‍♂️</Text>
            <Text style={styles.infoText}>1 Takip</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>1</Text>
            <Text style={styles.statLabel}>Okunuyor</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>2</Text>
            <Text style={styles.statLabel}>Okundu</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>1</Text>
            <Text style={styles.statLabel}>İstek Listesi</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.totalBooks}>Toplam 4 kitap</Text>
        </View>
      </View>
    </Card>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
  infoItem: {
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 24,
  },
  infoIconColor: {
    color: "#ff7f00",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    alignItems: "center",
  },
  totalBooks: {
    fontSize: 14,
    color: "#666",
  },
});
