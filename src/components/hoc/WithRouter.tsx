import { ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';

const WithRouter = (Component: ComponentType<any>) => {
    const NewComponent = (props: any) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const location = useLocation();
        const params = useParams()
        const loading = useSelector((state: RootState) => state.movie.loading);
        return <Component {...props} params={params} location={location} dispatch={dispatch} navigate={navigate} movieLoading={loading} />;
    };
    return NewComponent;
};

export default WithRouter;