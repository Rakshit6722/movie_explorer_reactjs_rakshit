
export const authorizeUserForAccessMovie = (currentPlan: any, movie: any, role: string): boolean => {

    if(role === 'supervisor' || role === 'admin') {
        return true;
    }

    const moviePlan = movie?.plan

    let isValid = false

    if (!currentPlan || !moviePlan) {
        isValid = false;
    }
    if (currentPlan === 'platinum') {
        isValid = true;
    }

    if (currentPlan === 'gold') {
        if(moviePlan === 'basic' || moviePlan === 'gold') isValid = true
    }

    if (currentPlan === 'basic' || currentPlan === null) {
        if(moviePlan === 'basic') isValid = true;
    }
    
    console.log("is valid", isValid)
    return isValid;

}