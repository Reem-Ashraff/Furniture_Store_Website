import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Header from './pages/header/header';
import Home from './pages/home/home';
import Products from './pages/products/products'
import Footer from './pages/footer/footer';
import About from './pages/about/about';
import ProductDetails from './pages/products/productDetails';
import Contact from './pages/contact/contact.';
import Sales from './pages/sales/sales';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Favorites from './pages/favorites/favorites';
import Cart from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import Notifications from './pages/notifications/notifications'
import Tracking from './pages/tracking/tracking';
import DriverLocation from './pages/tracking/driverLocation';
import Orders from './pages/orders/orders';
import AsideDashboard from './pages/dashboard/aside';
import HomeDashboard from './pages/dashboard/home';
import CategoryList from './pages/dashboard/categories/CategoryList';
import FooterDashboard from './pages/dashboard/footer';
import CategoryEdit from './pages/dashboard/categories/categoryEdit';
import CategoryAdd from './pages/dashboard/categories/categoryAdd';
import CategoryDelete from './pages/dashboard/categories/categoryDelete';
import ProductList from './pages/dashboard/products/productList';
import ProductAdd from './pages/dashboard/products/productAdd';
import ProductEdit from './pages/dashboard/products/productEdit';
import Details from './pages/dashboard/products/details';
import ProductDelete from './pages/dashboard/products/productDelete';
import OrderList from './pages/dashboard/orders/orderList';
import OrderDetails from './pages/dashboard/orders/orderDetails';
import UsersList from './pages/dashboard/users/usersList';
import UserAdd from './pages/dashboard/users/userAdd';
import DashHeader from './pages/dashboard/dashHeader';
import OffersList from './pages/dashboard/offers/offerList';
import OfferAdd from './pages/dashboard/offers/offerAdd';
import OfferEdit from './pages/dashboard/offers/offerEdit';
import OfferDelete from './pages/dashboard/offers/offerDelete';
import AccountDetails from './pages/accountDetails/accountDetails';
import ProfileDashboard from './pages/profileDashboard/profileDashboard';
import MessagesList from './pages/dashboard/messages/messagesList';
import CategoryProducts from './pages/categoryProducts/categoryProducts';
import AdminRoute from './adminRoute/adminRoute';
import UserRoute from './userRoute/userRoute';
import DriverRoute from './driverRoute/driverRoute';
import DriverPage from './pages/driverPage/driverPage';

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ["/dashboard", "/login", "/signup", "/driver-page", "/driver"];
  const hideHeaderFooter = hiddenRoutes.some(route =>
    location.pathname.startsWith(route)
  );
  // const hideHeaderFooter = location.pathname.startsWith("/dashboard")
  return (
    <>
      <div className='page-wrapper'>
        {!hideHeaderFooter && <Header></Header>}
        <Switch>
          <Route path="/home" exact><UserRoute><Home /></UserRoute></Route>
          <Route path="/products" exact><UserRoute><Products /></UserRoute></Route>
          <Route path="/about" exact><UserRoute><About /></UserRoute></Route>
          <Route path="/details/:id" exact><UserRoute><ProductDetails /></UserRoute></Route>
          <Route path="/contact" exact><UserRoute><Contact /></UserRoute></Route>
          <Route path="/sales" exact><UserRoute><Sales /></UserRoute></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/favorites" exact><UserRoute><Favorites /></UserRoute></Route>
          <Route path="/cart" exact><UserRoute><Cart /></UserRoute></Route>
          <Route path="/checkout" exact><UserRoute><Checkout /></UserRoute></Route>
          <Route path="/notifications" exact><UserRoute><Notifications /></UserRoute></Route>
          <Route path="/orders" exact><UserRoute><Orders /></UserRoute></Route>
          <Route path="/tracking/:id" exact><UserRoute><Tracking /></UserRoute></Route>
          <Route path="/details" exact><UserRoute><AccountDetails /></UserRoute></Route>
          <Route path="/profile-dashboard" exact><UserRoute><ProfileDashboard /></UserRoute></Route>
          <Route path="/category-products/:id" exact><UserRoute><CategoryProducts /></UserRoute></Route>

          <Route path="/driver-page" exact><DriverRoute><DriverPage /></DriverRoute></Route>
          <Route path="/driver/:id" exact><DriverRoute><DriverLocation /></DriverRoute></Route>

          <Route path="/dashboard" exact><AdminRoute><AsideDashboard /></AdminRoute></Route>
          <Route path="/dashboard" exact><AdminRoute><FooterDashboard /></AdminRoute></Route>
          <Route path="/dashboard" exact><AdminRoute><DashHeader /></AdminRoute></Route>
          <Route path="/dashboard/home" exact><AdminRoute><HomeDashboard /></AdminRoute></Route>
          <Route path="/dashboard/categories" exact><AdminRoute><CategoryList /></AdminRoute></Route>
          <Route path="/dashboard/categories/edit/:id" exact><AdminRoute><CategoryEdit /></AdminRoute></Route>
          <Route path="/dashboard/categories/add" exact><AdminRoute><CategoryAdd /></AdminRoute></Route>
          <Route path="/dashboard/categories/delete" exact><AdminRoute><CategoryDelete /></AdminRoute></Route>
          <Route path="/dashboard/products" exact><AdminRoute><ProductList /></AdminRoute></Route>
          <Route path="/dashboard/products/add" exact><AdminRoute><ProductAdd /></AdminRoute></Route>
          <Route path="/dashboard/products/edit/:id" exact><AdminRoute><ProductEdit /></AdminRoute></Route>
          <Route path="/dashboard/product/details/:id" exact><AdminRoute><Details /></AdminRoute></Route>
          <Route path="/dashboard/products/delete" exact><AdminRoute><ProductDelete /></AdminRoute></Route>
          <Route path="/dashboard/orders" exact><AdminRoute><OrderList /></AdminRoute></Route>
          <Route path="/dashboard/order/details/:id" exact><AdminRoute><OrderDetails /></AdminRoute></Route>
          <Route path="/dashboard/users" exact><AdminRoute><UsersList /></AdminRoute></Route>
          <Route path="/dashboard/user/add" exact><AdminRoute><UserAdd /></AdminRoute></Route>
          <Route path="/dashboard/offers" exact><AdminRoute><OffersList /></AdminRoute></Route>
          <Route path="/dashboard/offer/add" exact><AdminRoute><OfferAdd /></AdminRoute></Route>
          <Route path="/dashboard/offer/edit/:id" exact><AdminRoute><OfferEdit /></AdminRoute></Route>
          <Route path="/dashboard/offer/delete" exact><AdminRoute><OfferDelete /></AdminRoute></Route>
          <Route path="/dashboard/messages" exact><AdminRoute><MessagesList /></AdminRoute></Route>
        </Switch>
        {!hideHeaderFooter && <Footer></Footer>}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
