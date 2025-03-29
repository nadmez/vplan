//
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { database } from "./firebase"; // Import your Firebase database instance
import { ref, set, onValue } from "firebase/database";

export default function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Read data from the database
    const usersRef = ref(database, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  const writeData = () => {
    // Write data to the database
    const newUserRef = ref(database, "users/user1");
    set(newUserRef, {
      username: "newuser",
      email: "newuser@example.com",
    });
  };

  return (
    <View>
      <Text>Data from Firebase:</Text>
      {data &&
        Object.keys(data).map((key) => (
          <Text key={key}>
            {key}: {JSON.stringify(data[key])}
          </Text>
        ))}
      <Button title="Write Data" onPress={writeData} />
    </View>
  );
}
