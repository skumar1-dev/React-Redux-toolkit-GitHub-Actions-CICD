
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PayNowButton from './components/PaymentGetway/PayNowButton';
import PaymentResult from './components/PaymentGetway/PaymentResult';
import AddTask from './components/addTask';
import Products from './components/Products/Products';
import Cart from './components/Products/Cart';

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Products />} />
        <Route path="/product" element={<Products />} />
        <Route path="/payment/pay" element={<PayNowButton />} />
        <Route path="/payment/result" element={<PaymentResult />} />        
        <Route path="/task/addtask" element={<AddTask />} />
        <Route path="/product/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;


// <div className="App">
{/* <SearchUser />
      <UserList />
      <SearchWithDebounce />
      <SearchWithoutDebounce />
      <AddTask /> */}

{/* <div style={{ width: '80%', textAlign: 'center' }}>
        Hi, My Name is Sarvesh Kumar . I have 8+ years of experience in software
        development and my core experties is in Asp.net core API, C#, Asp.net MVC,Web Forms, Sql Database,as well as frontend
        I have good esperience in react js.
        Basically I am from Lucknow but currently i am residng in Noida.
        Currently I  am working at expediens esolution at senior software engineer ,
        and here my responsilities are design and developed restful api's using .net core API and c# , write sql procedures and create tables
        I also work in frontend side using react js , I also mentor to junior colleagues.

        I am good to learn new skills, currently i am learning AZURE and Microservices architecure.
      </div> */}
// </div>
