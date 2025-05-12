import { current } from "@reduxjs/toolkit";

export const authorizeUserForAccessMovie = (currentPlan: any, movie: any, role: string): boolean => {


    if(role === 'supervisor' || role === 'admin') {
        return true;
    }

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

    if (currentPlan === 'basic' || currentPlan === null) {
        return moviePlan === 'basic';
    }
    
    return false;

}