import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StatusBar } from 'react-native';
import Routes from './src/routes/AuthRoutes';
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import {Black, Regular, Light, Bold, Thin} from './src/assets/fonts';
import { white } from './src/assets/colors';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './src/theme/ThemeContext';

export default function App() {
  
  const [isloading] = useFonts({
    "Black":Black,
    "Bold":Bold,
    "Light":Light,
    "Regular":Regular,
    "Thin":Thin,
  });

  if(!isloading) return <AppLoading/>
  else
    return (
      <>
        <StatusBar animated style="light"/>
        <AppearanceProvider>
          <ThemeProvider>
            <Routes/>
          </ThemeProvider>
        </AppearanceProvider>
      </>
    )
}