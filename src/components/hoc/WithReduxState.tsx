import { Component } from "lucide-react";
import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router-dom";

const WithReduxState = (Component: ComponentType<any>) => {
    const NewComponent = (props: any) => {
        const userInfo = useSelector((state: RootState) => state.user.userInfo);
        const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
        const movieList = useSelector((state: RootState) => state.movie.movies);
        const currentPlan = useSelector((state: RootState) => state.user.currentPlan)
        
        const location = useLocation()
        return <Component {...props} userInfo={userInfo} currentPlan={currentPlan} movieList={movieList} location={location} isLoggedIn={isLoggedIn}/>;
    }

    return NewComponent
}

export default WithReduxState;