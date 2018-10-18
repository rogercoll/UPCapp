import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
  Text
} from 'react-native';
import {scale, scaleModerate, scaleVertical} from '../utils/scale';
import {ProgressBar} from '../components/progressBar';
import { StackActions, NavigationActions, DrawerActions} from 'react-navigation';

let timeFrame = 500;

const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'DrawerNavigator' })], // Array!
  })



export default class SplashScreen extends React.Component {
	
	static  navigationOptions = {
		header: null
	}
	
	constructor(props) {
		super(props);
		this.state = {
		  progress: 0
		}
	  }

	  componentDidMount() {
		StatusBar.setHidden(true, 'none');
	
		this.timer = setInterval(() => {
		  if (this.state.progress == 1) {
			clearInterval(this.timer);
			setTimeout(() => {
			  StatusBar.setHidden(false, 'slide');
				this.props.navigation.dispatch(actionToDispatch);				
			}, timeFrame);
		  } else {
			let random = Math.random() * 0.5;
			let progress = this.state.progress + random;
			if (progress > 1) {
			  progress = 1;
			}
			this.setState({progress});
		  }
		}, timeFrame)
	
	  }

	render() {
	let width = Dimensions.get('window').width;

	return (
		<View style={styles.container}>
			<View style={{flex: 1, justifyContent: 'center'}}>
				<Text style={styles.appName}>NFCdoor</Text>
			</View>
			<View style={styles.baix}>
			<ProgressBar
				color='white'
				style={styles.progress}
				progress={this.state.progress}
				width={scale(320)}
			/>
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
	image: {
	  resizeMode: 'cover',
	  height: scaleVertical(Dimensions.get('window').height),
	},
	text: {
	  alignItems: 'center'
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
	}
  });