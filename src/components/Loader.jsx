import { MoonLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-full">
            <MoonLoader color="#038437" size={50} />
        </div>
    )
}