import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button } from '../../../components/common/Button';
import IconInput from '../../../components/common/IconInput';
import { gray, primary, purple, white } from '../../../assets/colors';
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from 'react-redux';
import { Name, Email, Password, Confirm_Password, Individual_SignUp } from '../../../redux/action/Ind_SIgnUpAction';
import { Regular } from '../../../assets/fonts';
import { styleSheets } from 'min-document';
import { IND_NAME } from '../../../redux/constants';
import {connect} from "react-redux";
import Toast from "react-native-toast-message";
import { validateEmail } from '../../../utils';


class UserSignup extends Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    onSignUp_Press = () => {
        Keyboard.dismiss()
        if(this.props.Name == "" ||
            this.props.Email == "" || 
            this.props.Password == "" || 
            this.props.C_Password == ""
        )
        {
            Toast.show({text1: 'Please Fill All Field'})
        }
        else if(this.props.Password !== this.props.C_Password){
            Toast.show({text1: "Password Doesn't Match"})
        }
        else{
            if(validateEmail(this.props.Email)){
                this.props._User_SignUp(
                    this.props.Name,
                    this.props.Email,
                    this.props.Password,
                    this.props.C_Password,
                )
            }else{
                Toast.show({text1: "Invalid Email Format"})
            }
            
        }
    }

    render() {
        return (
            <>
                <IconInput
                    icon="person"
                    placeholder="Name"
                    value={this.props.Name}
                    onChange={(text)=>this.props._Name(text)}
                    iconColor={gray}
                    onSubmitPress={() => this.NextInput.focus()}
                    blur={false}
                />
                <IconInput
                    icon="mail"
                    placeholder="Email Address"
                    value={this.props.Email}
                    onChange={(text)=>this.props._Email(text)}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput = ref; }}
                    onSubmitPress={() => this.NextInput1.focus()}
                    blur={false}
                    keyboard={"email-address"}
                />
                <IconInput
                    icon="key"
                    pass
                    placeholder="Password"
                    value={this.props.Password}
                    onChange={(text)=>this.props._Password(text)}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput1 = ref; }}
                    onSubmitPress={() => this.NextInput2.focus()}
                    blur={false}
                />
                <IconInput
                    icon="key"
                    pass
                    placeholder="Confirm Password"
                    value={this.props.C_Password}
                    onChange={(text)=>this.props._C_password(text)}
                    iconColor={gray}
                    inputRef={ref => { this.NextInput2 = ref; }}
                    onSubmitPress={this.onSignUp_Press}
                />
            
                <Button
                    text="SIGN UP"
                    color={purple}
                    textColor={white}
                    onPress={this.onSignUp_Press}
                    Loading={this.props.Loader}
                    disabled={this.props.Loader}
                />

                {/* <Spinner 
                    visible={this.props.Loader}
                    textContent={"Loading..."}
                    textStyle={{ color:"white", fontSize:hp("2.2%") }}
                /> */}
                {/* <View style={{height:hp("25%")}} /> */}
            </>
        );
    }
}

function mapStateToProps(state) {
    return{
        error: state.Ind_SignUpReducer.error,
        Failed: state.Ind_SignUpReducer.Failed,
        Loader: state.Ind_SignUpReducer.Loader,
        Name: state.Ind_SignUpReducer.Name,
        Email: state.Ind_SignUpReducer.Email,
        Password: state.Ind_SignUpReducer.Password,
        C_Password: state.Ind_SignUpReducer.Confirm_Password
    }
}

function mapDispatchToProps(dispatch) {
    return{
        _Name:(text)=> dispatch(Name(text)),
        _Email:(text)=> dispatch(Email(text)),
        _Password:(text)=> dispatch(Password(text)),
        _C_password:(text)=> dispatch(Confirm_Password(text)),
        _User_SignUp:(Name, Email, Password, Confirm_password)=> dispatch(Individual_SignUp(Name, Email, Password, Confirm_password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSignup);

const styles = StyleSheet.create({
    Txt:{
        color:"white",
        fontSize:hp("2.4%"),
        fontFamily:"Regular",
        marginTop:hp("2%")
    }
    
})


// const UserSignup = ({onSignupPress}) => {

//     // const [name, setName] = useState("")
//     // const [email, setEmail] = useState("")
//     // const [password, setPassword] = useState("")
//     // const [cPassword, setCPassword] = useState("")

//     const Names = useSelector(state => state.Ind_SignUpReducer.Name)
//     const SetName = (name) => {
//             dispatch({
//                 type: IND_NAME,
//                 payload:name
//             })
//     }

//     const Emails = useSelector(state => state.Ind_SignUpReducer.Email)
//     const SetEmail = useDispatch(text=> Email(text))

//     const Passwords = useSelector(state => state.Ind_SignUpReducer.Password)
//     const SetPassword = useDispatch(text=> Password(text))

//     const Confirm_Passwords = useSelector(state => state.Ind_SignUpReducer.Confirm_Password)
//     const Set_ConfirmPassword = useDispatch(text=> Confirm_Password(text))

//     const Failed = useSelector(state => state.Ind_SignUpReducer.Failed)
//     const Success = useSelector(state => state.Ind_SignUpReducer.Success)
//     const error = useSelector(state => state.Ind_SignUpReducer.error)
//     const Loader = useSelector(state => state.Ind_SignUpReducer.Loader)
    
//     return (
        // <>
        //     <IconInput
        //         // icon="name"
        //         placeholder="Name"
        //         // value={name}
        //         // onChange={(text)=>setName(text)}
        //         value={Names}
        //         onChange={(text)=>SetName(text)}
        //         iconColor={gray}
        //         onSubmitPress={()=>inputRefName.focus()}
        //         blur={false}
        //     />
        //     <IconInput
        //         icon="mail"
        //         placeholder="Email Address"
        //         // value={email}
        //         // onChange={(text)=>setEmail(text)}
        //         value={Emails}
        //         onChange={(text)=>SetEmail(text)}
        //         iconColor={gray}
        //         inputRef={input => inputRefName = input}
        //         onSubmitPress={()=>inputRef.focus()}
        //         blur={false}
        //     />
        //     <IconInput
        //         icon="key"
        //         pass
        //         placeholder="Password"
        //         // value={password}
        //         // onChange={(text)=>setPassword(text)}
        //         value={Passwords}
        //         onChange={(text)=>SetPassword(text)}
        //         iconColor={gray}
        //         inputRef={input => inputRef = input}
        //         onSubmitPress={()=>cPassInputRef.focus()}
        //         blur={false}
        //     />
        //     <IconInput
        //         icon="key"
        //         pass
        //         placeholder="Confirm Password"
        //         // value={cPassword}
        //         // onChange={(text)=>setCPassword(text)}
        //         value={Confirm_Passwords}
        //         onChange={(text)=>Set_ConfirmPassword(text)}
        //         iconColor={gray}
        //         inputRef={input => cPassInputRef = input}
        //     />

        //     <Button
        //         text="SIGN UP"
        //         color={purple}
        //         textColor={white}
        //         onPress={onSignupPress}
        //     />

        //     {
        //         Failed &&
        //             <Text style={styles.Txt} > Something went wrong </Text>
        //     }

        //     <Spinner 
        //         visible={Loader}
        //         textContent={"Loading..."}
        //         textStyle={{ color:"white", fontSize:hp("2.2%") }}
        //     />
        // </>
//     )
// }


