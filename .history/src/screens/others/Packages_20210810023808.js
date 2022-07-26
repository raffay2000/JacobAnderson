import React from 'react';
import { 
    Text,
    View,
    StyleSheet
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { black, gray, primary } from '../../assets/colors';
import { Container } from '../../components/common/Container';
import Header from '../../components/common/Header';
import PackageCard from '../../components/other/PackageCard';

 const Packages = () => {
    const onPackagePress = () => {
        alert('asd')
    }
    return(
        <Container>
            <Header
                backIcon
                heading="Packages"
            />
            <Text style={{color:'gray', fontSize:hp('2%'), fontFamily:'Regular', marginVertical:hp('3#')}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            </Text>
            <PackageCard
                color={primary}
                amount={39}
                plan={"BASIC PLAN"}
                onPress={onPackagePress}
            />
            <PackageCard
                color={'#707070'}
                amount={49}
                plan={"ADVANCED PLAN"}
                onPress={onPackagePress}
            />
            <PackageCard
                color={black}
                amount={59}
                plan={"PREMIUM PLAN"}
                onPress={onPackagePress}
            />
        </Container>
    )
 }
 export default Packages;