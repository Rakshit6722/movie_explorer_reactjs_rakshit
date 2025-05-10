import { current } from "@reduxjs/toolkit";

export const authorizeUserForAccessMovie = (currentPlan: any, movie: any): boolean => {

    console.log("inside authorizeUserForAccessMovie", currentPlan, movie?.plan)



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