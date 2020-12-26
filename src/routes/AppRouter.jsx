import React from "react";

import { BrowserRouter, Route,Switch} from 'react-router-dom';
import DashbordExpensPage from "../pages/dashboard/dashboard.page";
import AddExpensePage from '../pages/add/add.page';
import HelpExpensePage from '../pages/help/help.page';
import EditExpensePage from '../pages/edit/edit.page';
import NotFoundPage from '../pages/404/404.page';
import Header from "../pages/header/header.page";

  
  
const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Header />
        <Switch> 
          <Route path='/' exact={true} component={DashbordExpensPage} />
          <Route path='/create' component={AddExpensePage} />
          <Route path='/help' component={HelpExpensePage} />
          <Route path='/edit/:id' component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
  </BrowserRouter>
)
export default AppRouter;