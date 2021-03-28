import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {Feather} from '@expo/vector-icons'

import LottieView from 'lottie-react-native';
import AccentureLogo from '../images/Accenture.png';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { contactSend } from '../service';
// import { Container } from './styles';

export default function Contact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [isSendMessage, setIsSendMessage] = useState(false);


    function sendAccentureMessage(){
        const postData = {
            name,
            email,
            phone,
            text
        }
        contactSend.post('', postData).then(
            response => {
                setIsSendMessage(true);
                setName('');
                setEmail('');
                setPhone('');
                setText('');
            }
        )
    }

  return (
      <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding"  style={styles.container}>
                {isSendMessage ? (
                    
                    <LottieView 
                        source={require('../animations/lf30_editor_baoo1swz.json')}
                        style={styles.animationContent}
                        autoPlay
                        loop
                    /> 
                ) : (
                    <>
                        <Image style={styles.logoAccenture}  source={AccentureLogo} />
                        <View style={styles.formContainer}>
                            <Text style={styles.labelForm} >Seu nome:</Text>
                            <TextInput style={styles.inputForm} onChangeText={ name => setName(name)}></TextInput>
                            <Text style={styles.labelForm}>Telefone:</Text>
                            <TextInput style={styles.inputForm}  onChangeText={ phone => setName(phone)}></TextInput>
                            <Text style={styles.labelForm}>Email:</Text>
                            <TextInput style={styles.inputForm}  onChangeText={ email => setName(email)}></TextInput>
                            <Text style={styles.labelForm}>Deixe sua mensagem:</Text>
                            <TextInput style={styles.inputFormMultLine} multiline  onChangeText={ text => setName(text)}></TextInput>
                            <RectButton style={styles.sendButton} onPress={() => sendAccentureMessage}>
                                <Text style={styles.textSendButton}>Enviar mensagem</Text>
                                <Feather name="send" size={20} color={'#a110ff'}/>
                                </RectButton>
                        </View>
                    </>
                )}
                
            </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImage:{
        width: Dimensions.get('window').width,
        height: 300

    },
    logoAccenture:{
        marginVertical: 6,
        width: 200,
        height: 52,
        
    },
    scrollView: {
        width: Dimensions.get('window').width
    },
    animationContent: {
        height: 400,
        width: 400
    },
    formContainer: {
      
       
    },
    labelForm: {
        marginTop: 22
    },
    inputForm: {
        paddingHorizontal: 20,
        height: 50,
        width: Dimensions.get('window').width -60,
        borderWidth: 1,
        borderColor: '#b9b7b7',
        borderRadius: 12,
        marginVertical: 5
    },
    inputFormMultLine: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 120,
        width: Dimensions.get('window').width -60,
        borderWidth: 1,
        borderColor: '#b9b7b7',
        borderRadius: 12,
        marginVertical: 5
    },
    sendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 20

    },
    textSendButton: {
        color: '#a100ff',
        fontSize: 20,
        marginRight: 6
    }
})
