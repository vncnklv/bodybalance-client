import { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useAuth } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import Pager from "../../components/Pager";
import { getAllUsers } from "../../services/auth";
import UserItem from "./UserItem";
import Loader from "../../components/Loader";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState({ page: 1 });
    const [search, setSearch] = useState('');
    const [activeUser, setActiveUser] = useState({});

    const navigate = useNavigate();
    const { user } = useAuth();
    const { promiseInProgress } = usePromiseTracker({ area: 'users' });

    useEffect(() => {
        if (user?.role !== 'admin') navigate('/dashboard');

        trackPromise(
            getAllUsers(pages.page, search)
                .then(res => {
                    setUsers(() => res.users);
                    setPages(old => ({
                        ...old,
                        nextPage: res.nextPage || false
                    }));
                })
                .catch(err => console.log(err)),
            'users')
    }, [navigate, pages.page, search, user?.role]);

    const goToPage = (page) => {
        setPages(() => ({ page }))
    }

    const onSearch = (e) => {
        setSearch(() => e.target.parentElement.firstChild.value);
        if (pages.page != 1)
            setPages(() => ({ page: 1 }))
    }

    return (
        <>
            <div className="shadow-md">
                <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Users</h2>

                <div className="flex flex-row gap-5 px-14 items-center">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <span className="px-5 py-2 bg-secondary text-white  hover:cursor-pointer" onClick={onSearch}>Search</span>
                </div>

                {promiseInProgress
                    ? <div className="py-10"><Loader /></div>
                    : <>
                        <div className="px-16 py-2">
                            {users.length == 0
                                ? <span>No users found!</span>
                                : users.map(user => <UserItem key={user._id} user={user} setActiveTrainer={setActiveUser} />)
                            }
                        </div>
                        <Pager {...pages} goToPage={goToPage} />
                    </>
                }
            </div>
            {activeUser._id && <UserCard trainer={setActiveUser} />}
        </>
    )
}