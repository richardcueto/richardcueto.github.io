import { Route, Routes } from "react-router-dom";

import SignIn from "../../dashboard/pages/AuthPages/SignIn";
import SignUp from "../../dashboard/pages/AuthPages/SignUp";
import NotFound from "../../dashboard/pages/OtherPage/NotFound";
import UserProfiles from "../../dashboard/pages/UserProfiles";
import Videos from "../../dashboard/pages/UiElements/Videos";
import Images from "../../dashboard/pages/UiElements/Images";
import Alerts from "../../dashboard/pages/UiElements/Alerts";
import Badges from "../../dashboard/pages/UiElements/Badges";
import Avatars from "../../dashboard/pages/UiElements/Avatars"
import Buttons from "../../dashboard/pages/UiElements/Buttons";
import LineChart from "../../dashboard/pages/Charts/LineChart";
import BarChart from "../../dashboard/pages/Charts/BarChart";
import Calendar from "../../dashboard/pages/Calendar";
import BasicTables from "../../dashboard/pages/Tables/BasicTables";
import FormElements from "../../dashboard/pages/Forms/FormElements";
import Blank from "../../dashboard/pages/Blank";
import AppLayout from "../../dashboard/layout/AppLayout";
import { ScrollToTop } from "../../dashboard/components/common/ScrollToTop";
import Home from "../../dashboard/pages/Dashboard/Home";

const Dashboard = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          {/* Others Page */}
          <Route path="profile" element={<UserProfiles />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />

          {/* Forms */}
          <Route path="form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="alerts" element={<Alerts />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="badge" element={<Badges />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="images" element={<Images />} />
          <Route path="videos" element={<Videos />} />

          {/* Charts */}
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />
        </Route>     
        {/* Auth Layout */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* Fallback  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Dashboard;