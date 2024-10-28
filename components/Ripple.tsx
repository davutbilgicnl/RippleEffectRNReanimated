import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IRipple {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: React.ReactNode;
}

const Ripple: React.FC<IRipple> = ({ style, onTap, children }) => {
  const centerRippleShadowX = useSharedValue(0);
  const centerRippleShadowY = useSharedValue(0);
  const scale = useSharedValue(0);
  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const tapGesture = Gesture.Tap()
    .onBegin((event) => {
      const layout = measure(aRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;

        centerRippleShadowX.value = event.x;
        centerRippleShadowY.value = event.y;

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 600 });
      } else {
        console.warn('Layout is null');
      }
    })
    .onTouchesDown((event) => {
      if (onTap) {
        runOnJS(onTap)();
      }
    })
    .onEnd(() => {
      rippleOpacity.value = withTiming(0);
    })
    .onTouchesCancelled(() => {
      rippleOpacity.value = withTiming(0);
    });

  const reanimatedStyle = useAnimatedStyle(() => {
    const circleRadiusOfShadowRipple = Math.sqrt(width.value ** 2 + height.value ** 2);

    const x = centerRippleShadowX.value - circleRadiusOfShadowRipple;
    const y = centerRippleShadowY.value - circleRadiusOfShadowRipple;

    return {
      width: circleRadiusOfShadowRipple * 2,
      height: circleRadiusOfShadowRipple * 2,
      borderRadius: circleRadiusOfShadowRipple,
      backgroundColor: 'rgba(255, 99, 71, 0.3)',
      position: 'absolute',
      opacity: rippleOpacity.value,
      top: 0,
      left: 0,

      transform: [
        {
          translateX: x,
        },
        {
          translateY: y,
        },
        { scale: scale.value },
      ],
    };
  });

  const gesture = Gesture.Exclusive(tapGesture);
  return (
    <View ref={aRef} collapsable={false} style={style}>
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[style, { overflow: 'hidden' }]}>
            <View style={style}>{children}</View>
            <Animated.View style={[reanimatedStyle]} />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
