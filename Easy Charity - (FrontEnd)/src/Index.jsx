import App from './App'
import React, {createContext, useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/UserPages/LoginPage';
import { RegisterPage } from './pages/UserPages/RegisterPage';
import { MenuPage } from './collections/MenuPage';
import { Menu } from './pages/MenuPage/Menu';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { UserPage } from './pages/UserPages/UserPage';
import { ViewUserPage } from './pages/UserPages/ViewUserPage';
import { OrganizationPage } from './pages/OrganizationPage/OrganizationPage';
import { ViewOrganizationPage } from './pages/OrganizationPage/ViewOrganizationPage';
import { ProyectPage } from './pages/ProyectPage/ProyectPage';
import { ViewProyectPage } from './pages/ProyectPage/ViewProyectPage';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { ViewAcountPage } from './pages/AccountPage/ViewAcountPage';
import { AddUserPage } from './pages/UserPages/AddUserPage';
import { UpdateUserPage } from './pages/UserPages/UpdateUserPage';
import { AddOrganizationPage } from './pages/OrganizationPage/AddOrganizationPage';
import { ViewOrganizationProyectsPage } from './pages/ProyectPage/ViewOrganizationProyects';
import { DetailProyectPage } from './pages/ProyectPage/DetailProyectPage';
import { DetailOrganization } from './pages/OrganizationPage/DetailOrganization';
import { AddProyectPage } from './pages/ProyectPage/AddProyectPage';



export const AuthContext = createContext();
const role = localStorage.getItem('role')


export const Index = () => {
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])

    useEffect(() => {
        let data = dataUser
        if (data) setDataUser(data);
    }, [dataUser])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage/>,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/register',
                    element: <RegisterPage></RegisterPage>
                },
                {
                    path: '/start',
                    element: loggedIn ? <MenuPage></MenuPage> : <LoginPage></LoginPage>,
                    children: [
                        {
                            path: '',
                            element: <Menu></Menu>,
                            children:[
                                {
                                    path: '',
                                    element: <WelcomePage></WelcomePage>
                                },
                                {
                                    path:'users',
                                    element: <UserPage></UserPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewUserPage></ViewUserPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddUserPage></AddUserPage>
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <UpdateUserPage></UpdateUserPage>
                                        }
                                        
                                    ]
                                },
                                {
                                    path: 'account',
                                    element: <AccountPage></AccountPage> ,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewAcountPage></ViewAcountPage>
                                        }
                                    ]
                                },
                                {
                                    path:'organization',
                                    element: <OrganizationPage></OrganizationPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewOrganizationPage></ViewOrganizationPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddOrganizationPage></AddOrganizationPage>
                                        },
                                        {
                                            path: 'detail',
                                            
                                            element:<DetailOrganization></DetailOrganization>
                                        }
                                    ]
                                },
                                {
                                    path:'proyects',
                                    element: <ProyectPage></ProyectPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewProyectPage></ViewProyectPage>
                                        },
                                        {
                                            path: ':id',
                                            element: <ViewOrganizationProyectsPage></ViewOrganizationProyectsPage>
                                        },
                                        {
                                            path: 'detailproyect',
                                            element: <DetailProyectPage></DetailProyectPage>
                                        },
                                        {
                                            path: 'add',
                                            element:<AddProyectPage></AddProyectPage>
                                        }
                                    ]
                                },

                                
                                
                                
                            ]
                        }
                    ]
                }     
            ]
        }     
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser}}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}