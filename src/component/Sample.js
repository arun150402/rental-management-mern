import ReactDOM from 'react-dom';
//import tr from './Layout';
//import Mo from './counter';

export default function Abc(props){
  ReactDOM.render(
    //<>{sample()}</>
    <>
    <h1>The page is routed from {props.valueee}</h1>
    </>
,
  document.getElementById('root')
);
}