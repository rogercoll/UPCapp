import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Container,Left,Right,Icon,Button } from 'native-base';
import {scale, scaleModerate, scaleVertical} from '../utils/scale';
import { StackActions, NavigationActions, DrawerActions} from 'react-navigation';
import NfcManager, {Ndef,ByteParser} from 'react-native-nfc-manager';



const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DrawerNavigator' })], // Array!
  })

  function buildTextPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.textRecord(valueToWrite),
    ]);
}



export default class TotesClausScreen extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  progress: 0,
		  supported: true,
		  isWriting: false,
		  beaming: false,
		  isLoading: false,
		  first: true,
		  token: '',
		  enviat: ''
		}
		this.onChange = this.onChange.bind(this)
	  }

	  _retrieveData = async () => {
		this.setState({isLoading: true});
		this.setState({first: false});
		try {
		  const value = await AsyncStorage.getItem('TOKEN');
		  if (value !== null) {
			let that = this;
			let aux = "Bearer "+value;
			this.setState({token: value});
			const headers = {
				Authentication: aux,
			  };		  
			let link = "http://192.168.1.37:3000/rooms?token="+this.state.token;
			return fetch(link)
				  .then((response) => response.json())
				  .then((responseJson) => {
					that.setState({
					  isLoading: false,
					  dataSource: responseJson,
					}, function() {
						console.log("Data from database got it sussesfully");
					});
				  })
				  .catch((error) => {
					console.error(error);
				  });
				  console.log(this.dataSource);
		}
		  else{
			this.setState({message: "null"});
		  }
		 } catch (error) {
			this.setState({message: "error"});
		 }
	  }

	  componentDidMount() {
		  let that = this;
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

	onChange(state) {
		this.setState(state);
	  }
	

	_requestAndroidBeam = (info) => {
        let {isWriting} = this.state;
        if (isWriting) {
            return;
        }
		let bytes;
		let num = Number(info);
		let txt = this.state.dataSource.doors[num];
		txt["user"] = this.state.dataSource.user;
		txt = JSON.stringify(txt);
		this.setState({enviat: txt});
        bytes = buildTextPayload(txt);
        this.setState({isWriting: true});
        NfcManager.setNdefPushMessage(bytes)
            .then(() => {console.log("Beaming...")})
			.catch(err => console.warn(err))
    }

	_cancelAndroidBeam = () => {
        this.setState({isWriting: false});
        NfcManager.setNdefPushMessage(null)
            .then(() => console.log('beam cancelled'))
            .catch(err => console.warn(err))
    }

	 
	render() {
	let width = Dimensions.get('window').width;
	let {isWriting} = this.state.isWriting;

	if (this.state.isLoading) {
		return (
		  <View style={{flex: 1, paddingTop: 20}}>
			<ActivityIndicator color = '#A60A37' size = "large"/>
			</View>
		);
	  }
	else if(this.state.first){
		return(
			<View style={{flex: 1, paddingTop: 20, justifyContent:'center',alignItems:'center'}}>
				<Button style={{ backgroundColor: 'grey',width:40,height:40}} onPress={this._retrieveData}>
					<Text>Show keys</Text>
                </Button>
			</View>
		)
	}

		return (
			<View style={styles.container}>
				 <View style={styles.containertitul}> 
						<Text style={{textAlign: 'center', fontWeight: '500', fontSize: 18}}>KEYS</Text>
				</View>
				<View style={styles.containers}>
					<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("0")}}
							>
							<Icon name="home" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Home Door</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("1")}}
							>
							<Icon name="key" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Bedroom</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Restaurant")}}
							>
							<Icon name="restaurant" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Restaurant</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.containers}>
					<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Garage")}}
							>
							<Icon name="car" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Garage</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Gym")}}
							>
							<Icon name="american-football" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Gym</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Office")}}
							>
							<Icon name="school" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Office</Text>
						</TouchableOpacity>
				</View>
				<View style={styles.containers}>
					<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Library")}}
							>
							<Icon name="book" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Library</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Cinema")}}
							>
							<Icon name="film" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Cinema</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.item}
							onPress={()=> { this.state.isWriting ? this._cancelAndroidBeam() : this._requestAndroidBeam("Game room")}}
							>
							<Icon name="game-controller-b" style={[styles.iconNormal, this.state.isWriting && styles.iconPressed]} />
							<Text style={[styles.itemText, this.state.isWriting && styles.itemTextPressed]}>Game room</Text>
						</TouchableOpacity>
				</View>
			</View>
		)
	}

}



let styles = StyleSheet.create({
	container: {
	  backgroundColor: '#000',
	  flex: 1
	},
	containers: {
		flex: 1,
    	backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10
	},
	text: {
	  alignItems: 'center'
	},
	iconNormal: {
		fontSize: 70, 
		color: '#403D3D'
	},
	iconPressed: {
		fontSize: 70, 
		color: 'blue'
	},
	containertitul: {
		height: 40,
		backgroundColor: 'white',
		justifyContent: 'center',
	},
	item: {
		flex: 1,
		flexDirection: 'column',
		opacity: 0.99,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	  itemText: {
			fontSize: 20,
			color: 'black',
			fontWeight: '500',
	  },
	  itemTextPressed: {
		fontSize: 20,
		color: 'blue',
		fontWeight: '500',
  	},
	hero: {
	  fontSize: 37,
	},
	appName: {
	  color: 'white',
	  fontSize: 60,
	  textAlign: 'center', // ok
		},
	progress: {
		alignSelf: 'center',
		marginBottom: 35,
		backgroundColor: '#000',
	  },
	baix: {
		height: 100
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
		},
  });
