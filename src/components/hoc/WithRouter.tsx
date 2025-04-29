import { ComponentType } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const WithRouter = (Component: ComponentType<any>) => {
    const NewComponent = (props: any) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const location = useLocation()
        return <Component {...props} location={location} dispatch={dispatch} navigate={navigate} />;
    };
    return NewComponent;
};

export default WithRouter;