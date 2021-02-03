import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import HomePage from "./pages/HomePage";
import WalkPage from "./pages/WalkPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import DiscoverPage from "./pages/DiscoverPage";
import SettingsPage from "./pages/SettingsPage";
import IntroPage from "./pages/subpages/IntroPage";

import {
  home as homeIcon,
  walk as walkIcon,
  person as personIcon,
  images as imagesIcon,
  information as informationIcon,
  settings as settingsIcon,
} from "ionicons/icons";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/walk">
            <WalkPage />
          </Route>
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/discover">
            <DiscoverPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/intro">
            <IntroPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeIcon} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="walk" href="/walk">
            <IonIcon icon={walkIcon} />
            <IonLabel>Walk</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={personIcon} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="discover" href="/discover">
            <IonIcon icon={imagesIcon} />
            <IonLabel>Discover</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon icon={informationIcon} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
