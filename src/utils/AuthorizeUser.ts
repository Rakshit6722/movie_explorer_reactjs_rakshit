import { current } from "@reduxjs/toolkit";

export const authorizeUserForAccessMovie = (userInfo: any, movie: any): boolean => {
    console.log("userInfo", userInfo);
    console.log("movie", movie);
    const currentPlan = userInfo?.active_plan
    const moviePlan = movie?.plan

    if (!currentPlan || !moviePlan) {
        return false;
    }
    if (currentPlan === 'platinum') {
        return true;
    }

    if (currentPlan === 'gold') {
        return moviePlan === 'basic' || moviePlan === 'gold';
    }

    if (currentPlan === 'basic') {
        return moviePlan === 'basic';
    }
    
    return false;

}