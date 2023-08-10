import { useEffect, useState } from "react";
import { getAllTrainers } from "../../services/auth";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import TrainerItem from "./TrainerItem";
import Pager from "../../components/Pager";
import TrainerCard from "./TrainerCard";
import Loader from "../../components/Loader";

export default function Trainers() {
    const [trainers, setTrainers] = useState([]);
    const [pages, setPages] = useState({ page: 1 });
    const [search, setSearch] = useState('');
    const [activeTrainer, setActiveTrainer] = useState({});

    const { promiseInProgress } = usePromiseTracker({ area: 'trainers' });

    useEffect(() => {
        trackPromise(
            getAllTrainers(pages.page, search)
                .then(res => {
                    setTrainers(() => res.trainers);
                    setPages(old => ({
                        ...old,
                        nextPage: res.nextPage || false
                    }));
                })
                .catch(err => console.log(err)),
            'trainers')
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
                <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Trainers</h2>

                <div className="flex flex-row gap-5 px-14 items-center">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <span className="px-5 py-2 bg-secondary text-white  hover:cursor-pointer" onClick={onSearch}>Search</span>
                </div>

                {promiseInProgress
                    ? <div className="py-10"><Loader /></div>
                    : <>
                        <div className="px-16 py-2">
                            {trainers.length == 0
                                ? <span>There is no trainers found!</span>
                                : trainers.map(trainer => <TrainerItem key={trainer._id} trainer={trainer} setActiveTrainer={setActiveTrainer} />)
                            }
                        </div>
                        <Pager {...pages} goToPage={goToPage} />
                    </>
                }
            </div>
            {activeTrainer._id && <TrainerCard trainer={activeTrainer} />}
        </>
    )
}