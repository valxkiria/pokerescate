import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Title-Solid': require('../../assets/fonts/Pokemon-Solid.ttf'),
    'Pixel-Light': require('../../assets/fonts/Pokemon-Classic.ttf'),
    'Pixel-Bold': require('../../assets/fonts/Quinquefive.ttf'),
  });
};