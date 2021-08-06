export {};
// import * as React from 'react';
// import { Link, useRouteMatch, useParams, Switch, Route } from 'react-router-dom';

// export default function TestScreen(): JSX.Element {
// const {url, path} = useRouteMatch();

//   return (
//     <div>
//       Test message
//       <button onClick={() => {
//         history.go(-3);
//       }}
//       >Button
//       </button>
//       <Link to={`${url}/comp1`}>Comp1</Link>
//       <Link to={`${url}/comp2`}>Comp2</Link>

//       <Switch>
//         <Route path={`${path}/:id`}><Nested /></Route>
//       </Switch>

//     </div>
//   );
// }

// function Nested():JSX.Element {
//   const {id} = useParams();
//   console.log(useRouteMatch());
//   const {url, path} = useRouteMatch();
//   return (
//     <div>
//       <p>{id}</p>
//       <Link to={`${url}/nested`}>Nested</Link>
//       <Switch>
//         <Route path={`${path}/:id`}><Nested /></Route>
//       </Switch>
//     </div>
//   )
// }
