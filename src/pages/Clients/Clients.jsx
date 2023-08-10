import { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Pager from "../../components/Pager";
import ClientItem from "./ClientItem";
import { getTrainerClients } from "../../services/auth";
import ClientCard from "./ClientCard";
import Loader from "../../components/Loader";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [pages, setPages] = useState({ page: 1 });
    const [search, setSearch] = useState('');
    const [activeClient, setActiveClient] = useState({});

    const { promiseInProgress } = usePromiseTracker({ area: 'clients' });

    useEffect(() => {
        trackPromise(
            getTrainerClients(pages.page, search)
                .then(res => setClients(() => res.clients))
                .catch(err => console.log(err)),
            'clients')
    }, [pages.page, search]);

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
                <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Clients</h2>

                <div className="flex flex-row gap-5 px-14 items-center">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <span className="px-5 py-2 bg-secondary text-white  hover:cursor-pointer" onClick={onSearch}>Search</span>
                </div>

                {promiseInProgress
                    ? <div className="py-10"><Loader /></div>
                    : <>
                        <div className="px-16 py-2">
                            {clients.length == 0
                                ? <span>You have no clients!</span>
                                : clients.map(client => <ClientItem key={client._id} client={client} setActiveClient={setActiveClient} />)
                            }
                        </div>
                        <Pager {...pages} goToPage={goToPage} />
                    </>
                }
            </div>
            {activeClient._id && <ClientCard key={activeClient._id} client={activeClient} />}
        </>
    )
}