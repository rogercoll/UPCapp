import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ListView, Dimensions,ScrollView, Image, Platform,TouchableOpacity, NativeModules,YellowBox} from 'react-native';
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

export default class Home2Screen extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			supported: true,
            enabled: false,
            isWriting: false,
            urlToWrite: 'https://www.google.com',
            rtdType: RtdType.URL,
            parsedText: null,
            tag: {},
			beaming: false
		});
		
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
	
		  static navigationOptions = ({navigation}) =>{
			return{
				headerTintColor: 'white',
				headerLeft:(
					<View style={{padding:10}}>
						<Icon name ="menu" style={{fontSize: 24, color : 'white'}} onPress={()=>navigation.openDrawer()} />
					</View>
				),
				headerTitle: () => (
					<View style={styles.headerWrapper}>
					  <Text
						adjustsFontSizeToFit
						style={styles.headerText}>NFCdoor</Text>
					</View>
				  ),
				headerStyle: {
					backgroundColor: '#000',
				  },
				headerRight: (<View/>)
			}
	}

	render(){
		let backgroundColor = 'black';
		let { supported, enabled, tag, isWriting, urlToWrite, parsedText, rtdType } = this.state;

		return(
			<View style={{flex: 1}}>
			<View style={styles.containertitul}> 
					<Text style={{textAlign: 'center', fontWeight: '500', fontSize: 18}}>KEYS</Text>
			</View>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.item}
					onPress={() => {this.props.screenProps.navigation.navigate('Home')}}
					>
					<Icon name="key" style={{fontSize: 90, color: '#403D3D'}} />
					<Text style={styles.itemText}>KEYS</Text>
				</TouchableOpacity>
			
				<TouchableOpacity
					style={styles.item2}
					onPress={() => {}}
					>
					<Icon name="settings" style={{fontSize: 70, color: '#403D3D'}} />
					<Text style={styles.itemText}>Settings</Text>
				</TouchableOpacity>
			
				<TouchableOpacity
					style={styles.item3}
					onPress={() => {}}
					>
					<Text style={{fontSize: 20, color:'white'}}>{`Is NFC supported ? ${supported}`}</Text>
				</TouchableOpacity>
			</View>	
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
    	backgroundColor: '#fff',
		alignItems: 'center',
	},
	item: {
		flex: 3,
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		opacity: 0.99,
		borderBottomWidth :5,
		borderBottomColor: '#fff',
		backgroundColor: '#CBCBCB',
		padding: 10,
		marginBottom: 10,
	  },
	  item2: {
		flex: 2,
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		opacity: 0.99,
		borderBottomWidth :5,
		borderBottomColor: '#fff',
		backgroundColor: '#CBCBCB',
		padding: 10,
		marginBottom: 10,
	  },
	  item3: {
		flex: 1,
		width: width,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		opacity: 0.99,
		backgroundColor: '#CBCBCB',
		padding: 10,
	  },
	  containertitul: {
		height: 40,
		backgroundColor: 'white',
		justifyContent: 'center',
	},
	itemText: {
		fontSize: 40,
		color: 'white',
		fontWeight: '500',
		marginLeft: 20,
		marginLeft: 20
	  },
	  lastItem: {
		width: width,
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderColor: '#000000',
		backgroundColor: 'white'
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