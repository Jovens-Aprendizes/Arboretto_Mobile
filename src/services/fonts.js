import * as Font from 'expo-font';

export async function loadFonts() {
  await Font.loadAsync({
    'Insonsolata-Medium': require('./../../assets/fonts/Inconsolata-Medium.ttf'),
    'Lora-Medium': require('./../../assets/fonts/Lora-Medium.ttf'),
    // Adicione outras fontes aqui, se necessário
  });
}
