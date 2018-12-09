import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ListView, Dimensions,ScrollView, Image, Platform,TouchableOpacity, NativeModules,YellowBox,AsyncStorage} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import { Container,Left,Right,Icon } from 'native-base';
import { Header } from 'react-navigation';
import NfcManager, {Ndef} from 'react-native-nfc-manager';



const {width,height} = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
let sizeTab = (height-Header.HEIGHT-STATUSBAR_HEIGHT)/6;

const RtdType = {
    URL: 0,
    TEXT: 1,
};

export default class KeysScreen extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			loading: false,
			supported: true,
            enabled: false,
            isWriting: false,
            urlToWrite: 'https://www.google.com',
            rtdType: RtdType.URL,
            parsedText: null,
            tag: {},
			beaming: false,
			texte :'',
			message: '',
			whoamI:'Home Door'
		});
		
	}

	static  navigationOptions = {
		header: null
	}
		 
	componentDidMount() {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            })
    }

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
	}
	_parseUri = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    _parseText = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
	}
	
	_isok = (test) => {
		let that = this;
		this.setState({ loading: true });
		let dn = test.name.replace(/ /g,'');
		dn = dn.toLowerCase();
		let link = "http://192.168.1.37:3000/doors?user="+test.user+"&value="+test.value+"&dname="+dn;
		return fetch(link)
		.then((response) => response.json())
		.then((responseJson) => {
			that.setState({
			loading: false,
			dataSource: responseJson,
			}, function() {
				console.log("Data from database got it sussesfully");
			});
			if(responseJson.Code == "200"){
				this.props.navigation.navigate('Ok');
			}
			else{
				this.props.navigation.navigate('Fail');
			}

		})
		.catch((error) => {
			console.error(error);
		});
	}

	_onTagDiscovered = tag => {
        console.log('Tag Discovered', tag);
		let text = this._parseText(tag);
		let aux = JSON.parse(text);
		if(aux.name == this.state.whoamI){
			this._isok(aux);
			this.setState({texte: text});
		}
    }
	
	_startDetection = () => {
        NfcManager.registerTagEvent(this._onTagDiscovered)
            .then(result => {
				console.log('Read OK', result)
            })
            .catch(error => {
                console.warn('registerTagEvent fail', error)
            })
    }

	_retrieveData = async () => {
		try {
		  const value = await AsyncStorage.getItem('TOKEN');
		  if (value !== null) {
			this.setState({message: value});
			console.log(value);
		  }
		  else{
			this.setState({message: "null"});
		  }
		 } catch (error) {
			this.setState({message: "error"});
		 }
	  }


	render(){
		let backgroundColor = 'black';
		let { texte } = this.state;
		return(
			<View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
				<TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
                        <Text style={{ color: 'blue',fontSize:22 }}>Listening...</Text>
                </TouchableOpacity>
				<Text>{`Bytes: ${texte}`} </Text>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
    	backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		opacity: 0.99,
		backgroundColor: '#CBCBCB',
		borderRadius: 15,
		marginRight: 10,
		marginLeft: 10,
		marginTop: 10
	  },
	  item2: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		opacity: 0.99,
		backgroundColor: '#CBCBCB',
		borderRadius: 15,
		margin: 10
	  },
	  containertitul: {
		height: 40,
		backgroundColor: 'white',
		justifyContent: 'center',
	},
	itemText: {
		fontSize: 10,
		color: 'white',
		fontWeight: '500',
		marginLeft: 20,
		marginLeft: 20
	  },
	headerWrapper: {
	flex: 1
	},
	headerText: {
	textAlign: 'center', // ok
	alignSelf: 'center', // ok
	color: 'white',
	fontWeight: '900',
	fontSize: 20
	}
});