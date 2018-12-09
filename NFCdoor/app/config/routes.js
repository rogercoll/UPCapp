import SplashScreen from '../screens/splash';
import HomeScreen from '../screens/home';
import DrawerNavigator from '../screens/drawer';
import KeysScreen from '../screens/keys';
import TotesClausScreen from '../screens/totesclaus';
import LoginScreen from '../screens/login';
import OkScreen from '../screens/ok';
import FailScreen from '../screens/fail';




const Routes = {
	First : {screen: SplashScreen},
	Home : {screen: HomeScreen},
	Keys : {screen: KeysScreen},
	Login : {screen: LoginScreen},
	TotesClaus : {screen: TotesClausScreen},
	Ok : {screen: OkScreen},
	Fail : {screen: FailScreen},
	DrawerNavigator : {screen : DrawerNavigator,
		navigationOptions:{
			header: null
		}
	}
}

export default Routes;