import SplashScreen from '../screens/splash';
import HomeScreen from '../screens/home';
import DrawerNavigator from '../screens/drawer';



const Routes = {
	First : {screen: SplashScreen},
	Home : {screen: HomeScreen},
	DrawerNavigator : {screen : DrawerNavigator,
		navigationOptions:{
			header: null
		}
	}
}

export default Routes;