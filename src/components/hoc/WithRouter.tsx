import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

const WithRouter = (Component: ComponentType<any>) => {
    const NewComponent = (props: any) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
    return NewComponent;
};

export default WithRouter;