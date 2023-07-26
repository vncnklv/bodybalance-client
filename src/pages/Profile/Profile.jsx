import PersonalInformation from "./PerosnalInformation";
import Goals from "./Goals";
import MyFoods from "./MyFoods";

export default function Profile() {

    return (
        <>
            <div className="flex justify-between gap-5">
                <PersonalInformation />
                <Goals />
            </div>
            <MyFoods />
        </>
    );
}