import ReactLoading from 'react-loading';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin, isAdminLoading } = UseAdmin();
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                <ReactLoading type="spin" color="red"></ReactLoading>
            </div>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={'/'} state={location.pathname}></Navigate>

};

export default AdminRoutes;