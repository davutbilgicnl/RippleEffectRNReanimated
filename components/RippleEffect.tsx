import { StyleSheet, Text, View } from 'react-native';
import Ripple from './Ripple';

const RippleEffect = () => {
  const tapHandler = () => {};

  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={tapHandler}>
        <Text style={{ fontSize: 20, color: '#ff6347', fontWeight: 'bold' }}>Press Me</Text>
      </Ripple>
    </View>
  );
};

export default RippleEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ripple: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffe0ce',

    justifyContent: 'center',
    alignItems: 'center',

    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.33,
    shadowRadius: 2.22,

    // Shadow Android
    elevation: 5,
  },
});
