import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

//importing all components
import Landing from "./Views/Landing/Landing";
import Mockup from "./Views/Mockup/Mockup";
import Checkout from "./Views/Checkout/Checkout";
import Success from "./Views/Success/Success";
import EarnCrypto from "./Views/Earn/EarnCrypto";
import EarnSuccess from "./Views/Success/EarnSuccess";
import Admin from "./Views/Admin/Admin";
import How from "./Views/How/How";
import LearnMore from "./Views/LearnMore/LearnMore";
import Category from "./Views/Category/Category";
import Cart from "./Views/Cart/Cart";
import Guidelines from "./Views/Guidelines/Guidelines";

const themes = {
    light: '/custom-antd.css',
    dark: '/custom-antd-dark.css',
};

function App() {
    return (
        <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
            <Router>
                <Route path="/" component={Landing} exact />
                <Route path="/mockup/:id" component={Mockup} exact />
                <Route path="/checkout/:shipping" component={Checkout} exact />
                <Route path="/success" component={Success} exact />
                <Route path="/earn" component={EarnCrypto} exact />
                <Route path="/earn-success" component={EarnSuccess} exact />
                <Route path="/admin" component={Admin} exact />
                <Route path="/how-it-works" component={How} exact />
                <Route path="/learn-more" component={LearnMore} exact />
                <Route path="/category/:category" component={Category} exact />
                <Route path="/cart" component={Cart} exact />
                <Route path="/guidelines" component={Guidelines} exact />
            </Router>
        </ThemeSwitcherProvider>
    );
}

export default App;
