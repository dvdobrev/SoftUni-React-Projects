import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { UserContext } from './contexts/UserContext';

import * as traingPlanService from './services/trainingPlanService';

import { useLocalStorage } from './hooks/useLocalStorage';

import { Header } from './components/Header';
import { MainBanner } from './components/MainBanner';
import { CallToAction } from './components/CallToAction';
import { Trainers } from './components/Trainers';
import { ContakUsArea } from './components/ContaktUsArea';
import { Classes } from "./components/Classes";
import { Schedules } from "./components/Schedules";
// import { Programs } from "./components/Programs";
import { MySchedules } from './components/MySchedules';
import { PlansCatalog } from './components/PlansCatalog';
import { PageNotFound } from './components/PageNotFound';
import { Test } from './components/Test';
import { Profil } from './components/Profil';

import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Logout } from './components/Logout';

import { CreatePlan } from "./components/Plans/CreatePlan";
import { EditPlan } from './components/Plans/EditPlan';
import { PlanDetails } from './components/Plans/PlanDetails';

import { Footer } from './components/Footer';


function App() {

    const [trainingPlans, setTrainingPlans] = useState([]);

    const [userData, setUserData] = useLocalStorage('userData', {});
    const navigate = useNavigate();


    const userDataHandler = (userData) => {
        setUserData(userData);
    };

    const logoutHandler = () => {
        setUserData({});
    };

    useEffect(() => {
        traingPlanService.getAll()
            .then(result => {
                setTrainingPlans(result);
            });
    }, []);

    const fetchTrainingPlans = () => {
        traingPlanService.getAll()
            .then(result => {
                setTrainingPlans(result);
            });
    }

    const addComment = (planId, comment) => {
        setTrainingPlans(state => {
            const game = state.find(x => x._id == planId);

            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== planId),
                { ...game, comments },
            ];
        });
    };

    const addPlan = (planData) => {
        setTrainingPlans(state => [
            ...state,
            planData,
        ]);
        navigate('/plansCatalog');

    };

    const editPlan = (planId, planData) => {
        setTrainingPlans(state => state.map(plan => plan._id === planId ? planData : plan));
    }


    return (

        <UserContext.Provider
            value={{
                userData,
                userDataHandler: userDataHandler,
                logoutHandler,
                trainingPlans,
                fetchTrainingPlans,
                addPlan,
                editPlan,
            }}
        >

            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <MainBanner />
                            <CallToAction />
                        </main>}
                    />

                    <Route path="/trainers" element={<Trainers />} />
                    {/* <Route path="/programs" element={<Programs />} /> */}
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/contact" element={<ContakUsArea />} />
                    <Route path="/mySchedules" element={<MySchedules />} />
                    <Route path="/plansCatalog" element={<PlansCatalog trainingPlans={trainingPlans} />} />
                    <Route path="/PageNotFound" element={<PageNotFound />} />
                    <Route path="/TestPage" element={<Test />} />
                    <Route path="/profil" element={<Profil userData={userData} />} />


                    <Route path="/createPlan" element={<CreatePlan />} />
                    <Route path="/plans/:planId/edit" element={<EditPlan />} />
                    <Route path="/plans/:planId/details"
                        element={<PlanDetails
                            plans={trainingPlans}
                            addComment={addComment}
                            fetchTrainingPlans={fetchTrainingPlans}
                        />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* <Route path="/pricing/*" element={<Pricing />} />
                <Route path="/pricing/premium" element={<h2>Premium Pricing</h2>} />
                <Route path="/contacts" element={<Contacts />} />

                <Route path="/starships" element={<StarshipList />} />
                <Route path="/starships/:starshipId/*" element={<Starship />} />
                <Route path="/millennium-falcon" element={<Navigate to="/products/10" replace />} />
                <Route path="*" element={<NotFound />} /> */}
                </Routes>
                <Footer />

            </div>
        </UserContext.Provider>
    );
}

export default App;
